import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// 動かない小物（柵・天幕・石・遺跡の柱など）を、マテリアルごとに1つのメッシュへまとめる。
// 描画命令の数が減り、CPUの負担が大きく下がる。動かす物は userData.dynamic = true で除外する。

export function bakeStatic(root: THREE.Object3D) {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const buckets = new Map<THREE.Material, { geos: THREE.BufferGeometry[]; cast: boolean; receive: boolean }>();
  const remove: THREE.Mesh[] = [];
  const isDynamic = (o: THREE.Object3D | null): boolean => {
    for (let p = o; p && p !== root; p = p.parent) if (p.userData.dynamic) return true;
    return false;
  };
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || (m as any).isInstancedMesh || (m as any).isSkinnedMesh || Array.isArray(m.material)) return;
    if (isDynamic(m)) return;
    const mat = m.material as THREE.Material;
    if ((mat as any).transparent) return;
    let g = m.geometry.clone();
    if (!g.index) { const n = g.getAttribute('position').count; g.setIndex([...Array(n).keys()]); }
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!g.getAttribute('uv')) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.getAttribute('position').count * 2), 2));
    if (!g.getAttribute('normal')) g.computeVertexNormals();
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
    let b = buckets.get(mat);
    if (!b) buckets.set(mat, (b = { geos: [], cast: false, receive: false }));
    b.geos.push(g);
    b.cast ||= m.castShadow; b.receive ||= m.receiveShadow;
    remove.push(m);
  });
  for (const m of remove) m.parent?.remove(m);
  let merged = 0;
  for (const [mat, b] of buckets) {
    const geo = mergeGeometries(b.geos, false);
    if (!geo) continue;
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = b.cast; mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    mesh.name = 'baked';
    root.add(mesh);
    merged += b.geos.length;
  }
  return { meshesMerged: merged, drawCalls: buckets.size };
}
