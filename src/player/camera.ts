import * as THREE from 'three';
import { Terrain } from '../world/terrain';
import { clamp, damp, dampAngle, wrapAngle } from '../core/noise';

// 三人称カメラ。巨大生物の近くでは引き、注目中はプレイヤーと注目部位の両方を画面に収める。
// 地形にめり込まず、揺れは設定で弱められる。

export class ThirdPersonCamera {
  cam: THREE.PerspectiveCamera;
  yaw = 0;          // カメラの向く方向（水平）
  pitch = 0.18;     // 正で見下ろす
  dist = 5.2;
  zoom = 5.2;
  private curDist = 5.2;
  private target = new THREE.Vector3();
  private shake = 0;
  private shakeT = 0;
  shakeScale = 0.7;
  lockTarget: THREE.Vector3 | null = null;
  lockSize = 0;
  bigNear = 0;       // 近くの巨大生物の大きさ（m）
  aim = 0;
  cinematic: { pos: THREE.Vector3; look: THREE.Vector3; t: number; dur: number; fov?: number } | null = null;
  baseFov = 58;

  /** 静的な障害物（幹など）までの距離を返す関数。見つからなければ Infinity */
  occluder: ((from: THREE.Vector3, to: THREE.Vector3) => number) | null = null;

  constructor(private terrain: Terrain, aspect: number) {
    this.cam = new THREE.PerspectiveCamera(58, aspect, 0.15, 12000);
  }

  addShake(s: number) { this.shake = Math.min(1.5, this.shake + s); }

  /** 視点入力（ラジアン） */
  look(dx: number, dy: number) {
    this.yaw -= dx;
    this.pitch = clamp(this.pitch + dy, -0.55, 1.2);
  }

  update(dt: number, focus: THREE.Vector3, opts: { aiming: boolean; mounted: boolean; swimming: boolean; playerYaw: number; moving: boolean; autoFollow: boolean }) {
    if (this.cinematic) {
      const c = this.cinematic;
      c.t += dt;
      this.cam.position.lerp(c.pos, 1 - Math.exp(-2.5 * dt));
      this.target.lerp(c.look, 1 - Math.exp(-3 * dt));
      this.cam.lookAt(this.target);
      if (c.fov) { this.cam.fov = damp(this.cam.fov, c.fov, 2, dt); this.cam.updateProjectionMatrix(); }
      if (c.t > c.dur) this.cinematic = null;
      return;
    }
    // 注目：プレイヤーと目標の中間を見る
    if (this.lockTarget) {
      const toT = Math.atan2(this.lockTarget.x - focus.x, this.lockTarget.z - focus.z);
      this.yaw = dampAngle(this.yaw, toT, 5, dt);
      const dy = this.lockTarget.y - focus.y;
      const dh = Math.hypot(this.lockTarget.x - focus.x, this.lockTarget.z - focus.z);
      this.pitch = damp(this.pitch, clamp(0.2 - Math.atan2(dy, dh) * 0.4, -0.2, 0.6), 3, dt);
    } else if (opts.autoFollow && opts.moving && !opts.aiming) {
      // 移動中は少しずつ背後へ回り込む（手動操作を妨げない程度）
      const behind = opts.playerYaw;
      if (Math.abs(wrapAngle(behind - this.yaw)) < 2.2) this.yaw = dampAngle(this.yaw, behind, 0.35, dt);
    }
    this.aim = damp(this.aim, opts.aiming ? 1 : 0, 10, dt);
    // 距離：騎乗・巨大生物・注目で引く
    let want = this.zoom;
    if (opts.mounted) want += 2.2;
    want += clamp(this.bigNear * 0.35, 0, 12);
    if (this.lockTarget) want += clamp(this.lockSize * 0.4, 0, 10);
    want = want * (1 - this.aim) + 2.1 * this.aim;
    this.dist = damp(this.dist, want, 3, dt);

    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    const rx = -Math.cos(this.yaw), rz = Math.sin(this.yaw);
    const shoulder = 0.55 * this.aim + 0.25;
    const pivot = new THREE.Vector3(focus.x + rx * shoulder, focus.y + (opts.swimming ? 0.6 : 1.55) + (opts.mounted ? 0.6 : 0), focus.z + rz * shoulder);
    this.target.copy(pivot).add(new THREE.Vector3(fx, 0, fz).multiplyScalar(4));
    this.target.y -= Math.sin(this.pitch) * 4 * 0.6;
    // 地形に当たらない距離を探す
    let d = this.dist;
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    for (let i = 0; i < 8; i++) {
      const t = d * (i + 1) / 8;
      const x = pivot.x - fx * cp * t, z = pivot.z - fz * cp * t, y = pivot.y + sp * t;
      if (y < this.terrain.height(x, z) + 0.35) { d = Math.max(0.8, t * 0.85); break; }
    }
    if (this.occluder) {
      const far = new THREE.Vector3(pivot.x - fx * cp * d, pivot.y + sp * d, pivot.z - fz * cp * d);
      const hit = this.occluder(pivot, far);
      if (hit < d) d = Math.max(0.9, hit - 0.4);
    }
    this.curDist = d < this.curDist ? d : damp(this.curDist, d, 4, dt);
    const px = pivot.x - fx * cp * this.curDist, pz = pivot.z - fz * cp * this.curDist;
    let py = pivot.y + sp * this.curDist;
    py = Math.max(py, this.terrain.height(px, pz) + 0.35);
    this.cam.position.set(px, py, pz);
    // 揺れ
    this.shakeT += dt * 30;
    const s = this.shake * this.shakeScale;
    if (s > 0.001) {
      this.cam.position.x += Math.sin(this.shakeT * 1.3) * s * 0.12;
      this.cam.position.y += Math.sin(this.shakeT * 1.7 + 1) * s * 0.1;
    }
    this.shake = Math.max(0, this.shake - dt * 1.8);
    this.cam.lookAt(this.target);
    const fov = this.baseFov - this.aim * 10;
    if (Math.abs(this.cam.fov - fov) > 0.05) { this.cam.fov = damp(this.cam.fov, fov, 8, dt); this.cam.updateProjectionMatrix(); }
  }

  /** 画面中央の方向（投石の狙い） */
  aimDir(out = new THREE.Vector3()) { return this.cam.getWorldDirection(out); }
}
