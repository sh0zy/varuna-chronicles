import { CreatureRig } from './builder';
import { SpeciesDef } from './species';
import { clamp, damp, smoothstep } from '../core/noise';

// 手続き的な歩行と姿勢。脚の位相から「足が着いた瞬間」を返し、足跡・足音・土煙に使う。

export interface AnimParams {
  speed: number;       // m/s（実寸）
  turnRate: number;    // rad/s
  headPitch: number;   // 正で頭を下げる（首全体に分配）
  headYaw: number;
  graze: number;       // 0〜1 地面へ頭を下ろす
  alert: number;       // 0〜1 首を上げて静止
  jaw: number;         // 0〜1
  rest: number;        // 0〜1 伏せて眠る
  flying: number;      // 0〜1
  flap: number;        // 0〜1 羽ばたきの強さ
  rear: number;        // 0〜1 前脚を上げる（威嚇・踏みつけ）
  crouch: number;      // 0〜1 身を低くする（忍び寄り）
  dead: number;        // 0〜1 横倒し
}

export const defaultParams = (): AnimParams => ({ speed: 0, turnRate: 0, headPitch: 0, headYaw: 0, graze: 0, alert: 0, jaw: 0, rest: 0, flying: 0, flap: 0, rear: 0, crouch: 0, dead: 0 });

export class RigAnimator {
  phase = Math.random() * Math.PI * 2;
  flapPhase = Math.random() * 6;
  private legPhasePrev: number[] = [];
  private smooth = defaultParams();
  time = Math.random() * 100;
  /** 1フレームで接地した脚（legBones の添字） */
  planted: number[] = [];
  bodyBob = 0;

  constructor(public rig: CreatureRig, public sp: SpeciesDef, public scale: number) {}

  private legOffset(i: number) {
    const L = this.rig.template.legBones[i];
    const ground = this.rig.template.legBones.filter((l) => l.spec.kind !== 'arm');
    const quad = new Set(ground.map((l) => l.index)).size >= 2;
    if (ground.length > 6) return (L.index * 0.19 + (L.side > 0 ? 0 : 0.5)) % 1; // 多足：波のような歩容
    if (quad) return (L.front ? 0.25 : 0) + (L.side > 0 ? 0 : 0.5);             // 四足：交互の歩容
    return L.side > 0 ? 0 : 0.5;                                                 // 二足
  }

  update(dt: number, target: AnimParams) {
    this.time += dt;
    const s = this.smooth;
    const k = 6;
    for (const key of Object.keys(target) as (keyof AnimParams)[]) {
      const lam = key === 'speed' ? 4 : key === 'jaw' ? 12 : key === 'dead' ? 2 : k;
      s[key] = damp(s[key], target[key], lam, dt);
    }
    const T = this.rig.template;
    const B = this.rig.bones;
    const stride = this.sp.stride * this.scale;
    const speed = s.speed;
    this.phase += (speed / Math.max(0.05, stride)) * Math.PI * 2 * dt;
    const walkK = clamp(speed / Math.max(0.1, this.sp.walk * this.scale), 0, 1);
    const runK = clamp((speed - this.sp.walk * this.scale * 1.3) / Math.max(0.1, (this.sp.run - this.sp.walk) * this.scale), 0, 1);
    const amp = (0.32 + runK * 0.35) * walkK;

    // ---- 脚
    this.planted.length = 0;
    const rest = s.rest, dead = s.dead;
    T.legBones.forEach((L, i) => {
      const up = B[L.upper], lo = B[L.lower], ft = B[L.foot];
      if (L.spec.kind === 'arm') {
        const sw = Math.sin(this.phase + (L.side > 0 ? 0 : Math.PI)) * 0.15 * walkK;
        up.rotation.set(sw - s.rear * 0.6, 0, 0);
        lo.rotation.set(-0.2 * s.alert + s.jaw * 0.3, 0, 0);
        ft.rotation.set(0, 0, 0);
        return;
      }
      const ph = this.phase * (s.flying > 0.5 ? 0 : 1) + this.legOffset(i) * Math.PI * 2;
      const c = Math.cos(ph), sn = Math.sin(ph);
      const lift = Math.max(0, -sn) * (0.35 + runK * 0.5) * walkK;
      let ux = -amp * c, lx = 0, fx = 0;
      if (L.spec.kind === 'column') { lx = lift * 0.7; fx = -lift * 0.35; }
      else { ux -= lift * 0.25; lx = lift * 1.0; fx = -lift * 0.7; }
      // 前脚を上げる（威嚇）
      if (L.front && s.rear > 0.01) { ux -= s.rear * 0.9; lx += s.rear * 0.8; }
      // 伏せる
      if (rest > 0.01 || s.crouch > 0.01) {
        const r = Math.max(rest, s.crouch * 0.4);
        ux = ux * (1 - r) + (L.front ? -0.5 : 0.9) * r;
        lx = lx * (1 - r) + (L.front ? 1.1 : -1.6) * r;
        fx = fx * (1 - r) + (L.front ? -0.5 : 0.8) * r;
      }
      if (s.flying > 0.3) { ux = 0.9 * s.flying; lx = -0.5 * s.flying; fx = 0.9 * s.flying; }
      up.rotation.set(ux, 0, dead * 0.4 * L.side);
      lo.rotation.set(lx, 0, 0);
      ft.rotation.set(fx, 0, 0);
      // 接地の判定：位相が 0（前へ出し切って着く瞬間）を越えたとき
      const wrapped = ((ph % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const prev = this.legPhasePrev[i] ?? wrapped;
      if (walkK > 0.08 && s.flying < 0.3 && rest < 0.3 && prev > wrapped + 0.01 && prev - wrapped > Math.PI) this.planted.push(i);
      this.legPhasePrev[i] = wrapped;
    });

    // ---- 胴の上下動（歩みの重さ）
    const h = T.height * this.scale;
    const bob = Math.abs(Math.sin(this.phase * 2)) * 0.035 * walkK * (1 + runK);
    this.bodyBob = -bob * h * 0.35;
    const breathe = Math.sin(this.time * (1.2 / Math.max(0.5, Math.sqrt(h)))) * 0.006 * h;
    const restDrop = -rest * (h * 0.32 + T.footY * -0.2) - s.crouch * h * 0.12;
    this.rig.mesh.position.set(0, (this.bodyBob + breathe) / this.scale + restDrop / this.scale - T.footY, 0);
    this.rig.mesh.rotation.set(-s.rear * 0.35, 0, dead * 1.45);

    // ---- 背骨：尾の揺れ、曲がる向きへのしなり、首と頭
    const sb = T.spineBones;
    const hip = T.spec.hip, neckBase = T.spec.neckBase, head = T.spec.head;
    const tailCount = hip;
    for (let i = hip - 1; i >= 0; i--) {
      const t = (hip - i) / Math.max(1, tailCount);
      const sway = Math.sin(this.time * (1.6 + runK) - t * 2.2) * 0.07 * (0.4 + walkK) * t;
      const bone = B[sb[i]];
      bone.rotation.set(-0.03 * t * (1 - walkK) + rest * 0.08, sway - s.turnRate * 0.25 * t + (dead ? 0 : 0), 0);
    }
    const neckN = head - neckBase;
    const grazeP = s.graze * 1.2 / Math.max(1, neckN);
    const alertP = -s.alert * 0.35 / Math.max(1, neckN);
    for (let i = hip + 1; i < sb.length; i++) {
      const bone = B[sb[i]];
      if (i <= neckBase) {
        bone.rotation.set(0, s.turnRate * 0.06, 0);
      } else if (i <= head) {
        const pitch = s.headPitch / Math.max(1, neckN) + grazeP + alertP + rest * 0.25 / Math.max(1, neckN);
        const yaw = s.headYaw / Math.max(1, neckN) + s.turnRate * 0.1;
        const idle = Math.sin(this.time * 0.7 + i) * 0.02 * (1 - walkK);
        bone.rotation.set(pitch + idle, yaw, 0);
      } else {
        // 頭の先：首の傾きを打ち消して顔の向きを保つ
        bone.rotation.set(-(grazeP * neckN) * 0.35, 0, 0);
      }
    }
    if (this.rig.jaw) this.rig.jaw.rotation.x = s.jaw * 0.55;

    // ---- 翼
    if (T.wingBones.length) {
      this.flapPhase += dt * (3.2 / Math.sqrt(Math.max(0.3, this.scale))) * (0.3 + s.flap);
      for (const w of T.wingBones) {
        const sd = w.side;
        const flap = Math.sin(this.flapPhase) * 0.55 * s.flap;
        const glide = s.flying;
        const fold = 1 - glide;
        const b0 = B[w.bones[0]], b1 = B[w.bones[1]], b3 = B[w.bones[3]];
        // 飛行：羽ばたき。地上：たたむ
        b0.rotation.set(0, fold * -sd * 1.2, (flap + 0.05 * Math.sin(this.time * 2)) * sd * glide + fold * -sd * 0.9);
        b1.rotation.set(0, fold * sd * 2.3, -flap * 0.4 * sd * glide);
        B[w.bones[2]].rotation.set(0, 0, 0);
        b3.rotation.set(0, fold * -sd * 2.6, -flap * 0.3 * sd * glide);
      }
    }
    void smoothstep;
  }
}
