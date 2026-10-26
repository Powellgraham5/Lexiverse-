// The learner's setup from onboarding: goal and level. Kept in localStorage so the
// app can decide synchronously whether to show onboarding.
const KEY = 'lx-profile';

export const GOALS = { everyday: 'e', exam: 'x', writing: 'w', work: 'k' };
export const LEVELS = { happy: 1, curious: 2, serendipity: 3 };

export function loadProfile(storage = globalThis.localStorage) {
  try { return JSON.parse(storage?.getItem(KEY) || 'null'); } catch { return null; }
}

export function saveProfile(p, storage = globalThis.localStorage) {
  try { storage?.setItem(KEY, JSON.stringify(p)); } catch { /* blocked: onboarding shows again next visit */ }
}
