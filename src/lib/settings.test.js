import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULTS, normalize, applySettings, loadSettings, saveSettings } from './settings.js';

const fakeRoot = () => {
  const props = {};
  return { dataset: {}, style: { setProperty: (k, v) => { props[k] = v; } }, props };
};
const memory = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) }; };

test('normalize fills defaults and rejects bad values', () => {
  assert.deepEqual(normalize(), { ...DEFAULTS });
  const s = normalize({ theme: 'neon', font: 'comic', textScale: 5, speechRate: 0, accent: 'AU' });
  assert.equal(s.theme, 'auto');
  assert.equal(s.font, 'inter');
  assert.equal(s.textScale, 2);
  assert.equal(s.speechRate, 1);
  assert.equal(s.accent, 'US');
});

test('text scale rounds to one decimal', () => {
  assert.equal(normalize({ textScale: 1.26 }).textScale, 1.3);
});

test('applySettings sets and clears html attributes', () => {
  const root = fakeRoot();
  applySettings(root, normalize({ theme: 'dark', contrast: true, font: 'reading', motion: true, textScale: 1.5 }));
  assert.deepEqual(root.dataset, { theme: 'dark', contrast: 'high', font: 'reading', motion: 'reduce' });
  assert.equal(root.props['--lx-text-scale'], '1.5');
  applySettings(root, normalize({ theme: 'light' }));
  assert.deepEqual(root.dataset, { theme: 'light' });
});

test('settings round-trip through storage', () => {
  const store = memory();
  saveSettings(normalize({ theme: 'dark', textScale: 1.2 }), store);
  const s = loadSettings(store);
  assert.equal(s.theme, 'dark');
  assert.equal(s.textScale, 1.2);
});

test('broken or missing storage falls back to defaults', () => {
  assert.deepEqual(loadSettings({ getItem: () => '{not json' }), { ...DEFAULTS });
  assert.deepEqual(loadSettings({ getItem: () => { throw new Error('blocked'); } }), { ...DEFAULTS });
  assert.doesNotThrow(() => saveSettings(DEFAULTS, { setItem: () => { throw new Error('full'); } }));
});
