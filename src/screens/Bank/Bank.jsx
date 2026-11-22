import { useEffect, useState } from 'preact/hooks';
import { goBack } from '../../app/Shell.jsx';
import { usePage } from '../../app/usePage.js';
import { BackIcon, ChevronIcon, LearnIcon } from '../../app/icons.jsx';
import { JAMB_SUBJECTS, BANK_NOTE, loadBank, loadBankProgress, bestSession, seenCount } from '../../lib/bank.js';
import '../Paths/paths.css';
import './bank.css';

// JAMB practice: every subject's question bank, with how far the learner has got in each.
export default function Bank() {
  usePage('JAMB practice questions');
  const [info, setInfo] = useState({});
  useEffect(() => {
    let live = true;
    Promise.all(JAMB_SUBJECTS.map(async (s) => {
      if (!s.load) return [s.id, null];
      try {
        const [bank, prog] = await Promise.all([loadBank(s.id), loadBankProgress(s.id)]);
        return [s.id, { count: bank.questions.length, seen: seenCount(prog), best: bestSession(prog) }];
      } catch { return [s.id, { failed: true }]; }
    })).then((rows) => live && setInfo(Object.fromEntries(rows))).catch(() => {});
    return () => { live = false; };
  }, []);

  return (
    <>
      <div class="lx-top"><a class="lx-round" href="/learn/paths" aria-label="Back" onClick={goBack}><BackIcon /></a></div>
      <header class="bk-head lx-rise">
        <span class="pt-planet big" style={{ background: 'var(--lx-family-bg)' }} aria-hidden="true"><LearnIcon size={34} /></span>
        <h1 class="lx-page-title">JAMB practice questions</h1>
        <p class="pt-sub">Pick a subject. Every session draws a new random set, and every answer is explained.</p>
      </header>
      <ul class="bk-subjects lx-rise lx-d1" aria-label="Subjects">
        {JAMB_SUBJECTS.map((s) => {
          const i = info[s.id];
          if (!s.load) {
            return <li key={s.id}><div class="pt-row soon"><span><b>{s.title}</b><span>Questions are being written</span></span><span class="pt-soon">Coming soon</span></div></li>;
          }
          return (
            <li key={s.id}>
              <a class="pt-row" href={`/learn/bank/jamb/${s.id}`}>
                <span><b>{s.title}</b>
                  <span>{!i ? 'Loading…' : i.failed ? 'Connect to the internet once to load this subject' : `${i.count} questions · ${i.seen} seen${i.best ? ` · best ${i.best.score}/${i.best.total}` : ''}`}</span>
                </span>
                <ChevronIcon />
              </a>
            </li>
          );
        })}
      </ul>
      <a class="pd-test lx-rise lx-d2" href="/learn/path/jamb">
        <LearnIcon />
        <span><b>Use of English lessons</b><span>Step-by-step lessons on comprehension, grammar, oral forms and the set text</span></span>
        <ChevronIcon />
      </a>
      <p class="pd-note">{BANK_NOTE}</p>
    </>
  );
}
