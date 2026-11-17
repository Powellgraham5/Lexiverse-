import { useEffect, useState } from 'preact/hooks';
import { CheckIcon, AlertIcon } from '../app/icons.jsx';
import './toast.css';

// Toasts follow docs/STATES.md: 4 s, or 6 s when they carry an action (such as Undo).
let listeners = new Set();
let nextId = 1;

export function toast({ text, kind = 'info', action, onAction }) {
  const t = { id: nextId++, text, kind, action, onAction };
  listeners.forEach((fn) => fn(t));
  return t.id;
}

// Each toast's timer pauses while the pointer or keyboard focus is on it (WCAG 2.2.1), so there is
// always time to reach Undo.
const timers = new Map();
function arm(t, remove) {
  if (timers.get(t.id)?.handle) return; // already running
  const left = timers.get(t.id)?.left ?? (t.action ? 6000 : 4000);
  timers.set(t.id, { left, start: Date.now(), handle: setTimeout(() => { timers.delete(t.id); remove(t.id); }, left) });
}
function hold(id) {
  const tm = timers.get(id);
  if (!tm || tm.handle === null) return;
  clearTimeout(tm.handle);
  timers.set(id, { left: Math.max(1500, tm.left - (Date.now() - tm.start)), handle: null });
}

export function Toasts() {
  const [items, setItems] = useState([]);
  const remove = (id) => setItems((list) => list.filter((x) => x.id !== id));
  useEffect(() => {
    const add = (t) => {
      setItems((list) => [...list.slice(-2), t]);
      arm(t, remove);
    };
    listeners.add(add);
    return () => listeners.delete(add);
  }, []);
  const dismiss = (id) => { clearTimeout(timers.get(id)?.handle); timers.delete(id); remove(id); };
  return (
    <div class="lx-toasts" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} class={`lx-toast ${t.kind}`}
          onMouseEnter={() => hold(t.id)} onMouseLeave={() => arm(t, remove)}
          onFocusIn={() => hold(t.id)} onFocusOut={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) arm(t, remove); }}>
          {t.kind === 'success' && <CheckIcon size={18} />}
          {t.kind === 'error' && <AlertIcon size={18} />}
          <span class="lx-toast-text">{t.text}</span>
          {t.action && <button type="button" onClick={() => { t.onAction?.(); dismiss(t.id); }}>{t.action}</button>}
        </div>
      ))}
    </div>
  );
}
