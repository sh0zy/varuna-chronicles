// キーボード＋マウスとゲームパッドを「行動」単位に統一する。割り当ては設定から変更できる。

export type Action =
  | 'sprint' | 'crouch' | 'dodge' | 'interact' | 'light' | 'heavy' | 'aim' | 'fire'
  | 'lockon' | 'tool' | 'toolNext' | 'listen' | 'whistle'
  | 'notebook' | 'map' | 'photo' | 'pause' | 'perf';

export interface Binding { keys: string[]; pad: number[] }
export type BindingMap = Record<Action, Binding>;

export const ACTION_LABELS: Record<Action, string> = {
  sprint: '走る', crouch: 'しゃがむ', dodge: '回避', interact: '調べる／話す／乗る',
  light: '軽攻撃', heavy: '重攻撃（長押しで溜め）', aim: '投石帯を構える', fire: '投げる（構え中）',
  lockon: '注目', tool: '道具を使う', toolNext: '道具を切り替え', listen: '耳を澄ます（長押し）',
  whistle: '騎獣を呼ぶ', notebook: '調査手帳', map: '地図', photo: 'フォトモード', pause: 'メニュー', perf: '性能表示',
};

// ゲームパッドは標準マッピング（Xbox配置の番号）
export const DEFAULT_BINDINGS: BindingMap = {
  sprint: { keys: ['ShiftLeft'], pad: [10] },          // L3押し込み＝走る
  crouch: { keys: ['KeyC', 'ControlLeft'], pad: [11] }, // R3＝しゃがむ
  dodge: { keys: ['Space'], pad: [1] },                 // B
  interact: { keys: ['KeyE'], pad: [0] },               // A
  light: { keys: ['Mouse0'], pad: [5] },                // RB
  heavy: { keys: ['KeyR'], pad: [3] },                  // Y
  aim: { keys: ['Mouse2'], pad: [6] },                  // LT
  fire: { keys: ['Mouse0'], pad: [7] },                 // RT
  lockon: { keys: ['KeyQ', 'Mouse1'], pad: [4] },       // LB
  tool: { keys: ['KeyG'], pad: [2] },                   // X
  toolNext: { keys: ['KeyT'], pad: [15] },              // 十字右
  listen: { keys: ['Tab'], pad: [14] },                 // 十字左（長押し）
  whistle: { keys: ['KeyH'], pad: [12] },               // 十字上
  notebook: { keys: ['KeyJ'], pad: [8] },               // View
  map: { keys: ['KeyM'], pad: [13] },                   // 十字下
  photo: { keys: ['KeyP'], pad: [] },
  pause: { keys: ['Escape'], pad: [9] },                // Menu
  perf: { keys: ['F3'], pad: [] },
};

export const PAD_NAMES: Record<number, string> = {
  0: 'A', 1: 'B', 2: 'X', 3: 'Y', 4: 'LB', 5: 'RB', 6: 'LT', 7: 'RT', 8: 'View', 9: 'Menu',
  10: 'L3', 11: 'R3', 12: '↑', 13: '↓', 14: '←', 15: '→',
};

export function keyName(code: string): string {
  if (code === 'Mouse0') return '左クリック';
  if (code === 'Mouse1') return 'ホイール押し';
  if (code === 'Mouse2') return '右クリック';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  const map: Record<string, string> = {
    ShiftLeft: 'Shift', ShiftRight: '右Shift', ControlLeft: 'Ctrl', Space: 'Space', Tab: 'Tab',
    Escape: 'Esc', Enter: 'Enter', AltLeft: 'Alt', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
  };
  return map[code] ?? code;
}

export class Input {
  bindings: BindingMap;
  private keys = new Set<string>();
  /** 1フレームより短い押下も取りこぼさないよう、前回の更新以降に押されたキーを覚えておく */
  private tapped = new Set<string>();
  private prevActive = new Set<Action>();
  private active = new Set<Action>();
  private holdStart = new Map<Action, number>();
  private pressedThisFrame = new Set<Action>();
  private releasedThisFrame = new Set<Action>();
  private mouseDX = 0;
  private mouseDY = 0;
  wheel = 0;
  move = { x: 0, y: 0 };
  look = { x: 0, y: 0 };
  lastDevice: 'kbm' | 'pad' = 'kbm';
  pointerLocked = false;
  mouseSensitivity = 1;
  padSensitivity = 1;
  invertY = false;
  enabled = true;
  /** 割り当て変更中は、次の入力を横取りする */
  capture: ((code: string, isPad: boolean) => void) | null = null;
  private padPrev: boolean[] = [];
  private canvas: HTMLElement;

  constructor(canvas: HTMLElement, bindings: BindingMap) {
    this.canvas = canvas;
    this.bindings = bindings;
    window.addEventListener('keydown', (e) => {
      if (this.capture) { e.preventDefault(); const c = this.capture; this.capture = null; c(e.code, false); return; }
      if (e.code === 'Tab' || e.code === 'F3' || e.code === 'Space') e.preventDefault();
      this.keys.add(e.code); this.tapped.add(e.code); this.lastDevice = 'kbm';
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
    canvas.addEventListener('mousedown', (e) => {
      if (this.capture) { const c = this.capture; this.capture = null; c('Mouse' + e.button, false); return; }
      this.keys.add('Mouse' + e.button); this.tapped.add('Mouse' + e.button); this.lastDevice = 'kbm';
    });
    window.addEventListener('mouseup', (e) => this.keys.delete('Mouse' + e.button));
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousemove', (e) => {
      if (this.pointerLocked) { this.mouseDX += e.movementX; this.mouseDY += e.movementY; }
    });
    canvas.addEventListener('wheel', (e) => { this.wheel += Math.sign(e.deltaY); }, { passive: true });
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
    });
  }

  requestPointerLock() {
    if (!this.pointerLocked) this.canvas.requestPointerLock?.()?.catch?.(() => {});
  }
  releasePointerLock() {
    if (this.pointerLocked) document.exitPointerLock();
  }

  /** フレームの最初に1回呼ぶ */
  update(dt: number, now: number) {
    this.pressedThisFrame.clear();
    this.releasedThisFrame.clear();
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad: Gamepad | null = null;
    for (const p of pads) if (p && p.connected) { pad = p; break; }
    const padButtons: boolean[] = [];
    let padMoveX = 0, padMoveY = 0, padLookX = 0, padLookY = 0;
    if (pad) {
      for (let i = 0; i < pad.buttons.length; i++) {
        const b = pad.buttons[i];
        padButtons[i] = b.pressed || b.value > 0.4;
        if (padButtons[i] && !this.padPrev[i]) {
          this.lastDevice = 'pad';
          if (this.capture) { const c = this.capture; this.capture = null; c(String(i), true); }
        }
      }
      const dz = (v: number) => (Math.abs(v) < 0.15 ? 0 : (v - Math.sign(v) * 0.15) / 0.85);
      padMoveX = dz(pad.axes[0] ?? 0); padMoveY = dz(pad.axes[1] ?? 0);
      padLookX = dz(pad.axes[2] ?? 0); padLookY = dz(pad.axes[3] ?? 0);
      if (Math.abs(padMoveX) + Math.abs(padMoveY) + Math.abs(padLookX) + Math.abs(padLookY) > 0.2) this.lastDevice = 'pad';
    }
    this.padPrev = padButtons;

    this.prevActive = this.active;
    this.active = new Set();
    if (this.enabled) {
      for (const a of Object.keys(this.bindings) as Action[]) {
        const b = this.bindings[a];
        let on = false;
        for (const k of b.keys) if (this.keys.has(k) || this.tapped.has(k)) on = true;
        for (const i of b.pad) if (padButtons[i]) on = true;
        if (on) this.active.add(a);
      }
    }
    for (const a of this.active) if (!this.prevActive.has(a)) { this.pressedThisFrame.add(a); this.holdStart.set(a, now); }
    this.tapped.clear();
    for (const a of this.prevActive) if (!this.active.has(a)) this.releasedThisFrame.add(a);

    // 移動
    let kx = 0, ky = 0;
    if (this.enabled) {
      if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) ky -= 1;
      if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) ky += 1;
      if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) kx -= 1;
      if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) kx += 1;
    }
    const kl = Math.hypot(kx, ky) || 1;
    this.move.x = kx / kl + (this.enabled ? padMoveX : 0);
    this.move.y = ky / kl + (this.enabled ? padMoveY : 0);
    const ml = Math.hypot(this.move.x, this.move.y);
    if (ml > 1) { this.move.x /= ml; this.move.y /= ml; }

    // 視点（ラジアン）
    const inv = this.invertY ? -1 : 1;
    this.look.x = this.mouseDX * 0.0025 * this.mouseSensitivity + padLookX * 2.6 * this.padSensitivity * dt;
    this.look.y = (this.mouseDY * 0.0025 * this.mouseSensitivity + padLookY * 1.9 * this.padSensitivity * dt) * inv;
    this.mouseDX = 0; this.mouseDY = 0;
  }

  endFrame() { this.wheel = 0; }

  down(a: Action) { return this.active.has(a); }
  pressed(a: Action) { return this.pressedThisFrame.has(a); }
  released(a: Action) { return this.releasedThisFrame.has(a); }
  heldFor(a: Action, now: number) { return this.active.has(a) ? now - (this.holdStart.get(a) ?? now) : 0; }
  /** 押してから離すまでの時間（離したフレームのみ有効） */
  releasedAfter(a: Action, now: number) { return this.releasedThisFrame.has(a) ? now - (this.holdStart.get(a) ?? now) : -1; }
  consume(a: Action) { this.pressedThisFrame.delete(a); }

  glyph(a: Action): string {
    const b = this.bindings[a];
    if (this.lastDevice === 'pad' && b.pad.length) return PAD_NAMES[b.pad[0]] ?? String(b.pad[0]);
    return b.keys.length ? keyName(b.keys[0]) : '―';
  }
}
