import * as THREE from 'three';
import { SpeciesDef } from './species';
import { CreatureRig, instantiate, CreatureTemplate } from './builder';
import { RigAnimator, AnimParams, defaultParams } from './animator';
import { clamp, dampAngle, wrapAngle } from '../core/noise';

export type CState =
  | 'idle' | 'graze' | 'wander' | 'migrate' | 'drink' | 'rest' | 'alert' | 'flee' | 'threaten'
  | 'stalk' | 'chase' | 'attack' | 'eat' | 'protect' | 'fly' | 'land' | 'follow' | 'stuck' | 'led' | 'curl' | 'dead' | 'scripted' | 'patrol' | 'mounted' | 'blocked';

export interface Herd {
  id: number;
  species: string;
  members: Creature[];
  leader: Creature | null;
  route: { x: number; z: number }[] | null;
  routeIndex: number;
  home: { x: number; z: number; r: number };
  mode: 'wander' | 'migrate' | 'rest' | 'drink' | 'flee' | 'hunt' | 'eat' | 'thorn' | 'nest';
  modeT: number;
  target: THREE.Vector3 | null;
  prey: Creature | null;
  hunger: number;
}

let nextId = 1;

export class Creature {
  id = nextId++;
  pos = new THREE.Vector3();
  yaw = 0;
  speed = 0;
  desiredSpeed = 0;
  desiredYaw = 0;
  turnRate = 0;
  state: CState = 'idle';
  stateT = 0;
  herd: Herd | null = null;
  rig: CreatureRig;
  anim: RigAnimator;
  params: AnimParams = defaultParams();
  scale: number;
  hp: number;
  maxHp: number;
  posture = 0;          // 体勢（重撃で溜まり、満ちると転倒）
  stagger = 0;
  awareness = 0;        // プレイヤーへの気づき 0〜1
  smelled = false;      // 匂いで気づいた（風上から近づかれた）
  trust = false;        // プレイヤーを信頼している（手を伸ばすのを受け入れた後）
  escort: THREE.Vector3 | null = null; // 送り届けの目的地
  fear = 0;
  anger = 0;
  hunger = Math.random() * 0.4;
  stamina = 1;
  dead = false;
  deadAt = 0;           // ゲーム内時刻
  eaten = 0;            // 死骸がどれだけ食べられたか
  target: THREE.Vector3 | null = null;
  targetCreature: Creature | null = null;
  targetPlayer = false;
  attackCd = 0;
  attackPhase = 0;      // 攻撃の予兆〜実行
  attackKind = 0;
  altitude = 0;         // 飛行の高さ（地面から）
  flyCenter = new THREE.Vector3();
  flyRadius = 60;
  flyAngle = Math.random() * 6.28;
  lastSeenByPlayer = 0;
  visibleT = 0;         // プレイヤーから見えている継続時間
  obsTimers: Record<string, number> = {};
  lodTimer = 0;
  animTimer = 0;
  trackId: number;
  stuckT = 0;
  tag = '';             // 特別な個体の名前（'orga', 'kohaku' など）
  blocked = false;
  lastFootTime = 0;

  constructor(public sp: SpeciesDef, template: CreatureTemplate, public juvenile: boolean, tint: THREE.Color | null) {
    this.scale = (juvenile ? sp.juvenileScale ?? 0.5 : sp.scale) * (0.92 + Math.random() * 0.16);
    this.rig = instantiate(template, tint);
    this.rig.root.scale.setScalar(this.scale);
    this.anim = new RigAnimator(this.rig, sp, this.scale);
    this.maxHp = this.hp = sp.hp * (juvenile ? 0.3 : 1) * this.scale;
    this.trackId = this.id;
  }

  get radius() { return this.sp.bodyRadius * this.scale / this.sp.scale; }
  get isHostileToPlayer() {
    return !this.dead && (this.state === 'chase' || this.state === 'attack' || this.state === 'threaten') && this.targetPlayer;
  }
  setState(s: CState) {
    if (this.state !== s) { this.state = s; this.stateT = 0; }
  }
  forward(out = new THREE.Vector3()) { return out.set(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }

  /** 目標地点へ向かう */
  seek(x: number, z: number, speed: number) {
    this.desiredYaw = Math.atan2(x - this.pos.x, z - this.pos.z);
    this.desiredSpeed = speed;
  }
  away(x: number, z: number, speed: number) {
    this.desiredYaw = Math.atan2(this.pos.x - x, this.pos.z - z);
    this.desiredSpeed = speed;
  }

  /** 移動の積分（旋回の速さと加速度に上限。巨体ほど遅れて動く） */
  integrate(dt: number) {
    const turn = this.sp.turn * (this.juvenile ? 1.6 : 1) * (this.speed > this.sp.walk * 1.5 ? 0.7 : 1);
    const before = this.yaw;
    const diff = wrapAngle(this.desiredYaw - this.yaw);
    this.yaw += clamp(diff, -turn * dt, turn * dt);
    this.turnRate = wrapAngle(this.yaw - before) / Math.max(dt, 1e-4);
    // 大きく向きを変えるときは減速する
    const turnSlow = Math.abs(diff) > 1.2 ? 0.35 : 1;
    const acc = (this.sp.mass > 5000 ? 0.6 : this.sp.mass > 1000 ? 1.5 : 5) * (this.juvenile ? 1.5 : 1);
    const target = this.desiredSpeed * turnSlow;
    this.speed += clamp(target - this.speed, -acc * 2 * dt, acc * dt);
    if (this.speed < 0.01 && target === 0) this.speed = 0;
    this.pos.x += Math.sin(this.yaw) * this.speed * dt;
    this.pos.z += Math.cos(this.yaw) * this.speed * dt;
  }

  faceSmooth(yaw: number, dt: number, rate = 3) { this.yaw = dampAngle(this.yaw, yaw, rate, dt); }
}
