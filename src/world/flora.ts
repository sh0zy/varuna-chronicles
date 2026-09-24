import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Rng, Simplex2, smoothstep } from '../core/noise';
import { Terrain, distToSeg } from './terrain';
import { ColliderWorld, Collider } from './colliders';
import { patchWorldMaterial } from './shading';
import { bakeStatic } from './bake';
import { P, MAP_HALF, riverLine, ravineLine, herdLine, riverHalfWidth, FENCE, ARENA_TREES, RAVINE, orgaPathLine } from './layout';

// 植生：リンボク（樹海の巨木）、ナンヨウスギ、ソテツ、木生シダ、棘の低木、葦、岩、倒木。
// 葉は手続き生成したテクスチャ（仮素材）を貼ったカード。

const n = new Simplex2(555);

// ---------- 葉のテクスチャ（1024×1024、4区画） ----------
function makeFoliageAtlas(): THREE.CanvasTexture {
  const S = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d')!;
  g.clearRect(0, 0, S, S);
  const r = new Rng(12);
  // A: 羽状の葉（ソテツ・シダ）
  g.save(); g.translate(256, 500);
  for (let i = 0; i < 60; i++) {
    const t = i / 60;
    const y = -t * 470;
    const len = 150 * Math.sin(Math.PI * Math.min(1, t * 1.1 + 0.05)) + 20;
    for (const s of [-1, 1]) {
      g.strokeStyle = `hsl(${95 + r.range(-12, 12)}, ${40 + r.range(0, 20)}%, ${55 + r.range(-10, 12)}%)`;
      g.lineWidth = 7 - t * 4;
      g.beginPath(); g.moveTo(0, y); g.quadraticCurveTo(s * len * 0.5, y - 20, s * len, y - 45 - t * 20); g.stroke();
    }
  }
  g.strokeStyle = 'hsl(80,30%,45%)'; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -480); g.stroke();
  g.restore();
  // B: 針状の葉の房（リンボク・ナンヨウスギ・葦）
  g.save(); g.translate(768, 505);
  for (let i = 0; i < 260; i++) {
    const a = r.range(-1.25, 1.25);
    const len = r.range(200, 470);
    g.strokeStyle = `hsl(${88 + r.range(-15, 15)}, ${35 + r.range(0, 25)}%, ${48 + r.range(-12, 16)}%)`;
    g.lineWidth = r.range(2, 5);
    g.beginPath(); g.moveTo(r.range(-10, 10), 0);
    g.quadraticCurveTo(Math.sin(a) * len * 0.4, -len * 0.6, Math.sin(a) * len, -Math.cos(a) * len);
    g.stroke();
  }
  g.restore();
  // C: 扇形の広葉（ハテノキ）
  for (let i = 0; i < 70; i++) {
    const x = r.range(40, 470), y = 512 + r.range(40, 470);
    const s = r.range(28, 60), rot = r.range(0, Math.PI * 2);
    g.save(); g.translate(x, y); g.rotate(rot);
    g.fillStyle = `hsl(${85 + r.range(-18, 22)}, ${45 + r.range(0, 20)}%, ${50 + r.range(-12, 14)}%)`;
    g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, s, -2.3, -0.8); g.closePath(); g.fill();
    g.restore();
  }
  // D: 棘のある小枝
  g.save(); g.translate(768, 1000);
  const twig = (x: number, y: number, a: number, len: number, d: number) => {
    const x2 = x + Math.sin(a) * len, y2 = y - Math.cos(a) * len;
    g.strokeStyle = `hsl(${30 + r.range(-10, 20)}, 30%, ${30 + r.range(-6, 12)}%)`;
    g.lineWidth = Math.max(1.5, d * 2.2);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke();
    for (let k = 0; k < 4; k++) { // 棘
      const t = r.next(); const px = x + (x2 - x) * t, py = y + (y2 - y) * t;
      g.beginPath(); g.moveTo(px, py); g.lineTo(px + r.range(-14, 14), py + r.range(-14, 4)); g.stroke();
    }
    g.fillStyle = `hsl(${70 + r.range(-15, 15)}, 30%, ${35 + r.range(0, 15)}%)`;
    for (let k = 0; k < 3; k++) { g.beginPath(); g.ellipse(x2 + r.range(-8, 8), y2 + r.range(-8, 8), 7, 4, r.next() * 3, 0, 7); g.fill(); }
    if (d > 0) { twig(x2, y2, a + r.range(0.2, 0.7), len * 0.7, d - 1); twig(x2, y2, a - r.range(0.2, 0.7), len * 0.7, d - 1); }
  };
  for (let i = 0; i < 5; i++) twig(r.range(-60, 60), 0, r.range(-0.8, 0.8), r.range(130, 190), 3);
  g.restore();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.generateMipmaps = true;
  return tex;
}

type UVRect = [number, number, number, number];
const UV_FROND: UVRect = [0, 0.5, 0.5, 1];
const UV_NEEDLE: UVRect = [0.5, 0.5, 1, 1];
const UV_BROAD: UVRect = [0, 0, 0.5, 0.5];
const UV_THORN: UVRect = [0.5, 0, 1, 0.5];

function setColor(geo: THREE.BufferGeometry, c: THREE.Color) {
  const cnt = geo.getAttribute('position').count;
  const a = new Float32Array(cnt * 3);
  for (let i = 0; i < cnt; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(a, 3));
  return geo;
}

/** 始点から終点へ伸びる先細りの円柱 */
function limb(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, seg = 8, rings = 3, col = new THREE.Color(0x6b5a48)) {
  const len = a.distanceTo(b);
  const geo = new THREE.CylinderGeometry(r1, r0, len, seg, rings, true);
  geo.translate(0, len / 2, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  geo.applyQuaternion(q);
  geo.translate(a.x, a.y, a.z);
  return setColor(geo, col);
}

/** 葉のカード。base から dir へ伸び、垂れ下がる（3分割） */
function leafCard(base: THREE.Vector3, dir: THREE.Vector3, len: number, width: number, droop: number, uv: UVRect, col: THREE.Color) {
  const segs = 3;
  const pos: number[] = [], uvs: number[] = [], idx: number[] = [];
  const side = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));
  if (side.lengthSq() < 1e-4) side.set(1, 0, 0);
  side.normalize();
  for (let s = 0; s <= segs; s++) {
    const t = s / segs;
    const p = base.clone().addScaledVector(dir, len * t);
    p.y -= droop * t * t * len;
    for (const k of [-1, 1]) {
      const q = p.clone().addScaledVector(side, k * width * 0.5);
      pos.push(q.x, q.y, q.z);
      uvs.push(k < 0 ? uv[0] : uv[2], uv[1] + (uv[3] - uv[1]) * t);
    }
  }
  for (let s = 0; s < segs; s++) { const a = s * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  // 葉の法線は上向きに寄せる（柔らかい陰影）
  const nrm = geo.getAttribute('normal') as THREE.BufferAttribute;
  for (let i = 0; i < nrm.count; i++) { nrm.setXYZ(i, nrm.getX(i) * 0.4, Math.abs(nrm.getY(i)) * 0.6 + 0.5, nrm.getZ(i) * 0.4); }
  return setColor(geo, col);
}

/** 房（中心から放射状に垂れる葉の束） */
function tuft(center: THREE.Vector3, count: number, len: number, width: number, droop: number, uv: UVRect, col: THREE.Color, r: Rng, upBias = 0.3) {
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + r.range(-0.3, 0.3);
    const dir = new THREE.Vector3(Math.cos(a), upBias + r.range(-0.15, 0.3), Math.sin(a)).normalize();
    const c = col.clone().offsetHSL(r.range(-0.02, 0.02), 0, r.range(-0.06, 0.06));
    parts.push(leafCard(center, dir, len * r.range(0.8, 1.15), width, droop, uv, c));
  }
  return parts;
}

function stripToPNU(g: THREE.BufferGeometry) {
  if (!g.getAttribute('uv')) {
    const cnt = g.getAttribute('position').count;
    g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(cnt * 2), 2));
  }
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(k)) g.deleteAttribute(k);
  return g;
}
function merge(parts: THREE.BufferGeometry[]) {
  const ps = parts.map(stripToPNU);
  // index の有無を揃える（すべて index 付きなら そのまま、混在なら index を外す）
  const all = ps.every((p) => p.index) ? ps : ps.map((p) => (p.index ? p.toNonIndexed() : p));
  return mergeGeometries(all, false)!;
}

interface TreeGeo { bark: THREE.BufferGeometry; leaf: THREE.BufferGeometry; trunkR: number; height: number }

const BARK_LEPI = new THREE.Color(0x6e6450), BARK_DARK = new THREE.Color(0x4f4436), BARK_CYCAD = new THREE.Color(0x7a6a4e);
const LEAF_JADE = new THREE.Color(0x5c8a4a), LEAF_DEEP = new THREE.Color(0x3f6a3a), LEAF_CYCAD = new THREE.Color(0x7a9a52), LEAF_DRY = new THREE.Color(0x8a8a50);

function lepidodendron(r: Rng, scale = 1, minH = 0, roots = true): TreeGeo {
  const H = Math.max(minH, r.range(30, 46) * scale);
  const r0 = r.range(1.1, 1.5) * scale;
  const bark: THREE.BufferGeometry[] = [];
  const leaf: THREE.BufferGeometry[] = [];
  // 根元の張り出し
  for (let i = 0; i < (roots ? 5 : 0); i++) {
    const a = (i / 5) * Math.PI * 2 + r.range(-0.3, 0.3);
    const out = new THREE.Vector3(Math.cos(a) * r0 * 2.6, -0.4, Math.sin(a) * r0 * 2.6);
    bark.push(limb(out, new THREE.Vector3(Math.cos(a) * r0 * 0.3, 3.2 * scale, Math.sin(a) * r0 * 0.3), r0 * 0.35, r0 * 0.5, 6, 2, BARK_DARK));
  }
  bark.push(limb(new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(r.range(-0.6, 0.6), H, r.range(-0.6, 0.6)), r0, r0 * 0.55, 10, 8, BARK_LEPI));
  const top = new THREE.Vector3(0, H, 0);
  // 二又に分かれる樹冠（リンボクの特徴）
  const fork = (p: THREE.Vector3, dir: THREE.Vector3, len: number, rad: number, depth: number) => {
    const end = p.clone().addScaledVector(dir, len);
    bark.push(limb(p, end, rad, rad * 0.7, 6, 2, BARK_LEPI));
    if (depth === 0) {
      leaf.push(...tuft(end, 9, 6.2 * scale, 3.6 * scale, 0.5, UV_NEEDLE, LEAF_JADE, r, 0.15));
      leaf.push(...tuft(end, 5, 4.2 * scale, 3.0 * scale, 0.2, UV_NEEDLE, LEAF_DEEP, r, 0.7));
      return;
    }
    for (const s of [-1, 1]) {
      const d2 = dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), r.range(0.9, 1.6)).add(new THREE.Vector3(s * 0.45, 0.2, s * 0.3)).normalize();
      fork(end, d2, len * 0.72, rad * 0.7, depth - 1);
    }
  };
  for (let i = 0; i < 2; i++) {
    const a = i * Math.PI + r.range(-0.4, 0.4);
    fork(top, new THREE.Vector3(Math.cos(a) * 0.7, 0.75, Math.sin(a) * 0.7).normalize(), 5.5 * scale, r0 * 0.5, 2);
  }
  return { bark: merge(bark), leaf: merge(leaf), trunkR: r0 * 1.05, height: H };
}

function araucaria(r: Rng): TreeGeo {
  const H = r.range(16, 26);
  const r0 = r.range(0.45, 0.7);
  const bark = [limb(new THREE.Vector3(0, -0.4, 0), new THREE.Vector3(0, H, 0), r0, r0 * 0.3, 8, 5, BARK_DARK)];
  const leaf: THREE.BufferGeometry[] = [];
  const tiers = 4;
  for (let t = 0; t < tiers; t++) {
    const y = H * (0.66 + t * 0.09);
    const len = 5.5 - t * 1.1;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + t * 0.5 + r.range(-0.2, 0.2);
      const d = new THREE.Vector3(Math.cos(a), 0.25, Math.sin(a)).normalize();
      const p = new THREE.Vector3(0, y, 0);
      const end = p.clone().addScaledVector(d, len);
      bark.push(limb(p, end, 0.18, 0.06, 5, 1, BARK_DARK));
      for (let k = 0; k < 3; k++) {
        const bp = p.clone().lerp(end, 0.35 + k * 0.28);
        leaf.push(leafCard(bp, new THREE.Vector3(d.x, 0.9, d.z).normalize(), 2.4, 2.6, 0.2, UV_NEEDLE, LEAF_DEEP.clone().offsetHSL(0, 0, r.range(-0.04, 0.04))));
        leaf.push(leafCard(bp, new THREE.Vector3(d.x, -0.4, d.z).normalize(), 2.0, 2.2, 0.6, UV_NEEDLE, LEAF_DEEP));
      }
    }
  }
  leaf.push(...tuft(new THREE.Vector3(0, H, 0), 6, 2.2, 1.8, 0.3, UV_NEEDLE, LEAF_DEEP, r, 0.5));
  return { bark: merge(bark), leaf: merge(leaf), trunkR: r0 + 0.1, height: H };
}

function cycad(r: Rng, scale = 1): TreeGeo {
  const H = r.range(0.8, 2.6) * scale;
  const r0 = r.range(0.35, 0.55) * scale;
  const bark = [limb(new THREE.Vector3(0, -0.3, 0), new THREE.Vector3(r.range(-0.2, 0.2), H, r.range(-0.2, 0.2)), r0, r0 * 0.85, 9, 3, BARK_CYCAD)];
  const leaf = tuft(new THREE.Vector3(0, H, 0), 14, 2.6 * scale, 1.2 * scale, 0.5, UV_FROND, LEAF_CYCAD, r, 0.55);
  return { bark: merge(bark), leaf: merge(leaf), trunkR: r0, height: H + 1.5 };
}

function treeFern(r: Rng): TreeGeo {
  const H = r.range(3.5, 7.5);
  const bark = [limb(new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(r.range(-0.5, 0.5), H, r.range(-0.5, 0.5)), 0.22, 0.17, 6, 3, BARK_DARK)];
  const top = new THREE.Vector3(0, H, 0);
  const leaf = tuft(top, 11, 3.6, 1.4, 0.75, UV_FROND, LEAF_JADE, r, 0.45);
  return { bark: merge(bark), leaf: merge(leaf), trunkR: 0.25, height: H };
}

function broadleaf(r: Rng): TreeGeo {
  const H = r.range(9, 14);
  const bark: THREE.BufferGeometry[] = [limb(new THREE.Vector3(0, -0.3, 0), new THREE.Vector3(0, H * 0.55, 0), 0.5, 0.35, 8, 3, BARK_DARK)];
  const leaf: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + r.range(-0.3, 0.3);
    const p = new THREE.Vector3(0, H * 0.5, 0);
    const end = new THREE.Vector3(Math.cos(a) * 3.5, H * r.range(0.8, 1), Math.sin(a) * 3.5);
    bark.push(limb(p, end, 0.25, 0.1, 5, 1, BARK_DARK));
    for (let k = 0; k < 5; k++) {
      const c = end.clone().add(new THREE.Vector3(r.range(-1.5, 1.5), r.range(-1, 1.2), r.range(-1.5, 1.5)));
      const d = new THREE.Vector3(r.range(-1, 1), r.range(-0.2, 0.8), r.range(-1, 1)).normalize();
      leaf.push(leafCard(c.clone().addScaledVector(d, -1.5), d, 3.2, 3.2, 0.1, UV_BROAD, LEAF_DRY.clone().offsetHSL(r.range(-0.03, 0.03), 0, r.range(-0.05, 0.05))));
    }
  }
  return { bark: merge(bark), leaf: merge(leaf), trunkR: 0.55, height: H };
}

function thornbush(r: Rng): TreeGeo {
  const leaf: THREE.BufferGeometry[] = [];
  const c = new THREE.Color(0x5c5a3a);
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + r.range(-0.3, 0.3);
    const d = new THREE.Vector3(Math.cos(a) * 0.5, 0.8 + r.range(-0.2, 0.2), Math.sin(a) * 0.5).normalize();
    leaf.push(leafCard(new THREE.Vector3(Math.cos(a) * 0.2, -0.1, Math.sin(a) * 0.2), d, r.range(1.3, 1.9), 1.6, 0.25, UV_THORN, c.clone().offsetHSL(0, 0, r.range(-0.05, 0.05))));
  }
  const bark = [limb(new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(0, 0.6, 0), 0.08, 0.05, 4, 1, BARK_DARK)];
  return { bark: merge(bark), leaf: merge(leaf), trunkR: 0.9, height: 1.6 };
}

function reeds(r: Rng): TreeGeo {
  const leaf: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 7; i++) {
    const a = r.range(0, Math.PI * 2);
    const b = new THREE.Vector3(Math.cos(a) * r.range(0, 0.6), -0.1, Math.sin(a) * r.range(0, 0.6));
    leaf.push(leafCard(b, new THREE.Vector3(r.range(-0.15, 0.15), 1, r.range(-0.15, 0.15)).normalize(), r.range(1.6, 2.6), 0.9, 0.1, UV_NEEDLE, new THREE.Color(0x8a9a58)));
  }
  const bark = [limb(new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(0, 0.3, 0), 0.03, 0.02, 3, 1, BARK_DARK)];
  return { bark: merge(bark), leaf: merge(leaf), trunkR: 0, height: 2.4 };
}

export function rockGeometry(r: Rng, detail = 2) {
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.getAttribute('position') as THREE.BufferAttribute;
  const sx = r.range(0.8, 1.6), sy = r.range(0.45, 0.9), sz = r.range(0.8, 1.4);
  const o = r.range(0, 100);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const d = 1 + 0.28 * n.noise(x * 1.3 + o, z * 1.3 + y) + 0.12 * n.noise(x * 3.1 + o, y * 3.1 - z);
    // 平らな割れ面
    const flat = Math.max(0.6, 1 - Math.max(0, x * 0.8 + y * 0.3 - 0.4));
    pos.setXYZ(i, x * d * sx * flat, Math.max(y * d * sy, -0.3), z * d * sz);
  }
  geo.computeVertexNormals();
  return setColor(geo, new THREE.Color(0x8a8278).offsetHSL(0, 0, r.range(-0.08, 0.05)));
}

export interface SpecialTree {
  id: string;
  group: THREE.Group;
  collider: Collider;
  height: number;
  fallen: boolean;
  falling: number;       // 0〜1 倒れる途中
  fallDir: number;       // 倒れる方向（ラジアン）
  health: number;        // 突進を受けられる回数
}

export class Flora {
  group = new THREE.Group();
  barkMat: THREE.MeshStandardMaterial;
  leafMat: THREE.MeshStandardMaterial;
  rockMat: THREE.MeshStandardMaterial;
  specials = new Map<string, SpecialTree>();
  lepiProto: TreeGeo[] = [];
  /** 樹海の縁の光の柱を置く候補（巨木のあいだ） */
  shaftSpots: THREE.Vector3[] = [];

  constructor(private terrain: Terrain, private colliders: ColliderWorld, quality: 'low' | 'medium' | 'high') {
    const atlas = makeFoliageAtlas();
    this.barkMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92 });
    patchWorldMaterial(this.barkMat, { skin: { scale: 0.55, bump: 1.6, crease: 0.35 } });
    this.leafMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: atlas, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.8 });
    this.leafMat.onBeforeCompile = (shader) => {
      shader.vertexShader = 'uniform float uTime; uniform vec3 uWindVec;\n' + shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        {
          vec3 ip = vec3(0.0);
          #ifdef USE_INSTANCING
            ip = instanceMatrix[3].xyz;
          #endif
          float hh = max(position.y, 0.0);
          float ph = uTime * 1.4 + ip.x * 0.07 + ip.z * 0.05;
          float sw = (sin(ph) * 0.6 + sin(ph * 2.3 + position.x) * 0.25) * uWindVec.z;
          transformed.x += uWindVec.x * sw * 0.012 * hh;
          transformed.z += uWindVec.y * sw * 0.012 * hh;
          transformed.y += sin(uTime * 3.0 + position.x * 2.0 + position.z) * 0.03 * uWindVec.z;
        }`);
      // 葉の裏面でも法線を反転させない（上向きの柔らかい陰影を保つ）
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_begin>', '#include <normal_fragment_begin>\n normal = normalize(vNormal);');
    };
    patchWorldMaterial(this.leafMat);
    this.rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 });
    patchWorldMaterial(this.rockMat, { rock: true });
    this.build(quality);
    for (const t of this.specials.values()) t.group.userData.dynamic = true;
    bakeStatic(this.group);
  }

  private instanced(protos: TreeGeo[], placements: { x: number; z: number; rot: number; s: number; tint: number }[], castShadow: boolean, collide: boolean, name: string) {
    // プロトタイプと 260m 四方の区画ごとに振り分ける（画面外・影の範囲外の区画を描かずに済む）
    const CELL = 260;
    const buckets = new Map<string, { proto: number; list: typeof placements }>();
    placements.forEach((p, i) => {
      const pi = i % protos.length;
      const key = `${pi}:${Math.floor(p.x / CELL)}:${Math.floor(p.z / CELL)}`;
      let b = buckets.get(key);
      if (!b) buckets.set(key, (b = { proto: pi, list: [] }));
      b.list.push(p);
    });
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), v = new THREE.Vector3(), col = new THREE.Color();
    for (const b of buckets.values()) {
      const proto = protos[b.proto];
      const list = b.list;
      if (!list.length) continue;
      const bark = new THREE.InstancedMesh(proto.bark, this.barkMat, list.length);
      const leaf = new THREE.InstancedMesh(proto.leaf, this.leafMat, list.length);
      list.forEach((p, i) => {
        const y = this.terrain.height(p.x, p.z);
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.rot);
        s.setScalar(p.s);
        m4.compose(v.set(p.x, y, p.z), q, s);
        bark.setMatrixAt(i, m4); leaf.setMatrixAt(i, m4);
        col.setRGB(1, 1, 1).offsetHSL(0, 0, p.tint);
        leaf.setColorAt(i, col); bark.setColorAt(i, col);
        if (collide && proto.trunkR > 0) this.colliders.add({ x: p.x, z: p.z, r: proto.trunkR * p.s, top: y + proto.height * p.s, active: true, kind: 'tree' });
      });
      bark.castShadow = castShadow; leaf.castShadow = castShadow;
      bark.receiveShadow = true; leaf.receiveShadow = true;
      bark.name = name; leaf.name = name;
      bark.computeBoundingSphere(); leaf.computeBoundingSphere();
      this.group.add(bark, leaf);
      const center = bark.boundingSphere!.center.clone();
      this.chunks.push({ meshes: [bark, leaf], center, radius: bark.boundingSphere!.radius, shadow: castShadow, far: proto.height > 12 ? 1500 : proto.height > 3 ? 700 : 260 });
    }
  }
  /** 区画ごとの表示と影（近い区画だけが影を落とす） */
  chunks: { meshes: THREE.InstancedMesh[]; center: THREE.Vector3; radius: number; shadow: boolean; far: number }[] = [];
  updateChunks(cam: THREE.Vector3, shadowRange: number) {
    for (const c of this.chunks) {
      const d = Math.max(0, Math.hypot(c.center.x - cam.x, c.center.z - cam.z) - c.radius);
      const vis = d < c.far;
      const sh = c.shadow && d < shadowRange;
      for (const m of c.meshes) { m.visible = vis; m.castShadow = sh; }
    }
  }

  private free(x: number, z: number, margin: number) {
    if (Math.abs(x) > MAP_HALF - 40 || Math.abs(z) > MAP_HALF - 40) return false;
    const rn = riverLine.nearest(x, z);
    if (rn.dist < riverHalfWidth(rn.s, x, z) + margin) return false;
    const rv = ravineLine.nearest(x, z);
    if (rv.dist < 26 + margin * 0.5) return false;
    if (Math.hypot(x - P.camp.x, z - P.camp.z) < 60) return false;
    if (Math.hypot(x - P.tower.x, z - P.tower.z) < 28) return false;
    if (Math.hypot(x - P.startHill.x, z - P.startHill.z) < 30) return false;
    if (distToSeg(x, z, FENCE.a, FENCE.b) < 6) return false;
    if (orgaPathLine.nearest(x, z).dist < 11 + margin * 0.3) return false;
    if (this.terrain.slope(x, z) > 0.62) return false;
    return true;
  }

  private scatter(cell: number, seed: number, accept: (x: number, z: number, r: Rng) => boolean) {
    const r = new Rng(seed);
    const out: { x: number; z: number; rot: number; s: number; tint: number }[] = [];
    for (let z = -MAP_HALF; z < MAP_HALF; z += cell) for (let x = -MAP_HALF; x < MAP_HALF; x += cell) {
      const px = x + r.range(0.1, 0.9) * cell, pz = z + r.range(0.1, 0.9) * cell;
      if (accept(px, pz, r)) out.push({ x: px, z: pz, rot: r.range(0, Math.PI * 2), s: r.range(0.85, 1.15), tint: r.range(-0.06, 0.06) });
    }
    return out;
  }

  private build(quality: 'low' | 'medium' | 'high') {
    const T = this.terrain;
    const r = new Rng(31);
    this.lepiProto = [lepidodendron(r), lepidodendron(r), lepidodendron(r, 1.15)];
    const arauProto = [araucaria(r), araucaria(r)];
    const cycadProto = [cycad(r), cycad(r, 1.2), cycad(r, 0.8)];
    const fernProto = [treeFern(r), treeFern(r)];
    const broadProto = [broadleaf(r), broadleaf(r)];
    const thornProto = [thornbush(r), thornbush(r)];
    const reedProto = [reeds(r), reeds(r)];

    // 樹海の巨木
    const lepi = this.scatter(24, 1, (x, z, rr) => {
      const J = T.jungleAt(x, z) * (1 - T.clearingAt(x, z));
      if (J < 0.45 || !this.free(x, z, 10)) return false;
      if (herdLine.nearest(x, z).dist < 14) return false;
      return rr.next() < J * 0.85;
    });
    // 翡翠の縁：光の柱が通る隙間を意図して置く
    for (const [dx, dz] of [[0, 0], [22, -18], [-18, -30], [30, 12], [-6, 26], [44, -40], [12, -58]]) {
      lepi.push({ x: P.jadeEdge.x + dx, z: P.jadeEdge.z + dz, rot: r.range(0, 6), s: 1.2, tint: 0 });
    }
    this.instanced(this.lepiProto, lepi, true, true, 'lepidodendron');
    for (let i = 0; i < 6; i++) {
      const a = i * 1.1;
      this.shaftSpots.push(new THREE.Vector3(P.jadeEdge.x + Math.cos(a) * 18, 0, P.jadeEdge.z - 10 + Math.sin(a) * 18));
    }
    this.shaftSpots.push(new THREE.Vector3(P.jadeGate.x, 0, P.jadeGate.z + 10), new THREE.Vector3(P.jadeGate.x - 20, 0, P.jadeGate.z - 20));
    for (const s of this.shaftSpots) s.y = T.height(s.x, s.z);

    // 草海のナンヨウスギ（群生）
    const arau = this.scatter(34, 2, (x, z, rr) => {
      const J = T.jungleAt(x, z);
      if (J > 0.3 || !this.free(x, z, 8)) return false;
      if (herdLine.nearest(x, z).dist < 16) return false;
      const d = n.noise(x / 220, z / 220);
      return d > 0.25 && rr.next() < (d - 0.25) * 1.6;
    });
    this.instanced(arauProto, arau, true, true, 'araucaria');

    // ソテツ（境界と避難の茂み）
    const cyc = this.scatter(14, 3, (x, z, rr) => {
      const J = T.jungleAt(x, z);
      if (!this.free(x, z, 4)) return false;
      const edge = 1 - Math.abs(J - 0.4) * 2.4;
      return rr.next() < Math.max(0, edge) * 0.45 + (J < 0.2 && n.noise(x / 60, z / 60) > 0.55 ? 0.12 : 0);
    });
    for (let i = 0; i < 26; i++) { // 幼体を避難させる茂み（目印になる密集地）
      const a = r.range(0, Math.PI * 2), d = r.range(2, 16);
      cyc.push({ x: P.grove.x + Math.cos(a) * d, z: P.grove.z + Math.sin(a) * d, rot: r.range(0, 6), s: r.range(1.0, 1.5), tint: r.range(-0.04, 0.04) });
    }
    this.instanced(cycadProto, cyc, quality !== 'low', true, 'cycad');

    // 木生シダ
    const tf = this.scatter(11, 4, (x, z, rr) => {
      const J = T.jungleAt(x, z);
      if (J < 0.35 || !this.free(x, z, 4)) return false;
      return rr.next() < J * 0.5;
    });
    this.instanced(fernProto, tf, quality === 'high', true, 'treefern');

    // 草海のハテノキ（まばら）
    const bl = this.scatter(60, 5, (x, z, rr) => T.jungleAt(x, z) < 0.25 && this.free(x, z, 12) && herdLine.nearest(x, z).dist > 18 && rr.next() < 0.18);
    this.instanced(broadProto, bl, true, true, 'broadleaf');

    // 棘の低木：野営地の北東に増えすぎた茂み（ヒメヨロイが来なくなったため）
    const th = this.scatter(26, 6, (x, z, rr) => T.jungleAt(x, z) < 0.3 && this.free(x, z, 5) && rr.next() < 0.06);
    const thicket: typeof th = [];
    for (let i = 0; i < 34; i++) {
      const a = r.range(0, Math.PI * 2), d = Math.sqrt(r.next()) * 26;
      thicket.push({ x: P.thornThicket.x + Math.cos(a) * d, z: P.thornThicket.z + Math.sin(a) * d * 0.7, rot: r.range(0, 6), s: r.range(0.9, 1.4), tint: 0 });
    }
    this.instanced(thornProto, th, false, false, 'thornbush');
    this.thicketPlacements = thicket;
    this.thicketMeshes = [];
    {
      // 茂みは刈れるので個別に扱えるよう1つの InstancedMesh にまとめる
      const proto = thornProto[0];
      const bark = new THREE.InstancedMesh(proto.bark, this.barkMat, thicket.length);
      const leaf = new THREE.InstancedMesh(proto.leaf, this.leafMat, thicket.length);
      const m4 = new THREE.Matrix4();
      thicket.forEach((p, i) => {
        m4.compose(new THREE.Vector3(p.x, T.height(p.x, p.z), p.z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.rot), new THREE.Vector3().setScalar(p.s));
        bark.setMatrixAt(i, m4); leaf.setMatrixAt(i, m4);
      });
      leaf.castShadow = true;
      this.group.add(bark, leaf);
      this.thicketMeshes.push(bark, leaf);
    }

    // 葦（川岸）
    const rd = this.scatter(7, 7, (x, z, rr) => {
      const rn = riverLine.nearest(x, z);
      const w = riverHalfWidth(rn.s, x, z);
      if (rn.dist < w - 1 || rn.dist > w + 7) return false;
      if (Math.hypot(x - P.ford.x, z - P.ford.z) < 30) return false;
      return rr.next() < 0.55;
    });
    this.instanced(reedProto, rd, false, false, 'reeds');

    // 岩
    const rockProtos: TreeGeo[] = [];
    for (let i = 0; i < 5; i++) rockProtos.push({ bark: rockGeometry(r), leaf: new THREE.BufferGeometry(), trunkR: 0, height: 0 });
    const rocks = this.scatter(30, 8, (x, z, rr) => {
      if (!this.free(x, z, 3)) return false;
      const sl = T.slope(x, z);
      return rr.next() < 0.07 + sl * 0.3;
    });
    // 根の谷の縁の岩
    for (let i = 0; i < 90; i++) {
      const p = ravineLine.pointAt(r.range(0, ravineLine.length));
      const side = r.next() < 0.5 ? -1 : 1;
      const rx = p.x + r.range(-8, 8), rz = p.z + side * r.range(26, 36);
      if (T.slope(rx, rz) < 0.45) rocks.push({ x: rx, z: rz, rot: r.range(0, 6), s: r.range(1, 2.2), tint: 0 });
    }
    const m4 = new THREE.Matrix4();
    const rbuckets: typeof rocks[] = rockProtos.map(() => []);
    rocks.forEach((p, i) => rbuckets[i % rockProtos.length].push(p));
    rockProtos.forEach((proto, pi) => {
      const list = rbuckets[pi];
      const im = new THREE.InstancedMesh(proto.bark, this.rockMat, list.length);
      list.forEach((p, i) => {
        const size = p.s * r.range(0.9, 2.6);
        const y = T.height(p.x, p.z) - size * 0.25;
        m4.compose(new THREE.Vector3(p.x, y, p.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(r.range(-0.2, 0.2), p.rot, r.range(-0.2, 0.2))), new THREE.Vector3().setScalar(size));
        im.setMatrixAt(i, m4);
        if (size > 1.4) this.colliders.add({ x: p.x, z: p.z, r: size * 0.9, top: y + size * 0.6, active: true, kind: 'rock' });
      });
      im.castShadow = true; im.receiveShadow = true;
      im.computeBoundingSphere();
      this.group.add(im);
    });

    // オルガの広場の巨木（個別。突進で倒れる）
    ARENA_TREES.forEach((p, i) => this.addSpecial('arena' + i, p.x, p.z, 1.0, new Rng(100 + i), 2));
    // 根の谷に倒れて橋になる巨木
    // 谷の幅（約50m）を越えられる高さを保証する
    this.addSpecial('bridge', P.bridgeTree.x, P.bridgeTree.z, 1.15, new Rng(777), 99, 64);

    // 倒木（以前にオルガが倒した木）
    for (let i = 0; i < 9; i++) {
      const a = r.range(0, Math.PI * 2), d = r.range(20, 70);
      const x = P.clearing.x + Math.cos(a) * d, z = P.clearing.z + Math.sin(a) * d * 0.9;
      this.addLog(x, z, r.range(0, Math.PI), r);
    }
    void RAVINE;
  }

  thicketPlacements: { x: number; z: number; rot: number; s: number; tint: number }[] = [];
  thicketMeshes: THREE.InstancedMesh[] = [];
  thicketCut = new Set<number>();
  cutThicket(i: number) {
    if (this.thicketCut.has(i)) return;
    this.thicketCut.add(i);
    const m4 = new THREE.Matrix4().makeScale(0, 0, 0);
    for (const m of this.thicketMeshes) { m.setMatrixAt(i, m4); m.instanceMatrix.needsUpdate = true; }
  }

  logs: { x: number; z: number; rot: number }[] = [];
  addLog(x: number, z: number, rot: number, r: Rng) {
    this.logs.push({ x, z, rot });
    const proto = this.lepiProto[0];
    const len = r.range(16, 26);
    const g = limb(new THREE.Vector3(0, 0, 0), new THREE.Vector3(len, 0, 0), 1.1, 0.8, 9, 5, BARK_LEPI);
    const mesh = new THREE.Mesh(g, this.barkMat);
    const y = this.terrain.height(x, z) + 0.6;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rot;
    mesh.castShadow = true; mesh.receiveShadow = true;
    this.group.add(mesh);
    // 丸太の当たり判定（数個の円）
    for (let t = 0.1; t < 1; t += 0.2) {
      const px = x + Math.cos(-rot) * len * t, pz = z + Math.sin(-rot) * len * t;
      this.colliders.add({ x: px, z: pz, r: 1.1, top: y + 1.1, active: true, kind: 'tree' });
    }
    void proto;
  }

  private addSpecial(id: string, x: number, z: number, scale: number, r: Rng, health: number, minH = 0) {
    const proto = lepidodendron(r, scale, minH, id !== 'bridge');
    const group = new THREE.Group();
    const bark = new THREE.Mesh(proto.bark, this.barkMat);
    const leaf = new THREE.Mesh(proto.leaf, this.leafMat);
    bark.castShadow = leaf.castShadow = true;
    bark.receiveShadow = leaf.receiveShadow = true;
    group.add(bark, leaf);
    const y = this.terrain.height(x, z);
    group.position.set(x, y, z);
    this.group.add(group);
    const collider = this.colliders.add({ x, z, r: proto.trunkR, top: y + proto.height, active: true, kind: 'tree', id });
    this.specials.set(id, { id, group, collider, height: proto.height, fallen: false, falling: 0, fallDir: 0, health });
  }

  /** 巨木を倒す。倒れた後は幹に沿った当たり判定になる */
  fell(id: string, dir: number) {
    const t = this.specials.get(id);
    if (!t || t.fallen || t.falling > 0) return;
    t.falling = 0.001;
    t.fallDir = dir;
  }

  /** 倒れ終わった木の位置を即座に反映（セーブの復元用） */
  setFallen(id: string, dir: number) {
    const t = this.specials.get(id);
    if (!t) return;
    t.fallDir = dir;
    t.falling = 1;
    this.applyFall(t, 1);
    this.finishFall(t);
  }

  private applyFall(t: SpecialTree, k: number) {
    const ang = Math.min(1, k) * (Math.PI / 2 - 0.06);
    // 上向きの幹が (cos d, 0, sin d) の方向へ倒れる回転軸 = up × dir
    const axis = new THREE.Vector3(Math.sin(t.fallDir), 0, -Math.cos(t.fallDir));
    t.group.quaternion.setFromAxisAngle(axis, ang);
  }

  onFallen: ((t: SpecialTree) => void) | null = null;
  private finishFall(t: SpecialTree) {
    if (t.fallen) return;
    t.fallen = true;
    t.collider.active = false;
    // 幹に沿って当たり判定を作る（橋の丸太は上を歩くので作らない）
    const baseY = t.group.position.y;
    if (t.id !== 'bridge') for (let d = 3; d < t.height * 0.95; d += 2.2) {
      const x = t.group.position.x + Math.cos(t.fallDir) * d, z = t.group.position.z + Math.sin(t.fallDir) * d;
      this.colliders.add({ x, z, r: 1.0, top: baseY + 1.8, active: true, kind: 'tree', id: t.id + '_log' });
    }
    this.onFallen?.(t);
  }

  update(dt: number) {
    for (const t of this.specials.values()) {
      if (t.falling > 0 && t.falling < 1) {
        // 最初はゆっくり、最後に加速して倒れる
        t.falling = Math.min(1, t.falling + dt * (0.12 + t.falling * 1.3));
        this.applyFall(t, t.falling * t.falling);
        if (t.falling >= 1) this.finishFall(t);
      }
    }
  }

  /** 倒木の橋の上の高さ（橋の上を歩くため）。橋の外なら null */
  bridgeHeight(x: number, z: number): number | null {
    const t = this.specials.get('bridge');
    if (!t || !t.fallen) return null;
    const bx = t.group.position.x, bz = t.group.position.z;
    const dx = Math.cos(t.fallDir), dz = Math.sin(t.fallDir);
    const along = (x - bx) * dx + (z - bz) * dz;
    const across = Math.abs(-(x - bx) * dz + (z - bz) * dx);
    const len = t.height * 0.92;
    if (along < -1 || along > len + 1 || across > 2.1) return null;
    // 両岸の地面の高さを結ぶ（橋の上は歩ける）
    const y0 = this.terrain.height(bx, bz) + 1.2;
    const y1 = this.terrain.height(bx + dx * len, bz + dz * len) + 0.4;
    const k = Math.max(0, Math.min(1, along / len));
    return y0 + (Math.max(y1, y0 - 6) - y0) * k;
  }
}

export { smoothstep };
