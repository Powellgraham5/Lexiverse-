// Recent searches, newest first, kept on the device.
const KEY = 'lx-recent';
const MAX = 8;

export function loadRecent(storage = globalThis.localStorage) {
  try { return JSON.parse(storage?.getItem(KEY) || '[]'); } catch { return []; }
}

export function addRecent(word, storage = globalThis.localStorage) {
  const w = word.trim().toLowerCase();
  if (!w) return loadRecent(storage);
  const list = [w, ...loadRecent(storage).filter((x) => x !== w)].slice(0, MAX);
  try { storage?.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
  return list;
}

export function clearRecent(storage = globalThis.localStorage) {
  try { storage?.removeItem(KEY); } catch { /* ignore */ }
  return [];
}
