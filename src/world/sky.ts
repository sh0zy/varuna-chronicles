import * as THREE from 'three';
import { worldUniforms } from './shading';
import { sunDirection, moonDirection } from '../core/time';
import { clamp, lerp, smoothstep } from '../core/noise';

// 時刻ごとの空と光の色。静かな時間と壮大な時間に強弱をつけるため、夜明けと夕暮れに色を集中させる。
interface Key { h: number; zenith: number; horizon: number; sun: number; sunI: number; amb: number; ambI: number; fog: number; exposure: number }
const KEYS: Key[] = [
  { h: 0, zenith: 0x06102a, horizon: 0x15234a, sun: 0x8fa6d8, sunI: 0.16, amb: 0x2a3a66, ambI: 0.62, fog: 0x14203c, exposure: 1.35 },
  { h: 4.4, zenith: 0x081230, horizon: 0x1c2a4c, sun: 0x8fa6d8, sunI: 0.12, amb: 0x2c3a62, ambI: 0.55, fog: 0x1a2640, exposure: 1.3 },
  { h: 5.4, zenith: 0x1d2f55, horizon: 0xc98a6a, sun: 0xff9a5c, sunI: 0.5, amb: 0x51587a, ambI: 0.45, fog: 0x9aa3b4, exposure: 1.05 },
  { h: 6.4, zenith: 0x3f6aa6, horizon: 0xf2c18f, sun: 0xffc08a, sunI: 1.5, amb: 0x8a96b0, ambI: 0.55, fog: 0xc8c6c0, exposure: 1.0 },
  { h: 8.5, zenith: 0x3d74bf, horizon: 0xbcd3e6, sun: 0xfff0d6, sunI: 2.6, amb: 0x9fb6cf, ambI: 0.62, fog: 0xb9cad8, exposure: 0.92 },
  { h: 12, zenith: 0x2e6cc4, horizon: 0xb3cde6, sun: 0xfffaf0, sunI: 3.0, amb: 0xa4bcd6, ambI: 0.66, fog: 0xb5c9dc, exposure: 0.88 },
  { h: 16, zenith: 0x3a6fb8, horizon: 0xcad3d8, sun: 0xffe6c0, sunI: 2.6, amb: 0xa7b3c4, ambI: 0.6, fog: 0xc2cbd2, exposure: 0.92 },
  { h: 18, zenith: 0x3d4f86, horizon: 0xf0a468, sun: 0xff9748, sunI: 1.6, amb: 0x8c7f8f, ambI: 0.5, fog: 0xcf9f82, exposure: 1.0 },
  { h: 19.2, zenith: 0x1b2248, horizon: 0x8a4a58, sun: 0xff6e3a, sunI: 0.45, amb: 0x4c4466, ambI: 0.4, fog: 0x5a4458, exposure: 1.05 },
  { h: 20.4, zenith: 0x0a1330, horizon: 0x1e2a4e, sun: 0x8fa6d8, sunI: 0.16, amb: 0x2c3a66, ambI: 0.58, fog: 0x172340, exposure: 1.3 },
  { h: 24, zenith: 0x06102a, horizon: 0x15234a, sun: 0x8fa6d8, sunI: 0.16, amb: 0x2a3a66, ambI: 0.62, fog: 0x14203c, exposure: 1.35 },
];
const c1 = new THREE.Color(), c2 = new THREE.Color();
function sample(h: number) {
  let i = 0;
  while (i < KEYS.length - 2 && KEYS[i + 1].h <= h) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = clamp((h - a.h) / (b.h - a.h), 0, 1);
  const col = (x: number, y: number) => c1.set(x).lerp(c2.set(y), t).clone();
  return {
    zenith: col(a.zenith, b.zenith), horizon: col(a.horizon, b.horizon), sun: col(a.sun, b.sun),
    sunI: lerp(a.sunI, b.sunI, t), amb: col(a.amb, b.amb), ambI: lerp(a.ambI, b.ambI, t), fog: col(a.fog, b.fog),
    exposure: lerp(a.exposure, b.exposure, t),
  };
}

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`;
const SKY_FRAG = /* glsl */ `
uniform vec3 uZenith, uHorizon, uSunCol, uSunDir, uMoonDir, uFogCol;
uniform float uNight, uCloud, uTime, uMist;
uniform sampler2D uNoise;
varying vec3 vDir;
float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
void main() {
  vec3 d = normalize(vDir);
  float up = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(up, 0.42));
  // 太陽と散乱
  float sd = max(dot(d, uSunDir), 0.0);
  col += uSunCol * (pow(sd, 6.0) * 0.35 + pow(sd, 64.0) * 0.6) * (1.0 - uNight * 0.8);
  float disc = smoothstep(0.9994, 0.99975, sd);
  col += uSunCol * disc * 6.0 * (1.0 - uCloud * 0.7) * step(-0.02, uSunDir.y);
  // 月
  float md = max(dot(d, normalize(uMoonDir)), 0.0);
  col += vec3(0.75, 0.8, 0.95) * smoothstep(0.99955, 0.9998, md) * uNight * 1.6;
  col += vec3(0.25, 0.3, 0.45) * pow(md, 40.0) * uNight * 0.3;
  // 星（夜だけ。雲で隠れる）
  vec3 sp = floor(d * 420.0);
  float st = hash(sp);
  float star = step(0.9965, st) * (0.6 + 0.4 * sin(uTime * (1.0 + st * 3.0) + st * 40.0));
  col += vec3(0.85, 0.9, 1.0) * star * uNight * smoothstep(0.02, 0.2, d.y) * (1.0 - uCloud);
  // 天の川の帯
  float band = exp(-pow(dot(d, normalize(vec3(0.4, 0.2, 0.9))) * 3.2, 2.0));
  col += vec3(0.12, 0.13, 0.2) * band * uNight * texture2D(uNoise, d.xz * 1.6 + 0.3).r * (1.0 - uCloud) * smoothstep(0.0, 0.3, d.y);
  // 雲（2層の流れる雲）
  vec2 cuv = d.xz / (d.y + 0.12);
  float cl = texture2D(uNoise, cuv * 0.18 + vec2(uTime * 0.0015, 0.0)).r * 0.6 + texture2D(uNoise, cuv * 0.5 + vec2(uTime * 0.003, uTime * 0.001)).g * 0.4;
  float cov = smoothstep(0.62 - uCloud * 0.45, 0.9 - uCloud * 0.3, cl) * smoothstep(0.0, 0.18, d.y);
  vec3 cloudCol = mix(uHorizon * 1.05 + 0.04, uSunCol * 0.9 + uHorizon * 0.3, pow(sd, 4.0) * 0.8);
  cloudCol = mix(cloudCol, uZenith * 0.5 + uHorizon * 0.2, uNight * 0.7);
  col = mix(col, cloudCol, cov * 0.85);
  // 地平線より下は霧の色へ
  col = mix(col, uFogCol, smoothstep(0.06, -0.05, d.y));
  col = mix(col, uFogCol, uMist * 0.5 * smoothstep(0.25, 0.0, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export class SkySystem {
  mesh: THREE.Mesh;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  uniforms: Record<string, THREE.IUniform>;
  exposure = 1;
  shadowRadius = 70;
  isNight = false;
  private tmp = new THREE.Vector3();

  constructor(scene: THREE.Scene, shadowSize: number) {
    this.uniforms = {
      uZenith: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uSunCol: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uMoonDir: { value: new THREE.Vector3(0, 1, 0) }, uFogCol: { value: new THREE.Color() },
      uNight: { value: 0 }, uCloud: { value: 0 }, uTime: { value: 0 }, uMist: { value: 0 }, uNoise: { value: worldUniforms.uNoiseTex.value },
    };
    const geo = new THREE.SphereGeometry(1, 48, 24);
    const mat = new THREE.ShaderMaterial({ vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, uniforms: this.uniforms, side: THREE.BackSide, depthWrite: false, depthTest: true });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -10;
    this.mesh.scale.setScalar(9000);
    scene.add(this.mesh);

    this.sun = new THREE.DirectionalLight(0xffffff, 2);
    this.sun.castShadow = shadowSize > 0;
    if (shadowSize > 0) {
      this.sun.shadow.mapSize.set(shadowSize, shadowSize);
      const cam = this.sun.shadow.camera;
      cam.left = -this.shadowRadius; cam.right = this.shadowRadius; cam.top = this.shadowRadius; cam.bottom = -this.shadowRadius;
      cam.near = 1; cam.far = 600;
      this.sun.shadow.bias = -0.0004;
      this.sun.shadow.normalBias = 0.6;
    }
    scene.add(this.sun, this.sun.target);
    this.hemi = new THREE.HemisphereLight(0xa0b8d0, 0x4a4030, 0.6);
    scene.add(this.hemi);
  }

  setShadowRadius(r: number) {
    this.shadowRadius = r;
    const cam = this.sun.shadow.camera;
    cam.left = -r; cam.right = r; cam.top = r; cam.bottom = -r;
    cam.updateProjectionMatrix();
  }

  update(hour: number, weather: { fog: number; cloud: number; rain: number }, focus: THREE.Vector3, camPos: THREE.Vector3, time: number) {
    const s = sample(hour);
    const sd = sunDirection(hour);
    const md = moonDirection(hour);
    const sunUp = sd.y > -0.03;
    const night = 1 - smoothstep(-0.12, 0.05, sd.y);
    this.isNight = night > 0.5;
    // 雲と雨で光を弱め、色を灰色に寄せる
    const overcast = clamp(weather.cloud * 0.75 + weather.rain * 0.6, 0, 1);
    const grey = new THREE.Color(0.55, 0.58, 0.62).multiplyScalar(0.3 + 0.7 * (1 - night));
    s.horizon.lerp(grey.clone().multiplyScalar(1.25), overcast * 0.6);
    s.zenith.lerp(grey, overcast * 0.7);
    s.fog.lerp(grey.clone().multiplyScalar(1.2), overcast * 0.5);
    // 朝霧は明るく乳白に
    s.fog.lerp(new THREE.Color(0.8, 0.8, 0.8).multiplyScalar(0.25 + 0.75 * (1 - night)).lerp(s.sun, 0.25), weather.fog * 0.5);

    const u = this.uniforms;
    (u.uZenith.value as THREE.Color).copy(s.zenith);
    (u.uHorizon.value as THREE.Color).copy(s.horizon);
    (u.uSunCol.value as THREE.Color).copy(s.sun);
    (u.uFogCol.value as THREE.Color).copy(s.fog);
    (u.uSunDir.value as THREE.Vector3).set(sd.x, sd.y, sd.z);
    (u.uMoonDir.value as THREE.Vector3).set(md.x, md.y, md.z);
    u.uNight.value = night;
    u.uCloud.value = overcast;
    u.uTime.value = time;
    u.uMist.value = weather.fog;

    // 光源：昼は太陽、夜は月（同じ平行光を使い回す）
    const lightDir = sunUp ? this.tmp.set(sd.x, Math.max(sd.y, 0.04), sd.z) : this.tmp.set(md.x, Math.max(md.y, 0.2), md.z);
    lightDir.normalize();
    const sunI = s.sunI * (1 - overcast * 0.7) * (1 - weather.fog * 0.35);
    this.sun.intensity = sunUp ? sunI : 0.5 * (1 - overcast * 0.6) * Math.max(0.3, md.y);
    this.sun.color.copy(sunUp ? s.sun : new THREE.Color(0.66, 0.76, 1.0));
    // 影のちらつきを防ぐため、影カメラの位置をテクセル単位に揃える
    const texel = (this.shadowRadius * 2) / this.sun.shadow.mapSize.x;
    const fx = Math.round(focus.x / texel) * texel, fz = Math.round(focus.z / texel) * texel;
    this.sun.target.position.set(fx, focus.y, fz);
    this.sun.position.set(fx + lightDir.x * 250, focus.y + lightDir.y * 250, fz + lightDir.z * 250);
    this.sun.target.updateMatrixWorld();
    this.hemi.color.copy(s.amb);
    this.hemi.groundColor.copy(s.amb).multiplyScalar(0.45).lerp(new THREE.Color(0x3a3020), 0.4);
    this.hemi.intensity = s.ambI * (1 + overcast * 0.25);
    this.exposure = s.exposure;

    // 世界共通の大気
    worldUniforms.uSunDir.value.set(sd.x, sd.y, sd.z);
    worldUniforms.uSunColor.value.copy(s.sun).multiplyScalar(1 - night * 0.7);
    worldUniforms.uFogColor.value.copy(s.fog);
    worldUniforms.uFogDensity.value = 0.00055 + weather.fog * 0.0012 + weather.rain * 0.0012 + overcast * 0.0002;
    worldUniforms.uMist.value = weather.fog;
    worldUniforms.uCloudCover.value = 0.18 + weather.cloud * 0.6;
    worldUniforms.uCloudShadow.value = sunUp ? 0.5 : 0.2;
    worldUniforms.uWetness.value = lerp(worldUniforms.uWetness.value, weather.rain > 0.3 ? 1 : 0, 0.004);
    this.mesh.position.copy(camPos);
  }
}
