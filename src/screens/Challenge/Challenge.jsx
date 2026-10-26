import { useMemo, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useRequest } from '../../app/useRequest.js';
import { CloseIcon, CheckIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { loadDaily, wordOfTheDay, buildChallenge } from '../../lib/daily.js';
import { loadProfile } from '../../lib/profile.js';
import { recordActivity } from '../../lib/streak.js';
import './challenge.css';

const KEYS = 'ABC';

export default function Challenge() {
  usePage('Daily challenge');
  const { route } = useLocation();
  const profile = loadProfile();
  const [req, retry] = useRequest(() => loadDaily(), [], { isOnline: () => true });
  const [picked, setPicked] = useState(null);
  const [own, setOwn] = useState('');

  const word = req.data && wordOfTheDay(req.data, { level: profile?.level || 2, goal: profile?.goal || 'e' });
  const ch = useMemo(() => word && buildChallenge(word, req.data), [word]);
  const answered = picked !== null;
  const right = answered && picked === ch.answer;

  function done() {
    recordActivity('challenge');
    route('/');
  }

  return (
    <div class="ch">
      <div class="ch-top">
        <a class="ch-close" href="/" aria-label="Close challenge"><CloseIcon /></a>
        <b class="ch-title">Daily challenge</b>
        <span class="ch-time">1 min</span>
      </div>

      {req.state === 'error' && <ErrorCard title="The challenge didn't load" code={req.code || 'DICT-503'} onRetry={retry}>Check your connection and try again.</ErrorCard>}

      {ch && (
        <>
          <div class="ch-word lx-card lx-rise">
            <span class="ch-planet" aria-hidden="true">{word.w[0]}</span>
            <span><b>{word.w}</b><span>{word.def}</span></span>
          </div>
          <h1 class="lx-rise lx-d1">{ch.question}</h1>
          <div role="group" aria-label="Answers" class="ch-options">
            {ch.options.map((o, i) => {
              const state = answered && i === ch.answer ? 'right' : answered && i === picked ? 'wrong' : answered ? 'dim' : '';
              return (
                <button key={o.text} type="button" class={`ch-option lx-rise lx-d${i + 2} ${state}`} aria-disabled={answered}
                  onClick={() => !answered && setPicked(i)}>
                  <span class="ch-key">{state === 'right' ? <><CheckIcon size={16} /><span class="lx-sr">{KEYS[i]}</span></> : KEYS[i]}</span>
                  <span>{o.text}</span>
                  {state === 'right' && <span class="lx-sr">, correct answer</span>}
                  {state === 'wrong' && <span class="lx-sr">, your answer, not correct</span>}
                </button>
              );
            })}
          </div>

          {answered && (
            <>
              <div class={`ch-feedback lx-rise ${right ? 'right' : 'wrong'}`} role="status">
                <b>{right ? 'Spot on!' : `Not quite. It's ${KEYS[ch.answer]}.`}</b>
                <span>{ch.explain}</span>
              </div>
              <div class="ch-own lx-rise lx-d2">
                <label for="own">Now use it yourself <span>(optional)</span></label>
                <textarea id="own" rows="2" value={own} onInput={(e) => setOwn(e.currentTarget.value)} placeholder={`Write a sentence with “${word.w}”`} />
              </div>
              <button type="button" class="lx-btn ch-done lx-rise lx-d3" onClick={done}>Done · keep my streak</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
