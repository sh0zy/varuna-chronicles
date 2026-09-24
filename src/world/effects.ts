import * as THREE from 'three';
import { Rng } from '../core/noise';
import { Terrain } from './terrain';
import { patchWorldMaterial, worldUniforms } from './shading';

// ---------- 足跡（実際に生物が歩いた場所に残る。痕跡調査の対象） ----------

export type FootKind = 'round' | 'tri' | 'cera' | 'small' | 'human' | 'pad';
const FOOT_INDEX: Record<FootKind, number> = { round: 0, tri: 1, cera: 2, small: 3, human: 4, pad: 5 };
const ATLAS_N = 6;

function footAtlas(): THREE.CanvasTexture {
  const S = 128;
  const cv = document.createElement('canvas');
  cv.width = S * ATLAS_N; cv.height = S;
  const g = cv.getContext('2d')!;
  const blob = (x: number, y: number, rx: number, ry: number, rot = 0, a = 1) => {
    const grd = g.createRadialGradient(0, 0, 0, 0, 0, 1);
    grd.addColorStop(0, `rgba(30,22,14,${0.9 * a})`);
    grd.addColorStop(0.7, `rgba(45,35,22,${0.75 * a})`);
    grd.addColorStop(0.92, `rgba(150,130,100,${0.35 * a})`);
    grd.addColorStop(1, 'rgba(150,130,100,0)');
    g.save(); g.translate(x, y); g.rotate(rot); g.scale(rx, ry);
    g.fillStyle = grd; g.beginPath(); g.arc(0, 0, 1, 0, Math.PI * 2); g.fill(); g.restore();
  };
  // 0 丸い巨大な足（ソラクビ）
  blob(64, 64, 52, 46);
  for (let i = 0; i < 4; i++) blob(30 + i * 22, 20, 9, 7, 0, 0.8);
  // 1 三本指（獣脚・カゼアシ）
  const o1 = S;
  blob(o1 + 64, 84, 14, 16);
  blob(o1 + 64, 40, 7, 30); blob(o1 + 38, 54, 6, 24, -0.5); blob(o1 + 90, 54, 6, 24, 0.5);
  // 2 角竜（幅広い蹄のような指）
  const o2 = S * 2;
  blob(o2 + 64, 76, 40, 30);
  for (let i = 0; i < 4; i++) blob(o2 + 26 + i * 25, 34, 10, 13, (i - 1.5) * 0.25, 0.9);
  // 3 小型（ツチネズミなど）
  const o3 = S * 3;
  blob(o3 + 64, 70, 18, 20);
  for (let i = 0; i < 5; i++) blob(o3 + 36 + i * 14, 36, 5, 8, (i - 2) * 0.3, 0.8);
  // 4 人（主人公・野営地の人々）
  const o4 = S * 4;
  blob(o4 + 64, 44, 17, 26); blob(o4 + 64, 92, 14, 18);
  // 5 肉球のない幅広い足（ヒメヨロイ・曲竜）
  const o5 = S * 5;
  blob(o5 + 64, 66, 30, 32);
  for (let i = 0; i < 3; i++) blob(o5 + 38 + i * 26, 30, 9, 9, 0, 0.9);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export interface FootprintRec {
  species: string;
  kind: FootKind;
  x: number; z: number;
  time: number;      // ゲーム内時間（時間）
  heading: number;
  size: number;
  depth: number;     // 深さ（体重の指標、m）
  speed: number;     // 歩いていた速さ（m/s）
  trackId: number;   // 同じ個体の一連の足跡
}

export class Footprints {
  mesh: THREE.InstancedMesh;
  recs: (FootprintRec | null)[];
  private next = 0;
  private aTime: THREE.InstancedBufferAttribute;
  private aKind: THREE.InstancedBufferAttribute;
  private m4 = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private up = new THREE.Vector3(0, 1, 0);
  private nrm = new THREE.Vector3();
  uniforms = { uGameTime: { value: 0 }, uLife: { value: 14 }, uHighlight: { value: 0 } };

  constructor(private terrain: Terrain, public max = 2400) {
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.rotateX(-Math.PI / 2);
    this.aTime = new THREE.InstancedBufferAttribute(new Float32Array(max).fill(-1000), 1);
    this.aKind = new THREE.InstancedBufferAttribute(new Float32Array(max), 1);
    geo.setAttribute('aTime', this.aTime);
    geo.setAttribute('aKind', this.aKind);
    const mat = new THREE.MeshStandardMaterial({ map: footAtlas(), transparent: true, depthWrite: false, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.vertexShader = `attribute float aTime; attribute float aKind; uniform float uGameTime; uniform float uLife; varying float vFade;\n` +
        shader.vertexShader.replace('#include <uv_vertex>', `#include <uv_vertex>
          vMapUv = vMapUv * vec2(${(1 / ATLAS_N).toFixed(5)}, 1.0) + vec2(aKind * ${(1 / ATLAS_N).toFixed(5)}, 0.0);
          float age = uGameTime - aTime;
          vFade = clamp(1.0 - age / uLife, 0.0, 1.0) * step(0.0, age);
          vFade = vFade * vFade;`);
      shader.fragmentShader = `varying float vFade; uniform float uHighlight;\n` + shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
          diffuseColor.a *= vFade * (0.85 + uHighlight * 0.3);`);
    };
    patchWorldMaterial(mat);
    this.mesh = new THREE.InstancedMesh(geo, mat, max);
    this.mesh.frustumCulled = false;
    this.mesh.receiveShadow = true;
    this.mesh.renderOrder = 1;
    this.recs = new Array(max).fill(null);
    const zero = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < max; i++) this.mesh.setMatrixAt(i, zero);
  }

  add(rec: FootprintRec) {
    const i = this.next;
    this.next = (this.next + 1) % this.max;
    const y = this.terrain.height(rec.x, rec.z) + 0.03;
    this.terrain.normal(rec.x, rec.z, this.nrm);
    this.q.setFromUnitVectors(this.up, this.nrm);
    const qy = new THREE.Quaternion().setFromAxisAngle(this.up, -rec.heading + Math.PI / 2);
    this.q.multiply(qy);
    const len = rec.kind === 'tri' ? 1.2 : 1;
    this.m4.compose(new THREE.Vector3(rec.x, y, rec.z), this.q, new THREE.Vector3(rec.size, 1, rec.size * len));
    this.mesh.setMatrixAt(i, this.m4);
    this.mesh.instanceMatrix.needsUpdate = true;
    (this.aTime.array as Float32Array)[i] = rec.time;
    (this.aKind.array as Float32Array)[i] = FOOT_INDEX[rec.kind];
    this.aTime.needsUpdate = true; this.aKind.needsUpdate = true;
    this.recs[i] = rec;
  }

  /** 近くの新しい足跡（寿命内のもの） */
  near(x: number, z: number, r: number, now: number): FootprintRec[] {
    const out: FootprintRec[] = [];
    for (const f of this.recs) {
      if (!f) continue;
      if (now - f.time > this.uniforms.uLife.value) continue;
      if (Math.abs(f.x - x) > r || Math.abs(f.z - z) > r) continue;
      if (Math.hypot(f.x - x, f.z - z) <= r) out.push(f);
    }
    return out;
  }
  update(gameTime: number) { this.uniforms.uGameTime.value = gameTime; }
}

// ---------- 土煙・水しぶき（まとめて1つの Points で描く） ----------

const PART_VERT = /* glsl */ `
attribute vec4 aData; // x=開始時刻 y=寿命 z=大きさ w=種類(0土煙 1水 2火の粉 3葉)
attribute vec3 aVel;
uniform float uNow; uniform float uScale;
varying float vT; varying float vKind;
void main() {
  float t = (uNow - aData.x) / aData.y;
  vT = t; vKind = aData.w;
  vec3 p = position + aVel * (uNow - aData.x);
  float drag = aData.w < 0.5 ? 0.0 : 1.0;
  p.y -= drag * 4.9 * pow(uNow - aData.x, 2.0) * (aData.w > 2.5 ? 0.05 : 1.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float alive = step(0.0, t) * step(t, 1.0);
  float grow = aData.w < 0.5 ? (0.4 + t * 1.6) : 1.0;
  gl_PointSize = alive * aData.z * grow * uScale / max(-mv.z, 0.5);
}`;
const PART_FRAG = /* glsl */ `
uniform vec3 uDust; uniform vec3 uLight;
varying float vT; varying float vKind;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);
  vec3 col = uDust * uLight;
  float a = soft * (1.0 - vT) * 0.45;
  if (vKind > 0.5 && vKind < 1.5) { col = vec3(0.8, 0.86, 0.88) * uLight; a = soft * (1.0 - vT) * 0.6; }
  if (vKind > 1.5 && vKind < 2.5) { col = vec3(1.0, 0.6, 0.2) * 2.0; a = soft * (1.0 - vT); }
  if (vKind > 2.5) { col = vec3(0.3, 0.42, 0.2) * uLight; a = step(d, 0.35) * (1.0 - vT); }
  gl_FragColor = vec4(col, a);
}`;

export class Particles {
  points: THREE.Points;
  private n = 0;
  private pos: Float32Array; private data: Float32Array; private vel: Float32Array;
  private geo: THREE.BufferGeometry;
  uniforms = { uNow: { value: 0 }, uScale: { value: 300 }, uDust: { value: new THREE.Color(0x9a8a6a) }, uLight: { value: new THREE.Color(1, 1, 1) } };
  private r = new Rng(3);
  constructor(public max = 3000) {
    this.geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(max * 3);
    this.data = new Float32Array(max * 4).fill(-100);
    this.vel = new Float32Array(max * 3);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('aData', new THREE.BufferAttribute(this.data, 4));
    this.geo.setAttribute('aVel', new THREE.BufferAttribute(this.vel, 3));
    const mat = new THREE.ShaderMaterial({ vertexShader: PART_VERT, fragmentShader: PART_FRAG, uniforms: this.uniforms, transparent: true, depthWrite: false });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 3;
  }
  emit(x: number, y: number, z: number, count: number, kind: 0 | 1 | 2 | 3, spread: number, size: number, life: number, up = 1.5) {
    const now = this.uniforms.uNow.value;
    for (let k = 0; k < count; k++) {
      const i = this.n; this.n = (this.n + 1) % this.max;
      this.pos[i * 3] = x + this.r.range(-spread, spread);
      this.pos[i * 3 + 1] = y + this.r.range(0, spread * 0.3);
      this.pos[i * 3 + 2] = z + this.r.range(-spread, spread);
      this.vel[i * 3] = this.r.range(-1, 1) * spread * 0.6;
      this.vel[i * 3 + 1] = this.r.range(0.2, 1) * up;
      this.vel[i * 3 + 2] = this.r.range(-1, 1) * spread * 0.6;
      this.data[i * 4] = now + this.r.range(0, 0.15);
      this.data[i * 4 + 1] = life * this.r.range(0.7, 1.3);
      this.data[i * 4 + 2] = size * this.r.range(0.7, 1.3);
      this.data[i * 4 + 3] = kind;
    }
    (this.geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('aData') as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('aVel') as THREE.BufferAttribute).needsUpdate = true;
  }
  update(now: number, light: THREE.Color) { this.uniforms.uNow.value = now; this.uniforms.uLight.value.copy(light); }
}

// ---------- 光の柱（樹冠の隙間から霧を通る光） ----------

export class LightShafts {
  group = new THREE.Group();
  private mat: THREE.ShaderMaterial;
  constructor(spots: THREE.Vector3[]) {
    this.mat = new THREE.ShaderMaterial({
      uniforms: { uTime: worldUniforms.uTime, uIntensity: { value: 0 }, uColor: { value: new THREE.Color(1, 0.95, 0.8) }, uNoise: { value: worldUniforms.uNoiseTex.value } },
      vertexShader: `varying vec2 vUv; varying vec3 vWp; void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position,1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,
      fragmentShader: `uniform float uTime, uIntensity; uniform vec3 uColor; uniform sampler2D uNoise; varying vec2 vUv; varying vec3 vWp;
        void main(){
          float edge = sin(vUv.x * 3.14159);
          float streak = texture2D(uNoise, vec2(vUv.x * 2.0 + uTime * 0.01, vUv.y * 0.2)).r;
          float dust = texture2D(uNoise, vec2(vUv.x * 6.0, vUv.y * 3.0 - uTime * 0.03)).g;
          float a = pow(edge, 2.0) * smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.6, vUv.y) * (0.45 + 0.55 * streak) * (0.8 + 0.4 * dust);
          float camD = length(vWp - cameraPosition);
          a *= smoothstep(4.0, 16.0, camD) * (1.0 - smoothstep(70.0, 140.0, camD));
          gl_FragColor = vec4(uColor * a * uIntensity, 1.0);
          #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    const r = new Rng(21);
    for (const s of spots) {
      const h = r.range(28, 44);
      const geo = new THREE.CylinderGeometry(r.range(1.6, 2.6), r.range(0.6, 1.1), h, 16, 1, true);
      geo.translate(0, h / 2, 0);
      const m = new THREE.Mesh(geo, this.mat);
      m.position.copy(s);
      m.renderOrder = 4;
      this.group.add(m);
    }
  }
  update(sunDir: THREE.Vector3, mist: number, sunColor: THREE.Color) {
    // 太陽の方向へ傾ける
    const tilt = Math.max(0.1, Math.min(1, sunDir.y));
    for (const m of this.group.children) {
      m.rotation.set(0, 0, 0);
      m.lookAt(m.position.clone().add(new THREE.Vector3(sunDir.x, 0, sunDir.z)));
      m.rotateX(-(1 - tilt) * 0.6);
    }
    const day = Math.max(0, Math.min(1, (sunDir.y - 0.05) * 4));
    (this.mat.uniforms.uIntensity as THREE.IUniform).value = day * (0.05 + mist * 0.16);
    (this.mat.uniforms.uColor.value as THREE.Color).copy(sunColor);
  }
}

// ---------- ホタルゴケムシ（夜の生物発光） ----------

export class Fireflies {
  points: THREE.Points;
  uniforms = { uTime: worldUniforms.uTime, uNight: { value: 0 }, uCam: { value: new THREE.Vector3() } };
  constructor(private terrain: Terrain, count = 700) {
    const r = new Rng(88);
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = r.range(0, 120); pos[i * 3 + 1] = r.range(0.4, 3.5); pos[i * 3 + 2] = r.range(0, 120);
      seed[i] = r.next();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `attribute float aSeed; uniform float uTime; uniform vec3 uCam; uniform float uNight; varying float vA;
        uniform sampler2D uHeight;
        void main(){
          vec3 p = position;
          p.xz = p.xz + 120.0 * floor((uCam.xz - p.xz) / 120.0 + 0.5);
          p.x += sin(uTime * 0.4 + aSeed * 40.0) * 1.5; p.z += cos(uTime * 0.33 + aSeed * 30.0) * 1.5;
          p.y += sin(uTime * 0.7 + aSeed * 10.0) * 0.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float blink = pow(0.5 + 0.5 * sin(uTime * (0.9 + aSeed * 1.5) + aSeed * 60.0), 3.0);
          vA = blink * uNight;
          gl_PointSize = (70.0 / max(-mv.z, 1.0)) * (0.6 + aSeed);
        }`,
      fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(vec3(0.55, 1.0, 0.45) * 3.0 * pow(smoothstep(0.5, 0.0, d), 1.5) * vA, 1.0); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
  }
  update(camPos: THREE.Vector3, night: number) {
    this.uniforms.uCam.value.copy(camPos);
    this.uniforms.uNight.value = night;
    // 高さは地面付近に（CPU側でグループごとに地面の高さへ）
    this.points.position.y = this.terrain.height(camPos.x, camPos.z) - 0.2;
    this.points.visible = night > 0.01;
  }
}

// ---------- 雨 ----------

export class Rain {
  lines: THREE.LineSegments;
  uniforms = { uTime: worldUniforms.uTime, uCam: { value: new THREE.Vector3() }, uAmount: { value: 0 }, uLight: { value: new THREE.Color() } };
  constructor(count = 5000) {
    const r = new Rng(4);
    const pos = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const x = r.range(0, 60), y = r.range(0, 30), z = r.range(0, 60);
      pos.set([x, y, z, x + 0.05, y + 0.7, z + 0.02], i * 6);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `uniform float uTime; uniform vec3 uCam; uniform float uAmount; varying float vA;
        void main(){
          vec3 p = position;
          p.y = mod(p.y - uTime * 16.0, 30.0) + uCam.y - 12.0;
          p.xz = p.xz + 60.0 * floor((uCam.xz - p.xz) / 60.0 + 0.5);
          vA = step(fract(position.x * 7.13 + position.z * 3.7), uAmount);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `uniform vec3 uLight; varying float vA; void main(){ if (vA < 0.5) discard; gl_FragColor = vec4(uLight * 0.7, 0.35); }`,
      transparent: true, depthWrite: false,
    });
    this.lines = new THREE.LineSegments(geo, mat);
    this.lines.frustumCulled = false;
  }
  update(cam: THREE.Vector3, amount: number, light: THREE.Color) {
    this.uniforms.uCam.value.copy(cam);
    this.uniforms.uAmount.value = amount;
    this.uniforms.uLight.value.copy(light);
    this.lines.visible = amount > 0.02;
  }
}

// ---------- 地面を這う霧の帯（夜明けの草海） ----------

export class MistBanks {
  group = new THREE.Group();
  private mat: THREE.ShaderMaterial;
  constructor(terrain: Terrain, centers: { x: number; z: number; r: number }[]) {
    this.mat = new THREE.ShaderMaterial({
      uniforms: { uTime: worldUniforms.uTime, uMist: { value: 0 }, uColor: { value: new THREE.Color() }, uNoise: { value: worldUniforms.uNoiseTex.value } },
      vertexShader: `varying vec2 vUv; varying vec3 vWp; void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position,1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,
      fragmentShader: `uniform float uTime, uMist; uniform vec3 uColor; uniform sampler2D uNoise; varying vec2 vUv; varying vec3 vWp;
        void main(){
          float n = texture2D(uNoise, vWp.xz * 0.004 + vec2(uTime * 0.004, 0.0)).r * 0.6 + texture2D(uNoise, vWp.xz * 0.011 - vec2(0.0, uTime * 0.006)).g * 0.4;
          float edge = smoothstep(0.5, 0.2, length(vUv - 0.5));
          float camD = length(vWp - cameraPosition);
          float a = smoothstep(0.35, 0.8, n) * edge * uMist * 0.55 * smoothstep(8.0, 40.0, camD);
          gl_FragColor = vec4(uColor, a);
          #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false,
    });
    for (const c of centers) {
      for (let k = 0; k < 3; k++) {
        const g = new THREE.PlaneGeometry(c.r * 2, c.r * 2);
        g.rotateX(-Math.PI / 2);
        const m = new THREE.Mesh(g, this.mat);
        m.position.set(c.x, terrain.height(c.x, c.z) + 1.5 + k * 2.2, c.z);
        m.renderOrder = 5;
        this.group.add(m);
      }
    }
  }
  update(mist: number, color: THREE.Color) {
    (this.mat.uniforms.uMist as THREE.IUniform).value = mist;
    (this.mat.uniforms.uColor.value as THREE.Color).copy(color);
    this.group.visible = mist > 0.02;
  }
}
