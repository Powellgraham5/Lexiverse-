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

// ?list=<id> on a practice screen practises only that list's words.
export const listParam = () => { try { return new URLSearchParams(location.search).get('list'); } catch { return null; } };

// Whole minutes spent in a session (at least 1), for the Progress chart.
export const minutesSince = (start) => Math.max(1, Math.round((Date.now() - (start || Date.now())) / 60000));

// Loads a practice session: { cards, daily, startedAt } once ready, error if the word data failed.
export function useSession({ size, from } = {}, key = 0) {
  const [state, setState] = useState({ cards: null, daily: null, error: null });
  useEffect(() => {
    let live = true;
    const prefs = loadPrefs();
    const list = listParam();
    loadDaily()
      .then(async (daily) => ({ daily, cards: await buildSession({ daily, profile: loadProfile(), size: size || prefs.size, from: list ? `list:${list}` : from || prefs.from }) }))
      .then((s) => live && setState({ ...s, startedAt: Date.now(), error: null }))
      .catch((error) => live && setState({ cards: null, daily: null, error }));
    return () => { live = false; };
  }, [key]);
  return state;
}
