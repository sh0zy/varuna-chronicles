import * as THREE from 'three';
import { Rng } from '../core/noise';

// 全マテリアル共通の「大気と光」：高さ霧（太陽方向の散乱つき）、雲の影、雨の濡れ、地形の細部。
// 同じ uniform を共有するので、1か所を変えると世界全体の空気が変わる。

function makeTileNoise(size: number, seed: number): THREE.DataTexture {
  const r = new Rng(seed);
  const data = new Uint8Array(size * size * 4);
  const octaves = [8, 16, 32, 64];
  const lattices = octaves.map((p) => {
    const a = new Float32Array(p * p * 4);
    for (let i = 0; i < a.length; i++) a[i] = r.next();
    return a;
  });
  const sm = (t: number) => t * t * (3 - 2 * t);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const out = [0, 0, 0, 0];
    for (let c = 0; c < 4; c++) {
      let sum = 0, amp = 1, norm = 0;
      for (let o = 0; o < octaves.length; o++) {
        const p = octaves[o];
        // チャンネルごとに主となる周波数をずらす
        const oo = (o + c) % octaves.length;
        const pp = octaves[oo];
        const L = lattices[oo];
        const fx = (x / size) * pp, fy = (y / size) * pp;
        const ix = Math.floor(fx), iy = Math.floor(fy);
        const tx = sm(fx - ix), ty = sm(fy - iy);
        const g = (a: number, b: number) => L[(((b % pp) * pp + (a % pp)) * 4 + c) % L.length];
        const v = (g(ix, iy) * (1 - tx) + g(ix + 1, iy) * tx) * (1 - ty) + (g(ix, iy + 1) * (1 - tx) + g(ix + 1, iy + 1) * tx) * ty;
        sum += v * amp; norm += amp; amp *= 0.55;
        void p;
      }
      out[c] = sum / norm;
    }
    const k = (y * size + x) * 4;
    for (let c = 0; c < 4; c++) data[k + c] = Math.round(Math.min(1, Math.max(0, (out[c] - 0.5) * 1.8 + 0.5)) * 255);
  }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true; t.needsUpdate = true;
  return t;
}

/** 鱗の模様（タイル可能なボロノイ）。R=溝 G=鱗ごとの乱数 B=中心からの距離 */
function makeScaleTex(size: number, cells: number, seed: number): THREE.DataTexture {
  const r = new Rng(seed);
  const pts: { x: number; y: number; v: number }[] = [];
  for (let j = 0; j < cells; j++) for (let i = 0; i < cells; i++) {
    pts.push({ x: (i + 0.15 + r.next() * 0.7) / cells, y: (j + 0.15 + r.next() * 0.7) / cells, v: r.next() });
  }
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / size, v = y / size;
    const ci = Math.floor(u * cells), cj = Math.floor(v * cells);
    let d1 = 9, d2 = 9, val = 0;
    for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
      const ii = (ci + di + cells) % cells, jj = (cj + dj + cells) % cells;
      const p = pts[jj * cells + ii];
      let px = p.x + (ci + di < 0 ? -1 : ci + di >= cells ? 1 : 0);
      let py = p.y + (cj + dj < 0 ? -1 : cj + dj >= cells ? 1 : 0);
      const d = Math.hypot(u - px, v - py);
      if (d < d1) { d2 = d1; d1 = d; val = p.v; } else if (d < d2) d2 = d;
    }
    const edge = Math.min(1, (d2 - d1) * cells * 2.2);
    const k = (y * size + x) * 4;
    data[k] = Math.round(edge * 255);
    data[k + 1] = Math.round(val * 255);
    data[k + 2] = Math.round(Math.min(1, d1 * cells * 1.4) * 255);
    data[k + 3] = 255;
  }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true; t.needsUpdate = true;
  return t;
}

export const noiseTex = makeTileNoise(256, 99);
export const scaleTex = makeScaleTex(256, 12, 7);

export const worldUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0.3, 0.5, 0.2).normalize() },
  uSunColor: { value: new THREE.Color(1, 0.9, 0.7) },
  uFogColor: { value: new THREE.Color(0.7, 0.75, 0.8) },
  uFogDensity: { value: 0.0012 },
  uFogFalloff: { value: 0.045 },
  uFogBase: { value: 0 },
  uMist: { value: 0 },          // 地面近くの朝霧の濃さ
  uCloudCover: { value: 0.3 },
  uCloudShadow: { value: 0.55 },
  uWindOffset: { value: new THREE.Vector2() },
  uWetness: { value: 0 },
  uWindVec: { value: new THREE.Vector3(1, 0, 0.4) }, // x,y=水平の向き(x,z) z=強さ
  uNoiseTex: { value: noiseTex },
  uScaleTex: { value: scaleTex },
};

export const FOG_PARS = /* glsl */ `
varying vec3 vWorldPosW;
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uFogFalloff;
uniform float uFogBase;
uniform float uMist;
uniform float uCloudCover;
uniform float uCloudShadow;
uniform vec2 uWindOffset;
uniform float uWetness;
uniform sampler2D uNoiseTex;
float cloudShadowAt(vec2 xz) {
  float c = texture2D(uNoiseTex, (xz + uWindOffset) * 0.0011).r * 0.65 + texture2D(uNoiseTex, (xz + uWindOffset * 1.3) * 0.0031).g * 0.35;
  float cov = smoothstep(1.0 - uCloudCover - 0.12, 1.0 - uCloudCover + 0.12, c);
  return 1.0 - cov * uCloudShadow;
}
vec3 applyWorldFog(vec3 col, vec3 wp) {
  vec3 d = wp - cameraPosition;
  float dist = length(d);
  float fh = uFogFalloff;
  float y0 = cameraPosition.y - uFogBase;
  float dy = wp.y - cameraPosition.y;
  float k = uFogDensity * exp(-fh * y0);
  float amt = abs(dy) > 0.05 ? k * dist * (1.0 - exp(-fh * dy)) / (fh * dy) : k * dist;
  // 朝霧：地面から数メートルに溜まる霧。遠くほど積分されて白くなる
  float mistH = exp(-max(wp.y - uFogBase - 6.0, 0.0) * 0.09);
  amt += uMist * 0.0065 * dist * mistH * (0.75 + 0.5 * texture2D(uNoiseTex, (wp.xz + uWindOffset * 0.6) * 0.004).b);
  float f = 1.0 - exp(-max(amt, 0.0));
  vec3 v = d / max(dist, 0.001);
  float sunA = pow(max(dot(v, uSunDir), 0.0), 6.0);
  vec3 fc = mix(uFogColor, uSunColor, sunA * 0.55);
  return mix(col, fc, clamp(f, 0.0, 1.0));
}
`;

const VERT_PARS = /* glsl */ `
varying vec3 vWorldPosW;
varying vec3 vRestPos;
varying vec3 vRestNormal;
`;
const VERT_MAIN = /* glsl */ `
{
  vec4 wpW = vec4(transformed, 1.0);
  #ifdef USE_BATCHING
    wpW = batchingMatrix * wpW;
  #endif
  #ifdef USE_INSTANCING
    wpW = instanceMatrix * wpW;
  #endif
  wpW = modelMatrix * wpW;
  vWorldPosW = wpW.xyz;
  vRestPos = position;
  vRestNormal = normal;
}
`;

export interface PatchOpts {
  terrainDetail?: boolean;
  /** 生物の皮膚：鱗の大きさ（m）と凹凸の強さ */
  skin?: { scale: number; bump: number; crease: number };
  /** 岩・石材の細部 */
  rock?: boolean;
  noCloud?: boolean;
  /** 霧を弱める（遠景の山など） */
  fogScale?: number;
  /** 遠景の空気遠近（大きいほど遠くが空の色に溶ける） */
  haze?: number;
}

export function patchWorldMaterial(mat: THREE.Material, opts: PatchOpts = {}) {
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (shader, renderer) => {
    prev?.call(mat, shader, renderer);
    Object.assign(shader.uniforms, worldUniforms);
    shader.vertexShader = VERT_PARS + shader.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n' + VERT_MAIN);
    let fs = shader.fragmentShader;
    fs = FOG_PARS + 'varying vec3 vRestPos;\nvarying vec3 vRestNormal;\nuniform sampler2D uScaleTex;\n' + fs;
    const fogScale = (opts.fogScale ?? 1).toFixed(3);
    const haze = (opts.haze ?? 0).toFixed(3);
    fs = fs.replace('#include <fog_fragment>', `gl_FragColor.rgb = mix(gl_FragColor.rgb, applyWorldFog(gl_FragColor.rgb, vWorldPosW), ${fogScale});
      gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, ${haze} * (1.0 - exp(-length(vWorldPosW - cameraPosition) * 0.00032)));`);
    if (!opts.noCloud) {
      fs = fs.replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
        { float cs = cloudShadowAt(vWorldPosW.xz); reflectedLight.directDiffuse *= cs; reflectedLight.directSpecular *= cs; }`);
    }
    // 雨で濡れる（暗く、滑らかに）
    fs = fs.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.45, uWetness);`);
    fs = fs.replace('#include <color_fragment>', `#include <color_fragment>
      diffuseColor.rgb *= mix(1.0, 0.72, uWetness);`);
    if (opts.terrainDetail || opts.rock || opts.skin) {
      let detail = '';
      if (opts.terrainDetail) {
        detail = `
        float camD = length(vWorldPosW - cameraPosition);
        float n1 = texture2D(uNoiseTex, vWorldPosW.xz * 0.045).r;
        float n2 = texture2D(uNoiseTex, vWorldPosW.xz * 0.31).g;
        float n3 = texture2D(uNoiseTex, vWorldPosW.xz * 0.9).b;
        diffuseColor.rgb *= 0.8 + 0.3 * n1;
        diffuseColor.rgb *= mix(0.9 + 0.2 * n2, 1.0, smoothstep(40.0, 120.0, camD));
        float hgt = n2 * 0.7 + n3 * 0.3;
        float bumpS = 1.2 * (1.0 - smoothstep(6.0, 40.0, camD));`;
      } else if (opts.rock) {
        detail = `
        float camD = length(vWorldPosW - cameraPosition);
        vec3 bw = abs(normalize(vRestNormal)); bw /= (bw.x + bw.y + bw.z);
        float s1 = texture2D(uNoiseTex, vRestPos.yz * 0.5).r * bw.x + texture2D(uNoiseTex, vRestPos.xz * 0.5).r * bw.y + texture2D(uNoiseTex, vRestPos.xy * 0.5).r * bw.z;
        float s2 = texture2D(uNoiseTex, vRestPos.yz * 2.1).g * bw.x + texture2D(uNoiseTex, vRestPos.xz * 2.1).g * bw.y + texture2D(uNoiseTex, vRestPos.xy * 2.1).g * bw.z;
        // 地層の縞
        float strata = sin(vWorldPosW.y * 2.3 + s1 * 3.0) * 0.5 + 0.5;
        diffuseColor.rgb *= 0.72 + 0.3 * s1 + 0.12 * strata;
        // 上向きの面には苔
        float mossy = smoothstep(0.55, 0.9, normalize(vRestNormal).y + s2 * 0.3) * 0.7;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.20, 0.27, 0.12), mossy * 0.6);
        float hgt = s1 * 0.5 + s2 * 0.5;
        float bumpS = 3.0 * (1.0 - smoothstep(15.0, 90.0, camD));`;
      } else if (opts.skin) {
        const sc = (1 / opts.skin.scale).toFixed(4);
        detail = `
        float camD = length(vWorldPosW - cameraPosition);
        vec3 bw = pow(abs(normalize(vRestNormal)), vec3(3.0)); bw /= (bw.x + bw.y + bw.z);
        vec3 sp = vRestPos * ${sc};
        vec4 sx = texture2D(uScaleTex, sp.yz), sy = texture2D(uScaleTex, sp.xz), sz = texture2D(uScaleTex, sp.xy);
        vec4 sc4 = sx * bw.x + sy * bw.y + sz * bw.z;
        float wr = texture2D(uNoiseTex, sp.xz * 0.23).r * bw.y + texture2D(uNoiseTex, sp.xy * 0.23).r * bw.z + texture2D(uNoiseTex, sp.yz * 0.23).r * bw.x;
        float detailFade = 1.0 - smoothstep(12.0, 70.0, camD);
        float crease = (1.0 - sc4.r) * detailFade;
        diffuseColor.rgb *= 1.0 - crease * ${opts.skin.crease.toFixed(3)};
        diffuseColor.rgb *= mix(1.0, 0.9 + 0.2 * sc4.g, detailFade);
        diffuseColor.rgb *= 0.85 + 0.3 * wr;
        float hgt = sc4.r * 0.7 + (1.0 - sc4.b) * 0.3 + wr * 0.4;
        float bumpS = ${opts.skin.bump.toFixed(3)} * (1.0 - smoothstep(8.0, 60.0, camD));`;
      }
      fs = fs.replace('#include <color_fragment>', '#include <color_fragment>\n' + detail);
      fs = fs.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      {
        vec3 dpdx = dFdx(-vViewPosition), dpdy = dFdy(-vViewPosition);
        float dhx = dFdx(hgt), dhy = dFdy(hgt);
        vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx);
        float det = dot(dpdx, r1);
        vec3 g = sign(det) * (dhx * r1 + dhy * r2);
        normal = normalize(abs(det) * normal - g * bumpS * 0.04);
      }`);
    }
    shader.fragmentShader = fs;
  };
  // 違うオプションのマテリアルが同じプログラムを共有しないように
  const key = JSON.stringify(opts);
  const prevKey = mat.customProgramCacheKey?.bind(mat);
  mat.customProgramCacheKey = () => (prevKey ? prevKey() : '') + 'world' + key;
  return mat;
}
