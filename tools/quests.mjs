// 依頼・遺跡・拠点の流れを、実際の入力（E・長押し・しゃがみ・道具）で最後まで通す。
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const out = process.argv[2] || 'artifacts/quests';
fs.mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--window-size=1280,720'],
  defaultViewport: { width: 1280, height: 720 },
});
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => { if (m.type() === 'error') logs.push(m.text()); });
page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message));
await page.evaluateOnNewDocument(() => localStorage.clear());
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
const G = (fn, ...a) => page.evaluate(fn, ...a);
await G(() => [...document.querySelectorAll('.title-menu button')].find((b) => b.textContent.includes('はじめから')).click());
await sleep(400);
await G(() => [...document.querySelectorAll('.create button')].find((b) => b.textContent.includes('旅立つ')).click());
await sleep(400);
for (let i = 0; i < 3; i++) { await page.keyboard.press('KeyE'); await sleep(250); }
await G(() => { const g = window.__game.game; g.world.clock.total = 9; });
const results = [];
const check = (n, ok, d = '') => { results.push({ n, ok, d }); console.log(ok ? 'PASS' : 'FAIL', n, d); };
const Q = () => G(() => JSON.parse(JSON.stringify(window.__game.game.state.quests)));
const press = async (k, n = 1) => { for (let i = 0; i < n; i++) { await page.keyboard.press(k); await sleep(220); } };
const hold = async (k, ms) => { await page.keyboard.down(k); await sleep(ms); await page.keyboard.up(k); await sleep(150); };
const face = (x, z) => G((x, z) => { const g = window.__game.game; g.cam.yaw = Math.atan2(x - g.player.pos.x, z - g.player.pos.z); }, x, z);
const prompt = () => G(() => document.querySelector('.prompt:not(.hidden)')?.textContent ?? '');

async function talk(id, choice = 0) {
  await G((id) => { const g = window.__game.game; const n = g.npcs.get(id); const a = n.model.root.rotation.y; g.player.place(n.pos.x + Math.sin(a) * 1.6, n.pos.z + Math.cos(a) * 1.6, 0); }, id);
  await sleep(250);
  await G((id) => { const g = window.__game.game; const n = g.npcs.get(id); g.cam.yaw = Math.atan2(n.pos.x - g.player.pos.x, n.pos.z - g.player.pos.z); }, id);
  await sleep(250);
  const p = await prompt();
  // 会話が開くまで E を押す
  for (let i = 0; i < 5 && !(await G(() => !!document.querySelector('.dialogue'))); i++) { await press('KeyE'); await sleep(150); }
  for (let i = 0; i < 10; i++) {
    const st = await G(() => ({ open: !!document.querySelector('.dialogue'), choices: document.querySelectorAll('.choices button').length }));
    if (!st.open) break;
    if (st.choices) { await press('Digit' + (choice + 1)); break; }
    await press('KeyE');
  }
  await sleep(300);
  return p;
}

// ---------------- 野営地へ（プロローグの完了）
await G(() => { const g = window.__game.game; g.player.place(-178, 0, 0); });
let q;
for (let i = 0; i < 15; i++) { await sleep(300); q = await Q(); if (q.prologue?.done) break; }
check('野営地に着くとプロローグが完了する', q.prologue?.done === true, JSON.stringify(q.prologue));

// ---------------- はぐれたコハク
const pTalk = await talk('tarku', 0);
q = await Q();
check('タルクに話しかけて依頼が始まる', !!q.bond_kohaku, pTalk);
// 足跡を読む
await G(() => { const g = window.__game.game; g.player.place(-150, -25, 0); });
await sleep(300);
await face(-150, -25);
await press('KeyE');
check('小さな足跡を調べると手がかりになる', (await G(() => window.__game.game.state.clues)).includes('kohaku_tracks'));
// コハクを見つける（風下から、しゃがんで）
const kpos = await G(() => window.__game.game.kohaku.pos.toArray());
await G((kx, kz) => {
  const g = window.__game.game;
  const w = g.world.wind; // 風の吹いていく向き (cos,sin)
  // 風下＝コハクから風の吹いていく側
  const px = kx + Math.cos(w.dir) * 22, pz = kz + Math.sin(w.dir) * 22;
  g.player.place(px, pz, 0);
  g.cam.yaw = Math.atan2(kx - px, kz - pz);
}, kpos[0], kpos[2]);
await sleep(1500);
q = await Q();
check('コハクを見つける（段階1）', q.bond_kohaku.stage === 1, JSON.stringify(q.bond_kohaku));
await press('KeyC'); // しゃがむ
await page.keyboard.down('KeyW');
for (let i = 0; i < 80; i++) {
  await sleep(250);
  const d = await G(() => { const g = window.__game.game; const k = g.kohaku; g.cam.yaw = Math.atan2(k.pos.x - g.player.pos.x, k.pos.z - g.player.pos.z); return k.pos.distanceTo(g.player.pos); });
  if (d < 4) break;
}
await page.keyboard.up('KeyW');
const kInfo = await G(() => { const k = window.__game.game.kohaku; return { aw: +k.awareness.toFixed(2), st: k.state, d: +k.pos.distanceTo(window.__game.game.player.pos).toFixed(1) }; });
const pReach = await prompt();
await hold('KeyE', 2400);
q = await Q();
check('しゃがんで風下から近づき、手を伸ばせる（段階2）', q.bond_kohaku.stage === 2, `${pReach} ${JSON.stringify(kInfo)}`);
await press('KeyC');
// ツユミ草を3つ
const berries = await G(() => window.__game.game.tsuyumi.map((t) => t.pos.toArray()));
for (const b of berries.slice(0, 3)) {
  await G((x, z) => { const g = window.__game.game; g.player.place(x - 1.2, z, 0); g.cam.yaw = Math.atan2(1.2, 0); }, b[0], b[2]);
  await sleep(250);
  await press('KeyE');
}
check('ツユミ草を3つ摘む', (await G(() => window.__game.game.state.flags.tsuyumi)) === 3);
// 差し出す
await G(() => { const g = window.__game.game; const k = g.kohaku; g.player.place(k.pos.x + 2, k.pos.z, 0); g.cam.yaw = Math.atan2(-2, 0); k.awareness = 0; });
await sleep(300);
const pOffer = await prompt();
await press('KeyE');
q = await Q();
check('ツユミ草を差し出すと水場へ歩き出す（段階3）', q.bond_kohaku.stage === 3, pOffer);
// 送り届け：クサガリを音玉で追い払う
let drank = false, bangs = 0;
for (let i = 0; i < 90; i++) {
  await sleep(500);
  const s = await G(() => { const g = window.__game.game; const k = g.kohaku; const threats = g.eco.creatures.filter((c) => !c.dead && c.sp.id === 'kusagari' && c.pos.distanceTo(k.pos) < 40); g.player.place(k.pos.x + 3, k.pos.z + 3, 0); if (threats[0]) g.cam.yaw = Math.atan2(threats[0].pos.x - g.player.pos.x, threats[0].pos.z - g.player.pos.z); return { threats: threats.length, stage: g.state.quests.bond_kohaku.stage, tools: g.player.tools.noise }; });
  if (s.threats && s.tools > 0) { await press('KeyG'); bangs++; }
  if (s.threats && s.tools === 0) await G(() => { window.__game.game.player.tools.noise = 3; });
  if (s.stage >= 4) { drank = true; break; }
}
const esc = await G(() => { const g = window.__game.game; const k = g.kohaku; return { st: k.state, pos: k.pos.toArray().map(Math.round), target: k.target?.toArray().map(Math.round), d: k.target ? +Math.hypot(k.target.x - k.pos.x, k.target.z - k.pos.z).toFixed(1) : null, escortT: g.state.flags.escortT, kus: g.eco.creatures.filter((c) => !c.dead && c.sp.id === 'kusagari').map((c) => [Math.round(c.pos.distanceTo(k.pos)), c.state]) }; });
check('クサガリから守りながら水場まで送り届ける（段階4）', drank, `音玉 ${bangs}回 ${JSON.stringify(esc)}`);
await page.screenshot({ path: `${out}/kohaku_drink.png` });
await talk('tarku', 0);
q = await Q();
check('タルクに報告して絆を結ぶ', q.bond_kohaku.done === true && (await G(() => window.__game.game.kohaku.tag)) === 'mount');
// 口笛で呼んで乗る
// 水場の近くの肉食獣を追い払ってから呼ぶ
await G(() => { const g = window.__game.game; const k = g.kohaku; g.eco.noiseBurst(k.pos.x, k.pos.z, 80); g.player.place(-140, -40, 0); });
await sleep(4000);
await press('KeyH');
let near = false;
for (let i = 0; i < 60; i++) { await sleep(500); near = await G(() => window.__game.game.kohaku.pos.distanceTo(window.__game.game.player.pos) < 3.2); if (near) break; }
const wd = await G(() => { const g = window.__game.game; const k = g.kohaku; return { tag: k.tag, st: k.state, pos: k.pos.toArray().map(Math.round), tgt: k.target?.toArray().map(Math.round), sp: +k.speed.toFixed(1), ds: +k.desiredSpeed.toFixed(1), d: Math.round(k.pos.distanceTo(g.player.pos)) }; });
check('口笛（H）でコハクが来る', near, JSON.stringify(wd));
await G(() => { const g = window.__game.game; const k = g.kohaku; g.cam.yaw = Math.atan2(k.pos.x - g.player.pos.x, k.pos.z - g.player.pos.z); });
await sleep(200);
await press('KeyE');
const mounted = await G(() => !!window.__game.game.player.mount);
await G(() => { window.__game.game.cam.yaw = Math.PI * 0.75; });
const m0 = await G(() => window.__game.game.player.pos.toArray());
await page.keyboard.down('ShiftLeft'); await page.keyboard.down('KeyW'); await sleep(3000); await page.keyboard.up('KeyW'); await page.keyboard.up('ShiftLeft');
const m1 = await G(() => window.__game.game.player.pos.toArray());
const rideDist = Math.hypot(m1[0] - m0[0], m1[2] - m0[2]);
check('乗って駆けると徒歩より速い', mounted && rideDist > 18, `${rideDist.toFixed(1)}m / 3秒`);
await page.screenshot({ path: `${out}/riding.png` });
await press('KeyE');
check('E で降りる', !(await G(() => !!window.__game.game.player.mount)));

// ---------------- 柵の向こうの道
await talk('porka', 0);
q = await Q();
check('ポルカの依頼が始まる', !!q.side_fence);
for (const [id, x, z] of [['fence_blocked', -230, 167], ['thorn_feathers', -233, 128]]) {
  await G((x, z) => { const g = window.__game.game; g.player.place(x, z, 0); }, x, z);
  await sleep(300);
  const st = await G((id) => window.__game.game.statics.find((s) => s.id === id).pos.toArray(), id);
  await face(st[0], st[2]);
  await sleep(200);
  await press('KeyE');
}
q = await Q();
check('柵の前と茂みを調べると推理がつながる（段階1）', q.side_fence.stage === 1, JSON.stringify(await G(() => window.__game.game.state.deductions)));
await talk('niko', 0);
q = await Q();
check('ニコに聞く（段階2）', q.side_fence.stage === 2);
await G(() => { const g = window.__game.game; g.player.place(-229, 161, 0); g.cam.yaw = Math.atan2(3, 3); });
await sleep(300);
const pGap = await prompt();
await hold('KeyE', 2900);
q = await Q();
check('柵に小さな通り道を開ける（決断）', q.side_fence.stage === 3 && q.side_fence.outcome === 'gap', pGap);
await talk('porka', 0);
q = await Q();
check('ポルカに伝えて完了', q.side_fence.done === true);
// ヒメヨロイが通り道を抜けて砂州へ
const hm = await G(() => { const g = window.__game.game; const h = g.eco.herds.find((h) => h.species === 'himeyoroi' && h.route); return h ? h.leader.pos.toArray() : null; });
let nested = false;
for (let i = 0; i < 200; i++) { await sleep(600); nested = await G(() => (window.__game.game.state.codex.himeyoroi ?? []).includes('nest') || !window.__game.game.eco.herds.find((h) => h.species === 'himeyoroi' && h.mode === 'nest')); if (nested) break; await G(() => { const g = window.__game.game; const h = g.eco.herds.find((h) => h.species === 'himeyoroi' && h.route); if (h?.leader) g.player.place(h.leader.pos.x - 15, h.leader.pos.z - 15, 0); }); }
const hmDiag = await G(() => { const g = window.__game.game; const h = g.eco.herds.find((h) => h.species === 'himeyoroi' && (h.route || h.home.x > -150)); return h ? { mode: h.mode, ri: h.routeIndex, lead: h.leader?.pos.toArray().map(Math.round), states: h.members.map((m) => m.state), blocked: h.members.map((m) => m.blocked) } : null; });
check('ヒメヨロイの家族が柵の隙間を抜けて砂州にたどり着く', nested, JSON.stringify(hm) + ' ' + JSON.stringify(hmDiag));

// ---------------- 共振の見張り塔
await G(() => { const g = window.__game.game; g.player.place(250, -100, 0); });
await sleep(500);
const rings = await G(() => window.__game.game.world.landmarks.ringStones.map((r) => ({ s: r.state, p: r.pos.toArray() })));
const want = [0, 1, 2];
for (let i = 0; i < 3; i++) {
  const r = rings[i];
  let turns = (want[i] - r.s + 4) % 4;
  await G((x, z) => { const g = window.__game.game; const dx = x - 250, dz = z + 118; const d = Math.hypot(dx, dz); g.player.place(x + (dx / d) * 1.8, z + (dz / d) * 1.8, 0); g.cam.yaw = Math.atan2(-dx, -dz); }, r.p[0], r.p[2]);
  await sleep(300);
  while (turns-- > 0) await press('KeyE');
}
const tw = await G(() => ({ solved: window.__game.game.state.tower.solved, rings: window.__game.game.world.landmarks.ringStones.map((r) => r.state) }));
check('輪石を日の出・真昼・日の入りに合わせると唸りが止む', tw.solved, JSON.stringify(tw));
await page.screenshot({ path: `${out}/tower.png` });

// ---------------- 泥の中の幼体
await G(() => { const g = window.__game.game; const j = g.eco.creatures.find((c) => c.tag === 'juvenile0'); g.player.place(j.pos.x + 3, j.pos.z, 0); g.cam.yaw = Math.atan2(-3, 0); });
await sleep(300);
const pJ = await prompt();
await hold('KeyE', 2100);
const led = await G(() => window.__game.game.eco.creatures.find((c) => c.tag === 'juvenile0')?.state);
check('泥から幼体を押し出す（長押し）', led === 'led', pJ);
// 後ろから追い立てて茂みへ
let safe = false;
for (let i = 0; i < 280; i++) {
  await sleep(250);
  safe = await G(() => {
    const g = window.__game.game; const j = g.eco.creatures.find((c) => c.tag === 'juvenile0' || c.tag === 'safe0');
    if (!j || j.tag === 'safe0') return true;
    const gx = 296 - j.pos.x, gz = 252 - j.pos.z, d = Math.hypot(gx, gz);
    g.player.place(j.pos.x - (gx / d) * 6, j.pos.z - (gz / d) * 6, 0);
    return false;
  });
  if (safe) break;
}
const jd = await G(() => { const g = window.__game.game; const j = g.eco.creatures.find((c) => c.tag === 'juvenile0' || c.tag === 'safe0'); return j ? { tag: j.tag, st: j.state, pos: j.pos.toArray().map(Math.round), sp: +j.speed.toFixed(2), ds: +j.desiredSpeed.toFixed(2), stuck: j.stuckT } : null; });
check('幼体を後ろから追い立ててソテツの茂みへ避難させる', safe, JSON.stringify(jd));

// ---------------- 焚き火で休む
await G(() => { const g = window.__game.game; g.player.place(-178, 20, 0); g.cam.yaw = 0; });
await sleep(300);
await face(-178, 22);
console.log('before rest', JSON.stringify(await G(() => ({ mode: window.__game.game.mode, prompt: document.querySelector('.prompt:not(.hidden)')?.textContent, modal: !!document.querySelector('.modalwrap'), dlg: !!document.querySelector('.dialogue') }))));
await press('KeyE');
await sleep(300);
const restOpen = await G(() => !!document.querySelector('.forecast'));
const h0 = await G(() => window.__game.game.world.clock.hour);
await G(() => [...document.querySelectorAll('.modal button')].find((b) => b.textContent.includes('夕暮れ'))?.click());
await sleep(400);
const h1 = await G(() => window.__game.game.world.clock.hour);
check('焚き火で天気予報を見て、時刻を選んで休める', restOpen && Math.abs(h1 - 18.3) < 0.2, `${h0.toFixed(2)} → ${h1.toFixed(2)}`);

// ---------------- 見張り台の建設場所を選ぶ
await talk('iva', 0);
const lk = await G(() => window.__game.game.state.lookout);
check('イヴァと見張り台の場所を決める（拠点の成長）', lk === 'A', lk);
await G(() => { const g = window.__game.game; g.player.place(-150, 20, 0); g.cam.yaw = Math.atan2(4, -14); g.cam.pitch = 0.1; g.world.clock.total = 34; });
await sleep(800);
await page.screenshot({ path: `${out}/lookout.png` });

fs.writeFileSync(`${out}/results.json`, JSON.stringify({ results, logs }, null, 1));
console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`, logs.slice(0, 5));
await browser.close();
