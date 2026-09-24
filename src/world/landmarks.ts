import * as THREE from 'three';
import { Rng, Simplex2 } from '../core/noise';
import { Terrain } from './terrain';
import { ColliderWorld } from './colliders';
import { patchWorldMaterial } from './shading';
import { rockGeometry } from './flora';
import { P, FENCE } from './layout';
import { bakeStatic } from './bake';

// 人の手と古代文明の痕跡、そして遠景の「山脈」。

const n = new Simplex2(808);

export const GLYPHS = ['日の出', '真昼', '日の入り', '月'] as const;

function glyphCanvas(kind: number, size = 256): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.fillStyle = '#5d6b62'; g.fillRect(0, 0, size, size);
  // 風化
  for (let i = 0; i < 400; i++) { g.fillStyle = `rgba(${40 + Math.random() * 60},${50 + Math.random() * 50},${45 + Math.random() * 40},0.25)`; g.fillRect(Math.random() * size, Math.random() * size, 3 + Math.random() * 8, 2 + Math.random() * 6); }
  g.strokeStyle = '#c9d8b4'; g.fillStyle = '#c9d8b4'; g.lineWidth = 9;
  const cx = size / 2, cy = size / 2;
  g.beginPath(); g.arc(cx, cy, size * 0.42, 0, Math.PI * 2); g.stroke(); // 環の枠
  g.lineWidth = 7;
  g.beginPath(); g.moveTo(size * 0.18, cy + 30); g.lineTo(size * 0.82, cy + 30); g.stroke(); // 地平線
  if (kind === 0) { g.beginPath(); g.arc(size * 0.7, cy + 30, 34, Math.PI, 0); g.fill(); for (let i = 0; i < 5; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 5; g.beginPath(); g.moveTo(size * 0.7 + Math.cos(a) * 44, cy + 30 + Math.sin(a) * 44); g.lineTo(size * 0.7 + Math.cos(a) * 62, cy + 30 + Math.sin(a) * 62); g.stroke(); } }
  if (kind === 1) { g.beginPath(); g.arc(cx, cy - 50, 30, 0, Math.PI * 2); g.fill(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g.beginPath(); g.moveTo(cx + Math.cos(a) * 40, cy - 50 + Math.sin(a) * 40); g.lineTo(cx + Math.cos(a) * 56, cy - 50 + Math.sin(a) * 56); g.stroke(); } }
  if (kind === 2) { g.beginPath(); g.arc(size * 0.3, cy + 30, 34, Math.PI, 0); g.fill(); g.beginPath(); g.moveTo(size * 0.3 - 50, cy + 52); g.lineTo(size * 0.3 + 50, cy + 52); g.stroke(); }
  if (kind === 3) { g.beginPath(); g.arc(cx, cy - 40, 32, 0, Math.PI * 2); g.fill(); g.fillStyle = '#5d6b62'; g.beginPath(); g.arc(cx + 14, cy - 48, 28, 0, Math.PI * 2); g.fill(); }
  return c;
}

function muralCanvas(): HTMLCanvasElement {
  const W = 1024, H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  g.fillStyle = '#6a6458'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 1600; i++) { g.fillStyle = `rgba(${60 + Math.random() * 70},${55 + Math.random() * 60},${45 + Math.random() * 50},0.2)`; g.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 14, 2 + Math.random() * 8); }
  g.strokeStyle = '#d8cfae'; g.fillStyle = '#d8cfae'; g.lineWidth = 6;
  // 上段：太陽が東から昇り、南を通って西へ沈む三つの印（左から右へ：日の出・真昼・日の入り）
  const suns = [[180, 170, 0], [512, 90, 1], [844, 170, 2]] as const;
  g.beginPath(); g.moveTo(80, 210); g.quadraticCurveTo(512, 20, 944, 210); g.setLineDash([12, 14]); g.stroke(); g.setLineDash([]);
  for (const [x, y, k] of suns) {
    g.beginPath();
    if (k === 1) g.arc(x, y, 30, 0, Math.PI * 2); else g.arc(x, y + 20, 30, Math.PI, 0);
    g.fill();
    g.font = 'bold 34px serif';
    g.fillText(['壱', '弐', '参'][k], x - 16, y + 80);
  }
  // 下段：群れの行列と、大地を抱く環（節のある山並みの下に眼）
  g.lineWidth = 5;
  for (let i = 0; i < 9; i++) { const x = 120 + i * 90; g.beginPath(); g.ellipse(x, 360, 28, 14, 0, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.moveTo(x + 24, 352); g.quadraticCurveTo(x + 44, 320, x + 50, 312); g.stroke(); }
  g.beginPath(); g.moveTo(40, 470);
  for (let x = 40; x <= 984; x += 36) g.quadraticCurveTo(x + 18, 420, x + 36, 470);
  g.stroke();
  g.beginPath(); g.ellipse(512, 486, 26, 10, 0, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.arc(512, 486, 5, 0, Math.PI * 2); g.fill();
  return c;
}

export interface RingStone { mesh: THREE.Group; state: number; target: number; angle: number; pos: THREE.Vector3 }

export class Landmarks {
  group = new THREE.Group();
  stoneMat: THREE.MeshStandardMaterial;
  woodMat: THREE.MeshStandardMaterial;
  clothMats: THREE.MeshStandardMaterial[];
  copperMat: THREE.MeshStandardMaterial;
  towerCore!: THREE.Mesh;
  towerLight!: THREE.PointLight;
  ringStones: RingStone[] = [];
  towerActive = true;
  fenceGap!: THREE.Group;
  fire!: { light: THREE.PointLight; flames: THREE.Mesh[]; base: THREE.Vector3 };
  museumSlots: THREE.Vector3[] = [];
  museumGroup = new THREE.Group();
  photoFrames: THREE.Mesh[] = [];
  lookoutA!: THREE.Group;
  lookoutB!: THREE.Group;
  arkeaRing!: THREE.Mesh;
  deviceOnShelf: THREE.Object3D | null = null;

  constructor(private terrain: Terrain, private colliders: ColliderWorld) {
    this.stoneMat = new THREE.MeshStandardMaterial({ color: 0x8c8676, roughness: 0.92 });
    patchWorldMaterial(this.stoneMat, { rock: true });
    this.woodMat = new THREE.MeshStandardMaterial({ color: 0x6d5037, roughness: 0.85 });
    patchWorldMaterial(this.woodMat);
    this.clothMats = [0xb49a72, 0x8f6a4a, 0x9e8f6a, 0x7a5f4b].map((c) => patchWorldMaterial(new THREE.MeshStandardMaterial({ color: c, roughness: 0.95, side: THREE.DoubleSide })) as THREE.MeshStandardMaterial);
    this.copperMat = new THREE.MeshStandardMaterial({ color: 0x4f8a7a, roughness: 0.45, metalness: 0.6, emissive: 0x2fd3b0, emissiveIntensity: 0 });
    patchWorldMaterial(this.copperMat);
    this.buildArkeaRing();
    this.buildFarGround();
    this.buildTower();
    this.buildCamp();
    this.buildFence();
    this.buildNineStones();
    this.buildFossilSlab();
    this.buildJadeGate();
    this.buildRootTunnel();
    this.group.add(this.museumGroup);
    // 動かさない物をまとめる
    for (const s of this.ringStones) s.mesh.userData.dynamic = true;
    this.fenceGap.userData.dynamic = true;
    this.lookoutA.userData.dynamic = true;
    this.lookoutB.userData.dynamic = true;
    for (const f of this.photoFrames) f.userData.dynamic = true;
    this.bakeInfo = bakeStatic(this.group);
  }
  bakeInfo = { meshesMerged: 0, drawCalls: 0 };

  private y(x: number, z: number) { return this.terrain.height(x, z); }

  /** 遠景の環状山脈（＝アーケアの背殻）。規則的な節と、層状の縞がある */
  private buildArkeaRing() {
    const cx = 10800, cz = -900, R = 7400;
    const segA = 260, segR = 10;
    const a0 = Math.PI * 0.62, a1 = Math.PI * 1.38;
    const pos: number[] = [], col: number[] = [], idx: number[] = [];
    const cBase = new THREE.Color(0x6f7880), cBand = new THREE.Color(0x9a9486), cTop = new THREE.Color(0xc2c2ba);
    for (let i = 0; i <= segA; i++) {
      const a = a0 + (a1 - a0) * (i / segA);
      const segPhase = (i / segA) * 52; // 52の節
      const node = Math.pow(Math.abs(Math.sin(segPhase * Math.PI)), 0.35);
      for (let j = 0; j <= segR; j++) {
        const t = j / segR; // 0=外側(こちら側) 1=内側
        const rr = R - 700 + t * 1400;
        const prof = Math.sin(t * Math.PI);
        let h = prof * (330 + 190 * node) + n.ridged(i * 0.08, j * 0.4, 3) * 70 * prof;
        h *= 0.8 + 0.2 * Math.sin(i / segA * Math.PI);
        const x = cx + Math.cos(a) * rr, z = cz + Math.sin(a) * rr;
        pos.push(x, h - 60, z);
        const band = Math.sin(h * 0.045) * 0.5 + 0.5;
        const c = cBase.clone().lerp(cBand, band * 0.5).lerp(cTop, Math.min(1, h / 900) * 0.6);
        col.push(c.r, c.g, c.b);
      }
    }
    for (let i = 0; i < segA; i++) for (let j = 0; j < segR; j++) {
      const a = i * (segR + 1) + j, b = a + segR + 1;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 });
    patchWorldMaterial(mat, { noCloud: false, fogScale: 1, haze: 0.8 });
    this.arkeaRing = new THREE.Mesh(geo, mat);
    this.arkeaRing.name = 'arkea-ring';
    this.group.add(this.arkeaRing);
  }

  private buildFarGround() {
    const geo = new THREE.RingGeometry(1100, 11500, 64, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({ color: 0x6e7048, roughness: 1 });
    patchWorldMaterial(mat);
    const m = new THREE.Mesh(geo, mat);
    m.position.y = 4;
    this.group.add(m);
  }

  private buildTower() {
    const g = new THREE.Group();
    const c = P.tower;
    const base = this.y(c.x, c.z);
    g.position.set(c.x, base, c.z);
    // 円形の基壇
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(15, 16.5, 1.6, 40), this.stoneMat);
    plat.position.y = 0.2; plat.receiveShadow = true; plat.castShadow = true;
    g.add(plat);
    // 折れた柱の輪
    const r = new Rng(5);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const h = r.range(2.5, 7.5);
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.85, h, 10), this.stoneMat);
      col.position.set(Math.cos(a) * 13, 1 + h / 2, Math.sin(a) * 13);
      col.rotation.z = r.range(-0.06, 0.06);
      col.castShadow = col.receiveShadow = true;
      g.add(col);
      this.colliders.add({ x: c.x + Math.cos(a) * 13, z: c.z + Math.sin(a) * 13, r: 0.9, top: base + 1 + h, active: true, kind: 'struct' });
    }
    // 中央の塔（環銅の輪が埋め込まれた石柱）
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 2.4, 15, 14), this.stoneMat);
    tower.position.y = 8.5; tower.castShadow = true; g.add(tower);
    this.colliders.add({ x: c.x, z: c.z, r: 2.6, top: base + 16, active: true, kind: 'struct' });
    for (let k = 0; k < 3; k++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3 - k * 0.2, 0.22, 8, 32), this.copperMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 6 + k * 3.4;
      g.add(ring);
    }
    this.towerCore = new THREE.Mesh(new THREE.SphereGeometry(0.9, 20, 12), this.copperMat);
    this.towerCore.position.y = 16.6;
    g.add(this.towerCore);
    this.towerLight = new THREE.PointLight(0x5ff0c8, 0, 40, 2);
    this.towerLight.position.y = 16.6;
    g.add(this.towerLight);
    // 回せる三つの輪石（謎）
    const initial = [3, 0, 1];
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + (i - 1) * 0.75; // 北側に並ぶ
      const px = Math.cos(a) * 8, pz = Math.sin(a) * 8;
      const holder = new THREE.Group();
      holder.position.set(px, 1, pz);
      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 1.0, 12), this.stoneMat);
      pedestal.position.y = 0.5; holder.add(pedestal);
      const drum = new THREE.Group();
      drum.position.y = 1.9;
      const faces = [0, 1, 2, 3].map((k) => {
        const tex = new THREE.CanvasTexture(glyphCanvas(k));
        tex.colorSpace = THREE.SRGBColorSpace;
        const m = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 });
        patchWorldMaterial(m);
        return m;
      });
      // 四角柱の4面に印。上下は石
      const mats = [faces[1], faces[3], this.stoneMat, this.stoneMat, faces[0], faces[2]];
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), mats);
      box.castShadow = true;
      drum.add(box);
      holder.add(drum);
      holder.lookAt(new THREE.Vector3(0, 1, 0).add(new THREE.Vector3(px, 0, pz).multiplyScalar(2)));
      g.add(holder);
      const world = new THREE.Vector3(c.x + px, base + 2.5, c.z + pz);
      this.ringStones.push({ mesh: drum, state: initial[i], target: initial[i], angle: 0, pos: world });
      this.colliders.add({ x: world.x, z: world.z, r: 1.1, top: base + 3, active: true, kind: 'struct' });
    }
    for (const s of this.ringStones) { s.angle = this.faceAngle(s.state); s.mesh.rotation.y = s.angle; }
    // 壁画（南側に立つ壁）
    const wall = new THREE.Group();
    const slab = new THREE.Mesh(new THREE.BoxGeometry(9, 5, 0.8), this.stoneMat);
    slab.castShadow = slab.receiveShadow = true;
    wall.add(slab);
    const mt = new THREE.CanvasTexture(muralCanvas());
    mt.colorSpace = THREE.SRGBColorSpace;
    const mm = new THREE.MeshStandardMaterial({ map: mt, roughness: 0.95 });
    patchWorldMaterial(mm);
    const mural = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 4.2), mm);
    mural.position.z = -0.41; mural.rotation.y = Math.PI;
    wall.add(mural);
    wall.position.set(0, 3.3, 11);
    g.add(wall);
    this.colliders.add({ x: c.x - 3, z: c.z + 11, r: 1.6, top: base + 6, active: true, kind: 'struct' });
    this.colliders.add({ x: c.x + 3, z: c.z + 11, r: 1.6, top: base + 6, active: true, kind: 'struct' });
    this.colliders.add({ x: c.x, z: c.z + 11, r: 1.6, top: base + 6, active: true, kind: 'struct' });
    this.muralPos = new THREE.Vector3(c.x, base + 3, c.z + 10);
    this.group.add(g);
  }
  muralPos = new THREE.Vector3();

  /** 印 k が北側（塔の外側）を向く回転 */
  faceAngle(k: number) { return [0, -Math.PI / 2, Math.PI, Math.PI / 2][k]; }
  rotateRing(i: number) {
    const s = this.ringStones[i];
    s.state = (s.state + 1) % 4;
  }
  ringsSolved() { return this.ringStones[0].state === 0 && this.ringStones[1].state === 1 && this.ringStones[2].state === 2; }

  private buildCamp() {
    const c = P.camp;
    const r = new Rng(9);
    const tent = (x: number, z: number, s: number, mat: THREE.Material) => {
      const g = new THREE.Group();
      const cone = new THREE.Mesh(new THREE.ConeGeometry(3.2 * s, 4.2 * s, 9, 2, true), mat);
      cone.position.y = 2.1 * s; cone.castShadow = true; cone.receiveShadow = true;
      g.add(cone);
      // 骨組み（巨獣の肋骨を使う渡りの民の天幕）
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.4;
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 5 * s, 5), this.woodMat);
        pole.position.set(Math.cos(a) * 1.4 * s, 2.2 * s, Math.sin(a) * 1.4 * s);
        pole.rotation.set(Math.sin(a) * 0.55, 0, -Math.cos(a) * 0.55);
        g.add(pole);
      }
      g.position.set(x, this.y(x, z), z);
      g.rotation.y = r.range(0, 6);
      this.group.add(g);
      this.colliders.add({ x, z, r: 2.8 * s, top: this.y(x, z) + 4, active: true, kind: 'struct' });
    };
    tent(c.x - 14, c.z - 8, 1, this.clothMats[0]);
    tent(c.x - 4, c.z - 17, 0.9, this.clothMats[1]);
    tent(c.x + 10, c.z - 12, 1.1, this.clothMats[2]);
    tent(c.x - 18, c.z + 9, 0.85, this.clothMats[3]);
    // 焚き火
    const fx = c.x, fz = c.z;
    const fy = this.y(fx, fz);
    const ring = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const st = new THREE.Mesh(rockGeometry(r, 1), this.stoneMat);
      st.scale.setScalar(0.35);
      st.position.set(fx + Math.cos(a) * 1.1, fy + 0.1, fz + Math.sin(a) * 1.1);
      ring.add(st);
    }
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.6, 6), this.woodMat);
      log.position.set(fx, fy + 0.25, fz);
      log.rotation.set(Math.PI / 2 - 0.3, (i / 4) * Math.PI * 2, 0);
      ring.add(log);
    }
    this.group.add(ring);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    const flames: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.35 - i * 0.05, 1.2 - i * 0.15, 7, 1, true), flameMat);
      f.position.set(fx + (i - 1.5) * 0.12, fy + 0.8, fz + ((i % 2) - 0.5) * 0.15);
      this.group.add(f);
      flames.push(f);
    }
    const light = new THREE.PointLight(0xff9a4a, 12, 26, 1.6);
    light.position.set(fx, fy + 1.4, fz);
    this.group.add(light);
    this.fire = { light, flames, base: new THREE.Vector3(fx, fy, fz) };
    this.colliders.add({ x: fx, z: fz, r: 1.3, top: fy + 1, active: true, kind: 'struct' });
    // 荷車
    const cart = new THREE.Group();
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.3, 1.8), this.woodMat);
    bed.position.y = 1.1; cart.add(bed);
    for (const [wx, wz] of [[-1.2, -1], [1.2, -1], [-1.2, 1], [1.2, 1]]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.18, 12), this.woodMat);
      w.rotation.x = Math.PI / 2; w.position.set(wx, 0.6, wz); cart.add(w);
    }
    const crate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.9, 1.1), this.woodMat);
    crate.position.set(0.6, 1.7, 0); cart.add(crate);
    cart.position.set(c.x + 16, this.y(c.x + 16, c.z + 6), c.z + 6);
    cart.rotation.y = 0.7;
    cart.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this.group.add(cart);
    this.colliders.add({ x: c.x + 16, z: c.z + 6, r: 2.2, top: this.y(c.x + 16, c.z + 6) + 2, active: true, kind: 'struct' });
    // 研究机（図鑑）と展示棚（博物館の最初の形）
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.1), this.woodMat);
    const dx = c.x + 7, dz = c.z + 8;
    desk.position.set(dx, this.y(dx, dz) + 0.95, dz);
    desk.castShadow = true;
    this.group.add(desk);
    for (const [lx, lz] of [[-1, -0.45], [1, -0.45], [-1, 0.45], [1, 0.45]]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.95, 0.1), this.woodMat);
      leg.position.set(dx + lx, this.y(dx, dz) + 0.47, dz + lz);
      this.group.add(leg);
    }
    const book = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.45), this.clothMats[1]);
    book.position.set(dx - 0.3, this.y(dx, dz) + 1.05, dz); this.group.add(book);
    this.deskPos = new THREE.Vector3(dx, this.y(dx, dz) + 1, dz);
    this.colliders.add({ x: dx, z: dz, r: 1.1, top: this.y(dx, dz) + 1, active: true, kind: 'struct' });
    // 展示棚：3段×3列の区画に、集めた物が実際に並ぶ
    const sx = c.x - 6, sz = c.z + 14;
    const sy = this.y(sx, sz);
    const shelf = new THREE.Group();
    for (let k = 0; k < 4; k++) {
      const board = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 0.9), this.woodMat);
      board.position.y = 0.3 + k * 0.85; shelf.add(board);
    }
    for (const px of [-2.05, 2.05]) { const side = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.9, 0.9), this.woodMat); side.position.set(px, 1.45, 0); shelf.add(side); }
    shelf.position.set(sx, sy, sz);
    shelf.rotation.y = Math.PI;
    shelf.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this.group.add(shelf);
    for (let k = 0; k < 3; k++) for (let j = 0; j < 3; j++) this.museumSlots.push(new THREE.Vector3(sx + (j - 1) * 1.3, sy + 0.42 + k * 0.85, sz));
    this.shelfPos = new THREE.Vector3(sx, sy + 1.2, sz - 0.6);
    this.colliders.add({ x: sx, z: sz, r: 2.1, top: sy + 3, active: true, kind: 'struct' });
    // 写真を飾る板
    const board = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.2, 0.12), this.woodMat);
    const bx = c.x + 12, bz = c.z + 16;
    board.position.set(bx, this.y(bx, bz) + 1.8, bz);
    board.rotation.y = Math.PI + 0.4;
    this.group.add(board);
    for (let i = 0; i < 3; i++) {
      const fm = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.8), new THREE.MeshBasicMaterial({ color: 0x3a3226 }));
      fm.position.set((i - 1) * 1.4, 0, -0.07);
      fm.rotation.y = Math.PI;
      board.add(fm);
      this.photoFrames.push(fm);
    }
    this.boardPos = new THREE.Vector3(bx, this.y(bx, bz) + 1.5, bz);
    this.colliders.add({ x: bx, z: bz, r: 1.8, top: this.y(bx, bz) + 3, active: true, kind: 'struct' });
    // 見張り台の建設候補（A=崖の上、B=川辺）。建てるまでは杭だけ
    this.lookoutA = this.lookout(P.campView.x + 4, P.campView.z - 14, false);
    this.lookoutB = this.lookout(-120, 128, false);
  }
  deskPos = new THREE.Vector3();
  shelfPos = new THREE.Vector3();
  boardPos = new THREE.Vector3();

  private lookout(x: number, z: number, built: boolean) {
    const g = new THREE.Group();
    g.position.set(x, this.y(x, z), z);
    const stakes = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.8, 5), this.woodMat);
      s.position.set((i % 2) * 2.4 - 1.2, 0.4, Math.floor(i / 2) * 2.4 - 1.2);
      stakes.add(s);
    }
    stakes.name = 'stakes';
    g.add(stakes);
    const tower = new THREE.Group();
    tower.name = 'tower';
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7, 6), this.woodMat);
      p.position.set((i % 2) * 2.4 - 1.2, 3.5, Math.floor(i / 2) * 2.4 - 1.2);
      tower.add(p);
    }
    const deck = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 3.2), this.woodMat);
    deck.position.y = 7; tower.add(deck);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.6, 4), this.clothMats[0]);
    roof.position.y = 9.4; roof.rotation.y = Math.PI / 4; tower.add(roof);
    tower.traverse((o) => { if ((o as THREE.Mesh).isMesh) o.castShadow = true; });
    tower.visible = built;
    g.add(tower);
    this.group.add(g);
    return g;
  }
  buildLookout(which: 'A' | 'B') {
    const g = which === 'A' ? this.lookoutA : this.lookoutB;
    g.getObjectByName('tower')!.visible = true;
    g.getObjectByName('stakes')!.visible = false;
    this.colliders.add({ x: g.position.x, z: g.position.z, r: 1.9, top: g.position.y + 7, active: true, kind: 'struct' });
  }

  private buildFence() {
    const a = FENCE.a, b = FENCE.b;
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    const posts = Math.floor(len / 3);
    const main = new THREE.Group();
    const gap = new THREE.Group();
    for (let i = 0; i <= posts; i++) {
      const t = i / posts;
      const x = a.x + (b.x - a.x) * t, z = a.z + (b.z - a.z) * t;
      const inGap = Math.hypot(x - FENCE.gap.x, z - FENCE.gap.z) < 4;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.2, 5), this.woodMat);
      post.position.set(x, this.y(x, z) + 1, z);
      post.rotation.z = Math.sin(i * 7.1) * 0.06;
      post.castShadow = true;
      (inGap ? gap : main).add(post);
      if (i < posts) {
        const t2 = (i + 1) / posts;
        const x2 = a.x + (b.x - a.x) * t2, z2 = a.z + (b.z - a.z) * t2;
        const railGap = Math.hypot((x + x2) / 2 - FENCE.gap.x, (z + z2) / 2 - FENCE.gap.z) < 4;
        for (const h of [0.6, 1.4]) {
          const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.1, 4), this.woodMat);
          rail.position.set((x + x2) / 2, (this.y(x, z) + this.y(x2, z2)) / 2 + h, (z + z2) / 2);
          rail.rotation.set(0, -Math.atan2(z2 - z, x2 - x), Math.PI / 2);
          (railGap ? gap : main).add(rail);
        }
        // 柵は通り抜けられない
        this.colliders.add({ x: (x + x2) / 2, z: (z + z2) / 2, r: 1.2, top: this.y(x, z) + 2.2, active: true, kind: 'struct', id: railGap ? 'fenceGap' : 'fence' });
      }
    }
    this.group.add(main, gap);
    this.fenceGap = gap;
  }
  openFenceGap() {
    // 低い通り道：上の横木を残し、下を開ける（小さな生き物だけが通れる）
    this.fenceGap.children.forEach((o, i) => { if (o.position.y - this.y(o.position.x, o.position.z) < 1.0 && i % 3 !== 0) o.visible = false; });
    for (const c of this.colliders.all) if (c.id === 'fenceGap') c.active = false;
    this.fenceGapOpen = true;
  }
  fenceGapOpen = false;

  private buildNineStones() {
    const r = new Rng(99);
    const c = P.nineStones;
    for (let i = 0; i < 9; i++) {
      const a = -0.9 + i * 0.22;
      const x = c.x + Math.cos(a) * 30, z = c.z + Math.sin(a) * 30;
      const h = 3.5 + Math.sin(i * 1.3) * 1.2 + r.range(0, 1);
      const geo = new THREE.BoxGeometry(1.4, h, 0.9, 2, 4, 2);
      const p = geo.getAttribute('position') as THREE.BufferAttribute;
      for (let k = 0; k < p.count; k++) p.setXYZ(k, p.getX(k) * (1 + n.noise(p.getY(k), i) * 0.12), p.getY(k), p.getZ(k) * (1 + n.noise(p.getX(k) + i, p.getY(k)) * 0.15));
      geo.computeVertexNormals();
      const s = new THREE.Mesh(geo, this.stoneMat);
      s.position.set(x, this.y(x, z) + h / 2 - 0.3, z);
      s.rotation.set(r.range(-0.08, 0.08), a + Math.PI / 2, r.range(-0.08, 0.08));
      s.castShadow = s.receiveShadow = true;
      this.group.add(s);
      this.colliders.add({ x, z, r: 0.9, top: this.y(x, z) + h, active: true, kind: 'struct' });
    }
  }

  private buildFossilSlab() {
    const c = P.fossilSlab;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(5, 0.6, 3.4), this.stoneMat);
    slab.position.set(c.x, this.y(c.x, c.z) + 0.1, c.z);
    slab.rotation.set(0.05, 0.4, -0.04);
    slab.receiveShadow = true;
    this.group.add(slab);
    // 巨大な足跡のくぼみ（化石）
    const dark = new THREE.MeshStandardMaterial({ color: 0x4a443a, roughness: 1 });
    patchWorldMaterial(dark);
    for (let i = 0; i < 3; i++) {
      const fp = new THREE.Mesh(new THREE.CircleGeometry(0.55, 14), dark);
      fp.rotation.x = -Math.PI / 2;
      fp.position.set(-1.5 + i * 1.5, 0.31, (i % 2) * 0.9 - 0.45);
      slab.add(fp);
    }
    this.fossilPos = new THREE.Vector3(c.x, this.y(c.x, c.z) + 0.5, c.z);
  }
  fossilPos = new THREE.Vector3();

  private rootArch(cx: number, cz: number, span: number, height: number, count: number, rot: number, r: Rng) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 });
    patchWorldMaterial(mat, { skin: { scale: 0.8, bump: 1.2, crease: 0.25 } });
    for (let i = 0; i < count; i++) {
      const pts: THREE.Vector3[] = [];
      const off = r.range(-3, 3), zoff = (i - count / 2) * 1.6;
      for (let k = 0; k <= 10; k++) {
        const t = k / 10;
        pts.push(new THREE.Vector3((t - 0.5) * span + off, Math.sin(t * Math.PI) * height * r.range(0.85, 1.1), zoff + Math.sin(t * 6 + i) * 0.8));
      }
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, r.range(0.6, 1.3), 7), mat);
      tube.castShadow = tube.receiveShadow = true;
      g.add(tube);
    }
    g.position.set(cx, this.y(cx, cz) - 0.5, cz);
    g.rotation.y = rot;
    this.group.add(g);
    // 両脚の当たり判定
    for (const s of [-1, 1]) {
      const x = cx + Math.cos(rot) * s * span * 0.5, z = cz - Math.sin(rot) * s * span * 0.5;
      this.colliders.add({ x, z, r: 2.5, top: this.y(x, z) + 6, active: true, kind: 'struct' });
    }
    return g;
  }
  private buildJadeGate() { this.rootArch(P.jadeGate.x, P.jadeGate.z, 26, 22, 6, 0.3, new Rng(3)); }
  private buildRootTunnel() {
    const g = this.rootArch(P.rootTunnel.x, P.rootTunnel.z, 12, 8, 7, 0.6, new Rng(4));
    const dark = new THREE.Mesh(new THREE.CircleGeometry(5.5, 20, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0x050605 }));
    dark.position.set(0, 0.2, -1);
    g.add(dark);
    this.tunnelPos = new THREE.Vector3(P.rootTunnel.x, this.y(P.rootTunnel.x, P.rootTunnel.z) + 1, P.rootTunnel.z);
  }
  tunnelPos = new THREE.Vector3();

  setTowerActive(active: boolean) { this.towerActive = active; }

  update(dt: number, time: number, resonance: number) {
    // 輪石が目標の向きへゆっくり回る
    for (const s of this.ringStones) {
      const target = this.faceAngle(s.state);
      let d = target - s.angle;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      s.angle += d * Math.min(1, dt * 4);
      s.mesh.rotation.y = s.angle;
    }
    const pulse = this.towerActive ? (0.5 + 0.5 * Math.sin(time * 2.2)) * (0.4 + resonance) : 0;
    this.copperMat.emissiveIntensity = this.towerActive ? 0.2 + pulse * 1.6 : 0.02;
    this.towerLight.intensity = this.towerActive ? pulse * 20 : 0;
    // 焚き火の揺らぎ
    const f = this.fire;
    f.light.intensity = 10 + Math.sin(time * 13) * 1.5 + Math.sin(time * 7.3) * 2;
    f.flames.forEach((m, i) => { m.scale.y = 0.8 + 0.3 * Math.sin(time * (9 + i * 2) + i); m.rotation.y = time * (1 + i * 0.3); });
  }
}
