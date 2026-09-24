import { Appearance, DEFAULT_APPEARANCE } from '../player/humanoid';
import { P } from '../world/layout';

// セーブされる状態。描画から独立した純粋なデータで、検証とテストができる。

export const SAVE_VERSION = 1;

export interface QuestState { stage: number; done: boolean; outcome?: string; hints: number; started: boolean }

export interface GameState {
  version: number;
  savedAt: number;
  playSeconds: number;
  appearance: Appearance;
  player: { x: number; z: number; yaw: number; hp: number; stones: number; tools: { noise: number; smoke: number } };
  clock: number;
  flags: Record<string, boolean | number | string>;
  quests: Record<string, QuestState>;
  clues: string[];
  deductions: string[];
  codex: Record<string, string[]>;
  insight: number;       // 気づき（成長の通貨）
  skills: string[];
  museum: string[];
  photos: string[];      // dataURL（小さな JPEG）
  mount: { bonded: boolean; x: number; z: number };
  checkpoint: { x: number; z: number; label: string };
  discovered: string[];
  mapReveal: string;     // 歩いた範囲（64×64 のビット列を base64）
  orga: { phase: string; pins: boolean[]; method?: string };
  tower: { rings: number[]; solved: boolean };
  fence: { gap: boolean; thornCut: number[] };
  lookout: '' | 'A' | 'B';
  records: string[];     // 文明の記録
  stats: { distance: number; observations: number; deaths: number };
}

export function newState(app: Appearance = DEFAULT_APPEARANCE): GameState {
  return {
    version: SAVE_VERSION,
    savedAt: Date.now(),
    playSeconds: 0,
    appearance: { ...app },
    player: { x: P.startHill.x + 6, z: P.startHill.z - 4, yaw: Math.PI * 0.8, hp: 100, stones: 12, tools: { noise: 3, smoke: 2 } },
    clock: 5.3,
    flags: {},
    quests: {},
    clues: [],
    deductions: [],
    codex: {},
    insight: 0,
    skills: [],
    museum: [],
    photos: [],
    mount: { bonded: false, x: 0, z: 0 },
    checkpoint: { x: P.startHill.x + 6, z: P.startHill.z - 4, label: '渡りの丘' },
    discovered: [],
    mapReveal: '',
    orga: { phase: 'dormant', pins: [false, false, false] },
    tower: { rings: [3, 0, 1], solved: false },
    fence: { gap: false, thornCut: [] },
    lookout: '',
    records: [],
    stats: { distance: 0, observations: 0, deaths: 0 },
  };
}

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isStrArr = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string');

/** 壊れた・未来の版のセーブでも落ちず、新しい状態を汚さない */
export function validateState(raw: unknown): { ok: true; state: GameState } | { ok: false; reason: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, reason: 'セーブデータの形式が正しくありません' };
  const r = raw as Record<string, any>;
  if (!isNum(r.version)) return { ok: false, reason: '版の情報がありません' };
  if (r.version > SAVE_VERSION) return { ok: false, reason: 'このセーブは新しい版で作られています' };
  const base = newState();
  const s: GameState = { ...base };
  try {
    s.savedAt = isNum(r.savedAt) ? r.savedAt : Date.now();
    s.playSeconds = isNum(r.playSeconds) ? Math.max(0, r.playSeconds) : 0;
    if (r.appearance && typeof r.appearance === 'object') s.appearance = { ...base.appearance, ...r.appearance, name: String(r.appearance.name ?? base.appearance.name).slice(0, 12) };
    const p = r.player ?? {};
    if (!isNum(p.x) || !isNum(p.z)) return { ok: false, reason: '位置の情報が壊れています' };
    s.player = {
      x: Math.max(-760, Math.min(760, p.x)), z: Math.max(-760, Math.min(760, p.z)), yaw: isNum(p.yaw) ? p.yaw : 0,
      hp: isNum(p.hp) ? Math.max(1, Math.min(100, p.hp)) : 100, stones: isNum(p.stones) ? Math.max(0, Math.min(99, Math.floor(p.stones))) : 12,
      tools: { noise: isNum(p.tools?.noise) ? p.tools.noise : 3, smoke: isNum(p.tools?.smoke) ? p.tools.smoke : 2 },
    };
    s.clock = isNum(r.clock) ? r.clock : base.clock;
    s.flags = r.flags && typeof r.flags === 'object' ? { ...r.flags } : {};
    s.quests = {};
    if (r.quests && typeof r.quests === 'object') {
      for (const [k, q] of Object.entries(r.quests as Record<string, any>)) {
        if (q && isNum(q.stage)) s.quests[k] = { stage: q.stage, done: !!q.done, outcome: typeof q.outcome === 'string' ? q.outcome : undefined, hints: isNum(q.hints) ? q.hints : 0, started: q.started !== false };
      }
    }
    s.clues = isStrArr(r.clues) ? [...new Set(r.clues)] : [];
    s.deductions = isStrArr(r.deductions) ? [...new Set(r.deductions)] : [];
    s.codex = {};
    if (r.codex && typeof r.codex === 'object') for (const [k, v] of Object.entries(r.codex)) if (isStrArr(v)) s.codex[k] = [...new Set(v)];
    s.insight = isNum(r.insight) ? Math.max(0, r.insight) : 0;
    s.skills = isStrArr(r.skills) ? [...new Set(r.skills)] : [];
    s.museum = isStrArr(r.museum) ? [...new Set(r.museum)] : [];
    s.photos = isStrArr(r.photos) ? r.photos.filter((x) => x.startsWith('data:image/')).slice(-6) : [];
    s.mount = { bonded: !!r.mount?.bonded, x: isNum(r.mount?.x) ? r.mount.x : 0, z: isNum(r.mount?.z) ? r.mount.z : 0 };
    s.checkpoint = r.checkpoint && isNum(r.checkpoint.x) && isNum(r.checkpoint.z) ? { x: r.checkpoint.x, z: r.checkpoint.z, label: String(r.checkpoint.label ?? '') } : base.checkpoint;
    s.discovered = isStrArr(r.discovered) ? [...new Set(r.discovered)] : [];
    s.mapReveal = typeof r.mapReveal === 'string' ? r.mapReveal : '';
    const pins = Array.isArray(r.orga?.pins) ? [0, 1, 2].map((i) => !!r.orga.pins[i]) : [false, false, false];
    s.orga = { phase: typeof r.orga?.phase === 'string' ? r.orga.phase : 'dormant', pins, method: typeof r.orga?.method === 'string' ? r.orga.method : undefined };
    const rings = Array.isArray(r.tower?.rings) ? [0, 1, 2].map((i) => (isNum(r.tower.rings[i]) ? ((r.tower.rings[i] % 4) + 4) % 4 : 0)) : base.tower.rings;
    s.tower = { rings, solved: !!r.tower?.solved };
    s.fence = { gap: !!r.fence?.gap, thornCut: Array.isArray(r.fence?.thornCut) ? r.fence.thornCut.filter(isNum) : [] };
    s.lookout = r.lookout === 'A' || r.lookout === 'B' ? r.lookout : '';
    s.records = isStrArr(r.records) ? [...new Set(r.records)] : [];
    s.stats = { distance: isNum(r.stats?.distance) ? r.stats.distance : 0, observations: isNum(r.stats?.observations) ? r.stats.observations : 0, deaths: isNum(r.stats?.deaths) ? r.stats.deaths : 0 };
  } catch {
    return { ok: false, reason: 'セーブデータを読み取れませんでした' };
  }
  return { ok: true, state: s };
}

// ---------------------------------------------------------------- 保存先

export type SlotId = 'manual1' | 'manual2' | 'manual3' | 'auto1' | 'auto2';
export const SLOT_LABELS: Record<SlotId, string> = { manual1: '記録 1', manual2: '記録 2', manual3: '記録 3', auto1: '自動記録 A', auto2: '自動記録 B' };
const KEY = (s: SlotId) => `varuna.save.${s}`;

export interface SlotInfo { id: SlotId; exists: boolean; savedAt?: number; playSeconds?: number; place?: string; name?: string; error?: string }

export interface Storage { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void }

export class SaveSystem {
  private autoToggle = false;
  constructor(private store: Storage) {}

  write(slot: SlotId, s: GameState): { ok: boolean; error?: string } {
    try {
      s.savedAt = Date.now();
      const json = JSON.stringify(s);
      this.store.setItem(KEY(slot), json);
      // 書き込みを読み戻して確かめる
      const back = this.store.getItem(KEY(slot));
      if (back !== json) return { ok: false, error: '保存を確認できませんでした' };
      return { ok: true };
    } catch (e) {
      // 容量不足なら写真を減らして再試行
      if (s.photos.length) { const t = { ...s, photos: s.photos.slice(-2) }; try { this.store.setItem(KEY(slot), JSON.stringify(t)); return { ok: true, error: '容量が足りないため、古い写真を記録から外しました' }; } catch { /* 下へ */ } }
      return { ok: false, error: '保存できませんでした（ブラウザの保存領域を確認してください）' };
    }
  }

  /** 自動記録は2枠を交互に使う（片方が壊れても、もう片方が残る） */
  autosave(s: GameState) {
    this.autoToggle = !this.autoToggle;
    const slot: SlotId = this.autoToggle ? 'auto1' : 'auto2';
    return { slot, ...this.write(slot, s) };
  }

  read(slot: SlotId): { ok: true; state: GameState } | { ok: false; reason: string } {
    const raw = this.store.getItem(KEY(slot));
    if (!raw) return { ok: false, reason: '記録がありません' };
    try { return validateState(JSON.parse(raw)); } catch { return { ok: false, reason: 'セーブデータが壊れています' }; }
  }

  info(slot: SlotId): SlotInfo {
    const raw = this.store.getItem(KEY(slot));
    if (!raw) return { id: slot, exists: false };
    const r = this.read(slot);
    if (!r.ok) return { id: slot, exists: true, error: r.reason };
    return { id: slot, exists: true, savedAt: r.state.savedAt, playSeconds: r.state.playSeconds, place: r.state.checkpoint.label, name: r.state.appearance.name };
  }

  latest(): SlotId | null {
    let best: SlotId | null = null, t = -1;
    for (const id of Object.keys(SLOT_LABELS) as SlotId[]) {
      const i = this.info(id);
      if (i.exists && !i.error && (i.savedAt ?? 0) > t) { t = i.savedAt ?? 0; best = id; }
    }
    return best;
  }

  remove(slot: SlotId) { this.store.removeItem(KEY(slot)); }
}
