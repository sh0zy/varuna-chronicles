import * as THREE from 'three';
import { Rng } from '../core/noise';
import { MAP_HALF, TERRAIN_RES } from './layout';
import { patchWorldMaterial, worldUniforms } from './shading';

// カメラの周囲に敷き詰めた草の株を、GPU上で地形に沿わせて配置する。
// CPUは毎フレーム何も書き換えない（カメラ位置と押しのけ位置の uniform だけ）。

export const MAX_PUSHERS = 16;

export interface GrassLayerOpts {
  tile: number;
  spacing: number;
  bladeHeight: number;
  bladeWidth: number;
  blades: number;     // 1株あたりの葉の数
  segments: number;
  fadeStart: number;
  fadeEnd: number;
  seed: number;
}

export const grassUniforms = {
  uCamXZ: { value: new THREE.Vector2() },
  uHeightTex: { value: null as THREE.Texture | null },
  uMapHalf: { value: MAP_HALF },
  uMapRes: { value: TERRAIN_RES },
  uPushers: { value: Array.from({ length: MAX_PUSHERS }, () => new THREE.Vector4(0, 0, 0, 0)) },
  uWind: { value: new THREE.Vector3(1, 0, 0.4) },
  uGrassDry: { value: new THREE.Color(0xb8a660) },
  uGrassGreen: { value: new THREE.Color(0x6f8a3c) },
};

function buildTuft(o: GrassLayerOpts, r: Rng) {
  const pos: number[] = [], idx: number[] = [], tip: number[] = [];
  for (let b = 0; b < o.blades; b++) {
    const ang = (b / o.blades) * Math.PI + r.range(-0.3, 0.3);
    const ox = r.range(-0.18, 0.18), oz = r.range(-0.18, 0.18);
    const lean = r.range(0.05, 0.3);
    const hMul = r.range(0.7, 1.15);
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const lx = -sa, lz = ca; // 傾く向き
    const start = pos.length / 3;
    for (let s = 0; s <= o.segments; s++) {
      const t = s / o.segments;
      const w = o.bladeWidth * (1 - t * 0.92);
      const y = t * hMul;
      const bend = lean * t * t;
      for (const side of [-1, 1]) {
        if (s === o.segments && side === 1) continue;
        const sw = s === o.segments ? 0 : side * w * 0.5;
        pos.push(ox + ca * sw + lx * bend, y, oz + sa * sw + lz * bend);
        tip.push(t);
      }
    }
    for (let s = 0; s < o.segments; s++) {
      const a = start + s * 2, bb = a + 1, c = a + 2, d = a + 3;
      if (s === o.segments - 1) { idx.push(a, bb, c); }
      else { idx.push(a, bb, c, bb, d, c); }
    }
  }
  return { pos, idx, tip };
}

export class GrassLayer {
  mesh: THREE.Mesh;
  constructor(o: GrassLayerOpts, heightTex: THREE.Texture) {
    const r = new Rng(o.seed);
    const tuft = buildTuft(o, r);
    const geo = new THREE.InstancedBufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(tuft.pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(tuft.pos.map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
    geo.setAttribute('aTip', new THREE.Float32BufferAttribute(tuft.tip, 1));
    geo.setIndex(tuft.idx);
    const per = Math.floor(o.tile / o.spacing);
    const count = per * per;
    const off = new Float32Array(count * 2);
    const rnd = new Float32Array(count * 4);
    let k = 0;
    for (let j = 0; j < per; j++) for (let i = 0; i < per; i++) {
      off[k * 2] = (i + r.range(0.1, 0.9)) * o.spacing;
      off[k * 2 + 1] = (j + r.range(0.1, 0.9)) * o.spacing;
      rnd[k * 4] = r.next(); rnd[k * 4 + 1] = r.next(); rnd[k * 4 + 2] = r.next(); rnd[k * 4 + 3] = r.next();
      k++;
    }
    geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(off, 2));
    geo.setAttribute('aRand', new THREE.InstancedBufferAttribute(rnd, 4));
    geo.instanceCount = count;

    grassUniforms.uHeightTex.value = heightTex;
    const mat = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
    const tile = o.tile.toFixed(2), bh = o.bladeHeight.toFixed(3), fs = o.fadeStart.toFixed(1), fe = o.fadeEnd.toFixed(1);
    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, grassUniforms);
      shader.vertexShader = /* glsl */ `
        attribute vec2 aOffset; attribute vec4 aRand; attribute float aTip;
        uniform vec2 uCamXZ; uniform sampler2D uHeightTex; uniform float uMapHalf; uniform float uMapRes;
        uniform vec4 uPushers[${MAX_PUSHERS}]; uniform vec3 uWind; uniform float uTime; uniform vec2 uWindOffset;
        uniform sampler2D uNoiseTex; uniform vec3 uGrassDry; uniform vec3 uGrassGreen;
        varying vec3 vGrassCol; varying float vTip;
      ` + shader.vertexShader
        .replace('#include <beginnormal_vertex>', `
          vec2 gBase = aOffset + ${tile} * floor((uCamXZ - aOffset) / ${tile} + 0.5);
          vec2 gUv = ((gBase + uMapHalf) / (2.0 * uMapHalf)) * ((uMapRes - 1.0) / uMapRes) + 0.5 / uMapRes;
          vec4 gD = texture2D(uHeightTex, gUv);
          float gDens = gD.g;
          float gKeep = step(aRand.w, gDens * 1.08) * step(0.12, gDens);
          float gDist = length(gBase - uCamXZ);
          float gFade = 1.0 - smoothstep(${fs}, ${fe}, gDist + aRand.z * 6.0);
          float gH = ${bh} * (0.55 + 0.8 * aRand.y) * (0.45 + 0.55 * gDens) * gKeep * gFade * (1.0 - gD.b * 0.75);
          float gRot = aRand.x * 6.2831;
          float cr = cos(gRot), sr = sin(gRot);
          vec3 objectNormal = vec3(0.0, 1.0, 0.0);
        `)
        .replace('#include <begin_vertex>', `
          vec3 lp = position;
          lp.xz = vec2(cr * lp.x - sr * lp.z, sr * lp.x + cr * lp.z);
          float t = aTip;
          vec2 wd = uWind.xy;
          float gust = texture2D(uNoiseTex, gBase * 0.012 - uWindOffset * 0.02).r;
          float flutter = sin(uTime * 3.1 + aRand.x * 30.0 + gBase.x * 0.3) * 0.12;
          vec2 bend = wd * uWind.z * (0.25 + 1.1 * gust) + vec2(flutter) * uWind.z;
          float flatten = 0.0;
          for (int i = 0; i < ${MAX_PUSHERS}; i++) {
            vec4 pu = uPushers[i];
            if (pu.w <= 0.0) continue;
            vec2 dv = gBase - pu.xy;
            float dd = length(dv);
            float inf = (1.0 - smoothstep(pu.z * 0.45, pu.z, dd)) * pu.w;
            bend += (dv / max(dd, 0.05)) * inf * 1.6;
            flatten = max(flatten, inf);
          }
          float bl = length(bend);
          if (bl > 1.4) bend *= 1.4 / bl;
          float hh = gH * (1.0 - flatten * 0.55);
          vec3 transformed = vec3(lp.x, lp.y * hh, lp.z);
          transformed.xz += bend * t * t * hh;
          transformed.y -= min(length(bend), 1.2) * t * t * hh * 0.4;
          transformed += vec3(gBase.x, gD.r - 0.04, gBase.y);
          vec3 dryCol = mix(uGrassGreen, uGrassDry, clamp(aRand.z * 0.8 + gD.a * -0.4 + 0.25, 0.0, 1.0));
          dryCol = mix(dryCol, vec3(0.16, 0.26, 0.11), gD.b);
          vGrassCol = dryCol * mix(0.3, 1.1, pow(t, 0.8)) * (0.78 + 0.4 * aRand.y);
          vTip = t;
        `);
      shader.fragmentShader = `varying vec3 vGrassCol; varying float vTip;\n` + shader.fragmentShader
        .replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.rgb = vGrassCol;')
        .replace('#include <normal_fragment_begin>', '#include <normal_fragment_begin>\n normal = normalize(vNormal);')
        .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
          {
            vec3 vd = normalize(vWorldPosW - cameraPosition);
            float back = pow(max(dot(vd, uSunDir), 0.0), 3.0);
            reflectedLight.directDiffuse += uSunColor * vGrassCol * back * vTip * 0.9 * step(0.0, uSunDir.y);
          }`);
    };
    mat.customProgramCacheKey = () => 'grass' + tile + bh + fs + fe;
    patchWorldMaterial(mat);
    // patchWorldMaterial が customProgramCacheKey を上書きするので、層ごとのキーを保つ
    const k2 = mat.customProgramCacheKey;
    mat.customProgramCacheKey = () => k2() + tile + bh;
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = false;
    this.mesh.name = 'grass';
  }
}

export class GrassSystem {
  layers: GrassLayer[] = [];
  group = new THREE.Group();
  private pushers: { x: number; z: number; r: number; s: number; d: number }[] = [];

  constructor(heightTex: THREE.Texture, quality: 'low' | 'medium' | 'high') {
    const near: GrassLayerOpts = {
      tile: 64, spacing: quality === 'high' ? 0.36 : quality === 'medium' ? 0.42 : 0.6,
      bladeHeight: 0.95, bladeWidth: 0.052, blades: quality === 'low' ? 3 : quality === 'medium' ? 4 : 5, segments: 3, fadeStart: 24, fadeEnd: 31, seed: 3,
    };
    const far: GrassLayerOpts = {
      tile: 200, spacing: quality === 'high' ? 0.95 : 1.25, bladeHeight: 0.95, bladeWidth: 0.22, blades: 3, segments: 2,
      fadeStart: 70, fadeEnd: quality === 'high' ? 100 : 88, seed: 9,
    };
    this.layers.push(new GrassLayer(near, heightTex));
    if (quality !== 'low') this.layers.push(new GrassLayer(far, heightTex));
    for (const l of this.layers) this.group.add(l.mesh);
  }

  /** 草を押しのける物（プレイヤー・生物の脚・転がる物）。距離の近い順に16個まで */
  clearPushers() { this.pushers.length = 0; }
  addPusher(x: number, z: number, r: number, s: number, camX: number, camZ: number) {
    const d = Math.hypot(x - camX, z - camZ);
    if (d > 70) return;
    this.pushers.push({ x, z, r, s, d });
  }

  update(camPos: THREE.Vector3, wind: { dir: number; strength: number }) {
    grassUniforms.uCamXZ.value.set(camPos.x, camPos.z);
    grassUniforms.uWind.value.set(Math.cos(wind.dir), Math.sin(wind.dir), wind.strength * 0.75);
    this.pushers.sort((a, b) => a.d - b.d);
    const arr = grassUniforms.uPushers.value;
    for (let i = 0; i < MAX_PUSHERS; i++) {
      const p = this.pushers[i];
      if (p) arr[i].set(p.x, p.z, p.r, p.s); else arr[i].set(0, 0, 0, 0);
    }
    worldUniforms.uWindOffset.value.x += 0; // 風の流れは main 側で進める
  }
}
