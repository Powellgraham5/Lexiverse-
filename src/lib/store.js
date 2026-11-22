// localStorage, or null when the browser blocks site data (reading it then throws a SecurityError).
export function local() {
  try { return globalThis.localStorage || null; } catch { return null; }
}
