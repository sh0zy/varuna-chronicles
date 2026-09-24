// 同じ条件で設定だけを変えて比べる（短時間）
import puppeteer from 'puppeteer-core';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const variants = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist'], defaultViewport: { width: 1600, height: 900 } });
for (const v of variants) {
  const p = await b.newPage();
  await p.evaluateOnNewDocument(() => { localStorage.clear(); localStorage.setItem('varuna.settings.v1', JSON.stringify({ quality: 'medium', renderScale: 1 })); });
  await p.goto('http://127.0.0.1:5173/?' + v, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__game && window.__game.extra().mode === 'title', { timeout: 120000 });
  await p.evaluate(() => { const g = window.__game.game; g.newGame(g.state.appearance); document.querySelector('.layer').innerHTML = ''; g.mode = 'play'; });
  const res = [];
  for (const [x, z, yaw, hr] of [[-569, 286, Math.atan2(130, -150), 6.5], [290, -10, Math.atan2(40, -30), 9.3]]) {
    await p.evaluate((x, z, yaw, hr) => { const g = window.__game.game; g.player.place(x, z, yaw); g.cam.yaw = yaw; g.world.clock.total = hr; }, x, z, yaw, hr);
    await sleep(1500);
    await p.evaluate(() => { const g = window.__game; g.times.length = 0; g.cpuTimes.length = 0; g.renderTimes.length = 0; });
    await sleep(3500);
    res.push(await p.evaluate(() => { const g = window.__game; const av = (a) => +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1); return { frame: av(g.times), cpu: av(g.cpuTimes), render: av(g.renderTimes), calls: g.extra().calls, trisK: Math.round(g.extra().tris / 1000) }; }));
  }
  console.log(v.padEnd(14), JSON.stringify(res));
  await p.close();
}
await b.close();
