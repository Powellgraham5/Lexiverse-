// Small stable string hash (FNV-1a), for deterministic shuffles that look random.
export function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export const shuffle = (list, seed, key = (x) => String(x)) => [...list].sort((a, b) => hash(seed + key(a)) - hash(seed + key(b)));
