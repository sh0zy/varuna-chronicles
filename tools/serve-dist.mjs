// 本番ビルドを、GitHub Pages と同じ「/<リポジトリ名>/」配下で配信して確かめるための簡易サーバー
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_PATH || '/varuna-chronicles/';
const PORT = Number(process.env.PORT || 4180);
const ROOT = path.resolve('dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!p.startsWith(BASE)) { res.writeHead(404); res.end('not found'); return; }
  p = p.slice(BASE.length) || 'index.html';
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`serving dist at http://127.0.0.1:${PORT}${BASE}`));
