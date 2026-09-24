// 公開URLが実際に動くかを確かめる
import puppeteer from 'puppeteer-core';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const URL0 = process.argv[2] || 'https://sh0zy.github.io/varuna-chronicles/';
const b = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist'], defaultViewport: { width: 1280, height: 720 } });
const p = await b.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('[pageerror] ' + e.message));
const t0 = Date.now();
const resp = await p.goto(URL0, { waitUntil: 'load', timeout: 120000 });
console.log('HTTP', resp.status(), URL0);
await p.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
console.log('タイトルまで', ((Date.now() - t0) / 1000).toFixed(1), '秒');
await p.screenshot({ path: 'artifacts/live_title.png' });
await p.evaluate(() => [...document.querySelectorAll('.title-menu button')].find((b) => b.textContent.includes('はじめから')).click());
await sleep(500);
await p.evaluate(() => [...document.querySelectorAll('.create button')].find((b) => b.textContent.includes('旅立つ')).click());
await sleep(600);
for (let i = 0; i < 3; i++) { await p.keyboard.press('KeyE'); await sleep(250); }
await p.keyboard.down('KeyW'); await sleep(2500); await p.keyboard.up('KeyW');
await sleep(500);
const st = await p.evaluate(() => { const g = window.__game.game; const t = [...window.__game.times].sort((a,b)=>a-b); return { mode: g.mode, pos: g.player.pos.toArray().map(v => Math.round(v)), quests: Object.keys(g.state.quests), codex: Object.keys(g.state.codex), avgMs: +(t.reduce((a,b)=>a+b,0)/t.length).toFixed(1) }; });
console.log('遊べている:', JSON.stringify(st));
await p.screenshot({ path: 'artifacts/live_play.png' });
// 落ち着いてからの計測
await p.evaluate(() => { window.__game.times.length = 0; window.__game.cpuTimes.length = 0; });
await sleep(6000);
const perf = await p.evaluate(() => { const g = window.__game; const t = [...g.times].sort((a,b)=>a-b); const av=(a)=>+(a.reduce((x,y)=>x+y,0)/Math.max(1,a.length)).toFixed(1); return { avgMs: av(g.times), p95: t[Math.floor(t.length*0.95)], cpuMs: av(g.cpuTimes), gpu: (() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl.getExtension('WEBGL_debug_renderer_info'); return gl.getParameter(e.UNMASKED_RENDERER_WEBGL); })() }; });
console.log('落ち着いた後:', JSON.stringify(perf));
const sw = await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); return r ? r.scope : null; });
console.log('サービスワーカー:', sw);
console.log('エラー:', errs.slice(0, 5));
await b.close();
