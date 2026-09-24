// 使い方: node tools/shot.mjs <url> <out.png> [待ち時間ms] [幅] [高さ] [--headful]
// Edge を puppeteer で起動し、スクリーンショットとブラウザ内の計測値を取る。
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const [url, out = 'artifacts/shot.png', waitMs = '6000', w = '1280', h = '720'] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const headful = process.argv.includes('--headful');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
fs.mkdirSync(out.replace(/[\\/][^\\/]*$/, '') || '.', { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: headful ? false : 'new',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-webgl', `--window-size=${w},${h}`, '--autoplay-policy=no-user-gesture-required'],
  defaultViewport: { width: Number(w), height: Number(h) },
});
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(url, { waitUntil: 'load', timeout: 120000 });
const gpu = await page.evaluate(() => {
  const c = document.createElement('canvas');
  const gl = c.getContext('webgl2');
  if (!gl) return 'webgl2 なし';
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
});
await new Promise((r) => setTimeout(r, Number(waitMs)));
const stats = await page.evaluate(() => {
  const w = window;
  const p = w.__preview || w.__game;
  if (!p) return null;
  const t = [...(p.times || [])].sort((a, b) => a - b);
  const avg = t.length ? t.reduce((a, b) => a + b, 0) / t.length : 0;
  return { buildMs: p.buildMs, frames: t.length, avgMs: +avg.toFixed(2), p95: +(t[Math.floor(t.length * 0.95)] || 0).toFixed(2), p99: +(t[Math.floor(t.length * 0.99)] || 0).toFixed(2), extra: p.extra ? p.extra() : undefined };
});
await page.screenshot({ path: out });
console.log(JSON.stringify({ gpu, stats, logs: logs.slice(-25) }, null, 1));
await browser.close();
