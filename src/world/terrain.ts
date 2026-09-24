import * as THREE from 'three';
import { Simplex2, smoothstep, clamp, lerp } from '../core/noise';
import {
  MAP_HALF, TERRAIN_RES, P, riverLine, ravineLine, herdLine, riverSurface, riverHalfWidth, riverDepth, FENCE, orgaPathLine,
} from './layout';
import { patchWorldMaterial } from './shading';

const n = new Simplex2(20260921);
const n2 = new Simplex2(4242);

const bump = (x: number, z: number, c: { x: number; z: number }, r: number, h: number) => {
  const d = Math.hypot(x - c.x, z - c.z) / r;
  if (d >= 1) return 0;
  const t = 1 - d * d;
  return h * t * t;
};

export function jungleFactor(x: number, z: number) {
  const wob = n.noise(x / 90, z / 90) * 38;
  const j = smoothstep(215, 335, x + wob) * (1 - smoothstep(215, 300, z + wob * 0.8));
  return j;
}

/** オルガの広場。木がなく、倒木と若草がある */
export function clearingFactor(x: number, z: number) {
  const d = Math.hypot(x - P.clearing.x, (z - P.clearing.z) * 1.1);
  return 1 - smoothstep(70, 105, d + n.noise(x / 30, z / 30) * 12);
}

export function mudFactor(x: number, z: number) {
  const a = 1 - smoothstep(12, 24, Math.hypot(x - P.mud1.x, z - P.mud1.z) + n.noise(x / 9, z / 9) * 4);
  const b = 1 - smoothstep(8, 17, Math.hypot(x - P.mud2.x, z - P.mud2.z) + n.noise(x / 9 + 5, z / 9) * 3);
  return Math.max(a, b);
}

/** 解析的な高さ（メッシュ生成時のみ使う。実行時は格子から補間する） */
function heightRaw(x: number, z: number): number {
  let h = 9 + 9 * n.fbm(x / 520, z / 520, 4) + 3.2 * n.fbm(x / 150 + 10, z / 150, 3) + 0.6 * n2.fbm(x / 22, z / 22, 2);
  const J = jungleFactor(x, z);
  h += J * (3.5 * n2.ridged(x / 85, z / 85, 3) - 1.5);
  // 丘と台地
  h += bump(x, z, P.startHill, 135, 30);
  h += bump(x, z, { x: -470, z: 470 }, 120, 12);
  h += bump(x, z, P.tower, 70, 12);
  h += bump(x, z, { x: 270, z: -330 }, 300, 24);  // 根の谷の北の高台
  h += bump(x, z, { x: 250, z: -250 }, 150, 10);
  h += bump(x, z, { x: -300, z: -170 }, 170, 10);
  h += bump(x, z, P.nineStones, 70, 6);
  h += bump(x, z, { x: 600, z: 250 }, 220, 22);
  // 野営地の台地（崖の上の平地）
  const dc = Math.hypot(x - P.camp.x, z - P.camp.z);
  h = lerp(h, 17.5, 1 - smoothstep(48, 95, dc));
  // 倒木地帯はなだらかに
  const cf = clearingFactor(x, z);
  h = lerp(h, 12 + 1.5 * n.noise(x / 60, z / 60), cf * 0.75);
  // 地図の外縁は険しい山（自然の境界）
  const e = Math.max(Math.abs(x), Math.abs(z)) + n.noise(x / 160, z / 160) * 50;
  const edge = smoothstep(600, 800, e);
  h += edge * edge * (70 + 45 * n.fbm(x / 260, z / 260, 4) + 40 * n.ridged(x / 200, z / 200, 3));
  // 古い群れの道：何百年も踏まれてできた浅い溝
  const hp = herdLine.nearest(x, z);
  if (hp.dist < 9) h -= 0.8 * Math.pow(1 - hp.dist / 9, 2);
  // 泥地
  const m = mudFactor(x, z);
  h -= m * 1.1;
  // 根の谷
  const rv = ravineLine.nearest(x, z);
  if (rv.dist < 30) {
    const floor = lerp(8.2, -9, smoothstep(160, 300, x)) + n.noise(x / 25, z / 25) * 1.2;
    const t = smoothstep(9, 24, rv.dist + n2.noise(x / 14, z / 14) * 3);
    h = lerp(Math.min(floor, h), h, t);
  }
  // 大河
  const rn = riverLine.nearest(x, z);
  if (rn.dist < 90) {
    const surf = riverSurface(rn.s);
    const w = riverHalfWidth(rn.s, x, z);
    const bed = surf - riverDepth(x, z) - 0.4 * n.noise(x / 12, z / 12);
    const outside = Math.max(h, surf + 1.1);
    // 高台では崖、平地ではゆるい岸
    const bankW = h > surf + 12 ? 6 : 16;
    const t = smoothstep(w * 0.5, w + bankW, rn.dist);
    h = lerp(bed, outside, t);
    if (rn.dist > w) h = Math.max(h, surf + 0.5 + (rn.dist - w) * 0.03);
  }
  return h;
}

export interface TerrainData {
  heights: Float32Array;
  normals: Float32Array;
  res: number;
  cell: number;
}

export class Terrain {
  res = TERRAIN_RES;
  cell = (MAP_HALF * 2) / (TERRAIN_RES - 1);
  heights: Float32Array;
  mesh!: THREE.Mesh;
  dataTex!: THREE.DataTexture; // R=高さ G=草の密度 B=樹海 A=湿り
  grassDensity: Float32Array;
  jungle: Float32Array;
  wet: Float32Array;

  constructor() {
    const N = this.res;
    this.heights = new Float32Array(N * N);
    this.grassDensity = new Float32Array(N * N);
    this.jungle = new Float32Array(N * N);
    this.wet = new Float32Array(N * N);
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const x = -MAP_HALF + i * this.cell, z = -MAP_HALF + j * this.cell;
        this.heights[j * N + i] = heightRaw(x, z);
      }
    }
  }

  /** メッシュの三角形と完全に一致する高さ */
  height(x: number, z: number): number {
    const N = this.res;
    let gx = (x + MAP_HALF) / this.cell, gz = (z + MAP_HALF) / this.cell;
    gx = clamp(gx, 0, N - 1.001); gz = clamp(gz, 0, N - 1.001);
    const i = Math.floor(gx), j = Math.floor(gz);
    const fx = gx - i, fz = gz - j;
    const H = this.heights;
    const a = H[j * N + i], b = H[j * N + i + 1], c = H[(j + 1) * N + i], d = H[(j + 1) * N + i + 1];
    if (fx + fz < 1) return a + (b - a) * fx + (c - a) * fz;
    return d + (c - d) * (1 - fx) + (b - d) * (1 - fz);
  }
  normal(x: number, z: number, out = new THREE.Vector3()) {
    const e = 1.5;
    const hx = this.height(x + e, z) - this.height(x - e, z);
    const hz = this.height(x, z + e) - this.height(x, z - e);
    return out.set(-hx, 2 * e, -hz).normalize();
  }
  slope(x: number, z: number) {
    return Math.acos(this.normal(x, z).y);
  }
  /** 水面の高さ（川の外なら -Infinity） */
  waterLevel(x: number, z: number): number {
    const rn = riverLine.nearest(x, z);
    if (rn.dist < riverHalfWidth(rn.s, x, z) + 6) return riverSurface(rn.s);
    return -Infinity;
  }
  /** 川の流れ（単位 m/s） */
  flow(x: number, z: number): { x: number; z: number } {
    const rn = riverLine.nearest(x, z);
    const w = riverHalfWidth(rn.s, x, z);
    if (rn.dist > w + 4) return { x: 0, z: 0 };
    const fd = Math.hypot(x - P.ford.x, z - P.ford.z);
    const speed = (1 - smoothstep(w * 0.4, w + 4, rn.dist)) * lerp(0.35, 2.1, smoothstep(30, 80, fd));
    return { x: rn.tx * speed, z: rn.tz * speed };
  }
  jungleAt(x: number, z: number) { return jungleFactor(x, z); }
  mudAt(x: number, z: number) { return mudFactor(x, z); }
  clearingAt(x: number, z: number) { return clearingFactor(x, z); }
  grassAt(x: number, z: number) {
    const N = this.res;
    const i = clamp(Math.round((x + MAP_HALF) / this.cell), 0, N - 1), j = clamp(Math.round((z + MAP_HALF) / this.cell), 0, N - 1);
    return this.grassDensity[j * N + i];
  }

  build(): THREE.Mesh {
    const N = this.res;
    const pos = new Float32Array(N * N * 3);
    const nor = new Float32Array(N * N * 3);
    const col = new Float32Array(N * N * 3);
    const H = this.heights;
    const cGrassDry = new THREE.Color(0x9c9150), cGrassGreen = new THREE.Color(0x5f7a37), cGrassGold = new THREE.Color(0xb3a15a);
    const cJungle = new THREE.Color(0x2f3b22), cMoss = new THREE.Color(0x3c5a2c);
    const cRock = new THREE.Color(0x7a6f63), cRockRed = new THREE.Color(0x8a5a44), cSand = new THREE.Color(0xa99a79);
    const cMud = new THREE.Color(0x3b2f24), cPath = new THREE.Color(0x7c6a4c), cBed = new THREE.Color(0x4a4a3c), cSnowRock = new THREE.Color(0x8d8d88);
    const tmp = new THREE.Color();
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const k = j * N + i;
        const x = -MAP_HALF + i * this.cell, z = -MAP_HALF + j * this.cell;
        const h = H[k];
        pos[k * 3] = x; pos[k * 3 + 1] = h; pos[k * 3 + 2] = z;
        const hl = H[j * N + Math.max(0, i - 1)], hr = H[j * N + Math.min(N - 1, i + 1)];
        const hd = H[Math.max(0, j - 1) * N + i], hu = H[Math.min(N - 1, j + 1) * N + i];
        const nx = hl - hr, nz = hd - hu, ny = 2 * this.cell;
        const nl = Math.hypot(nx, ny, nz);
        nor[k * 3] = nx / nl; nor[k * 3 + 1] = ny / nl; nor[k * 3 + 2] = nz / nl;
        const slope = Math.acos(ny / nl);

        // 植生の色
        const J = jungleFactor(x, z);
        const cf = clearingFactor(x, z);
        const dryN = n.fbm(x / 180, z / 180, 3) * 0.5 + 0.5;
        tmp.copy(cGrassGreen).lerp(cGrassDry, smoothstep(0.35, 0.75, dryN));
        tmp.lerp(cGrassGold, smoothstep(0.6, 0.9, n2.noise(x / 70, z / 70) * 0.5 + 0.5) * 0.5);
        tmp.lerp(cJungle, J * (1 - cf * 0.6));
        tmp.lerp(cMoss, J * 0.35 * (n.noise(x / 18, z / 18) * 0.5 + 0.5));
        // 群れの道（踏み固められた土）
        const hp = herdLine.nearest(x, z);
        let path = hp.dist < 6 ? Math.pow(1 - hp.dist / 6, 1.5) * 0.55 : 0;
        tmp.lerp(cPath, path * (1 - J));
        const op = orgaPathLine.nearest(x, z);
        if (op.dist < 7) { const k = Math.pow(1 - op.dist / 7, 1.2) * 0.6; tmp.lerp(cPath, k); path = Math.max(path, k); }
        // 野営地の地面
        const dc = Math.hypot(x - P.camp.x, z - P.camp.z);
        tmp.lerp(cPath, (1 - smoothstep(18, 38, dc)) * 0.6);
        // 水辺
        const rn = riverLine.nearest(x, z);
        let wet = 0;
        if (rn.dist < 70) {
          const surf = riverSurface(rn.s);
          const w = riverHalfWidth(rn.s, x, z);
          const bank = 1 - smoothstep(w, w + 9, rn.dist);
          tmp.lerp(cSand, bank * 0.85);
          if (h < surf - 0.2) tmp.lerp(cBed, 0.8);
          wet = Math.max(wet, 1 - smoothstep(w - 2, w + 14, rn.dist));
        }
        // 泥
        const m = mudFactor(x, z);
        tmp.lerp(cMud, m);
        wet = Math.max(wet, m);
        // 岩肌（斜面）
        const rock = smoothstep(0.55, 0.85, slope + n.noise(x / 10, z / 10) * 0.12);
        const rv = ravineLine.nearest(x, z);
        const red = rv.dist < 40 ? 0.7 : 0.25 + 0.3 * smoothstep(300, 700, Math.abs(z) + Math.abs(x) * 0.5);
        tmp.lerp(tmp.clone().copy(cRock).lerp(cRockRed, red), rock);
        tmp.lerp(cSnowRock, smoothstep(55, 120, h) * 0.6);
        col[k * 3] = tmp.r; col[k * 3 + 1] = tmp.g; col[k * 3 + 2] = tmp.b;

        // 草の密度
        let g = (1 - rock) * (1 - smoothstep(0.18, 0.42, J * (1 - cf))) * (1 - m) * (1 - path * 0.8);
        g *= 1 - (1 - smoothstep(14, 34, dc)) * 0.9;
        if (rn.dist < 60) g *= smoothstep(riverHalfWidth(rn.s, x, z) + 1, riverHalfWidth(rn.s, x, z) + 8, rn.dist);
        g *= 0.65 + 0.35 * smoothstep(-0.3, 0.4, n.noise(x / 40, z / 40));
        g *= 1 - smoothstep(40, 90, h);
        // 柵の内側（野営地）は刈ってある
        const fd = distToSeg(x, z, FENCE.a, FENCE.b);
        if (fd < 3) g *= fd / 3;
        this.grassDensity[k] = clamp(g, 0, 1);
        this.jungle[k] = J * (1 - cf);
        this.wet[k] = wet;
      }
    }
    const idx = new Uint32Array((N - 1) * (N - 1) * 6);
    let p = 0;
    for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
      const a = j * N + i, b = a + 1, c = a + N, d = c + 1;
      idx[p++] = a; idx[p++] = c; idx[p++] = b;
      idx[p++] = b; idx[p++] = c; idx[p++] = d;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeBoundingSphere();

    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94, metalness: 0 });
    patchWorldMaterial(mat, { terrainDetail: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.name = 'terrain';
    this.mesh = mesh;

    // 草のシェーダーが参照するデータテクスチャ
    const data = new Uint16Array(N * N * 4);
    for (let k = 0; k < N * N; k++) {
      data[k * 4] = THREE.DataUtils.toHalfFloat(H[k]);
      data[k * 4 + 1] = THREE.DataUtils.toHalfFloat(this.grassDensity[k]);
      data[k * 4 + 2] = THREE.DataUtils.toHalfFloat(this.jungle[k]);
      data[k * 4 + 3] = THREE.DataUtils.toHalfFloat(this.wet[k]);
    }
    const tex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat, THREE.HalfFloatType);
    tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    this.dataTex = tex;
    return mesh;
  }
}

export function distToSeg(x: number, z: number, a: { x: number; z: number }, b: { x: number; z: number }) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz), 0, 1);
  return Math.hypot(x - (a.x + dx * t), z - (a.z + dz * t));
}
