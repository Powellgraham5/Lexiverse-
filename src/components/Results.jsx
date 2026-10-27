import './results.css';

// End of a practice session: score, words that moved on, and what comes back when.
// missed: [{ word, detail, back }]
export function Results({ title, score, total, unit = 'correct', known = 0, missed = [], onRetry, retryLabel = 'Try again', doneHref = '/learn', doneLabel = 'Done', extra }) {
  const ratio = total ? score / total : 0;
  const verdict = ratio === 1 ? 'Perfect!' : ratio >= 0.7 ? 'Nice work!' : ratio >= 0.4 ? 'Good effort!' : 'Keep going!';
  return (
    <section class="rs" aria-labelledby="rs-title">
      <div class="rs-planet lx-rise" aria-hidden="true">
        <b>{score}/{total}</b>
        <span>{unit}</span>
      </div>
      <h1 id="rs-title" class="lx-rise lx-d1" role="status">{title || verdict}</h1>
      <p class="rs-sub lx-rise lx-d2">
        {score} of {total} {unit}{known > 0 ? ` · +${known} word${known === 1 ? '' : 's'} moved to Known` : ''}.
      </p>
      {missed.length > 0 && (
        <div class="rs-missed lx-rise lx-d3">
          <h2>{missed.length} to practise again</h2>
          <ul>
            {missed.map((m) => (
              <li key={m.word} class="lx-card">
                <div>{m.link === false ? <b>{m.word}</b> : <a href={`/word/${m.word}`}>{m.word}</a>}{m.back && <span class="rs-back">{m.link === false ? m.back : `Back ${m.back}`}</span>}</div>
                {m.detail && <p>{m.detail}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {extra}
      <div class="rs-actions">
        {onRetry && <button type="button" class="lx-btn secondary" onClick={onRetry}>{retryLabel}</button>}
        <a class="lx-btn" href={doneHref}>{doneLabel}</a>
      </div>
    </section>
  );
}
