import { AlertIcon } from '../app/icons.jsx';
import './error-card.css';

// Plain explanation, one-tap retry and the error code (docs/STATES.md).
export function ErrorCard({ title, children, code, onRetry, retryLabel = 'Try again' }) {
  return (
    <div class="lx-error-card" role="alert">
      <b><AlertIcon size={22} />{title}</b>
      {children && <p>{children}</p>}
      <div class="lx-error-row">
        {onRetry && <button type="button" class="lx-btn small" onClick={onRetry}>{retryLabel}</button>}
        {code && <span class="lx-error-code">Code {code}</span>}
      </div>
    </div>
  );
}
