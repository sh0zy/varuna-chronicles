import * as THREE from 'three';
import type { Game } from '../game/game';
import { Caption } from '../core/audio';
import { CLUES, DEDUCTIONS, RECORDS, QUESTS, SKILLS, Dialogue, MUSEUM_ITEMS, NPCS } from '../game/content';
import { SPECIES, SMALL_SPECIES, OBS_TEXT, CODEX_ORDER, ObsId } from '../creatures/species';
import { SLOT_LABELS, SlotId } from '../game/state';
import { Appearance, DEFAULT_APPEARANCE, SKIN_TONES, HAIR_COLORS, CLOAK_COLORS } from '../player/humanoid';
import { ACTION_LABELS, Action, keyName, PAD_NAMES } from '../core/input';
import { DIFFICULTY, DEFAULT_SETTINGS, Settings } from '../core/settings';
import { WEATHER_NAMES } from '../core/time';
import { P, MAP_HALF, riverLine, riverHalfWidth } from '../world/layout';
import { clamp } from '../core/noise';

const h = (tag: string, cls = '', html = '') => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

type Tab = 'main' | 'quests' | 'clues' | 'records' | 'codex' | 'skills' | 'map' | 'save' | 'settings' | 'controls' | 'about';

export class UI {
  root: HTMLElement;
  private hud: HTMLElement;
  private compass: HTMLElement;
  private compassStrip: HTMLElement;
  private windLine: HTMLElement;
  private objective: HTMLElement;
  private vitals: HTMLElement;
  private promptEl: HTMLElement;
  private toasts: HTMLElement;
  private captions: HTMLElement;
  private bossBar: HTMLElement;
  private crosshair: HTMLElement;
  private layer: HTMLElement;
  private perf: HTMLElement;
  private perfOn = false;
  private clickToPlay: HTMLElement;
  private listenEl: HTMLElement;
  private hintEl: HTMLElement;
  private saveDot: HTMLElement;
  private damageEl: HTMLElement;
  private menuEl: HTMLElement | null = null;
  private menuTab: Tab = 'main';
  private dialogueEl: HTMLElement | null = null;
  private dlg: { d: Dialogue; i: number; onAction: (a: string) => void } | null = null;
  private photoEl: HTMLElement | null = null;
  private deathEl: HTMLElement | null = null;
  private mapImage: HTMLCanvasElement | null = null;
  private vitalsFade = 0;
  private padPrev: boolean[] = [];
  private navIndex = 0;
  private codexSel = 'sorakubi';
  private perfT = 0;

  constructor(private game: Game) {
    this.root = h('div', 'ui');
    document.body.appendChild(this.root);
    this.hud = h('div', 'hud hidden');
    this.compass = h('div', 'compass');
    this.compassStrip = h('div', 'compass-strip');
    this.windLine = h('div', 'wind-line');
    this.compass.append(this.compassStrip, this.windLine, h('div', 'compass-center'));
    // 方位の目盛り（-360°〜720°を並べ、どの向きでも途切れないように）
    const names: Record<number, string> = { 0: '北', 45: '北東', 90: '東', 135: '南東', 180: '南', 225: '南西', 270: '西', 315: '北西' };
    let marks = '';
    for (let d = -360; d <= 720; d += 15) {
      const n = names[((d % 360) + 360) % 360];
      marks += n ? `<span class="${n.length > 1 ? 'minor' : ''}" style="left:${d * 3.2}px">${n}</span>` : `<span class="tick" style="left:${d * 3.2}px"></span>`;
    }
    this.compassStrip.innerHTML = marks;
    this.objective = h('div', 'objective');
    this.vitals = h('div', 'vitals');
    this.promptEl = h('div', 'prompt hidden');
    this.bossBar = h('div', 'boss hidden');
    this.crosshair = h('div', 'crosshair hidden');
    this.listenEl = h('div', 'listen');
    this.hintEl = h('div', 'ctrlhint hidden');
    this.saveDot = h('div', 'savedot', '記録中');
    this.damageEl = h('div', 'damage');
    this.hud.append(this.compass, this.objective, this.vitals, this.promptEl, this.bossBar, this.crosshair, this.listenEl, this.hintEl, this.saveDot, this.damageEl);
    this.toasts = h('div', 'toasts');
    this.captions = h('div', 'captions');
    this.layer = h('div', 'layer');
    this.perf = h('div', 'perf hidden');
    this.clickToPlay = h('div', 'clickplay hidden', '画面をクリックして操作を再開（マウスで視点を動かします）');
    this.root.append(this.hud, this.toasts, this.captions, this.layer, this.perf, this.clickToPlay);
    this.clickToPlay.addEventListener('click', () => game.input.requestPointerLock());
    game.renderer.domElement.addEventListener('click', () => { if (game.mode === 'play') game.input.requestPointerLock(); game.audio.start(); });
  }

  // ------------------------------------------------------------ 読み込み・タイトル・作成

  /** 全画面の切り替え（Webアプリとして遊ぶとき用） */
  toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => this.toast('この環境では全画面にできません', 'warn'));
    else document.exitFullscreen?.();
  }
  get touchOnly() { return navigator.maxTouchPoints > 0 && !matchMedia('(pointer: fine)').matches; }

  loading(msg: string) {
    this.layer.innerHTML = '';
    const el = h('div', 'loading', `<div class="logo">原環の大地<span>― ヴァルナ年代記 ―</span></div><div class="loadmsg">${esc(msg)}</div><div class="loadbar"><i></i></div>`);
    this.layer.append(el);
  }

  title() {
    this.layer.innerHTML = '';
    this.hud.classList.add('hidden');
    const g = this.game;
    const latest = g.saves.latest();
    const el = h('div', 'title');
    el.innerHTML = `
      <div class="title-inner">
        <div class="logo big">原環の大地<span>― ヴァルナ年代記 ―</span></div>
        <div class="motto">命が地形をつくり、地形が物語を隠す。</div>
        <nav class="title-menu">
          ${latest ? '<button data-a="continue">つづきから</button>' : ''}
          <button data-a="new">はじめから</button>
          ${latest ? '<button data-a="load">記録を選ぶ</button>' : ''}
          <button data-a="settings">設定</button>
          <button data-a="controls">操作説明</button>
          <button data-a="about">この試作について</button>
          <button data-a="full">全画面で遊ぶ</button>
        </nav>
        ${this.touchOnly ? '<div class="title-warn">この試作は<b>キーボード＋マウス</b>か<b>ゲームパッド</b>で遊ぶ作りです。画面に触れて操作する方法はまだありません。</div>' : ''}
        <div class="title-note">垂直スライス（試作版）・手続き生成による仮素材</div>
      </div>`;
    el.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest('button')?.dataset.a;
      if (!a) return;
      g.audio.start(); g.audio.play('ui', null);
      if (a === 'new') this.create();
      if (a === 'continue' && latest) { this.layer.innerHTML = ''; const err = g.loadSlot(latest); if (err) { this.toast(err, 'warn'); this.title(); } else this.enterPlay(); }
      if (a === 'load') this.openMenu('save', true);
      if (a === 'settings') this.openMenu('settings', true);
      if (a === 'controls') this.openMenu('controls', true);
      if (a === 'about') this.openMenu('about', true);
      if (a === 'full') this.toggleFullscreen();
    });
    this.layer.append(el);
    this.focusFirst(el);
  }

  private create() {
    const g = this.game;
    g.enterCreate();
    const app: Appearance = { ...DEFAULT_APPEARANCE };
    this.layer.innerHTML = '';
    const el = h('div', 'create');
    const swatches = (key: keyof Appearance, colors: number[]) => colors.map((c) => `<button class="sw" data-k="${key}" data-v="${c}" style="background:#${c.toString(16).padStart(6, '0')}" aria-label="色"></button>`).join('');
    el.innerHTML = `
      <div class="panel create-panel">
        <h2>渡り読みの姿</h2>
        <p class="sub">姿と名前は自由に決められます。物語の中の立場――ハセの一門の渡り読みで、姉イスカに技を教わった年下のきょうだい――は変わりません。</p>
        <label>名前 <input id="nm" maxlength="8" value="${esc(app.name)}"></label>
        <div class="row"><span>肌</span><div class="sws">${swatches('skin', SKIN_TONES)}</div></div>
        <div class="row"><span>髪</span><div class="sws">${swatches('hair', HAIR_COLORS)}</div></div>
        <div class="row"><span>髪型</span><div class="seg" data-k="hairStyle"><button data-v="tied">結い髪</button><button data-v="long">長髪</button><button data-v="short">短髪</button><button data-v="shaved">剃髪</button></div></div>
        <div class="row"><span>外套</span><div class="sws">${swatches('cloak', CLOAK_COLORS)}</div></div>
        <div class="row"><span>体格</span><input type="range" id="bd" min="0.86" max="1.14" step="0.01" value="1"></div>
        <div class="row"><span>背丈</span><input type="range" id="ht" min="0.9" max="1.08" step="0.01" value="1"></div>
        <div class="row"><span>顔の線</span><div class="seg" data-k="markings"><button data-v="1">渡り読みの印</button><button data-v="0">なし</button></div></div>
        <div class="row"><span>難易度</span><div class="seg" data-k="diff">${Object.entries(DIFFICULTY).map(([k, v]) => `<button data-v="${k}" title="${v.desc}">${v.name}</button>`).join('')}</div></div>
        <p class="sub small" id="dd">${DIFFICULTY[g.settings.difficulty].desc}（いつでも変更でき、不利益はありません）</p>
        <div class="btns"><button data-a="back">戻る</button><button class="primary" data-a="start">旅立つ</button></div>
      </div>`;
    const upd = () => { g.player.model.setAppearance(app); el.querySelectorAll('.seg button').forEach((b) => { const k = (b.parentElement as HTMLElement).dataset.k!; const v = (b as HTMLElement).dataset.v!; const cur = k === 'markings' ? (app.markings ? '1' : '0') : k === 'diff' ? g.settings.difficulty : String((app as any)[k]); b.classList.toggle('on', cur === v); }); };
    el.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (!b) return;
      g.audio.play('ui', null);
      if (b.classList.contains('sw')) (app as any)[b.dataset.k!] = Number(b.dataset.v);
      const seg = b.parentElement?.dataset.k;
      if (seg === 'hairStyle') app.hairStyle = b.dataset.v as Appearance['hairStyle'];
      if (seg === 'markings') app.markings = b.dataset.v === '1';
      if (seg === 'diff') { g.settings.difficulty = b.dataset.v as Settings['difficulty']; g.applySettings(); el.querySelector('#dd')!.textContent = DIFFICULTY[g.settings.difficulty].desc + '（いつでも変更でき、不利益はありません）'; }
      if (b.dataset.a === 'back') { g.mode = 'title'; g.player.model.root.visible = false; this.title(); return; }
      if (b.dataset.a === 'start') {
        app.name = ((el.querySelector('#nm') as HTMLInputElement).value.trim() || 'トワ').slice(0, 8);
        this.layer.innerHTML = '';
        g.newGame(app);
        this.enterPlay();
        return;
      }
      upd();
    });
    el.querySelector('#bd')!.addEventListener('input', (e) => { app.build = Number((e.target as HTMLInputElement).value); upd(); });
    el.querySelector('#ht')!.addEventListener('input', (e) => { app.height = Number((e.target as HTMLInputElement).value); upd(); });
    this.layer.append(el);
    upd();
  }

  private enterPlay() {
    this.hud.classList.remove('hidden');
    this.game.input.requestPointerLock();
    this.refreshHud();
  }

  intro(lines: string[], done: () => void) {
    const el = h('div', 'intro');
    this.layer.append(el);
    let i = 0;
    const next = () => {
      if (i >= lines.length) { el.classList.add('out'); setTimeout(() => el.remove(), 1500); done(); return; }
      el.innerHTML = `<p>${esc(lines[i])}</p><small>クリック／${this.game.input.glyph('interact')}で進む</small>`;
      i++;
    };
    next();
    const t = setInterval(() => { if (!el.isConnected) clearInterval(t); }, 1000);
    el.addEventListener('click', next);
    const key = () => { if (this.game.input.pressed('interact') || this.game.input.pressed('light')) next(); if (el.isConnected) requestAnimationFrame(key); };
    requestAnimationFrame(key);
  }

  // ------------------------------------------------------------ HUD

  refreshHud() {
    const g = this.game;
    const s = g.state;
    // 追跡中の目的
    const qid = this.trackedQuest();
    if (qid) {
      const q = s.quests[qid];
      const def = QUESTS[qid];
      const st = def.stages[Math.min(q.stage, def.stages.length - 1)];
      this.objective.innerHTML = `<b>${esc(def.title)}</b><span>${esc(st.text)}</span>`;
      this.objective.classList.remove('hidden');
    } else this.objective.classList.add('hidden');
    this.vitalsFade = 4;
  }

  trackedQuest(): string | null {
    const s = this.game.state;
    const t = s.flags.tracked as string | undefined;
    if (t && s.quests[t] && !s.quests[t].done) return t;
    const order = ['prologue', 'main_orga', 'bond_kohaku', 'side_fence', 'tower', 'jade_gate'];
    for (const id of order) if (s.quests[id] && !s.quests[id].done) return id;
    return null;
  }

  /** 目的の場所（ヒントの2段目を開いたときだけ方位に出す） */
  questTarget(id: string): { x: number; z: number } | null {
    const s = this.game.state;
    const q = s.quests[id];
    if (!q) return null;
    const k = this.game.kohaku;
    const map: Record<string, ({ x: number; z: number } | null)[]> = {
      prologue: [{ x: -500, z: 237 }, P.camp],
      main_orga: [P.clearing, P.clearing, P.camp],
      tower: [P.tower],
      side_fence: [{ x: -226, z: 164 }, { x: P.camp.x + 7, z: P.camp.z + 8 }, { x: -226, z: 164 }, P.camp],
      bond_kohaku: [k ? { x: k.pos.x, z: k.pos.z } : null, k ? { x: k.pos.x, z: k.pos.z } : null, { x: -8, z: -118 }, k ? { x: k.pos.x, z: k.pos.z } : null, { x: P.camp.x + 13, z: P.camp.z + 3 }],
      jade_gate: [P.rootTunnel],
    };
    return map[id]?.[q.stage] ?? null;
  }

  private keyNav() {
    const g = this.game;
    const I = g.input;
    if (this.dialogueEl && this.dlg) {
      if (!this.dlg.d.choices || this.dlg.i < this.dlg.d.lines.length - 1) { if (I.pressed('interact')) this.advanceDialogue(); }
      return;
    }
    if (this.menuEl && g.mode === 'menu' && (I.pressed('pause') || I.pressed('notebook') || I.pressed('map'))) this.closeModal();
  }

  hudFrame(dt: number) {
    const g = this.game;
    this.keyNav();
    this.pollPad();
    if (g.mode !== 'play' && g.mode !== 'dialogue') { this.updatePerf(dt); return; }
    const p = g.player;
    // 方位（北＝-z）。カメラの向きを中心に帯を動かす
    const yaw = g.cam.yaw;
    const heading = Math.atan2(Math.sin(yaw), -Math.cos(yaw)); // 北=0 東=+
    const px = 3.2; // 1度あたりの px
    const deg = (heading * 180) / Math.PI;
    this.compassStrip.style.transform = `translateX(${-deg * px}px)`;
    // 風：吹いていく方向を線で示す
    const w = g.world.wind;
    const windHeading = Math.atan2(Math.cos(w.dir), -Math.sin(w.dir));
    let rel = ((windHeading - heading) * 180) / Math.PI;
    rel = ((rel + 540) % 360) - 180;
    const skill = g.state.skills.includes('windread');
    this.windLine.style.transform = `translateX(${clamp(rel, -120, 120) * px}px)`;
    this.windLine.style.opacity = String(Math.abs(rel) > 120 ? 0.25 : 0.55 + w.strength * 0.45);
    this.windLine.dataset.label = skill ? `風下へ ${Math.round(w.strength * 10)}` : '風';
    // 目的の方位（ヒント2段目以降）
    const qid = this.trackedQuest();
    const tgt = qid && (g.state.quests[qid].hints >= 2) ? this.questTarget(qid) : null;
    let marker = this.compass.querySelector('.qmark') as HTMLElement | null;
    if (tgt) {
      if (!marker) { marker = h('div', 'qmark', '◆'); this.compass.append(marker); }
      const a = Math.atan2(tgt.x - p.pos.x, -(tgt.z - p.pos.z));
      let r = ((a - heading) * 180) / Math.PI; r = ((r + 540) % 360) - 180;
      marker.style.transform = `translateX(${clamp(r, -120, 120) * px}px)`;
      marker.title = `${Math.round(Math.hypot(tgt.x - p.pos.x, tgt.z - p.pos.z))}m`;
    } else marker?.remove();
    // 体力とスタミナ（変化したときだけ出す）
    const full = p.hp >= p.maxHp - 0.5 && p.stamina >= p.maxStamina - 0.5;
    if (!full || g.orga.fighting || p.aiming) this.vitalsFade = 3;
    this.vitalsFade -= dt;
    this.vitals.style.opacity = String(clamp(this.vitalsFade, 0, 1));
    const tool = p.toolIndex === 0 ? `音玉 ${p.tools.noise}` : `煙玉 ${p.tools.smoke}`;
    this.vitals.innerHTML = `<div class="bar hp"><i style="width:${(p.hp / p.maxHp) * 100}%"></i></div><div class="bar st"><i style="width:${(p.stamina / p.maxStamina) * 100}%"></i></div><div class="inv">投石 ${p.stones}/${p.maxStones}　${tool}${p.mount ? '　騎乗中' : ''}${p.climbing ? '　背の上' : ''}</div>`;
    this.crosshair.classList.toggle('hidden', !p.aiming);
    // ボス
    const o = g.orga;
    if (o.fighting || o.phase === 'extract') {
      this.bossBar.classList.remove('hidden');
      const pins = o.pins.map((x) => (x.broken ? '◇' : x.exposed ? '◆' : '■')).join(' ');
      const phaseName = { p1: '苛立ち', p2: '痛みの共鳴', p3: '守る王', exhausted: '膝をついた', extract: '引き抜き' }[o.phase as string] ?? '';
      const action = o.vulnerable() ? '<em>いまが好機</em>' : o.action.endsWith('Tele') ? '<em class="warn">予兆</em>' : '';
      this.bossBar.innerHTML = `<div class="bname">翠角王オルガ<span>${phaseName}</span></div><div class="pins" title="◆露出した杭 ■埋まった杭 ◇壊した杭">導き杭　${pins}</div>${action}${o.phase === 'extract' ? `<div class="bar ex${o.shudder > 0 ? ' shake' : ''}"><i style="width:${o.extractProgress * 100}%"></i></div>` : ''}`;
    } else this.bossBar.classList.add('hidden');
    this.updatePerf(dt);
  }

  private updatePerf(dt: number) {
    if (!this.perfOn) return;
    this.perfT += dt;
    if (this.perfT < 0.5) return;
    this.perfT = 0;
    const g = this.game;
    const t = [...g.times].sort((a, b) => a - b);
    const avg = t.reduce((a, b) => a + b, 0) / Math.max(1, t.length);
    const info = g.renderer.info;
    const heap = (performance as any).memory?.usedJSHeapSize;
    this.perf.textContent = `平均 ${avg.toFixed(1)}ms (${(1000 / avg).toFixed(0)}fps)  95% ${t[Math.floor(t.length * 0.95)]?.toFixed(1)}ms  99% ${t[Math.floor(t.length * 0.99)]?.toFixed(1)}ms\n描画 ${info.render.calls}回  三角形 ${(info.render.triangles / 1000).toFixed(0)}k  テクスチャ ${info.memory.textures}  形状 ${info.memory.geometries}\n生物 ${g.eco.creatures.length}（表示 ${g.eco.creatures.filter((c) => c.rig.root.visible).length}）${heap ? `  JSヒープ ${(heap / 1048576).toFixed(0)}MB` : ''}\n画質 ${g.settings.quality} 解像度倍率 ${g.settings.renderScale}  ${g.world.clock.label()} ${WEATHER_NAMES[g.world.weather.kind as keyof typeof WEATHER_NAMES] ?? ''}\n位置 ${g.player.pos.x.toFixed(0)}, ${g.player.pos.z.toFixed(0)}`;
  }
  togglePerf() { this.perfOn = !this.perfOn; this.perf.classList.toggle('hidden', !this.perfOn); }

  prompt(label: string | null, glyph = '', progress = -1, warn = false) {
    if (!label) { this.promptEl.classList.add('hidden'); return; }
    this.promptEl.classList.remove('hidden');
    const ring = progress >= 0 ? `<i class="ring" style="--p:${clamp(progress, 0, 1) * 360}deg"></i>` : '';
    const html = `<kbd>${esc(glyph)}${ring}</kbd><span>${esc(label)}</span>`;
    if (this.promptEl.innerHTML !== html) this.promptEl.innerHTML = html;
    this.promptEl.classList.toggle('warn', warn);
  }

  toast(text: string, kind = 'info') {
    const el = h('div', 'toast ' + kind, esc(text));
    this.toasts.prepend(el);
    while (this.toasts.children.length > 5) this.toasts.lastChild!.remove();
    setTimeout(() => el.classList.add('out'), kind === 'quest' ? 6500 : 4800);
    setTimeout(() => el.remove(), kind === 'quest' ? 7500 : 5800);
  }

  caption(c: Caption) {
    const g = this.game;
    if (!g.settings.soundCaptions || g.mode === 'title' || g.mode === 'create') return;
    const el = h('div', 'cap', `〔${esc(c.text)}${c.dir ? '　' + c.dir : ''}〕`);
    this.captions.append(el);
    while (this.captions.children.length > 3) this.captions.firstChild!.remove();
    setTimeout(() => el.remove(), 3800);
  }

  codexToast(name: string, text: string, first: boolean) { this.toast(`${first ? '図鑑に新しい生き物' : '図鑑'}：${name} ― ${text}`, first ? 'codex first' : 'codex'); }
  insight(n: number, why: string) { this.toast(`気づき +${n}　${why}`, 'insight'); }
  notebookPulse() { this.objective.classList.add('pulse'); setTimeout(() => this.objective.classList.remove('pulse'), 1200); }
  deduction(title: string, text: string) {
    const el = h('div', 'deduction', `<small>推理がつながった</small><b>${esc(title)}</b><p>${esc(text)}</p>`);
    this.layer.append(el);
    this.game.audio.play('discover', null, 0.8);
    setTimeout(() => el.classList.add('out'), 7000);
    setTimeout(() => el.remove(), 8200);
  }
  reading(title: string, text: string) {
    this.layer.querySelector('.reading')?.remove();
    const el = h('div', 'reading', `<small>調査手帳</small><b>${esc(title)}</b><p>${esc(text)}</p>`);
    this.layer.append(el);
    setTimeout(() => el.classList.add('out'), 6500);
    setTimeout(() => el.remove(), 7500);
  }
  placeTitle(name: string, sub: string, vista: boolean) {
    const el = h('div', 'placetitle' + (vista ? ' vista' : ''), `<b>${esc(name)}</b><span>${esc(sub)}</span>`);
    this.layer.append(el);
    setTimeout(() => el.classList.add('out'), vista ? 5500 : 3500);
    setTimeout(() => el.remove(), vista ? 7000 : 4600);
  }
  bossTitle(name: string) {
    const el = h('div', 'placetitle boss', `<b>${esc(name)}</b><span>樹海と草海の境の王</span>`);
    this.layer.append(el);
    setTimeout(() => el.classList.add('out'), 3500);
    setTimeout(() => el.remove(), 4600);
  }
  resolved(name: string, method: string) {
    const el = h('div', 'placetitle resolved', `<b>${esc(name)}</b><span>危機の解決 ― ${esc(method)}</span>`);
    this.layer.append(el);
    setTimeout(() => el.classList.add('out'), 6000);
    setTimeout(() => el.remove(), 7200);
  }
  saveIndicator(ok: boolean) { this.saveDot.classList.add('on'); this.saveDot.textContent = ok ? '自動記録' : '記録できません'; setTimeout(() => this.saveDot.classList.remove('on'), 1800); }
  damageFlash(from: THREE.Vector3, pos: THREE.Vector3, camYaw: number) {
    const a = Math.atan2(from.x - pos.x, from.z - pos.z) - camYaw;
    this.damageEl.style.setProperty('--a', `${(-a * 180) / Math.PI}deg`);
    this.damageEl.classList.remove('on'); void this.damageEl.offsetWidth; this.damageEl.classList.add('on');
  }
  listenMarks(marks: { yaw: number; strength: number; name: string }[], camYaw: number) {
    if (!marks.length) { if (this.listenEl.innerHTML) this.listenEl.innerHTML = ''; return; }
    this.listenEl.innerHTML = marks.slice(0, 12).map((m) => {
      const a = m.yaw - camYaw;
      const deg = (-a * 180) / Math.PI;
      return `<i style="transform:rotate(${deg}deg) translateY(-34vh);opacity:${0.25 + m.strength * 0.7}" title="${esc(m.name)}"></i>`;
    }).join('');
  }
  showClickToPlay(on: boolean) { this.clickToPlay.classList.toggle('hidden', !on || !!this.menuEl || !!this.dialogueEl); }

  hint(key: string) {
    const I = this.game.input;
    const pad = I.lastDevice === 'pad';
    const H: Record<string, string> = {
      move: pad ? '左スティックで歩く／右スティックで見回す／L3で走る' : 'WASDで歩く／マウスで見回す／Shiftで走る／Cでしゃがむ',
      print: `足跡の深さは重さ、間隔は速さ、崩れ具合は時間を語る。${pad ? '←長押し' : 'Tab長押し'}で耳を澄ますと、周りの気配の方向が分かる`,
      wind: '方位の上の細い線が「風の吹いていく向き」。線の反対側（風上）から近づくと匂いで気づかれる',
      crouch: `${I.glyph('crouch')}でしゃがむと、足音が小さく、草に隠れて見えにくくなる`,
      fight: `${I.glyph('light')}軽攻撃／${I.glyph('heavy')}長押しで重攻撃／${I.glyph('dodge')}回避／${I.glyph('aim')}構えて${I.glyph('fire')}で投石／${I.glyph('lockon')}注目`,
      ride: `${I.glyph('whistle')}の口笛でコハクを呼ぶ。近くで${I.glyph('interact')}で乗る。${I.glyph('sprint')}で駆ける`,
    };
    const t = H[key];
    if (!t) return;
    this.hintEl.innerHTML = esc(t);
    this.hintEl.classList.remove('hidden');
    clearTimeout((this.hintEl as any)._t);
    (this.hintEl as any)._t = setTimeout(() => this.hintEl.classList.add('hidden'), 11000);
  }

  death(who: string) {
    this.deathEl?.remove();
    this.deathEl = h('div', 'death', `<b>倒れた</b><span>${esc(who)}に打ち倒された。まもなく目を覚ます…</span>`);
    this.layer.append(this.deathEl);
  }
  hideDeath() { this.deathEl?.remove(); this.deathEl = null; }

  fatal(msg: string) {
    if (this.root.querySelector('.fatal')) return;
    const el = h('div', 'fatal', `<b>問題が起きました</b><p>${esc(msg)}</p><p>自動記録から再開できます。ページを再読み込みしてください。</p>`);
    this.root.append(el);
  }

  // ------------------------------------------------------------ 会話

  dialogue(d: Dialogue, onAction: (a: string) => void) {
    this.dialogueEl?.remove();
    this.dlg = { d, i: 0, onAction };
    this.dialogueEl = h('div', 'dialogue');
    this.layer.append(this.dialogueEl);
    this.game.mode = 'dialogue';
    removeEventListener('keydown', this.onDigit);
    addEventListener('keydown', this.onDigit);
    this.renderDialogue();
    this.dialogueEl.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (b?.dataset.act !== undefined) { this.chooseDialogue(b.dataset.act!); return; }
      this.advanceDialogue();
    });
  }
  private onDigit = (e: KeyboardEvent) => {
    if (!this.dlg || !this.dlg.d.choices || this.dlg.i < this.dlg.d.lines.length - 1) return;
    const n = Number(e.key);
    const c = this.dlg.d.choices[n - 1];
    if (c) this.chooseDialogue(c.action);
  };
  private renderDialogue() {
    const s = this.dlg!;
    const line = s.d.lines[s.i];
    const last = s.i >= s.d.lines.length - 1;
    const choices = last && s.d.choices ? `<div class="choices">${s.d.choices.map((c, k) => `<button data-act="${c.action}">${k + 1}. ${c.tone ? `<small>${c.tone}</small>` : ''}${esc(c.label)}</button>`).join('')}</div>` : '';
    this.dialogueEl!.innerHTML = `<div class="who">${esc(line.who)}</div><p>${esc(line.text)}</p>${choices}${!choices ? `<small class="next">${last ? '閉じる' : '次へ'}（${this.game.input.glyph('interact')}／クリック）</small>` : ''}`;
    if (choices) this.focusFirst(this.dialogueEl!);
  }
  private advanceDialogue() {
    const s = this.dlg;
    if (!s) return;
    if (s.i < s.d.lines.length - 1) { s.i++; this.renderDialogue(); return; }
    if (s.d.choices) return;
    const act = s.d.action;
    this.closeDialogue();
    if (act) s.onAction(act);
  }
  private chooseDialogue(act: string) {
    const s = this.dlg!;
    this.closeDialogue();
    this.game.audio.play('ui', null);
    s.onAction(act);
  }
  private closeDialogue() {
    this.dialogueEl?.remove(); this.dialogueEl = null; this.dlg = null;
    if (this.game.mode === 'dialogue') this.game.mode = 'play';
    this.game.onDialogueClosed();
    if (this.game.mode === 'play') this.game.input.requestPointerLock();
  }

  // ------------------------------------------------------------ 休息・壁画・博物館

  restMenu() {
    const g = this.game;
    g.mode = 'menu';
    g.input.releasePointerLock();
    const fc = g.world.clock.forecast(12).map((f) => `<li><b>${Math.floor(f.hour)}時</b>${WEATHER_NAMES[f.kind]}</li>`).join('');
    const el = this.modal(`<h2>焚き火</h2>
      <p class="sub">いまは ${g.world.clock.label()}（${g.world.clock.phaseName()}）。休むと体力が戻り、自動で記録されます。</p>
      <h3>空読み（これから12時間の天気）</h3><ul class="forecast">${fc}</ul>
      <p class="sub small">朝霧は夜明けに出やすく、昼までに晴れます。夜は草海でホタルゴケムシが光ります。</p>
      <div class="btns wrap"><button data-h="5.4">夜明けまで</button><button data-h="9">朝まで</button><button data-h="13">昼まで</button><button data-h="18.3">夕暮れまで</button><button data-h="21.5">夜まで</button></div>
      <div class="btns"><button data-a="save">記録する</button><button data-a="close">閉じる</button></div>`);
    el.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (!b) return;
      if (b.dataset.h) { if (g.rest(Number(b.dataset.h))) this.closeModal(); }
      if (b.dataset.a === 'save') this.openMenu('save');
      if (b.dataset.a === 'close') this.closeModal();
    });
  }

  mural() {
    const g = this.game;
    g.mode = 'menu';
    g.input.releasePointerLock();
    const el = this.modal(`<h2>塔の壁画</h2>
      <div class="mural-draw">
        <div class="suns"><span>◓<i>壱</i></span><span class="top">●<i>弐</i></span><span>◒<i>参</i></span></div>
        <div class="herd">〜〜 群れの行列 〜〜</div>
        <div class="ring">⌒⌒⌒⌒⌒⌒　◉　⌒⌒⌒⌒⌒⌒</div>
      </div>
      <p>昇る日（東）・天の頂の日（南）・沈む日（西）。弧を描く点線がそれらを結び、下に群れの行列と、大地を抱く節のある環――その中央に眼がある。</p>
      <p class="sub">塔の北側には、回せる輪石が三つ並んでいる。</p>
      <div class="btns"><button data-a="close">閉じる</button></div>`);
    el.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('button')) this.closeModal(); });
  }

  museum(photos = false) {
    const g = this.game;
    g.mode = 'menu';
    g.input.releasePointerLock();
    const s = g.state;
    const items = Object.entries(MUSEUM_ITEMS).map(([id, it]) => s.museum.includes(id) ? `<li><b>${esc(it.name)}</b><span>${esc(it.desc)}</span></li>` : `<li class="dim"><b>？？？</b><span>まだ見つけていない</span></li>`).join('');
    const pics = s.photos.length ? s.photos.map((p) => `<img src="${p}" alt="写真">`).join('') : '<p class="sub">まだ写真がない。フォトモード（P）で撮った写真がここに飾られる。</p>';
    const el = this.modal(photos ? `<h2>写真の板</h2><div class="photos">${pics}</div><div class="btns"><button data-a="close">閉じる</button></div>`
      : `<h2>展示棚</h2><p class="sub">旅で見つけた物が、実際に棚に並ぶ。野営地の人々もそれを見て話す。</p><ul class="museum">${items}</ul><div class="btns"><button data-a="close">閉じる</button></div>`);
    el.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('button')) this.closeModal(); });
  }

  endOfSlice() {
    const g = this.game;
    if (g.endShown) return;
    g.endShown = true;
    g.mode = 'menu';
    g.input.releasePointerLock();
    const s = g.state;
    const codexN = Object.values(s.codex).filter((v) => v.includes('seen')).length;
    const obsN = Object.values(s.codex).reduce((a, v) => a + v.length, 0);
    const mins = Math.round(s.playSeconds / 60);
    const proofs = ['proof_orga', 'proof_fence'].filter((k) => s.flags[k]).length;
    const el = this.modal(`<h2>根の地下道</h2>
      <p>根に抱かれた門石の奥は、暗く湿った空気が流れている。渡りの民によれば、この道は潮鏡の内海へ続いているという。姉の足跡も、きっとこの先だ。</p>
      <div class="summary"><div><b>${mins}</b>分</div><div><b>${codexN}</b>種の生き物</div><div><b>${obsN}</b>の観察</div><div><b>${s.clues.length}</b>の手がかり</div><div><b>${proofs}</b>の共存の実証</div></div>
      <p class="sub">この垂直スライスで遊べるのはここまでです。地下道の先（潮鏡の内海）はまだ制作していません。このまま草海と樹海を歩き続け、図鑑や記録を集めることはできます。</p>
      <div class="btns"><button data-a="stay">歩き続ける</button><button data-a="title">タイトルへ</button></div>`);
    el.addEventListener('click', (e) => {
      const a = ((e.target as HTMLElement).closest('button') as HTMLElement | null)?.dataset.a;
      if (a === 'stay') this.closeModal();
      if (a === 'title') { g.autosave('end'); location.reload(); }
    });
  }

  private modal(html: string) {
    this.closeModal(false);
    const wrap = h('div', 'modalwrap');
    const el = h('div', 'panel modal', html);
    wrap.append(el);
    this.layer.append(wrap);
    this.menuEl = wrap;
    this.focusFirst(el);
    return el;
  }
  closeModal(resume = true) {
    this.menuEl?.remove();
    this.menuEl = null;
    const g = this.game;
    if (resume && (g.mode === 'menu')) { g.mode = 'play'; g.input.requestPointerLock(); }
  }
  get isMenuOpen() { return !!this.menuEl; }

  // ------------------------------------------------------------ メニュー（手帳・図鑑・地図・記録・設定）

  openMenu(tab: Tab, fromTitle = false) {
    const g = this.game;
    if (!fromTitle) { g.mode = 'menu'; g.input.releasePointerLock(); }
    this.menuTab = tab;
    this.closeModal(false);
    const wrap = h('div', 'modalwrap menu');
    const tabs: [Tab, string][] = fromTitle ? [['save', '記録'], ['settings', '設定'], ['controls', '操作'], ['about', 'この試作について']]
      : [['main', 'メニュー'], ['quests', '目的'], ['clues', '手がかり'], ['codex', '図鑑'], ['records', '記録文書'], ['skills', '成長'], ['map', '地図'], ['save', 'セーブ'], ['settings', '設定'], ['controls', '操作']];
    const el = h('div', 'panel book');
    el.innerHTML = `<nav class="tabs">${tabs.map(([k, v]) => `<button data-tab="${k}" class="${k === tab ? 'on' : ''}">${v}</button>`).join('')}<button data-close class="x" aria-label="閉じる">×</button></nav><div class="page"></div>`;
    wrap.append(el);
    this.layer.append(wrap);
    this.menuEl = wrap;
    el.querySelector('nav')!.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (!b) return;
      g.audio.play('ui', null);
      if (b.dataset.close !== undefined) { if (fromTitle) { this.closeModal(false); this.title(); } else this.closeModal(); return; }
      this.openMenu(b.dataset.tab as Tab, fromTitle);
    });
    const page = el.querySelector('.page') as HTMLElement;
    this.renderPage(tab, page, fromTitle);
    this.focusFirst(el);
  }

  private renderPage(tab: Tab, page: HTMLElement, fromTitle: boolean) {
    const g = this.game;
    const s = g.state;
    if (tab === 'main') {
      page.innerHTML = `<h2>${esc(s.appearance.name)}の旅</h2>
        <p class="sub">${g.world.clock.label()}（${g.world.clock.phaseName()}・${WEATHER_NAMES[g.world.weather.kind as keyof typeof WEATHER_NAMES]}）　旅の時間 ${Math.floor(s.playSeconds / 60)}分　気づき ${g.insightFree()}（未使用）</p>
        <div class="btns col"><button data-a="resume">旅を続ける</button><button data-a="photo">フォトモード</button><button data-a="full">全画面の切り替え</button><button data-a="title">タイトルへ戻る（未記録の進行は自動記録まで戻ります）</button></div>`;
      page.addEventListener('click', (e) => {
        const a = ((e.target as HTMLElement).closest('button') as HTMLElement | null)?.dataset.a;
        if (a === 'resume') this.closeModal();
        if (a === 'photo') { this.closeModal(false); g.enterPhoto(); }
        if (a === 'full') this.toggleFullscreen();
        if (a === 'title') { g.autosave('title'); location.reload(); }
      });
    }
    if (tab === 'quests') {
      const ids = Object.keys(s.quests);
      const tracked = this.trackedQuest();
      page.innerHTML = `<h2>目的</h2>${ids.length ? '' : '<p class="sub">まだ目的はない。</p>'}` + ids.map((id) => {
        const q = s.quests[id], def = QUESTS[id];
        const st = def.stages[Math.min(q.stage, def.stages.length - 1)];
        const hints = q.done ? '' : [0, 1, 2].filter((k) => st.hints[k]).map((k) => k < q.hints ? `<li>${esc(st.hints[k])}</li>` : k === q.hints ? `<li><button data-hint="${id}">ヒント${k + 1}を見る（${['気づき', '方向', '答えに近い説明'][k]}）</button></li>` : '').join('');
        const past = def.stages.slice(0, q.stage).map((x) => `<li class="done">${esc(x.text)}</li>`).join('');
        return `<section class="quest ${q.done ? 'done' : ''}"><h3>${esc(def.title)}<small>${def.kind === 'main' ? '物語' : def.kind === 'ruin' ? '遺跡' : '依頼'}・${esc(def.giver)}</small>${!q.done ? `<button class="track ${tracked === id ? 'on' : ''}" data-track="${id}">${tracked === id ? '追跡中' : '追跡する'}</button>` : '<em>完了</em>'}</h3>
          <ul class="stages">${past}${q.done ? '' : `<li class="cur">${esc(st.text)}</li>`}</ul>${hints ? `<ul class="hints">${hints}</ul>` : ''}${q.outcome ? `<p class="sub">結末：${q.outcome === 'gap' ? '柵の下に小さな通り道を開けた' : q.outcome === 'cut' ? '棘の茂みを自分で刈った' : esc(q.outcome)}</p>` : ''}</section>`;
      }).join('');
      page.addEventListener('click', (e) => {
        const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
        if (!b) return;
        if (b.dataset.hint) { s.quests[b.dataset.hint].hints++; this.openMenu('quests'); }
        if (b.dataset.track) { s.flags.tracked = b.dataset.track; this.refreshHud(); this.openMenu('quests'); }
      });
    }
    if (tab === 'clues') {
      const deds = s.deductions.map((d) => `<li class="ded"><b>${esc(DEDUCTIONS[d].title)}</b><p>${esc(DEDUCTIONS[d].text)}</p></li>`).join('');
      const clues = s.clues.map((c) => `<li><b>${esc(CLUES[c].title)}</b><p>${esc(CLUES[c].text)}</p></li>`).join('');
      const open = Object.values(DEDUCTIONS).filter((d) => !s.deductions.includes(d.id) && d.needs.some((set) => set.some((t) => s.clues.includes(t)))).map((d) => `<li class="dim"><b>${esc(d.title)}？</b><p>手がかりがもう一つあれば、つながりそうだ。</p></li>`).join('');
      page.innerHTML = `<h2>手がかりと推理</h2><p class="sub">手がかりを二つ以上つなぐと推理になる。推理は次の行き先を示す。</p><h3>推理</h3><ul class="clues">${deds || '<li class="dim">まだない</li>'}${open}</ul><h3>手がかり</h3><ul class="clues">${clues || '<li class="dim">まだない</li>'}</ul>`;
    }
    if (tab === 'records') {
      page.innerHTML = `<h2>文明の記録</h2><p class="sub">遺跡や岩に残る文字と印。ヴァルナの歴史の断片。</p><ul class="clues">${Object.values(RECORDS).map((r) => s.records.includes(r.id) ? `<li><b>${esc(r.title)}</b><small>時代：${esc(r.era)}</small><p>${esc(r.text)}</p></li>` : '<li class="dim"><b>？？？</b></li>').join('')}</ul>`;
    }
    if (tab === 'codex') this.renderCodex(page);
    if (tab === 'skills') this.renderSkills(page);
    if (tab === 'map') this.renderMap(page);
    if (tab === 'save') this.renderSave(page, fromTitle);
    if (tab === 'settings') this.renderSettings(page);
    if (tab === 'controls') this.renderControls(page);
    if (tab === 'about') this.renderAbout(page);
  }

  private renderCodex(page: HTMLElement) {
    const s = this.game.state;
    const all = CODEX_ORDER.map((id) => ({ id, def: (SPECIES[id] ?? (SMALL_SPECIES as any)[id]) as { name: string; obs: ObsId[]; motif: string; fossil: string; varuna: string; role: string; researchType: string } }));
    const list = all.map(({ id, def }) => {
      const got = s.codex[id] ?? [];
      const seen = got.includes('seen');
      const pct = Math.round((got.filter((o) => def.obs.includes(o as ObsId)).length / def.obs.length) * 100);
      return `<button data-sp="${id}" class="${id === this.codexSel ? 'on' : ''} ${seen ? '' : 'dim'}">${seen ? esc(def.name) : '？？？'}<small>${seen ? pct + '%' : ''}</small></button>`;
    }).join('');
    const cur = all.find((x) => x.id === this.codexSel) ?? all[0];
    const got = s.codex[cur.id] ?? [];
    const seen = got.includes('seen');
    const detail = seen ? `<h3>${esc(cur.def.name)}</h3><p class="motif">モチーフ：${esc(cur.def.motif)}　研究の型：${esc(cur.def.researchType)}${s.flags['photo_' + cur.id] ? '　📷写真あり' : ''}</p>
      <div class="fact real"><b>【化石からわかること】</b><p>${esc(cur.def.fossil)}</p></div>
      <div class="fact fic"><b>【ヴァルナでの姿】</b><p>${got.length >= 2 ? esc(cur.def.varuna) : 'もっと観察すると分かる。'}</p></div>
      <p><b>生態系での役割：</b>${got.length >= 3 ? esc(cur.def.role) : '？'}</p>
      <ul class="obs">${cur.def.obs.map((o) => `<li class="${got.includes(o as string) ? 'ok' : ''}">${got.includes(o) ? '✓' : '・'} ${OBS_TEXT[o]}</li>`).join('')}</ul>`
      : '<p class="sub">まだ出会っていない。足跡や鳴き声が手がかりになる。</p>';
    const total = all.filter(({ id }) => (s.codex[id] ?? []).includes('seen')).length;
    page.innerHTML = `<h2>生態図鑑 <small>${total}/${all.length}種（垂直スライスの範囲）</small></h2><div class="codex-grid"><div class="clist">${list}</div><div class="cdetail">${detail}</div></div>
      <p class="sub small">【化石からわかること】は実在の古生物学の知見、【ヴァルナでの姿】はこの世界独自の創作です。</p>`;
    page.querySelector('.clist')!.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest('button') as HTMLElement | null; if (b?.dataset.sp) { this.codexSel = b.dataset.sp; this.openMenu('codex'); } });
  }

  private renderSkills(page: HTMLElement) {
    const g = this.game;
    const s = g.state;
    const areas = ['戦闘', '探索', '生態理解', '工作'] as const;
    page.innerHTML = `<h2>成長 <small>気づき ${g.insightFree()} / 合計 ${s.insight}</small></h2>
      <p class="sub">気づきは、生き物を観察し、手がかりをつなぎ、人を助けると得られる。技能はいつでも無料で振り直せる。</p>
      <div class="skills">${areas.map((a) => `<section><h3>${a}</h3>${SKILLS.filter((k) => k.area === a).map((k) => {
        const have = s.skills.includes(k.id);
        return `<div class="skill ${have ? 'have' : ''}"><b>${esc(k.name)}</b><span>${esc(k.desc)}</span>${have ? '<em>習得済み</em>' : `<button data-sk="${k.id}" ${g.insightFree() < k.cost ? 'disabled' : ''}>習得（${k.cost}）</button>`}</div>`;
      }).join('')}</section>`).join('')}</div>
      <div class="btns"><button data-reset>振り直す（無料）</button></div>`;
    page.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (!b) return;
      if (b.dataset.sk) { g.learnSkill(b.dataset.sk); this.openMenu('skills'); }
      if (b.dataset.reset !== undefined) { g.resetSkills(); this.openMenu('skills'); }
    });
  }

  private buildMapImage() {
    if (this.mapImage) return this.mapImage;
    const g = this.game;
    const N = 400;
    const cv = document.createElement('canvas');
    cv.width = cv.height = N;
    const ctx = cv.getContext('2d')!;
    const img = ctx.createImageData(N, N);
    const T = g.world.terrain;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const x = -MAP_HALF + (i / N) * MAP_HALF * 2, z = -MAP_HALF + (j / N) * MAP_HALF * 2;
      const y = T.height(x, z);
      const shade = clamp(0.75 + (T.height(x - 4, z - 4) - T.height(x + 4, z + 4)) * 0.06, 0.45, 1.3);
      const J = T.jungleAt(x, z);
      let r = 196 - J * 90, gg = 184 - J * 50, b = 138 - J * 60;
      if (y > 60) { r = 170; gg = 160; b = 150; }
      const wl = T.waterLevel(x, z);
      if (wl !== -Infinity && wl > y) { r = 92; gg = 128; b = 128; }
      if (T.mudAt(x, z) > 0.5) { r = 110; gg = 90; b = 70; }
      const k = (j * N + i) * 4;
      img.data[k] = r * shade; img.data[k + 1] = gg * shade; img.data[k + 2] = b * shade; img.data[k + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    this.mapImage = cv;
    return cv;
  }

  private renderMap(page: HTMLElement) {
    const g = this.game;
    const s = g.state;
    page.innerHTML = `<h2>地図 <small>歩いた場所・見た場所が描かれていく。クリックで印を置く／消す</small></h2><div class="mapwrap"><canvas width="720" height="720"></canvas></div>`;
    const cv = page.querySelector('canvas') as HTMLCanvasElement;
    const ctx = cv.getContext('2d')!;
    const S = 720;
    const toC = (x: number, z: number) => [((x + MAP_HALF) / (MAP_HALF * 2)) * S, ((z + MAP_HALF) / (MAP_HALF * 2)) * S];
    const pins = (s.flags.pins as string | undefined)?.split(';').filter(Boolean).map((p) => p.split(',').map(Number)) ?? [];
    const draw = () => {
      ctx.fillStyle = '#1a1712'; ctx.fillRect(0, 0, S, S);
      ctx.drawImage(this.buildMapImage(), 0, 0, S, S);
      // 未踏の霧
      const cell = S / 64;
      ctx.fillStyle = 'rgba(26,23,18,0.92)';
      for (let j = 0; j < 64; j++) for (let i = 0; i < 64; i++) if (!g.mapBits[j * 64 + i]) ctx.fillRect(i * cell - 0.5, j * cell - 0.5, cell + 1, cell + 1);
      // 発見した場所
      ctx.font = '14px "Yu Mincho", serif'; ctx.textAlign = 'center';
      const disc: Record<string, { x: number; z: number; n: string }> = {
        hill: { ...P.startHill, n: '渡りの丘' }, camp: { ...P.camp, n: '野営地' }, ford: { ...P.ford, n: '浅瀬の渡し' }, tower: { ...P.tower, n: '見張り塔' },
        clearing: { ...P.clearing, n: '倒木地帯' }, jade_edge: { ...P.jadeEdge, n: '翡翠の縁' }, nine: { ...P.nineStones, n: '九本石' }, slab: { ...P.fossilSlab, n: '古い群れの道' },
        sandbank: { ...P.sandbank, n: '砂州' }, grove: { ...P.grove, n: 'ソテツの茂み' }, ravine: { x: 360, z: -200, n: '根の谷' }, jade_gate: { ...P.jadeGate, n: '翡翠の門' }, tunnel: { ...P.rootTunnel, n: '根の地下道' },
      };
      for (const id of s.discovered) {
        const d = disc[id]; if (!d) continue;
        const [x, y] = toC(d.x, d.z);
        ctx.fillStyle = '#f0e2b6'; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
        ctx.fillStyle = 'rgba(20,16,10,0.75)'; ctx.fillText(d.n, x + 1, y - 7);
        ctx.fillStyle = '#f7ecc8'; ctx.fillText(d.n, x, y - 8);
      }
      // 自分の印
      for (const [px, pz] of pins) { const [x, y] = toC(px, pz); ctx.strokeStyle = '#e8b04a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x + 6, y); ctx.lineTo(x, y + 10); ctx.lineTo(x - 6, y); ctx.closePath(); ctx.stroke(); }
      // 目的（ヒント2段目以降）
      const qid = this.trackedQuest();
      const tgt = qid && s.quests[qid].hints >= 2 ? this.questTarget(qid) : null;
      if (tgt) { const [x, y] = toC(tgt.x, tgt.z); ctx.strokeStyle = '#e2c46a'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(x, y, 18, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
      // 自分
      const p = g.player.pos;
      const [x, y] = toC(p.x, p.z);
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI - g.player.yaw);
      ctx.fillStyle = '#fff4d6'; ctx.strokeStyle = '#2a2014'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(7, 8); ctx.lineTo(0, 4); ctx.lineTo(-7, 8); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
      // 方位
      ctx.fillStyle = '#f0e2b6'; ctx.font = 'bold 18px serif'; ctx.fillText('北', S - 24, 26);
      void riverLine; void riverHalfWidth;
    };
    draw();
    cv.addEventListener('click', (e) => {
      const r = cv.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * MAP_HALF * 2 - MAP_HALF, z = ((e.clientY - r.top) / r.height) * MAP_HALF * 2 - MAP_HALF;
      const i = pins.findIndex(([px, pz]) => Math.hypot(px - x, pz - z) < 25);
      if (i >= 0) pins.splice(i, 1); else pins.push([Math.round(x), Math.round(z)]);
      s.flags.pins = pins.map((p) => p.join(',')).join(';');
      draw();
    });
  }

  private renderSave(page: HTMLElement, fromTitle: boolean) {
    const g = this.game;
    const slots = Object.keys(SLOT_LABELS) as SlotId[];
    const fmt = (t?: number) => t ? new Date(t).toLocaleString('ja-JP') : '';
    page.innerHTML = `<h2>記録</h2><p class="sub">手動の記録3枠と、自動記録2枠（交互に上書き）。自動記録は5分ごと・目的の区切り・休息のたびに行われます。戦闘中は自動記録しません。</p>
      <ul class="slots">${slots.map((id) => {
        const inf = g.saves.info(id);
        const manual = id.startsWith('manual');
        return `<li><b>${SLOT_LABELS[id]}</b><span>${inf.exists ? (inf.error ? `⚠ ${esc(inf.error)}` : `${esc(inf.name ?? '')}・${esc(inf.place ?? '')}・${Math.floor((inf.playSeconds ?? 0) / 60)}分・${fmt(inf.savedAt)}`) : '空き'}</span>
          ${!fromTitle && manual ? `<button data-save="${id}">ここに記録</button>` : ''}${inf.exists && !inf.error ? `<button data-load="${id}">読み込む</button>` : ''}</li>`;
      }).join('')}</ul>`;
    page.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (!b) return;
      if (b.dataset.save) {
        const inf = g.saves.info(b.dataset.save as SlotId);
        if (inf.exists && !confirm(`${SLOT_LABELS[b.dataset.save as SlotId]}を上書きしますか？`)) return;
        g.save(b.dataset.save as SlotId); this.openMenu('save', fromTitle);
      }
      if (b.dataset.load) {
        if (!fromTitle && !confirm('現在の進行は、記録していなければ失われます。読み込みますか？')) return;
        this.closeModal(false);
        const err = g.loadSlot(b.dataset.load as SlotId);
        if (err) { this.toast(err, 'warn'); return; }
        this.layer.innerHTML = '';
        this.enterPlay();
      }
    });
  }

  private renderSettings(page: HTMLElement) {
    const g = this.game;
    const st = g.settings;
    const sel = (k: keyof Settings, opts: [string, string][]) => `<select data-k="${k}">${opts.map(([v, n]) => `<option value="${v}" ${String(st[k]) === v ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
    const rng = (k: keyof Settings, min: number, max: number, step: number) => `<input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${st[k]}"><output>${st[k]}</output>`;
    const chk = (k: keyof Settings) => `<input type="checkbox" data-k="${k}" ${st[k] ? 'checked' : ''}>`;
    page.innerHTML = `<h2>設定</h2>
      <div class="settings">
        <section><h3>画質と性能</h3>
          <label>画質 ${sel('quality', [['low', '低'], ['medium', '中'], ['high', '高']])}<small>影・草の密度・遠景。変更は再読み込みで反映</small></label>
          <label>描画解像度 ${rng('renderScale', 0.5, 1, 0.05)}</label>
          <label>視野角 ${rng('fov', 45, 80, 1)}</label>
        </section>
        <section><h3>見やすさ</h3>
          <label>文字の大きさ ${sel('textSize', [['small', '小'], ['medium', '中'], ['large', '大']])}</label>
          <label>字幕（会話） ${chk('subtitles')}</label>
          <label>音の字幕（方向つき） ${chk('soundCaptions')}</label>
          <label>色の識別補助（形と模様で区別） ${chk('colorAid')}</label>
          <label>痕跡の強調 ${rng('traceHighlight', 0, 1, 0.1)}</label>
          <label>カメラの揺れ ${rng('cameraShake', 0, 1, 0.1)}</label>
          <p class="sub small">モーションブラーはこの試作では使っていません（設定項目も置いていません）。</p>
        </section>
        <section><h3>操作</h3>
          <label>マウス感度 ${rng('mouseSensitivity', 0.3, 2.5, 0.1)}</label>
          <label>パッド感度 ${rng('padSensitivity', 0.3, 2.5, 0.1)}</label>
          <label>上下反転 ${chk('invertY')}</label>
          <label>しゃがみ：切り替え式 ${chk('crouchToggle')}<small>オフで長押し</small></label>
          <label>構え：切り替え式 ${chk('aimToggle')}</label>
          <label>耳を澄ます：切り替え式 ${chk('listenToggle')}</label>
        </section>
        <section><h3>難易度と音</h3>
          <label>難易度 ${sel('difficulty', Object.entries(DIFFICULTY).map(([k, v]) => [k, v.name]))}<small>${esc(DIFFICULTY[st.difficulty].desc)}</small></label>
          <label>全体 ${rng('masterVolume', 0, 1, 0.05)}</label>
          <label>効果音 ${rng('sfxVolume', 0, 1, 0.05)}</label>
          <label>環境音 ${rng('ambienceVolume', 0, 1, 0.05)}</label>
          <label>音楽 ${rng('musicVolume', 0, 1, 0.05)}</label>
        </section>
      </div>
      <div class="btns"><button data-reset>初期設定に戻す</button></div>`;
    const apply = (e: Event) => {
      const t = e.target as HTMLInputElement | HTMLSelectElement;
      const k = t.dataset.k as keyof Settings;
      if (!k) return;
      const before = st.quality;
      let v: unknown = t.type === 'checkbox' ? (t as HTMLInputElement).checked : t.type === 'range' ? Number(t.value) : t.value;
      (st as any)[k] = v;
      const out = t.nextElementSibling;
      if (out?.tagName === 'OUTPUT') out.textContent = String(v);
      g.applySettings();
      if (k === 'quality' && before !== st.quality) this.toast('画質の変更は、ページの再読み込み後に反映されます（進行は自動記録から）', 'info');
    };
    page.addEventListener('input', apply);
    page.addEventListener('change', apply);
    page.querySelector('[data-reset]')!.addEventListener('click', () => {
      const b = st.bindings;
      Object.assign(st, structuredClone(DEFAULT_SETTINGS));
      st.bindings = b;
      g.applySettings();
      this.openMenu('settings');
    });
  }

  private renderControls(page: HTMLElement) {
    const g = this.game;
    const b = g.settings.bindings;
    const actions = Object.keys(ACTION_LABELS) as Action[];
    page.innerHTML = `<h2>操作 <small>項目をクリックして、新しいキー／ボタンを押す</small></h2>
      <table class="binds"><tr><th>行動</th><th>キーボード・マウス</th><th>ゲームパッド</th></tr>
      <tr><td>移動／視点</td><td>WASD／マウス</td><td>左スティック／右スティック</td></tr>
      ${actions.map((a) => `<tr><td>${ACTION_LABELS[a]}</td><td><button data-kb="${a}">${b[a].keys.map(keyName).join('・') || '―'}</button></td><td><button data-pad="${a}">${b[a].pad.map((i) => PAD_NAMES[i] ?? i).join('・') || '―'}</button></td></tr>`).join('')}
      </table><p class="sub small">同じキーを複数の行動に割り当てることもできます（例：左クリックは「軽攻撃」と、構え中の「投げる」を兼ねる）。</p>`;
    page.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('button') as HTMLElement | null;
      if (!btn || (!btn.dataset.kb && !btn.dataset.pad)) return;
      const a = (btn.dataset.kb ?? btn.dataset.pad) as Action;
      const isPad = !!btn.dataset.pad;
      btn.textContent = isPad ? 'ボタンを押す…' : 'キーを押す…';
      g.input.capture = (code, fromPad) => {
        if (fromPad !== isPad) { btn.textContent = '機器が違います'; setTimeout(() => this.openMenu('controls'), 800); return; }
        if (isPad) b[a].pad = [Number(code)]; else b[a].keys = [code];
        g.applySettings();
        this.openMenu('controls');
      };
    });
  }

  private renderAbout(page: HTMLElement) {
    page.innerHTML = `<h2>この試作について</h2>
      <p>『原環の大地 ― ヴァルナ年代記 ―』の<b>垂直スライス（最初の制作区間）</b>です。暁の草海から翡翠の樹海の入口までの区域で、30〜60分遊べることを目標に作っています。</p>
      <h3>できること</h3><ul class="plain"><li>歩く・走る・しゃがむ・泳ぐ・回避・軽攻撃・重攻撃・投石・注目・騎乗（コハク）</li><li>足跡の調査（生き物が実際に歩いた場所に足跡が残る）、手がかりと推理、段階的なヒント</li><li>生態系：ソラクビの群れの移動、クサガリの狩り、腐肉食、縄張り、幼体を守る行動、昼夜の行動の違い</li><li>翠角王オルガの調査・3段階の戦い・解決と、谷に橋が架かる地域の変化</li><li>野営地（会話・休息・天気予報・展示棚・写真・見張り台の建設場所の選択）、図鑑、成長、地図、記録3枠＋自動2枠、フォトモード</li></ul>
      <h3>正直な注意</h3><ul class="plain"><li>生き物・植物・人物の見た目は、手続き生成の<b>仮素材</b>です。完成品質の見た目ではありません。</li><li>音も手続き生成の仮素材です。</li><li>この区間の先（内海・断崖・氷原など）、オルガの討伐・鎮静による別の決着、4体の中ボスの残り3体は、まだ制作していません。</li><li>プレイ時間の目標（本編75〜90時間など）は、この試作では検証していません。</li></ul>
      <p class="sub small">詳しい設計と進捗は docs/ フォルダにあります。</p>`;
  }

  // ------------------------------------------------------------ フォトモード

  photoMode(on: boolean) {
    const g = this.game;
    this.photoEl?.remove(); this.photoEl = null;
    this.hud.classList.toggle('hidden', on);
    this.captions.classList.toggle('hidden', on);
    if (!on) { g.input.requestPointerLock(); return; }
    const ph = g.photo;
    const el = h('div', 'photo panel');
    const focal = Math.round(12 / Math.tan((ph.fov * Math.PI) / 360));
    el.innerHTML = `<h3>フォトモード</h3>
      <p class="sub small">WASDで移動・画面をクリックしてマウスで向き・Space／Cで上下。時刻の変更は写真のためだけで、閉じると元に戻ります。</p>
      <label>焦点距離 <input type="range" data-p="focal" min="16" max="200" value="${focal}"><output>${focal}mm</output></label>
      <label>ピント距離 <input type="range" data-p="focus" min="1" max="120" step="0.5" value="${ph.focus}"><output>${ph.focus}m</output></label>
      <label>ぼけ（絞り） <input type="range" data-p="aperture" min="0" max="0.004" step="0.0001" value="${ph.aperture}"><output></output></label>
      <label>時刻 <input type="range" data-p="hour" min="0" max="23.9" step="0.1" value="${ph.hour.toFixed(1)}"><output>${ph.hour.toFixed(1)}時</output></label>
      <label>露出 <input type="range" data-p="exposure" min="0.4" max="2" step="0.05" value="${ph.exposure}"><output></output></label>
      <label>彩度 <input type="range" data-p="saturation" min="0" max="1.6" step="0.05" value="${ph.saturation}"><output></output></label>
      <label>コントラスト <input type="range" data-p="contrast" min="0.7" max="1.4" step="0.02" value="${ph.contrast}"><output></output></label>
      <div class="btns"><button data-a="hide">パネルを隠す（H）</button><button class="primary" data-a="shot">撮影</button><button data-a="close">閉じる</button></div>`;
    el.addEventListener('input', (e) => {
      const t = e.target as HTMLInputElement;
      const v = Number(t.value);
      const k = t.dataset.p!;
      if (k === 'focal') { ph.fov = (2 * Math.atan(12 / v) * 180) / Math.PI; t.nextElementSibling!.textContent = `${v}mm`; }
      else { (ph as any)[k] = v; t.nextElementSibling!.textContent = k === 'hour' ? `${v.toFixed(1)}時` : k === 'focus' ? `${v}m` : ''; }
    });
    el.addEventListener('click', (e) => {
      const a = ((e.target as HTMLElement).closest('button') as HTMLElement | null)?.dataset.a;
      if (a === 'close') g.exitPhoto();
      if (a === 'hide') { el.classList.add('hidden'); const back = () => { el.classList.remove('hidden'); removeEventListener('keydown', key); }; const key = (ev: KeyboardEvent) => { if (ev.code === 'KeyH') back(); }; addEventListener('keydown', key); }
      if (a === 'shot') {
        el.classList.add('hidden');
        requestAnimationFrame(() => {
          const png = g.capturePhoto();
          el.classList.remove('hidden');
          const link = document.createElement('a');
          link.href = png; link.download = `varuna_${Date.now()}.png`;
          this.toast('撮影した。野営地の写真の板に飾られる（PNGも保存できます）', 'info');
          const dl = h('button', '', '画像を保存');
          dl.addEventListener('click', () => link.click());
          el.querySelector('.btns')!.append(dl);
        });
      }
    });
    g.renderer.domElement.addEventListener('click', () => { if (g.mode === 'photo') g.input.requestPointerLock(); }, { once: true });
    this.layer.append(el);
    this.photoEl = el;
  }

  // ------------------------------------------------------------ ゲームパッドでのメニュー操作

  private focusFirst(el: HTMLElement) {
    this.navIndex = 0;
    const f = el.querySelector('button:not([disabled])') as HTMLElement | null;
    if (f && this.game.input.lastDevice === 'pad') f.focus();
  }
  private pollPad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = [...pads].find((p) => p && p.connected);
    if (!pad) return;
    const btn = (i: number) => !!pad.buttons[i]?.pressed;
    const edge = (i: number) => btn(i) && !this.padPrev[i];
    const container = this.dialogueEl ?? this.menuEl ?? this.photoEl ?? (this.layer.querySelector('.title, .create') as HTMLElement | null);
    if (container) {
      const items = [...container.querySelectorAll('button:not([disabled]), input, select')] as HTMLElement[];
      if (items.length) {
        const cur = items.indexOf(document.activeElement as HTMLElement);
        let next = cur;
        if (edge(13) || (pad.axes[1] > 0.6 && !this.padPrev[99])) next = (cur + 1 + items.length) % items.length;
        if (edge(12) || (pad.axes[1] < -0.6 && !this.padPrev[98])) next = (cur - 1 + items.length) % items.length;
        if (next !== cur) items[Math.max(0, next)].focus();
        const act = document.activeElement as HTMLInputElement | null;
        if (act?.type === 'range') {
          if (edge(15)) { act.stepUp(); act.dispatchEvent(new Event('input', { bubbles: true })); }
          if (edge(14)) { act.stepDown(); act.dispatchEvent(new Event('input', { bubbles: true })); }
        }
        if (edge(0) && act && act.tagName === 'BUTTON') act.click();
      }
      if (edge(1) && this.menuEl && this.game.mode === 'menu') this.closeModal();
    }
    this.padPrev = pad.buttons.map((b) => b.pressed);
    this.padPrev[99] = pad.axes[1] > 0.6; this.padPrev[98] = pad.axes[1] < -0.6;
  }
}

export { NPCS };
