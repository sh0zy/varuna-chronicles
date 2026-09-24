import { BindingMap, DEFAULT_BINDINGS, Action } from './input';

export type Quality = 'low' | 'medium' | 'high';
export type Difficulty = 'story' | 'traveler' | 'reader';

export interface Settings {
  version: 1;
  quality: Quality;
  renderScale: number;      // 0.5〜1.0
  fov: number;
  textSize: 'small' | 'medium' | 'large';
  subtitles: boolean;
  soundCaptions: boolean;
  colorAid: boolean;         // 色だけに頼らず形と模様で区別する
  cameraShake: number;       // 0〜1
  traceHighlight: number;    // 0〜1 痕跡の輪郭強調
  invertY: boolean;
  mouseSensitivity: number;
  padSensitivity: number;
  crouchToggle: boolean;     // true=切り替え、false=長押し
  aimToggle: boolean;
  listenToggle: boolean;
  difficulty: Difficulty;
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambienceVolume: number;
  showCompass: boolean;
  bindings: BindingMap;
}

export const DEFAULT_SETTINGS: Settings = {
  version: 1,
  quality: 'medium',
  renderScale: 0.85,
  fov: 58,
  textSize: 'medium',
  subtitles: true,
  soundCaptions: true,
  colorAid: false,
  cameraShake: 0.7,
  traceHighlight: 0.6,
  invertY: false,
  mouseSensitivity: 1,
  padSensitivity: 1,
  crouchToggle: true,
  aimToggle: false,
  listenToggle: false,
  difficulty: 'traveler',
  masterVolume: 0.8,
  musicVolume: 0.6,
  sfxVolume: 0.9,
  ambienceVolume: 0.8,
  showCompass: true,
  bindings: DEFAULT_BINDINGS,
};

const KEY = 'varuna.settings.v1';

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_SETTINGS);
    const s = JSON.parse(raw);
    const merged: Settings = { ...structuredClone(DEFAULT_SETTINGS), ...s };
    // 割り当ては行動ごとに補完（新しい行動が増えても壊れない）
    merged.bindings = structuredClone(DEFAULT_BINDINGS);
    if (s.bindings) {
      for (const a of Object.keys(DEFAULT_BINDINGS) as Action[]) {
        const b = s.bindings[a];
        if (b && Array.isArray(b.keys) && Array.isArray(b.pad)) merged.bindings[a] = { keys: b.keys.map(String), pad: b.pad.map(Number) };
      }
    }
    return merged;
  } catch {
    return structuredClone(DEFAULT_SETTINGS);
  }
}

export function saveSettings(s: Settings) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* 保存できない環境でも遊べる */ }
}

export const DIFFICULTY: Record<Difficulty, { name: string; dmgTaken: number; telegraph: number; desc: string }> = {
  story: { name: '物語', dmgTaken: 0.5, telegraph: 1.35, desc: '受けるダメージが半分になり、攻撃の予兆が長くなります。' },
  traveler: { name: '旅人（標準）', dmgTaken: 1, telegraph: 1, desc: '基準となる難易度です。' },
  reader: { name: '渡り読み', dmgTaken: 1.4, telegraph: 0.8, desc: '予兆が短くなり、群れがより連携します。体力は増えません。' },
};
