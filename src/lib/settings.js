// Display and listening preferences. Stored in localStorage so index.html can apply
// them before first paint (no theme flash), and mirrored onto <html> as data attributes
// that design/tokens.css and src/styles/base.css read.

export const DEFAULTS = Object.freeze({
  theme: 'auto',        // 'auto' | 'light' | 'dark'
  contrast: false,      // high contrast
  font: 'inter',        // 'inter' | 'reading' (Atkinson Hyperlegible) | 'system'
  textScale: 1,         // 1 to 2
  motion: false,        // true = reduce motion
  readAloud: true,
  accent: 'US',         // 'US' | 'UK'
  speechRate: 1,        // 0.5 to 1.5
  translateTo: 'yo'
});

const KEY = 'lx-settings';
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export function normalize(input = {}) {
  const s = { ...DEFAULTS, ...input };
  if (!['auto', 'light', 'dark'].includes(s.theme)) s.theme = DEFAULTS.theme;
  if (!['inter', 'reading', 'system'].includes(s.font)) s.font = DEFAULTS.font;
  if (!['US', 'UK'].includes(s.accent)) s.accent = DEFAULTS.accent;
  s.textScale = Math.round(clamp(Number(s.textScale) || 1, 1, 2) * 10) / 10;
  s.speechRate = clamp(Number(s.speechRate) || 1, 0.5, 1.5);
  s.contrast = Boolean(s.contrast);
  s.motion = Boolean(s.motion);
  s.readAloud = Boolean(s.readAloud);
  return s;
}

export function applySettings(root, s) {
  root.dataset.theme = s.theme;
  if (s.contrast) root.dataset.contrast = 'high'; else delete root.dataset.contrast;
  if (s.font !== 'inter') root.dataset.font = s.font; else delete root.dataset.font;
  if (s.motion) root.dataset.motion = 'reduce'; else delete root.dataset.motion;
  root.style.setProperty('--lx-text-scale', String(s.textScale));
  // Large text: playful absolute layouts (orbits) switch to simple flowing lists.
  if (s.textScale >= 1.4) root.dataset.largeText = ''; else delete root.dataset.largeText;
}

export function loadSettings(storage = globalThis.localStorage) {
  try { return normalize(JSON.parse(storage?.getItem(KEY) || '{}')); } catch { return normalize(); }
}

export function saveSettings(s, storage = globalThis.localStorage) {
  try { storage?.setItem(KEY, JSON.stringify(s)); } catch { /* private mode or full: settings still apply for this visit */ }
}
