// 静的な円柱の当たり判定（幹・岩・建物）。空間ハッシュで近傍だけを調べる。

export interface Collider { x: number; z: number; r: number; top: number; id?: string; active: boolean; kind: 'tree' | 'rock' | 'struct' }

export class ColliderWorld {
  private cell = 16;
  private map = new Map<number, Collider[]>();
  all: Collider[] = [];

  private key(gx: number, gz: number) { return gx * 73856093 ^ gz * 19349663; }
  add(c: Collider) {
    this.all.push(c);
    const g0 = Math.floor((c.x - c.r) / this.cell), g1 = Math.floor((c.x + c.r) / this.cell);
    const h0 = Math.floor((c.z - c.r) / this.cell), h1 = Math.floor((c.z + c.r) / this.cell);
    for (let gx = g0; gx <= g1; gx++) for (let gz = h0; gz <= h1; gz++) {
      const k = this.key(gx, gz);
      let l = this.map.get(k);
      if (!l) this.map.set(k, (l = []));
      l.push(c);
    }
    return c;
  }
  query(x: number, z: number, r: number, out: Collider[] = []): Collider[] {
    out.length = 0;
    const g0 = Math.floor((x - r) / this.cell), g1 = Math.floor((x + r) / this.cell);
    const h0 = Math.floor((z - r) / this.cell), h1 = Math.floor((z + r) / this.cell);
    for (let gx = g0; gx <= g1; gx++) for (let gz = h0; gz <= h1; gz++) {
      const l = this.map.get(this.key(gx, gz));
      if (!l) continue;
      for (const c of l) if (c.active && !out.includes(c)) out.push(c);
    }
    return out;
  }
  /** 円 (x,z,r) を押し出す。y が柱の上端より上なら無視 */
  resolve(p: { x: number; z: number }, r: number, y = 0): boolean {
    const list = this.query(p.x, p.z, r + 4, this.tmp);
    let hit = false;
    for (const c of list) {
      if (y > c.top) continue;
      const dx = p.x - c.x, dz = p.z - c.z;
      const d = Math.hypot(dx, dz);
      const m = c.r + r;
      if (d < m && d > 1e-4) { p.x = c.x + (dx / d) * m; p.z = c.z + (dz / d) * m; hit = true; }
    }
    return hit;
  }
  /** 直線 a→b 上で最初に当たる柱 */
  raycast(ax: number, az: number, bx: number, bz: number, r: number, filter?: (c: Collider) => boolean): Collider | null {
    const dx = bx - ax, dz = bz - az;
    const len = Math.hypot(dx, dz);
    const steps = Math.ceil(len / 4);
    let best: Collider | null = null, bestT = Infinity;
    const seen = new Set<Collider>();
    for (let i = 0; i <= steps; i++) {
      const t = i / Math.max(1, steps);
      for (const c of this.query(ax + dx * t, az + dz * t, r + 4, this.tmp)) {
        if (seen.has(c) || (filter && !filter(c))) continue;
        seen.add(c);
        // 円との交差
        const fx = ax - c.x, fz = az - c.z;
        const A = dx * dx + dz * dz, B = 2 * (fx * dx + fz * dz), C = fx * fx + fz * fz - (c.r + r) * (c.r + r);
        const disc = B * B - 4 * A * C;
        if (disc < 0) continue;
        const tt = (-B - Math.sqrt(disc)) / (2 * A);
        if (tt >= 0 && tt <= 1 && tt < bestT) { bestT = tt; best = c; }
      }
    }
    return best;
  }
  private tmp: Collider[] = [];
}
