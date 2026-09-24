import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { World, createRenderer } from '../world/world';
import { buildTemplate, instantiate } from '../creatures/builder';
import { RigAnimator, defaultParams } from '../creatures/animator';
import { SPECIES } from '../creatures/species';
import { P } from '../world/layout';
import { Quality } from '../core/settings';

// 開発用：世界と生物の見た目を確認する。?view=lineup|start|camp|jade|clearing|tower &hour=6.2 &q=medium

const qs = new URLSearchParams(location.search);
const quality = (qs.get('q') as Quality) || 'medium';
const info = document.getElementById('info')!;
const renderer = createRenderer(document.body);
renderer.setPixelRatio(1);
renderer.setSize(innerWidth, innerHeight);
const t0 = performance.now();
const world = new World(quality, (m) => (info.textContent = m));
const buildMs = performance.now() - t0;
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.2, 12000);
const controls = new OrbitControls(camera, renderer.domElement);
world.clock.total = Number(qs.get('hour') ?? 7.0);
const view = qs.get('view') ?? 'lineup';
const T = world.terrain;
const Y = (x: number, z: number) => T.height(x, z);

const creatures: { root: THREE.Group; anim: RigAnimator; speed: number }[] = [];
const place = (id: string, x: number, z: number, yaw: number, speed: number, scale = 1) => {
  const sp = SPECIES[id];
  const t = buildTemplate(sp.shape);
  const rig = instantiate(t, null);
  const s = sp.scale * scale;
  rig.root.scale.setScalar(s);
  rig.root.position.set(x, Y(x, z), z);
  rig.root.rotation.y = yaw;
  world.scene.add(rig.root);
  const anim = new RigAnimator(rig, sp, s);
  creatures.push({ root: rig.root, anim, speed: speed * s });
};

if (view === 'lineup') {
  const bx = -150, bz = 200;
  place('sorakubi', bx, bz, Math.PI / 2, 1.2);
  place('sorakubi', bx - 10, bz + 22, Math.PI / 2, 0, 0.34);
  place('suikaku', bx + 5, bz - 20, Math.PI / 2, 1.0);
  place('suikaku', bx + 30, bz - 34, Math.PI / 2, 0, 2.0);
  place('ooagito', bx + 30, bz + 8, Math.PI / 2, 1.0);
  place('kusagari', bx + 12, bz + 18, Math.PI / 2, 1.2);
  place('kazeashi', bx + 18, bz + 24, Math.PI / 2, 1.5);
  place('himeyoroi', bx + 6, bz + 28, Math.PI / 2, 0.8);
  place('kagewatari', bx + 24, bz + 34, Math.PI / 2, 0);
  place('nedamari', bx + 12, bz + 34, Math.PI / 2, 0.3);
  place('tsuchinezumi', bx + 9, bz + 36, Math.PI / 2, 0.4);
  place('honetsutsuki', bx + 14, bz + 38, Math.PI / 2, 0);
  controls.target.set(bx + 14, Y(bx + 14, bz + 12) + 3, bz + 12);
  camera.position.set(bx + 14, Y(bx + 14, bz + 12) + 12, bz + 60);
} else {
  const views: Record<string, [number, number, number, number, number, number]> = {
    start: [P.startHill.x + 10, 4, P.startHill.z - 10, -420, 0, 120],
    camp: [P.campView.x - 20, 6, P.campView.z + 10, -80, 0, 100],
    jade: [P.jadeEdge.x - 60, 3, P.jadeEdge.z + 40, P.jadeEdge.x, 12, P.jadeEdge.z - 20],
    clearing: [P.clearing.x - 80, 8, P.clearing.z + 70, P.clearing.x, 3, P.clearing.z],
    tower: [P.tower.x - 30, 8, P.tower.z + 40, P.tower.x, 6, P.tower.z],
  };
  const v = views[view] ?? views.start;
  camera.position.set(v[0], Y(v[0], v[2]) + v[1] + 1.6, v[2]);
  controls.target.set(v[3], Y(v[3], v[5]) + v[4], v[5]);
  if (view === 'start') {
    for (let i = 0; i < 10; i++) place('sorakubi', -430 + (i % 4) * 16, 150 + Math.floor(i / 4) * 22 + (i % 2) * 6, Math.PI * 0.9, 1.2, i === 3 ? 0.34 : 1);
  }
}
controls.update();

let frames = 0, acc = 0;
const times: number[] = [];
let last = performance.now();
(window as any).__preview = { ready: false, buildMs, times, info: () => renderer.info };
function loop() {
  const now = performance.now();
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  times.push(dt * 1000);
  if (times.length > 600) times.shift();
  for (const c of creatures) {
    const p = defaultParams();
    p.speed = c.speed;
    if (c.speed === 0) p.graze = 0.6;
    c.anim.update(dt, p);
    if (c.speed > 0) {
      c.root.position.x += Math.sin(c.root.rotation.y) * c.speed * dt;
      c.root.position.z += Math.cos(c.root.rotation.y) * c.speed * dt;
      c.root.position.y = Y(c.root.position.x, c.root.position.z);
    }
  }
  world.update(dt, controls.target, camera, false);
  renderer.toneMappingExposure = world.sky.exposure;
  renderer.render(world.scene, camera);
  frames++; acc += dt;
  if (acc > 0.5) {
    const sorted = [...times].sort((a, b) => a - b);
    info.textContent = `${view} ${world.clock.label()} 構築 ${buildMs.toFixed(0)}ms\n平均 ${(sorted.reduce((a, b) => a + b, 0) / sorted.length).toFixed(1)}ms  95% ${sorted[Math.floor(sorted.length * 0.95)].toFixed(1)}ms\n描画 ${renderer.info.render.calls}回 ${(renderer.info.render.triangles / 1000).toFixed(0)}k三角形`;
    frames = 0; acc = 0;
    (window as any).__preview.ready = true;
  }
  requestAnimationFrame(loop);
}
loop();
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
