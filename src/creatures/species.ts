import { ShapeSpec } from './builder';
import { FootKind } from '../world/effects';

export type ObsId =
  | 'seen' | 'herd' | 'graze' | 'drink' | 'sleep' | 'call' | 'track' | 'hunt' | 'threat' | 'protect'
  | 'carcass' | 'fly' | 'feather' | 'fossil' | 'bond' | 'thorn' | 'nest' | 'dig' | 'burrow';

export const OBS_TEXT: Record<ObsId, string> = {
  seen: '姿を見た', herd: '群れの移動を見た', graze: '食べる様子を見た', drink: '水を飲む姿を見た',
  sleep: '眠る姿を見た（夜）', call: '鳴き声を聞いた', track: '足跡を調べた', hunt: '狩りを見た',
  threat: '威嚇を見た', protect: '幼体を守る行動を見た', carcass: '死骸に集まる様子を見た', fly: '飛ぶ姿を見た',
  feather: '落ちた羽毛・鱗を拾った', fossil: '化石と照らし合わせた', bond: '共に行動した', thorn: '棘の低木を食べる姿を見た',
  nest: '巣・産卵の場所を見つけた', dig: '地面を掘る様子を見た', burrow: '地中へ潜る姿を見た',
};

export type Disposition = 'ignore' | 'flee' | 'territorial' | 'curious' | 'predator' | 'defensive';

export interface SpeciesDef {
  id: string;
  name: string;
  kana: string;
  motif: string;               // 化石の分類群（実在）
  fossil: string;              // 【化石からわかること】（実在の知見）
  varuna: string;              // 【ヴァルナでの姿】（創作）
  role: string;                // 生態系での役割
  researchType: string;        // 研究の型
  obs: ObsId[];                // 図鑑を埋める観察項目
  shape: ShapeSpec;
  scale: number;               // テンプレートに掛ける倍率（成体）
  juvenileScale?: number;
  foot: FootKind; footSize: number; mass: number; // kg
  walk: number; run: number; turn: number; stride: number;
  sight: number; fov: number; hearing: number; smell: number;
  disposition: Disposition;
  activity: 'day' | 'dusk' | 'night';
  diet: 'plants' | 'meat' | 'carrion' | 'omni' | 'litter';
  herd: [number, number];
  hp: number;
  voice: { base: number; kind: 'rumble' | 'honk' | 'screech' | 'chirp' | 'squeak' | 'click' | 'bellow' | 'hiss' };
  flying?: boolean;
  viewDistance: number;        // これより遠いと描かない（m）
  bodyRadius: number;          // 衝突と押しのけの半径（m、成体）
}

// ------------------------------------------------------------ 形

const sorakubiShape: ShapeSpec = {
  spine: [
    { z: -14, y: 4.3, w: 0.14, h: 0.14 }, { z: -11, y: 4.9, w: 0.34, h: 0.36 }, { z: -8, y: 5.5, w: 0.7, h: 0.72 },
    { z: -5, y: 6.1, w: 1.25, h: 1.3 }, { z: -2.4, y: 6.5, w: 1.85, h: 1.95, belly: 0.95, top: 1.1 },
    { z: 0.2, y: 6.7, w: 2.15, h: 2.3, belly: 1.05 }, { z: 2.6, y: 6.9, w: 2.0, h: 2.15, belly: 0.95 },
    { z: 4.6, y: 7.4, w: 1.55, h: 1.75 }, { z: 6.4, y: 8.6, w: 0.95, h: 1.1 }, { z: 7.9, y: 10.0, w: 0.7, h: 0.82 },
    { z: 9.2, y: 11.4, w: 0.56, h: 0.64 }, { z: 10.3, y: 12.6, w: 0.46, h: 0.52 }, { z: 11.3, y: 13.4, w: 0.4, h: 0.46 },
    { z: 12.3, y: 13.8, w: 0.42, h: 0.5 }, { z: 13.3, y: 13.7, w: 0.33, h: 0.36 }, { z: 14.0, y: 13.5, w: 0.2, h: 0.22 },
  ],
  hip: 4, neckBase: 7, head: 13,
  legs: [
    { node: 4, x: 1.35, len: [3.2, 2.8, 0.6], rad: [1.0, 0.72, 0.6, 0.72], angles: [0.12, -0.2, 0.08], kind: 'column', foot: 1.2 },
    { node: 7, x: 1.2, y: -0.4, len: [3.0, 3.1, 0.55], rad: [0.82, 0.6, 0.5, 0.62], angles: [-0.05, 0.08, 0], kind: 'column', foot: 1.15 },
  ],
  jaw: { len: 1.0, w: 0.24, h: 0.12, color: 0x7d7564 },
  eyes: { pos: [0.34, 0.14, 0.1], r: 0.09 },
  app: [],
  colors: { back: 0x736d5c, belly: 0xaca38c, pattern: 0x4f4a3f, type: 'stripes', scale: 0.75 },
  skin: { scale: 0.33, bump: 1.4, crease: 0.4 }, roughness: 0.82,
};

const kazeashiShape: ShapeSpec = {
  spine: [
    { z: -2.4, y: 1.52, w: 0.04, h: 0.05 }, { z: -1.8, y: 1.56, w: 0.1, h: 0.12 }, { z: -1.1, y: 1.62, w: 0.18, h: 0.21 },
    { z: -0.3, y: 1.72, w: 0.3, h: 0.36 }, { z: 0.4, y: 1.78, w: 0.33, h: 0.4, belly: 1.0 }, { z: 0.9, y: 1.9, w: 0.25, h: 0.3 },
    { z: 1.15, y: 2.25, w: 0.09, h: 0.1 }, { z: 1.33, y: 2.62, w: 0.075, h: 0.085 }, { z: 1.48, y: 2.96, w: 0.068, h: 0.075 },
    { z: 1.64, y: 3.12, w: 0.09, h: 0.1 }, { z: 1.84, y: 3.1, w: 0.055, h: 0.06 }, { z: 1.98, y: 3.05, w: 0.02, h: 0.025 },
  ],
  hip: 3, neckBase: 5, head: 9,
  legs: [
    { node: 3, x: 0.2, len: [0.76, 0.82, 0.42], rad: [0.19, 0.08, 0.05, 0.04], angles: [0.5, -1.1, 0.75], kind: 'digit', foot: 1.3 },
    { node: 5, x: 0.2, y: -0.12, len: [0.34, 0.3, 0.18], rad: [0.06, 0.04, 0.03, 0.02], angles: [0.6, 0.5, 0.3], kind: 'arm', foot: 1 },
  ],
  eyes: { pos: [0.075, 0.03, 0.02], r: 0.035 },
  app: [
    { t: 'beak', node: 10, len: 0.16, color: 0x3a3530 },
    { t: 'feathers', from: 1, to: 5, len: 0.22, color: 0x8a6c48, spread: 2.0 },
    { t: 'feathers', from: 0, to: 1, len: 0.34, color: 0x6a5238, spread: 1.6 },
    { t: 'armfeathers', leg: 1, len: 0.3, color: 0x7a5e40 },
  ],
  colors: { back: 0x9b7c55, belly: 0xdccdab, pattern: 0x5c4832, type: 'stripes', scale: 4.2, head: 0x6f5a45 },
  skin: { scale: 0.05, bump: 0.6, crease: 0.15 }, roughness: 0.95, sheen: 0.3,
};

const kusagariShape: ShapeSpec = {
  spine: [
    { z: -3.0, y: 1.36, w: 0.04, h: 0.05 }, { z: -2.2, y: 1.4, w: 0.08, h: 0.1 }, { z: -1.4, y: 1.46, w: 0.15, h: 0.18 },
    { z: -0.5, y: 1.56, w: 0.32, h: 0.38 }, { z: 0.3, y: 1.62, w: 0.36, h: 0.45, belly: 0.95 }, { z: 0.9, y: 1.76, w: 0.3, h: 0.36 },
    { z: 1.25, y: 2.0, w: 0.16, h: 0.18 }, { z: 1.5, y: 2.22, w: 0.14, h: 0.16 }, { z: 1.76, y: 2.34, w: 0.17, h: 0.21 },
    { z: 2.06, y: 2.28, w: 0.12, h: 0.14 }, { z: 2.3, y: 2.2, w: 0.06, h: 0.07 },
  ],
  hip: 3, neckBase: 5, head: 8,
  legs: [
    { node: 3, x: 0.25, len: [0.72, 0.76, 0.38], rad: [0.23, 0.1, 0.06, 0.05], angles: [0.45, -1.05, 0.75], kind: 'digit', foot: 1.3 },
    { node: 5, x: 0.23, y: -0.1, len: [0.42, 0.38, 0.22], rad: [0.08, 0.05, 0.04, 0.03], angles: [0.9, 0.7, 0.2], kind: 'arm', foot: 1 },
  ],
  jaw: { len: 0.46, w: 0.1, h: 0.06, color: 0x3e3a30 },
  eyes: { pos: [0.13, 0.07, 0.05], r: 0.04 },
  app: [
    { t: 'feathers', from: 2, to: 6, len: 0.26, color: 0x3a342a, spread: 2.2 },
    { t: 'feathers', from: 0, to: 2, len: 0.42, color: 0x2e2a22, spread: 1.4 },
    { t: 'armfeathers', leg: 1, len: 0.42, color: 0x3a342a },
    { t: 'crest', node: 8, pos: [0, 0.18, -0.1], len: 0.35, height: 0.12, color: 0x8a3a28, angle: -0.3 },
  ],
  colors: { back: 0x4b463a, belly: 0x908569, pattern: 0x2a251f, type: 'stripes', scale: 3.2, head: 0x5a3a2c },
  skin: { scale: 0.05, bump: 0.6, crease: 0.2 }, roughness: 0.95, sheen: 0.2,
};

const himeyoroiShape: ShapeSpec = {
  spine: [
    { z: -1.6, y: 0.55, w: 0.08, h: 0.08 }, { z: -1.1, y: 0.6, w: 0.12, h: 0.12 }, { z: -0.6, y: 0.66, w: 0.25, h: 0.22 },
    { z: -0.1, y: 0.7, w: 0.46, h: 0.34, top: 1.2, belly: 0.6 }, { z: 0.5, y: 0.72, w: 0.5, h: 0.36, top: 1.2, belly: 0.6 },
    { z: 0.9, y: 0.7, w: 0.42, h: 0.32, belly: 0.7 }, { z: 1.15, y: 0.66, w: 0.22, h: 0.2 }, { z: 1.36, y: 0.64, w: 0.22, h: 0.18 },
    { z: 1.6, y: 0.58, w: 0.13, h: 0.11 },
  ],
  hip: 3, neckBase: 5, head: 7,
  legs: [
    { node: 3, x: 0.34, len: [0.3, 0.3, 0.1], rad: [0.15, 0.1, 0.09, 0.11], angles: [0.1, -0.2, 0.1], kind: 'column', foot: 1.2 },
    { node: 5, x: 0.32, len: [0.28, 0.29, 0.09], rad: [0.13, 0.09, 0.08, 0.1], angles: [-0.1, 0.15, 0], kind: 'column', foot: 1.2 },
  ],
  eyes: { pos: [0.16, 0.06, 0.05], r: 0.025 },
  app: [
    { t: 'plates', from: 2, to: 6, size: 0.2, color: 0x6a5c40, kind: 'osteoderm', rows: 4 },
    { t: 'plates', from: 3, to: 5, size: 0.24, color: 0x5a4c34, kind: 'spike', rows: 2 },
    { t: 'club', node: 0, size: 0.17, color: 0x5a4c34 },
  ],
  colors: { back: 0x7c6b4b, belly: 0xb39c74, pattern: 0x4b3f2b, type: 'spots', scale: 3, head: 0x6a5a40 },
  skin: { scale: 0.08, bump: 1.4, crease: 0.35 }, roughness: 0.8,
};

const kagewatariShape: ShapeSpec = {
  spine: [
    { z: -0.9, y: 2.0, w: 0.05, h: 0.05 }, { z: -0.5, y: 2.1, w: 0.18, h: 0.2 }, { z: -0.15, y: 2.2, w: 0.28, h: 0.3 },
    { z: 0.3, y: 2.4, w: 0.32, h: 0.34 }, { z: 0.65, y: 2.65, w: 0.3, h: 0.3 }, { z: 0.9, y: 3.15, w: 0.12, h: 0.12 },
    { z: 1.08, y: 3.75, w: 0.1, h: 0.1 }, { z: 1.22, y: 4.25, w: 0.1, h: 0.1 }, { z: 1.38, y: 4.5, w: 0.16, h: 0.2 },
    { z: 1.9, y: 4.32, w: 0.1, h: 0.11 }, { z: 2.55, y: 4.05, w: 0.03, h: 0.03 },
  ],
  hip: 2, neckBase: 5, head: 8,
  legs: [
    { node: 2, x: 0.2, len: [0.78, 0.86, 0.26], rad: [0.13, 0.07, 0.05, 0.04], angles: [0.25, -0.45, 0.4], kind: 'digit', foot: 1.4 },
  ],
  wings: { node: 4, x: 0.26, len: [0.95, 1.35, 0.5, 2.9], rad: 0.09, bodyFrom: 1, bodyTo: 3, color: 0x5d4d45 },
  eyes: { pos: [0.13, 0.08, 0.08], r: 0.04 },
  app: [
    { t: 'crest', node: 8, pos: [0, 0.16, -0.05], len: 0.9, height: 0.45, color: 0xb0553c, angle: 0.25 },
  ],
  colors: { back: 0x6b5b51, belly: 0xcbbba3, pattern: 0x3b312b, type: 'blotch', scale: 2.2, head: 0xd8cdb8 },
  skin: { scale: 0.05, bump: 0.5, crease: 0.15 }, roughness: 0.9, sheen: 0.2,
};

const honetsutsukiShape: ShapeSpec = {
  spine: [
    { z: -1.0, y: 0.5, w: 0.01, h: 0.04 }, { z: -0.6, y: 0.5, w: 0.015, h: 0.015 }, { z: -0.25, y: 0.52, w: 0.04, h: 0.04 },
    { z: -0.08, y: 0.53, w: 0.07, h: 0.07 }, { z: 0.08, y: 0.55, w: 0.075, h: 0.08 }, { z: 0.18, y: 0.6, w: 0.05, h: 0.05 },
    { z: 0.26, y: 0.66, w: 0.04, h: 0.04 }, { z: 0.34, y: 0.7, w: 0.05, h: 0.06 }, { z: 0.46, y: 0.68, w: 0.03, h: 0.035 },
    { z: 0.56, y: 0.65, w: 0.01, h: 0.012 },
  ],
  hip: 3, neckBase: 5, head: 7,
  legs: [{ node: 3, x: 0.05, len: [0.18, 0.2, 0.08], rad: [0.03, 0.018, 0.012, 0.01], angles: [0.3, -0.5, 0.4], kind: 'digit', foot: 1.4 }],
  wings: { node: 4, x: 0.06, len: [0.16, 0.22, 0.08, 0.5], rad: 0.018, bodyFrom: 2, bodyTo: 3, color: 0x4a3e38 },
  eyes: { pos: [0.035, 0.02, 0.02], r: 0.012 },
  app: [{ t: 'crest', node: 0, pos: [0, 0, 0], len: 0.12, height: 0.08, color: 0x9a4a30, angle: 0 }],
  colors: { back: 0x4a403a, belly: 0xb8a890, pattern: 0x2a2420, type: 'none', scale: 1 },
  skin: { scale: 0.02, bump: 0.4, crease: 0.1 }, roughness: 0.9,
};

const tsuchinezumiShape: ShapeSpec = {
  spine: [
    { z: -0.36, y: 0.06, w: 0.008, h: 0.008 }, { z: -0.2, y: 0.07, w: 0.016, h: 0.016 }, { z: -0.06, y: 0.085, w: 0.05, h: 0.05 },
    { z: 0.04, y: 0.09, w: 0.06, h: 0.058 }, { z: 0.12, y: 0.088, w: 0.05, h: 0.05 }, { z: 0.17, y: 0.095, w: 0.032, h: 0.035 },
    { z: 0.22, y: 0.095, w: 0.036, h: 0.034 }, { z: 0.28, y: 0.085, w: 0.012, h: 0.013 },
  ],
  hip: 2, neckBase: 4, head: 6,
  legs: [
    { node: 2, x: 0.04, len: [0.04, 0.04, 0.02], rad: [0.022, 0.012, 0.009, 0.009], angles: [0.5, -0.9, 0.5], kind: 'digit', foot: 1.3 },
    { node: 4, x: 0.035, len: [0.035, 0.035, 0.018], rad: [0.018, 0.01, 0.008, 0.008], angles: [-0.2, 0.3, 0.1], kind: 'digit', foot: 1.3 },
  ],
  eyes: { pos: [0.022, 0.015, 0.01], r: 0.007 },
  app: [],
  colors: { back: 0x6a5238, belly: 0xb8a080, pattern: 0x3a2a1a, type: 'stripes', scale: 30 },
  skin: { scale: 0.01, bump: 0.2, crease: 0.05 }, roughness: 1, sheen: 0.4,
};

const suikakuShape: ShapeSpec = {
  spine: [
    { z: -4.4, y: 1.6, w: 0.08, h: 0.08 }, { z: -3.3, y: 1.9, w: 0.22, h: 0.24 }, { z: -2.2, y: 2.2, w: 0.5, h: 0.56 },
    { z: -1.0, y: 2.46, w: 0.96, h: 1.0, top: 1.1 }, { z: 0.3, y: 2.42, w: 1.12, h: 1.12, belly: 1.0 }, { z: 1.5, y: 2.22, w: 0.96, h: 1.0 },
    { z: 2.3, y: 2.06, w: 0.62, h: 0.72 }, { z: 2.95, y: 2.02, w: 0.62, h: 0.76 }, { z: 3.6, y: 1.82, w: 0.46, h: 0.56 },
    { z: 4.2, y: 1.52, w: 0.2, h: 0.26 },
  ],
  hip: 3, neckBase: 5, head: 7,
  legs: [
    { node: 3, x: 0.72, len: [1.0, 0.95, 0.4], rad: [0.46, 0.3, 0.24, 0.3], angles: [0.15, -0.3, 0.15], kind: 'column', foot: 1.25 },
    { node: 5, x: 0.68, len: [0.86, 0.82, 0.34], rad: [0.36, 0.25, 0.2, 0.26], angles: [-0.2, 0.35, -0.1], kind: 'column', foot: 1.2 },
  ],
  jaw: { len: 0.7, w: 0.3, h: 0.18, color: 0x4a5a3a },
  eyes: { pos: [0.52, 0.28, 0.1], r: 0.07 },
  app: [
    { t: 'horn', node: 7, pos: [0.3, 0.6, 0.15], len: 1.35, rad: 0.13, dir: [0.18, 0.55, 1], color: 0xd8cfae, mirror: true, curve: 0.18 },
    { t: 'horn', node: 8, pos: [0, 0.5, 0.2], len: 0.42, rad: 0.12, dir: [0, 1, 0.55], color: 0xcfc4a0 },
    { t: 'frill', node: 7, pos: [0, 0.7, -0.4], radius: 1.45, tilt: -0.28, color: 0x7a9a5a, edge: 0xd0b050, spikes: 9 },
    { t: 'beak', node: 9, len: 0.36, color: 0x2e2a24 },
  ],
  colors: { back: 0x6e8c5c, belly: 0xc2ba94, pattern: 0x405e3c, type: 'blotch', scale: 1.1, head: 0x7a8a5c },
  skin: { scale: 0.26, bump: 1.4, crease: 0.3 }, roughness: 0.78,
};

const ooagitoShape: ShapeSpec = {
  spine: [
    { z: -5.5, y: 2.6, w: 0.08, h: 0.09 }, { z: -4.2, y: 2.8, w: 0.2, h: 0.23 }, { z: -2.8, y: 3.0, w: 0.45, h: 0.52 },
    { z: -1.2, y: 3.2, w: 0.76, h: 0.86 }, { z: 0.2, y: 3.3, w: 0.8, h: 0.96, belly: 1.0 }, { z: 1.3, y: 3.42, w: 0.6, h: 0.75 },
    { z: 2.0, y: 3.8, w: 0.38, h: 0.46 }, { z: 2.75, y: 4.12, w: 0.46, h: 0.62 }, { z: 3.55, y: 3.92, w: 0.34, h: 0.44 },
    { z: 4.25, y: 3.7, w: 0.18, h: 0.22 },
  ],
  hip: 3, neckBase: 5, head: 7,
  legs: [
    { node: 3, x: 0.52, len: [1.5, 1.4, 0.62], rad: [0.52, 0.25, 0.15, 0.12], angles: [0.3, -0.7, 0.5], kind: 'digit', foot: 1.4 },
    { node: 5, x: 0.45, y: -0.35, len: [0.5, 0.45, 0.25], rad: [0.13, 0.08, 0.05, 0.04], angles: [0.8, 0.6, 0.3], kind: 'arm', foot: 1 },
  ],
  jaw: { len: 1.25, w: 0.3, h: 0.2, color: 0x4a3a2c },
  eyes: { pos: [0.34, 0.24, 0.2], r: 0.07 },
  app: [
    { t: 'horn', node: 7, pos: [0.25, 0.52, 0.2], len: 0.26, rad: 0.1, dir: [0.1, 1, 0.3], color: 0x6a4a3a, mirror: true },
    { t: 'plates', from: 2, to: 6, size: 0.18, color: 0x3a2e24, kind: 'osteoderm', rows: 1 },
  ],
  colors: { back: 0x5c4b3a, belly: 0xab9372, pattern: 0x3a2a20, type: 'bands', scale: 1.4, head: 0x6a4a36 },
  skin: { scale: 0.12, bump: 1.3, crease: 0.4 }, roughness: 0.8,
};

const nedamariShape: ShapeSpec = (() => {
  const spine = [] as ShapeSpec['spine'];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const w = 0.22 * Math.sin(Math.min(1, t * 1.15 + 0.08) * Math.PI) + 0.05;
    spine.push({ z: -1.25 + t * 2.5, y: 0.16, w, h: w * 0.42, top: 0.9, belly: 0.4 });
  }
  const legs: ShapeSpec['legs'] = [];
  for (let i = 2; i < N - 2; i += 1) {
    legs.push({ node: i, x: spine[i].w * 0.9, y: -0.04, len: [0.08, 0.1, 0.03], rad: [0.018, 0.013, 0.009, 0.008], angles: [0.2, -0.5, 0.3], kind: 'digit', foot: 1 });
  }
  return {
    spine, hip: 8, neckBase: 13, head: 14, legs,
    eyes: { pos: [0.06, 0.03, 0.02], r: 0.012 },
    app: [{ t: 'plates', from: 1, to: 14, size: 0.07, color: 0x4a3526, kind: 'plate', rows: 2 }],
    colors: { back: 0x3b2f28, belly: 0x6a4e3a, pattern: 0x7a5a3e, type: 'bands', scale: 38 },
    skin: { scale: 0.04, bump: 0.8, crease: 0.3 }, roughness: 0.45,
  };
})();

// ------------------------------------------------------------ 種

export const SPECIES: Record<string, SpeciesDef> = {
  sorakubi: {
    id: 'sorakubi', name: 'ソラクビ', kana: 'そらくび', motif: '竜脚類（ブラキオサウルス科・ディプロドクス科など）',
    fossil: '長い首と尾をもつ、四足歩行の巨大な植物食恐竜のなかま。背骨には空洞（含気骨）があり、体の大きさのわりに骨格は軽かったと考えられている。足跡の化石から、群れで移動したこともあったと推定されている。',
    varuna: '霧の朝に群れで草海を渡り、首を振って霧を割るように進む。何百年も同じ道を歩くため、群れの道は浅い溝になり、雨の季節には小川になる。草海の小川の多くは、ソラクビの古い道である。',
    role: '歩いた跡が水の通り道になる。高い木の葉を食べ、草地に光を入れる。',
    researchType: '群れの行動型', obs: ['seen', 'herd', 'track', 'call', 'sleep', 'protect', 'fossil'],
    shape: sorakubiShape, scale: 1, juvenileScale: 0.34,
    foot: 'round', footSize: 1.7, mass: 38000,
    walk: 1.7, run: 4.2, turn: 0.18, stride: 4.6,
    sight: 120, fov: 3.6, hearing: 90, smell: 70,
    disposition: 'ignore', activity: 'day', diet: 'plants', herd: [10, 14], hp: 5000,
    voice: { base: 38, kind: 'rumble' }, viewDistance: 2400, bodyRadius: 3.2,
  },
  kazeashi: {
    id: 'kazeashi', name: 'カゼアシ', kana: 'かぜあし', motif: 'オルニトミムス類（ストルティオミムスなど）',
    fossil: 'ダチョウに似た体つきの二足歩行の恐竜のなかま。長い後ろ脚から、速く走れたと考えられている。羽毛をもっていたことを示す化石が見つかっている。',
    varuna: '草の実と虫を食べながら、小さな群れで草海を走る。臆病だが、風下から身を低くして近づく者には気づきにくい。渡りの民は、群れからはぐれた若い個体と共に暮らし、騎獣にしてきた。',
    role: '草の実を運び、草地を広げる。肉食獣にとっての主な獲物。',
    researchType: '関係型（騎乗の共同活動）', obs: ['seen', 'graze', 'drink', 'track', 'bond'],
    shape: kazeashiShape, scale: 1, juvenileScale: 0.6,
    foot: 'tri', footSize: 0.42, mass: 160,
    walk: 1.8, run: 11, turn: 3, stride: 1.8,
    sight: 60, fov: 4.4, hearing: 45, smell: 35,
    disposition: 'flee', activity: 'day', diet: 'omni', herd: [6, 9], hp: 60,
    voice: { base: 520, kind: 'honk' }, viewDistance: 420, bodyRadius: 0.5,
  },
  kusagari: {
    id: 'kusagari', name: 'クサガリ', kana: 'くさがり', motif: 'ドロマエオサウルス類（デイノニクス、ユタラプトルなど）',
    fossil: '後ろ脚に鎌のような大きな爪をもつ、羽毛の生えた肉食恐竜のなかま。同じ場所から複数の個体の化石が見つかることがあり、群れで行動した可能性が議論されている。',
    varuna: '霧の日や薄明に、3〜5頭で狩りをする。空腹のときは執拗に追ってくるが、満腹なら威嚇するだけで去る。火と大きな音を嫌う。',
    role: '弱った個体を間引き、群れを健康に保つ。死骸を作り、腐肉食の生き物を養う。',
    researchType: '痕跡型', obs: ['seen', 'hunt', 'threat', 'track', 'feather', 'call'],
    shape: kusagariShape, scale: 1, juvenileScale: 0.6,
    foot: 'tri', footSize: 0.46, mass: 280,
    walk: 1.6, run: 9.5, turn: 3.5, stride: 1.9,
    sight: 70, fov: 2.6, hearing: 60, smell: 80,
    disposition: 'predator', activity: 'dusk', diet: 'meat', herd: [3, 4], hp: 90,
    voice: { base: 300, kind: 'screech' }, viewDistance: 420, bodyRadius: 0.6,
  },
  himeyoroi: {
    id: 'himeyoroi', name: 'ヒメヨロイ', kana: 'ひめよろい', motif: '小型の曲竜類（ミンミなど）',
    fossil: '背中が骨の板（皮骨）で覆われた、四足歩行の植物食恐竜のなかま。小型の種も知られている。',
    varuna: '家族で一列に歩き、棘のある低木を好んで食べる。雨季の初めに、川の砂州へ移動して卵を産む。驚くと丸くなるだけで、人を襲わない。',
    role: '棘の低木を食べて減らす。いなくなると、肉食獣が身を隠す茂みが増える。',
    researchType: '関係型', obs: ['seen', 'thorn', 'nest', 'track', 'threat'],
    shape: himeyoroiShape, scale: 1, juvenileScale: 0.55,
    foot: 'pad', footSize: 0.34, mass: 300,
    walk: 0.9, run: 2.2, turn: 1.4, stride: 0.8,
    sight: 25, fov: 3.4, hearing: 30, smell: 30,
    disposition: 'defensive', activity: 'day', diet: 'plants', herd: [3, 4], hp: 200,
    voice: { base: 180, kind: 'click' }, viewDistance: 260, bodyRadius: 0.6,
  },
  kagewatari: {
    id: 'kagewatari', name: 'カゲワタリ', kana: 'かげわたり', motif: 'アズダルコ科の翼竜（ケツァルコアトルスなど）',
    fossil: '非常に大きな翼竜のなかま。翼を広げると10mを超える種もいた。地上を4本の脚で歩いて小動物をとらえたと考えられている。',
    varuna: '晴れた日に上昇気流で旋回し、その影が草海の群れを驚かせる。川辺に降りて小魚やツチネズミを狙う。雨の日は地上を歩く。',
    role: '小動物の数を調整する。影が群れの移動のきっかけになる。',
    researchType: '行動型', obs: ['seen', 'fly', 'hunt', 'track'],
    shape: kagewatariShape, scale: 1.25,
    foot: 'tri', footSize: 0.4, mass: 220,
    walk: 1.4, run: 3.5, turn: 1.2, stride: 1.6,
    sight: 160, fov: 3, hearing: 50, smell: 20,
    disposition: 'ignore', activity: 'day', diet: 'meat', herd: [1, 1], hp: 150,
    voice: { base: 200, kind: 'hiss' }, flying: true, viewDistance: 1500, bodyRadius: 0.8,
  },
  honetsutsuki: {
    id: 'honetsutsuki', name: 'ホネツツキ', kana: 'ほねつつき', motif: '小型の翼竜（ランフォリンクス類）',
    fossil: '長い尾の先に菱形の膜をもつ翼竜のなかま。鋭い歯をもつ種が多い。',
    varuna: '死骸が出ると、どこからともなく集まって上空を旋回する。その旋回が、草海の民にとって「何かが死んだ」合図になる。ソラクビの背中の虫も食べる。',
    role: '腐肉食の最初の到着者。死骸の場所を知らせる。',
    researchType: '関係型', obs: ['seen', 'carcass', 'fly'],
    shape: honetsutsukiShape, scale: 1,
    foot: 'small', footSize: 0.1, mass: 2,
    walk: 0.6, run: 1.5, turn: 3, stride: 0.2,
    sight: 90, fov: 3.4, hearing: 20, smell: 120,
    disposition: 'flee', activity: 'day', diet: 'carrion', herd: [6, 8], hp: 5,
    voice: { base: 1400, kind: 'chirp' }, flying: true, viewDistance: 500, bodyRadius: 0.2,
  },
  tsuchinezumi: {
    id: 'tsuchinezumi', name: 'ツチネズミ', kana: 'つちねずみ', motif: '初期の哺乳類（モルガヌコドンなど）',
    fossil: '中生代の小型の哺乳類。多くは夜行性で、虫を食べていたと考えられている。',
    varuna: '夜に草の間を走り、死骸と種を片付ける。好奇心が強く、静かにしている者には近寄ってくる。',
    role: '死骸を分解し、種を土に埋める。',
    researchType: '夜行型', obs: ['seen', 'carcass', 'burrow'],
    shape: tsuchinezumiShape, scale: 1,
    foot: 'small', footSize: 0.05, mass: 0.1,
    walk: 0.5, run: 3, turn: 5, stride: 0.1,
    sight: 12, fov: 4, hearing: 20, smell: 15,
    disposition: 'curious', activity: 'night', diet: 'omni', herd: [3, 5], hp: 2,
    voice: { base: 3200, kind: 'squeak' }, viewDistance: 45, bodyRadius: 0.08,
  },
  suikaku: {
    id: 'suikaku', name: '翠角竜', kana: 'すいかくりゅう', motif: '角竜類（トリケラトプス、トロサウルスなど）',
    fossil: '大きなフリル（首の飾り）と角をもつ、四足歩行の植物食恐竜のなかま。同じ種の骨がまとまって見つかる産地があり、群れで暮らしていた可能性がある。',
    varuna: '樹海の縁で巨木に角を掛けて倒し、光の入る空き地を作る。空き地には若草が生え、草海の草食獣の道になる。群れの王個体は、並外れて大きく育つ。',
    role: '木を倒して空き地を作る（地巡り）。',
    researchType: '化石照合型', obs: ['seen', 'graze', 'protect', 'threat', 'track', 'fossil'],
    shape: suikakuShape, scale: 1, juvenileScale: 0.3,
    foot: 'cera', footSize: 0.9, mass: 9000,
    walk: 1.3, run: 7, turn: 0.8, stride: 2.2,
    sight: 45, fov: 3, hearing: 55, smell: 60,
    disposition: 'defensive', activity: 'day', diet: 'plants', herd: [3, 5], hp: 800,
    voice: { base: 70, kind: 'bellow' }, viewDistance: 900, bodyRadius: 1.8,
  },
  ooagito: {
    id: 'ooagito', name: 'オオアギト', kana: 'おおあぎと', motif: '大型の獣脚類（アロサウルス、メガロサウルスなど）',
    fossil: '大きな頭と鋭い歯をもつ、二足歩行の大型肉食恐竜のなかま。目の上に小さな角状の突起をもつ種がある。',
    varuna: '樹海の縁の縄張りを一頭で巡回する。雨の後、足跡の残りやすい地面で狩りをする。クサガリの群れから獲物を奪う。',
    role: '最上位の捕食者。大きな死骸を生み、樹海の縁の生き物を養う。',
    researchType: '痕跡型', obs: ['seen', 'track', 'threat', 'carcass', 'call'],
    shape: ooagitoShape, scale: 1,
    foot: 'tri', footSize: 1.05, mass: 2300,
    walk: 1.8, run: 7.5, turn: 1.2, stride: 3.2,
    sight: 80, fov: 2.4, hearing: 70, smell: 110,
    disposition: 'territorial', activity: 'day', diet: 'meat', herd: [1, 1], hp: 700,
    voice: { base: 90, kind: 'bellow' }, viewDistance: 700, bodyRadius: 1.3,
  },
  nedamari: {
    id: 'nedamari', name: 'ネダマリ', kana: 'ねだまり', motif: 'アースロプレウラ（石炭紀の巨大な多足類）',
    fossil: '体長が2mを超えたと考えられる、史上最大級の陸生節足動物。植物を食べていたと推定されている。',
    varuna: '暗い林床をゆっくり這い、落ち葉と朽ち木を食べる。湿った土と根の空洞を好むので、その跡をたどると根の洞窟に行き着く。',
    role: '落ち葉を分解し、林床の土を作る。',
    researchType: '簡易型＋痕跡', obs: ['seen', 'burrow', 'track'],
    shape: nedamariShape, scale: 1,
    foot: 'small', footSize: 0.08, mass: 40,
    walk: 0.35, run: 0.8, turn: 0.8, stride: 0.12,
    sight: 6, fov: 3, hearing: 12, smell: 12,
    disposition: 'ignore', activity: 'day', diet: 'litter', herd: [1, 1], hp: 40,
    voice: { base: 900, kind: 'click' }, viewDistance: 120, bodyRadius: 0.3,
  },
};

/** 小型の環境生物（骨格を持たない簡易モデル） */
export const SMALL_SPECIES = {
  ooyanma: {
    id: 'ooyanma', name: 'オオヤンマ', kana: 'おおやんま', motif: 'メガネウラ（石炭紀の巨大なトンボのなかま）',
    fossil: '翅を広げると70cm近くになる、古生代の巨大な昆虫。現在のトンボの遠い親戚にあたる。',
    varuna: '晴れた日の水辺を飛び、水面すれすれで小さな虫を捕らえる。オオヤンマの飛ぶ場所には、必ず水がある。',
    role: '水辺の目印。', researchType: '簡易型', obs: ['seen', 'fly'] as ObsId[],
  },
  yoroiuo: {
    id: 'yoroiuo', name: 'ヨロイウオ', kana: 'よろいうお', motif: 'ボトリオレピス（板皮類）',
    fossil: '頭と胸を骨の板で覆った、デボン紀の魚のなかま。胸びれも骨の筒で覆われていた。',
    varuna: '大河の底を群れで泳ぐ。群れの向きで、川の流れの速さが分かる。',
    role: '川の生き物の目印。', researchType: '簡易型', obs: ['seen'] as ObsId[],
  },
  hotaru: {
    id: 'hotaru', name: 'ホタルゴケムシ', kana: 'ほたるごけむし', motif: '創作（発光する甲虫のなかまを参考にした架空種）',
    fossil: '（化石の記録に基づかない、ヴァルナ独自の生物）',
    varuna: '夜の草海と樹海の縁で、緑の光を点滅させて飛ぶ。群れる場所の近くには水がある。',
    role: '夜の光。', researchType: '夜行型', obs: ['seen'] as ObsId[],
  },
};

export const CODEX_ORDER = ['sorakubi', 'kazeashi', 'kusagari', 'himeyoroi', 'kagewatari', 'honetsutsuki', 'tsuchinezumi', 'suikaku', 'ooagito', 'nedamari', 'ooyanma', 'yoroiuo', 'hotaru'];
