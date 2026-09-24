// アイコン（PNG）を外部ライブラリなしで生成する。環の意匠：深い森の地に、金の環。
import zlib from 'node:zlib';
import fs from 'node:fs';

const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; }
  return t;
})();
const crc32 = (buf) => { let c = -1; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function png(size, draw) {
  const px = Buffer.alloc(size * size * 4);
  draw((x, y, r, g, b, a = 255) => { const i = (y * size + x) * 4; px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = a; });
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) { raw[y * (size * 4 + 1)] = 0; px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4); }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
function icon(size, padding) {
  return png(size, (set) => {
    const c = (size - 1) / 2;
    const R = (size / 2) * (1 - padding);       // 環の外側
    const W = size * 0.085;                      // 環の太さ
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const dx = x - c, dy = y - c;
      const d = Math.hypot(dx, dy);
      // 地：上が明るい深緑、下は暗く
      let col = mix([23, 40, 32], [10, 16, 13], y / size);
      // 環（節のある山並みのように、わずかに太さが揺れる）
      const ang = Math.atan2(dy, dx);
      const w = W * (0.82 + 0.18 * Math.abs(Math.sin(ang * 9)));
      const edge = Math.abs(d - (R - W));
      if (edge < w / 2) {
        const t = 1 - edge / (w / 2);
        const gold = mix([154, 126, 66], [244, 214, 140], Math.min(1, t * 1.3));
        col = mix(col, gold, Math.min(1, t * 2.2));
      }
      // 環の内側の淡い霧
      if (d < R - W) col = mix(col, [58, 74, 62], Math.max(0, 0.35 - d / (R * 2.2)));
      // 外側は透明に（角は丸く）
      const a = d > R ? 0 : 255;
      set(x, y, col[0], col[1], col[2], a);
    }
  });
}
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/icon-192.png', icon(192, 0.04));
fs.writeFileSync('public/icon-512.png', icon(512, 0.04));
fs.writeFileSync('public/icon-maskable-512.png', icon(512, 0.18)); // 余白を多めに（丸く切り抜かれても欠けない）
fs.writeFileSync('public/apple-touch-icon.png', icon(180, 0.0));
console.log('icons written to public/');
