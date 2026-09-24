import * as THREE from 'three';
import { patchWorldMaterial } from '../world/shading';

// 人の姿（主人公・野営地の人々）。見た目は変更できる。関節ごとの Object3D を手続き的に動かす。

export interface Appearance {
  name: string;
  skin: number;
  hair: number;
  hairStyle: 'short' | 'long' | 'tied' | 'shaved';
  cloak: number;
  cloth: number;
  build: number;   // 0.85〜1.15 体格
  height: number;  // 0.9〜1.1
  markings: boolean; // 渡り読みの顔の線
}

export const DEFAULT_APPEARANCE: Appearance = {
  name: 'トワ', skin: 0xc99a74, hair: 0x2a1d14, hairStyle: 'tied', cloak: 0x7a5236, cloth: 0x5d6a48, build: 1, height: 1, markings: true,
};

export const SKIN_TONES = [0xf0cfb0, 0xe0b48e, 0xc99a74, 0xa4704c, 0x7a4f34, 0x5a3a26];
export const HAIR_COLORS = [0x15100c, 0x2a1d14, 0x5a3a22, 0x8a6a42, 0xb8a078, 0x6a6a6a, 0x7a2e1e];
export const CLOAK_COLORS = [0x7a5236, 0x4e5a3a, 0x6a3a30, 0x3e4a5a, 0x8a7a58, 0x4a3a4e];

function mat(c: number, rough = 0.85) {
  const m = new THREE.MeshStandardMaterial({ color: c, roughness: rough });
  patchWorldMaterial(m);
  return m;
}

function capsule(r: number, len: number, m: THREE.Material, seg = 8) {
  const g = new THREE.CapsuleGeometry(r, len, 3, seg);
  g.translate(0, -len / 2 - r * 0.3, 0);
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = true;
  return mesh;
}

export class Humanoid {
  root = new THREE.Group();
  body = new THREE.Group();   // 腰（上下動の基点）
  torso = new THREE.Group();
  head = new THREE.Group();
  armL = new THREE.Group(); armR = new THREE.Group();
  foreL = new THREE.Group(); foreR = new THREE.Group();
  legL = new THREE.Group(); legR = new THREE.Group();
  shinL = new THREE.Group(); shinR = new THREE.Group();
  cloak!: THREE.Mesh;
  spear!: THREE.Group;
  sling!: THREE.Group;
  private mats: Record<string, THREE.MeshStandardMaterial> = {};
  private hairGroup = new THREE.Group();
  phase = 0;
  appearance: Appearance;
  private cloakBase!: Float32Array;

  constructor(app: Appearance = DEFAULT_APPEARANCE, withGear = true) {
    this.appearance = { ...app };
    this.mats.skin = mat(app.skin, 0.7);
    this.mats.hair = mat(app.hair, 0.9);
    this.mats.cloak = mat(app.cloak, 0.95);
    this.mats.cloak.side = THREE.DoubleSide;
    this.mats.cloth = mat(app.cloth, 0.9);
    this.mats.leather = mat(0x4a3526, 0.8);
    this.mats.bone = mat(0xd8ccb0, 0.6);
    this.mats.dark = mat(0x1a1410, 0.4);
    const M = this.mats;

    this.root.add(this.body);
    this.body.position.y = 0.95;
    // 腰・胴
    const hips = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.15, 0.2, 10), M.cloth);
    hips.castShadow = true; this.body.add(hips);
    this.body.add(this.torso);
    this.torso.position.y = 0.08;
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.155, 0.52, 10), M.cloth);
    chest.position.y = 0.28; chest.castShadow = true; this.torso.add(chest);
    const belt = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 6, 16), M.leather);
    belt.rotation.x = Math.PI / 2; belt.position.y = 0.03; this.torso.add(belt);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.12, 8), M.skin);
    neck.position.y = 0.6; this.torso.add(neck);
    // 頭
    this.torso.add(this.head);
    this.head.position.y = 0.68;
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 12), M.skin);
    skull.scale.set(0.92, 1.05, 1); skull.position.y = 0.1; skull.castShadow = true;
    this.head.add(skull);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.05, 5), M.skin);
    nose.rotation.x = Math.PI / 2; nose.position.set(0, 0.09, 0.115); this.head.add(nose);
    for (const s of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 5), M.dark);
      eye.position.set(s * 0.04, 0.12, 0.098); this.head.add(eye);
    }
    this.head.add(this.hairGroup);
    // 顔の線（渡り読みの印）
    const mark = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.012), mat(0x8a3a24, 0.9));
    mark.name = 'marking'; mark.position.set(0, 0.08, 0.112); this.head.add(mark);
    // 腕
    const arm = (g: THREE.Group, fore: THREE.Group, s: number) => {
      g.position.set(s * 0.23, 0.5, 0);
      this.torso.add(g);
      g.add(capsule(0.05, 0.24, M.cloth));
      fore.position.y = -0.31;
      g.add(fore);
      fore.add(capsule(0.042, 0.22, M.skin));
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), M.skin);
      hand.position.y = -0.3; fore.add(hand);
      const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.08, 8), M.leather);
      wrap.position.y = -0.2; fore.add(wrap);
    };
    arm(this.armL, this.foreL, -1); arm(this.armR, this.foreR, 1);
    // 脚
    const leg = (g: THREE.Group, shin: THREE.Group, s: number) => {
      g.position.set(s * 0.09, -0.06, 0);
      this.body.add(g);
      g.add(capsule(0.07, 0.36, M.cloth));
      shin.position.y = -0.43;
      g.add(shin);
      shin.add(capsule(0.055, 0.34, M.leather));
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.22), M.leather);
      foot.position.set(0, -0.44, 0.04); foot.castShadow = true; shin.add(foot);
    };
    leg(this.legL, this.shinL, -1); leg(this.legR, this.shinR, 1);
    // 外套（風になびく）
    const cg = new THREE.PlaneGeometry(0.5, 0.95, 4, 6);
    cg.translate(0, -0.47, 0);
    this.cloakBase = new Float32Array(cg.getAttribute('position').array);
    this.cloak = new THREE.Mesh(cg, M.cloak);
    this.cloak.position.set(0, 0.56, -0.17);
    this.cloak.rotation.x = 0.08;
    this.cloak.castShadow = true;
    this.torso.add(this.cloak);
    const hood = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.05, 6, 12, Math.PI), M.cloak);
    hood.position.set(0, 0.55, -0.05); hood.rotation.set(Math.PI / 2 + 0.3, 0, Math.PI); this.torso.add(hood);
    if (withGear) {
      // 骨の槍（背中に掛ける／構える）
      this.spear = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 1.7, 6), M.leather);
      shaft.castShadow = true; this.spear.add(shaft);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.26, 5), M.bone);
      tip.position.y = 0.97; this.spear.add(tip);
      const bind = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.1, 6), M.hair);
      bind.position.y = 0.8; this.spear.add(bind);
      this.torso.add(this.spear);
      this.stowSpear(true);
      // 投石帯
      this.sling = new THREE.Group();
      const pouch = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), M.leather);
      pouch.scale.set(1, 0.6, 1); this.sling.add(pouch);
      this.sling.position.set(-0.17, 0.02, 0.06);
      this.torso.add(this.sling);
    }
    this.setAppearance(app);
  }

  stowSpear(stowed: boolean) {
    if (!this.spear) return;
    if (stowed) {
      if (this.spear.parent !== this.torso) this.torso.add(this.spear);
      this.spear.position.set(0.05, 0.35, -0.2);
      this.spear.rotation.set(0, 0, 0.5);
    } else {
      if (this.spear.parent !== this.foreR) this.foreR.add(this.spear);
      this.spear.position.set(0, -0.3, 0.05);
      this.spear.rotation.set(Math.PI / 2, 0, 0);
    }
  }

  setAppearance(a: Appearance) {
    this.appearance = { ...a };
    this.mats.skin.color.set(a.skin);
    this.mats.hair.color.set(a.hair);
    this.mats.cloak.color.set(a.cloak);
    this.mats.cloth.color.set(a.cloth);
    this.root.scale.set(a.build, a.height, a.build);
    const mk = this.head.getObjectByName('marking');
    if (mk) mk.visible = a.markings;
    this.hairGroup.clear();
    const M = this.mats;
    if (a.hairStyle !== 'shaved') {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.125, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), M.hair);
      cap.position.set(0, 0.11, -0.01); cap.castShadow = true;
      this.hairGroup.add(cap);
    }
    if (a.hairStyle === 'long') {
      const back = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.3, 10, 1, true), M.hair);
      back.position.set(0, -0.02, -0.05); this.hairGroup.add(back);
    }
    if (a.hairStyle === 'tied') {
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.28, 7), M.hair);
      tail.position.set(0, 0.06, -0.16); tail.rotation.x = -2.6; this.hairGroup.add(tail);
    }
  }

  /** 姿勢の更新。speed は m/s。 */
  animate(dt: number, o: { speed: number; crouch: number; swim: number; attack: number; attackKind: number; aim: number; dodge: number; ride: number; hurt: number; time: number; wind: number; interact: number; climb: number }) {
    const run = Math.min(1, o.speed / 5.5);
    const walk = Math.min(1, o.speed / 1.8);
    this.phase += dt * (o.speed > 0.05 ? (2.2 + o.speed * 1.35) : 0);
    const p = this.phase;
    const swingA = (0.45 + run * 0.5) * walk;
    const s = Math.sin(p), c = Math.cos(p);
    const crouch = o.crouch;
    // 脚
    let lL = -s * swingA, lR = s * swingA;
    let kL = Math.max(0, Math.sin(p + 1.2)) * (0.5 + run * 0.9) * walk, kR = Math.max(0, Math.sin(p + Math.PI + 1.2)) * (0.5 + run * 0.9) * walk;
    lL -= crouch * 0.7; lR -= crouch * 0.7; kL += crouch * 1.3; kR += crouch * 1.3;
    if (o.ride > 0) { lL = -1.2; lR = -1.2; kL = 1.4; kR = 1.4; this.legL.rotation.z = -0.35; this.legR.rotation.z = 0.35; }
    else { this.legL.rotation.z = 0; this.legR.rotation.z = 0; }
    if (o.swim > 0) { lL = s * 0.4; lR = -s * 0.4; kL = 0.3; kR = 0.3; }
    this.legL.rotation.x = lL; this.legR.rotation.x = lR;
    this.shinL.rotation.x = kL; this.shinR.rotation.x = kR;
    // 胴の上下と前傾
    const bob = Math.abs(c) * 0.04 * walk * (1 + run);
    this.body.position.y = 0.95 - bob - crouch * 0.28 - o.swim * 0.75 - (o.ride > 0 ? 0.3 : 0);
    this.torso.rotation.x = run * 0.22 + crouch * 0.35 + o.swim * 1.2 + o.dodge * 1.4 - o.hurt * 0.3;
    this.torso.rotation.y = 0;
    // 腕
    let aL = s * swingA * 0.8, aR = -s * swingA * 0.8, fL = -0.3 - run * 0.6, fR = -0.3 - run * 0.6;
    let aRz = 0;
    if (o.swim > 0) { aL = -1.5 + Math.sin(p) * 1.2; aR = -1.5 - Math.sin(p) * 1.2; }
    if (o.aim > 0) { aL = -1.5 * o.aim; fL = -0.1; aR = -2.3 * o.aim; fR = -1.6 * o.aim; }
    if (o.attack > 0) {
      const t = o.attack; // 0→1 の振り
      if (o.attackKind === 2) { aR = -2.6 + t * 3.4; fR = -0.4; this.torso.rotation.y = 0.6 - t * 1.2; }
      else { const d = o.attackKind === 1 ? -1 : 1; aR = -1.3 + Math.sin(t * Math.PI) * -0.4; fR = -0.2; aRz = d * (0.9 - t * 1.8); this.torso.rotation.y = d * (0.5 - t); }
    }
    if (o.interact > 0) { aL = -0.9 * o.interact; aR = -0.9 * o.interact; fL = -0.6; fR = -0.6; }
    if (o.climb > 0) { aL = -2.6; aR = -2.4 + Math.sin(o.time * 4) * 0.3; fL = -0.4; fR = -0.4; }
    if (o.ride > 0) { aL = -0.7; aR = -0.7; fL = -0.9; fR = -0.9; }
    this.armL.rotation.set(aL, 0, 0.12);
    this.armR.rotation.set(aR, 0, -0.12 + aRz);
    this.foreL.rotation.x = fL; this.foreR.rotation.x = fR;
    this.head.rotation.x = -this.torso.rotation.x * 0.5;
    // 外套のなびき
    const pos = this.cloak.geometry.getAttribute('position') as THREE.BufferAttribute;
    const flutter = 0.08 + run * 0.35 + o.wind * 0.15;
    for (let i = 0; i < pos.count; i++) {
      const bx = this.cloakBase[i * 3], by = this.cloakBase[i * 3 + 1];
      const t = -by / 0.95;
      pos.setZ(i, -t * t * flutter * 0.9 - Math.sin(o.time * 6 + by * 7 + bx * 5) * 0.03 * t * (0.3 + run + o.wind));
    }
    pos.needsUpdate = true;
  }
}
