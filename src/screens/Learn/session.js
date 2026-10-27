import { useEffect, useState } from 'preact/hooks';
import { loadDaily } from '../../lib/daily.js';
import { loadProfile } from '../../lib/profile.js';
import { buildSession } from '../../lib/practice.js';

// Practice preferences from the setup screen (remembered on this device).
const KEY = 'lx-practice';
export const DEFAULT_PREFS = { from: 'due', size: 10, types: ['meaning', 'gap', 'listen', 'spell'] };
export function loadPrefs() {
  try { return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULT_PREFS }; }
}
export function savePrefs(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } }

// Loads a practice session: { cards, daily } once ready, error if the word data failed.
export function useSession({ size, from } = {}, key = 0) {
  const [state, setState] = useState({ cards: null, daily: null, error: null });
  useEffect(() => {
    let live = true;
    const prefs = loadPrefs();
    loadDaily()
      .then(async (daily) => ({ daily, cards: await buildSession({ daily, profile: loadProfile(), size: size || prefs.size, from: from || prefs.from }) }))
      .then((s) => live && setState({ ...s, error: null }))
      .catch((error) => live && setState({ cards: null, daily: null, error }));
    return () => { live = false; };
  }, [key]);
  return state;
}
