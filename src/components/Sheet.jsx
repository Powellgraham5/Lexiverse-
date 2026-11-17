import { useEffect, useId, useRef } from 'preact/hooks';
import { CloseIcon } from '../app/icons.jsx';
import './sheet.css';

// Bottom sheet on the native <dialog>: focus is trapped, Esc closes it, and the page behind is inert.
// onClose only fires when the learner closes it (Esc, backdrop, ×), not when the parent swaps sheets.
export function Sheet({ open, title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();
  const isOpen = useRef(open);
  isOpen.current = open;
  // Close on a backdrop tap only: both the press and the release must land outside the sheet box,
  // so drag-selecting text past the edge, or using the sheet's scrollbar, never closes it.
  const downOutside = useRef(false);
  const outside = (e) => {
    if (e.target !== ref.current) return false;
    const r = ref.current.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} class="lx-sheet" aria-labelledby={titleId} onClose={() => { if (isOpen.current) onClose(); }}
      onPointerDown={(e) => { downOutside.current = outside(e); }}
      onClick={(e) => { if (downOutside.current && outside(e)) onClose(); downOutside.current = false; }}>
      <div class="lx-sheet-body">
        <div class="lx-sheet-head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" class="lx-sheet-close" aria-label="Close" onClick={onClose}><CloseIcon /></button>
        </div>
        {open && children}
      </div>
    </dialog>
  );
}
