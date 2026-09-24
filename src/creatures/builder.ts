import * as THREE from 'three';
import { Simplex2, smoothstep, lerp } from '../core/noise';
import { patchWorldMaterial } from '../world/shading';

// 背骨の制御点から胴・首・尾・頭を1本の管として作り、脚と翼を加え、1つのスケルトンで動かす。
// 局所座標：+z が前、+y が上、+x が右。

export interface SpineNode { z: number; y: number; w: number; h: number; belly?: number; top?: number }
export interface LegSpec {
  node: number;          // 付け根の背骨の制御点
  x: number;             // 左右の開き（右脚の値。左は鏡像）
  y?: number; z?: number;
  len: [number, number, number];   // 上腕（大腿）・前腕（下腿）・足
  rad: [number, number, number, number]; // 付け根・膝・足首・つま先の太さ
  angles: [number, number, number];      // 休みの姿勢の角度（x軸回り）
  kind: 'column' | 'digit' | 'arm';      // 柱状（竜脚・長鼻）、趾行（獣脚・鳥）、腕（地面に着かない）
  foot: number;          // 足の平の大きさ（倍率）
}
export interface WingSpec { node: number; x: number; len: [number, number, number, number]; rad: number; bodyFrom: number; bodyTo: number; color: number }
export type Appendage =
  | { t: 'horn'; node: number; pos: [number, number, number]; len: number; rad: number; dir: [number, number, number]; color: number; mirror?: boolean; curve?: number }
  | { t: 'frill'; node: number; pos: [number, number, number]; radius: number; tilt: number; color: number; edge: number; spikes?: number }
  | { t: 'crest'; node: number; pos: [number, number, number]; len: number; height: number; color: number; angle: number }
  | { t: 'sail'; from: number; to: number; height: number; color: number }
  | { t: 'plates'; from: number; to: number; size: number; color: number; kind: 'plate' | 'spike' | 'osteoderm'; rows: number }
  | { t: 'club'; node: number; size: number; color: number }
  | { t: 'feathers'; from: number; to: number; len: number; color: number; spread: number }
  | { t: 'armfeathers'; leg: number; len: number; color: number }
  | { t: 'beak'; node: number; len: number; color: number };

export interface ShapeSpec {
  spine: SpineNode[];
  hip: number;              // ルートにする制御点
  neckBase: number;         // これより前が首・頭
  head: number;             // 頭の制御点
  legs: LegSpec[];          // 右側だけ書く（左右対称に生成）
  wings?: WingSpec;
  jaw?: { len: number; w: number; h: number; color: number };
  eyes: { pos: [number, number, number]; r: number };
  app: Appendage[];
  colors: { back: number; belly: number; pattern: number; type: 'stripes' | 'spots' | 'blotch' | 'bands' | 'none'; scale: number; head?: number };
  skin: { scale: number; bump: number; crease: number };
  roughness: number;
  sheen?: number;           // 羽毛・毛のやわらかい光沢（粗さを上げて色を明るく）
}

export interface BoneDef { name: string; parent: number; pos: THREE.Vector3 }

export interface CreatureTemplate {
  geometry: THREE.BufferGeometry;
  bones: BoneDef[];
  spineBones: number[];      // 制御点 i のボーン番号
  legBones: { upper: number; lower: number; foot: number; side: number; spec: LegSpec; index: number; front: boolean }[];
  wingBones: { bones: number[]; side: number }[];
  headBone: number;
  jawBone: number;
  material: THREE.MeshStandardMaterial;
  spec: ShapeSpec;
  length: number;
  height: number;
  footY: number;             // 休みの姿勢でのつま先の高さ（地面に合わせるため）
}

const noise = new Simplex2(4321);

function catmullNodes(nodes: SpineNode[], per: number) {
  const out: { z: number; y: number; w: number; h: number; belly: number; top: number; u: number }[] = [];
  const get = (i: number) => nodes[Math.max(0, Math.min(nodes.length - 1, i))];
  const cr = (a: number, b: number, c: number, d: number, t: number) =>
    0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let s = 0; s < per; s++) {
      const t = s / per;
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      out.push({
        z: cr(p0.z, p1.z, p2.z, p3.z, t), y: cr(p0.y, p1.y, p2.y, p3.y, t),
        w: Math.max(0.005, cr(p0.w, p1.w, p2.w, p3.w, t)), h: Math.max(0.005, cr(p0.h, p1.h, p2.h, p3.h, t)),
        belly: lerp(p1.belly ?? 0.85, p2.belly ?? 0.85, t), top: lerp(p1.top ?? 1, p2.top ?? 1, t), u: i + t,
      });
    }
  }
  const l = nodes[nodes.length - 1];
  out.push({ z: l.z, y: l.y, w: l.w, h: l.h, belly: l.belly ?? 0.85, top: l.top ?? 1, u: nodes.length - 1 });
  return out;
}

class GeoBuilder {
  pos: number[] = []; nor: number[] = []; col: number[] = []; si: number[] = []; sw: number[] = []; idx: number[] = [];
  vert(p: THREE.Vector3, nrm: THREE.Vector3, c: THREE.Color, bones: number[], weights: number[]) {
    this.pos.push(p.x, p.y, p.z);
    this.nor.push(nrm.x, nrm.y, nrm.z);
    this.col.push(c.r, c.g, c.b);
    const b = [0, 0, 0, 0], w = [0, 0, 0, 0];
    for (let i = 0; i < Math.min(4, bones.length); i++) { b[i] = bones[i]; w[i] = weights[i]; }
    const s = w[0] + w[1] + w[2] + w[3] || 1;
    this.si.push(...b); this.sw.push(w[0] / s, w[1] / s, w[2] / s, w[3] / s);
    return this.pos.length / 3 - 1;
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(this.si, 4));
    g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(this.sw, 4));
    g.setIndex(this.idx);
    g.computeVertexNormals();
    g.computeBoundingSphere();
    return g;
  }
}

interface Ring { c: THREE.Vector3; u: THREE.Vector3; v: THREE.Vector3; rx: number; ry: number; belly: number; top: number; bones: number[]; weights: number[]; colorAt: (a: number) => THREE.Color }

function loft(gb: GeoBuilder, rings: Ring[], seg: number, capStart: boolean, capEnd: boolean) {
  const start = gb.pos.length / 3;
  const tmp = new THREE.Vector3(), nrm = new THREE.Vector3();
  for (const r of rings) {
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      // 腹は平たく、背はわずかに尖らせる
      const yy = sa < 0 ? sa * r.belly : sa * (1 + (r.top - 1) * Math.pow(Math.max(0, sa), 3));
      tmp.copy(r.c).addScaledVector(r.u, ca * r.rx).addScaledVector(r.v, yy * r.ry);
      nrm.copy(r.u).multiplyScalar(ca / r.rx).addScaledVector(r.v, sa / r.ry).normalize();
      gb.vert(tmp, nrm, r.colorAt(a), r.bones, r.weights);
    }
  }
  for (let i = 0; i < rings.length - 1; i++) {
    for (let k = 0; k < seg; k++) {
      const a = start + i * seg + k, b = start + i * seg + ((k + 1) % seg);
      const c = start + (i + 1) * seg + k, d = start + (i + 1) * seg + ((k + 1) % seg);
      gb.idx.push(a, b, c, b, d, c);
    }
  }
  const cap = (ri: number, flip: boolean) => {
    const r = rings[ri];
    const ci = gb.vert(r.c, r.u.clone().cross(r.v).multiplyScalar(flip ? -1 : 1), r.colorAt(Math.PI / 2), r.bones, r.weights);
    for (let k = 0; k < seg; k++) {
      const a = start + ri * seg + k, b = start + ri * seg + ((k + 1) % seg);
      if (flip) gb.idx.push(ci, b, a); else gb.idx.push(ci, a, b);
    }
  };
  if (capStart) cap(0, true);
  if (capEnd) cap(rings.length - 1, false);
}

export function buildTemplate(spec: ShapeSpec): CreatureTemplate {
  const gb = new GeoBuilder();
  const bones: BoneDef[] = [];
  const abs: THREE.Vector3[] = [];
  const S = spec.spine;
  const cBack = new THREE.Color(spec.colors.back), cBelly = new THREE.Color(spec.colors.belly), cPat = new THREE.Color(spec.colors.pattern);
  const cHead = spec.colors.head !== undefined ? new THREE.Color(spec.colors.head) : null;

  // ---- 背骨のボーン（腰がルート。前方へ首・頭、後方へ尾）
  const spineBones: number[] = new Array(S.length);
  const addBone = (name: string, parent: number, p: THREE.Vector3) => {
    const rel = parent >= 0 ? p.clone().sub(abs[parent]) : p.clone();
    bones.push({ name, parent, pos: rel });
    abs.push(p.clone());
    return bones.length - 1;
  };
  spineBones[spec.hip] = addBone('hip', -1, new THREE.Vector3(0, S[spec.hip].y, S[spec.hip].z));
  for (let i = spec.hip + 1; i < S.length; i++) spineBones[i] = addBone('sp' + i, spineBones[i - 1], new THREE.Vector3(0, S[i].y, S[i].z));
  for (let i = spec.hip - 1; i >= 0; i--) spineBones[i] = addBone('sp' + i, spineBones[i + 1], new THREE.Vector3(0, S[i].y, S[i].z));

  // ---- 胴の色
  const patternAt = (z: number, a: number, x: number) => {
    const dorsal = smoothstep(-0.25, 0.65, Math.sin(a));
    const c = cBelly.clone().lerp(cBack, dorsal);
    let p = 0;
    const s = spec.colors.scale;
    if (spec.colors.type === 'stripes') p = smoothstep(0.35, 0.6, Math.sin(z * s + noise.noise(z * 0.3, a) * 1.2)) * dorsal;
    if (spec.colors.type === 'bands') p = smoothstep(0.5, 0.7, Math.sin(z * s)) * smoothstep(0.1, 0.5, Math.sin(a) + 0.4);
    if (spec.colors.type === 'spots') p = smoothstep(0.45, 0.65, noise.noise(z * s, (x + Math.cos(a)) * s * 1.5)) * dorsal;
    if (spec.colors.type === 'blotch') p = smoothstep(0.1, 0.45, noise.noise(z * s * 0.5, Math.cos(a) * 2 + Math.sin(a))) * (0.3 + dorsal * 0.7);
    c.lerp(cPat, p);
    return c;
  };

  // ---- 胴・首・尾・頭の管
  const samples = catmullNodes(S, 5);
  const rings: Ring[] = [];
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const prev = samples[Math.max(0, i - 1)], next = samples[Math.min(samples.length - 1, i + 1)];
    const T = new THREE.Vector3(0, next.y - prev.y, next.z - prev.z).normalize();
    const u = new THREE.Vector3(1, 0, 0);
    const v = new THREE.Vector3().crossVectors(T, u).normalize();
    const i0 = Math.floor(s.u), f = s.u - i0;
    const b0 = spineBones[Math.min(S.length - 1, i0)], b1 = spineBones[Math.min(S.length - 1, i0 + 1)];
    const headness = cHead ? smoothstep(spec.head - 1.2, spec.head - 0.3, s.u) : 0;
    rings.push({
      c: new THREE.Vector3(0, s.y, s.z), u, v, rx: s.w, ry: s.h, belly: s.belly, top: s.top,
      bones: [b0, b1], weights: [1 - f, f],
      colorAt: (a) => { const c = patternAt(s.z, a, 0); if (cHead) c.lerp(cHead, headness); return c; },
    });
  }
  loft(gb, rings, 16, true, true);

  // ---- 脚（左右）
  const legBones: CreatureTemplate['legBones'] = [];
  let footY = Infinity;
  spec.legs.forEach((L, li) => {
    for (const side of [1, -1]) {
      const n = S[L.node];
      const hip = new THREE.Vector3(L.x * side, n.y + (L.y ?? 0), n.z + (L.z ?? 0));
      // 休みの姿勢で関節の位置を求める（x軸回りの回転で前後に曲げる）
      const dirAt = (ang: number) => new THREE.Vector3(0, -Math.cos(ang), Math.sin(ang));
      let acc = L.angles[0];
      const knee = hip.clone().addScaledVector(dirAt(acc), L.len[0]);
      acc += L.angles[1];
      const ankle = knee.clone().addScaledVector(dirAt(acc), L.len[1]);
      acc += L.angles[2];
      const toe = ankle.clone().addScaledVector(dirAt(acc), L.len[2]);
      if (L.kind !== 'arm') footY = Math.min(footY, toe.y - L.rad[3] * 0.6);
      const parent = spineBones[L.node];
      const bU = addBone(`leg${li}${side > 0 ? 'R' : 'L'}0`, parent, hip);
      const bL = addBone(`leg${li}${side > 0 ? 'R' : 'L'}1`, bU, knee);
      const bF = addBone(`leg${li}${side > 0 ? 'R' : 'L'}2`, bL, ankle);
      legBones.push({ upper: bU, lower: bL, foot: bF, side, spec: L, index: li, front: L.node > spec.hip });
      const pts = [hip, knee, ankle, toe];
      const rad = L.rad;
      const lr: Ring[] = [];
      const per = 4;
      for (let sgi = 0; sgi < 3; sgi++) {
        for (let s = 0; s < per + (sgi === 2 ? 1 : 0); s++) {
          const t = s / per;
          const a = pts[sgi], b = pts[sgi + 1];
          const c = a.clone().lerp(b, t);
          const T = b.clone().sub(a).normalize();
          const u = new THREE.Vector3(1, 0, 0);
          const v = new THREE.Vector3().crossVectors(T, u).normalize();
          let r = lerp(rad[sgi], rad[sgi + 1], t);
          // 太ももの筋肉のふくらみ
          if (sgi === 0) r *= 1 + 0.25 * Math.sin(t * Math.PI);
          if (sgi === 2 && L.kind !== 'arm') r *= lerp(1, L.foot, t);
          const bn = [bU, bL, bF][sgi], bn2 = [bL, bF, bF][sgi];
          const wt = sgi < 2 ? smoothstep(0.55, 1.0, t) * 0.5 : 0;
          const zz = c.z;
          lr.push({
            c, u, v, rx: r * (sgi === 2 && L.kind === 'column' ? 1.15 : 1), ry: r * (sgi === 2 ? 0.8 : 1), belly: 1, top: 1,
            bones: [bn, bn2], weights: [1 - wt, wt],
            colorAt: (a) => patternAt(zz, a * 0.5 + 0.8, 0).lerp(cBack, 0.3).multiplyScalar(0.92 - sgi * 0.05),
          });
        }
      }
      // 胴にめり込ませる付け根
      const root = lr[0];
      lr.unshift({ ...root, c: root.c.clone().add(new THREE.Vector3(-side * rad[0] * 0.6, rad[0] * 0.6, 0)), rx: rad[0] * 1.1, ry: rad[0] * 1.1, bones: [parent], weights: [1] });
      loft(gb, lr, 10, false, true);
    }
  });

  // ---- 翼（翼竜）：腕の骨の連なりと胴の間に膜を張る
  const wingBones: CreatureTemplate['wingBones'] = [];
  if (spec.wings) {
    const W = spec.wings;
    for (const side of [1, -1]) {
      const n = S[W.node];
      let p = new THREE.Vector3(W.x * side, n.y, n.z);
      const parent = spineBones[W.node];
      const chain: number[] = [];
      const pts: THREE.Vector3[] = [p.clone()];
      // 休みの姿勢は翼を広げた状態（滑空の形）。地上ではアニメーションで折りたたむ
      const dirs = [new THREE.Vector3(side, 0.05, 0.25), new THREE.Vector3(side, -0.02, 0.15), new THREE.Vector3(side, 0, 0.1), new THREE.Vector3(side, 0, -0.35)];
      let par = parent;
      for (let k = 0; k < 4; k++) {
        const b = addBone(`wing${side > 0 ? 'R' : 'L'}${k}`, par, p);
        chain.push(b); par = b;
        p = p.clone().addScaledVector(dirs[k].normalize(), W.len[k]);
        pts.push(p.clone());
      }
      const tipB = addBone(`wing${side > 0 ? 'R' : 'L'}tip`, par, p);
      chain.push(tipB);
      wingBones.push({ bones: chain, side });
      // 腕の太さ
      const ar: Ring[] = [];
      for (let k = 0; k < 4; k++) {
        const a = pts[k], b = pts[k + 1];
        const T = b.clone().sub(a).normalize();
        const u = new THREE.Vector3(0, 1, 0);
        const v = new THREE.Vector3().crossVectors(T, u).normalize();
        const r = W.rad * (1 - k * 0.22);
        ar.push({ c: a, u, v, rx: r, ry: r, belly: 1, top: 1, bones: [chain[k]], weights: [1], colorAt: () => cBack.clone().multiplyScalar(0.8) });
        if (k === 3) ar.push({ c: b, u, v, rx: r * 0.3, ry: r * 0.3, belly: 1, top: 1, bones: [chain[4]], weights: [1], colorAt: () => cBack.clone() });
      }
      loft(gb, ar, 6, false, true);
      // 膜：外縁は腕、内縁は胴の側面（bodyFrom〜bodyTo の制御点）
      const cols = 10;
      const mem = new THREE.Color(W.color);
      const rowsPer = 2;
      const memV: { p: THREE.Vector3; c: THREE.Color; b: number[]; w: number[] }[] = [];
      for (let c = 0; c <= cols; c++) {
        const t = c / cols;
        // 外縁：腕の各点を t に沿って補間（肩→翼端）
        const ft = t * 4;
        const k = Math.min(3, Math.floor(ft)), f = ft - k;
        const outer = pts[k].clone().lerp(pts[k + 1], f);
        const ob = [chain[k], chain[Math.min(4, k + 1)]], ow = [1 - f, f];
        // 内縁：胴の側面（後ろへ向かって）→翼端に近いほど外縁に寄る
        const bu = lerp(W.node, W.bodyFrom, Math.min(1, t * 1.5));
        const bi = Math.floor(bu), bf = bu - bi;
        const na = S[Math.max(0, Math.min(S.length - 1, bi))], nb = S[Math.max(0, Math.min(S.length - 1, bi + 1))];
        const inner = new THREE.Vector3(side * lerp(na.w, nb.w, bf) * 0.8, lerp(na.y, nb.y, bf), lerp(na.z, nb.z, bf));
        inner.lerp(outer, smoothstep(0.75, 1, t));
        const ib = [spineBones[Math.max(0, Math.min(S.length - 1, bi))], spineBones[Math.max(0, Math.min(S.length - 1, bi + 1))]];
        for (let r = 0; r <= rowsPer; r++) {
          const rt = r / rowsPer;
          const pp = outer.clone().lerp(inner, rt);
          pp.y -= Math.sin(rt * Math.PI) * 0.04 * W.len[3]; // 膜のたわみ
          const bb = rt < 0.5 ? ob : ib, ww = rt < 0.5 ? ow : [1 - bf, bf];
          const shade = mem.clone().multiplyScalar(0.85 + 0.25 * Math.sin(t * 9) * 0.3);
          memV.push({ p: pp, c: shade, b: bb, w: ww });
        }
      }
      for (const face of [1, -1]) {
        const start = gb.pos.length / 3;
        for (const m of memV) gb.vert(m.p, new THREE.Vector3(0, face, 0), face > 0 ? m.c : m.c.clone().multiplyScalar(0.8), m.b, m.w);
        for (let c = 0; c < cols; c++) for (let r = 0; r < rowsPer; r++) {
          const a = start + c * (rowsPer + 1) + r, b = a + 1, cc = a + rowsPer + 1, d = cc + 1;
          if (side * face > 0) gb.idx.push(a, b, cc, b, d, cc); else gb.idx.push(a, cc, b, b, cc, d);
        }
      }
    }
  }

  // ---- 付属物（ボーンの子として付ける）
  const appendages: { bone: number; mesh: THREE.Mesh; double?: boolean }[] = [];
  const mkMat = (c: number, rough = 0.6) => { const m = new THREE.MeshStandardMaterial({ color: c, roughness: rough }); patchWorldMaterial(m, { skin: { scale: 0.12, bump: 0.8, crease: 0.2 } }); return m; };
  const at = (node: number, p: [number, number, number]) => new THREE.Vector3(p[0], S[node].y + p[1], S[node].z + p[2]).sub(abs[spineBones[node]]);
  const headBone = spineBones[spec.head];
  let jawBone = -1;
  for (const a of spec.app) {
    if (a.t === 'horn') {
      const sides = a.mirror ? [1, -1] : [1];
      for (const sd of sides) {
        const geo = new THREE.ConeGeometry(a.rad, a.len, 10, 4);
        geo.translate(0, a.len / 2, 0);
        if (a.curve) {
          const p = geo.getAttribute('position') as THREE.BufferAttribute;
          for (let i = 0; i < p.count; i++) { const y = p.getY(i) / a.len; p.setZ(i, p.getZ(i) + a.curve * y * y * a.len); }
          geo.computeVertexNormals();
        }
        const m = new THREE.Mesh(geo, mkMat(a.color, 0.45));
        m.position.copy(at(a.node, [a.pos[0] * sd, a.pos[1], a.pos[2]]));
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(a.dir[0] * sd, a.dir[1], a.dir[2]).normalize());
        m.castShadow = true;
        appendages.push({ bone: spineBones[a.node], mesh: m });
      }
    } else if (a.t === 'frill') {
      const geo = new THREE.CircleGeometry(a.radius, 28, Math.PI * 0.05, Math.PI * 0.9);
      // 縁の突起
      const p = geo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 1; i < p.count; i++) {
        const ang = Math.atan2(p.getY(i), p.getX(i));
        const bump = a.spikes ? 1 + 0.12 * Math.max(0, Math.sin(ang * a.spikes)) : 1;
        p.setXYZ(i, p.getX(i) * bump, p.getY(i) * bump, -Math.pow(Math.hypot(p.getX(i), p.getY(i)) / a.radius, 2) * a.radius * 0.08);
      }
      geo.computeVertexNormals();
      const cols = new Float32Array(p.count * 3);
      const c1 = new THREE.Color(a.color), c2 = new THREE.Color(a.edge);
      for (let i = 0; i < p.count; i++) { const d = Math.hypot(p.getX(i), p.getY(i)) / a.radius; const c = c1.clone().lerp(c2, smoothstep(0.55, 0.95, d)); cols.set([c.r, c.g, c.b], i * 3); }
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, side: THREE.DoubleSide });
      patchWorldMaterial(mat, { skin: { scale: 0.14, bump: 0.9, crease: 0.3 } });
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(at(a.node, a.pos));
      m.rotation.x = a.tilt;
      appendages.push({ bone: spineBones[a.node], mesh: m, double: true });
    } else if (a.t === 'crest') {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0); shape.quadraticCurveTo(a.len * 0.3, a.height * 1.2, a.len, a.height * 0.2); shape.lineTo(a.len * 0.9, 0); shape.lineTo(0, 0);
      const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.04 * a.height + 0.02, bevelEnabled: false });
      geo.translate(0, 0, -(0.02 * a.height + 0.01));
      geo.rotateY(-Math.PI / 2);
      const m = new THREE.Mesh(geo, mkMat(a.color, 0.5));
      m.position.copy(at(a.node, a.pos));
      m.rotation.x = a.angle;
      appendages.push({ bone: spineBones[a.node], mesh: m, double: true });
    } else if (a.t === 'sail') {
      for (let i = a.from; i < a.to; i++) {
        const n0 = S[i], n1 = S[i + 1];
        const mid = (i + 0.5 - a.from) / (a.to - a.from);
        const h0 = a.height * Math.sin(((i - a.from) / (a.to - a.from)) * Math.PI) + 0.1, h1 = a.height * Math.sin(((i + 1 - a.from) / (a.to - a.from)) * Math.PI) + 0.1;
        const geo = new THREE.BufferGeometry();
        const dz = n1.z - n0.z, dy = n1.y - n0.y;
        const v = [0, n0.h * 0.8, 0, 0, n0.h * 0.8 + h0, 0, 0, n1.h * 0.8 + dy + h1, dz, 0, n1.h * 0.8 + dy, dz];
        geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
        geo.setIndex([0, 1, 2, 0, 2, 3]);
        geo.computeVertexNormals();
        const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(a.color).offsetHSL(0, 0, Math.sin(mid * 20) * 0.05), roughness: 0.6, side: THREE.DoubleSide });
        patchWorldMaterial(mat);
        const m = new THREE.Mesh(geo, mat);
        appendages.push({ bone: spineBones[i], mesh: m, double: true });
      }
    } else if (a.t === 'plates') {
      for (let i = a.from; i <= a.to; i++) {
        const n0 = S[i];
        for (let r = 0; r < a.rows; r++) {
          const sideAng = a.rows === 1 ? 0 : (r / (a.rows - 1) - 0.5) * 2.2;
          const size = a.size * (0.6 + 0.4 * Math.sin(((i - a.from + 0.5) / (a.to - a.from + 1)) * Math.PI));
          let geo: THREE.BufferGeometry;
          if (a.kind === 'plate') { geo = new THREE.ConeGeometry(size * 0.5, size, 4, 1); geo.scale(0.25, 1, 1); }
          else if (a.kind === 'spike') geo = new THREE.ConeGeometry(size * 0.18, size, 7, 1);
          else { geo = new THREE.SphereGeometry(size * 0.4, 7, 5); geo.scale(1, 0.55, 1.2); }
          geo.translate(0, size * 0.45, 0);
          const m = new THREE.Mesh(geo, mkMat(a.color, 0.55));
          const px = Math.sin(sideAng) * n0.w, py = Math.cos(sideAng) * n0.h * (n0.top ?? 1);
          m.position.copy(at(i, [px, py * 0.95, 0]));
          m.rotation.z = -sideAng;
          m.castShadow = true;
          appendages.push({ bone: spineBones[i], mesh: m });
        }
      }
    } else if (a.t === 'club') {
      const geo = new THREE.SphereGeometry(a.size, 12, 8);
      geo.scale(1.4, 0.7, 1);
      const m = new THREE.Mesh(geo, mkMat(a.color, 0.5));
      m.position.copy(at(a.node, [0, 0, 0]));
      m.castShadow = true;
      appendages.push({ bone: spineBones[a.node], mesh: m });
    } else if (a.t === 'feathers') {
      for (let i = a.from; i <= a.to; i++) {
        const n0 = S[i];
        for (let k = 0; k < 5; k++) {
          const ang = (k / 4 - 0.5) * a.spread;
          const geo = new THREE.ConeGeometry(a.len * 0.12, a.len, 4, 1);
          geo.scale(1, 1, 0.25);
          geo.translate(0, a.len * 0.5, 0);
          const m = new THREE.Mesh(geo, mkMat(new THREE.Color(a.color).offsetHSL(0, 0, (k % 2) * 0.05).getHex(), 0.85));
          m.position.copy(at(i, [Math.sin(ang) * n0.w, Math.cos(ang) * n0.h * 0.9, 0]));
          m.rotation.set(-1.2, 0, -ang * 0.8);
          m.castShadow = true;
          appendages.push({ bone: spineBones[i], mesh: m });
        }
      }
    } else if (a.t === 'armfeathers') {
      for (const lb of legBones.filter((l) => l.index === a.leg)) {
        for (let k = 0; k < 4; k++) {
          const geo = new THREE.PlaneGeometry(a.len * 0.35, a.len);
          geo.translate(0, -a.len * 0.5, 0);
          const mat = new THREE.MeshStandardMaterial({ color: a.color, roughness: 0.85, side: THREE.DoubleSide });
          patchWorldMaterial(mat);
          const m = new THREE.Mesh(geo, mat);
          m.position.set(lb.side * 0.02, 0, -k * a.len * 0.18);
          m.rotation.set(0.5 + k * 0.1, lb.side * 1.3, 0);
          appendages.push({ bone: k < 2 ? lb.lower : lb.foot, mesh: m, double: true });
        }
      }
    } else if (a.t === 'beak') {
      const geo = new THREE.ConeGeometry(S[a.node].w * 0.9, a.len, 8, 1);
      geo.rotateX(Math.PI / 2);
      geo.scale(0.8, 1.1, 1);
      geo.translate(0, 0, a.len / 2);
      const m = new THREE.Mesh(geo, mkMat(a.color, 0.4));
      m.position.copy(at(a.node, [0, 0, 0]));
      m.castShadow = true;
      appendages.push({ bone: spineBones[a.node], mesh: m });
    }
  }
  // 眼（生き物らしさの要：濡れた光沢）
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a120a, roughness: 0.08, metalness: 0.1 });
  for (const sd of [1, -1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(spec.eyes.r, 10, 8), eyeMat);
    e.position.copy(at(spec.head, [spec.eyes.pos[0] * sd, spec.eyes.pos[1], spec.eyes.pos[2]]));
    appendages.push({ bone: headBone, mesh: e });
  }
  // 下顎
  if (spec.jaw) {
    const J = spec.jaw;
    const geo = new THREE.ConeGeometry(J.w, J.len, 8, 2);
    geo.rotateX(Math.PI / 2);
    geo.scale(1, J.h / J.w, 1);
    geo.translate(0, 0, J.len / 2);
    const m = new THREE.Mesh(geo, mkMat(J.color, 0.6));
    const hinge = new THREE.Vector3(0, S[spec.head].y - S[spec.head].h * 0.55, S[spec.head].z - J.len * 0.35);
    jawBone = addBone('jaw', headBone, hinge);
    appendages.push({ bone: jawBone, mesh: m });
  }
  // 付属物をスキンメッシュの頂点として焼き込む（描画回数を増やさない）
  const tmpM = new THREE.Matrix4();
  for (const a of appendages) {
    const m = a.mesh;
    m.updateMatrix();
    let g = m.geometry.clone();
    if (!g.index) { const cnt = g.getAttribute('position').count; g.setIndex([...Array(cnt).keys()]); }
    g.computeVertexNormals();
    tmpM.makeTranslation(abs[a.bone].x, abs[a.bone].y, abs[a.bone].z).multiply(m.matrix);
    g.applyMatrix4(tmpM);
    const P = g.getAttribute('position') as THREE.BufferAttribute;
    const N = g.getAttribute('normal') as THREE.BufferAttribute;
    const C = g.getAttribute('color') as THREE.BufferAttribute | undefined;
    const base = (m.material as THREE.MeshStandardMaterial).color ?? new THREE.Color(1, 1, 1);
    const idx = g.index!.array;
    for (const face of a.double ? [1, -1] : [1]) {
      const start = gb.pos.length / 3;
      for (let i = 0; i < P.count; i++) {
        const c = C ? new THREE.Color(C.getX(i), C.getY(i), C.getZ(i)) : base.clone();
        gb.vert(new THREE.Vector3(P.getX(i), P.getY(i), P.getZ(i)), new THREE.Vector3(N.getX(i), N.getY(i), N.getZ(i)).multiplyScalar(face), face > 0 ? c : c.multiplyScalar(0.85), [a.bone], [1]);
      }
      for (let i = 0; i < idx.length; i += 3) {
        if (face > 0) gb.idx.push(start + idx[i], start + idx[i + 1], start + idx[i + 2]);
        else gb.idx.push(start + idx[i], start + idx[i + 2], start + idx[i + 1]);
      }
    }
  }
  const geometry = gb.build();


  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: spec.roughness, metalness: 0 });
  patchWorldMaterial(material, { skin: spec.skin });
  const zs = S.map((s) => s.z);
  const length = Math.max(...zs) - Math.min(...zs);
  const height = Math.max(...S.map((s) => s.y + s.h));
  if (!isFinite(footY)) footY = 0;
  return { geometry, bones, spineBones, legBones, wingBones, headBone, jawBone, material, spec, length, height, footY };
}

export interface CreatureRig {
  root: THREE.Group;
  mesh: THREE.SkinnedMesh;
  bones: THREE.Bone[];
  jaw: THREE.Object3D | null;
  template: CreatureTemplate;
  material: THREE.MeshStandardMaterial;
}

/** テンプレートから個体を作る。ジオメトリは共有し、スケルトンとマテリアルは個体ごと */
export function instantiate(t: CreatureTemplate, tint: THREE.Color | null): CreatureRig {
  const bones = t.bones.map((b) => { const bone = new THREE.Bone(); bone.name = b.name; bone.position.copy(b.pos); return bone; });
  t.bones.forEach((b, i) => { if (b.parent >= 0) bones[b.parent].add(bones[i]); });
  const material = tint ? t.material.clone() : t.material;
  if (tint) {
    material.color.copy(tint);
    // clone() はシェーダーの差し替えを引き継がないので、同じ関数を付け直す（プログラムは共有される）
    material.onBeforeCompile = t.material.onBeforeCompile;
    material.customProgramCacheKey = t.material.customProgramCacheKey;
  }
  const mesh = new THREE.SkinnedMesh(t.geometry, material);
  mesh.add(bones[0]);
  mesh.bind(new THREE.Skeleton(bones));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  const jaw: THREE.Object3D | null = t.jawBone >= 0 ? bones[t.jawBone] : null;
  const root = new THREE.Group();
  root.add(mesh);
  return { root, mesh, bones, jaw, template: t, material };
}
