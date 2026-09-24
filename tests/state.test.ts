import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newState, validateState, SaveSystem, SAVE_VERSION, Storage } from '../src/game/state';
import { QUESTS, DEDUCTIONS, CLUES, SKILLS, RECORDS } from '../src/game/content';

class MemStore implements Storage {
  m = new Map<string, string>();
  getItem(k: string) { return this.m.get(k) ?? null; }
  setItem(k: string, v: string) { this.m.set(k, v); }
  removeItem(k: string) { this.m.delete(k); }
}

test('新しい状態は検証を通り、内容が保たれる', () => {
  const s = newState();
  const r = validateState(JSON.parse(JSON.stringify(s)));
  assert.ok(r.ok);
  if (r.ok) assert.deepEqual(r.state.player, s.player);
});

test('壊れたデータ・形式違いは失敗として扱い、例外を出さない', () => {
  for (const bad of [null, 42, 'x', {}, { version: 'a' }, { version: 1, player: { x: 'nan' } }]) {
    const r = validateState(bad);
    assert.equal(r.ok, false);
  }
});

test('未来の版のセーブは読み込まない', () => {
  const s = { ...newState(), version: SAVE_VERSION + 1 };
  const r = validateState(s);
  assert.equal(r.ok, false);
});

test('重複した手がかり・図鑑項目は一つにまとまる（報酬の二重取りを防ぐ）', () => {
  const s = newState();
  s.clues = ['hum', 'hum', 'mural'];
  s.codex = { sorakubi: ['seen', 'seen', 'herd'] };
  s.skills = ['stamina', 'stamina'];
  const r = validateState(JSON.parse(JSON.stringify(s)));
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.deepEqual(r.state.clues, ['hum', 'mural']);
  assert.deepEqual(r.state.codex.sorakubi, ['seen', 'herd']);
  assert.deepEqual(r.state.skills, ['stamina']);
});

test('範囲外の値は安全な範囲に収める', () => {
  const s = newState() as any;
  s.player.x = 99999; s.player.hp = -5; s.player.stones = 1e9;
  s.tower.rings = [7, -1, 2];
  const r = validateState(JSON.parse(JSON.stringify(s)));
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.state.player.x, 760);
  assert.equal(r.state.player.hp, 1);
  assert.equal(r.state.player.stones, 99);
  assert.deepEqual(r.state.tower.rings, [3, 3, 2]);
});

test('オルガの決着はセーブと読み込みの後も残る', () => {
  const store = new MemStore();
  const saves = new SaveSystem(store);
  const s = newState();
  s.orga = { phase: 'calm', pins: [true, true, true], method: 'release' };
  s.flags.orgaResolved = true;
  assert.ok(saves.write('manual1', s).ok);
  const r = saves.read('manual1');
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.state.orga.phase, 'calm');
  assert.equal(r.state.flags.orgaResolved, true);
});

test('自動記録は2枠を交互に使い、片方が壊れても最新の正しい記録を選ぶ', () => {
  const store = new MemStore();
  const saves = new SaveSystem(store);
  const a = saves.autosave({ ...newState(), playSeconds: 10 });
  const b = saves.autosave({ ...newState(), playSeconds: 20 });
  assert.notEqual(a.slot, b.slot);
  store.setItem(`varuna.save.${b.slot}`, '{壊れた');
  const latest = saves.latest();
  assert.equal(latest, a.slot);
  assert.equal(saves.info(b.slot).error !== undefined, true);
});

test('クエストの各段階に3段階のヒントの最初が必ずある', () => {
  for (const q of Object.values(QUESTS)) for (const st of q.stages) assert.ok(st.hints[0].length > 0, `${q.id}: ${st.text}`);
});

test('推理に必要な手がかりはすべて定義されている', () => {
  for (const d of Object.values(DEDUCTIONS)) for (const set of d.needs) for (const t of set) {
    if (t.startsWith('seen:')) continue;
    assert.ok(CLUES[t], `${d.id} が参照する ${t}`);
  }
});

test('重要な推理には複数の手がかりの組み合わせがある', () => {
  for (const id of ['orga_left', 'orga_tower', 'fence_cut']) assert.ok(DEDUCTIONS[id].needs.length >= 2, id);
});

test('技能の費用と記録の時代が定義されている', () => {
  for (const s of SKILLS) assert.ok(s.cost >= 1 && s.cost <= 3);
  for (const r of Object.values(RECORDS)) assert.ok(r.era.length > 0);
});
