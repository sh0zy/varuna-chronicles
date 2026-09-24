import * as THREE from 'three';
import { Terrain } from './terrain';
import { ColliderWorld } from './colliders';
import { SkySystem } from './sky';
import { GrassSystem } from './grass';
import { Flora } from './flora';
import { River } from './water';
import { Landmarks } from './landmarks';
import { Footprints, Particles, LightShafts, Fireflies, Rain, MistBanks } from './effects';
import { worldUniforms } from './shading';
import { WorldClock } from '../core/time';
import { P } from './layout';
import { Quality } from '../core/settings';

export const QUALITY_PRESETS: Record<Quality, { shadow: number; shadowRadius: number; pixelRatioCap: number; fireflies: number; rain: number }> = {
  low: { shadow: 1024, shadowRadius: 55, pixelRatioCap: 1, fireflies: 700, rain: 2500 },
  medium: { shadow: 2048, shadowRadius: 75, pixelRatioCap: 1, fireflies: 1400, rain: 4000 },
  high: { shadow: 3072, shadowRadius: 95, pixelRatioCap: 1.5, fireflies: 2000, rain: 6000 },
};

export function createRenderer(canvasParent: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', stencil: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000);
  canvasParent.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  return renderer;
}

/** 世界（地形・空・植生・水・遺跡・効果）をまとめて作り、毎フレーム更新する */
export class World {
  scene = new THREE.Scene();
  terrain: Terrain;
  colliders = new ColliderWorld();
  sky: SkySystem;
  grass: GrassSystem;
  flora: Flora;
  river: River;
  landmarks: Landmarks;
  footprints: Footprints;
  staticPrints: Footprints;   // 物語の手がかりとして置く、消えない足跡
  particles: Particles;
  shafts: LightShafts;
  fireflies: Fireflies;
  rain: Rain;
  mist: MistBanks;
  clock = new WorldClock();
  weather = { kind: 'fog' as string, fog: 0, cloud: 0, rain: 0 };
  wind = { dir: 0, strength: 0.4 };
  time = 0;
  resonance = 0.5;

  constructor(public quality: Quality, progress?: (msg: string) => void) {
    const q = QUALITY_PRESETS[quality];
    progress?.('大地を形づくっています');
    this.terrain = new Terrain();
    this.scene.add(this.terrain.build());
    progress?.('空と光を用意しています');
    this.sky = new SkySystem(this.scene, q.shadow);
    this.sky.setShadowRadius(q.shadowRadius);
    progress?.('草海を広げています');
    this.grass = new GrassSystem(this.terrain.dataTex, quality);
    this.scene.add(this.grass.group);
    progress?.('樹海を育てています');
    this.flora = new Flora(this.terrain, this.colliders, quality);
    this.scene.add(this.flora.group);
    this.river = new River(this.terrain.dataTex);
    this.scene.add(this.river.mesh);
    progress?.('古い石を並べています');
    this.landmarks = new Landmarks(this.terrain, this.colliders);
    this.scene.add(this.landmarks.group);
    this.footprints = new Footprints(this.terrain);
    this.scene.add(this.footprints.mesh);
    this.staticPrints = new Footprints(this.terrain, 300);
    this.staticPrints.uniforms.uLife.value = 1e6;
    this.scene.add(this.staticPrints.mesh);
    this.particles = new Particles();
    this.scene.add(this.particles.points);
    this.shafts = new LightShafts(this.flora.shaftSpots);
    this.scene.add(this.shafts.group);
    this.fireflies = new Fireflies(this.terrain, q.fireflies);
    this.scene.add(this.fireflies.points);
    this.rain = new Rain(q.rain);
    this.scene.add(this.rain.lines);
    this.mist = new MistBanks(this.terrain, [
      { x: -470, z: 150, r: 170 }, { x: -380, z: -80, r: 150 }, { x: -520, z: -300, r: 160 }, { x: -250, z: 320, r: 140 },
      { x: 60, z: 180, r: 130 }, { x: 360, z: 60, r: 120 }, { x: -40, z: -200, r: 130 },
    ]);
    this.scene.add(this.mist.group);
    void P;
  }

  /** 実時間 dt で世界を進める。focus は影と草の中心（プレイヤー） */
  update(dt: number, focus: THREE.Vector3, camera: THREE.Camera, advanceClock = true) {
    this.time += dt;
    if (advanceClock) this.clock.advance(dt);
    const w = this.clock.weatherAt(this.clock.total);
    this.weather = w;
    this.wind = this.clock.wind();
    worldUniforms.uTime.value = this.time;
    worldUniforms.uWindOffset.value.x += Math.cos(this.wind.dir) * this.wind.strength * dt * 6;
    worldUniforms.uWindOffset.value.y += Math.sin(this.wind.dir) * this.wind.strength * dt * 6;
    worldUniforms.uWindVec.value.set(Math.cos(this.wind.dir), Math.sin(this.wind.dir), this.wind.strength);
    const camPos = (camera as THREE.PerspectiveCamera).position;
    this.sky.update(this.clock.hour, w, focus, camPos, this.time);
    this.grass.update(camPos, this.wind);
    this.flora.update(dt);
    this.flora.updateChunks(camPos, this.sky.shadowRadius * 1.6);
    this.river.update(this.sky);
    this.landmarks.update(dt, this.time, this.resonance);
    this.footprints.update(this.clock.total);
    this.staticPrints.update(this.clock.total);
    const lightCol = new THREE.Color().copy(this.sky.hemi.color).multiplyScalar(0.6 + this.sky.hemi.intensity * 0.6);
    this.particles.update(this.time, lightCol);
    this.shafts.update(worldUniforms.uSunDir.value, Math.max(w.fog, 0.35), worldUniforms.uSunColor.value);
    this.fireflies.update(camPos, this.sky.uniforms.uNight.value as number);
    this.rain.update(camPos, w.rain, lightCol);
    this.mist.update(w.fog, worldUniforms.uFogColor.value);
  }
}
