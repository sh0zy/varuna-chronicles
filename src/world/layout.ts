// 垂直スライス区域の配置。地形・植生・生物・クエストがすべてここを参照する。
// 座標：x=東、z=南、y=上（単位はメートル）。北は -z。

export const MAP_HALF = 800;
export const TERRAIN_RES = 401; // 頂点数（1辺）。4m間隔

export type V2 = { x: number; z: number };

export const P = {
  startHill: { x: -575, z: 290 },     // 渡りの丘（開始地点）
  camp: { x: -178, z: 22 },           // 大河の曲がりの野営地（拠点）
  campView: { x: -150, z: 40 },       // 野営地の崖の縁（V2）
  tower: { x: 250, z: -118 },         // 共振の見張り塔（小遺跡）
  clearing: { x: 425, z: 45 },        // オルガの倒木地帯
  mud1: { x: 352, z: 138 },
  mud2: { x: 470, z: 118 },
  grove: { x: 296, z: 252 },          // 幼体を避難させる茂み
  ford: { x: -2, z: 318 },            // 浅瀬の渡し
  bridgeTree: { x: 440, z: -214 },    // 倒れると根の谷に橋が架かる巨木
  jadeGate: { x: 468, z: -345 },      // 翡翠の門
  rootTunnel: { x: 520, z: -430 },    // 根の地下道の入口（スライスの範囲の終わり）
  nineStones: { x: -330, z: -330 },   // 九本石
  fossilSlab: { x: -420, z: -40 },    // 古い群れの道の足跡化石
  sandbank: { x: -95, z: 150 },       // ヒメヨロイの産卵する砂州
  thornThicket: { x: -236, z: 130 },  // 増えすぎた棘の低木
  jadeEdge: { x: 330, z: -30 },       // 翡翠の縁（光の柱が見える）
} as const;

/** 大河の制御点（北から南へ） */
export const RIVER_CTRL: V2[] = [
  { x: 10, z: -840 }, { x: 60, z: -600 }, { x: 128, z: -380 }, { x: 118, z: -210 },
  { x: 40, z: -60 }, { x: -70, z: 25 }, { x: -112, z: 92 }, { x: -86, z: 190 },
  { x: -20, z: 300 }, { x: 60, z: 420 }, { x: 110, z: 600 }, { x: 80, z: 840 },
];

/** 根の谷（樹海を南北に分ける裂け目）。西端は大河の崖に落ちる */
export const RAVINE: V2[] = [
  { x: 150, z: -262 }, { x: 260, z: -238 }, { x: 360, z: -232 }, { x: 440, z: -238 },
  { x: 540, z: -228 }, { x: 650, z: -250 }, { x: 820, z: -240 },
];

/** ソラクビの群れの移動路（ループ）。解決後は東へ延びる */
export const HERD_ROUTE: V2[] = [
  { x: -640, z: -520 }, { x: -470, z: -250 }, { x: -430, z: 20 }, { x: -470, z: 250 },
  { x: -380, z: 470 }, { x: -560, z: 600 }, { x: -700, z: 420 }, { x: -700, z: 0 }, { x: -720, z: -330 },
];
export const HERD_ROUTE_OPEN: V2[] = [
  { x: -640, z: -520 }, { x: -470, z: -250 }, { x: -430, z: 20 }, { x: -380, z: 250 },
  { x: -160, z: 330 }, { x: -10, z: 330 }, { x: 170, z: 300 }, { x: 330, z: 190 }, { x: 420, z: 60 },
  { x: 330, z: 200 }, { x: 120, z: 340 }, { x: -120, z: 380 }, { x: -380, z: 470 }, { x: -700, z: 420 }, { x: -720, z: -330 },
];

/** 翠角竜の古い移動路（倒木地帯から根の谷へ）。巨木が生えず、地面が踏み固められている */
export const ORGA_PATH: V2[] = [
  { x: 425, z: 40 }, { x: 418, z: -30 }, { x: 432, z: -95 }, { x: 428, z: -150 }, { x: 440, z: -198 },
];

/** ヒメヨロイの繁殖路（南西の草地から砂州へ）。柵がこれを断っている */
export const HIMEYOROI_ROUTE: V2[] = [
  { x: -420, z: 300 }, { x: -320, z: 230 }, { x: -240, z: 170 }, { x: -170, z: 150 }, { x: -110, z: 150 },
];

/** 野営地の柵（肉食獣よけ）。p0→p1 */
export const FENCE = { a: { x: -268, z: 118 }, b: { x: -186, z: 208 }, gap: { x: -226, z: 164 } };

/** オルガの広場を囲む巨木（突進を受け止める） */
export const ARENA_TREES: V2[] = [
  { x: 380, z: -8 }, { x: 468, z: -2 }, { x: 492, z: 62 }, { x: 452, z: 104 },
  { x: 390, z: 96 }, { x: 358, z: 44 }, { x: 452, z: 28 }, { x: 430, z: 78 },
];

export function catmull(points: V2[], samplesPerSeg: number, closed = false): V2[] {
  const out: V2[] = [];
  const n = points.length;
  const get = (i: number) => {
    if (closed) return points[((i % n) + n) % n];
    return points[Math.max(0, Math.min(n - 1, i))];
  };
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    for (let s = 0; s < samplesPerSeg; s++) {
      const t = s / samplesPerSeg, t2 = t * t, t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        z: 0.5 * (2 * p1.z + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3),
      });
    }
  }
  if (!closed) out.push(points[n - 1]);
  return out;
}

/** 折れ線への最近点。s=始点からの距離 */
export class Polyline {
  pts: V2[];
  cum: number[];
  length: number;
  private grid = new Map<number, number[]>();
  private cell: number;
  constructor(pts: V2[], cell = 40) {
    this.pts = pts;
    this.cell = cell;
    this.cum = [0];
    for (let i = 1; i < pts.length; i++) this.cum.push(this.cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z));
    this.length = this.cum[this.cum.length - 1];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const x0 = Math.floor(Math.min(a.x, b.x) / cell) - 2, x1 = Math.floor(Math.max(a.x, b.x) / cell) + 2;
      const z0 = Math.floor(Math.min(a.z, b.z) / cell) - 2, z1 = Math.floor(Math.max(a.z, b.z) / cell) + 2;
      for (let gx = x0; gx <= x1; gx++) for (let gz = z0; gz <= z1; gz++) {
        const k = gx * 100003 + gz;
        let l = this.grid.get(k);
        if (!l) this.grid.set(k, (l = []));
        l.push(i);
      }
    }
  }
  /** 近い線分がなければ dist=Infinity。maxCells の範囲外は探さない（高速化） */
  nearest(x: number, z: number): { dist: number; s: number; tx: number; tz: number; side: number } {
    const gx = Math.floor(x / this.cell), gz = Math.floor(z / this.cell);
    const list = this.grid.get(gx * 100003 + gz);
    let best = Infinity, bs = 0, btx = 1, btz = 0, side = 0;
    if (!list) return { dist: Infinity, s: 0, tx: 1, tz: 0, side: 0 };
    for (const i of list) {
      const a = this.pts[i], b = this.pts[i + 1];
      const dx = b.x - a.x, dz = b.z - a.z;
      const l2 = dx * dx + dz * dz || 1;
      let t = ((x - a.x) * dx + (z - a.z) * dz) / l2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const px = a.x + dx * t, pz = a.z + dz * t;
      const d = Math.hypot(x - px, z - pz);
      if (d < best) {
        best = d; bs = this.cum[i] + Math.sqrt(l2) * t;
        const l = Math.sqrt(l2); btx = dx / l; btz = dz / l;
        side = Math.sign(dx * (z - a.z) - dz * (x - a.x));
      }
    }
    return { dist: best, s: bs, tx: btx, tz: btz, side };
  }
  pointAt(s: number): V2 {
    s = Math.max(0, Math.min(this.length, s));
    let lo = 0, hi = this.cum.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (this.cum[m] <= s) lo = m; else hi = m; }
    const seg = this.cum[hi] - this.cum[lo] || 1;
    const t = (s - this.cum[lo]) / seg;
    const a = this.pts[lo], b = this.pts[hi];
    return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
  }
}

export const riverLine = new Polyline(catmull(RIVER_CTRL, 16), 48);
export const ravineLine = new Polyline(catmull(RAVINE, 12), 48);
export const herdLine = new Polyline(catmull(HERD_ROUTE, 14, true), 60);
export const orgaPathLine = new Polyline(catmull(ORGA_PATH, 8), 40);

/** 川の水面の高さ（上流ほど高い） */
export const riverSurface = (s: number) => 7.5 - s * 0.0036;
/** 川の半幅。浅瀬の渡しでは広く浅い */
export function riverHalfWidth(s: number, x: number, z: number) {
  const fd = Math.hypot(x - P.ford.x, z - P.ford.z);
  const ford = Math.max(0, 1 - fd / 70);
  const base = 16 + 6 * Math.sin(s * 0.004) + 4 * Math.sin(s * 0.011);
  return base + ford * 14;
}
export function riverDepth(x: number, z: number) {
  const fd = Math.hypot(x - P.ford.x, z - P.ford.z);
  const ford = Math.max(0, 1 - fd / 60);
  return 3.2 * (1 - ford) + 0.55 * ford;
}
