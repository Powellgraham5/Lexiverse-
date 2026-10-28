// The notebook in My Words: free notes, plus notes saved from lessons and writing formats.
// Kept in IndexedDB kv under "notebook" as one list, newest edit first.
import { get, put } from './db.js';

const KEY = 'notebook';
const newId = () => `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export async function allNotes() {
  const list = (await get('kv', KEY).catch(() => null)) || [];
  return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
}
const saveAll = (list) => put('kv', list, KEY);

export async function addNote({ title = '', body = '', tag = 'My notes' } = {}, now = Date.now()) {
  const note = { id: newId(), title: title.slice(0, 120), body: body.slice(0, 20000), tag, createdAt: now, updatedAt: now };
  await saveAll([note, ...(await allNotes())]);
  return note;
}

export async function updateNote(id, patch, now = Date.now()) {
  const list = await allNotes();
  const i = list.findIndex((n) => n.id === id);
  if (i < 0) throw new Error('No such note');
  list[i] = { ...list[i], ...patch, title: (patch.title ?? list[i].title).slice(0, 120), body: (patch.body ?? list[i].body).slice(0, 20000), updatedAt: now };
  await saveAll(list);
  return list[i];
}

export async function deleteNote(id) {
  const list = await allNotes();
  const note = list.find((n) => n.id === id);
  await saveAll(list.filter((n) => n.id !== id));
  return note;
}

export async function restoreNote(note) {
  if (note) await saveAll([note, ...(await allNotes()).filter((n) => n.id !== note.id)]);
}

export const getNote = async (id) => (await allNotes()).find((n) => n.id === id) || null;

export function searchNotes(list, q) {
  const s = q.trim().toLowerCase();
  return s ? list.filter((n) => `${n.title} ${n.body} ${n.tag}`.toLowerCase().includes(s)) : list;
}

// A lesson card or format card as note text.
export function cardToNote(card, tag) {
  const ex = (card.examples || []).map((e) => `${e.good === false ? '✗' : '✓'} ${e.text}${e.note ? ` (${e.note})` : ''}`);
  return { title: card.title, body: [card.body, ...ex].filter(Boolean).join('\n'), tag };
}
