import * as THREE from 'three';
import { Humanoid, Appearance } from './humanoid';
import { World } from '../world/world';
import { Input } from '../core/input';
import { Settings } from '../core/settings';
import { clamp, damp, dampAngle, wrapAngle } from '../core/noise';
import { Creature } from '../creatures/creature';

export interface PlayerHost {
  meleeHit(kind: 'light' | 'heavy', origin: THREE.Vector3, yaw: number, reach: number, arc: number, dmg: number, posture: number): void;
  fireStone(origin: THREE.Vector3, dir: THREE.Vector3): void;
  sound(kind: string, pos: THREE.Vector3, vol?: number): void;
  message(text: string, kind?: 'hint' | 'info'): void;
  onDeath(): void;
  pushOut(pos: THREE.Vector3, r: number): void;
  mountBlocked(m: Creature): string | null;
}

type AttackKind = 0 | 1 | 2; // 0,1=軽攻撃の連続 2=重攻撃

export class Player {
  model: Humanoid;
  pos = new THREE.Vector3();
  vel = new THREE.Vector2();
  vy = 0;
  yaw = 0;
  hp = 100; maxHp = 100;
  stamina = 100; maxStamina = 100;
  staminaDelay = 0;
  hurtT = 0;
  invuln = 0;
  dead = false;
  deadT = 0;
  crouched = false;
  sprinting = false;
  swimming = false;
  wading = 0;
  inMud = 0;
  onGround = true;
  dodgeT = 0;
  dodgeDir = new THREE.Vector2();
  attack: { kind: AttackKind; t: number; dur: number; hit: boolean; queued: boolean } | null = null;
  combo = 0;
  heavyCharge = 0;
  charging = false;
  aiming = false;
  aimToggleState = false;
  stones = 12; maxStones = 12;
  tools = { noise: 3, smoke: 2 };
  toolIndex = 0;
  mount: Creature | null = null;
  climbing = false;
  interactT = 0;
  noise = 0.5;
  concealed = 0;
  lastSafe = new THREE.Vector3();
  drownT = 0;
  stepAcc = 0;
  stepSide = 1;
  knock = new THREE.Vector2();
  lastDamageTime = -99;
  time = 0;
  calmSkill = false;
  staminaMul = 1;
  swimMul = 1;
  heavyMul = 1;

  constructor(public world: World, public input: Input, public settings: Settings, public host: PlayerHost, app: Appearance) {
    this.model = new Humanoid(app);
    world.scene.add(this.model.root);
  }

  place(x: number, z: number, yaw = 0) {
    this.pos.set(x, this.groundAt(x, z), z);
    this.yaw = yaw;
    this.vel.set(0, 0);
    this.vy = 0;
    this.lastSafe.copy(this.pos);
  }

  groundAt(x: number, z: number, fromY = Infinity) {
    let g = this.world.terrain.height(x, z);
    const b = this.world.flora.bridgeHeight(x, z);
    if (b !== null && b < fromY + 1.5 && b > g) g = b;
    return g;
  }

  get forward() { return new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }
  get eye() { return new THREE.Vector3(this.pos.x, this.pos.y + 1.6 * this.model.appearance.height, this.pos.z); }
  get busy() { return !!this.attack || this.dodgeT > 0 || this.dead; }

  damage(amount: number, from: THREE.Vector3, knock: number) {
    if (this.dead || this.invuln > 0) return false;
    this.hp -= amount;
    this.hurtT = 0.45;
    this.invuln = 0.5;
    this.lastDamageTime = this.time;
    const dx = this.pos.x - from.x, dz = this.pos.z - from.z;
    const d = Math.hypot(dx, dz) || 1;
    this.knock.set((dx / d) * knock, (dz / d) * knock);
    this.attack = null; this.charging = false; this.heavyCharge = 0;
    if (this.climbing) this.climbing = false;
    if (this.hp <= 0) { this.hp = 0; this.dead = true; this.deadT = 0; this.host.sound('playerDown', this.pos, 1); }
    else this.host.sound('playerHurt', this.pos, 1);
    return true;
  }

  heal(n: number) { this.hp = Math.min(this.maxHp, this.hp + n); }

  private useStamina(n: number) {
    if (this.stamina < n * 0.5) return false;
    this.stamina = Math.max(0, this.stamina - n * this.staminaMul);
    this.staminaDelay = 0.9;
    return true;
  }

  update(dt: number, camYaw: number, frozen: boolean) {
    this.time += dt;
    const I = this.input;
    this.invuln = Math.max(0, this.invuln - dt);
    this.hurtT = Math.max(0, this.hurtT - dt);
    this.staminaDelay = Math.max(0, this.staminaDelay - dt);
    if (this.staminaDelay <= 0) this.stamina = Math.min(this.maxStamina, this.stamina + dt * (this.swimming ? 4 : 24));
    // 戦闘から離れると体力が少しずつ戻る
    if (this.time - this.lastDamageTime > 8 && !this.dead) this.heal(dt * 1.5);

    if (this.dead) {
      this.deadT += dt;
      if (this.deadT > 2.6) this.host.onDeath();
      this.animate(dt);
      return;
    }
    if (this.mount) { this.updateMounted(dt, camYaw, frozen); return; }
    if (this.climbing) { this.animate(dt); return; }

    // ---- 入力 → 移動方向（カメラ基準）
    const mx = frozen ? 0 : I.move.x, my = frozen ? 0 : I.move.y;
    const fwd = { x: Math.sin(camYaw), z: Math.cos(camYaw) };
    const right = { x: -Math.cos(camYaw), z: Math.sin(camYaw) };
    let wx = fwd.x * -my + right.x * mx, wz = fwd.z * -my + right.z * mx;
    const mag = Math.min(1, Math.hypot(wx, wz));
    if (mag > 0.01) { const l = Math.hypot(wx, wz); wx /= l; wz /= l; }

    // しゃがみ（切り替え／長押し）
    if (!frozen) {
      if (this.settings.crouchToggle) { if (I.pressed('crouch')) this.crouched = !this.crouched; }
      else this.crouched = I.down('crouch');
    }
    if (this.swimming) this.crouched = false;
    // 構え（切り替え／長押し）
    if (!frozen) {
      if (this.settings.aimToggle) { if (I.pressed('aim')) this.aimToggleState = !this.aimToggleState; this.aiming = this.aimToggleState; }
      else this.aiming = I.down('aim');
    } else this.aiming = false;
    if (this.swimming) this.aiming = false;

    this.sprinting = !frozen && I.down('sprint') && mag > 0.2 && !this.crouched && !this.aiming && this.stamina > 1 && !this.charging;

    // ---- 回避
    if (!frozen && I.pressed('dodge') && this.dodgeT <= 0 && !this.swimming && this.onGround && this.useStamina(18)) {
      this.dodgeT = 0.5;
      this.invuln = 0.32;
      const dir = mag > 0.1 ? { x: wx, z: wz } : { x: -Math.sin(this.yaw), z: -Math.cos(this.yaw) };
      this.dodgeDir.set(dir.x, dir.z);
      this.yaw = mag > 0.1 ? Math.atan2(wx, wz) : this.yaw;
      this.attack = null; this.charging = false;
      this.host.sound('dodge', this.pos, 0.7);
    }

    // ---- 攻撃
    if (!frozen && !this.swimming && this.dodgeT <= 0) this.updateCombat(dt, camYaw);

    // ---- 速度
    let speed = 0;
    if (this.dodgeT > 0) {
      this.dodgeT -= dt;
      const k = this.dodgeT > 0.15 ? 9 : 3;
      this.vel.set(this.dodgeDir.x * k, this.dodgeDir.y * k);
    } else {
      speed = this.swimming ? (this.sprinting ? 2.7 : 1.7) * this.swimMul
        : this.crouched ? 1.5 : this.sprinting ? 5.8 : this.aiming ? 1.6 : 2.6;
      if (mag < 0.6 && !this.sprinting && !this.swimming) speed *= 0.6;
      if (this.attack) speed *= this.attack.kind === 2 ? 0.15 : 0.35;
      if (this.charging) speed *= 0.4;
      speed *= 1 - this.inMud * 0.5;
      speed *= 1 - this.wading * 0.45;
      // 上り坂で遅く（橋の上は平ら）
      const onBridge = this.world.flora.bridgeHeight(this.pos.x, this.pos.z) !== null && this.pos.y > this.world.terrain.height(this.pos.x, this.pos.z) + 0.5;
      const ahead = onBridge ? 0 : this.world.terrain.height(this.pos.x + wx * 1.5, this.pos.z + wz * 1.5) - this.world.terrain.height(this.pos.x, this.pos.z);
      if (ahead > 0 && !this.swimming) speed *= clamp(1 - ahead / 1.5 * 0.5, 0.25, 1);
      const tvx = wx * speed * mag, tvz = wz * speed * mag;
      const acc = this.onGround ? 12 : 3;
      this.vel.x = damp(this.vel.x, tvx, acc, dt);
      this.vel.y = damp(this.vel.y, tvz, acc, dt);
      if (this.sprinting) { this.stamina = Math.max(0, this.stamina - dt * 11 * this.staminaMul); this.staminaDelay = 0.6; }
      // 向き：移動方向、構え中はカメラ方向
      if (this.aiming || this.charging) this.yaw = dampAngle(this.yaw, camYaw, 14, dt);
      else if (mag > 0.1 && !this.attack) this.yaw = dampAngle(this.yaw, Math.atan2(wx, wz), 10, dt);
    }
    // 川の流れ
    if (this.swimming || this.wading > 0.3) {
      const f = this.world.terrain.flow(this.pos.x, this.pos.z);
      const fk = this.swimming ? 0.9 : 0.35;
      this.pos.x += f.x * fk * dt; this.pos.z += f.z * fk * dt;
    }
    // ノックバック
    this.pos.x += (this.vel.x + this.knock.x) * dt;
    this.pos.z += (this.vel.y + this.knock.y) * dt;
    this.knock.multiplyScalar(Math.exp(-6 * dt));

    this.resolveGround(dt);
    this.animate(dt);
    this.footsteps(dt, speed);

    // 音の大きさ（生物の聴覚に使う）
    const moving = Math.hypot(this.vel.x, this.vel.y);
    this.noise = this.crouched ? (moving > 0.2 ? 0.15 : 0.05) : this.sprinting ? 1.0 : moving > 0.3 ? 0.45 : 0.15;
    if (this.attack || this.dodgeT > 0) this.noise = 1.1;
    if (this.swimming) this.noise = 0.6;
    const grass = this.world.terrain.grassAt(this.pos.x, this.pos.z);
    this.concealed = this.crouched ? clamp(grass * 1.1, 0, 0.85) : grass * 0.2;
  }

  private updateCombat(dt: number, camYaw: number) {
    const I = this.input;
    // 投石：構え中の「投げる」
    if (this.aiming) {
      this.model.stowSpear(true);
      if (I.pressed('fire') || (I.pressed('light') && this.input.lastDevice === 'kbm')) {
        if (this.stones > 0) {
          this.stones--;
          const origin = this.eye.add(new THREE.Vector3(Math.cos(camYaw) * -0.3, -0.1, Math.sin(camYaw) * 0.3));
          this.host.fireStone(origin, new THREE.Vector3());
          this.host.sound('sling', this.pos, 0.8);
        } else this.host.message('投石が尽きた。野営地の石袋で補充できる', 'hint');
      }
      return;
    }
    // 攻撃の進行
    if (this.attack) {
      const a = this.attack;
      a.t += dt;
      const hitAt = a.kind === 2 ? 0.28 : 0.15;
      if (!a.hit && a.t >= hitAt) {
        a.hit = true;
        const reach = a.kind === 2 ? 3.2 : 2.7;
        const dmg = a.kind === 2 ? (22 + this.heavyCharge * 26) * this.heavyMul : a.kind === 1 ? 13 : 11;
        const posture = a.kind === 2 ? (18 + this.heavyCharge * 22) * this.heavyMul : 4;
        this.host.meleeHit(a.kind === 2 ? 'heavy' : 'light', this.pos.clone().setY(this.pos.y + 1.1), this.yaw, reach, a.kind === 2 ? 1.6 : 1.9, dmg, posture);
        this.host.sound(a.kind === 2 ? 'swingHeavy' : 'swing', this.pos, 0.8);
      }
      if (a.kind !== 2 && I.pressed('light') && a.t > 0.12) a.queued = true;
      if (a.t >= a.dur) {
        const next = a.queued && a.kind !== 2 && this.combo < 2 && this.useStamina(7);
        this.attack = null;
        if (next) { this.combo++; this.attack = { kind: (this.combo % 2) as AttackKind, t: 0, dur: 0.42, hit: false, queued: false }; }
        else this.combo = 0;
      }
      return;
    }
    if (I.pressed('light') && this.useStamina(7)) {
      this.model.stowSpear(false);
      this.combo = 0;
      this.attack = { kind: 0, t: 0, dur: 0.42, hit: false, queued: false };
      this.faceNearestTarget?.();
      return;
    }
    if (I.down('heavy') && this.stamina > 10) {
      this.model.stowSpear(false);
      this.charging = true;
      this.heavyCharge = Math.min(1, this.heavyCharge + dt);
    }
    if (this.charging && !I.down('heavy')) {
      this.charging = false;
      if (this.useStamina(16)) { this.attack = { kind: 2, t: 0, dur: 0.68, hit: false, queued: false }; this.faceNearestTarget?.(); }
      else this.heavyCharge = 0;
    }
    if (!this.attack && !this.charging) this.heavyCharge = 0;
  }
  faceNearestTarget: (() => void) | null = null;

  private resolveGround(dt: number) {
    const W = this.world;
    // 静的障害物と大型生物
    W.colliders.resolve(this.pos, 0.35, this.pos.y + 0.4);
    this.host.pushOut(this.pos, 0.45);
    // 地図の端
    this.pos.x = clamp(this.pos.x, -760, 760); this.pos.z = clamp(this.pos.z, -760, 760);
    // 急斜面は登れない（滑り落ちる）
    const n = W.terrain.normal(this.pos.x, this.pos.z);
    const g = this.groundAt(this.pos.x, this.pos.z, this.pos.y);
    const onTerrain = g <= W.terrain.height(this.pos.x, this.pos.z) + 0.05;
    if (onTerrain && n.y < 0.62 && g > this.pos.y - 0.2 && !this.swimming) {
      this.pos.x += n.x * 5 * dt; this.pos.z += n.z * 5 * dt;
    }
    const ground = this.groundAt(this.pos.x, this.pos.z, this.pos.y);
    // 水
    const wl = W.terrain.waterLevel(this.pos.x, this.pos.z);
    const depth = wl === -Infinity ? 0 : wl - ground;
    const wasSwimming = this.swimming;
    this.swimming = depth > 1.25;
    this.wading = depth > 0.25 && !this.swimming ? clamp((depth - 0.25) / 1.0, 0, 1) : 0;
    if (this.swimming) {
      this.pos.y = damp(this.pos.y, wl - 1.15, 8, dt);
      this.vy = 0; this.onGround = false;
      this.staminaDelay = 0.5;
      this.stamina = Math.max(0, this.stamina - dt * 3.2 * this.staminaMul / this.swimMul);
      if (!wasSwimming) { this.host.sound('splash', this.pos, 1); W.particles.emit(this.pos.x, wl, this.pos.z, 20, 1, 1.2, 80, 1.2, 2); }
      if (this.stamina <= 0) {
        this.drownT += dt;
        if (this.drownT > 0.1 && this.drownT < 0.2) this.host.message('力が尽きて流されている――岸へ！', 'hint');
        if (this.drownT > 4) { this.drownT = 0; this.damage(12, this.pos.clone(), 0); if (!this.dead) { this.pos.copy(this.lastSafe); this.stamina = 50; this.host.message('岸に打ち上げられた', 'info'); } }
      }
      return;
    }
    this.drownT = 0;
    this.inMud = W.terrain.mudAt(this.pos.x, this.pos.z) > 0.45 ? 1 : 0;
    // 重力と接地
    if (this.pos.y > ground + 0.05) {
      this.vy -= 22 * dt;
      this.pos.y += this.vy * dt;
      this.onGround = false;
      if (this.pos.y <= ground) {
        const impact = -this.vy;
        this.pos.y = ground; this.vy = 0; this.onGround = true;
        if (impact > 16) this.damage((impact - 16) * 4, this.pos.clone().add(new THREE.Vector3(0, -1, 0)), 0);
      }
    } else {
      this.pos.y = ground; this.vy = 0; this.onGround = true;
      if (depth < 0.2 && n.y > 0.8) this.lastSafe.copy(this.pos);
    }
  }

  private footsteps(dt: number, speed: number) {
    const v = Math.hypot(this.vel.x, this.vel.y);
    if (v < 0.3 || !this.onGround || this.swimming) return;
    this.stepAcc += v * dt;
    const stride = this.sprinting ? 1.5 : 0.9;
    if (this.stepAcc > stride) {
      this.stepAcc = 0;
      this.stepSide *= -1;
      const side = this.stepSide * 0.12;
      const x = this.pos.x + Math.cos(this.yaw) * side, z = this.pos.z - Math.sin(this.yaw) * side;
      this.world.footprints.add({ species: 'human', kind: 'human', x, z, time: this.world.clock.total, heading: this.yaw, size: 0.32, depth: 0.02, speed: v, trackId: 0 });
      this.host.sound(this.wading > 0 ? 'stepWater' : this.inMud ? 'stepMud' : 'step', this.pos, this.crouched ? 0.25 : this.sprinting ? 0.8 : 0.5);
      if (this.wading > 0) this.world.particles.emit(x, this.pos.y + 0.1, z, 4, 1, 0.4, 40, 0.6, 1.5);
    }
    this.world.grass.addPusher(this.pos.x, this.pos.z, 0.7, 1, this.pos.x, this.pos.z);
    void speed;
  }

  // ---- 騎乗

  mountUp(m: Creature) {
    this.mount = m;
    m.setState('mounted');
    this.crouched = false; this.aiming = false; this.attack = null;
    this.model.stowSpear(true);
    this.host.sound('mount', this.pos, 0.7);
  }
  dismount() {
    const m = this.mount;
    if (!m) return;
    this.mount = null;
    m.setState('idle');
    m.desiredSpeed = 0;
    const side = new THREE.Vector3(Math.cos(m.yaw), 0, -Math.sin(m.yaw)).multiplyScalar(1.4);
    this.pos.set(m.pos.x + side.x, 0, m.pos.z + side.z);
    this.pos.y = this.groundAt(this.pos.x, this.pos.z);
    this.yaw = m.yaw;
  }

  private updateMounted(dt: number, camYaw: number, frozen: boolean) {
    const m = this.mount!;
    const I = this.input;
    const mx = frozen ? 0 : I.move.x, my = frozen ? 0 : I.move.y;
    const fwd = { x: Math.sin(camYaw), z: Math.cos(camYaw) };
    const right = { x: -Math.cos(camYaw), z: Math.sin(camYaw) };
    const wx = fwd.x * -my + right.x * mx, wz = fwd.z * -my + right.z * mx;
    const mag = Math.min(1, Math.hypot(wx, wz));
    this.sprinting = !frozen && I.down('sprint') && mag > 0.2 && this.stamina > 1;
    let target = mag > 0.1 ? (this.sprinting ? 11.5 : 5) * mag : 0;
    if (this.sprinting) { this.stamina = Math.max(0, this.stamina - dt * 5 * this.staminaMul); this.staminaDelay = 0.6; }
    if (mag > 0.1) m.desiredYaw = Math.atan2(wx, wz);
    // 騎獣の制約：深い水と肉食獣
    const blocked = this.host.mountBlocked(m);
    if (blocked) { target = Math.min(target, 0.5); }
    // 前方が深い水なら止まる
    const ax = m.pos.x + Math.sin(m.desiredYaw) * 3, az = m.pos.z + Math.cos(m.desiredYaw) * 3;
    const wl = this.world.terrain.waterLevel(ax, az);
    if (wl !== -Infinity && wl - this.world.terrain.height(ax, az) > 0.7 && target > 0) {
      target = 0;
      if (Math.random() < dt * 0.5) this.host.message('コハクは深い水を嫌がる。浅瀬の渡しを探そう', 'hint');
    }
    m.desiredSpeed = target;
    // 旋回は騎獣の速さに応じて鈍る
    const turn = 3.2 - m.speed * 0.15;
    const diff = wrapAngle(m.desiredYaw - m.yaw);
    m.yaw += clamp(diff, -turn * dt, turn * dt);
    const acc = target > m.speed ? 5 : 9;
    m.speed += clamp(target - m.speed, -acc * dt, acc * dt);
    const px = m.pos.x, pz = m.pos.z;
    m.pos.x += Math.sin(m.yaw) * m.speed * dt;
    m.pos.z += Math.cos(m.yaw) * m.speed * dt;
    this.world.colliders.resolve(m.pos, 0.6, m.pos.y + 0.5);
    if (this.world.terrain.slope(m.pos.x, m.pos.z) > 0.8) { m.pos.x = px; m.pos.z = pz; m.speed *= 0.5; }
    m.pos.x = clamp(m.pos.x, -740, 740); m.pos.z = clamp(m.pos.z, -740, 740);
    m.pos.y = this.groundAt(m.pos.x, m.pos.z, m.pos.y);
    // 騎手の位置
    const seatH = 1.55 * m.scale;
    this.pos.set(m.pos.x, m.pos.y + seatH - 0.55, m.pos.z);
    this.yaw = m.yaw;
    this.vel.set(Math.sin(m.yaw) * m.speed, Math.cos(m.yaw) * m.speed);
    this.noise = this.sprinting ? 1.2 : 0.7;
    this.concealed = 0;
    this.swimming = false;
    this.animate(dt);
    // 騎獣の足音と草
    this.world.grass.addPusher(m.pos.x, m.pos.z, 1.0, 1, m.pos.x, m.pos.z);
  }

  animate(dt: number) {
    const v = this.mount ? 0 : Math.hypot(this.vel.x, this.vel.y);
    this.model.root.position.copy(this.pos);
    if (this.dead) {
      this.model.root.rotation.set(0, this.yaw, 0);
      this.model.body.rotation.x = Math.min(1.4, this.deadT * 3);
      this.model.body.position.y = Math.max(0.2, 0.95 - this.deadT);
      return;
    }
    this.model.body.rotation.x = 0;
    this.model.root.rotation.set(0, this.yaw, 0);
    const a = this.attack;
    this.model.animate(dt, {
      speed: v, crouch: this.crouched ? 1 : 0, swim: this.swimming ? 1 : 0,
      attack: a ? clamp(a.t / a.dur, 0, 1) : this.charging ? 0 : 0, attackKind: a ? a.kind : 0,
      aim: this.aiming ? 1 : 0, dodge: this.dodgeT > 0 ? Math.sin((this.dodgeT / 0.5) * Math.PI) : 0,
      ride: this.mount ? 1 : 0, hurt: this.hurtT > 0 ? 1 : 0, time: this.time, wind: this.world.wind.strength,
      interact: this.interactT > 0 ? 1 : 0, climb: this.climbing ? 1 : 0,
    });
    if (this.charging) { this.model.armR.rotation.x = -2.6; this.model.torso.rotation.y = 0.6; }
  }
}
