import * as THREE from 'three';
import { Humanoid, DEFAULT_APPEARANCE } from '../player/humanoid';
import { World } from '../world/world';
import { NpcId } from './content';
import { P } from '../world/layout';

// 野営地の人々。立ち位置と、焚き火の方を向く仕草だけの簡素な動き。

export interface Npc { id: NpcId; model: Humanoid; pos: THREE.Vector3; yaw: number; sitting: boolean }

const DEFS: { id: NpcId; dx: number; dz: number; look: [number, number]; app: Partial<typeof DEFAULT_APPEARANCE>; sitting?: boolean }[] = [
  { id: 'ena', dx: -2.6, dz: 1.6, look: [0, 0], app: { skin: 0xa4704c, hair: 0xb8b0a0, hairStyle: 'long', cloak: 0x6a3a30, cloth: 0x5a4a3a, build: 0.92, height: 0.93, markings: true }, sitting: true },
  { id: 'porka', dx: 2.8, dz: -1.2, look: [0, 0], app: { skin: 0xe0b48e, hair: 0x5a3a22, hairStyle: 'short', cloak: 0x8a7a58, cloth: 0x9a6a48, build: 1.12, height: 0.98, markings: false } },
  { id: 'tarku', dx: 13, dz: 3.5, look: [16, 6], app: { skin: 0x7a4f34, hair: 0x15100c, hairStyle: 'tied', cloak: 0x4e5a3a, cloth: 0x6a4a36, build: 1.05, height: 1.04, markings: true } },
  { id: 'niko', dx: 7, dz: 9.4, look: [7, 8], app: { skin: 0xf0cfb0, hair: 0x7a2e1e, hairStyle: 'short', cloak: 0x3e4a5a, cloth: 0x8a8a70, build: 0.9, height: 0.95, markings: false } },
  { id: 'iva', dx: -9, dz: 12, look: [-6, 14], app: { skin: 0xc99a74, hair: 0x2a1d14, hairStyle: 'shaved', cloak: 0x4a3a4e, cloth: 0x5d6a48, build: 1.1, height: 1.02, markings: false } },
];

export class CampNpcs {
  list: Npc[] = [];
  constructor(world: World) {
    for (const d of DEFS) {
      const model = new Humanoid({ ...DEFAULT_APPEARANCE, ...d.app, name: d.id }, false);
      const x = P.camp.x + d.dx, z = P.camp.z + d.dz;
      const pos = new THREE.Vector3(x, world.terrain.height(x, z), z);
      const lx = P.camp.x + d.look[0], lz = P.camp.z + d.look[1];
      const yaw = Math.atan2(lx - x, lz - z);
      model.root.position.copy(pos);
      model.root.rotation.y = yaw;
      world.scene.add(model.root);
      world.colliders.add({ x, z, r: 0.45, top: pos.y + 1.8, active: true, kind: 'struct' });
      this.list.push({ id: d.id, model, pos, yaw, sitting: !!d.sitting });
    }
  }
  get(id: NpcId) { return this.list.find((n) => n.id === id)!; }
  update(dt: number, time: number, playerPos: THREE.Vector3, windS: number) {
    for (const n of this.list) {
      const d = n.pos.distanceTo(playerPos);
      // 近づくとこちらを向く
      const want = d < 6 ? Math.atan2(playerPos.x - n.pos.x, playerPos.z - n.pos.z) : n.yaw;
      let cur = n.model.root.rotation.y;
      let diff = want - cur;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      cur += diff * Math.min(1, dt * 2);
      n.model.root.rotation.y = cur;
      if (d < 120) n.model.animate(dt, { speed: 0, crouch: n.sitting ? 1 : 0, swim: 0, attack: 0, attackKind: 0, aim: 0, dodge: 0, ride: 0, hurt: 0, time: time + n.pos.x, wind: windS, interact: 0, climb: 0 });
      n.model.root.visible = d < 250;
    }
  }
}
