import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { World, createRenderer, QUALITY_PRESETS } from '../world/world';
import { Input } from '../core/input';
import { Settings, loadSettings, saveSettings, DIFFICULTY } from '../core/settings';
import { AudioEngine } from '../core/audio';
import { Player } from '../player/player';
import { ThirdPersonCamera } from '../player/camera';
import { Appearance, DEFAULT_APPEARANCE } from '../player/humanoid';
import { Ecosystem, PlayerSense } from '../creatures/ecosystem';
import { Creature } from '../creatures/creature';
import { Orga, OrgaPhase } from '../creatures/orga';
import { SPECIES, SMALL_SPECIES, ObsId, OBS_TEXT } from '../creatures/species';
import { GameState, newState, SaveSystem, SlotId } from './state';
import { CLUES, DEDUCTIONS, RECORDS, QUESTS, SKILLS, dialogueFor, EXTRA_LINES, NpcId, NPCS, MUSEUM_ITEMS, Dialogue } from './content';
import { CampNpcs } from './npcs';
import { P, riverLine, riverHalfWidth, FENCE, ravineLine } from '../world/layout';
import { clamp, Rng } from '../core/noise';
import { FootprintRec } from '../world/effects';
import type { UI } from '../ui/ui';

export type Mode = 'loading' | 'title' | 'create' | 'play' | 'menu' | 'dialogue' | 'photo' | 'dead' | 'rest';

interface Interactable {
  id: string;
  label: string;
  pos: THREE.Vector3;
  radius: number;
  hold?: number;          // 長押しの秒数
  priority?: number;
  use: () => void;
}

interface Stone { pos: THREE.Vector3; vel: THREE.Vector3; life: number; mesh: THREE.Mesh }

interface Discovery { id: string; name: string; pos: { x: number; z: number }; r: number; vista?: boolean; sub?: string }
const DISCOVERIES: Discovery[] = [
  { id: 'hill', name: '渡りの丘', pos: P.startHill, r: 40, sub: '暁の草海' },
  { id: 'camp', name: '大河の曲がり', pos: P.campView, r: 30, vista: true, sub: '調査隊の野営地' },
  { id: 'ford', name: '浅瀬の渡し', pos: P.ford, r: 40, sub: '大河' },
  { id: 'tower', name: '共振の見張り塔', pos: P.tower, r: 35, sub: '環刻文明の遺跡' },
  { id: 'clearing', name: '倒木地帯', pos: P.clearing, r: 70, sub: '草海と樹海の境' },
  { id: 'jade_edge', name: '翡翠の縁', pos: P.jadeEdge, r: 35, vista: true, sub: '翡翠の樹海' },
  { id: 'nine', name: '九本石', pos: P.nineStones, r: 45, sub: '暁の草海' },
  { id: 'slab', name: '古い群れの道', pos: P.fossilSlab, r: 20, sub: '暁の草海' },
  { id: 'sandbank', name: '大河の砂州', pos: P.sandbank, r: 25, sub: '大河' },
  { id: 'grove', name: 'ソテツの茂み', pos: P.grove, r: 25, sub: '草海と樹海の境' },
  { id: 'ravine', name: '根の谷', pos: { x: 360, z: -200 }, r: 50, sub: '翡翠の樹海' },
  { id: 'jade_gate', name: '翡翠の門', pos: P.jadeGate, r: 30, vista: true, sub: '翡翠の樹海' },
  { id: 'tunnel', name: '根の地下道', pos: P.rootTunnel, r: 18, sub: '翡翠の樹海' },
];

const MAP_N = 64;

export class Game {
  renderer: THREE.WebGLRenderer;
  world!: World;
  input: Input;
  settings: Settings;
  audio = new AudioEngine();
  cam!: ThirdPersonCamera;
  player!: Player;
  eco!: Ecosystem;
  orga!: Orga;
  npcs!: CampNpcs;
  state: GameState = newState();
  saves = new SaveSystem(localStorage);
  ui!: UI;
  mode: Mode = 'loading';
  clock = new THREE.Clock();
  time = 0;
  interactables: Interactable[] = [];
  focusInteract: Interactable | null = null;
  holdT = 0;
  stones: Stone[] = [];
  lockTarget: Creature | null = null;
  lockOrga = false;
  smoke: { pos: THREE.Vector3; t: number } | null = null;
  listenT = 0;
  autosaveT = 0;
  mapBits = new Uint8Array(MAP_N * MAP_N);
  tutorialShown = new Set<string>();
  kohaku: Creature | null = null;
  tsuyumi: { mesh: THREE.Object3D; pos: THREE.Vector3; taken: boolean }[] = [];
  statics: { id: string; pos: THREE.Vector3; mesh?: THREE.Object3D }[] = [];
  museumMeshes = new Map<string, THREE.Object3D>();
  titleT = 0;
  times: number[] = [];
  cpuTimes: number[] = [];      // 1フレームの JavaScript 処理（更新＋描画命令の発行）
  renderTimes: number[] = [];   // そのうち描画命令の発行
  simTimes: number[] = [];      // 生態系・プレイヤー・ボス
  composer: EffectComposer | null = null;
  bokeh: BokehPass | null = null;
  photo = { fov: 45, focus: 12, aperture: 0.0006, exposure: 1, saturation: 1, contrast: 1, hour: 12, hideUi: true, camPos: new THREE.Vector3(), yaw: 0, pitch: 0 };
  private photoSavedHour = 0;
  lastCounterWindow = 0;
  escortAmbush = false;
  private rng = new Rng(77);
  private pendingDialogue: Dialogue | null = null;
  private lastPlayerPos = new THREE.Vector3();
  prevHp = 100;
  bossActive = false;
  endShown = false;

  constructor(private root: HTMLElement) {
    this.settings = loadSettings();
    this.renderer = createRenderer(root);
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.input = new Input(this.renderer.domElement, this.settings.bindings);
    this.applyInputSettings();
  }

  // ------------------------------------------------------------ 起動

  async boot(ui: UI) {
    this.ui = ui;
    this.audio.onCaption = (c) => this.ui.caption(c);
    this.resize();
    addEventListener('resize', () => this.resize());
    ui.loading('世界を準備しています…');
    await new Promise((r) => setTimeout(r, 30));
    const t0 = performance.now();
    this.world = new World(this.settings.quality, (m) => ui.loading(m));
    ui.loading('生き物たちを目覚めさせています…');
    await new Promise((r) => setTimeout(r, 10));
    this.cam = new ThirdPersonCamera(this.world.terrain, innerWidth / innerHeight);
    this.cam.baseFov = this.settings.fov;
    this.cam.shakeScale = this.settings.cameraShake;
    this.cam.occluder = (from, to) => {
      const c = this.world.colliders.raycast(from.x, from.z, to.x, to.z, 0.35, (k) => k.kind !== 'rock' && k.top > Math.min(from.y, to.y));
      if (!c) return Infinity;
      return Math.max(0, Math.hypot(c.x - from.x, c.z - from.z) - c.r);
    };
    this.player = new Player(this.world, this.input, this.settings, this.playerHost(), DEFAULT_APPEARANCE);
    this.player.faceNearestTarget = () => this.faceTarget();
    this.eco = new Ecosystem(this.world, this.ecoEvents());
    this.eco.populate();
    this.eco.telegraphScale = DIFFICULTY[this.settings.difficulty].telegraph;
    this.orga = new Orga(this.eco, this.world, this.bossHost());
    this.npcs = new CampNpcs(this.world);
    this.buildStatics();
    this.buildMuseum();
    this.world.flora.onFallen = (t) => { if (t.id === 'bridge') { this.state.flags.bridge = true; this.toast('根の谷に、倒木の橋が架かった', 'info'); } };
    this.buildMs = performance.now() - t0;
    // 最初の描画でシェーダーを準備
    this.world.update(0.016, this.player.pos, this.cam.cam, false);
    this.renderer.compile(this.world.scene, this.cam.cam);
    this.mode = 'title';
    this.player.place(P.startHill.x + 6, P.startHill.z - 4, Math.PI * 0.8);
    this.player.model.root.visible = false;
    ui.title();
    this.loop();
    (window as any).__game = this.debugApi();
  }
  buildMs = 0;

  resize() {
    const q = QUALITY_PRESETS[this.settings.quality];
    const pr = Math.min(devicePixelRatio || 1, q.pixelRatioCap) * this.settings.renderScale;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(innerWidth, innerHeight);
    if (this.cam) { this.cam.cam.aspect = innerWidth / innerHeight; this.cam.cam.updateProjectionMatrix(); }
    this.composer?.setSize(innerWidth, innerHeight);
  }

  applyInputSettings() {
    this.input.bindings = this.settings.bindings;
    this.input.mouseSensitivity = this.settings.mouseSensitivity;
    this.input.padSensitivity = this.settings.padSensitivity;
    this.input.invertY = this.settings.invertY;
  }

  applySettings(needsReload = false) {
    saveSettings(this.settings);
    this.applyInputSettings();
    this.audio.volumes = { master: this.settings.masterVolume, sfx: this.settings.sfxVolume, amb: this.settings.ambienceVolume, music: this.settings.musicVolume };
    this.audio.applyVolumes();
    if (this.cam) { this.cam.baseFov = this.settings.fov; this.cam.shakeScale = this.settings.cameraShake; }
    if (this.eco) this.eco.telegraphScale = DIFFICULTY[this.settings.difficulty].telegraph;
    document.documentElement.dataset.textSize = this.settings.textSize;
    document.documentElement.dataset.colorAid = this.settings.colorAid ? '1' : '0';
    this.resize();
    return needsReload;
  }

  // ------------------------------------------------------------ 新規・読み込み

  newGame(app: Appearance) {
    this.state = newState(app);
    this.applyState(true);
    this.mode = 'play';
    this.audio.start();
    this.ui.intro([
      '芽吹きの月。夜明け前の渡りの丘。',
      '群れが北から帰る日を見届けるのが、今朝の、ひとりきりの役目だった。',
      '――だが、聞こえてくる地響きは、帰りの足取りではなかった。',
    ], () => { this.ui.hint('move'); this.audio.vista(); });
    this.startQuest('prologue');
  }

  loadSlot(slot: SlotId): string | null {
    const r = this.saves.read(slot);
    if (!r.ok) return r.reason;
    this.state = r.state;
    this.applyState(false);
    this.mode = 'play';
    this.audio.start();
    this.toast(`記録を読み込みました（${this.state.checkpoint.label}）`, 'info');
    return null;
  }

  /** 状態を世界へ反映する（新規・読み込み共通） */
  private applyState(fresh: boolean) {
    const s = this.state;
    this.player.model.setAppearance(s.appearance);
    this.player.model.root.visible = true;
    this.player.place(s.player.x, s.player.z, s.player.yaw);
    this.player.hp = s.player.hp; this.player.dead = false; this.player.mount = null; this.player.climbing = false;
    this.player.stones = s.player.stones; this.player.tools = { ...s.player.tools };
    this.world.clock.total = s.clock;
    this.cam.yaw = s.player.yaw; this.cam.pitch = 0.12;
    // 技能
    this.applySkills();
    // 地図
    this.mapBits.fill(0);
    if (s.mapReveal) { try { const bin = atob(s.mapReveal); for (let i = 0; i < Math.min(bin.length, this.mapBits.length); i++) this.mapBits[i] = bin.charCodeAt(i); } catch { /* 空の地図で続行 */ } }
    // 遺跡と柵
    s.tower.rings.forEach((r, i) => { this.world.landmarks.ringStones[i].state = r; });
    this.world.landmarks.setTowerActive(!s.tower.solved);
    if (s.fence.gap && !this.world.landmarks.fenceGapOpen) this.world.landmarks.openFenceGap();
    for (const i of s.fence.thornCut) this.world.flora.cutThicket(i);
    if (s.lookout) this.world.landmarks.buildLookout(s.lookout);
    // オルガと橋
    this.orga.restore(s.orga.phase as OrgaPhase, s.orga.pins);
    if (s.flags.bridge) this.world.flora.setFallen('bridge', -Math.PI / 2);
    this.eco.setRouteOpen(!!s.flags.orgaResolved);
    for (const j of this.eco.creatures.filter((c) => c.tag.startsWith('juvenile') || c.tag.startsWith('safe'))) {
      const idx = j.tag.endsWith('0') ? 0 : 1;
      if (s.flags['juvSafe' + idx]) { j.tag = 'safe' + idx; j.setState('idle'); j.pos.set(P.grove.x + idx * 4, 0, P.grove.z); j.pos.y = this.world.terrain.height(j.pos.x, j.pos.z); }
    }
    // コハク
    this.setupKohaku();
    // ヒメヨロイの繁殖路
    if (s.fence.gap) this.eco.fenceOpen = true;
    this.refreshMuseum();
    this.refreshPhotos();
    this.ui.refreshHud();
    this.bossActive = false;
    this.audio.setBoss(false);
    if (fresh) this.discover('hill');
  }

  /** 現在の状態をまとめる */
  snapshot(): GameState {
    const s = this.state;
    const p = this.player;
    const pos = p.mount ? p.mount.pos : p.pos;
    s.player = { x: pos.x, z: pos.z, yaw: p.yaw, hp: Math.max(1, p.hp), stones: p.stones, tools: { ...p.tools } };
    s.clock = this.world.clock.total;
    s.tower.rings = this.world.landmarks.ringStones.map((r) => r.state);
    s.fence.thornCut = [...this.world.flora.thicketCut];
    s.orga.phase = this.orga.phase === 'walkToBridge' || this.orga.phase === 'resolved' ? 'calm' : this.orga.fighting ? (this.orga.checkpoint?.phase ?? 'dormant') : this.orga.phase;
    s.orga.pins = this.orga.pins.map((x) => x.broken);
    if (this.kohaku) s.mount = { bonded: this.kohaku.tag === 'mount', x: this.kohaku.pos.x, z: this.kohaku.pos.z };
    let bin = '';
    for (let i = 0; i < this.mapBits.length; i++) bin += String.fromCharCode(this.mapBits[i]);
    s.mapReveal = btoa(bin);
    return s;
  }

  save(slot: SlotId) {
    const r = this.saves.write(slot, this.snapshot());
    this.toast(r.ok ? `${slot.startsWith('auto') ? '自動記録' : '記録'}しました${r.error ? '（' + r.error + '）' : ''}` : r.error ?? '記録できませんでした', r.ok ? 'save' : 'warn');
    return r;
  }
  autosave(reason: string) {
    if (this.mode !== 'play' || this.player.dead || this.orga.fighting) return;
    const r = this.saves.autosave(this.snapshot());
    this.autosaveT = 0;
    this.ui.saveIndicator(r.ok);
    void reason;
  }

  // ------------------------------------------------------------ 仕掛けと手がかりの配置

  private buildStatics() {
    const T = this.world.terrain;
    const Y = (x: number, z: number) => T.height(x, z);
    const add = (id: string, x: number, z: number, mesh?: THREE.Object3D) => {
      const pos = new THREE.Vector3(x, Y(x, z), z);
      if (mesh) { mesh.position.copy(pos); this.world.scene.add(mesh); }
      this.statics.push({ id, pos, mesh });
    };
    // 丘の東：深い足跡（群れが走った跡）
    for (let i = 0; i < 16; i++) {
      const x = -515 + i * 3.6 + Math.sin(i) * 1.5, z = 262 - i * 5.6;
      this.world.staticPrints.add({ species: 'sorakubi', kind: 'round', x, z, time: 4.5, heading: 2.6, size: 1.8, depth: 0.42, speed: 3.6, trackId: -1 });
    }
    add('deep_tracks', -500, 237);
    // 倒木地帯：左右で深さの違うオルガの足跡
    for (let i = 0; i < 10; i++) {
      const x = 372 + i * 2.4, z = 70 - i * 3.8;
      const left = i % 2 === 0;
      this.world.staticPrints.add({ species: 'suikaku', kind: 'cera', x: x + (left ? -1.2 : 1.2), z, time: 4, heading: 2.8, size: left ? 1.3 : 1.9, depth: left ? 0.15 : 0.45, speed: 1.2, trackId: -2 });
    }
    add('uneven_tracks', 382, 52);
    // 倒木の角の跡：広場の西寄りの丸太
    const log = this.world.flora.logs.reduce((a, b) => (Math.hypot(b.x - 380, b.z - 40) < Math.hypot(a.x - 380, a.z - 40) ? b : a));
    add('horn_marks', log.x, log.z);
    // 棘の茂みの中の羽毛
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.45, 4), new THREE.MeshStandardMaterial({ color: 0x2e2a22 }));
    feather.rotation.z = 1.2;
    add('thorn_feathers', P.thornThicket.x + 3, P.thornThicket.z - 2, feather);
    // 砂州の古い卵の殻
    const eggs = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6), new THREE.MeshStandardMaterial({ color: 0xd8ccb0, roughness: 0.7, side: THREE.DoubleSide }));
      e.position.set(Math.cos(i * 1.3) * 0.5, 0.02, Math.sin(i * 1.3) * 0.5); e.rotation.x = Math.PI * (i % 2);
      eggs.add(e);
    }
    add('old_eggs', P.sandbank.x - 6, P.sandbank.z + 2, eggs);
    // 柵の前（ヒメヨロイの集まる場所）
    add('fence_blocked', FENCE.gap.x - 4, FENCE.gap.z + 3);
    // 北へ続くコハクの足跡
    for (let i = 0; i < 26; i++) {
      const t = i / 25;
      const x = -165 + (-40 + 165) * t + Math.sin(i * 0.7) * 3, z = -8 + (-150 + 8) * t;
      this.world.staticPrints.add({ species: 'kazeashi', kind: 'tri', x, z, time: 5, heading: Math.atan2(125, -142), size: 0.35, depth: 0.04, speed: 1, trackId: -3 });
    }
    add('kohaku_tracks', -150, -25);
    // 塔の丘の頭骨の化石
    {
      const g = new THREE.Group();
      const bone = new THREE.MeshStandardMaterial({ color: 0xcfc2a0, roughness: 0.9 });
      const frill = new THREE.Mesh(new THREE.CircleGeometry(1.1, 14, 0, Math.PI), bone); frill.rotation.set(-1.1, 0, 0); frill.position.y = 0.3; g.add(frill);
      for (const sx of [-0.35, 0.35]) { const h = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.9, 6), bone); h.position.set(sx, 0.35, 0.5); h.rotation.x = 1.1; g.add(h); }
      const sk = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 6), bone); sk.scale.set(0.8, 0.6, 1.3); sk.position.set(0, 0.1, 0.6); g.add(sk);
      add('skull_fossil', P.tower.x - 12, P.tower.z + 22, g);
      g.rotation.y = 0.6; g.position.y -= 0.25;
    }
    // ツユミ草（赤い実）
    const berryMat = new THREE.MeshStandardMaterial({ color: 0xb8302a, roughness: 0.4 });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x4a6a2e, roughness: 0.8 });
    for (let i = 0; i < 5; i++) {
      const g = new THREE.Group();
      for (let k = 0; k < 5; k++) {
        const st = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.015, 0.6, 4), stemMat);
        st.position.set(Math.cos(k) * 0.1, 0.3, Math.sin(k) * 0.1); st.rotation.z = (k - 2) * 0.15; g.add(st);
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), berryMat); b.position.set(Math.cos(k) * 0.12, 0.62, Math.sin(k) * 0.12); g.add(b);
      }
      const x = -18 + i * 5 + this.rng.range(-2, 2), z = -118 + this.rng.range(-8, 8);
      g.position.set(x, Y(x, z), z);
      this.world.scene.add(g);
      this.tsuyumi.push({ mesh: g, pos: g.position.clone(), taken: false });
    }
  }

  private buildMuseum() {
    const L = this.world.landmarks;
    Object.keys(MUSEUM_ITEMS).forEach((id, i) => {
      const it = MUSEUM_ITEMS[id];
      const slot = L.museumSlots[i];
      if (!slot) return;
      const m = new THREE.MeshStandardMaterial({ color: it.color, roughness: 0.6, metalness: it.shape === 'device' ? 0.6 : 0 });
      let o: THREE.Object3D;
      if (it.shape === 'feather') { o = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.55, 4), m); o.rotation.z = Math.PI / 2; }
      else if (it.shape === 'device') { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 6, 16, Math.PI * 1.3), m)); const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.45, 6), m); pin.rotation.z = 0.5; g.add(pin); o = g; }
      else if (it.shape === 'slab') { o = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.4), m); }
      else if (it.shape === 'horn') { o = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.35, 8), m); o.rotation.z = 1.3; }
      else { o = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), m); o.scale.set(1, 1.3, 1); }
      o.position.copy(slot).add(new THREE.Vector3(0, 0.12, 0));
      o.visible = false;
      this.world.scene.add(o);
      this.museumMeshes.set(id, o);
    });
  }
  refreshMuseum() { for (const [id, m] of this.museumMeshes) m.visible = this.state.museum.includes(id); }
  addMuseum(id: string) {
    if (this.state.museum.includes(id)) return;
    this.state.museum.push(id);
    this.refreshMuseum();
    this.toast(`展示棚に加わる：${MUSEUM_ITEMS[id].name}`, 'info');
  }
  refreshPhotos() {
    const frames = this.world.landmarks.photoFrames;
    const photos = this.state.photos.slice(-frames.length);
    frames.forEach((f, i) => {
      const src = photos[i];
      const mat = f.material as THREE.MeshBasicMaterial;
      if (!src) { mat.map = null; mat.color.set(0x3a3226); mat.needsUpdate = true; return; }
      new THREE.TextureLoader().load(src, (tex) => { tex.colorSpace = THREE.SRGBColorSpace; mat.map = tex; mat.color.set(0xffffff); mat.needsUpdate = true; });
    });
  }

  private setupKohaku() {
    const s = this.state;
    if (!this.kohaku) {
      const k = this.eco.spawn('kazeashi', -40, -150, false, null);
      k.tag = 'kohaku';
      k.scale = 0.9; k.rig.root.scale.setScalar(0.9); k.anim.scale = 0.9;
      k.rig.material.color.set(0xffe8c0);
      this.kohaku = k;
    }
    const k = this.kohaku;
    const q = s.quests.bond_kohaku;
    if (s.mount.bonded || q?.done) {
      k.tag = 'mount';
      const x = s.mount.x || P.camp.x + 14, z = s.mount.z || P.camp.z - 4;
      k.pos.set(x, this.world.terrain.height(x, z), z);
      k.setState('idle');
    } else if (q && q.stage >= 2) {
      k.trust = true;
      if (q.stage >= 3) {
        // 送り届けの途中から：水場の手前から再開
        k.tag = 'kohaku';
        k.pos.set(-20, this.world.terrain.height(-20, -130), -130);
        if (q.stage === 3) { this.state.quests.bond_kohaku!.stage = 2; this.state.flags.tsuyumi = 3; }
      }
    }
  }

  // ------------------------------------------------------------ クエスト・手がかり・図鑑

  startQuest(id: string) {
    if (this.state.quests[id]) return;
    this.state.quests[id] = { stage: 0, done: false, hints: 0, started: true };
    const q = QUESTS[id];
    this.toast(`${q.kind === 'main' ? '物語' : q.kind === 'ruin' ? '遺跡' : '依頼'}：${q.title}`, 'quest');
    this.ui.refreshHud();
    this.autosave('quest');
  }
  setStage(id: string, stage: number) {
    const q = this.state.quests[id];
    if (!q || q.done || q.stage >= stage) return;
    q.stage = stage; q.hints = 0;
    const def = QUESTS[id];
    if (def.stages[stage]) this.toast(`${def.title}：${def.stages[stage].text}`, 'quest');
    this.ui.refreshHud();
    this.autosave('stage');
  }
  completeQuest(id: string, outcome?: string) {
    const q = this.state.quests[id];
    if (!q || q.done) return;
    q.done = true; if (outcome) q.outcome = outcome;
    this.gainInsight(3, `「${QUESTS[id].title}」を終えた`);
    this.toast(`完了：${QUESTS[id].title}`, 'quest');
    this.audio.play('discover', null, 1);
    this.ui.refreshHud();
    this.autosave('complete');
  }

  addClue(id: string) {
    if (this.state.clues.includes(id)) return false;
    this.state.clues.push(id);
    const c = CLUES[id];
    this.toast(`手がかり：${c.title}`, 'clue');
    this.ui.notebookPulse();
    this.checkDeductions();
    this.progressQuests();
    return true;
  }
  private has(token: string) {
    if (token.startsWith('seen:')) return (this.state.codex[token.slice(5)] ?? []).includes('seen');
    return this.state.clues.includes(token);
  }
  checkDeductions() {
    for (const d of Object.values(DEDUCTIONS)) {
      if (this.state.deductions.includes(d.id)) continue;
      if (d.needs.some((set) => set.every((t) => this.has(t)))) {
        this.state.deductions.push(d.id);
        this.gainInsight(2, `推理「${d.title}」`);
        this.ui.deduction(d.title, d.text);
      }
    }
  }
  addRecord(id: string) {
    if (this.state.records.includes(id)) return;
    this.state.records.push(id);
    this.gainInsight(1, '');
    this.toast(`文明の記録：${RECORDS[id].title}`, 'clue');
  }
  gainInsight(n: number, why: string) {
    this.state.insight += n;
    if (why) this.ui.insight(n, why);
  }

  observe(species: string, obs: ObsId) {
    const list = (this.state.codex[species] ??= []);
    const def = SPECIES[species] ?? (SMALL_SPECIES as any)[species];
    if (!def) return;
    if (list.includes(obs) || !def.obs.includes(obs)) {
      if (obs === 'seen' && !list.includes('seen')) { /* 下で追加 */ } else return;
    }
    if (list.includes(obs)) return;
    const first = list.length === 0;
    list.push(obs);
    this.state.stats.observations++;
    this.gainInsight(1, '');
    this.audio.play('codex', null, 0.8);
    this.ui.codexToast(def.name, first ? '図鑑に記録された' : OBS_TEXT[obs], first);
    if (def.obs.every((o: ObsId) => list.includes(o))) this.toast(`${def.name}の図鑑が完成した`, 'quest');
    this.checkDeductions();
    this.progressQuests();
  }

  /** 状態に応じてクエストを進める（イベントのたびに呼ぶ） */
  progressQuests() {
    const s = this.state;
    const q = s.quests;
    if (q.prologue && !q.prologue.done) {
      if (q.prologue.stage === 0 && s.deductions.includes('fleeing_herd')) this.setStage('prologue', 1);
    }
    if (q.main_orga && !q.main_orga.done && q.main_orga.stage === 0 && (s.deductions.includes('orga_left') || s.deductions.includes('orga_tower'))) this.setStage('main_orga', 1);
    if (q.side_fence && !q.side_fence.done && q.side_fence.stage === 0 && s.deductions.includes('fence_cut')) this.setStage('side_fence', 1);
    if (!q.tower && (s.clues.includes('hum') || s.discovered.includes('tower'))) this.startQuest('tower');
  }

  // ------------------------------------------------------------ 生態系・ボス・プレイヤーの橋渡し

  private ecoEvents() {
    const self = this;
    return {
      observe(sp: string, obs: ObsId) { if (self.mode === 'play' || self.mode === 'dialogue') self.observe(sp, obs); },
      call(c: Creature, kind: 'call' | 'alarm' | 'roar' | 'hiss' | 'distress' | 'chirp', loud: number) {
        self.audio.voice(c.sp.voice.kind, c.sp.voice.base * (c.juvenile ? 1.8 : 1), c.pos.clone().setY(c.pos.y + c.rig.template.height * c.scale * 0.7), loud, kind, self.knownName(c.sp.id));
        const d = c.pos.distanceTo(self.player.pos);
        if (d < (c.sp.voice.base < 120 ? 600 : 90) && self.mode === 'play') self.observe(c.sp.id, 'call');
      },
      footstep(c: Creature, pos: THREE.Vector3, weight: number) {
        self.audio.footstep(pos, weight);
        if (c.tag === 'orga') self.audio.bossBeat(1);
      },
      playerHit(dmg: number, from: THREE.Vector3, knock: number, src: Creature) { self.hitPlayer(dmg, from, knock, src.sp.name); },
      kill(pred: Creature | null, prey: Creature) {
        if (pred && prey.pos.distanceTo(self.player.pos) < 150) self.toast(`${self.knownName(pred.sp.id)}が${self.knownName(prey.sp.id)}を仕留めた`, 'info');
      },
      shake(pos: THREE.Vector3, strength: number, radius: number) {
        const d = pos.distanceTo(self.player.pos);
        if (d < radius) self.cam.addShake(strength * (1 - d / radius) * 0.25);
      },
    };
  }
  knownName(id: string) {
    return (this.state.codex[id] ?? []).includes('seen') ? SPECIES[id]?.name ?? id : '見知らぬ生き物';
  }

  private bossHost() {
    const self = this;
    return {
      playerPos: () => self.player.pos,
      playerDead: () => self.player.dead,
      hitPlayer: (d: number, from: THREE.Vector3, k: number) => self.hitPlayer(d, from, k, '翠角王'),
      isPlayerClimbing: () => self.player.climbing,
      throwPlayer: (from: THREE.Vector3, safe: boolean) => {
        self.player.climbing = false;
        const a = Math.random() * Math.PI * 2;
        self.player.pos.set(from.x + Math.cos(a) * 7, 0, from.z + Math.sin(a) * 7);
        self.player.pos.y = self.player.groundAt(self.player.pos.x, self.player.pos.z) + 2.5;
        self.player.vy = 4;
        if (!safe) self.hitPlayer(6, from, 4, '翠角王');
        else self.toast('振り落とされる前に飛び降りた', 'hint');
      },
      message: (t: string, kind?: 'boss' | 'hint' | 'info') => { if (kind === 'boss') self.ui.bossTitle(t); else self.toast(t, kind ?? 'hint'); },
      sound: (k: string, pos: THREE.Vector3, v?: number) => self.audio.play(k, pos, v ?? 1),
      shake: (s: number) => self.cam.addShake(s),
      onPhase: (ph: OrgaPhase) => {
        if (ph === 'p1' && !self.bossActive) { self.bossActive = true; self.audio.setBoss(true); self.state.checkpoint = { x: 330, z: 60, label: '倒木地帯の縁' }; }
        self.ui.refreshHud();
      },
      onResolved: () => self.onOrgaResolved(),
      telegraphScale: () => DIFFICULTY[self.settings.difficulty].telegraph,
      towerSilenced: () => self.state.tower.solved,
      dodgeHeld: () => self.input.down('dodge'),
    };
  }

  private playerHost() {
    const self = this;
    return {
      meleeHit: (kind: 'light' | 'heavy', origin: THREE.Vector3, yaw: number, reach: number, arc: number, dmg: number, posture: number) => self.meleeHit(kind, origin, yaw, reach, arc, dmg, posture),
      fireStone: (origin: THREE.Vector3) => self.fireStone(origin),
      sound: (k: string, pos: THREE.Vector3, v?: number) => self.audio.play(k, pos, v ?? 1),
      message: (t: string, kind?: 'hint' | 'info') => self.toast(t, kind ?? 'hint'),
      onDeath: () => self.respawn(),
      pushOut: (pos: THREE.Vector3, r: number) => self.eco.pushOut(pos, r),
      mountBlocked: (m: Creature) => {
        const pred = self.eco.creatures.find((c) => !c.dead && c.sp.diet === 'meat' && !c.sp.flying && c.pos.distanceTo(m.pos) < 22);
        if (pred) { if (Math.random() < 0.01) self.toast('コハクが肉食獣の匂いに怯えて、前へ進まない', 'hint'); return 'predator'; }
        return null;
      },
    };
  }

  hitPlayer(dmg: number, from: THREE.Vector3, knock: number, who: string) {
    const d = dmg * DIFFICULTY[this.settings.difficulty].dmgTaken;
    if (this.player.mount) { this.player.dismount(); }
    if (this.player.damage(d, from, knock)) {
      this.cam.addShake(0.35 + d / 60);
      this.ui.damageFlash(from, this.player.pos, this.cam.yaw);
      if (this.player.dead) { this.state.stats.deaths++; this.ui.death(who); }
    }
  }

  private respawn() {
    if (this.mode === 'dead') return;
    const p = this.player;
    this.mode = 'play';
    this.ui.hideDeath();
    p.dead = false; p.hp = p.maxHp; p.stamina = p.maxStamina; p.climbing = false; p.mount = null;
    if (this.orga.fighting || this.orga.engaged) {
      // 戦闘中：直前の段階から（長い演出は挟まない）
      this.orga.resetForRetry();
      p.place(330, 60, Math.atan2(P.clearing.x - 330, P.clearing.z - 60));
      this.toast('倒木地帯の縁で目を覚ました。段階の最初からやり直せる', 'info');
    } else {
      const cp = this.state.checkpoint;
      const nearCamp = Math.hypot(cp.x - P.camp.x, cp.z - P.camp.z) < 60;
      p.place(nearCamp ? P.camp.x + 3 : cp.x, nearCamp ? P.camp.z + 5 : cp.z, 0);
      this.toast(`${cp.label}で目を覚ました`, 'info');
    }
    // 近くの捕食者の関心を解く
    for (const c of this.eco.creatures) if (c.targetPlayer) { c.targetPlayer = false; c.awareness = 0; c.setState('wander'); if (c.herd) c.herd.hunger = 0; }
    this.cam.yaw = p.yaw;
  }

  private meleeHit(kind: 'light' | 'heavy', origin: THREE.Vector3, yaw: number, reach: number, arc: number, dmg: number, posture: number) {
    const counter = this.time - this.lastCounterWindow < 0.6 && this.state.skills.includes('counter') && kind === 'light';
    if (counter) dmg *= 1.6;
    // オルガ：背の上なら杭、地上なら体（弾かれる）
    if (this.player.climbing) {
      let best = -1, bd = 3.5;
      this.orga.pins.forEach((pin, i) => { if (!pin.broken && pin.exposed) { const d = this.orga.pinWorld(i).distanceTo(this.player.pos.clone().setY(this.player.pos.y + 1)); if (d < bd) { bd = d; best = i; } } });
      if (best >= 0) { this.orga.hitPin(best, dmg * 1.2); this.cam.addShake(0.15); this.world.particles.emit(this.orga.pinWorld(best).x, this.orga.pinWorld(best).y, this.orga.pinWorld(best).z, 8, 2, 0.4, 60, 0.6, 1); }
      else this.toast('杭に手が届かない。露出している杭のそばで攻撃しよう', 'hint');
      return;
    }
    const fx = Math.sin(yaw), fz = Math.cos(yaw);
    const o = this.orga.c;
    const toO = new THREE.Vector3(o.pos.x - origin.x, 0, o.pos.z - origin.z);
    const distO = toO.length() - o.radius * 1.3;
    if (this.orga.device.visible && distO < reach && this.orga.phase !== 'calm') {
      this.orga.hitBody();
      this.world.particles.emit(origin.x + fx * 1.5, origin.y, origin.z + fz * 1.5, 6, 2, 0.3, 40, 0.5, 1);
      if (!this.tutorialShown.has('deflect')) { this.tutorialShown.add('deflect'); this.toast('皮が硬すぎて刃が通らない。背の「導き杭」を狙う方法を探そう', 'hint'); }
    }
    let hitAny = false;
    for (const c of this.eco.creaturesNear(origin.x, origin.z, reach + 4)) {
      if (c.tag === 'orga' || c.state === 'mounted' || c.tag === 'mount' || c.tag === 'kohaku') continue;
      const dx = c.pos.x - origin.x, dz = c.pos.z - origin.z;
      const d = Math.hypot(dx, dz) - c.radius;
      if (d > reach) continue;
      const ang = Math.abs(Math.atan2(Math.sin(Math.atan2(dx, dz) - yaw), Math.cos(Math.atan2(dx, dz) - yaw)));
      if (ang > arc / 2 + 0.2) continue;
      this.eco.hitCreature(c, dmg, posture, origin, this.playerSense());
      hitAny = true;
      this.world.particles.emit(c.pos.x, c.pos.y + c.rig.template.height * c.scale * 0.6, c.pos.z, 6, 3, 0.3, 50, 0.6, 1);
    }
    if (hitAny) { this.audio.play('hit', origin, 1); this.cam.addShake(kind === 'heavy' ? 0.25 : 0.1); }
  }

  private fireStone(origin: THREE.Vector3) {
    // 画面中央の狙いへ、重力を見込んで投げる
    const dir = this.cam.aimDir();
    const target = this.cam.cam.position.clone().addScaledVector(dir, 60);
    for (let t = 2; t < 60; t += 1.5) {
      const p = this.cam.cam.position.clone().addScaledVector(dir, t);
      if (p.y < this.world.terrain.height(p.x, p.z)) { target.copy(p); break; }
    }
    const speed = 42;
    const to = target.clone().sub(origin);
    const flightT = to.length() / speed;
    const vel = to.divideScalar(flightT);
    vel.y += 0.5 * 9.8 * flightT;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), new THREE.MeshStandardMaterial({ color: 0x777066 }));
    mesh.position.copy(origin);
    this.world.scene.add(mesh);
    this.stones.push({ pos: origin.clone(), vel, life: 3, mesh });
  }

  private updateStones(dt: number) {
    for (const s of this.stones) {
      const prev = s.pos.clone();
      s.vel.y -= 9.8 * dt;
      s.pos.addScaledVector(s.vel, dt);
      s.life -= dt;
      s.mesh.position.copy(s.pos);
      // 杭
      let hit = false;
      if (this.orga.phase !== 'calm') {
        this.orga.pins.forEach((pin, i) => {
          if (hit || pin.broken) return;
          const pw = this.orga.pinWorld(i);
          if (distToSegment(pw, prev, s.pos) < 0.9) {
            hit = true;
            if (pin.exposed && this.orga.vulnerable()) this.orga.hitPin(i, 15);
            else if (pin.exposed) { this.orga.hitPin(i, 6); }
            else this.toast('その杭はまだ深く埋まっている', 'hint');
          }
        });
      }
      // 生物
      if (!hit) for (const c of this.eco.creaturesNear(s.pos.x, s.pos.z, 6)) {
        if (c.tag === 'kohaku' || c.tag === 'mount') continue;
        const center = c.pos.clone(); center.y += c.rig.template.height * c.scale * 0.55;
        const r = Math.max(0.5, c.radius * 1.2);
        if (distToSegment(center, prev, s.pos) < r) {
          hit = true;
          if (c.tag === 'orga') { this.orga.hitBody(); break; }
          this.eco.hitCreature(c, 10, 6, s.pos, this.playerSense());
          if (c.sp.id === 'kusagari') c.fear += 0.25;
          this.audio.play('stoneHit', s.pos, 1);
          break;
        }
      }
      if (!hit && s.pos.y < this.world.terrain.height(s.pos.x, s.pos.z)) { hit = true; this.world.particles.emit(s.pos.x, s.pos.y + 0.1, s.pos.z, 4, 0, 0.3, 30, 0.8, 0.5); this.audio.play('stoneHit', s.pos, 0.4); }
      if (hit) s.life = 0;
    }
    for (const s of this.stones.filter((x) => x.life <= 0)) this.world.scene.remove(s.mesh);
    this.stones = this.stones.filter((x) => x.life > 0);
  }

  private faceTarget() {
    const t = this.lockTarget ?? this.eco.creaturesNear(this.player.pos.x, this.player.pos.z, 5).find((c) => c.isHostileToPlayer);
    if (t) this.player.yaw = Math.atan2(t.pos.x - this.player.pos.x, t.pos.z - this.player.pos.z);
  }

  playerSense(): PlayerSense {
    const p = this.player;
    let concealed = p.concealed;
    if (this.smoke && this.smoke.pos.distanceTo(p.pos) < 8) concealed = 1;
    const windSkill = this.state.skills.includes('windread');
    return { pos: p.pos, noise: p.noise * (windSkill ? 0.85 : 1), crouched: p.crouched, concealed, mounted: !!p.mount, dead: p.dead, calmSkill: this.state.skills.includes('calm') && !p.sprinting };
  }

  applySkills() {
    const s = this.state.skills;
    const p = this.player;
    p.staminaMul = s.includes('stamina') ? 0.75 : 1;
    p.swimMul = s.includes('swim') ? 1.4 : 1;
    p.heavyMul = s.includes('heavy_focus') ? 1.4 : 1;
    p.maxStones = 12 + (s.includes('pouch') ? 8 : 0);
    // 風読み：嗅覚の距離を縮める
    for (const sp of Object.values(SPECIES)) (sp as any)._smellBase ??= sp.smell;
    for (const sp of Object.values(SPECIES)) sp.smell = (sp as any)._smellBase * (s.includes('windread') ? 0.6 : 1);
  }
  learnSkill(id: string) {
    const def = SKILLS.find((x) => x.id === id);
    if (!def || this.state.skills.includes(id)) return false;
    const spent = this.state.skills.reduce((a, k) => a + (SKILLS.find((x) => x.id === k)?.cost ?? 0), 0);
    if (this.state.insight - spent < def.cost) return false;
    this.state.skills.push(id);
    this.applySkills();
    this.audio.play('discover', null, 0.6);
    return true;
  }
  resetSkills() { this.state.skills = []; this.applySkills(); }
  insightFree() { return this.state.insight - this.state.skills.reduce((a, k) => a + (SKILLS.find((x) => x.id === k)?.cost ?? 0), 0); }

  // ------------------------------------------------------------ 調べる・話す

  private footprintReading(f: FootprintRec): string {
    const known = f.species === 'human' ? '人' : this.knownName(f.species);
    const age = this.world.clock.total - f.time;
    const precise = this.state.skills.includes('timeread');
    const ageText = f.trackId < 0 ? '夜明け前' : precise ? `${Math.max(1, Math.round(age * 60))}分前` : age < 0.3 ? 'ついさっき' : age < 2 ? '少し前' : age < 6 ? '半日ほど前' : 'だいぶ前';
    const depthCm = Math.round(f.depth * 100);
    const weight = f.depth > 0.3 ? 'とても重い' : f.depth > 0.12 ? '重い' : f.depth > 0.04 ? '中くらい' : '軽い';
    const pace = f.speed > 6 ? '全力で走っていた' : f.speed > 2.5 ? '急いでいた' : f.speed > 0.8 ? '歩いていた' : 'ゆっくり歩いていた';
    const dir = compass(f.heading);
    return `${known}の足跡。深さ${depthCm}cm（${weight}）。${ageText}。${pace}。${dir}へ向かっている。`;
  }

  private gatherInteractables() {
    const list: Interactable[] = [];
    const p = this.player;
    const s = this.state;
    const pp = p.pos;
    const near = (x: number, z: number, r: number) => Math.hypot(pp.x - x, pp.z - z) < r;
    const V = (x: number, z: number, y?: number) => new THREE.Vector3(x, y ?? this.world.terrain.height(x, z) + 1, z);
    if (p.mount) {
      list.push({ id: 'dismount', label: '降りる', pos: p.pos.clone(), radius: 99, priority: -1, use: () => p.dismount() });
      return list;
    }
    // オルガ
    const o = this.orga;
    if (p.climbing) {
      if (o.phase === 'exhausted') list.push({ id: 'extract', label: '装置を引き抜く（長押し。揺れたら手をゆるめる）', pos: p.pos.clone(), radius: 99, priority: 10, use: () => { o.startExtract(); } });
      list.push({ id: 'jumpoff', label: '背から降りる', pos: p.pos.clone(), radius: 99, priority: -1, use: () => { p.climbing = false; const f = o.flankPoint(); p.place(f.x, f.z, p.yaw); } });
      return list;
    }
    if (o.fighting && (o.vulnerable()) && o.c.pos.distanceTo(pp) < o.c.radius * 1.7 + 4) {
      list.push({ id: 'climb', label: '背に登る', pos: o.flankPoint(), radius: 8, priority: 9, use: () => { p.climbing = true; p.attack = null; this.toast('背の上で攻撃すると杭を狙える。揺さぶられたら回避を押して飛び降りる', 'hint'); } });
    }
    // NPC
    if (near(P.camp.x, P.camp.z, 40)) {
      for (const n of this.npcs.list) list.push({ id: 'npc_' + n.id, label: `話す：${NPCS[n.id].name}`, pos: n.pos.clone().setY(n.pos.y + 1.2), radius: 2.6, priority: 5, use: () => this.talk(n.id) });
      const L = this.world.landmarks;
      list.push({ id: 'fire', label: '焚き火で休む・記録する', pos: L.fire.base.clone(), radius: 3.2, priority: 3, use: () => this.ui.restMenu() });
      list.push({ id: 'cart', label: '石袋と道具を補充する', pos: new THREE.Vector3(P.camp.x + 16, L.fire.base.y + 1, P.camp.z + 6), radius: 3.5, use: () => { p.stones = p.maxStones; p.tools = { noise: 3, smoke: 2 + (s.quests.side_fence?.outcome === 'cut' ? 2 : 0) }; this.audio.play('gather', p.pos, 1); this.toast('投石と道具を補充した', 'info'); } });
      list.push({ id: 'desk', label: '研究机：図鑑を開く', pos: L.deskPos.clone(), radius: 2.5, use: () => this.ui.openMenu('codex') });
      list.push({ id: 'shelf', label: '展示棚を見る', pos: L.shelfPos.clone(), radius: 2.8, use: () => this.ui.museum() });
      list.push({ id: 'board', label: '写真の板を見る', pos: L.boardPos.clone(), radius: 3, use: () => this.ui.museum(true) });
    }
    if (s.lookout) {
      const g = s.lookout === 'A' ? this.world.landmarks.lookoutA : this.world.landmarks.lookoutB;
      list.push({ id: 'lookout', label: '見張り台に登る（眺める）', pos: g.position.clone().setY(g.position.y + 1), radius: 3, use: () => this.climbLookout(g.position) });
    }
    // 足跡（最寄りの1つ）
    const fps = this.world.footprints.near(pp.x, pp.z, 2.4, this.world.clock.total).concat(this.world.staticPrints.near(pp.x, pp.z, 2.4, this.world.clock.total));
    if (fps.length) {
      const f = fps.reduce((a, b) => (Math.hypot(a.x - pp.x, a.z - pp.z) < Math.hypot(b.x - pp.x, b.z - pp.z) ? a : b));
      if (f.species !== 'human') list.push({ id: 'print', label: '足跡を調べる', pos: V(f.x, f.z, this.world.terrain.height(f.x, f.z) + 0.2), radius: 2.6, priority: 1, use: () => this.investigatePrint(f) });
    }
    // 固定の手がかり
    for (const st of this.statics) {
      if (st.id === 'skull_fossil') continue;
      if (s.clues.includes(st.id) && st.id !== 'fence_blocked') continue;
      if (st.id === 'fence_blocked' && s.clues.includes('fence_blocked')) continue;
      const label = { deep_tracks: '深い足跡を調べる', uneven_tracks: '大きな足跡を調べる', horn_marks: '倒木を調べる', thorn_feathers: '茂みの中を調べる', old_eggs: '砂州を調べる', fence_blocked: '柵の前を調べる', kohaku_tracks: '小さな足跡を調べる' }[st.id] ?? '調べる';
      if (st.id === 'thorn_feathers' || st.id === 'old_eggs' || st.id === 'fence_blocked') { if (!s.quests.side_fence) continue; }
      if (st.id === 'kohaku_tracks' && !s.quests.bond_kohaku) continue;
      list.push({ id: 'st_' + st.id, label, pos: st.pos.clone().setY(st.pos.y + 0.5), radius: st.id === 'horn_marks' ? 5 : 3, priority: 2, use: () => this.useStatic(st.id) });
    }
    // 落とし物
    for (const d of this.eco.drops) list.push({ id: 'drop' + d.id, label: `拾う：${d.species === 'kusagari' ? '黒い羽毛' : '縞の羽毛'}`, pos: d.pos.clone().setY(d.pos.y + 0.3), radius: 2, use: () => { const x = this.eco.takeDrop(d.id); if (x) { this.observe(x.species, 'feather'); this.addMuseum('feather_' + x.species); this.audio.play('gather', p.pos, 1); } } });
    // 塔
    const L = this.world.landmarks;
    if (near(P.tower.x, P.tower.z, 25)) {
      list.push({ id: 'mural', label: '壁画を見る', pos: L.muralPos.clone(), radius: 4, use: () => { this.addClue('mural'); this.ui.mural(); } });
      if (!s.tower.solved) L.ringStones.forEach((r, i) => list.push({ id: 'ring' + i, label: `輪石を回す（いまの印：${['日の出', '真昼', '日の入り', '月'][r.state]}）`, pos: r.pos.clone(), radius: 2.6, use: () => this.rotateRing(i) }));
      if (!s.records.includes('rec_tower')) list.push({ id: 'rec_tower', label: '基壇の文字を写す', pos: new THREE.Vector3(P.tower.x + 3, L.muralPos.y - 2, P.tower.z - 3), radius: 5, use: () => this.addRecord('rec_tower') });
    }
    // 幼体（泥からの救出と誘導）
    for (const j of this.eco.creatures) {
      if (!j.tag.startsWith('juvenile')) continue;
      if (j.state === 'stuck' && j.pos.distanceTo(pp) < 5) list.push({ id: 'juv' + j.id, label: '泥から押し出す（長押し）', pos: j.pos.clone().setY(j.pos.y + 1), radius: 5, hold: 1.8, priority: 4, use: () => { j.setState('led'); this.toast('幼体が泥から抜け出した。後ろから近づくと離れる方へ歩く。東の「ソテツの茂み」へ導こう', 'hint'); this.addClue('stuck_juveniles'); } });
    }
    // コハク
    const k = this.kohaku;
    if (k && !k.dead) {
      const bq = s.quests.bond_kohaku;
      const dk = k.pos.distanceTo(pp);
      if (k.tag === 'mount' && dk < 3.5 && !this.orga.fighting) list.push({ id: 'ride', label: 'コハクに乗る', pos: k.pos.clone().setY(k.pos.y + 1.5), radius: 3.5, priority: 6, use: () => p.mountUp(k) });
      if (bq && !bq.done) {
        if (bq.stage === 1 && dk < 9 && k.state !== 'flee' && !p.crouched) list.push({ id: 'reachHint', label: '立ったままでは驚かせてしまう。しゃがんで近づこう', pos: k.pos.clone().setY(k.pos.y + 1.5), radius: 9, use: () => this.ui.hint('crouch') });
        if (bq.stage === 1 && dk < 7 && k.state !== 'flee' && p.crouched) list.push({ id: 'reach', label: 'そっと手を伸ばす（長押し）', pos: k.pos.clone().setY(k.pos.y + 1.5), radius: 7, hold: 2, priority: 6, use: () => { this.setStage('bond_kohaku', 2); k.trust = true; this.toast('コハクが鼻先を寄せてきた。好物のツユミ草を探そう', 'hint'); } });
        if (bq.stage === 2 && dk < 4 && (s.flags.tsuyumi as number ?? 0) >= 3) list.push({ id: 'offer', label: 'ツユミ草を差し出す', pos: k.pos.clone().setY(k.pos.y + 1.5), radius: 4, priority: 6, use: () => this.startEscort() });
      }
    }
    // ツユミ草
    if (s.quests.bond_kohaku && !s.quests.bond_kohaku.done) for (const t of this.tsuyumi) if (!t.taken) list.push({ id: 'ts', label: 'ツユミ草を摘む', pos: t.pos.clone().setY(t.pos.y + 0.5), radius: 2.2, use: () => { t.taken = true; t.mesh.visible = false; s.flags.tsuyumi = ((s.flags.tsuyumi as number) ?? 0) + 1; this.audio.play('gather', p.pos, 1); this.toast(`ツユミ草 ${s.flags.tsuyumi}/3`, 'info'); } });
    // 柵と棘の茂み（依頼の決断）
    const fq = s.quests.side_fence;
    if (fq && fq.stage === 2) {
      list.push({ id: 'gap', label: '柵の低い所を外して、小さな通り道を開ける', pos: V(FENCE.gap.x, FENCE.gap.z), radius: 4, hold: 2.5, priority: 4, use: () => this.openFence() });
      const th = this.world.flora.thicketPlacements;
      th.forEach((t, i) => { if (!this.world.flora.thicketCut.has(i)) list.push({ id: 'cut' + i, label: '棘の茂みを刈る（長押し）', pos: V(t.x, t.z), radius: 2.6, hold: 1.2, use: () => this.cutThorn(i) }); });
    }
    // 記録
    if (near(P.nineStones.x, P.nineStones.z, 38) && !s.records.includes('rec_nine')) list.push({ id: 'nine', label: '石の並びを調べる', pos: V(P.nineStones.x + 25, P.nineStones.z - 10), radius: 30, use: () => this.addRecord('rec_nine') });
    if (!s.records.includes('rec_slab')) list.push({ id: 'slab', label: '岩の足跡を調べる', pos: L.fossilPos.clone(), radius: 3.5, use: () => { this.addRecord('rec_slab'); this.observe('sorakubi', 'fossil' as ObsId); this.addMuseum('slab_cast'); } });
    const skull = new THREE.Vector3(P.tower.x - 12, 0, P.tower.z + 22); skull.y = this.world.terrain.height(skull.x, skull.z) + 0.5;
    if (!(s.codex.suikaku ?? []).includes('fossil') && skull.distanceTo(pp) < 4) list.push({ id: 'skull', label: '半ば埋まった頭骨の化石を調べる', pos: skull, radius: 3.5, use: () => {
      const seen = (s.codex.suikaku ?? []).includes('seen');
      this.ui.reading('頭骨の化石', seen ? '大きなフリルと三本の角。翠角竜の頭骨だ。今の翠角竜より一回り小さい――王ほど大きな個体は、化石には残っていない。' : '大きな首の飾りと角をもつ、見たことのない生き物の頭骨。');
      if (seen) this.observe('suikaku', 'fossil'); } });
    if (near(P.rootTunnel.x, P.rootTunnel.z, 14)) list.push({ id: 'tunnel', label: '門石を調べる', pos: L.tunnelPos.clone(), radius: 8, use: () => this.reachTunnel() });
    return list;
  }

  private investigatePrint(f: FootprintRec) {
    const text = this.footprintReading(f);
    this.ui.reading('足跡', text);
    this.observe(f.species, 'track');
    if (f.species === 'sorakubi' && (f.speed > 2.5 || f.trackId === -1)) this.addClue('deep_tracks');
    if (f.species === 'suikaku' && f.trackId === -2) this.addClue('uneven_tracks');
    if (f.species === 'kazeashi' && f.trackId === -3) { this.addClue('kohaku_tracks'); }
    if (!this.tutorialShown.has('print')) { this.tutorialShown.add('print'); this.ui.hint('print'); }
  }

  private useStatic(id: string) {
    switch (id) {
      case 'deep_tracks': this.ui.reading('深い足跡', CLUES.deep_tracks.text); this.addClue('deep_tracks'); this.observe('sorakubi', 'track'); break;
      case 'uneven_tracks': this.ui.reading('大きな足跡', CLUES.uneven_tracks.text); this.addClue('uneven_tracks'); this.observe('suikaku', 'track'); break;
      case 'horn_marks': this.ui.reading('倒木', CLUES.horn_marks.text); this.addClue('horn_marks'); this.addMuseum('horn_chip'); break;
      case 'thorn_feathers': this.ui.reading('棘の茂み', CLUES.thorn_feathers.text); this.addClue('thorn_feathers'); this.observe('kusagari', 'feather'); this.addMuseum('feather_kusagari'); break;
      case 'old_eggs': this.ui.reading('砂州', CLUES.old_eggs.text); this.addClue('old_eggs'); this.observe('himeyoroi', 'nest'); this.addMuseum('egg_shell'); break;
      case 'fence_blocked': this.ui.reading('柵の前', CLUES.fence_blocked.text + '　柵の根元には、小さな足跡が行き止まりで折り返している。'); this.addClue('fence_blocked'); this.observe('himeyoroi', 'track'); break;
      case 'kohaku_tracks': this.ui.reading('小さな足跡', CLUES.kohaku_tracks.text); this.addClue('kohaku_tracks'); break;
    }
  }

  private rotateRing(i: number) {
    const L = this.world.landmarks;
    L.rotateRing(i);
    this.audio.play('stone', L.ringStones[i].pos, 1);
    if (L.ringsSolved()) {
      this.state.tower.solved = true;
      L.setTowerActive(false);
      this.audio.hum(0);
      this.toast('唸りが止んだ。塔の光が消えていく', 'quest');
      this.addClue('hum');
      this.completeQuest('tower');
      this.addRecord('rec_tower');
    }
  }

  private startEscort() {
    const k = this.kohaku!;
    this.setStage('bond_kohaku', 3);
    this.observe('kazeashi', 'graze');
    // 最も近い川岸の水場へ
    const rn = riverLine.nearest(k.pos.x, k.pos.z);
    const q = riverLine.pointAt(rn.s);
    const w = riverHalfWidth(rn.s, q.x, q.z) + 1.5;
    const dx = k.pos.x - q.x, dz = k.pos.z - q.z, dl = Math.hypot(dx, dz) || 1;
    k.target = new THREE.Vector3(q.x + (dx / dl) * w, 0, q.z + (dz / dl) * w);
    k.escort = k.target.clone();
    k.trust = true;
    k.setState('led');
    this.state.flags.escortT = 0;
    // 水場を狙う2頭のクサガリ
    if (!this.escortAmbush) {
      this.escortAmbush = true;
      const h = this.eco.newHerd('kusagari', { x: k.target.x - 60, z: k.target.z + 40, r: 60 });
      h.hunger = 0.95;
      for (let i = 0; i < 2; i++) this.eco.spawn('kusagari', k.target.x - 70 + i * 4, k.target.z + 50, false, h);
    }
    this.toast('コハクが水場へ歩き出した。そばで見守ろう', 'hint');
  }

  private openFence() {
    this.world.landmarks.openFenceGap();
    this.state.fence.gap = true;
    this.eco.fenceOpen = true;
    const q = this.state.quests.side_fence!;
    q.outcome = 'gap';
    this.setStage('side_fence', 3);
    this.audio.play('gather', this.player.pos, 1);
    this.toast('柵の下に、小さな生き物だけが通れる隙間ができた', 'info');
  }
  private cutThorn(i: number) {
    this.world.flora.cutThicket(i);
    this.audio.play('gather', this.player.pos, 1);
    const n = this.world.flora.thicketCut.size;
    const q = this.state.quests.side_fence!;
    if (n >= 8 && q.stage === 2) { q.outcome = 'cut'; this.setStage('side_fence', 3); this.toast('茂みの見通しがよくなった', 'info'); }
    else this.toast(`棘の茂みを刈った（${Math.min(n, 8)}/8）`, 'info');
  }

  private climbLookout(pos: THREE.Vector3) {
    const top = pos.clone().add(new THREE.Vector3(0, 8.5, 0));
    this.cam.cinematic = { pos: top.clone().add(new THREE.Vector3(0, 0.5, 0)), look: top.clone().add(new THREE.Vector3(-Math.sin(0.6) * 100, -8, Math.cos(0.6) * 100).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.state.lookout === 'A' ? Math.PI * 0.9 : 0.4)), t: 0, dur: 9 };
    this.toast('見張り台から眺める（数秒で戻ります）', 'info');
    // 見張り台からは地図の広い範囲が見える
    this.revealMap(top.x, top.z, 380);
  }

  private reachTunnel() {
    this.addRecord('rec_tunnel');
    this.discover('tunnel');
    if (this.state.quests.jade_gate && !this.state.quests.jade_gate.done) this.completeQuest('jade_gate');
    this.ui.endOfSlice();
  }

  talk(id: NpcId) {
    const d = dialogueFor(id, this.state);
    if (!d.lines.length) return;
    this.mode = 'dialogue';
    this.input.releasePointerLock();
    this.ui.dialogue(d, (action) => this.dialogueAction(action));
  }

  dialogueAction(action: string) {
    const s = this.state;
    switch (action) {
      case 'start_orga': case 'start_orga_soft': this.startQuest('main_orga'); break;
      case 'ena_why': this.ui.dialogue({ lines: EXTRA_LINES.ena_why }, () => this.dialogueAction('start_orga')); return;
      case 'finish_orga': this.setStage('main_orga', 3); this.completeQuest('main_orga'); this.startQuest('jade_gate'); break;
      case 'start_kohaku': this.startQuest('bond_kohaku'); break;
      case 'kohaku_info': this.ui.dialogue({ lines: EXTRA_LINES.kohaku_info }, () => this.dialogueAction('start_kohaku')); return;
      case 'finish_kohaku': {
        this.completeQuest('bond_kohaku');
        if (this.kohaku) { this.kohaku.tag = 'mount'; s.mount.bonded = true; }
        this.observe('kazeashi', 'bond');
        this.ui.hint('ride');
        break;
      }
      case 'start_fence': this.startQuest('side_fence'); break;
      case 'fence_stage2': this.setStage('side_fence', 2); break;
      case 'finish_fence': {
        const q = s.quests.side_fence!;
        this.completeQuest('side_fence', q.outcome);
        if (q.outcome === 'gap') { s.flags.proof_fence = true; this.toast('共存の実証：「柵の下の小道」', 'quest'); }
        break;
      }
      case 'build_A': case 'build_B': {
        const w = action === 'build_A' ? 'A' : 'B';
        s.lookout = w;
        this.world.landmarks.buildLookout(w);
        this.toast(`見張り台を${w === 'A' ? '崖の上' : '川辺'}に建てた`, 'quest');
        this.gainInsight(1, '野営地が少し大きくなった');
        break;
      }
    }
    this.progressQuests();
    this.ui.refreshHud();
  }

  onDialogueClosed() { if (this.mode === 'dialogue') this.mode = 'play'; }

  private onOrgaResolved() {
    const s = this.state;
    s.flags.orgaResolved = true;
    s.orga.method = 'release';
    s.orga.phase = 'calm';
    this.bossActive = false;
    this.audio.setBoss(false);
    this.audio.vista();
    this.player.climbing = false;
    const f = this.orga.flankPoint();
    this.player.place(f.x, f.z, this.player.yaw);
    this.addMuseum('device_part');
    this.ui.resolved('翠角王オルガ', '装置からの解放');
    this.setStage('main_orga', 2);
    this.eco.setRouteOpen(true);
    s.flags.proof_orga = true;
    // 幼体は王のもとへ
    for (const j of this.eco.creatures) if (j.tag.startsWith('juvenile') || j.tag.startsWith('safe')) { j.tag = 'safe'; j.setState('idle'); }
    this.state.checkpoint = { x: 330, z: 60, label: '倒木地帯の縁' };
    // 装置が外れた後の短い演出：王が谷へ向かう（操作は止めない）
    this.cam.cinematic = { pos: this.orga.c.pos.clone().add(new THREE.Vector3(-22, 12, 26)), look: this.orga.c.pos.clone().add(new THREE.Vector3(0, 5, 0)), t: 0, dur: 4 };
    setTimeout(() => this.autosave('resolved'), 6000);
  }

  discover(id: string) {
    const d = DISCOVERIES.find((x) => x.id === id);
    if (!d || this.state.discovered.includes(id)) return;
    this.state.discovered.push(id);
    this.ui.placeTitle(d.name, d.sub ?? '', !!d.vista);
    if (d.vista) this.audio.vista(); else this.audio.play('discover', null, 0.7);
    this.gainInsight(1, '');
    this.progressQuests();
  }

  revealMap(x: number, z: number, r: number) {
    const cell = 1600 / MAP_N;
    const i0 = Math.floor((x - r + 800) / cell), i1 = Math.floor((x + r + 800) / cell);
    const j0 = Math.floor((z - r + 800) / cell), j1 = Math.floor((z + r + 800) / cell);
    for (let j = Math.max(0, j0); j <= Math.min(MAP_N - 1, j1); j++) for (let i = Math.max(0, i0); i <= Math.min(MAP_N - 1, i1); i++) {
      const cx = -800 + (i + 0.5) * cell, cz = -800 + (j + 0.5) * cell;
      if (Math.hypot(cx - x, cz - z) < r) this.mapBits[j * MAP_N + i] = 1;
    }
  }

  // ------------------------------------------------------------ 道具・注目・口笛

  private useTool() {
    const p = this.player;
    const kind = p.toolIndex === 0 ? 'noise' : 'smoke';
    if (p.tools[kind] <= 0) { this.toast(`${kind === 'noise' ? '音玉' : '煙玉'}がない。野営地の荷車で補充できる`, 'hint'); return; }
    p.tools[kind]--;
    const at = p.pos.clone().add(p.forward.multiplyScalar(6));
    at.y = this.world.terrain.height(at.x, at.z);
    if (kind === 'noise') {
      this.eco.noiseBurst(at.x, at.z, 45);
      this.audio.play('noiseBomb', at, 1.2);
      this.world.particles.emit(at.x, at.y + 0.5, at.z, 25, 2, 0.8, 80, 0.6, 2);
      this.cam.addShake(0.2);
    } else {
      this.smoke = { pos: at.clone(), t: 12 };
      this.world.particles.emit(at.x, at.y + 0.5, at.z, 160, 0, 5, 400, 9, 0.6);
      for (const c of this.eco.creaturesNear(at.x, at.z, 12)) { c.awareness = 0; c.targetPlayer = false; }
    }
  }

  private toggleLock() {
    if (this.lockTarget || this.lockOrga) { this.lockTarget = null; this.lockOrga = false; this.cam.lockTarget = null; return; }
    const p = this.player;
    if (this.orga.fighting && this.orga.c.pos.distanceTo(p.pos) < 60) { this.lockOrga = true; return; }
    let best: Creature | null = null, bs = Infinity;
    for (const c of this.eco.creaturesNear(p.pos.x, p.pos.z, 40)) {
      if (c.tag === 'kohaku' || c.tag === 'mount' || c.sp.mass < 50) continue;
      const d = c.pos.distanceTo(p.pos);
      const ang = Math.abs(Math.atan2(Math.sin(Math.atan2(c.pos.x - p.pos.x, c.pos.z - p.pos.z) - this.cam.yaw), Math.cos(Math.atan2(c.pos.x - p.pos.x, c.pos.z - p.pos.z) - this.cam.yaw)));
      const score = d + ang * 25 - (c.isHostileToPlayer ? 20 : 0);
      if (ang < 1.2 && score < bs) { bs = score; best = c; }
    }
    this.lockTarget = best;
  }

  // ------------------------------------------------------------ メインループ

  private loop = () => {
    requestAnimationFrame(this.loop);
    const rawDt = this.clock.getDelta();
    const dt = Math.min(0.05, rawDt);
    this.time += dt;
    this.times.push(rawDt * 1000);
    if (this.times.length > 900) this.times.shift();
    this.input.update(dt, this.time);
    const t0 = performance.now();
    try {
      this.tick(dt);
      const t1 = performance.now();
      this.cpuTimes.push(t1 - t0);
      if (this.cpuTimes.length > 900) this.cpuTimes.shift();
    } catch (e) {
      console.error(e);
      this.ui?.fatal?.(String(e));
    }
    this.input.endFrame();
  };

  private tick(dt: number) {
    const I = this.input;
    if (I.pressed('perf')) this.ui.togglePerf();
    // タイトル・作成・フォトモードでも、パッドでのメニュー操作を受け付ける
    if (this.mode === 'title' || this.mode === 'create') { this.tickTitle(dt); this.ui.hudFrame(dt); return; }
    if (this.mode === 'loading') return;
    if (this.mode === 'photo') { this.tickPhoto(dt); this.ui.hudFrame(dt); return; }

    // メニューを開く
    if (this.mode === 'play') {
      if (I.pressed('pause')) { this.ui.openMenu('main'); return; }
      if (I.pressed('notebook')) { this.ui.openMenu('quests'); return; }
      if (I.pressed('map')) { this.ui.openMenu('map'); return; }
      if (I.pressed('photo')) { this.enterPhoto(); return; }
    }
    const playing = this.mode === 'play';
    const frozen = !playing || !!this.cam.cinematic;
    if (playing && !I.pointerLocked && I.lastDevice === 'kbm') this.ui.showClickToPlay(true); else this.ui.showClickToPlay(false);

    // 視点
    if (playing && !this.cam.cinematic) this.cam.look(I.look.x, I.look.y);
    if (I.wheel && playing) this.cam.zoom = clamp(this.cam.zoom + I.wheel * 0.6, 2.4, 9);

    // 世界の時間はメニュー中は止める
    const simDt = this.mode === 'menu' ? 0 : dt;
    this.world.grass.clearPushers();
    this.world.update(simDt, this.player.pos, this.cam.cam, simDt > 0);

    if (simDt > 0) {
      // プレイヤー
      if (playing && !frozen) {
        if (I.pressed('lockon')) this.toggleLock();
        if (I.pressed('toolNext')) { this.player.toolIndex = (this.player.toolIndex + 1) % 2; this.ui.refreshHud(); }
        if (I.pressed('tool')) this.useTool();
        if (I.pressed('whistle')) this.whistle();
        if (I.pressed('dodge')) this.lastCounterWindow = this.time;
      }
      this.player.update(simDt, this.cam.yaw, frozen);
      if (this.player.climbing) {
        const seat = this.orga.seatWorld();
        this.player.pos.copy(seat);
        this.player.yaw = this.orga.c.yaw;
        if (!frozen && I.pressed('light')) this.meleeHit('light', seat, this.player.yaw, 3, 6, 14, 0);
        if (!frozen && I.pressed('heavy')) this.meleeHit('heavy', seat, this.player.yaw, 3, 6, 26, 0);
        if (!frozen && I.pressed('dodge')) { this.player.climbing = false; const f = this.orga.flankPoint(); this.player.place(f.x, f.z, this.player.yaw); }
        this.orga.holding = I.down('interact') && this.orga.phase === 'extract';
      }
      // 生態系とボス
      const s0 = performance.now();
      this.eco.update(simDt, this.playerSense(), this.cam.cam);
      this.simTimes.push(performance.now() - s0);
      if (this.simTimes.length > 900) this.simTimes.shift();
      const juvSafe = this.eco.creatures.filter((c) => c.tag.startsWith('safe')).length;
      for (let i = 0; i < 2; i++) if (this.eco.creatures.some((c) => c.tag === 'safe' + i)) this.state.flags['juvSafe' + i] = true;
      this.orga.update(simDt, Math.max(juvSafe, this.state.flags.juvSafe0 && this.state.flags.juvSafe1 ? 2 : 0));
      this.world.resonance = this.orga.resonance * 0.8 + (this.state.tower.solved ? 0 : 0.3);
      this.updateStones(simDt);
      if (this.smoke) { this.smoke.t -= simDt; if (this.smoke.t <= 0) this.smoke = null; }
      this.npcs.update(simDt, this.time, this.player.pos, this.world.wind.strength);
      this.tickGameplay(simDt);
    }

    // カメラ
    const focus = this.player.climbing ? this.player.pos : this.player.mount ? this.player.pos : this.player.pos;
    this.cam.lockTarget = this.lockOrga ? this.orga.c.pos.clone().setY(this.orga.c.pos.y + 6) : this.lockTarget && !this.lockTarget.dead ? this.lockTarget.pos.clone().setY(this.lockTarget.pos.y + this.lockTarget.rig.template.height * this.lockTarget.scale * 0.6) : null;
    this.cam.lockSize = this.lockOrga ? 18 : this.lockTarget ? this.lockTarget.rig.template.length * this.lockTarget.scale : 0;
    if (this.lockTarget && (this.lockTarget.dead || this.lockTarget.pos.distanceTo(this.player.pos) > 55)) this.lockTarget = null;
    if (this.lockOrga && !this.orga.fighting) this.lockOrga = false;
    // 近くの巨大生物ほどカメラを引く
    let big = 0;
    for (const c of this.eco.creatures) {
      if (c.dead || c.sp.mass < 2000) continue;
      const L = c.rig.template.length * c.scale;
      const d = c.pos.distanceTo(this.player.pos);
      if (d < L * 1.6) big = Math.max(big, L * (1 - d / (L * 1.6)));
    }
    this.cam.bigNear = big;
    this.cam.update(dt, focus, { aiming: this.player.aiming, mounted: !!this.player.mount, swimming: this.player.swimming, playerYaw: this.player.yaw, moving: Math.hypot(this.player.vel.x, this.player.vel.y) > 0.5 || !!this.player.mount, autoFollow: I.lastDevice === 'pad' });

    // 音
    this.audio.setListener(this.cam.cam.position, this.cam.aimDir());
    this.updateAmbience(dt);

    // 描画
    this.renderer.toneMappingExposure = this.world.sky.exposure;
    const r0 = performance.now();
    this.renderer.render(this.world.scene, this.cam.cam);
    this.renderTimes.push(performance.now() - r0);
    if (this.renderTimes.length > 900) this.renderTimes.shift();
    this.ui.hudFrame(dt);
  }

  private tickGameplay(dt: number) {
    const p = this.player;
    const s = this.state;
    const I = this.input;
    s.playSeconds += dt;
    s.stats.distance += p.pos.distanceTo(this.lastPlayerPos) < 20 ? p.pos.distanceTo(this.lastPlayerPos) : 0;
    this.lastPlayerPos.copy(p.pos);
    this.revealMap(p.pos.x, p.pos.z, 110 + Math.max(0, p.pos.y - 15) * 2);
    // 発見
    for (const d of DISCOVERIES) if (!s.discovered.includes(d.id) && Math.hypot(p.pos.x - d.pos.x, p.pos.z - d.pos.z) < d.r) this.discover(d.id);
    if (!s.discovered.includes('night') && this.world.clock.isNight() && this.world.terrain.grassAt(p.pos.x, p.pos.z) > 0.4 && Math.hypot(p.pos.x - P.camp.x, p.pos.z - P.camp.z) > 60) {
      s.discovered.push('night'); this.ui.placeTitle('草海の夜', 'ホタルゴケムシの光', true); this.audio.vista(); this.observe('hotaru', 'seen');
    }
    // 水辺の小さな生き物（簡易観察）
    const rn = riverLine.nearest(p.pos.x, p.pos.z);
    if (rn.dist < riverHalfWidth(rn.s, p.pos.x, p.pos.z) + 6 && this.world.clock.daylight() > 0.5) { this.observe('yoroiuo', 'seen'); if (Math.random() < dt * 0.1) this.observe('ooyanma', 'seen'); }
    // 聞こえる手がかり：塔の唸り
    const dTower = Math.hypot(p.pos.x - P.tower.x, p.pos.z - P.tower.z);
    const humLevel = s.tower.solved ? 0 : Math.max(0, 1 - dTower / 170) * (0.4 + this.world.resonance);
    this.audio.hum(humLevel);
    if (humLevel > 0.25 && !s.clues.includes('hum')) { this.audio.caption('hum', '低い唸り（共振）', new THREE.Vector3(P.tower.x, 20, P.tower.z), 30); if (s.quests.main_orga) this.addClue('hum'); }
    if (this.orga.phase === 'dormant' && this.orga.c.pos.distanceTo(p.pos) < 90) this.observe('suikaku', 'seen');
    // プロローグ：野営地に着いた
    const qp = s.quests.prologue;
    if (qp && !qp.done && qp.stage === 1 && Math.hypot(p.pos.x - P.camp.x, p.pos.z - P.camp.z) < 30) { this.completeQuest('prologue'); this.toast('焚き火のそばのエナ婆に話しかけよう', 'hint'); s.checkpoint = { x: P.camp.x, z: P.camp.z, label: '大河の曲がりの野営地' }; }
    if (qp && !qp.done && qp.stage === 0 && Math.hypot(p.pos.x - P.camp.x, p.pos.z - P.camp.z) < 30) { this.setStage('prologue', 1); }
    // チェックポイント：野営地に入ったら
    if (Math.hypot(p.pos.x - P.camp.x, p.pos.z - P.camp.z) < 25) s.checkpoint = { x: P.camp.x, z: P.camp.z, label: '大河の曲がりの野営地' };
    // コハク
    const bq = s.quests.bond_kohaku;
    const k = this.kohaku;
    if (bq && !bq.done && k) {
      if (bq.stage === 0 && k.pos.distanceTo(p.pos) < 25 && k.visibleT > 0.5) { this.setStage('bond_kohaku', 1); this.ui.hint('wind'); }
      if (bq.stage === 3) {
        const t = k.target;
        if (t && k.pos.distanceTo(t.clone().setY(k.pos.y)) < 4) {
          const threat = this.eco.creatures.some((c) => !c.dead && c.sp.id === 'kusagari' && c.pos.distanceTo(k.pos) < 28);
          k.params.graze = 1;
          if (!threat) s.flags.escortT = ((s.flags.escortT as number) ?? 0) + dt;
          if ((s.flags.escortT as number) > 6) {
            this.observe('kazeashi', 'drink');
            this.setStage('bond_kohaku', 4);
            k.setState('graze'); k.target = null; k.escort = null;
            this.toast('コハクは水を飲み終え、こちらを見ている。タルクのところへ戻ろう', 'hint');
          }
        }
        if (!k.escort && bq.stage === 3 && k.target) k.escort = k.target.clone();
      }
      if (bq.stage === 4 && k.pos.distanceTo(p.pos) > 6) { k.seek(p.pos.x, p.pos.z, 3); }
    }
    // 翠角王：解決の前提となる知識
    if (this.orga.phase === 'dormant' && this.orga.c.pos.distanceTo(p.pos) < 60 && !this.tutorialShown.has('orgaSeen')) { this.tutorialShown.add('orgaSeen'); this.toast('巨大な翠角竜――翠角王オルガ。背中に、緑に光る何かが刺さっている', 'hint'); }
    // 自動記録（5分ごと）
    this.autosaveT += dt;
    if (this.autosaveT > 300) this.autosave('timer');
    // 操作説明（その場で一度だけ）
    if (!this.tutorialShown.has('crouchHint') && s.quests.bond_kohaku?.stage === 1) { this.tutorialShown.add('crouchHint'); this.ui.hint('crouch'); }
    if (this.orga.fighting && !this.tutorialShown.has('fight')) { this.tutorialShown.add('fight'); this.ui.hint('fight'); }
    // 聞き耳
    const listening = this.settings.listenToggle ? (I.pressed('listen') ? !this.listening : this.listening) : I.down('listen');
    this.listening = listening;
    this.world.footprints.uniforms.uHighlight.value = (listening ? 1 : 0.3 * this.settings.traceHighlight) + (s.skills.includes('timeread') ? 0.3 : 0);
    // 調べる対象
    this.interactables = this.gatherInteractables();
    this.updateInteraction(dt);
    // 体力の変化の表示
    if (p.hp !== this.prevHp) { this.ui.refreshHud(); this.prevHp = p.hp; }
    // 生物の気配（聞き耳中）
    if (listening) {
      const marks: { yaw: number; strength: number; name: string }[] = [];
      for (const c of this.eco.creatures) {
        if (c.dead) continue;
        const d = c.pos.distanceTo(p.pos);
        const range = 40 + Math.pow(c.sp.mass, 0.33) * 6;
        if (d > range || d < 3) continue;
        const moving = c.speed > 0.3 || c.state === 'eat';
        if (!moving && c.sp.mass < 5000) continue;
        marks.push({ yaw: Math.atan2(c.pos.x - p.pos.x, c.pos.z - p.pos.z), strength: 1 - d / range, name: this.knownName(c.sp.id) });
      }
      this.ui.listenMarks(marks, this.cam.yaw);
    } else this.ui.listenMarks([], 0);
    // 送り届けの最中は幼体の誘導も観察
    for (const j of this.eco.creatures) if (j.tag.startsWith('safe') && !s.flags['juvToast' + j.id]) { s.flags['juvToast' + j.id] = true; this.toast('幼体がソテツの茂みにたどり着いた', 'info'); }
  }
  listening = false;

  private updateInteraction(dt: number) {
    const p = this.player;
    const I = this.input;
    let best: Interactable | null = null, bs = Infinity;
    const eye = p.pos.clone().setY(p.pos.y + 1);
    for (const it of this.interactables) {
      const d = it.pos.distanceTo(eye);
      if (d > it.radius + (it.radius > 50 ? 0 : 0.5)) continue;
      const toIt = Math.atan2(it.pos.x - p.pos.x, it.pos.z - p.pos.z);
      const ang = Math.abs(Math.atan2(Math.sin(toIt - this.cam.yaw), Math.cos(toIt - this.cam.yaw)));
      // 向いている物を最優先に（近くのNPCが目の前の焚き火より優先されないように）
      const score = (it.radius > 50 ? 0 : d) + ang * 3.2 - (it.priority ?? 0) * 0.4;
      if (score < bs) { bs = score; best = it; }
    }
    // 長押しの途中は、対象がまだ有効なら切り替えない
    if (this.holdT > 0 && I.down('interact') && this.focusInteract) {
      const still = this.interactables.find((it) => it.id === this.focusInteract!.id);
      if (still && still.pos.distanceTo(eye) <= still.radius + 0.8) best = still;
    }
    if (best?.id !== this.focusInteract?.id) this.holdT = 0;
    this.focusInteract = best;
    if (!best || this.mode !== 'play' || this.cam.cinematic) { this.ui.prompt(null); return; }
    if (best.hold) {
      if (I.down('interact')) {
        this.holdT += dt; p.interactT = 0.2;
        if (this.holdT >= best.hold) { this.holdT = 0; best.use(); }
      } else this.holdT = 0;
      this.ui.prompt(best.label, I.glyph('interact'), this.holdT / best.hold);
    } else {
      if (best.id === 'extract') {
        this.ui.prompt(best.label, I.glyph('interact'), this.orga.phase === 'extract' ? this.orga.extractProgress : 0, this.orga.shudder > 0);
        if (I.pressed('interact') && this.orga.phase === 'exhausted') best.use();
        return;
      }
      this.ui.prompt(best.label, I.glyph('interact'), -1);
      if (I.pressed('interact')) { best.use(); this.holdT = 0; }
    }
  }

  private whistle() {
    const k = this.kohaku;
    this.audio.play('whistle', this.player.pos, 1);
    if (!k || k.tag !== 'mount') { this.toast('口笛は、絆を結んだ騎獣にしか届かない', 'hint'); return; }
    k.target = this.player.pos.clone();
    const pred = this.eco.creatures.find((c) => !c.dead && c.sp.diet === 'meat' && !c.sp.flying && c.pos.distanceTo(k.pos) < 30);
    if (pred) this.toast('コハクの怯えた声がする。近くに肉食獣がいて、来られないようだ', 'hint');
    else k.setState('follow');
  }

  private updateAmbience(dt: number) {
    const p = this.player.pos;
    const rn = riverLine.nearest(p.x, p.z);
    const river = rn.dist === Infinity ? 0 : Math.max(0, 1 - (rn.dist - riverHalfWidth(rn.s, p.x, p.z)) / 70);
    const fire = Math.max(0, 1 - Math.hypot(p.x - P.camp.x, p.z - P.camp.z) / 20);
    const W = this.world;
    this.audio.ambience(dt, {
      wind: W.wind.strength, grass: W.terrain.grassAt(p.x, p.z), river, rain: W.weather.rain, fire,
      jungle: W.terrain.jungleAt(p.x, p.z), night: W.clock.isNight() ? 1 : 0, day: W.clock.daylight(),
      altitude: clamp((p.y - 25) / 40, 0, 1), fog: W.weather.fog,
    });
  }

  // ------------------------------------------------------------ タイトル画面の背景

  private tickTitle(dt: number) {
    this.titleT += dt;
    const W = this.world;
    // 夜明けの丘から群れを望む（背景も実際のゲームの世界）
    if (this.mode === 'title') W.clock.total = 5.7 + Math.sin(this.titleT * 0.02) * 0.2;
    const focus = new THREE.Vector3(P.startHill.x, W.terrain.height(P.startHill.x, P.startHill.z), P.startHill.z);
    W.grass.clearPushers();
    W.update(dt, focus, this.cam.cam, false);
    this.eco.update(dt, { pos: this.cam.cam.position.clone(), noise: 0, crouched: true, concealed: 1, mounted: false, dead: true, calmSkill: true }, this.cam.cam);
    this.orga.update(dt, 0);
    this.npcs.update(dt, this.time, focus, W.wind.strength);
    if (this.mode === 'create') {
      const p = this.player;
      p.model.root.visible = true;
      p.model.root.position.copy(p.pos);
      p.model.root.rotation.y = this.titleT * 0.4;
      p.model.animate(dt, { speed: 0, crouch: 0, swim: 0, attack: 0, attackKind: 0, aim: 0, dodge: 0, ride: 0, hurt: 0, time: this.titleT, wind: W.wind.strength, interact: 0, climb: 0 });
      const c = this.cam.cam;
      c.position.set(p.pos.x + 2.4, p.pos.y + 1.5, p.pos.z + 1.2);
      c.lookAt(p.pos.x, p.pos.y + 1.05, p.pos.z);
    } else {
      const a = -2.2 + Math.sin(this.titleT * 0.03) * 0.25;
      const c = this.cam.cam;
      c.position.set(P.startHill.x + Math.cos(a) * 14, focus.y + 5, P.startHill.z + Math.sin(a) * 14);
      c.lookAt(P.startHill.x + 160, focus.y - 10, P.startHill.z - 110);
    }
    this.renderer.toneMappingExposure = W.sky.exposure;
    this.renderer.render(W.scene, this.cam.cam);
  }

  enterCreate() { this.mode = 'create'; this.player.place(P.startHill.x + 6, P.startHill.z - 4, 0); }

  // ------------------------------------------------------------ フォトモード

  enterPhoto() {
    this.mode = 'photo';
    this.input.releasePointerLock();
    this.photo.camPos.copy(this.cam.cam.position);
    const d = this.cam.aimDir();
    this.photo.yaw = Math.atan2(d.x, d.z); this.photo.pitch = Math.asin(clamp(d.y, -1, 1));
    this.photo.hour = this.world.clock.hour;
    this.photoSavedHour = this.world.clock.total;
    this.photo.fov = this.cam.cam.fov;
    if (!this.composer) {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.world.scene, this.cam.cam));
      this.bokeh = new BokehPass(this.world.scene, this.cam.cam, { focus: 12, aperture: 0.0006, maxblur: 0.012 });
      this.composer.addPass(this.bokeh);
      this.composer.addPass(new OutputPass());
      this.composer.setSize(innerWidth, innerHeight);
    }
    this.ui.photoMode(true);
  }
  exitPhoto() {
    this.world.clock.total = this.photoSavedHour;
    this.cam.cam.fov = this.cam.baseFov; this.cam.cam.updateProjectionMatrix();
    this.renderer.domElement.style.filter = '';
    this.mode = 'play';
    this.ui.photoMode(false);
  }
  private tickPhoto(dt: number) {
    const I = this.input;
    const ph = this.photo;
    // 自由カメラ（プレイヤーの近くに限る）
    const sp = (I.down('sprint') ? 12 : 4) * dt;
    const f = new THREE.Vector3(Math.sin(ph.yaw) * Math.cos(ph.pitch), Math.sin(ph.pitch), Math.cos(ph.yaw) * Math.cos(ph.pitch));
    const r = new THREE.Vector3(-Math.cos(ph.yaw), 0, Math.sin(ph.yaw));
    ph.camPos.addScaledVector(f, -I.move.y * sp).addScaledVector(r, I.move.x * sp);
    if (I.down('dodge')) ph.camPos.y += sp;
    if (I.down('crouch')) ph.camPos.y -= sp;
    const off = ph.camPos.clone().sub(this.player.pos);
    if (off.length() > 40) ph.camPos.copy(this.player.pos).add(off.setLength(40));
    ph.camPos.y = Math.max(ph.camPos.y, this.world.terrain.height(ph.camPos.x, ph.camPos.z) + 0.3);
    if (I.pointerLocked || I.lastDevice === 'pad') { ph.yaw -= I.look.x; ph.pitch = clamp(ph.pitch - I.look.y, -1.4, 1.4); }
    const c = this.cam.cam;
    c.position.copy(ph.camPos);
    c.lookAt(ph.camPos.clone().add(f));
    c.fov = ph.fov; c.updateProjectionMatrix();
    // 時刻のプレビュー（写真のためだけ。閉じると元に戻る）
    this.world.clock.total = Math.floor(this.photoSavedHour / 24) * 24 + ph.hour;
    this.world.grass.clearPushers();
    this.world.update(0, this.player.pos, c, false);
    this.renderer.toneMappingExposure = this.world.sky.exposure * ph.exposure;
    this.renderer.domElement.style.filter = `saturate(${ph.saturation}) contrast(${ph.contrast})`;
    if (this.bokeh) {
      const u = (this.bokeh as any).uniforms;
      u.focus.value = ph.focus; u.aperture.value = ph.aperture; u.maxblur.value = 0.012;
      this.composer!.render();
    } else this.renderer.render(this.world.scene, c);
    if (I.pressed('pause') || I.pressed('photo')) this.exitPhoto();
  }
  /** 写真を撮る：画面の色調補正も焼き込み、拠点の板に飾る */
  capturePhoto(): string {
    this.tickPhoto(0);
    const src = this.renderer.domElement;
    const w = 480, h = Math.round((src.height / src.width) * 480);
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const g = cv.getContext('2d')!;
    g.filter = `saturate(${this.photo.saturation}) contrast(${this.photo.contrast})`;
    g.drawImage(src, 0, 0, w, h);
    const url = cv.toDataURL('image/jpeg', 0.8);
    this.state.photos.push(url);
    if (this.state.photos.length > 6) this.state.photos.shift();
    this.refreshPhotos();
    // 写った生き物を図鑑の写真欄に
    for (const c of this.eco.creatures) {
      if (c.dead || c.pos.distanceTo(this.cam.cam.position) > 120) continue;
      if (this.eco.frustum.containsPoint(c.pos.clone().setY(c.pos.y + 1))) this.state.flags['photo_' + c.sp.id] = true;
    }
    // 高解像度の保存用
    return src.toDataURL('image/png');
  }

  // ------------------------------------------------------------ 休息

  rest(hour: number) {
    const p = this.player;
    if (this.eco.creatures.some((c) => c.targetPlayer && c.pos.distanceTo(p.pos) < 60)) { this.toast('近くに肉食獣がいて、休めない', 'warn'); return false; }
    this.world.clock.skipTo(hour);
    p.hp = p.maxHp; p.stamina = p.maxStamina;
    this.autosave('rest');
    this.toast(`${this.world.clock.label()}まで休んだ`, 'info');
    return true;
  }

  toast(text: string, kind: string) { this.ui?.toast(text, kind); }

  // ------------------------------------------------------------ 検証用

  debugApi() {
    const self = this;
    return {
      get times() { return self.times; },
      get cpuTimes() { return self.cpuTimes; },
      get renderTimes() { return self.renderTimes; },
      get simTimes() { return self.simTimes; },
      get buildMs() { return self.buildMs; },
      extra: () => ({ mode: self.mode, calls: self.renderer.info.render.calls, tris: self.renderer.info.render.triangles, creatures: self.eco.creatures.length, visible: self.eco.creatures.filter((c) => c.rig.root.visible).length, hour: self.world.clock.hour, pos: self.player.pos.toArray().map((v) => +v.toFixed(1)), quests: self.state.quests, orga: self.orga.phase, heap: (performance as any).memory?.usedJSHeapSize }),
      state: () => self.state,
      game: self,
    };
  }
}

function compass(heading: number) {
  // heading は (sin, cos) の向き。北 = -z
  const a = Math.atan2(Math.sin(heading), -Math.cos(heading));
  const names = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
  return names[((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8];
}

function distToSegment(p: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3) {
  const ab = b.clone().sub(a);
  const t = clamp(p.clone().sub(a).dot(ab) / Math.max(1e-6, ab.lengthSq()), 0, 1);
  return a.clone().addScaledVector(ab, t).distanceTo(p);
}

export { ravineLine, OBS_TEXT };
