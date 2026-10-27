// Word lists ("worlds" in the galaxy), kept on the device in IndexedDB (store "lists").
// A list is { id, name, colour, icon, createdAt, updatedAt }; words carry the ids of their lists.
import { get, put, all, del } from './db.js';
import { allWordRecords, setWordLists, getRecord } from './saved.js';

export const COLOURS = ['#4A2FE0', '#FF8A65', '#1F9D63', '#E5B000', '#2F80ED', '#D6409F'];
export const ICONS = ['cap', 'pen', 'case', 'letter', 'star', 'heart'];
export const MAX_NAME = 40;

const tidy = (name) => name.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME);
const newId = () => `l${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export async function allLists() {
  return (await all('lists')).sort((a, b) => a.createdAt - b.createdAt);
}
export const getList = (id) => get('lists', id);

export async function createList({ name, colour = COLOURS[0], icon = ICONS[0] }, now = Date.now()) {
  const clean = tidy(name);
  if (!clean) throw new Error('A list needs a name');
  const list = { id: newId(), name: clean, colour, icon, createdAt: now, updatedAt: now };
  await put('lists', list);
  return list;
}

export async function updateList(id, patch) {
  const list = await getList(id);
  if (!list) throw new Error('No such list');
  const next = { ...list, ...patch, ...(patch.name !== undefined ? { name: tidy(patch.name) } : {}), updatedAt: Date.now() };
  if (!next.name) throw new Error('A list needs a name');
  await put('lists', next);
  return next;
}

// Deletes a list. Its words stay saved (and in other lists). Returns what undo needs.
export async function deleteList(id) {
  const list = await getList(id);
  const words = (await allWordRecords()).filter((w) => (w.listIds || []).includes(id));
  for (const w of words) await put('words', { ...w, listIds: w.listIds.filter((x) => x !== id), updatedAt: Date.now() });
  await del('lists', id);
  return { list, words: words.map((w) => w.id) };
}

export async function restoreList({ list, words }) {
  await put('lists', list);
  for (const id of words) {
    const w = await getRecord(id);
    if (w) await put('words', { ...w, listIds: [...new Set([...(w.listIds || []), list.id])] });
  }
}

export async function addToList(word, listId) {
  const rec = await getRecord(word);
  return setWordLists(word, [...(rec?.listIds || []), listId]);
}
export async function removeFromList(word, listId) {
  const rec = await getRecord(word);
  return setWordLists(word, (rec?.listIds || []).filter((x) => x !== listId));
}

export const wordsInList = async (listId) => (await allWordRecords()).filter((w) => w.saved && (listId === 'saved' || (w.listIds || []).includes(listId)));

// Count, how much is known and how much is due, for a set of word ids.
export function listStats(ids, reviews, now = Date.now()) {
  const byId = new Map(reviews.map((r) => [r.id, r]));
  const rs = ids.map((id) => byId.get(id)).filter(Boolean);
  const known = rs.filter((r) => r.interval >= 21).length;
  return {
    count: ids.length,
    known: ids.length ? Math.round((known / ids.length) * 100) : 0,
    due: rs.filter((r) => r.due <= now).length,
    fresh: ids.length - rs.filter((r) => r.reps > 0).length
  };
}

// A word's learning status, for chips in a list.
export function statusOf(review, now = Date.now()) {
  if (!review || !review.reps) return 'new';
  if (review.due <= now) return 'due';
  return review.interval >= 21 ? 'known' : 'learning';
}

export function toCSV(rows) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return ['word,meaning,status', ...rows.map((r) => [r.word, r.def, r.status].map(esc).join(','))].join('\n');
}
