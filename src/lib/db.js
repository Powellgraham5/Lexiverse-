// Small promise wrapper around IndexedDB. Everything the learner creates lives here
// first (local-first); sync to an account, when signed in, copies from these stores.

export const DB_NAME = 'lexiverse';
export const DB_VERSION = 1;

// keyPath stores hold records with an `id`; kv holds loose values by key.
export const STORES = {
  kv: null,
  words: 'id',     // saved words: { id: 'serendipity', listIds, savedAt, updatedAt }
  lists: 'id',     // { id, name, colour, createdAt, updatedAt }
  reviews: 'id',   // spaced repetition state per word
  history: 'id',   // lookups and practice sessions
  cache: 'id'      // dictionary and translation responses for offline use
};

let opening = null;

const promisify = (req) => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error);
});

export function openDB(factory = globalThis.indexedDB) {
  if (!opening) {
    opening = new Promise((resolve, reject) => {
      const req = factory.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const [name, keyPath] of Object.entries(STORES)) {
          if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, keyPath ? { keyPath } : undefined);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => { opening = null; reject(req.error); };
      req.onblocked = () => { opening = null; reject(new Error('Database upgrade blocked by another tab')); };
    });
  }
  return opening;
}

// Test hook: forget the cached connection.
export function resetDB() {
  opening?.then((db) => db.close()).catch(() => {});
  opening = null;
}

async function run(store, mode, fn) {
  const db = await openDB();
  const tx = db.transaction(store, mode);
  const result = await promisify(fn(tx.objectStore(store)));
  if (mode === 'readwrite') await new Promise((resolve, reject) => { tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error); });
  return result;
}

export const get = (store, key) => run(store, 'readonly', (s) => s.get(key));
export const all = (store) => run(store, 'readonly', (s) => s.getAll());
export const del = (store, key) => run(store, 'readwrite', (s) => s.delete(key));
export const clear = (store) => run(store, 'readwrite', (s) => s.clear());
export const put = (store, value, key) => run(store, 'readwrite', (s) => (STORES[store] ? s.put(value) : s.put(value, key)));
