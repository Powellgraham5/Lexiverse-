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

export function Toasts() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const add = (t) => {
      setItems((list) => [...list.slice(-2), t]);
      setTimeout(() => setItems((list) => list.filter((x) => x.id !== t.id)), t.action ? 6000 : 4000);
    };
    listeners.add(add);
    return () => listeners.delete(add);
  }, []);
  const dismiss = (id) => setItems((list) => list.filter((x) => x.id !== id));
  return (
    <div class="lx-toasts" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} class={`lx-toast ${t.kind}`}>
          {t.kind === 'success' && <CheckIcon size={18} />}
          {t.kind === 'error' && <AlertIcon size={18} />}
          <span class="lx-toast-text">{t.text}</span>
          {t.action && <button type="button" onClick={() => { t.onAction?.(); dismiss(t.id); }}>{t.action}</button>}
        </div>
      ))}
    </div>
  );
}
