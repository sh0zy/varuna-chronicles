// 自動の通しプレイ検証：UIから新規開始 → 各地点で計測と撮影 → 記録→再読み込み→続きから
// 使い方: node tools/play.mjs [出力フォルダ] [画質 low|medium|high] [幅] [高さ]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const out = process.argv[2] || 'artifacts/play';
const quality = process.argv[3] || 'medium';
const W = Number(process.argv[4] || 1600), H = Number(process.argv[5] || 900);
fs.mkdirSync(out, { recursive: true });
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL = 'http://127.0.0.1:5173/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: EDGE, headless: 'new',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', `--window-size=${W},${H}`, '--autoplay-policy=no-user-gesture-required'],
  defaultViewport: { width: W, height: H },
});
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.evaluateOnNewDocument((q) => {
  if (location.search.includes('reload')) return;
  localStorage.clear();
  localStorage.setItem('varuna.settings.v1', JSON.stringify({ quality: q, renderScale: 1 }));
}, quality);
await page.goto(URL, { waitUntil: 'load' });
await page.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
const report = { quality, viewport: `${W}x${H}`, gpu: await page.evaluate(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl.getExtension('WEBGL_debug_renderer_info'); return gl.getParameter(e.UNMASKED_RENDERER_WEBGL); }), buildMs: await page.evaluate(() => window.__game.buildMs), scenes: [] };

async function measure(name, seconds = 5) {
  await page.evaluate(() => { window.__game.times.length = 0; window.__game.cpuTimes.length = 0; window.__game.renderTimes.length = 0; window.__game.simTimes.length = 0; });
  await sleep(seconds * 1000);
  const r = await page.evaluate(() => {
    const t = [...window.__game.times].sort((a, b) => a - b);
    const avg = t.reduce((a, b) => a + b, 0) / t.length;
    const e = window.__game.extra();
    const av = (a) => +(a.reduce((x, y) => x + y, 0) / Math.max(1, a.length)).toFixed(2);
    return { frames: t.length, avgMs: +avg.toFixed(2), cpuMs: av(window.__game.cpuTimes), renderCpuMs: av(window.__game.renderTimes), ecoMs: av(window.__game.simTimes), p95: +t[Math.floor(t.length * 0.95)].toFixed(1), p99: +t[Math.floor(t.length * 0.99)].toFixed(1), max: +t[t.length - 1].toFixed(1), calls: e.calls, trisK: Math.round(e.tris / 1000), creaturesVisible: e.visible, heapMB: e.heap ? Math.round(e.heap / 1048576) : null, hour: +e.hour.toFixed(2) };
  });
  await page.screenshot({ path: `${out}/${name}.png` });
  report.scenes.push({ name, ...r });
  console.log(name, JSON.stringify(r));
}

// タイトル
await measure('00_title', 3);
// 新規開始（UIの操作）
await page.evaluate(() => [...document.querySelectorAll('.title-menu button')].find((b) => b.textContent.includes('はじめから')).click());
await sleep(800);
await page.screenshot({ path: `${out}/01_create.png` });
await page.evaluate(() => [...document.querySelectorAll('.create button')].find((b) => b.textContent.includes('旅立つ')).click());
await sleep(600);
for (let i = 0; i < 3; i++) { await page.evaluate(() => document.querySelector('.intro')?.click()); await sleep(400); }
await sleep(2500);
const G = (fn, ...args) => page.evaluate(fn, ...args);
// V1：渡りの丘から群れを望む
await G(() => { const g = window.__game.game; g.cam.yaw = Math.atan2(130, -150); g.cam.pitch = 0.05; });
await measure('02_v1_hill_dawn', 6);
// 足跡の調査（実際の関数で）
const clue = await G(() => { const g = window.__game.game; g.player.place(-500, 240, 0); return true; });
await sleep(500);
await G(() => { const g = window.__game.game; const it = g.gatherInteractables().find((i) => i.id === 'st_deep_tracks' || i.id === 'print'); it?.use(); return it?.id; });
await sleep(1500);
await page.screenshot({ path: `${out}/03_investigate.png` });
// V2：野営地の崖から大河の曲がり
await G(() => { const g = window.__game.game; g.player.place(-150, 38, 0); g.world.clock.total = 8.2; g.cam.yaw = Math.atan2(60, 40); g.cam.pitch = 0.12; });
await measure('04_v2_camp', 5);
// 野営地の中（NPC・焚き火）
await G(() => { const g = window.__game.game; g.player.place(-172, 30, 0); g.cam.yaw = Math.PI; g.cam.pitch = 0.3; });
await measure('05_camp_inside', 4);
// 会話
await G(() => { window.__game.game.talk('ena'); });
await sleep(600);
await page.screenshot({ path: `${out}/06_dialogue.png` });
await G(() => { const d = document.querySelector('.dialogue'); for (let i = 0; i < 5; i++) d?.click(); const b = [...document.querySelectorAll('.choices button')][1]; b?.click(); });
await sleep(500);
// V3：翡翠の縁の光の柱
await G(() => { const g = window.__game.game; g.player.place(290, -10, 0); g.world.clock.total = 9.3; g.cam.yaw = Math.atan2(40, -30); g.cam.pitch = -0.15; });
await measure('07_v3_jade_edge', 5);
// 倒木地帯とオルガ
await G(() => { const g = window.__game.game; g.player.place(370, 70, 0); g.world.clock.total = 10.5; g.cam.yaw = Math.atan2(55, -25); g.cam.pitch = 0.1; });
await measure('08_orga_dormant', 4);
await G(() => { const g = window.__game.game; g.orga.begin(); });
await measure('09_orga_fight', 6);
const orga = await G(() => { const g = window.__game.game; return { phase: g.orga.phase, action: g.orga.action, hp: g.player.hp }; });
console.log('orga', JSON.stringify(orga));
// 夜の草海
await G(() => { const g = window.__game.game; g.orga.resetForRetry(); g.orga.engaged = false; g.orga.phase = 'dormant'; g.player.place(-330, 170, 0); g.world.clock.total = 22.5; g.cam.yaw = 0.8; g.cam.pitch = 0.05; });
await measure('10_night_grass', 5);
// 地図と手帳
await G(() => window.__game.game.ui.openMenu('map'));
await sleep(700);
await page.screenshot({ path: `${out}/11_map.png` });
await G(() => window.__game.game.ui.openMenu('codex'));
await sleep(500);
await page.screenshot({ path: `${out}/12_codex.png` });
await G(() => window.__game.game.ui.openMenu('quests'));
await sleep(500);
await page.screenshot({ path: `${out}/13_quests.png` });
await G(() => window.__game.game.ui.closeModal());

// 記録 → 再読み込み → 続きから
const before = await G(() => { const g = window.__game.game; g.player.place(-200, -20, 0); g.world.clock.total = 30.25; const r = g.save('manual1'); const s = g.snapshot(); return { ok: r.ok, x: Math.round(s.player.x), z: Math.round(s.player.z), clock: s.clock, clues: s.clues, codex: Object.keys(s.codex).length, quests: Object.keys(s.quests) }; });
await page.evaluate(() => { localStorage.removeItem('varuna.save.auto1'); localStorage.removeItem('varuna.save.auto2'); });
await page.evaluateOnNewDocument(() => {}); // 設定と記録は残す
const page2 = page;
await page2.goto(URL + '?reload=1', { waitUntil: 'load' });
await page2.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
await page2.evaluate(() => [...document.querySelectorAll('.title-menu button')].find((b) => b.textContent.includes('つづきから'))?.click());
await sleep(1500);
const after = await page2.evaluate(() => { const g = window.__game.game; const s = g.snapshot(); return { mode: g.mode, x: Math.round(s.player.x), z: Math.round(s.player.z), clock: s.clock, clues: s.clues, codex: Object.keys(s.codex).length, quests: Object.keys(s.quests) }; });
report.saveLoad = { before, after, match: before.x === after.x && before.z === after.z && Math.abs(before.clock - after.clock) < 0.01 && JSON.stringify(before.clues) === JSON.stringify(after.clues) && before.codex === after.codex };
console.log('saveLoad', JSON.stringify(report.saveLoad));
await page2.screenshot({ path: `${out}/14_after_load.png` });
report.logs = logs.slice(0, 40);
fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 1));
console.log('logs', JSON.stringify(logs.slice(0, 20), null, 1));
await browser.close();
