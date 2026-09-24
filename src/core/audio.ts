import * as THREE from 'three';

// 手続き生成の音（仮素材）。音から状況が読めることを優先し、音楽は流し続けない。

export interface Caption { text: string; dir?: string; key: string }

export class AudioEngine {
  ctx: AudioContext | null = null;
  master!: GainNode;
  sfx!: GainNode;
  amb!: GainNode;
  music!: GainNode;
  private noiseBuf!: AudioBuffer;
  private ambNodes: Record<string, { gain: GainNode; filter?: BiquadFilterNode }> = {};
  private listener = new THREE.Vector3();
  private listenerFwd = new THREE.Vector3(0, 0, 1);
  onCaption: ((c: Caption) => void) | null = null;
  private lastCaption = new Map<string, number>();
  private chirpT = 0;
  private nightT = 0;
  private dripT = 0;
  private musicState: 'none' | 'boss' = 'none';
  private bossDrone: { osc: OscillatorNode[]; gain: GainNode } | null = null;
  private humNode: { osc: OscillatorNode[]; gain: GainNode } | null = null;
  volumes = { master: 0.8, sfx: 0.9, amb: 0.8, music: 0.6 };

  /** ブラウザの制限で、最初の操作の後に開始する */
  start() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    this.ctx = ctx;
    this.master = ctx.createGain(); this.master.connect(ctx.destination);
    // 大きな音で割れないように
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    comp.connect(this.master);
    this.sfx = ctx.createGain(); this.sfx.connect(comp);
    this.amb = ctx.createGain(); this.amb.connect(comp);
    this.music = ctx.createGain(); this.music.connect(comp);
    this.applyVolumes();
    // ピンクノイズ
    const len = ctx.sampleRate * 3;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0526;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
    }
    this.makeLoop('wind', 'lowpass', 500);
    this.makeLoop('grass', 'bandpass', 3800);
    this.makeLoop('river', 'lowpass', 900);
    this.makeLoop('rain', 'highpass', 1400);
    this.makeLoop('fire', 'bandpass', 1800);
    this.makeLoop('jungle', 'bandpass', 5200);
  }

  applyVolumes() {
    if (!this.ctx) return;
    this.master.gain.value = this.volumes.master;
    this.sfx.gain.value = this.volumes.sfx;
    this.amb.gain.value = this.volumes.amb;
    this.music.gain.value = this.volumes.music * 0.8;
  }

  private makeLoop(name: string, type: BiquadFilterType, freq: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf; src.loop = true;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = type === 'bandpass' ? 0.8 : 0.5;
    const g = ctx.createGain(); g.gain.value = 0;
    src.connect(f).connect(g).connect(this.amb);
    src.start(ctx.currentTime + Math.random());
    this.ambNodes[name] = { gain: g, filter: f };
  }

  setListener(pos: THREE.Vector3, fwd: THREE.Vector3) {
    this.listener.copy(pos);
    this.listenerFwd.copy(fwd).setY(0).normalize();
  }

  /** 環境音の更新。値はすべて 0〜1 */
  ambience(dt: number, o: { wind: number; grass: number; river: number; rain: number; fire: number; jungle: number; night: number; day: number; altitude: number; fog: number }) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const set = (k: string, v: number) => this.ambNodes[k]?.gain.gain.setTargetAtTime(v, t, 0.4);
    set('wind', 0.05 + o.wind * 0.22 + o.altitude * 0.15);
    this.ambNodes.wind.filter!.frequency.setTargetAtTime(300 + o.wind * 700, t, 0.5);
    set('grass', o.grass * o.wind * 0.12);
    set('river', o.river * 0.5);
    set('rain', o.rain * 0.35);
    set('fire', o.fire * 0.25);
    set('jungle', o.jungle * 0.03 * (1 - o.night * 0.5));
    // 昼の鳥（小型翼竜ウタバネ）と、夜の虫・カエル
    this.chirpT -= dt;
    if (this.chirpT <= 0) {
      this.chirpT = 1.5 + Math.random() * 4;
      if (o.day > 0.4 && o.rain < 0.3) this.birdChirp(o.jungle);
    }
    this.nightT -= dt;
    if (this.nightT <= 0) {
      this.nightT = 0.25 + Math.random() * 0.8;
      if (o.night > 0.5) this.insect(o.jungle, o.river);
    }
    if (o.jungle > 0.5) {
      this.dripT -= dt;
      if (this.dripT <= 0) { this.dripT = 0.4 + Math.random() * 2; this.drip(); }
    }
  }

  private pan(pos: THREE.Vector3 | null, ref: number, maxD = 800): AudioNode | null {
    const ctx = this.ctx!;
    if (!pos) return this.sfx;
    const d = pos.distanceTo(this.listener);
    if (d > maxD) return null;
    const p = ctx.createPanner();
    p.panningModel = 'equalpower';
    p.distanceModel = 'inverse';
    p.refDistance = ref; p.rolloffFactor = 1; p.maxDistance = maxD;
    // リスナーの向きに合わせた相対座標
    const rel = pos.clone().sub(this.listener);
    const fx = this.listenerFwd.x, fz = this.listenerFwd.z;
    const right = -fz * rel.x + fx * rel.z; // 右が正
    const fwd = fx * rel.x + fz * rel.z;
    p.positionX.value = right; p.positionY.value = rel.y * 0.3; p.positionZ.value = -fwd;
    p.connect(this.sfx);
    return p;
  }

  private dirName(pos: THREE.Vector3) {
    const a = Math.atan2(pos.x - this.listener.x, -(pos.z - this.listener.z)); // 北=0
    const names = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
    return names[((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8];
  }

  caption(key: string, text: string, pos: THREE.Vector3 | null, minGap = 6) {
    const now = performance.now() / 1000;
    if ((this.lastCaption.get(key) ?? -99) + minGap > now) return;
    this.lastCaption.set(key, now);
    this.onCaption?.({ text, dir: pos ? this.dirName(pos) : undefined, key });
  }

  private env(g: GainNode, t: number, a: number, peak: number, dec: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  }

  private noiseBurst(out: AudioNode, t: number, dur: number, type: BiquadFilterType, freq: number, vol: number, q = 1) {
    const ctx = this.ctx!;
    const s = ctx.createBufferSource(); s.buffer = this.noiseBuf;
    s.playbackRate.value = 0.7 + Math.random() * 0.6;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    this.env(g, t, 0.005, vol, dur);
    s.connect(f).connect(g).connect(out);
    s.start(t, Math.random() * 2); s.stop(t + dur + 0.1);
    return f;
  }

  private tone(out: AudioNode, t: number, type: OscillatorType, f0: number, f1: number, dur: number, vol: number, attack = 0.02, filterF = 0) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(10, f1), t + dur);
    const g = ctx.createGain();
    this.env(g, t, attack, vol, dur);
    if (filterF) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filterF; o.connect(f).connect(g); }
    else o.connect(g);
    g.connect(out);
    o.start(t); o.stop(t + attack + dur + 0.1);
    return o;
  }

  /** 生物の鳴き声（種ごとの声質） */
  voice(kind: string, base: number, pos: THREE.Vector3, loud: number, mood: 'call' | 'alarm' | 'roar' | 'hiss' | 'distress' | 'chirp', label: string) {
    if (!this.ctx) return;
    const ref = 6 + loud * (base < 120 ? 60 : 18);
    const out = this.pan(pos, ref, base < 120 ? 2500 : 700);
    if (!out) return;
    const t = this.ctx.currentTime + 0.02;
    const r = 0.9 + Math.random() * 0.2;
    const f = base * r * (mood === 'alarm' || mood === 'distress' ? 1.3 : 1);
    switch (kind) {
      case 'rumble': {
        // 遠くまで届く低い呼び声（ソラクビ）
        this.tone(out, t, 'sine', f * 1.3, f, 2.6, 0.5 * loud, 0.5);
        this.tone(out, t + 0.1, 'triangle', f * 2.6, f * 2, 2.2, 0.12 * loud, 0.4, 400);
        this.tone(out, t + 1.2, 'sine', f * 1.1, f * 0.8, 1.8, 0.35 * loud, 0.3);
        break;
      }
      case 'bellow': {
        this.tone(out, t, 'sawtooth', f, f * 0.7, 1.4, 0.35 * loud, 0.08, 500);
        this.tone(out, t, 'sine', f * 0.5, f * 0.4, 1.6, 0.5 * loud, 0.1);
        this.noiseBurst(out, t, 1.2, 'lowpass', 400, 0.25 * loud);
        break;
      }
      case 'honk': {
        for (let i = 0; i < (mood === 'alarm' ? 3 : 1); i++) this.tone(out, t + i * 0.18, 'sawtooth', f, f * 0.85, 0.16, 0.18 * loud, 0.01, 1600);
        break;
      }
      case 'screech': {
        const o = this.tone(out, t, 'sawtooth', f * 1.5, f * 2.4, 0.5, 0.14 * loud, 0.02, 3200);
        const lfo = this.ctx.createOscillator(); lfo.frequency.value = 28; const lg = this.ctx.createGain(); lg.gain.value = 60;
        lfo.connect(lg).connect(o.frequency); lfo.start(t); lfo.stop(t + 0.6);
        break;
      }
      case 'hiss': this.noiseBurst(out, t, 0.9, 'bandpass', 2600, 0.3 * loud, 2); this.tone(out, t, 'sawtooth', f, f * 0.8, 0.5, 0.06 * loud, 0.05, 900); break;
      case 'chirp': for (let i = 0; i < 3; i++) this.tone(out, t + i * 0.09, 'sine', f, f * 1.6, 0.07, 0.08 * loud, 0.005); break;
      case 'squeak': this.tone(out, t, 'sine', f, f * 1.3, 0.08, 0.05 * loud, 0.005); break;
      case 'click': for (let i = 0; i < 4; i++) this.noiseBurst(out, t + i * 0.07, 0.03, 'bandpass', f * 4, 0.15 * loud, 4); break;
    }
    if (mood === 'roar') this.noiseBurst(out, t, 1.6, 'lowpass', 700, 0.6 * loud);
    this.caption('voice' + label + mood, `${label}の${mood === 'alarm' ? '警戒の声' : mood === 'roar' ? '咆哮' : mood === 'hiss' ? '威嚇' : mood === 'distress' ? '悲鳴' : '鳴き声'}`, pos, mood === 'call' ? 14 : 5);
  }

  /** 足音。重さで音の低さと大きさが変わる */
  footstep(pos: THREE.Vector3, weight: number, surface: 'grass' | 'water' | 'mud' | 'ground' = 'grass', vol = 1) {
    if (!this.ctx) return;
    const heavy = weight > 3000;
    const out = this.pan(pos, heavy ? 30 + weight / 800 : 2, heavy ? 1500 : 40);
    if (!out) return;
    const t = this.ctx.currentTime;
    if (heavy) {
      const k = Math.min(1, weight / 40000);
      this.tone(out, t, 'sine', 70 - k * 30, 30, 0.5 + k * 0.5, (0.4 + k * 0.6) * vol, 0.01);
      this.noiseBurst(out, t, 0.35, 'lowpass', 300, 0.3 * vol);
      if (k > 0.4) this.caption('heavystep', '地響き', pos, 20);
    } else if (surface === 'water') {
      this.noiseBurst(out, t, 0.18, 'bandpass', 1200, 0.18 * vol, 1.5);
    } else if (surface === 'mud') {
      this.noiseBurst(out, t, 0.2, 'lowpass', 500, 0.2 * vol);
    } else {
      this.noiseBurst(out, t, 0.09, 'bandpass', weight > 50 ? 900 : 2400, (weight > 50 ? 0.16 : 0.07) * vol, 1.2);
    }
  }

  /** 効果音 */
  play(kind: string, pos: THREE.Vector3 | null, vol = 1) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const out = this.pan(pos, 6, 400);
    if (!out) return;
    switch (kind) {
      case 'step': this.noiseBurst(out, t, 0.07, 'bandpass', 2000, 0.06 * vol, 1.2); break;
      case 'stepWater': this.noiseBurst(out, t, 0.2, 'bandpass', 1300, 0.12 * vol, 1.2); break;
      case 'stepMud': this.noiseBurst(out, t, 0.2, 'lowpass', 450, 0.18 * vol); break;
      case 'swing': this.noiseBurst(out, t, 0.18, 'bandpass', 1500, 0.2 * vol, 0.7); break;
      case 'swingHeavy': this.noiseBurst(out, t, 0.35, 'bandpass', 700, 0.3 * vol, 0.7); break;
      case 'hit': this.noiseBurst(out, t, 0.12, 'lowpass', 900, 0.4 * vol); this.tone(out, t, 'sine', 180, 80, 0.12, 0.3 * vol, 0.002); break;
      case 'deflect': [1400, 2100, 3300].forEach((f, i) => this.tone(out, t, 'sine', f, f * 0.98, 0.35 - i * 0.08, 0.08 * vol, 0.002)); this.caption('deflect', '硬い皮に弾かれた', null, 4); break;
      case 'pinHit': [880, 1320, 1980].forEach((f) => this.tone(out, t, 'triangle', f, f, 0.7, 0.1 * vol, 0.002)); break;
      case 'pinBreak': [660, 990, 1485, 2200].forEach((f, i) => this.tone(out, t + i * 0.05, 'triangle', f, f * 0.9, 1.2, 0.12 * vol, 0.002)); this.noiseBurst(out, t, 0.4, 'highpass', 3000, 0.2 * vol); break;
      case 'dodge': this.noiseBurst(out, t, 0.25, 'lowpass', 1200, 0.1 * vol); break;
      case 'sling': this.noiseBurst(out, t, 0.25, 'bandpass', 2500, 0.15 * vol, 3); break;
      case 'stoneHit': this.noiseBurst(out, t, 0.06, 'bandpass', 1800, 0.25 * vol, 2); break;
      case 'splash': this.noiseBurst(out, t, 0.6, 'bandpass', 900, 0.35 * vol, 0.6); break;
      case 'playerHurt': this.tone(out, t, 'sine', 160, 90, 0.2, 0.2 * vol, 0.005); this.noiseBurst(out, t, 0.15, 'lowpass', 700, 0.3 * vol); break;
      case 'playerDown': this.tone(out, t, 'sine', 120, 50, 1.2, 0.3 * vol, 0.01); break;
      case 'treeHit': this.tone(out, t, 'sine', 90, 40, 0.6, 0.7 * vol, 0.003); this.noiseBurst(out, t, 0.5, 'lowpass', 600, 0.6 * vol); this.caption('treehit', '巨木に何かがぶつかる音', pos, 3); break;
      case 'treeFall': {
        for (let i = 0; i < 8; i++) this.noiseBurst(out, t + i * 0.18 + Math.random() * 0.1, 0.12, 'bandpass', 1400 - i * 100, 0.3 * vol, 2);
        this.tone(out, t + 2.4, 'sine', 60, 25, 1.6, 0.9 * vol, 0.01);
        this.noiseBurst(out, t + 2.4, 1.4, 'lowpass', 400, 0.8 * vol);
        this.caption('treefall', '巨木が裂けて倒れる音', pos, 5);
        break;
      }
      case 'snort': this.noiseBurst(out, t, 0.4, 'lowpass', 500, 0.5 * vol); this.noiseBurst(out, t + 0.45, 0.3, 'lowpass', 450, 0.4 * vol); this.caption('snort', '荒い鼻息――突進の構え', pos, 4); break;
      case 'bellow': this.voice('bellow', 60, pos!, 1.3 * vol, 'roar', '翠角王'); break;
      case 'orgaPain': this.voice('bellow', 90, pos!, 1.2 * vol, 'distress', '翠角王'); break;
      case 'stomp': this.tone(out, t, 'sine', 55, 25, 0.9, 1 * vol, 0.005); this.noiseBurst(out, t, 0.7, 'lowpass', 350, 0.8 * vol); break;
      case 'mud': this.noiseBurst(out, t, 0.9, 'lowpass', 300, 0.6 * vol); break;
      case 'resonanceRise': {
        const o = this.tone(out, t, 'sine', 55, 110, 1.6, 0.35 * vol, 1.2);
        void o;
        this.tone(out, t, 'sine', 57, 116, 1.6, 0.3 * vol, 1.2);
        this.caption('resrise', '共振の唸りが高まる', pos, 4);
        break;
      }
      case 'shudder': this.tone(out, t, 'sine', 70, 40, 0.6, 0.6 * vol, 0.02); this.caption('shudder', '体が大きく震える――手をゆるめろ', null, 1); break;
      case 'release': [330, 440, 554, 660].forEach((f, i) => this.tone(out, t + i * 0.12, 'sine', f, f, 2.4, 0.12 * vol, 0.05)); break;
      case 'ui': this.tone(this.sfx, t, 'sine', 900, 1100, 0.06, 0.05 * vol, 0.002); break;
      case 'discover': [523, 659, 784].forEach((f, i) => this.tone(this.music, t + i * 0.14, 'triangle', f, f, 1.8, 0.07 * vol, 0.01)); break;
      case 'codex': [784, 988].forEach((f, i) => this.tone(this.music, t + i * 0.09, 'sine', f, f, 0.9, 0.05 * vol, 0.005)); break;
      case 'noiseBomb': this.noiseBurst(out, t, 0.8, 'lowpass', 2000, 1.0 * vol); this.tone(out, t, 'square', 200, 60, 0.4, 0.3 * vol, 0.001); this.caption('bang', '破裂音', pos, 1); break;
      case 'whistle': this.tone(out, t, 'sine', 1800, 2400, 0.35, 0.12 * vol, 0.02); this.tone(out, t + 0.4, 'sine', 2200, 1600, 0.35, 0.12 * vol, 0.02); break;
      case 'mount': this.noiseBurst(out, t, 0.3, 'lowpass', 800, 0.15 * vol); break;
      case 'gather': this.noiseBurst(out, t, 0.25, 'bandpass', 3000, 0.1 * vol, 1); break;
      case 'stone': this.noiseBurst(out, t, 0.4, 'lowpass', 300, 0.5 * vol); this.tone(out, t, 'sine', 80, 70, 0.6, 0.2 * vol, 0.02); break;
    }
  }

  private birdChirp(jungle: number) {
    const ctx = this.ctx!;
    const a = Math.random() * Math.PI * 2, d = 20 + Math.random() * 60;
    const pos = this.listener.clone().add(new THREE.Vector3(Math.cos(a) * d, 5 + Math.random() * (jungle > 0.5 ? 30 : 8), Math.sin(a) * d));
    const out = this.pan(pos, 8, 200); if (!out) return;
    const t = ctx.currentTime;
    const base = jungle > 0.5 ? 1400 + Math.random() * 1600 : 2200 + Math.random() * 1400;
    const n = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < n; i++) this.tone(out, t + i * 0.11, 'sine', base * (1 + (i % 2) * 0.12), base * 1.3, 0.08, 0.03, 0.005);
  }
  private insect(jungle: number, river: number) {
    const ctx = this.ctx!;
    const a = Math.random() * Math.PI * 2, d = 6 + Math.random() * 30;
    const pos = this.listener.clone().add(new THREE.Vector3(Math.cos(a) * d, 0.5, Math.sin(a) * d));
    const out = this.pan(pos, 4, 60); if (!out) return;
    const t = ctx.currentTime;
    if ((jungle > 0.4 || river > 0.3) && Math.random() < 0.4) {
      // ヨロイガエルの低い声
      this.tone(out, t, 'square', 110 + Math.random() * 30, 90, 0.18, 0.03, 0.01, 400);
    } else {
      for (let i = 0; i < 6; i++) this.tone(out, t + i * 0.04, 'sine', 4200, 4300, 0.02, 0.012, 0.002);
    }
  }
  private drip() {
    const ctx = this.ctx!;
    const a = Math.random() * Math.PI * 2, d = 3 + Math.random() * 15;
    const pos = this.listener.clone().add(new THREE.Vector3(Math.cos(a) * d, 0, Math.sin(a) * d));
    const out = this.pan(pos, 3, 40); if (!out) return;
    this.tone(out, ctx.currentTime, 'sine', 1800 + Math.random() * 900, 900, 0.08, 0.04, 0.001);
  }

  // ---- 音楽（控えめ）

  /** 絶景・発見のときだけ流れる短い旋律 */
  vista() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [293.7, 349.2, 440, 392, 523.3, 440];
    notes.forEach((f, i) => { this.tone(this.music, t + i * 0.9, 'triangle', f, f, 3.2, 0.05, 0.3); this.tone(this.music, t + i * 0.9, 'sine', f / 2, f / 2, 3.5, 0.04, 0.6); });
    this.tone(this.music, t, 'sine', 146.8, 146.8, 7, 0.05, 2);
  }

  /** ボス戦：低い持続音。拍はボスの足音と呼吸が刻む */
  setBoss(on: boolean) {
    if (!this.ctx) return;
    if (on && this.musicState !== 'boss') {
      this.musicState = 'boss';
      const g = this.ctx.createGain(); g.gain.value = 0; g.connect(this.music);
      const osc = [55, 82.4, 110.5].map((f) => { const o = this.ctx!.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const lp = this.ctx!.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 260; o.connect(lp).connect(g); o.start(); return o; });
      g.gain.setTargetAtTime(0.08, this.ctx.currentTime, 2);
      this.bossDrone = { osc, gain: g };
    } else if (!on && this.musicState === 'boss') {
      this.musicState = 'none';
      const b = this.bossDrone;
      if (b) { b.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 1.5); setTimeout(() => b.osc.forEach((o) => o.stop()), 5000); }
      this.bossDrone = null;
    }
  }
  /** ボスの足音に合わせた打音（戦闘のリズム） */
  bossBeat(strength: number) {
    if (!this.ctx || this.musicState !== 'boss') return;
    const t = this.ctx.currentTime;
    this.tone(this.music, t, 'sine', 90, 45, 0.4, 0.12 * strength, 0.003);
    this.noiseBurst(this.music, t, 0.15, 'lowpass', 900, 0.05 * strength);
  }

  /** 共振の唸り（塔・装置）。距離と強さで音量を変える */
  hum(level: number) {
    if (!this.ctx) return;
    if (!this.humNode) {
      const g = this.ctx.createGain(); g.gain.value = 0; g.connect(this.amb);
      const osc = [55, 56.3, 110].map((f) => { const o = this.ctx!.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(g); o.start(); return o; });
      this.humNode = { osc, gain: g };
    }
    this.humNode.gain.gain.setTargetAtTime(level * 0.25, this.ctx.currentTime, 0.5);
  }
}
