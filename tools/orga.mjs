// 翠角王オルガの戦いを、実際の仕組み（突進を巨木へ誘う→背に登る→杭を叩く→泥地→引き抜き）で最後まで通す。
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const out = process.argv[2] || 'artifacts/orga';
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
await G(() => { const g = window.__game.game; g.world.clock.total = 10; });
const log = (...a) => console.log(...a);
const state = () => G(() => { const g = window.__game.game, o = g.orga; return { phase: o.phase, action: o.action, pins: o.pins.map((p) => (p.broken ? 'x' : p.exposed ? 'o' : '-')).join(''), hp: Math.round(g.player.hp), climbing: g.player.climbing, dead: g.player.dead, prog: +o.extractProgress.toFixed(2), op: o.c.pos.toArray().map((v) => Math.round(v)) }; });

// 戦いの間は体力を減らさない（仕組みの検証が目的）
await G(() => { const g = window.__game.game; g.player.maxHp = 100000; g.player.hp = 100000; });

async function lureInto(targetX, targetZ, standBehind, label) {
  // 前の隙が終わるまで待つ
  for (let i = 0; i < 60; i++) { const a = (await state()).action; if (!['stuck', 'bogged', 'distracted', 'buck'].includes(a)) break; await sleep(200); }
  // 目標（巨木・泥地）の向こう側に立ち、オルガに突進させる
  for (let tries = 0; tries < 12; tries++) {
    await G((tx, tz, sb) => {
      const g = window.__game.game, o = g.orga;
      const dx = tx - o.c.pos.x, dz = tz - o.c.pos.z, d = Math.hypot(dx, dz);
      const px = tx + (dx / d) * sb, pz = tz + (dz / d) * sb;
      g.player.place(px, pz, Math.atan2(-dx, -dz));
      g.player.climbing = false;
      g.cam.yaw = Math.atan2(-dx, -dz);
    }, targetX, targetZ, standBehind);
    for (let t = 0; t < 40; t++) {
      await sleep(250);
      const s = await state();
      if (['stuck', 'bogged', 'distracted'].includes(s.action)) { log(label, 'ok', JSON.stringify(s)); return true; }
      if (s.phase === 'exhausted') return true;
      if (s.action === 'recover' || s.action === 'turn') { if (t > 16) break; }
    }
  }
  log(label, 'failed', JSON.stringify(await state()));
  return false;
}

async function climbAndHit(label) {
  await G(() => { const g = window.__game.game, o = g.orga; const f = o.flankPoint(); g.player.place(f.x, f.z, 0); g.cam.yaw = Math.atan2(o.c.pos.x - f.x, o.c.pos.z - f.z); });
  await sleep(300);
  const can = await G(() => window.__game.game.gatherInteractables().map((i) => i.id));
  if (!can.includes('climb')) { log(label, 'no climb prompt', JSON.stringify(can)); return false; }
  await page.keyboard.press('KeyE');
  await sleep(200);
  const before = await state();
  for (let i = 0; i < 10; i++) {
    await page.mouse.move(640, 360);
    await page.mouse.down(); await sleep(60); await page.mouse.up(); await sleep(260);
    const s = await state();
    if (s.pins !== before.pins || !s.climbing) break;
  }
  const after = await state();
  log(label, JSON.stringify(before), '→', JSON.stringify(after));
  return after.pins !== before.pins;
}

const results = [];
const check = (n, ok, d = '') => { results.push({ n, ok, d }); log(ok ? 'PASS' : 'FAIL', n, d); };

// 開始：近づくと戦いが始まる
await G(() => { const g = window.__game.game; g.player.place(390, 40, Math.PI / 2); });
await sleep(1500);
let s = await state();
check('近づくと戦いが始まる（段階1）', s.phase === 'p1', JSON.stringify(s));
await page.screenshot({ path: `${out}/p1.png` });
// 段階1：巨木へ誘う
const tree = await G(() => { const g = window.__game.game; const t = [...g.world.flora.specials.values()].filter((t) => t.id !== 'bridge' && !t.fallen).sort((a, b) => a.group.position.distanceTo(g.orga.c.pos) - b.group.position.distanceTo(g.orga.c.pos))[0]; return [t.group.position.x, t.group.position.z]; });
check('突進を巨木に誘うと角が刺さる', await lureInto(tree[0], tree[1], 5, 'tree'));
await page.screenshot({ path: `${out}/stuck.png` });
check('背に登って1本目の杭を壊す→段階2', (await climbAndHit('pin1')) && (await state()).phase === 'p2');
await sleep(2500);
// 段階2：泥地へ誘う
check('泥地に誘い込むと脚をとられる', await lureInto(352, 138, 14, 'mud'));
await page.screenshot({ path: `${out}/bogged.png` });
check('2本目の杭を壊す→段階3', (await climbAndHit('pin2')) && (await state()).phase === 'p3');
await sleep(2500);
// 段階3：幼体を避難させた扱いにして、隙（よそ見）か巨木で止める
await G(() => { const g = window.__game.game; g.state.flags.juvSafe0 = true; g.state.flags.juvSafe1 = true; });
const tree2 = await G(() => { const g = window.__game.game; const t = [...g.world.flora.specials.values()].filter((t) => t.id !== 'bridge' && !t.fallen && t.falling === 0).sort((a, b) => a.group.position.distanceTo(g.orga.c.pos) - b.group.position.distanceTo(g.orga.c.pos))[0]; return [t.group.position.x, t.group.position.z]; });
check('段階3でも止める手段がある', await lureInto(tree2[0], tree2[1], 5, 'p3'));
check('3本目の杭を壊す→膝をつく', (await climbAndHit('pin3')) && (await state()).phase === 'exhausted');
await page.screenshot({ path: `${out}/exhausted.png` });
// 引き抜き：長押しし、震えたら離す
await G(() => { const g = window.__game.game, o = g.orga; const f = o.flankPoint(); g.player.place(f.x, f.z, 0); });
await sleep(300);
await page.keyboard.press('KeyE'); await sleep(300); // 背に登る
await page.keyboard.press('KeyE'); await sleep(300); // 引き抜き開始
s = await state();
check('引き抜きが始まる', s.phase === 'extract', JSON.stringify(s));
let released = 0;
await page.keyboard.down('KeyE');
for (let i = 0; i < 160; i++) {
  await sleep(100);
  const sh = await G(() => window.__game.game.orga.shudder > 0);
  if (sh) { await page.keyboard.up('KeyE'); released++; while (await G(() => window.__game.game.orga.shudder > 0)) await sleep(60); await page.keyboard.down('KeyE'); }
  const st = await state();
  if (st.phase !== 'extract') break;
}
await page.keyboard.up('KeyE');
s = await state();
check('揺れに合わせて力を入れ、装置を引き抜ける（解決）', ['walkToBridge', 'calm', 'resolved'].includes(s.phase), `${JSON.stringify(s)} 揺れで手を離した回数 ${released}`);
await sleep(1500);
await page.screenshot({ path: `${out}/resolved.png` });
const after = await G(() => { const g = window.__game.game; return { flags: g.state.flags, stage: g.state.quests.main_orga?.stage, museum: g.state.museum, routeOpen: g.eco.routeOpen }; });
check('解決後：群れの道が開き、展示棚に部品が並ぶ', after.routeOpen && after.museum.includes('device_part'), JSON.stringify(after));
// 橋が架かるまで待つ（オルガが谷へ歩く）
let bridge = false;
for (let i = 0; i < 120; i++) { await sleep(1000); bridge = await G(() => !!window.__game.game.state.flags.bridge); if (bridge) break; }
const op = await state();
check('オルガが根の谷の巨木を倒し、橋が架かる', bridge, JSON.stringify(op));
if (bridge) {
  await G(() => { const g = window.__game.game; g.orga.c.pos.set(425, 12, 40); g.player.place(440, -212, Math.PI); g.cam.yaw = Math.PI; g.cam.pitch = 0.25; });
  await sleep(1500);
  await page.screenshot({ path: `${out}/bridge.png` });
  // 橋を歩いて渡れるか
  const y0 = await G(() => window.__game.game.player.pos.toArray());
  await page.keyboard.down('KeyW'); await sleep(22000); await page.keyboard.up('KeyW');
  const y1 = await G(() => { const g = window.__game.game; return [...g.player.pos.toArray(), g.world.terrain.height(g.player.pos.x, g.player.pos.z)]; });
  check('倒木の橋を歩いて谷の北へ渡れる', y1[2] < -250, `${y0.map(Math.round)} → ${y1.map(Math.round)}`);
}
fs.writeFileSync(`${out}/results.json`, JSON.stringify({ results, logs }, null, 1));
console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`, logs.slice(0, 5));
await browser.close();
