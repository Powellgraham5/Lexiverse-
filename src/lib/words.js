// The ranked common-word list (public/data/words.txt): level badges and the offline Letters search.

export function parseWordList(text) {
  const [head, ...rest] = text.trim().split('\n');
  const bands = head.replace('#bands ', '').split(' ').map((b) => { const [name, end] = b.split(':'); return [name, Number(end)]; });
  const list = rest.filter(Boolean);
  return { list, rank: new Map(list.map((w, i) => [w, i])), bands };
}

// Estimated CEFR level and a plain-English commonness label.
export function levelOf(word, { rank, bands }) {
  const r = rank.get(word.toLowerCase());
  if (r === undefined) return { cefr: 'C2', label: 'Rare' };
  const cefr = (bands.find(([, end]) => r < end) || ['C2'])[0];
  const label = r < 3000 ? 'Common' : r < 12000 ? 'Useful' : 'Uncommon';
  return { cefr, label };
}

const counts = (w) => { const c = {}; for (const ch of w) c[ch] = (c[ch] || 0) + 1; return c; };

// Words made from the given letters: full anagrams first, then shorter words grouped by length.
// "?" in the letters is a blank tile that can stand for any letter.
export function lettersSearch(letters, list, { min = 3, perGroup = 12 } = {}) {
  const clean = letters.toLowerCase().replace(/[^a-z?]/g, '');
  const blanks = (clean.match(/\?/g) || []).length;
  const have = counts(clean.replace(/\?/g, ''));
  const total = clean.length;
  const groups = new Map();
  for (const w of list) {
    if (w.length < min || w.length > total) continue;
    const need = counts(w);
    let missing = 0;
    for (const [ch, n] of Object.entries(need)) missing += Math.max(0, n - (have[ch] || 0));
    if (missing > blanks) continue;
    if (!groups.has(w.length)) groups.set(w.length, []);
    const g = groups.get(w.length);
    if (g.length < perGroup && w !== clean) g.push(w);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]).map(([length, words]) => ({ length, all: length === total, words }));
}

let loading = null;
export function loadWordList(fetchImpl = globalThis.fetch) {
  if (!loading) {
    loading = fetchImpl('/data/words.txt').then((r) => {
      if (!r.ok) throw new Error('words.txt ' + r.status);
      return r.text();
    }).then(parseWordList).catch((e) => { loading = null; throw e; });
  }
  return loading;
}

