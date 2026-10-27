// Saved words and personal notes, kept on the device in IndexedDB (store "words").
// One record per word: { id, saved, savedAt, note, updatedAt }. Lists arrive in build phase 4.
import { get, put, all } from './db.js';

const now = () => Date.now();

async function update(word, patch) {
  const id = word.toLowerCase();
  const rec = (await get('words', id)) || { id, saved: false, note: '' };
  const next = { ...rec, ...patch, updatedAt: now() };
  await put('words', next);
  return next;
}

export const getRecord = (word) => get('words', word.toLowerCase());
export const isSaved = async (word) => Boolean((await getRecord(word))?.saved);
export const saveWord = (word) => update(word, { saved: true, savedAt: now() });
export const unsaveWord = (word) => update(word, { saved: false });
export const setNote = (word, note) => update(word, { note: note.slice(0, 1000) });
export const savedWords = async () => (await all('words')).filter((r) => r.saved).sort((a, b) => b.savedAt - a.savedAt);
