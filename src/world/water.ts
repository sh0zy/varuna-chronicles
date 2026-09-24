import * as THREE from 'three';
import { riverLine, riverSurface, riverHalfWidth, MAP_HALF, TERRAIN_RES, P } from './layout';
import { FOG_PARS, worldUniforms } from './shading';
import { smoothstep } from '../core/noise';

// 大河の水面。浅瀬は透明で川底が見え、深い所は緑がかった暗色になる。流れの向きに模様が流れる。

const VERT = /* glsl */ `
attribute float aSpeed;
varying vec3 vWorldPosW;
varying vec2 vUv;
varying float vSpeed;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPosW = wp.xyz;
  vUv = uv;
  vSpeed = aSpeed;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const FRAG = /* glsl */ `
${FOG_PARS}
uniform sampler2D uHeightTex;
uniform float uMapHalf, uMapRes;
uniform vec3 uSkyZenith, uSkyHorizon;
uniform float uNight;
varying vec2 vUv;
varying float vSpeed;
void main() {
  vec2 huv = ((vWorldPosW.xz + uMapHalf) / (2.0 * uMapHalf)) * ((uMapRes - 1.0) / uMapRes) + 0.5 / uMapRes;
  float bed = texture2D(uHeightTex, huv).r;
  float depth = max(vWorldPosW.y - bed, 0.0);
  vec3 V = normalize(vWorldPosW - cameraPosition);
  float dist = length(vWorldPosW - cameraPosition);
  // 流れる波紋：川に沿った座標 (vUv.y=流下方向の距離) を流速で流す
  float flowT = uTime * vSpeed;
  vec2 p1 = vec2(vUv.x * 0.9, vUv.y * 0.12 - flowT * 0.12);
  vec2 p2 = vec2(vUv.x * 2.3 + 0.37, vUv.y * 0.31 - flowT * 0.31);
  float e = 0.01;
  float h1 = texture2D(uNoiseTex, p1).r + texture2D(uNoiseTex, p2).g * 0.6;
  float hx = texture2D(uNoiseTex, p1 + vec2(e, 0.0)).r + texture2D(uNoiseTex, p2 + vec2(e, 0.0)).g * 0.6;
  float hz = texture2D(uNoiseTex, p1 + vec2(0.0, e)).r + texture2D(uNoiseTex, p2 + vec2(0.0, e)).g * 0.6;
  float amp = mix(0.18, 0.55, clamp(vSpeed, 0.0, 1.0)) * (1.0 - smoothstep(60.0, 260.0, dist) * 0.7);
  vec3 N = normalize(vec3(-(hx - h1) * amp * 12.0, 1.0, -(hz - h1) * amp * 12.0));
  float fres = 0.03 + 0.97 * pow(1.0 - max(dot(-V, N), 0.0), 5.0);
  vec3 R = reflect(V, N);
  vec3 refl = mix(uSkyHorizon, uSkyZenith, pow(max(R.y, 0.0), 0.5));
  float spec = pow(max(dot(R, uSunDir), 0.0), 240.0) * 6.0 + pow(max(dot(R, uSunDir), 0.0), 24.0) * 0.25;
  refl += uSunColor * spec * step(0.0, uSunDir.y);
  // 水の色：浅いほど川底の色を透かし、深いほど暗い碧に
  vec3 shallow = vec3(0.42, 0.5, 0.38);
  vec3 deep = vec3(0.04, 0.11, 0.11);
  float absorb = 1.0 - exp(-depth * 0.55);
  vec3 body = mix(shallow, deep, absorb) * (0.35 + 0.65 * max(uSunDir.y, 0.15)) * (1.0 - uNight * 0.75);
  // 浮遊物と濁り
  float silt = texture2D(uNoiseTex, vec2(vUv.x * 0.5, vUv.y * 0.05 - flowT * 0.05)).b;
  body = mix(body, vec3(0.35, 0.33, 0.25) * (1.0 - uNight * 0.7), smoothstep(0.55, 0.9, silt) * 0.25);
  vec3 col = mix(body, refl, fres * 0.85);
  // 岸と浅瀬の泡
  float foam = smoothstep(0.35, 0.0, depth) * smoothstep(0.45, 0.75, h1 * 0.6 + texture2D(uNoiseTex, p2 * 3.0).b * 0.5);
  foam += smoothstep(0.9, 1.3, vSpeed) * smoothstep(0.7, 0.85, texture2D(uNoiseTex, p2 * 1.7).r) * 0.35;
  col = mix(col, vec3(0.85, 0.88, 0.86) * (1.0 - uNight * 0.7), clamp(foam, 0.0, 1.0) * 0.7);
  float alpha = clamp(mix(0.25, 0.96, absorb) + fres * 0.4 + foam * 0.4, 0.0, 1.0);
  alpha *= smoothstep(0.0, 0.08, depth);
  col = applyWorldFog(col, vWorldPosW);
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export class River {
  mesh: THREE.Mesh;
  uniforms: Record<string, THREE.IUniform>;
  constructor(heightTex: THREE.Texture) {
    const pts = riverLine.pts;
    const pos: number[] = [], uv: number[] = [], spd: number[] = [], idx: number[] = [];
    const across = 8;
    const step = 5;
    let row = 0;
    for (let s = 0; s <= riverLine.length; s += step) {
      const p = riverLine.pointAt(s);
      const q = riverLine.pointAt(Math.min(riverLine.length, s + 2));
      const pr = riverLine.pointAt(Math.max(0, s - 2));
      let tx = q.x - pr.x, tz = q.z - pr.z;
      const tl = Math.hypot(tx, tz) || 1; tx /= tl; tz /= tl;
      const nx = -tz, nz = tx;
      const w = riverHalfWidth(s, p.x, p.z) + 7;
      const y = riverSurface(s);
      const fd = Math.hypot(p.x - P.ford.x, p.z - P.ford.z);
      const sp = 0.3 + 0.9 * smoothstep(30, 90, fd);
      for (let i = 0; i <= across; i++) {
        const t = i / across * 2 - 1;
        pos.push(p.x + nx * w * t, y, p.z + nz * w * t);
        uv.push(t * w * 0.05 + 0.5, s * 0.05);
        spd.push(sp * (1 - Math.abs(t) * 0.5));
      }
      if (row > 0) {
        const a0 = (row - 1) * (across + 1), a1 = row * (across + 1);
        for (let i = 0; i < across; i++) idx.push(a0 + i, a1 + i, a0 + i + 1, a0 + i + 1, a1 + i, a1 + i + 1);
      }
      row++;
    }
    void pts;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setAttribute('aSpeed', new THREE.Float32BufferAttribute(spd, 1));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    this.uniforms = {
      ...worldUniforms,
      uHeightTex: { value: heightTex }, uMapHalf: { value: MAP_HALF }, uMapRes: { value: TERRAIN_RES },
      uSkyZenith: { value: new THREE.Color() }, uSkyHorizon: { value: new THREE.Color() }, uNight: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.uniforms, transparent: true, depthWrite: false });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.renderOrder = 2;
    this.mesh.name = 'river';
  }
  update(sky: { uniforms: Record<string, THREE.IUniform> }) {
    (this.uniforms.uSkyZenith.value as THREE.Color).copy(sky.uniforms.uZenith.value);
    (this.uniforms.uSkyHorizon.value as THREE.Color).copy(sky.uniforms.uHorizon.value);
    this.uniforms.uNight.value = sky.uniforms.uNight.value;
  }
}
