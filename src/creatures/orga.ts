import * as THREE from 'three';
import { Creature } from './creature';
import { Ecosystem } from './ecosystem';
import { World } from '../world/world';
import { P, ORGA_PATH } from '../world/layout';
import { clamp, wrapAngle } from '../core/noise';
import { patchWorldMaterial } from '../world/shading';

// 翠角王オルガ：背中の共振装置「導き杭」に苦しむ角竜の王。
// 勝利条件は危機の解決（杭を壊し、装置を引き抜く）。正面から殴り続けても硬い皮に弾かれる。

export type OrgaPhase = 'dormant' | 'p1' | 'p2' | 'p3' | 'exhausted' | 'extract' | 'resolved' | 'walkToBridge' | 'calm';
type Action = 'none' | 'turn' | 'chargeTele' | 'charge' | 'recover' | 'stuck' | 'sweepTele' | 'sweep' | 'stompTele' | 'stomp' | 'pulseTele' | 'pulse' | 'bogged' | 'distracted' | 'buck' | 'guard';

export interface BossHost {
  playerPos(): THREE.Vector3;
  playerDead(): boolean;
  hitPlayer(dmg: number, from: THREE.Vector3, knock: number): void;
  isPlayerClimbing(): boolean;
  throwPlayer(from: THREE.Vector3, safe: boolean): void;
  message(text: string, kind?: 'boss' | 'hint' | 'info'): void;
  sound(kind: string, pos: THREE.Vector3, vol?: number): void;
  shake(strength: number): void;
  onPhase(phase: OrgaPhase): void;
  onResolved(): void;
  telegraphScale(): number;
  towerSilenced(): boolean;
  dodgeHeld(): boolean;
}

interface Pin { mesh: THREE.Mesh; hp: number; broken: boolean; exposed: boolean }

export class Orga {
  c: Creature;
  phase: OrgaPhase = 'dormant';
  action: Action = 'none';
  actT = 0;
  chargeDir = 0;
  chargeDist = 0;
  pins: Pin[] = [];
  device: THREE.Group;
  pulseT = 0;
  extractProgress = 0;
  shudder = 0;
  nextShudder = 1.5;
  resonance = 0;       // 0〜1 装置の光と音の強さ
  bridgeTarget = new THREE.Vector3(P.bridgeTree.x, 0, P.bridgeTree.z + 14);
  hitFlash = 0;
  private hitThisAction = false;
  chargesLeft = 0;
  engaged = false;
  checkpoint: { phase: OrgaPhase; pins: boolean[] } | null = null;
  lastMsg = '';

  constructor(public eco: Ecosystem, public world: World, public host: BossHost) {
    const c = eco.spawn('suikaku', P.clearing.x, P.clearing.z, false, null);
    c.tag = 'orga';
    c.scale = 2.05;
    c.rig.root.scale.setScalar(c.scale);
    c.anim.scale = c.scale;
    c.maxHp = c.hp = 99999;
    c.setState('scripted');
    c.rig.material.color.set(0xe6f0da);
    this.c = c;
    // 背中の装置（環銅の枠と3本の導き杭）
    this.device = new THREE.Group();
    const cu = new THREE.MeshStandardMaterial({ color: 0x4f8a7a, roughness: 0.4, metalness: 0.7, emissive: 0x2fd3b0, emissiveIntensity: 0.4 });
    patchWorldMaterial(cu);
    const frame = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 6, 20, Math.PI * 1.3), cu);
    frame.rotation.set(Math.PI / 2, 0, 0.4);
    this.device.add(frame);
    for (let i = 0; i < 3; i++) {
      const pinMat = cu.clone();
      pinMat.onBeforeCompile = cu.onBeforeCompile; pinMat.customProgramCacheKey = cu.customProgramCacheKey;
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.9, 6), pinMat);
      const a = -0.6 + i * 0.6;
      m.position.set(Math.cos(a) * 0.5 - 0.1, 0.25, Math.sin(a) * 0.5);
      m.rotation.set(0.25 * Math.sin(a), 0, -0.45);
      this.device.add(m);
      this.pins.push({ mesh: m, hp: 60, broken: false, exposed: i === 0 });
    }
    const bone = c.rig.bones[c.rig.template.spineBones[4]];
    this.device.position.set(-0.55, 1.05, -0.3);
    this.device.rotation.z = 0.5;
    bone.add(this.device);
  }

  get pos() { return this.c.pos; }
  get fighting() { return this.phase === 'p1' || this.phase === 'p2' || this.phase === 'p3' || this.phase === 'exhausted' || this.phase === 'extract'; }
  exposedPins() { return this.pins.filter((p) => p.exposed && !p.broken); }
  vulnerable() { return this.action === 'stuck' || this.action === 'bogged' || this.action === 'distracted' || this.phase === 'exhausted' || this.phase === 'extract'; }

  pinWorld(i: number, out = new THREE.Vector3()) { return this.pins[i].mesh.getWorldPosition(out); }
  /** 背に登ったときの位置 */
  seatWorld(out = new THREE.Vector3()) { return this.device.getWorldPosition(out).add(new THREE.Vector3(0, 0.6, 0)); }
  flankPoint(out = new THREE.Vector3()) {
    const c = this.c;
    const left = new THREE.Vector3(-Math.cos(c.yaw), 0, Math.sin(c.yaw));
    return out.copy(c.pos).addScaledVector(left, 4.2);
  }

  /** 状態の復元（セーブ・チェックポイント） */
  restore(phase: OrgaPhase, pinsBroken: boolean[]) {
    this.phase = phase;
    pinsBroken.forEach((b, i) => { this.pins[i].broken = b; this.pins[i].mesh.visible = !b; });
    this.updateExposure();
    if (phase === 'resolved' || phase === 'calm' || phase === 'walkToBridge') {
      this.phase = 'calm';
      this.device.visible = false;
      this.c.pos.set(P.clearing.x, this.world.terrain.height(P.clearing.x, P.clearing.z), P.clearing.z);
    }
    if (this.fighting) this.phase = phase === 'extract' ? 'exhausted' : phase;
    this.engaged = false;
    this.action = 'none';
  }

  private updateExposure() {
    const broken = this.pins.filter((p) => p.broken).length;
    this.pins.forEach((p, i) => { p.exposed = !p.broken && i <= broken; });
  }

  private setAction(a: Action) { this.action = a; this.actT = 0; this.hitThisAction = false; }

  begin() {
    if (this.engaged || this.phase === 'calm' || this.phase === 'resolved') return;
    this.engaged = true;
    if (this.phase === 'dormant') this.phase = 'p1';
    this.checkpoint = { phase: this.phase, pins: this.pins.map((p) => p.broken) };
    this.host.onPhase(this.phase);
    this.host.message('翠角王オルガ', 'boss');
    this.setAction('turn');
  }

  /** プレイヤーが倒れたとき：直前の段階から再開できるよう位置を戻す */
  resetForRetry() {
    if (!this.fighting) return;
    this.engaged = false;
    this.setAction('none');
    const c = this.c;
    c.pos.set(P.clearing.x, this.world.terrain.height(P.clearing.x, P.clearing.z), P.clearing.z);
    if (this.checkpoint) this.restore(this.checkpoint.phase, this.checkpoint.pins);
    if (this.phase === 'exhausted') this.phase = 'p3';
  }

  update(dt: number, juvenilesSafe: number) {
    const c = this.c;
    const pp = this.host.playerPos();
    const dP = Math.hypot(pp.x - c.pos.x, pp.z - c.pos.z);
    const tele = this.host.telegraphScale();
    this.actT += dt;
    this.hitFlash = Math.max(0, this.hitFlash - dt * 3);
    const P0 = c.params;
    P0.graze = 0; P0.alert = 0; P0.rest = 0; P0.rear = 0; P0.jaw = Math.max(0, P0.jaw - dt * 2); P0.headPitch = 0; P0.headYaw = 0; P0.crouch = 0;
    const towerQuiet = this.host.towerSilenced();
    this.resonance = Math.max(0, this.resonance - dt * 0.5);

    // 装置の光（共振）
    for (const pin of this.pins) {
      const m = pin.mesh.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = pin.broken ? 0 : 0.3 + this.resonance * 2 + (pin.exposed && this.vulnerable() ? 1.2 + Math.sin(this.world.time * 8) * 0.6 : 0);
    }

    if (this.phase === 'calm') {
      // 解決後：穏やかに空き地を歩き、若木を食む
      c.desiredSpeed = 0;
      if (this.actT > 20) { this.actT = 0; const a = Math.random() * 6.28; this.target.set(P.clearing.x + Math.cos(a) * 40, 0, P.clearing.z + Math.sin(a) * 40); }
      const d = Math.hypot(this.target.x - c.pos.x, this.target.z - c.pos.z);
      if (d > 5) c.seek(this.target.x, this.target.z, 1.2); else P0.graze = 1;
      this.integrate(dt);
      return;
    }
    if (this.phase === 'walkToBridge') { this.updateBridgeWalk(dt); return; }
    if (this.phase === 'resolved') {
      this.phase = 'walkToBridge'; this.actT = 0;
      // 近い経路点から歩き出す
      let bi = 0, bd = Infinity;
      ORGA_PATH.forEach((p, i) => { const dd = Math.hypot(p.x - c.pos.x, p.z - c.pos.z); if (dd < bd) { bd = dd; bi = i; } });
      this.pathIndex = bi;
      return;
    }

    if (this.phase === 'dormant') {
      // 戦闘前：空き地を歩き、共振のたびに苦しんで木に角を打ちつける
      this.pulseT += dt;
      const interval = towerQuiet ? 60 : 24;
      if (this.pulseT > interval) {
        this.pulseT = 0; this.resonance = 1;
        this.host.sound('orgaPain', c.pos, 1);
        P0.jaw = 1; P0.rear = 0.6;
      }
      if (this.actT > 18) { this.actT = 0; const a = Math.random() * 6.28; this.target.set(P.clearing.x + Math.cos(a) * 45, 0, P.clearing.z + Math.sin(a) * 45); }
      const d = Math.hypot(this.target.x - c.pos.x, this.target.z - c.pos.z);
      if (d > 6) c.seek(this.target.x, this.target.z, 1.1); else { c.desiredSpeed = 0; P0.graze = 0.7; }
      this.integrate(dt);
      if (!this.host.playerDead() && (dP < 42 || (dP < 70 && this.eco.creatures.some((j) => j.tag.startsWith('juvenile') && j.state === 'led')))) this.begin();
      return;
    }
    if (!this.engaged) { this.integrate(dt); return; }

    // ---------------- 戦闘中
    if (this.phase === 'exhausted' || this.phase === 'extract') {
      P0.rest = 1; c.desiredSpeed = 0; c.speed = 0;
      if (this.phase === 'extract') this.updateExtract(dt);
      this.integrate(dt);
      return;
    }
    const toP = Math.atan2(pp.x - c.pos.x, pp.z - c.pos.z);
    const rel = wrapAngle(toP - c.yaw);
    // 段階2以降：共振の衝撃波
    if (this.phase !== 'p1' && this.action !== 'stuck' && this.action !== 'bogged' && this.action !== 'charge') {
      this.pulseT += dt;
      const interval = towerQuiet ? 22 : 11;
      if (this.pulseT > interval && this.action !== 'pulseTele' && this.action !== 'pulse') { this.pulseT = 0; this.setAction('pulseTele'); this.host.sound('resonanceRise', c.pos, 1); }
    }
    switch (this.action) {
      case 'none': case 'turn': {
        // 向き直りながら次の行動を選ぶ（向き直りは遅い＝回り込みの好機）
        c.desiredYaw = toP; c.desiredSpeed = Math.abs(rel) < 0.5 ? 1.6 : 0.6;
        if (this.actT > 1.0 / tele) {
          const protective = this.phase === 'p3' && juvenilesSafe < 2;
          if (protective && Math.random() < 0.5) {
            // 幼体のそばを離れず、広い範囲をなぎ払う
            const j = this.eco.creatures.find((x) => x.tag.startsWith('juvenile') && x.state !== 'idle');
            if (j && j.pos.distanceTo(c.pos) > 14) { c.seek(j.pos.x, j.pos.z, 3); this.setAction('guard'); break; }
          }
          if (this.phase === 'p3' && juvenilesSafe >= 2 && Math.random() < 0.3) { this.setAction('distracted'); this.host.message('オルガが避難の茂みの方を気にしている――今だ', 'hint'); break; }
          if (dP < 10 && Math.abs(rel) < 1.2) this.setAction('sweepTele');
          else if (dP < 8) this.setAction('stompTele');
          else if (Math.abs(rel) < 0.35 || this.actT > 2.5) { this.setAction('chargeTele'); this.chargesLeft = this.phase === 'p2' ? 2 : 1; }
        }
        break;
      }
      case 'guard': {
        P0.alert = 1;
        if (this.actT > 3) this.setAction(dP < 12 ? 'sweepTele' : 'turn');
        break;
      }
      case 'chargeTele': {
        // 予兆：足で地面を掻き、頭を下げ、鼻を鳴らしながら相手へ向き直る
        c.desiredSpeed = 0; c.desiredYaw = toP;
        c.faceSmooth(toP, dt, 2.2);
        P0.headPitch = 0.35; P0.crouch = 0.3;
        if (this.actT < 0.05) { this.host.sound('snort', c.pos, 1); this.world.particles.emit(c.pos.x, c.pos.y + 0.3, c.pos.z, 8, 0, 3, 90, 1.6, 1); }
        if (this.actT > 1.2 * tele) {
          // 飛び出した瞬間のプレイヤーの位置へ一直線（以後は追尾しない＝誘導できる）
          this.chargeDir = toP; c.yaw = toP; this.chargeDist = 0;
          this.setAction('charge'); this.host.sound('bellow', c.pos, 1.2);
        }
        break;
      }
      case 'charge': {
        const sp = 13;
        c.desiredYaw = this.chargeDir; c.yaw = this.chargeDir; c.desiredSpeed = sp; c.speed = Math.max(c.speed, sp * Math.min(1, this.actT * 2.5));
        P0.headPitch = 0.4;
        this.chargeDist += c.speed * dt;
        // 泥地：脚が沈んで止まる
        if (this.phase !== 'p1' && this.world.terrain.mudAt(c.pos.x, c.pos.z) > 0.45) {
          this.setAction('bogged'); c.speed = 0; this.host.sound('mud', c.pos, 1);
          this.host.message('泥に脚をとられた！背の杭が狙える', 'hint');
          this.world.particles.emit(c.pos.x, c.pos.y, c.pos.z, 30, 0, 4, 140, 2, 2);
          break;
        }
        // 巨木に角が刺さる
        const head = new THREE.Vector3(c.pos.x + Math.sin(c.yaw) * 8, 0, c.pos.z + Math.cos(c.yaw) * 8);
        for (const t of this.world.flora.specials.values()) {
          if (t.fallen || t.falling > 0 || t.id === 'bridge') continue;
          if (Math.hypot(t.group.position.x - head.x, t.group.position.z - head.z) < t.collider.r + 2.2) {
            t.health--;
            this.host.sound('treeHit', t.group.position, 1.4);
            this.host.shake(0.8);
            this.world.particles.emit(head.x, t.group.position.y + 3, head.z, 40, 3, 3, 220, 2.5, 3);
            if (t.health <= 0) { this.world.flora.fell(t.id, this.chargeDir + (Math.random() - 0.5) * 0.4); this.host.sound('treeFall', t.group.position, 1.5); }
            this.setAction('stuck'); c.speed = 0;
            this.host.message(t.health <= 0 ? '巨木が倒れた！オルガがよろめいている' : '角が巨木に刺さった！背の杭が見える', 'hint');
            break;
          }
        }
        if (this.action !== 'charge') break;
        // 体当たりの判定（通り道）
        if (!this.hitThisAction && dP < 6 && Math.abs(rel) < 0.9 && !this.host.isPlayerClimbing()) { this.hitThisAction = true; this.host.hitPlayer(38, c.pos.clone(), 9); }
        // 空き地の外へ出すぎない
        const fromC = Math.hypot(c.pos.x - P.clearing.x, c.pos.z - P.clearing.z);
        if (this.chargeDist > 48 || fromC > 115) {
          this.chargesLeft--;
          this.setAction(this.chargesLeft > 0 ? 'chargeTele' : 'recover');
        }
        break;
      }
      case 'recover': { c.desiredSpeed = 0; P0.jaw = 0.6; if (this.actT > 2.2) this.setAction('turn'); break; }
      case 'stuck': case 'bogged': case 'distracted': {
        c.desiredSpeed = 0; c.speed = 0; P0.jaw = 0.4 + 0.3 * Math.sin(this.actT * 4);
        if (this.action === 'distracted') { P0.headYaw = clamp(wrapAngle(Math.atan2(P.grove.x - c.pos.x, P.grove.z - c.pos.z) - c.yaw), -1, 1); }
        const dur = this.action === 'bogged' ? 7 : this.action === 'distracted' ? 5 : 5.5;
        if (this.actT > dur) { this.setAction('buck'); this.host.sound('bellow', c.pos, 1); }
        break;
      }
      case 'buck': {
        // 背の上の者を振り落とす（予兆つき）
        P0.rear = Math.sin(this.actT * 6) * 0.5 + 0.5;
        if (this.actT > 0.6 * tele && !this.hitThisAction) {
          this.hitThisAction = true;
          if (this.host.isPlayerClimbing()) this.host.throwPlayer(c.pos.clone(), this.host.dodgeHeld());
        }
        if (this.actT > 1.4) this.setAction('turn');
        break;
      }
      case 'sweepTele': {
        c.desiredSpeed = 0; P0.headYaw = -0.8 * Math.min(1, this.actT * 2); P0.headPitch = 0.2;
        if (this.actT > 0.8 * tele) this.setAction('sweep');
        break;
      }
      case 'sweep': {
        P0.headYaw = -0.8 + this.actT * 5; P0.headPitch = 0.3;
        if (!this.hitThisAction && this.actT > 0.15 && dP < 10.5 && Math.abs(rel) < 1.3) { this.hitThisAction = true; this.host.hitPlayer(24, c.pos.clone(), 6); }
        if (this.actT > 0.5) this.setAction('recover');
        break;
      }
      case 'stompTele': {
        c.desiredSpeed = 0; P0.rear = Math.min(1, this.actT / (1.0 * tele));
        if (this.actT > 1.0 * tele) { this.setAction('stomp'); this.host.sound('stomp', c.pos, 1.4); this.host.shake(1); this.world.particles.emit(c.pos.x, c.pos.y, c.pos.z, 40, 0, 6, 200, 2, 1.5); }
        break;
      }
      case 'stomp': {
        if (!this.hitThisAction && dP < 8.5) { this.hitThisAction = true; this.host.hitPlayer(20, c.pos.clone(), 7); }
        if (this.actT > 0.6) this.setAction('recover');
        break;
      }
      case 'pulseTele': {
        c.desiredSpeed = 0; this.resonance = Math.min(1, this.actT / 1.6); P0.jaw = this.resonance; P0.headPitch = -0.4 * this.resonance;
        if (this.actT > 1.6 * tele) { this.setAction('pulse'); this.host.sound('orgaPain', c.pos, 1.4); this.host.shake(0.7); }
        break;
      }
      case 'pulse': {
        this.resonance = 1;
        // 輪状に広がる衝撃（回避の無敵で抜けられる）
        const ring = this.actT * 22;
        if (!this.hitThisAction && Math.abs(dP - ring) < 2.2 && dP < 16) { this.hitThisAction = true; this.host.hitPlayer(18, c.pos.clone(), 4); }
        if (this.actT > 0.8) this.setAction(towerQuiet ? 'stuck' : 'recover');
        if (this.actT > 0.8 && towerQuiet) this.host.message('塔が止まっているので、共振のあとオルガがふらついている', 'hint');
        break;
      }
    }
    this.integrate(dt);
  }

  target = new THREE.Vector3(P.clearing.x, 0, P.clearing.z);
  pathIndex = 0;

  private integrate(dt: number) {
    const c = this.c;
    c.integrate(dt);
    // 空き地の外へ出ない（戦闘中）
    if (this.engaged) {
      const dx = c.pos.x - P.clearing.x, dz = c.pos.z - P.clearing.z;
      const d = Math.hypot(dx, dz);
      if (d > 125) { c.pos.x = P.clearing.x + (dx / d) * 125; c.pos.z = P.clearing.z + (dz / d) * 125; }
    }
    // 倒れていない巨木には重なれない
    for (const t of this.world.flora.specials.values()) {
      if (t.fallen || t.id === 'bridge') continue;
      const dx = c.pos.x - t.group.position.x, dz = c.pos.z - t.group.position.z;
      const d = Math.hypot(dx, dz), m = t.collider.r + 3.5;
      if (d < m && d > 0.01) { c.pos.x = t.group.position.x + (dx / d) * m; c.pos.z = t.group.position.z + (dz / d) * m; }
    }
    c.pos.y = this.world.terrain.height(c.pos.x, c.pos.z);
  }

  /** 杭への攻撃（近接・投石）。壊れたら段階が進む */
  hitPin(i: number, dmg: number) {
    const pin = this.pins[i];
    if (!pin || pin.broken || !pin.exposed) return false;
    pin.hp -= dmg;
    this.hitFlash = 1;
    this.resonance = 1;
    this.host.sound('pinHit', this.pinWorld(i), 1);
    if (pin.hp <= 0) {
      pin.broken = true;
      pin.mesh.visible = false;
      this.world.particles.emit(this.pinWorld(i).x, this.pinWorld(i).y, this.pinWorld(i).z, 30, 2, 1, 120, 1.5, 3);
      this.host.sound('pinBreak', this.c.pos, 1.4);
      const broken = this.pins.filter((p) => p.broken).length;
      this.updateExposure();
      if (broken === 1) { this.phase = 'p2'; this.host.message('一本目の杭が外れた。共振が強まる――泥地へ誘い込め', 'hint'); }
      else if (broken === 2) { this.phase = 'p3'; this.host.message('二本目。オルガが幼体の方を振り返った', 'hint'); }
      else { this.phase = 'exhausted'; this.setAction('none'); this.host.message('オルガが膝をついた。背に登り、装置を引き抜け', 'hint'); }
      this.checkpoint = { phase: this.phase, pins: this.pins.map((p) => p.broken) };
      this.host.onPhase(this.phase);
      if (this.action === 'stuck' || this.action === 'bogged' || this.action === 'distracted') this.actT = Math.max(this.actT, 3);
    }
    return true;
  }

  /** 体への攻撃：硬い皮に弾かれる（体勢だけ少し崩れる） */
  hitBody() { this.hitFlash = 0.3; this.host.sound('deflect', this.c.pos, 0.8); }

  startExtract() {
    if (this.phase !== 'exhausted') return false;
    this.phase = 'extract';
    this.extractProgress = 0;
    this.nextShudder = 1.6;
    this.shudder = 0;
    this.host.onPhase('extract');
    return true;
  }

  /** 引き抜き：長押しで力を入れ、体が震えたら手をゆるめる */
  holding = false;
  private updateExtract(dt: number) {
    this.nextShudder -= dt;
    if (this.nextShudder <= 0 && this.shudder <= 0) { this.shudder = 0.7; this.host.sound('shudder', this.c.pos, 1); this.host.shake(0.5); }
    if (this.shudder > 0) {
      this.shudder -= dt;
      this.c.params.rear = 0.3;
      if (this.holding) { this.extractProgress = Math.max(0, this.extractProgress - dt * 0.35); }
      if (this.shudder <= 0) this.nextShudder = 1.4 + Math.random() * 1.0;
    } else if (this.holding) {
      this.extractProgress += dt * 0.16;
    }
    this.resonance = 0.5 + this.extractProgress * 0.5;
    if (this.extractProgress >= 1) {
      this.phase = 'resolved';
      this.engaged = false;
      this.device.visible = false;
      this.host.sound('release', this.c.pos, 1.5);
      this.world.particles.emit(this.c.pos.x, this.c.pos.y + 6, this.c.pos.z, 60, 2, 3, 150, 2.5, 2);
      this.host.onResolved();
    }
  }

  /** 解決後：根の谷の巨木へ歩き、角で倒して橋を架ける */
  private updateBridgeWalk(dt: number) {
    const c = this.c;
    this.actT += 0;
    const t = this.world.flora.specials.get('bridge');
    const d = Math.hypot(this.bridgeTarget.x - c.pos.x, this.bridgeTarget.z - c.pos.z);
    if (t && !t.fallen && t.falling === 0) {
      // 古い移動路をたどる
      const wp = ORGA_PATH[Math.min(this.pathIndex, ORGA_PATH.length - 1)];
      if (this.pathIndex < ORGA_PATH.length - 1) {
        if (Math.hypot(wp.x - c.pos.x, wp.z - c.pos.z) < 8) this.pathIndex++;
        c.seek(wp.x, wp.z, 3.2);
      } else if (d > 4) { c.seek(this.bridgeTarget.x, this.bridgeTarget.z, 3.2); }
      else {
        c.desiredSpeed = 0; c.desiredYaw = Math.PI; // 北を向く
        c.params.headPitch = 0.5;
        if (Math.abs(wrapAngle(c.yaw - Math.PI)) < 0.2) {
          this.world.flora.fell('bridge', -Math.PI / 2);
          this.host.sound('treeFall', t.group.position, 1.6);
          this.host.shake(0.6);
        }
      }
      this.integrateFree(dt);
      return;
    }
    if (t && t.fallen) { this.phase = 'calm'; this.actT = 0; }
    this.integrateFree(dt);
  }
  private sidestep = 0;
  private integrateFree(dt: number) {
    const c = this.c;
    // 詰まったら横へ回り込む
    if (this.sidestep > 0) { this.sidestep -= dt; c.desiredYaw += 1.2; c.desiredSpeed = 2.5; }
    c.integrate(dt);
    if (this.sidestep > 0) c.desiredYaw -= 1.2;
    // 樹海の幹を避けて歩く
    if (this.world.colliders.resolve(c.pos, 1.6, c.pos.y + 1)) { c.stuckT += dt; if (c.stuckT > 1.2) { this.sidestep = 1.6; c.stuckT = 0; } }
    for (const t of this.world.flora.specials.values()) {
      if (t.fallen || t.falling > 0) continue;
      const dx = c.pos.x - t.group.position.x, dz = c.pos.z - t.group.position.z;
      const d = Math.hypot(dx, dz), m = t.collider.r + 3;
      if (d < m && d > 0.01 && t.id !== 'bridge') { c.pos.x = t.group.position.x + (dx / d) * m; c.pos.z = t.group.position.z + (dz / d) * m; c.stuckT += dt; }
    }
    c.pos.y = this.world.terrain.height(c.pos.x, c.pos.z);
  }
}
