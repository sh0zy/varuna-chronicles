// 本番ビルド（サブパス配下）とオフライン動作の確認
import puppeteer from 'puppeteer-core';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const URL0 = 'http://127.0.0.1:4180/varuna-chronicles/';
const b = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist'], defaultViewport: { width: 1280, height: 720 } });
const p = await b.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('[pageerror] ' + e.message));
const res = [];
const check = (n, ok, d = '') => { res.push(ok); console.log(ok ? 'PASS' : 'FAIL', n, d); };
await p.goto(URL0, { waitUntil: 'load', timeout: 120000 });
await p.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
check('サブパス配下で本番ビルドが起動する', true);
const man = await p.evaluate(async () => { const r = await fetch('./manifest.webmanifest'); return r.ok ? (await r.json()).name : null; });
check('マニフェストを読める', man === '原環の大地 ― ヴァルナ年代記 ―', man);
await p.waitForFunction(() => navigator.serviceWorker.controller || navigator.serviceWorker.getRegistration().then(r => !!r), { timeout: 30000 }).catch(() => {});
const sw = await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); return r ? { scope: r.scope, active: !!(r.active || r.installing || r.waiting) } : null; });
check('サービスワーカーが登録される', !!sw?.active, JSON.stringify(sw));
// 実際に遊べるか（新規開始してプロローグまで）
await p.evaluate(() => [...document.querySelectorAll('.title-menu button')].find((b) => b.textContent.includes('はじめから')).click());
await sleep(400);
await p.evaluate(() => [...document.querySelectorAll('.create button')].find((b) => b.textContent.includes('旅立つ')).click());
await sleep(500);
for (let i = 0; i < 3; i++) { await p.keyboard.press('KeyE'); await sleep(200); }
await p.keyboard.down('KeyW'); await sleep(1500); await p.keyboard.up('KeyW');
const st = await p.evaluate(() => ({ mode: window.__game.game.mode, quests: Object.keys(window.__game.game.state.quests) }));
check('本番ビルドで実際に遊べる', st.mode === 'play' && st.quests.includes('prologue'), JSON.stringify(st));
await p.screenshot({ path: 'artifacts/webapp_prod.png' });
// いったん資源を読み込ませてから、通信を切って再読み込み
await sleep(3000);
await p.setOfflineMode(true);
await p.reload({ waitUntil: 'load', timeout: 60000 }).catch((e) => console.log('reload error', e.message));
const offline = await p.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 60000 }).then(() => true).catch(() => false);
check('通信を切っても起動する（オフライン対応）', offline);
await p.screenshot({ path: 'artifacts/webapp_offline.png' });
await p.setOfflineMode(false);
console.log(`${res.filter(Boolean).length}/${res.length} passed`, errs.slice(0, 5));
await b.close();
