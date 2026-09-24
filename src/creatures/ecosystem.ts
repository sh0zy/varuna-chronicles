import * as THREE from 'three';
import { Creature, Herd } from './creature';
import { SPECIES, SpeciesDef, ObsId } from './species';
import { buildTemplate, CreatureTemplate } from './builder';
import { World } from '../world/world';
import { Rng, clamp, lerp } from '../core/noise';
import { P, HERD_ROUTE, HERD_ROUTE_OPEN, HIMEYOROI_ROUTE, catmull, riverLine, riverHalfWidth } from '../world/layout';

// 生態系：個体のAI、群れ、狩り、死骸と腐肉食、縄張り、距離による処理の粒度（LOD）、個体数の補充。

export interface PlayerSense {
  pos: THREE.Vector3;
  noise: number;        // 0〜1.5（しゃがみ0.15、歩き0.5、走り1）
  crouched: boolean;
  concealed: number;    // 0〜1 草むら・煙で見えにくい
  mounted: boolean;
  dead: boolean;
  calmSkill: boolean;   // 群れの警戒を解く技能
}

export interface EcoEvents {
  observe(speciesId: string, obs: ObsId, c: Creature | null): void;
  call(c: Creature, kind: 'call' | 'alarm' | 'roar' | 'hiss' | 'distress' | 'chirp', loud: number): void;
  footstep(c: Creature, pos: THREE.Vector3, weight: number): void;
  playerHit(damage: number, from: THREE.Vector3, knock: number, source: Creature): void;
  kill(pred: Creature | null, prey: Creature): void;
  shake(pos: THREE.Vector3, strength: number, radius: number): void;
}

const tmpV = new THREE.Vector3();
const tmpV2 = new THREE.Vector3();

export class Ecosystem {
  creatures: Creature[] = [];
  herds: Herd[] = [];
  templates = new Map<string, CreatureTemplate>();
  juvTemplates = new Map<string, CreatureTemplate>();
  group = new THREE.Group();
  private rng = new Rng(2026);
  private herdId = 1;
  routeOpen = false;
  fenceOpen = false;
  frustum = new THREE.Frustum();
  private projScreen = new THREE.Matrix4();
  camPos = new THREE.Vector3();
  frame = 0;
  targets: Record<string, number> = {};
  lastRespawnCheck = 0;
  /** 調べられる羽毛などの落とし物 */
  drops: { id: number; species: string; kind: 'feather' | 'scale'; pos: THREE.Vector3; mesh: THREE.Object3D; t: number }[] = [];
  private dropId = 1;
  scavengerFlocks: { carcass: Creature; birds: Creature[] }[] = [];

  constructor(public world: World, public events: EcoEvents) {
    this.world.scene.add(this.group);
  }

  template(id: string, juvenile = false) {
    const map = juvenile ? this.juvTemplates : this.templates;
    let t = map.get(id);
    if (!t) { t = buildTemplate(SPECIES[id].shape); map.set(id, t); if (!juvenile) this.juvTemplates.set(id, t); }
    return t;
  }

  spawn(id: string, x: number, z: number, juvenile = false, herd: Herd | null = null): Creature {
    const sp = SPECIES[id];
    const tint = new THREE.Color(1, 1, 1).offsetHSL(this.rng.range(-0.02, 0.02), this.rng.range(-0.05, 0.05), this.rng.range(-0.06, 0.06));
    const c = new Creature(sp, this.template(id, juvenile), juvenile, tint);
    c.pos.set(x, this.world.terrain.height(x, z), z);
    c.yaw = this.rng.range(-Math.PI, Math.PI);
    c.desiredYaw = c.yaw;
    if (herd) { herd.members.push(c); c.herd = herd; if (!herd.leader && !juvenile) herd.leader = c; }
    if (sp.flying) { c.altitude = 60 + this.rng.range(0, 30); c.flyCenter.set(x, 0, z); c.setState('fly'); }
    this.creatures.push(c);
    this.group.add(c.rig.root);
    return c;
  }

  newHerd(species: string, home: { x: number; z: number; r: number }, route: { x: number; z: number }[] | null = null): Herd {
    const h: Herd = { id: this.herdId++, species, members: [], leader: null, route, routeIndex: 0, home, mode: 'wander', modeT: 0, target: null, prey: null, hunger: this.rng.range(0.1, 0.4) };
    this.herds.push(h);
    return h;
  }

  /** 初期の個体群。垂直スライス区域の生態系 */
  populate() {
    const R = this.rng;
    // ソラクビの群れ：開始時、渡りの丘の東を南へ横切る
    const route = catmull(HERD_ROUTE, 10, true);
    const sh = this.newHerd('sorakubi', { x: -450, z: 100, r: 60 }, route);
    let startIdx = 0, best = Infinity;
    route.forEach((p, i) => { const d = Math.hypot(p.x + 452, p.z - 90); if (d < best) { best = d; startIdx = i; } });
    sh.routeIndex = startIdx + 1;
    sh.mode = 'migrate';
    for (let i = 0; i < 13; i++) {
      const juv = i >= 10;
      const c = this.spawn('sorakubi', -452 + R.range(-26, 26), 70 + R.range(-40, 40) - i * 3, juv, sh);
      c.yaw = c.desiredYaw = Math.PI * 0.95;
    }
    // ホネツツキ：ソラクビの背の虫を食べに群れの上を舞う
    for (let i = 0; i < 6; i++) {
      const b = this.spawn('honetsutsuki', -450 + R.range(-20, 20), 90, false, null);
      b.tag = 'escort'; b.altitude = 22 + R.range(0, 10); b.flyRadius = 22;
    }
    // カゼアシの群れ（2つ）
    for (const home of [{ x: -300, z: 250, r: 90 }, { x: -260, z: -210, r: 110 }]) {
      const h = this.newHerd('kazeashi', home);
      const n = R.int(6, 8);
      for (let i = 0; i < n; i++) this.spawn('kazeashi', home.x + R.range(-25, 25), home.z + R.range(-25, 25), i >= n - 2, h);
    }
    // クサガリの群れ（2つ）：野営地の南の茂みと、境界の茂み
    for (const home of [{ x: -250, z: 210, r: 150 }, { x: 250, z: 270, r: 110 }]) {
      const h = this.newHerd('kusagari', home);
      h.hunger = 0.25;
      for (let i = 0; i < 4; i++) this.spawn('kusagari', home.x + R.range(-12, 12), home.z + R.range(-12, 12), false, h);
    }
    // ヒメヨロイの家族（1つは柵に阻まれる繁殖路の上）
    {
      const h = this.newHerd('himeyoroi', { x: -330, z: 235, r: 30 }, HIMEYOROI_ROUTE);
      h.mode = 'nest';
      h.routeIndex = 1;
      for (let i = 0; i < 4; i++) this.spawn('himeyoroi', -318 + i * 3, 226 + i * 2, i === 3, h);
      const h2 = this.newHerd('himeyoroi', { x: -430, z: 90, r: 60 });
      for (let i = 0; i < 3; i++) this.spawn('himeyoroi', -430 + i * 3, 90, i === 2, h2);
    }
    // カゲワタリ
    const k1 = this.spawn('kagewatari', -200, 120); k1.flyCenter.set(-170, 0, 90); k1.flyRadius = 140; k1.altitude = 75;
    const k2 = this.spawn('kagewatari', 80, 250); k2.flyCenter.set(60, 0, 230); k2.flyRadius = 170; k2.altitude = 90;
    // ツチネズミ（夜に現れる）
    for (let i = 0; i < 8; i++) this.spawn('tsuchinezumi', -230 + R.range(-60, 60), 80 + R.range(-40, 80), false, null);
    // 翠角竜（オルガ以外の成体。幼体2頭は泥地にはまっている）
    const sh2 = this.newHerd('suikaku', { x: P.clearing.x + 40, z: P.clearing.z - 50, r: 40 });
    for (let i = 0; i < 2; i++) this.spawn('suikaku', P.clearing.x + 40 + i * 8, P.clearing.z - 50, false, sh2);
    for (let i = 0; i < 2; i++) {
      const j = this.spawn('suikaku', P.mud1.x + (i - 0.5) * 6, P.mud1.z + i * 3, true, null);
      j.tag = 'juvenile' + i;
      j.setState('stuck');
    }
    // オオアギト：樹海の縁の縄張り
    const oa = this.spawn('ooagito', 540, -90);
    oa.tag = 'patrol';
    // ネダマリ
    for (const p of [{ x: 360, z: -60 }, { x: 470, z: -300 }, { x: 520, z: -380 }]) this.spawn('nedamari', p.x, p.z);
    // 個体数の目標（補充の基準）
    for (const c of this.creatures) this.targets[c.sp.id] = (this.targets[c.sp.id] ?? 0) + 1;
  }

  get(tag: string) { return this.creatures.find((c) => c.tag === tag); }

  setRouteOpen(open: boolean) {
    this.routeOpen = open;
    const h = this.herds.find((x) => x.species === 'sorakubi');
    if (!h) return;
    h.route = catmull(open ? HERD_ROUTE_OPEN : HERD_ROUTE, 10, true);
    // 現在地に最も近い点から続ける
    const lead = h.leader ?? h.members[0];
    if (lead) {
      let bi = 0, bd = Infinity;
      h.route.forEach((p, i) => { const d = Math.hypot(p.x - lead.pos.x, p.z - lead.pos.z); if (d < bd) { bd = d; bi = i; } });
      h.routeIndex = bi + 1;
    }
  }

  // ------------------------------------------------------------ 感覚

  /** プレイヤーに対する知覚（視覚・聴覚・風下からの嗅覚）。増えた気づきの量を返す */
  private sense(c: Creature, p: PlayerSense, dt: number, wind: { dir: number; strength: number }) {
    if (p.dead) { c.awareness = Math.max(0, c.awareness - dt * 0.3); return 0; }
    const dx = p.pos.x - c.pos.x, dz = p.pos.z - c.pos.z;
    const d = Math.hypot(dx, dz);
    const sp = c.sp;
    const daylight = this.world.clock.daylight();
    let gain = 0;
    // 視覚：視野角と距離。草むら・しゃがみで見えにくい。夜は大きく落ちる
    const ang = Math.abs(Math.atan2(Math.sin(Math.atan2(dx, dz) - c.yaw), Math.cos(Math.atan2(dx, dz) - c.yaw)));
    const sightR = sp.sight * (0.35 + 0.65 * daylight) * (1 - p.concealed * 0.6) * (p.crouched ? 0.55 : 1) * (p.mounted ? 1.3 : 1) * (1 - this.world.weather.fog * 0.45);
    if (ang < sp.fov / 2 && d < sightR) gain += (1 - d / sightR) * 1.6;
    // 聴覚
    const hearR = sp.hearing * p.noise;
    if (d < hearR) gain += (1 - d / hearR) * 1.2;
    // 嗅覚：プレイヤーから生物へ向かう方向が風の向きと揃っていれば（＝プレイヤーが風上）
    const toC = Math.atan2(-dz, -dx); // プレイヤー→生物（x,z の角度）
    const align = Math.cos(toC - wind.dir);
    const smellR = sp.smell * (0.3 + wind.strength) * (align > 0 ? align : 0.08);
    c.smelled = d < smellR;
    if (d < smellR) gain += (1 - d / smellR) * 1.3;
    c.awareness = clamp(c.awareness + gain * dt - (gain === 0 ? dt * 0.12 : 0), 0, 1);
    return gain;
  }

  private waterDepthAt(x: number, z: number) {
    const wl = this.world.terrain.waterLevel(x, z);
    if (wl === -Infinity) return 0;
    return Math.max(0, wl - this.world.terrain.height(x, z));
  }

  /** 進めない場所（深い水・急斜面・地図の外）かどうか */
  private blockedAt(c: Creature, x: number, z: number) {
    if (Math.abs(x) > 720 || Math.abs(z) > 720) return true;
    if (c.sp.flying && c.state === 'fly') return false;
    const depth = this.waterDepthAt(x, z);
    const maxDepth = c.sp.id === 'sorakubi' ? 3.5 : c.sp.id === 'suikaku' ? 1.4 : c.sp.id === 'ooagito' ? 1.6 : 0.5;
    if (depth > maxDepth * (c.juvenile ? 0.5 : 1)) return true;
    const t = this.world.terrain;
    const h0 = t.height(c.pos.x, c.pos.z), h1 = t.height(x, z);
    const dist = Math.hypot(x - c.pos.x, z - c.pos.z) || 1;
    if ((h1 - h0) / dist > 0.9) return true;
    return false;
  }

  // ------------------------------------------------------------ 毎フレーム

  update(dt: number, player: PlayerSense, camera: THREE.PerspectiveCamera) {
    this.frame++;
    this.camPos.copy(camera.position);
    this.projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.projScreen);
    const wind = this.world.wind;
    const hour = this.world.clock.hour;
    const night = this.world.clock.isNight();

    // 群れの意思決定
    for (const h of this.herds) this.herdThink(h, dt, player, hour, night);

    for (const c of this.creatures) {
      const d = c.pos.distanceTo(player.pos);
      // 距離による粒度：近い個体は毎フレーム、遠い個体はまとめて
      const rate = d < 160 ? 1 : d < 600 ? 4 : 12;
      c.lodTimer += dt;
      if ((this.frame + c.id) % rate === 0) {
        const ldt = Math.min(c.lodTimer, 0.5);
        c.lodTimer = 0;
        if (!c.dead) {
          if (d < 400) this.sense(c, player, ldt, wind);
          this.think(c, ldt, player, d, night);
          this.move(c, ldt);
        } else {
          c.stateT += ldt;
        }
      }
      this.present(c, dt, d, player);
    }
    this.updateScavengers(dt);
    this.updateDrops(dt, player);
    // 個体数の補充（見ていない遠くで）
    this.lastRespawnCheck += dt;
    if (this.lastRespawnCheck > 20) { this.lastRespawnCheck = 0; this.replenish(player); }
  }

  private herdThink(h: Herd, dt: number, player: PlayerSense, hour: number, night: boolean) {
    h.modeT += dt;
    h.members = h.members.filter((m) => !m.dead);
    if (h.leader?.dead || (h.leader && !h.members.includes(h.leader))) h.leader = h.members.find((m) => !m.juvenile) ?? h.members[0] ?? null;
    if (!h.leader) return;
    const L = h.leader;
    const sp = SPECIES[h.species];
    if (h.species === 'sorakubi') {
      if (night && h.mode !== 'rest' && h.mode !== 'flee') { h.mode = 'rest'; h.modeT = 0; }
      else if (!night && h.mode === 'rest') { h.mode = 'migrate'; h.modeT = 0; }
      if (h.mode === 'migrate' && h.modeT > 70 && Math.random() < dt * 0.02) { h.mode = 'wander'; h.modeT = 0; } // 採食の休み
      if (h.mode === 'wander' && h.modeT > 35) { h.mode = 'migrate'; h.modeT = 0; }
      if (h.mode === 'flee' && h.modeT > 25) { h.mode = 'migrate'; h.modeT = 0; }
      if (h.route && h.mode === 'migrate') {
        const tp = h.route[h.routeIndex % h.route.length];
        if (Math.hypot(tp.x - L.pos.x, tp.z - L.pos.z) < 18) h.routeIndex = (h.routeIndex + 1) % h.route.length;
        h.target = tmpV.set(tp.x, 0, tp.z).clone();
      }
    } else if (h.species === 'kazeashi') {
      if (h.mode !== 'flee') {
        const drinkTime = (hour > 7 && hour < 8.5) || (hour > 16.5 && hour < 18);
        if (night) h.mode = 'rest';
        else if (drinkTime && h.mode !== 'drink') {
          h.mode = 'drink'; h.modeT = 0;
          // 最も近い川岸へ
          const rn = riverLine.nearest(h.home.x, h.home.z);
          const p = riverLine.pointAt(rn.s);
          const w = riverHalfWidth(rn.s, p.x, p.z);
          const dx = h.home.x - p.x, dz = h.home.z - p.z, dl = Math.hypot(dx, dz) || 1;
          h.target = new THREE.Vector3(p.x + (dx / dl) * (w + 2), 0, p.z + (dz / dl) * (w + 2));
        } else if (!drinkTime && (h.mode === 'drink' || h.mode === 'rest')) { h.mode = 'wander'; h.modeT = 0; }
        if (h.mode === 'wander' && (!h.target || h.modeT > 40)) {
          h.modeT = 0;
          const a = Math.random() * Math.PI * 2, r = Math.random() * h.home.r;
          h.target = new THREE.Vector3(h.home.x + Math.cos(a) * r, 0, h.home.z + Math.sin(a) * r);
        }
      } else if (h.modeT > 14) { h.mode = 'wander'; h.modeT = 0; h.target = null; }
    } else if (h.species === 'kusagari') {
      h.hunger = clamp(h.hunger + dt / 300, 0, 1);
      const active = !night || this.world.weather.fog > 0.3 || (hour > 4.5 && hour < 8) || (hour > 17 && hour < 21);
      if (h.mode === 'eat') {
        if (h.modeT > 70) { h.mode = 'wander'; h.modeT = 0; h.prey = null; }
      } else if (h.mode === 'hunt') {
        if (!h.prey || h.prey.dead || h.modeT > 60 || h.prey.pos.distanceTo(L.pos) > 180) {
          if (h.prey?.dead) { h.mode = 'eat'; h.modeT = 0; h.hunger = 0; }
          else { h.mode = 'wander'; h.modeT = 0; h.prey = null; }
        }
      } else if (h.mode === 'flee') {
        if (h.modeT > 12) { h.mode = 'wander'; h.modeT = 0; }
      } else {
        if (h.hunger > 0.55 && active) {
          // 群れから離れた小さな獲物を探す
          let best: Creature | null = null, bd = 220;
          for (const c of this.creatures) {
            if (c.dead || !(c.sp.id === 'kazeashi' || (c.sp.id === 'himeyoroi' && c.juvenile))) continue;
            if (c.tag === 'mount' || (c.tag === 'kohaku' && c.state !== 'led')) continue;
            const d = c.pos.distanceTo(L.pos);
            if (d < bd && Math.hypot(c.pos.x - h.home.x, c.pos.z - h.home.z) < h.home.r + 150) { bd = d; best = c; }
          }
          if (best) { h.mode = 'hunt'; h.modeT = 0; h.prey = best; }
        }
        if (h.mode === 'wander' && (!h.target || h.modeT > 30)) {
          h.modeT = 0;
          const a = Math.random() * Math.PI * 2, r = Math.random() * h.home.r;
          h.target = new THREE.Vector3(h.home.x + Math.cos(a) * r, 0, h.home.z + Math.sin(a) * r);
        }
      }
    } else if (h.species === 'himeyoroi') {
      if (h.route && h.mode === 'nest') {
        // 繁殖路を砂州へ。柵が閉じていると柵の前で足止めされる
        const tp = h.route[Math.min(h.routeIndex, h.route.length - 1)];
        if (Math.hypot(tp.x - L.pos.x, tp.z - L.pos.z) < 8 && h.routeIndex < h.route.length - 1) h.routeIndex++;
        h.target = new THREE.Vector3(tp.x, 0, tp.z);
        if (h.routeIndex >= h.route.length - 1 && Math.hypot(tp.x - L.pos.x, tp.z - L.pos.z) < 10) {
          h.home = { x: tp.x, z: tp.z, r: 12 }; h.mode = 'wander'; h.route = null;
          this.events.observe('himeyoroi', 'nest', L);
        }
      } else if (!h.target || h.modeT > 45) {
        h.modeT = 0;
        // 棘の低木へ（食べる）
        const th = this.world.flora.thicketPlacements;
        const cut = this.world.flora.thicketCut;
        const near = th.map((p, i) => ({ p, i })).filter((o) => !cut.has(o.i) && Math.hypot(o.p.x - h.home.x, o.p.z - h.home.z) < h.home.r + 80);
        if (near.length && Math.random() < 0.6) { const o = near[Math.floor(Math.random() * near.length)]; h.target = new THREE.Vector3(o.p.x, 0, o.p.z); h.mode = 'thorn'; }
        else { const a = Math.random() * Math.PI * 2; h.target = new THREE.Vector3(h.home.x + Math.cos(a) * h.home.r, 0, h.home.z + Math.sin(a) * h.home.r); h.mode = 'wander'; }
      }
    } else if (h.species === 'suikaku') {
      if (!h.target || h.modeT > 30) { h.modeT = 0; const a = Math.random() * 6.28; h.target = new THREE.Vector3(h.home.x + Math.cos(a) * h.home.r, 0, h.home.z + Math.sin(a) * h.home.r); }
    }
    void sp; void player;
  }

  private think(c: Creature, dt: number, p: PlayerSense, dPlayer: number, night: boolean) {
    c.stateT += dt;
    c.attackCd = Math.max(0, c.attackCd - dt);
    c.fear = Math.max(0, c.fear - dt * 0.05);
    c.stagger = Math.max(0, c.stagger - dt);
    c.posture = Math.max(0, c.posture - dt * 4);
    if (c.state === 'scripted' || c.state === 'mounted') return;
    if (c.stagger > 0) { c.desiredSpeed = 0; return; }
    const sp = c.sp;
    const h = c.herd;
    const P0 = c.params;
    P0.graze = 0; P0.alert = 0; P0.rest = 0; P0.jaw = Math.max(0, P0.jaw - dt * 3); P0.rear = 0; P0.crouch = 0; P0.headYaw = 0; P0.headPitch = 0;
    P0.flying = 0; P0.flap = 0;

    switch (sp.id) {
      case 'sorakubi': this.thinkSorakubi(c, dt, p, dPlayer); break;
      case 'kazeashi': this.thinkGrazer(c, dt, p, dPlayer, night); break;
      case 'kusagari': this.thinkKusagari(c, dt, p, dPlayer); break;
      case 'himeyoroi': this.thinkHimeyoroi(c, dt, p, dPlayer); break;
      case 'kagewatari': case 'honetsutsuki': this.thinkFlyer(c, dt, p, dPlayer); break;
      case 'tsuchinezumi': this.thinkRodent(c, dt, p, dPlayer, night); break;
      case 'suikaku': this.thinkSuikaku(c, dt, p, dPlayer); break;
      case 'ooagito': this.thinkOoagito(c, dt, p, dPlayer); break;
      case 'nedamari': this.thinkNedamari(c, dt, p, dPlayer); break;
    }
    void h;
  }

  private followHerd(c: Creature, speed: number, spacing: number) {
    const h = c.herd!;
    const L = h.leader!;
    if (c === L) {
      if (h.target) c.seek(h.target.x, h.target.z, speed);
      else c.desiredSpeed = 0;
      return;
    }
    // 先頭の後ろに隊列（幼体は内側）
    const idx = h.members.indexOf(c);
    const row = Math.floor(idx / 3) + 1, col = (idx % 3) - 1;
    const back = row * spacing * (c.juvenile ? 0.7 : 1);
    const side = col * spacing * 0.9 * (c.juvenile ? 0.4 : 1);
    const fx = Math.sin(L.yaw), fz = Math.cos(L.yaw);
    const tx = L.pos.x - fx * back + fz * side, tz = L.pos.z - fz * back - fx * side;
    const d = Math.hypot(tx - c.pos.x, tz - c.pos.z);
    c.seek(tx, tz, d < 2 ? L.speed * 0.9 : Math.min(speed * 1.5, L.speed + d * 0.2));
    // 離れすぎたら合流を急ぐ
    if (d > spacing * 6) c.desiredSpeed = speed * 2;
  }

  private separate(c: Creature, radius: number) {
    // 同じ群れの仲間と重ならない
    const h = c.herd;
    if (!h) return;
    for (const o of h.members) {
      if (o === c) continue;
      const dx = c.pos.x - o.pos.x, dz = c.pos.z - o.pos.z;
      const d = Math.hypot(dx, dz);
      const m = (c.radius + o.radius) * radius;
      if (d < m && d > 0.01) { c.pos.x += (dx / d) * (m - d) * 0.3; c.pos.z += (dz / d) * (m - d) * 0.3; }
    }
  }

  private nearestPredator(c: Creature, r: number): Creature | null {
    let best: Creature | null = null, bd = r;
    for (const o of this.creatures) {
      if (o.dead || !(o.sp.diet === 'meat') || o.sp.flying || o === c) continue;
      if (o.sp.id === 'kusagari' && o.herd?.mode !== 'hunt' && o.state !== 'chase') continue;
      const d = o.pos.distanceTo(c.pos);
      if (d < bd) { bd = d; best = o; }
    }
    return best;
  }

  private thinkSorakubi(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const h = c.herd!;
    const P0 = c.params;
    const sp = c.sp;
    // 幼体を守る：肉食獣が群れに近づくと、成体が間に入り尾を振る
    const pred = this.nearestPredator(c, 45);
    if (pred && !c.juvenile) {
      c.setState('protect');
      const juv = h.members.find((m) => m.juvenile) ?? c;
      c.seek((juv.pos.x + pred.pos.x) / 2, (juv.pos.z + pred.pos.z) / 2, sp.walk * 1.6);
      P0.alert = 1;
      if (pred.pos.distanceTo(c.pos) < 14 && c.attackCd <= 0) {
        c.attackCd = 4; P0.rear = 0.4;
        pred.fear = 1; pred.herd && (pred.herd.mode = 'flee', pred.herd.modeT = 0);
        this.events.call(c, 'alarm', 1);
      }
      return;
    }
    if (h.mode === 'flee') { c.setState('flee'); this.followHerd(c, sp.run, 9); P0.alert = 0.6; return; }
    // プレイヤーが足元近くで騒ぐと群れごと動く（群れの警戒を解く技能があれば気にしない）
    if (dPlayer < 30 && p.noise > 0.9 && !p.calmSkill && c.awareness > 0.6) {
      h.mode = 'flee'; h.modeT = 0; this.events.call(c, 'alarm', 1);
    }
    if (h.mode === 'rest') {
      c.setState('rest'); c.desiredSpeed = 0; P0.rest = 1; return;
    }
    if (h.mode === 'wander') {
      c.setState('graze'); c.desiredSpeed = c === h.leader ? 0 : c.desiredSpeed * 0.5;
      P0.graze = 0.5 + 0.5 * Math.sin(c.stateT * 0.3 + c.id);
      if (c !== h.leader) this.followHerd(c, sp.walk * 0.5, 11);
      if (Math.random() < dt * 0.02) this.events.call(c, 'call', 0.8);
      return;
    }
    c.setState('migrate');
    this.followHerd(c, sp.walk, 11);
    if (c.awareness > 0.5 && dPlayer < 60) { P0.alert = 0.5; P0.headYaw = clamp(Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z) - c.yaw, -0.8, 0.8); }
    if (Math.random() < dt * 0.012) this.events.call(c, 'call', 1);
  }

  /** カゼアシ：臆病な採食者 */
  private thinkGrazer(c: Creature, dt: number, p: PlayerSense, dPlayer: number, night: boolean) {
    const P0 = c.params;
    const sp = c.sp;
    if (c.tag === 'kohaku' || c.tag === 'mount') return this.thinkMount(c, dt, p, dPlayer);
    const h = c.herd;
    c.stamina = clamp(c.stamina + dt * (c.state === 'flee' ? -1 / 12 : 1 / 20), 0, 1);
    // 捕食者から逃げる
    const pred = this.nearestPredator(c, 70);
    const threatFromPlayer = c.awareness > 0.75 && dPlayer < 35 && !p.dead;
    if (pred || threatFromPlayer || (h && h.mode === 'flee')) {
      const from = pred ? pred.pos : p.pos;
      c.setState('flee');
      c.away(from.x, from.z, (c.stamina > 0.2 ? sp.run : sp.run * 0.55) * (c.juvenile ? 0.9 : 1));
      P0.alert = 0.3;
      if (h && h.mode !== 'flee') { h.mode = 'flee'; h.modeT = 0; this.events.call(c, 'alarm', 0.8); }
      return;
    }
    if (c.awareness > 0.35 && dPlayer < 60) {
      // 気づいて見つめる（ここで近づき方を誤ると逃げる）
      c.setState('alert'); c.desiredSpeed = 0; P0.alert = 1;
      c.desiredYaw = Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z);
      return;
    }
    if (!h) return;
    if (h.mode === 'rest' || night) { c.setState('rest'); c.desiredSpeed = 0; P0.rest = 1; return; }
    if (h.mode === 'drink' && h.target) {
      const d = Math.hypot(h.target.x - c.pos.x, h.target.z - c.pos.z);
      if (d < 10) { c.setState('drink'); c.desiredSpeed = 0; P0.graze = 1; return; }
      c.setState('wander'); this.followHerd(c, sp.walk * 1.4, 2.2); return;
    }
    // 採食しながら少しずつ動く
    if (c === h.leader) {
      if (h.target && Math.hypot(h.target.x - c.pos.x, h.target.z - c.pos.z) > 6) { c.setState('wander'); c.seek(h.target.x, h.target.z, sp.walk); }
      else { c.setState('graze'); c.desiredSpeed = 0; P0.graze = 1; }
    } else {
      c.setState(c.speed > 0.4 ? 'wander' : 'graze');
      this.followHerd(c, sp.walk, 2.4);
      if (c.speed < 0.4) P0.graze = 0.8 + 0.2 * Math.sin(c.stateT + c.id);
    }
  }

  /** 絆を結んだ（結ぶ前の）カゼアシ「コハク」 */
  private thinkMount(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const P0 = c.params;
    const sp = c.sp;
    const bonded = c.tag === 'mount';
    const pred = this.nearestPredator(c, 30);
    if (pred) {
      // 肉食獣の匂いに怯える（騎獣の制約）
      c.setState('flee'); c.away(pred.pos.x, pred.pos.z, sp.run * 0.8); P0.alert = 1;
      if (c.stateT < 0.2) this.events.call(c, 'alarm', 1);
      return;
    }
    if (bonded && c.target) {
      // 口笛で呼ばれた
      const d = Math.hypot(c.target.x - c.pos.x, c.target.z - c.pos.z);
      if (d > 2.6) { c.setState('follow'); c.seek(c.target.x, c.target.z, d > 25 ? sp.run * 0.8 : d > 7 ? sp.walk * 3.5 : sp.walk * 1.2); return; }
      c.target = null;
    }
    // 驚かせる近づき方：匂い（風上）、立ったまま、物音。身を低く静かに近づけば、見つめるだけで逃げない
    // 信頼した後は、そばに立っても驚かない
    const startling = !c.trust && (c.smelled || !p.crouched || p.noise > 0.3);
    if (c.escort && !pred) {
      // 送り届け：肉食獣がいなければ水場へ向かう
      c.setState('led');
      const d = Math.hypot(c.escort.x - c.pos.x, c.escort.z - c.pos.z);
      if (d > 3) c.seek(c.escort.x, c.escort.z, sp.walk * 1.3); else { c.desiredSpeed = 0; P0.graze = 1; }
      return;
    }
    if (!bonded && !c.trust && c.state === 'flee' && c.stateT < 3) { c.away(p.pos.x, p.pos.z, sp.run * 0.5); P0.alert = 0.8; return; }
    if (!bonded && c.awareness > 0.7 && dPlayer < 25 && startling) {
      c.setState('flee'); c.away(p.pos.x, p.pos.z, sp.run * 0.5); P0.alert = 0.8;
      this.events.call(c, 'alarm', 0.8);
      c.awareness = 0.45;
      return;
    }
    if (c.state === 'led' && c.target) {
      c.seek(c.target.x, c.target.z, sp.walk * 1.2);
      if (Math.hypot(c.target.x - c.pos.x, c.target.z - c.pos.z) < 4) { c.desiredSpeed = 0; P0.graze = 1; }
      return;
    }
    c.setState('graze'); c.desiredSpeed = 0; P0.graze = 0.7 + 0.3 * Math.sin(c.stateT * 0.6);
    if (c.awareness > 0.3 && dPlayer < 30) { P0.alert = 0.8; P0.graze = 0; c.desiredSpeed = 0; c.stateT = 0; c.desiredYaw = Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z); }
    else if (c.stateT > 8) { c.stateT = 0; c.desiredYaw += (Math.random() - 0.5) * 2; c.desiredSpeed = sp.walk * 0.5; }
  }

  /** クサガリ：群れの狩りと、プレイヤーへの威嚇・攻撃 */
  private thinkKusagari(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const h = c.herd!;
    const sp = c.sp;
    const P0 = c.params;
    // 攻撃の途中（予兆→跳びかかり）
    if (c.state === 'attack') { this.runAttack(c, dt, p); return; }
    if (c.hp < c.maxHp * 0.35 || c.fear > 0.7 || h.mode === 'flee') {
      c.setState('flee');
      const from = c.targetPlayer || c.fear > 0.7 ? p.pos : (h.leader?.pos ?? c.pos);
      c.away(from.x, from.z, sp.run * 0.9);
      c.targetPlayer = false;
      if (c.hp < c.maxHp * 0.35 && h.mode !== 'flee') { h.mode = 'flee'; h.modeT = 0; }
      return;
    }
    // 野営地（火のそば）には近づかない
    const campD = Math.hypot(c.pos.x - P.camp.x, c.pos.z - P.camp.z);
    if (campD < 55) { c.setState('wander'); c.away(P.camp.x, P.camp.z, sp.walk * 2); return; }
    // プレイヤーへの反応：空腹なら狙う、満腹なら威嚇して距離をとる
    if (!p.dead && c.awareness > 0.55 && dPlayer < 45 && h.mode !== 'eat') {
      const hungry = h.hunger > 0.45;
      if (hungry && !p.mounted) {
        c.targetPlayer = true;
        if (dPlayer > 6) { c.setState('chase'); c.seek(p.pos.x, p.pos.z, sp.run * 0.75); P0.crouch = 0.3; }
        else if (c.attackCd <= 0) { c.setState('attack'); c.attackPhase = 0; c.attackKind = 0; this.events.call(c, 'hiss', 0.9); }
        else { c.setState('threaten'); circleAround(c, p.pos, 7, sp.walk * 2); P0.jaw = 0.6; }
        this.events.observe('kusagari', 'hunt', c);
        return;
      }
      if (dPlayer < 20) {
        c.setState('threaten'); c.targetPlayer = true;
        c.desiredYaw = Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z); c.desiredSpeed = dPlayer < 10 ? -0 : 0;
        if (dPlayer < 10) c.away(p.pos.x, p.pos.z, sp.walk);
        P0.jaw = 0.5 + 0.5 * Math.sin(c.stateT * 6); P0.rear = 0.2;
        if (c.stateT < dt * 2 || Math.random() < dt * 0.4) this.events.call(c, 'hiss', 0.7);
        this.events.observe('kusagari', 'threat', c);
        return;
      }
    }
    c.targetPlayer = false;
    if (h.mode === 'hunt' && h.prey && !h.prey.dead) {
      const prey = h.prey;
      const d = prey.pos.distanceTo(c.pos);
      if (d > 40 && prey.state !== 'flee') { c.setState('stalk'); c.seek(prey.pos.x, prey.pos.z, sp.walk * 1.3); P0.crouch = 0.8; }
      else {
        c.setState('chase');
        // 回り込み：群れの中の位置で少しずらす
        const idx = h.members.indexOf(c);
        const off = (idx - 1.5) * 4;
        const fx = Math.sin(prey.yaw), fz = Math.cos(prey.yaw);
        c.seek(prey.pos.x + fz * off + fx * 3, prey.pos.z - fx * off + fz * 3, sp.run);
        P0.crouch = 0.2; P0.jaw = 0.4;
        if (d < 2.2 + prey.radius) {
          // 物語上の個体（コハク）は仕留められない：追い回されて逃げるだけ
          if (prey.tag === 'kohaku' || prey.tag === 'mount') { prey.awareness = 1; }
          else {
            prey.hp -= 40 * dt;
            if (prey.hp <= 0) this.killCreature(prey, c);
          }
        }
      }
      return;
    }
    if (h.mode === 'eat' && h.prey) {
      const prey = h.prey;
      const d = prey.pos.distanceTo(c.pos);
      if (d > 2.5) { c.setState('wander'); c.seek(prey.pos.x, prey.pos.z, sp.walk * 1.5); }
      else { c.setState('eat'); c.desiredSpeed = 0; P0.graze = 1; P0.jaw = 0.5 + 0.5 * Math.sin(c.stateT * 5); prey.eaten += dt * 0.004; }
      // オオアギトが来たら獲物を明け渡す（縄張り争い）
      const big = this.creatures.find((o) => o.sp.id === 'ooagito' && !o.dead && o.pos.distanceTo(c.pos) < 30);
      if (big) { h.mode = 'flee'; h.modeT = 0; this.events.call(c, 'hiss', 1); this.events.observe('kusagari', 'threat', c); }
      return;
    }
    c.setState('wander');
    this.followHerd(c, sp.walk, 3);
    this.separate(c, 1.5);
  }

  /** 予兆 → 実行 → 硬直（予兆は難易度で伸びる） */
  telegraphScale = 1;
  private runAttack(c: Creature, dt: number, p: PlayerSense) {
    const P0 = c.params;
    c.attackPhase += dt;
    const tele = (c.sp.id === 'ooagito' ? 0.9 : 0.55) * this.telegraphScale;
    const toP = Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z);
    if (c.attackPhase < tele) {
      // 予兆：身を沈め、口を開き、相手を見る
      c.desiredSpeed = 0; c.faceSmooth(toP, dt, 6); c.desiredYaw = c.yaw;
      P0.crouch = 0.9; P0.jaw = 0.8;
      if (c.sp.id === 'ooagito') { P0.headPitch = -0.3; P0.crouch = 0.4; }
      return;
    }
    if (c.attackPhase < tele + 0.35) {
      // 跳びかかり：向きは固定（予兆の後は追尾しない＝避けられる）
      c.desiredYaw = c.yaw; c.desiredSpeed = c.sp.id === 'ooagito' ? 8 : 12; c.speed = c.desiredSpeed;
      P0.jaw = 1; P0.crouch = 0;
      if (c.attackKind === 0 && c.attackPhase - dt < tele + 0.2 && c.attackPhase >= tele + 0.2) {
        // 当たり判定：頭の前方
        const reach = c.sp.id === 'ooagito' ? 4.5 : 2.4;
        const hx = c.pos.x + Math.sin(c.yaw) * reach * 0.7, hz = c.pos.z + Math.cos(c.yaw) * reach * 0.7;
        if (!p.dead && Math.hypot(p.pos.x - hx, p.pos.z - hz) < reach * 0.8 && Math.abs(p.pos.y - c.pos.y) < 3) {
          this.events.playerHit(c.sp.id === 'ooagito' ? 34 : 14, c.pos.clone(), c.sp.id === 'ooagito' ? 7 : 3, c);
        }
        c.attackKind = 1;
      }
      return;
    }
    // 硬直（反撃の好機）
    c.desiredSpeed = 0; P0.jaw = 0.2;
    if (c.attackPhase > tele + 0.35 + (c.sp.id === 'ooagito' ? 1.3 : 0.8)) { c.setState('chase'); c.attackCd = c.sp.id === 'ooagito' ? 3 : 2.2; }
  }

  private thinkHimeyoroi(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const h = c.herd!;
    const P0 = c.params;
    const sp = c.sp;
    if (c.state === 'curl') { P0.rest = 1; c.desiredSpeed = 0; if (c.stateT > 6 && dPlayer > 5) c.setState('idle'); return; }
    if (dPlayer < 3.5 && !p.crouched && c.awareness > 0.3) { c.setState('curl'); this.events.observe('himeyoroi', 'threat', c); return; }
    const pred = this.nearestPredator(c, 18);
    if (pred) { c.setState('curl'); return; }
    if (h.mode === 'thorn' && h.target) {
      if (c === h.leader && Math.hypot(h.target.x - c.pos.x, h.target.z - c.pos.z) < 3.5) {
        c.setState('graze'); c.desiredSpeed = 0; P0.graze = 1;
        // 実際に棘の低木を減らす
        const th = this.world.flora.thicketPlacements;
        const i = th.findIndex((q, k) => !this.world.flora.thicketCut.has(k) && Math.hypot(q.x - c.pos.x, q.z - c.pos.z) < 4);
        if (i >= 0 && c.stateT > 25) { this.world.flora.cutThicket(i); h.target = null; h.modeT = 99; }
        this.events.observe('himeyoroi', 'thorn', c);
        return;
      }
    }
    c.setState('wander');
    // 産卵へ向かう移動はふだんより急ぐ
    this.followHerd(c, sp.walk * (h.mode === 'nest' ? 1.6 : 1), 1.6);
    if (c.blocked && h.mode === 'nest') c.setState('blocked');
    this.separate(c, 1.2);
  }

  private thinkFlyer(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const P0 = c.params;
    const t = this.world.terrain;
    if (c.state === 'land' || c.state === 'eat' || c.state === 'graze') {
      // 地上：歩いて餌をついばむ
      P0.graze = 0.6 + 0.4 * Math.sin(c.stateT * 3);
      c.desiredSpeed = c.state === 'eat' ? 0 : c.sp.walk * 0.5;
      if (c.stateT > (c.sp.id === 'kagewatari' ? 40 : 30) || (dPlayer < (c.sp.id === 'kagewatari' ? 14 : 9) && c.awareness > 0.3)) {
        c.setState('fly'); c.altitude = 1; this.events.call(c, c.sp.id === 'kagewatari' ? 'hiss' : 'chirp', 0.6);
      }
      return;
    }
    // 飛行：中心の周りを旋回
    c.setState('fly');
    P0.flying = 1;
    const targetAlt = c.tag === 'escort' ? 26 : c.tag === 'scav' ? 30 : (c.sp.id === 'kagewatari' ? 80 : 40);
    if (c.tag === 'escort') {
      const herd = this.herds.find((x) => x.species === 'sorakubi');
      if (herd?.leader) c.flyCenter.set(herd.leader.pos.x, 0, herd.leader.pos.z);
    }
    const climbing = c.altitude < targetAlt - 5;
    c.altitude = lerp(c.altitude, targetAlt, dt * (climbing ? 0.25 : 0.1));
    P0.flap = climbing ? 1 : 0.15 + 0.1 * Math.sin(c.stateT * 0.5);
    const speed = c.sp.id === 'kagewatari' ? 13 : 8;
    c.flyAngle += (speed / Math.max(10, c.flyRadius)) * dt;
    const tx = c.flyCenter.x + Math.cos(c.flyAngle) * c.flyRadius;
    const tz = c.flyCenter.z + Math.sin(c.flyAngle) * c.flyRadius;
    c.seek(tx, tz, speed);
    // カゲワタリは時々川辺に降りて狩りをする
    if (c.sp.id === 'kagewatari' && c.stateT > 70 && Math.random() < dt * 0.02) {
      const rn = riverLine.nearest(c.pos.x, c.pos.z);
      if (rn.dist < 200) {
        const q = riverLine.pointAt(rn.s);
        const w = riverHalfWidth(rn.s, q.x, q.z) + 4;
        c.flyCenter.set(q.x + w, 0, q.z);
        c.flyRadius = 12;
        c.setState('fly'); c.stateT = 0; c.tag = 'landing';
      }
    }
    if (c.tag === 'landing' && c.flyRadius <= 12) {
      c.altitude = lerp(c.altitude, 0, dt * 0.3);
      if (c.altitude < 1.5) { c.altitude = 0; c.setState('land'); c.tag = ''; c.flyRadius = 140; this.events.observe('kagewatari', 'hunt', c); }
    }
    if (c.stateT > 0.5) this.events.observe(c.sp.id, 'fly', c);
    void t;
  }

  private thinkRodent(c: Creature, dt: number, p: PlayerSense, dPlayer: number, night: boolean) {
    const P0 = c.params;
    c.rig.root.visible = night || c.state === 'eat';
    if (!night && c.state !== 'eat') { c.desiredSpeed = 0; c.setState('rest'); return; }
    if (dPlayer < 6 && p.noise > 0.3) { c.setState('flee'); c.away(p.pos.x, p.pos.z, c.sp.run); return; }
    if (p.crouched && p.noise < 0.2 && dPlayer < 12 && c.state !== 'flee') {
      // 好奇心：静かにしていると寄ってくる
      c.setState('follow'); c.seek(p.pos.x, p.pos.z, dPlayer > 2 ? c.sp.walk : 0); P0.alert = 0.5; return;
    }
    if (c.stateT > 3 || c.state === 'rest') {
      c.setState('wander'); c.stateT = 0;
      c.desiredYaw = c.yaw + (Math.random() - 0.5) * 3; c.desiredSpeed = Math.random() < 0.5 ? 0 : c.sp.walk * 2;
    }
  }

  private thinkSuikaku(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const P0 = c.params;
    if (c.tag === 'orga') return;
    if (c.state === 'stuck') {
      // 泥にはまった幼体：鳴いて親を呼ぶ
      c.desiredSpeed = 0; P0.alert = 0.3; P0.rest = 0.25;
      if (Math.random() < dt * 0.15) this.events.call(c, 'distress', 0.7);
      return;
    }
    if (c.state === 'led') {
      // 誘導中：プレイヤーから離れる方向へ、避難の茂みがあれば引き寄せられる
      const gd = Math.hypot(P.grove.x - c.pos.x, P.grove.z - c.pos.z);
      if (gd < 14) { c.setState('idle'); c.tag = c.tag.replace('juvenile', 'safe'); this.events.observe('suikaku', 'protect', c); return; }
      const ax = c.pos.x - p.pos.x, az = c.pos.z - p.pos.z;
      const ad = Math.hypot(ax, az) || 1;
      let vx = 0, vz = 0;
      if (ad < 9) { vx += (ax / ad) * (9 - ad); vz += (az / ad) * (9 - ad); }
      // 茂みの匂い（群れの気配）に引かれる。プレイヤーが後ろから近づくと、その向きへ押し出される
      if (gd < 170) { const k = gd < 60 ? 2 : 1; vx += ((P.grove.x - c.pos.x) / gd) * k; vz += ((P.grove.z - c.pos.z) / gd) * k; }
      if (Math.hypot(vx, vz) > 0.3) { c.desiredYaw = Math.atan2(vx, vz); c.desiredSpeed = Math.min(3.2, Math.hypot(vx, vz) * 0.8); }
      else c.desiredSpeed = 0;
      return;
    }
    if (c.tag.startsWith('safe')) { c.setState('graze'); c.desiredSpeed = 0; P0.graze = 0.8; return; }
    if (c.herd) {
      if (dPlayer < 20 && c.awareness > 0.5) { c.setState('threaten'); P0.alert = 1; c.desiredSpeed = 0; c.desiredYaw = Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z); this.events.observe('suikaku', 'threat', c); return; }
      c.setState('graze'); this.followHerd(c, c.sp.walk, 8);
      if (c.speed < 0.3) P0.graze = 1;
    }
  }

  private patrolPts = [{ x: 540, z: -90 }, { x: 610, z: 40 }, { x: 560, z: 170 }, { x: 470, z: -40 }, { x: 430, z: -150 }, { x: 520, z: -200 }];
  private patrolI = 0;
  private thinkOoagito(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    const P0 = c.params;
    const sp = c.sp;
    if (c.state === 'attack') { this.runAttack(c, dt, p); return; }
    if (c.hp < c.maxHp * 0.3) { c.setState('flee'); c.away(p.pos.x, p.pos.z, sp.run * 0.6); c.targetPlayer = false; return; }
    // 死骸があれば奪いに行く
    const carcass = this.creatures.find((o) => o.dead && o.eaten < 0.8 && o.sp.mass > 100 && o.pos.distanceTo(c.pos) < 220);
    if (!p.dead && c.awareness > 0.6 && dPlayer < 50) {
      c.targetPlayer = true;
      if (dPlayer > 28 && c.state !== 'chase') {
        c.setState('threaten'); c.desiredSpeed = 0; c.desiredYaw = Math.atan2(p.pos.x - c.pos.x, p.pos.z - c.pos.z);
        P0.jaw = 0.8; P0.headPitch = -0.3;
        if (c.stateT < 0.1) this.events.call(c, 'roar', 1.4);
        this.events.observe('ooagito', 'threat', c);
        if (c.stateT > 4) c.setState('chase');
        return;
      }
      c.setState('chase');
      if (dPlayer < 6 && c.attackCd <= 0) { c.setState('attack'); c.attackPhase = 0; c.attackKind = 0; this.events.call(c, 'roar', 1); return; }
      c.seek(p.pos.x, p.pos.z, sp.run * 0.7);
      return;
    }
    c.targetPlayer = false;
    if (carcass) {
      const d = carcass.pos.distanceTo(c.pos);
      if (d > 4) { c.setState('wander'); c.seek(carcass.pos.x, carcass.pos.z, sp.walk * 1.4); }
      else { c.setState('eat'); c.desiredSpeed = 0; P0.graze = 1; P0.jaw = 0.5 + 0.5 * Math.sin(c.stateT * 3); carcass.eaten += dt * 0.006; this.events.observe('ooagito', 'carcass', c); }
      return;
    }
    c.setState('patrol');
    const tp = this.patrolPts[this.patrolI];
    if (Math.hypot(tp.x - c.pos.x, tp.z - c.pos.z) < 10) this.patrolI = (this.patrolI + 1) % this.patrolPts.length;
    c.seek(tp.x, tp.z, sp.walk);
    if (Math.random() < dt * 0.01) this.events.call(c, 'call', 1.2);
  }

  private thinkNedamari(c: Creature, dt: number, p: PlayerSense, dPlayer: number) {
    if (c.stateT > 12 || c.state === 'idle') {
      c.setState('wander'); c.stateT = 0;
      c.desiredYaw = c.yaw + (Math.random() - 0.5) * 1.2;
      c.desiredSpeed = c.sp.walk;
    }
    if (dPlayer < 3 && c.awareness > 0.3) { c.params.rest = 1; c.desiredSpeed = 0; }
  }

  // ------------------------------------------------------------ 移動と表示

  private move(c: Creature, dt: number) {
    if (c.state === 'scripted' || c.state === 'mounted') return;
    const t = this.world.terrain;
    const prevX = c.pos.x, prevZ = c.pos.z;
    // 前方に障害がないか（深い水・崖）
    const look = Math.max(3, c.radius * 2 + c.speed * 0.8);
    const lx = c.pos.x + Math.sin(c.desiredYaw) * look, lz = c.pos.z + Math.cos(c.desiredYaw) * look;
    if (c.desiredSpeed > 0 && this.blockedAt(c, lx, lz)) {
      // 左右を試す
      let found = false;
      for (const off of [0.6, -0.6, 1.2, -1.2, 2, -2]) {
        const a = c.desiredYaw + off;
        if (!this.blockedAt(c, c.pos.x + Math.sin(a) * look, c.pos.z + Math.cos(a) * look)) { c.desiredYaw = a; found = true; break; }
      }
      if (!found) c.desiredSpeed = 0;
    }
    c.integrate(dt);
    if (this.blockedAt(c, c.pos.x, c.pos.z)) { c.pos.x = prevX; c.pos.z = prevZ; c.speed *= 0.5; }
    // 静的な障害物
    if (!(c.sp.flying && c.state === 'fly')) {
      const before = { x: c.pos.x, z: c.pos.z };
      const hit = this.world.colliders.resolve(c.pos, c.radius * 0.6, c.pos.y + 0.3);
      c.blocked = hit && Math.hypot(before.x - c.pos.x, before.z - c.pos.z) > 0.001 && c.herd?.mode === 'nest';
      if (hit) c.stuckT += dt; else c.stuckT = 0;
      if (c.stuckT > 2 && c.herd?.mode !== 'nest') { c.desiredYaw += Math.PI * 0.6; c.stuckT = 0; }
    }
    let gy = t.height(c.pos.x, c.pos.z);
    const bh = this.world.flora.bridgeHeight(c.pos.x, c.pos.z);
    if (bh !== null && bh > gy) gy = bh;
    c.pos.y = gy + (c.sp.flying ? c.altitude : 0);
  }

  private present(c: Creature, dt: number, d: number, p: PlayerSense) {
    const r = c.rig.root;
    const viewD = c.sp.viewDistance * (c.juvenile ? 0.6 : 1);
    const inView = d < viewD && (c.sp.id !== 'tsuchinezumi' || r.visible);
    if (c.sp.id !== 'tsuchinezumi') r.visible = d < viewD;
    if (!inView) return;
    r.position.copy(c.pos);
    // 影を落とすのは影の範囲にいる個体だけ（遠くの個体の分の描画を省く）
    c.rig.mesh.castShadow = d < 120 || c.tag === 'orga';
    // 大きな生物は地面の傾きに合わせて体を傾ける
    const t = this.world.terrain;
    let pitch = 0, roll = 0;
    if (!c.sp.flying || c.state !== 'fly') {
      const L = Math.max(1, c.rig.template.length * c.scale * 0.35);
      const fx = Math.sin(c.yaw), fz = Math.cos(c.yaw);
      const hf = t.height(c.pos.x + fx * L, c.pos.z + fz * L), hb = t.height(c.pos.x - fx * L, c.pos.z - fz * L);
      pitch = -Math.atan2(hf - hb, 2 * L) * 0.8;
      const W = Math.max(0.5, c.radius);
      const hr = t.height(c.pos.x + fz * W, c.pos.z - fx * W), hl = t.height(c.pos.x - fz * W, c.pos.z + fx * W);
      roll = Math.atan2(hr - hl, 2 * W) * 0.5;
    } else {
      roll = clamp(-c.turnRate * 0.6, -0.6, 0.6);
    }
    r.rotation.set(0, 0, 0);
    r.rotateY(c.yaw);
    r.rotateX(pitch);
    r.rotateZ(roll);
    // アニメーションの更新頻度も距離で間引く
    const animRate = d < 80 ? 0 : d < 250 ? 0.05 : 0.15;
    c.animTimer += dt;
    if (c.animTimer >= animRate) {
      const adt = c.animTimer;
      c.animTimer = 0;
      c.params.speed = c.speed;
      c.params.turnRate = c.turnRate;
      c.params.dead = c.dead ? 1 : 0;
      if (c.dead) { c.params.speed = 0; }
      c.anim.update(adt, c.params);
      // 足が着いた瞬間：足跡・足音・土煙・揺れ
      if (c.anim.planted.length && d < 220) {
        r.updateMatrixWorld(true);
        for (const li of c.anim.planted) {
          const lb = c.rig.template.legBones[li];
          const foot = c.rig.bones[lb.foot];
          foot.getWorldPosition(tmpV2);
          tmpV2.y = t.height(tmpV2.x, tmpV2.z);
          const weight = c.sp.mass * c.scale ** 3 / (c.sp.scale ** 3);
          if (d < 160 && c.speed > 0.2) {
            this.world.footprints.add({
              species: c.sp.id, kind: c.sp.foot, x: tmpV2.x, z: tmpV2.z, time: this.world.clock.total, heading: c.yaw,
              size: c.sp.footSize * c.scale / c.sp.scale * (c.juvenile ? 0.9 : 1), depth: Math.min(0.5, Math.pow(weight, 0.33) * 0.012), speed: c.speed, trackId: c.trackId,
            });
          }
          this.events.footstep(c, tmpV2, weight);
          if (weight > 3000) {
            this.world.particles.emit(tmpV2.x, tmpV2.y + 0.2, tmpV2.z, weight > 20000 ? 6 : 3, 0, 1.2 * c.scale, 60, 2.2, 1.2);
            this.events.shake(tmpV2, Math.min(1, weight / 40000), 60 + weight / 400);
          }
        }
      }
    }
    // 草を押しのける（大きな生物は脚ごと、それ以外は体の中心）
    if (d < 70) {
      if (c.sp.mass > 2000) {
        for (const lb of c.rig.template.legBones) {
          if (lb.spec.kind === 'arm') continue;
          c.rig.bones[lb.foot].getWorldPosition(tmpV2);
          this.world.grass.addPusher(tmpV2.x, tmpV2.z, 1.2 * c.scale, 1, this.camPos.x, this.camPos.z);
        }
      } else if (!c.sp.flying || c.state !== 'fly') {
        this.world.grass.addPusher(c.pos.x, c.pos.z, Math.max(0.4, c.radius * 1.5), 1, this.camPos.x, this.camPos.z);
      }
    }
    // 観察：見えている時間を数える
    tmpV.copy(c.pos); tmpV.y += c.rig.template.height * c.scale * 0.5;
    const seeR = 30 + c.rig.template.height * c.scale * 22;
    const visible = d < seeR * (1 - this.world.weather.fog * 0.4) && this.frustum.containsPoint(tmpV) && r.visible;
    c.visibleT = visible ? c.visibleT + dt : 0;
    if (c.visibleT > 1.2) {
      this.events.observe(c.sp.id, 'seen', c);
      const st = c.state;
      const nearEnough = d < seeR * 0.8;
      if (nearEnough) {
        if (c.sp.id === 'sorakubi' && st === 'migrate' && c.visibleT > 3) this.events.observe('sorakubi', 'herd', c);
        if (st === 'graze' && c.visibleT > 2.5) this.events.observe(c.sp.id, 'graze', c);
        if (st === 'drink' && c.visibleT > 2) this.events.observe(c.sp.id, 'drink', c);
        if (st === 'rest' && this.world.clock.isNight() && c.visibleT > 2) this.events.observe(c.sp.id, 'sleep', c);
        if (st === 'protect') this.events.observe(c.sp.id, 'protect', c);
        if (st === 'chase' && c.sp.id === 'kusagari') this.events.observe('kusagari', 'hunt', c);
        if (st === 'eat' && (c.sp.id === 'honetsutsuki' || c.sp.id === 'tsuchinezumi')) this.events.observe(c.sp.id, 'carcass', c);
        if (st === 'blocked') this.events.observe('himeyoroi', 'track', c);
      }
    }
    void p;
  }

  // ------------------------------------------------------------ 死と死骸

  killCreature(prey: Creature, pred: Creature | null) {
    if (prey.dead) return;
    prey.dead = true;
    prey.deadAt = this.world.clock.total;
    prey.setState('dead');
    prey.speed = 0; prey.desiredSpeed = 0;
    if (prey.herd) { prey.herd.members = prey.herd.members.filter((m) => m !== prey); }
    this.events.call(prey, 'distress', 1);
    this.events.kill(pred, prey);
    // 羽毛が落ちる
    if (prey.sp.id === 'kazeashi' || prey.sp.id === 'kusagari') this.addDrop(prey.sp.id, prey.pos.x + 1, prey.pos.z + 1, 'feather');
    // 腐肉食の群れが来る
    this.scavengerFlocks.push({ carcass: prey, birds: [] });
  }

  private updateScavengers(dt: number) {
    for (const f of this.scavengerFlocks) {
      const age = this.world.clock.total - f.carcass.deadAt;
      if (!f.birds.length && age > 0.15) {
        for (let i = 0; i < 6; i++) {
          const b = this.spawn('honetsutsuki', f.carcass.pos.x + (Math.random() - 0.5) * 60, f.carcass.pos.z + (Math.random() - 0.5) * 60);
          b.tag = 'scav'; b.flyCenter.copy(f.carcass.pos); b.flyRadius = 18 + Math.random() * 10; b.altitude = 45;
          f.birds.push(b);
        }
      }
      // 捕食者が去ったら降りて食べる
      const busy = this.creatures.some((o) => !o.dead && o.sp.diet === 'meat' && !o.sp.flying && o.pos.distanceTo(f.carcass.pos) < 12);
      for (const b of f.birds) {
        if (b.dead) continue;
        if (!busy && age > 0.3 && b.state === 'fly' && Math.random() < dt * 0.1) {
          b.setState('eat'); b.altitude = 0; b.pos.set(f.carcass.pos.x + (Math.random() - 0.5) * 3, 0, f.carcass.pos.z + (Math.random() - 0.5) * 3);
        }
        if (b.state === 'eat') { b.params.graze = 1; f.carcass.eaten += dt * 0.001; }
      }
      // 骨になったら片付ける
      if (age > 2.5 || f.carcass.eaten > 1) {
        f.carcass.rig.root.scale.multiplyScalar(0.985);
        if (f.carcass.rig.root.scale.x < f.carcass.scale * 0.2) this.remove(f.carcass);
        for (const b of f.birds) if (b.state === 'eat') { b.setState('fly'); b.altitude = 2; }
        if (age > 3) for (const b of f.birds) this.remove(b);
      }
    }
    this.scavengerFlocks = this.scavengerFlocks.filter((f) => this.creatures.includes(f.carcass));
  }

  remove(c: Creature) {
    const i = this.creatures.indexOf(c);
    if (i >= 0) this.creatures.splice(i, 1);
    this.group.remove(c.rig.root);
    if (c.herd) c.herd.members = c.herd.members.filter((m) => m !== c);
    c.dead = true;
  }

  /** 湧き床の設定に合わせ、見ていない遠くで個体を補う（絶滅させない） */
  private replenish(p: PlayerSense) {
    for (const h of this.herds) {
      const sp = SPECIES[h.species];
      const want = h.species === 'kazeashi' ? 6 : h.species === 'kusagari' ? 3 : 0;
      if (!want || h.members.length >= want) continue;
      const a = Math.random() * Math.PI * 2;
      const x = h.home.x + Math.cos(a) * h.home.r, z = h.home.z + Math.sin(a) * h.home.r;
      const d = Math.hypot(x - p.pos.x, z - p.pos.z);
      tmpV.set(x, this.world.terrain.height(x, z) + 1, z);
      if (d < 250 || this.frustum.containsPoint(tmpV)) continue;
      const c = this.spawn(h.species, x, z, false, h);
      if (h.species === 'kusagari') c.hp = c.maxHp;
      void sp;
    }
    // 回復した捕食者は体力を戻す
    for (const c of this.creatures) if (!c.dead && c.state !== 'chase' && c.state !== 'attack') c.hp = Math.min(c.maxHp, c.hp + c.maxHp * 0.1);
  }

  // ------------------------------------------------------------ 落とし物

  addDrop(species: string, x: number, z: number, kind: 'feather' | 'scale') {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.4, 4), new THREE.MeshStandardMaterial({ color: species === 'kusagari' ? 0x3a342a : 0x9a7a52, roughness: 0.9 }));
    m.rotation.z = Math.PI / 2; m.position.y = 0.05;
    g.add(m);
    g.position.set(x, this.world.terrain.height(x, z), z);
    g.rotation.y = Math.random() * 6;
    this.world.scene.add(g);
    this.drops.push({ id: this.dropId++, species, kind, pos: g.position.clone(), mesh: g, t: 0 });
  }
  private updateDrops(dt: number, p: PlayerSense) {
    for (const d of this.drops) d.t += dt;
    void p;
  }
  takeDrop(id: number) {
    const i = this.drops.findIndex((d) => d.id === id);
    if (i < 0) return null;
    const d = this.drops[i];
    this.world.scene.remove(d.mesh);
    this.drops.splice(i, 1);
    return d;
  }

  // ------------------------------------------------------------ 戦闘

  hitCreature(c: Creature, dmg: number, posture: number, from: THREE.Vector3, p: PlayerSense) {
    if (c.dead) return;
    const sp = c.sp;
    c.hp -= dmg;
    c.posture += posture;
    c.awareness = 1;
    if (c.posture > (sp.id === 'kusagari' ? 35 : sp.id === 'ooagito' ? 90 : 60)) { c.posture = 0; c.stagger = 1.8; this.events.call(c, 'distress', 0.8); }
    else c.stagger = Math.max(c.stagger, 0.25);
    if (sp.id === 'kusagari') {
      c.fear += 0.12;
      if (Math.random() < 0.3) this.addDrop('kusagari', c.pos.x + (Math.random() - 0.5) * 2, c.pos.z + (Math.random() - 0.5) * 2, 'feather');
      if (c.hp <= 0) { c.hp = c.maxHp * 0.2; c.fear = 1; if (c.herd) { c.herd.mode = 'flee'; c.herd.modeT = 0; } }
    } else if (sp.id === 'ooagito') {
      c.anger = 1;
      if (c.hp <= 0) { c.hp = c.maxHp * 0.25; }
    } else if (sp.disposition === 'flee' || sp.disposition === 'ignore' || sp.disposition === 'curious') {
      // 草食獣は倒さない（逃げるだけ）。むやみに攻撃しても何も得られない
      c.hp = Math.max(c.hp, c.maxHp * 0.5);
      c.awareness = 1;
      if (c.herd) { c.herd.mode = 'flee'; c.herd.modeT = 0; }
      if (sp.flying) { c.setState('fly'); c.altitude = Math.max(c.altitude, 2); }
      this.events.call(c, 'alarm', 1);
    } else if (sp.id === 'himeyoroi') {
      c.hp = Math.max(c.hp, c.maxHp * 0.5);
      c.setState('curl');
    } else if (sp.id === 'suikaku') {
      c.hp = Math.max(c.hp, c.maxHp * 0.5);
      c.setState('threaten');
    }
    void from; void p;
  }

  /** 音玉：大きな音で小型の肉食獣を追い払う */
  noiseBurst(x: number, z: number, r: number) {
    for (const c of this.creatures) {
      if (c.dead) continue;
      const d = Math.hypot(c.pos.x - x, c.pos.z - z);
      if (d > r) continue;
      if (c.sp.id === 'kusagari') { c.fear = 1; if (c.herd) { c.herd.mode = 'flee'; c.herd.modeT = 0; } }
      else if (c.sp.disposition === 'flee' || c.sp.id === 'tsuchinezumi') { c.awareness = 1; if (c.herd) { c.herd.mode = 'flee'; c.herd.modeT = 0; } }
      else if (c.sp.flying && c.state !== 'fly') { c.setState('fly'); c.altitude = 2; }
    }
  }

  creaturesNear(x: number, z: number, r: number) {
    return this.creatures.filter((c) => !c.dead && Math.hypot(c.pos.x - x, c.pos.z - z) < r + c.radius);
  }

  /** プレイヤーと大型生物の体が重ならないようにする */
  pushOut(pos: THREE.Vector3, r: number) {
    for (const c of this.creatures) {
      if (c.dead || (c.sp.flying && c.state === 'fly') || c.sp.mass < 60 || c.state === 'mounted') continue;
      const R = c.radius + r;
      // 胴体の中心線に沿って2点で近似
      for (const k of [-0.3, 0.2]) {
        const cx = c.pos.x + Math.sin(c.yaw) * c.rig.template.length * c.scale * k;
        const cz = c.pos.z + Math.cos(c.yaw) * c.rig.template.length * c.scale * k;
        const dx = pos.x - cx, dz = pos.z - cz;
        const d = Math.hypot(dx, dz);
        if (d < R && d > 0.001 && pos.y < c.pos.y + c.rig.template.height * c.scale) { pos.x = cx + (dx / d) * R; pos.z = cz + (dz / d) * R; }
      }
    }
  }
}

function circleAround(c: Creature, center: THREE.Vector3, r: number, speed: number) {
  const a = Math.atan2(c.pos.x - center.x, c.pos.z - center.z) + 0.6;
  c.seek(center.x + Math.sin(a) * r, center.z + Math.cos(a) * r, speed);
}

export type { SpeciesDef };
