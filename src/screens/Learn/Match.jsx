import { useMemo, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { CheckIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { useSession } from './session.js';
import { SessionTop } from './SessionTop.jsx';
import { buildMatch } from '../../lib/practice.js';
import { getReview, fresh, record, comesBack, gradeFor } from '../../lib/srs.js';
import { recordActivity } from '../../lib/streak.js';
import './practice.css';
import './match.css';

export default function Match() {
  usePage('Word match');
  const [round, setRound] = useState(0);
  const { cards, error } = useSession({ size: 4 }, round);
  const game = useMemo(() => cards && buildMatch(cards, `match${round}`), [cards]);
  const [word, setWord] = useState(null);
  const [matched, setMatched] = useState([]);
  const [missedWords, setMissedWords] = useState([]);
  const [misses, setMisses] = useState(0);
  const [bad, setBad] = useState(null);
  const [status, setStatus] = useState('');
  const [log, setLog] = useState(null);

  async function finish(allMissed) {
    recordActivity('review');
    const out = [];
    for (const w of game.words) {
      const helped = allMissed.includes(w);
      const before = (await getReview(w).catch(() => null)) || fresh(w);
      const g = gradeFor({ correct: true, helped });
      await record(w, g).catch(() => {});
      out.push({ word: w, ok: !helped, back: comesBack(before, g), detail: helped ? 'Matched after a miss.' : '' });
    }
    setLog(out);
  }

  function pickDef(d) {
    if (!word || matched.includes(d.w)) return;
    if (d.w === word) {
      const m = [...matched, word];
      setMatched(m); setWord(null); setStatus(`Matched: ${word}`);
      if (m.length === game.words.length) finish(missedWords);
    } else {
      setMisses(misses + 1); setMissedWords([...new Set([...missedWords, word])]);
      setBad(d.w); setStatus(`Not a match. Try another pair.`);
      setTimeout(() => setBad(null), 450);
    }
  }

  if (error) return <div class="ps"><SessionTop done={0} total={0} label="Word match" /><ErrorCard title="Practice didn't load">Try again in a moment.</ErrorCard></div>;
  if (!game) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Word match" /><h1 class="lx-sr">Word match</h1></div>;
  if (log) {
    return (
      <div class="ps">
        <Results title="All matched!" score={game.words.length} total={game.words.length} unit="pairs"
          missed={log.filter((x) => !x.ok)}
          extra={<p class="rs-sub">{misses === 0 ? 'No wrong tries. Brilliant.' : `${misses} wrong ${misses === 1 ? 'try' : 'tries'}. Those words will come back in review.`}</p>}
          onRetry={() => { setMatched([]); setMissedWords([]); setMisses(0); setLog(null); setStatus(''); setRound(round + 1); }} retryLabel="Play again" />
      </div>
    );
  }

  return (
    <div class="ps">
      <SessionTop done={matched.length} total={game.words.length} label="Word match" />
      <span class="ps-tag mt-tag">Word match</span>
      <h1>Tap a word, then its meaning</h1>
      <div class="mt-grid">
        <div role="group" aria-label="Words" class="mt-col">
          {game.words.map((w) => {
            const done = matched.includes(w);
            return (
              <button key={w} type="button" class={`mt-tile word ${done ? 'done' : ''} ${word === w ? 'sel' : ''}`} aria-pressed={word === w}
                disabled={done} onClick={() => setWord(word === w ? null : w)}>
                {done && <CheckIcon size={16} />}{w}{done && <span class="lx-sr">, matched</span>}
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Meanings" class="mt-col">
          {game.defs.map((d) => {
            const done = matched.includes(d.w);
            return (
              <button key={d.w} type="button" class={`mt-tile def ${done ? 'done' : ''} ${bad === d.w ? 'bad' : ''}`} disabled={done}
                aria-disabled={!word} onClick={() => pickDef(d)}>
                {done && <CheckIcon size={16} />}{d.text}{done && <span class="lx-sr">, matched</span>}
              </button>
            );
          })}
        </div>
      </div>
      <p class="mt-status" role="status" aria-live="polite">{status || (word ? `Now pick the meaning of “${word}”.` : 'Matched pairs turn green.')}</p>
    </div>
  );
}
