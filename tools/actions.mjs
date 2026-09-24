// 実際のキー入力でゲームを操作し、各機能が動くかを確かめる（ポインタロックなしでも動く部分）。
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const out = process.argv[2] || 'artifacts/actions';
fs.mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--window-size=1280,720'],
  defaultViewport: { width: 1280, height: 720 },
});
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.evaluateOnNewDocument(() => { localStorage.clear(); });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(ok ? 'PASS' : 'FAIL', name, detail); };
const G = (fn, ...a) => page.evaluate(fn, ...a);

await G(() => [...document.querySelectorAll('.title-menu button')].find((b) => b.textContent.includes('はじめから')).click());
await sleep(500);
// 名前の入力と見た目の変更
await G(() => { document.querySelector('#nm').value = 'ハル'; });
await G(() => document.querySelector('.seg[data-k="hairStyle"] button[data-v="long"]').click());
await G(() => [...document.querySelectorAll('.create button')].find((b) => b.textContent.includes('旅立つ')).click());
await sleep(500);
for (let i = 0; i < 3; i++) { await page.keyboard.press('KeyE'); await sleep(250); }
await sleep(1200);
const st0 = await G(() => { const g = window.__game.game; return { name: g.state.appearance.name, hair: g.state.appearance.hairStyle, mode: g.mode, intro: !!document.querySelector('.intro:not(.out)') }; });
check('キャラクター作成が反映される', st0.name === 'ハル' && st0.hair === 'long', JSON.stringify(st0));
check('イントロを E で進めて操作に入る', st0.mode === 'play' && !st0.intro, JSON.stringify(st0));

// 歩く
const p0 = await G(() => window.__game.game.player.pos.toArray());
await page.keyboard.down('KeyW'); await sleep(2000); await page.keyboard.up('KeyW');
const p1 = await G(() => window.__game.game.player.pos.toArray());
const walked = Math.hypot(p1[0] - p0[0], p1[2] - p0[2]);
check('W で前へ歩く', walked > 2.5, `${walked.toFixed(2)}m / 2秒`);
// 走る（スタミナが減る）
await page.keyboard.down('ShiftLeft'); await page.keyboard.down('KeyW'); await sleep(1500);
const run = await G(() => ({ st: window.__game.game.player.stamina, sp: window.__game.game.player.sprinting }));
await page.keyboard.up('KeyW'); await page.keyboard.up('ShiftLeft');
check('Shift で走り、スタミナが減る', run.sp && run.st < 95, JSON.stringify(run));
await sleep(1500);
// 回避
const s0 = await G(() => window.__game.game.player.stamina);
await page.keyboard.press('Space'); await sleep(120);
const dodge = await G(() => ({ d: window.__game.game.player.dodgeT, inv: window.__game.game.player.invuln, st: window.__game.game.player.stamina }));
check('Space で回避（無敵時間あり）', dodge.d > 0 && dodge.inv > 0 && dodge.st < s0, JSON.stringify(dodge));
await sleep(600);
// しゃがみ（切り替え）
await page.keyboard.press('KeyC'); await sleep(200);
const cr = await G(() => ({ c: window.__game.game.player.crouched, noise: window.__game.game.player.noise }));
await page.keyboard.press('KeyC'); await sleep(200);
const cr2 = await G(() => window.__game.game.player.crouched);
check('C でしゃがみの切り替え（足音が小さくなる）', cr.c && !cr2 && cr.noise < 0.3, JSON.stringify(cr));
// 耳を澄ます
await page.keyboard.down('Tab'); await sleep(400);
const ls = await G(() => window.__game.game.listening);
await page.keyboard.up('Tab');
check('Tab 長押しで耳を澄ます', ls === true);
// 軽攻撃（左クリック）
await page.mouse.move(640, 360);
await page.mouse.down(); await sleep(80); await page.mouse.up(); await sleep(100);
const atk = await G(() => !!window.__game.game.player.attack);
check('左クリックで軽攻撃', atk);
await sleep(600);
// 重攻撃（R長押し→離す）
await page.keyboard.down('KeyR'); await sleep(700);
const ch = await G(() => window.__game.game.player.heavyCharge);
await page.keyboard.up('KeyR'); await sleep(100);
const hv = await G(() => window.__game.game.player.attack?.kind);
check('R 長押しで重攻撃の溜め→振り', ch > 0.5 && hv === 2, `charge ${ch?.toFixed(2)} kind ${hv}`);
await sleep(900);
// 手帳（J）と閉じる（Esc）
await page.keyboard.press('KeyJ'); await sleep(400);
const nb = await G(() => ({ mode: window.__game.game.mode, tab: document.querySelector('.tabs .on')?.textContent }));
await page.screenshot({ path: `${out}/notebook.png` });
await page.keyboard.press('Escape'); await sleep(300);
const nb2 = await G(() => window.__game.game.mode);
check('J で手帳を開き、Esc で閉じる', nb.mode === 'menu' && nb.tab === '目的' && nb2 === 'play', JSON.stringify(nb) + ' → ' + nb2);
// 地図（M）
await page.keyboard.press('KeyM'); await sleep(500);
const mp = await G(() => !!document.querySelector('.mapwrap canvas'));
await page.screenshot({ path: `${out}/map.png` });
await page.keyboard.press('KeyM'); await sleep(300);
check('M で地図を開閉', mp && (await G(() => window.__game.game.mode)) === 'play');
// ヒントを開く
await page.keyboard.press('KeyJ'); await sleep(300);
await G(() => document.querySelector('[data-hint]')?.click()); await sleep(300);
const hints = await G(() => window.__game.game.state.quests.prologue.hints);
await page.keyboard.press('Escape'); await sleep(200);
check('手帳から段階的なヒントを開ける', hints === 1, `hints=${hints}`);
// 足跡の調査（E）
await G(() => { const g = window.__game.game; g.player.place(-500, 238, 0); g.cam.yaw = 0; });
await sleep(400);
const pr = await G(() => document.querySelector('.prompt:not(.hidden)')?.textContent);
await page.keyboard.press('KeyE'); await sleep(400);
const clue = await G(() => ({ clues: window.__game.game.state.clues, reading: document.querySelector('.reading')?.textContent }));
check('足跡に近づくと「調べる」が出て、E で手がかりになる', !!pr && clue.clues.includes('deep_tracks'), `${pr} / ${clue.clues}`);
await page.screenshot({ path: `${out}/investigate.png` });
// 会話（E）→選択肢（数字キー）
await G(() => { const g = window.__game.game; g.player.place(-180.6, 23.6, 0); g.cam.yaw = Math.atan2(-0.2, 0); });
await sleep(500);
await G(() => { const g = window.__game.game; g.cam.yaw = Math.atan2(g.npcs.get('ena').pos.x - g.player.pos.x, g.npcs.get('ena').pos.z - g.player.pos.z); });
await sleep(300);
const pr2 = await G(() => document.querySelector('.prompt:not(.hidden)')?.textContent);
await page.keyboard.press('KeyE'); await sleep(300);
for (let i = 0; i < 4; i++) { await page.keyboard.press('KeyE'); await sleep(200); }
await page.screenshot({ path: `${out}/dialogue.png` });
await page.keyboard.press('Digit2'); await sleep(400);
const q = await G(() => ({ q: Object.keys(window.__game.game.state.quests), mode: window.__game.game.mode }));
check('NPCに E で話しかけ、数字キーで選ぶと依頼が始まる', q.q.includes('main_orga') && q.mode === 'play', `${pr2} / ${JSON.stringify(q)}`);
// トースト（通知）の大きさ
const toastH = await G(() => [...document.querySelectorAll('.toast')].map((t) => Math.round(t.getBoundingClientRect().height)));
check('通知の高さが適切（120px 以下）', toastH.every((h) => h <= 120), JSON.stringify(toastH));
// フォトモード
await page.keyboard.press('KeyP'); await sleep(600);
const ph = await G(() => window.__game.game.mode);
await G(() => [...document.querySelectorAll('.photo button')].find((b) => b.textContent === '撮影')?.click());
await sleep(1200);
const photos = await G(() => window.__game.game.state.photos.length);
await page.screenshot({ path: `${out}/photo.png` });
await G(() => [...document.querySelectorAll('.photo button')].find((b) => b.textContent === '閉じる')?.click());
await sleep(300);
check('P でフォトモード、撮影すると写真が残る', ph === 'photo' && photos === 1 && (await G(() => window.__game.game.mode)) === 'play', `photos=${photos}`);
// 設定の変更（文字の大きさ）
await page.keyboard.press('Escape'); await sleep(300);
await G(() => [...document.querySelectorAll('.tabs button')].find((b) => b.textContent === '設定').click()); await sleep(300);
await G(() => { const s = document.querySelector('select[data-k="textSize"]'); s.value = 'large'; s.dispatchEvent(new Event('change', { bubbles: true })); });
const ts = await G(() => document.documentElement.dataset.textSize);
await page.screenshot({ path: `${out}/settings.png` });
check('設定：文字の大きさが即時に変わる', ts === 'large');
// キーの割り当て変更
await G(() => [...document.querySelectorAll('.tabs button')].find((b) => b.textContent === '操作').click()); await sleep(300);
await G(() => document.querySelector('button[data-kb="crouch"]').click()); await sleep(100);
await page.keyboard.press('KeyV'); await sleep(300);
const bind = await G(() => window.__game.game.settings.bindings.crouch.keys);
check('操作の割り当てを変更できる（しゃがみ→V）', bind.includes('KeyV'), JSON.stringify(bind));
await page.keyboard.press('Escape'); await sleep(300);
await page.keyboard.press('KeyV'); await sleep(200);
const crV = await G(() => window.__game.game.player.crouched);
check('変更した割り当てがゲーム中に効く', crV === true);
fs.writeFileSync(`${out}/results.json`, JSON.stringify({ results, logs }, null, 1));
console.log('logs', JSON.stringify(logs.slice(0, 15), null, 1));
console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
await browser.close();
