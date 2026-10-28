import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { CheckIcon, CloseIcon, PenIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { addNote, cardToNote } from '../../lib/notebook.js';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { loadPath, lessonsOf, markLessonDone } from '../../lib/paths.js';
import { recordActivity } from '../../lib/streak.js';
import { VIEWS, Passage, scored } from './exercises.jsx';
import '../../components/options.css';
import '../Learn/practice.css';
import './paths.css';

export default function Lesson() {
  const { params } = useRoute();
  const [path, setPath] = useState(undefined);
  useEffect(() => { loadPath(params.id).then(setPath).catch(() => setPath(null)); }, [params.id]);
  const lessons = path ? lessonsOf(path) : [];
  const lesson = lessons.find((l) => l.id === params.lesson);
  usePage(lesson?.title || 'Lesson');
  const [stage, setStage] = useState({ part: 'cards', i: 0 });
  const [log, setLog] = useState([]);
  const started = useRef(Date.now());

  useEffect(() => { setStage({ part: 'cards', i: 0 }); setLog([]); started.current = Date.now(); }, [params.lesson]);
  // Each new card or exercise moves focus to its heading, so screen readers start at the top.
  useEffect(() => { const h = document.querySelector('#main h1'); if (h && stage.i + (stage.part === 'cards' ? 0 : 1) > 0) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } scrollTo(0, 0); }, [stage]);

  const back = `/learn/path/${params.id}`;
  if (path === undefined) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Lesson" closeHref={back} /><h1 class="lx-sr">Lesson</h1></div>;
  if (!path || !lesson) return <div class="ps"><SessionTop done={0} total={0} label="Lesson" closeHref="/learn/paths" /><ErrorCard title="This lesson isn't here">Go back to the path and pick a lesson.</ErrorCard><a class="lx-btn" href="/learn/paths">All paths</a></div>;

  const steps = lesson.cards.length + lesson.exercises.length;
  const at = stage.part === 'cards' ? stage.i : lesson.cards.length + stage.i;
  const nextLesson = lessons[lessons.indexOf(lesson) + 1];

  async function finish(entries) {
    const graded = entries.filter((e) => e.ok !== null);
    const score = graded.filter((e) => e.ok).length;
    await markLessonDone(path.id, lesson.id, { score, total: graded.length }).catch(() => {});
    recordActivity('review', undefined, undefined, Math.max(1, Math.round((Date.now() - started.current) / 60000)));
    setStage({ part: 'done', i: 0 });
  }
  function exerciseDone(ok, detail = '') {
    const x = lesson.exercises[stage.i];
    const entries = [...log, { ok: scored(x) ? ok : null, word: x.q.length > 60 ? `${x.q.slice(0, 57)}…` : x.q, detail }];
    setLog(entries);
    if (stage.i + 1 >= lesson.exercises.length) finish(entries);
    else setStage({ part: 'ex', i: stage.i + 1 });
  }

  if (stage.part === 'done') {
    const graded = log.filter((e) => e.ok !== null);
    return (
      <div class="ps">
        <Results title="Lesson complete!" score={graded.filter((e) => e.ok).length} total={graded.length} unit="correct"
          missed={graded.filter((e) => !e.ok).map((e) => ({ word: e.word, detail: e.detail, link: false }))}
          onRetry={() => { setLog([]); setStage({ part: 'cards', i: 0 }); started.current = Date.now(); }} retryLabel="Do it again"
          doneHref={nextLesson ? `/learn/path/${path.id}/${nextLesson.id}` : back} doneLabel={nextLesson ? `Next: ${nextLesson.title}` : 'Back to the path'}
          extra={nextLesson && <a class="lx-btn ghost" href={back}>Back to the path</a>} />
      </div>
    );
  }

  if (stage.part === 'cards') {
    const card = lesson.cards[stage.i];
    const last = stage.i + 1 >= lesson.cards.length;
    return (
      <div class="ps">
        <SessionTop done={at} total={steps} label={lesson.title} closeHref={back} />
        <span class="ps-tag lx-rise">{lesson.title} · {stage.i + 1} of {lesson.cards.length}</span>
        <h1 class="lx-rise lx-d1">{card.title}</h1>
        <p class="ls-body lx-rise lx-d2">{card.body}</p>
        {card.examples?.length > 0 && (
          <ul class="ls-examples lx-rise lx-d3">
            {card.examples.map((e) => (
              <li key={e.text} class={e.good === false ? 'bad' : 'good'}>
                {e.good === false ? <CloseIcon size={18} /> : <CheckIcon size={18} />}
                <span><span class="lx-sr">{e.good === false ? 'Avoid: ' : 'Example: '}</span>{e.text}{e.note && <small>{e.note}</small>}</span>
              </li>
            ))}
          </ul>
        )}
        <button type="button" class="lx-btn ghost small ls-save" onClick={() => addNote(cardToNote(card, path.title))
          .then(() => toast({ text: 'Saved to your notebook', kind: 'success', action: 'Open', onAction: () => { location.href = '/words?tab=notebook'; } }))
          .catch(() => toast({ text: "Couldn't save the note", kind: 'error' }))}><PenIcon size={18} />Save to notebook</button>
        <div class="ps-foot">
          <button type="button" class="lx-btn" onClick={() => setStage(last ? { part: 'ex', i: 0 } : { part: 'cards', i: stage.i + 1 })}>{last ? 'Start the practice' : 'Next'}</button>
          {stage.i > 0 && <button type="button" class="lx-btn ghost" onClick={() => setStage({ part: 'cards', i: stage.i - 1 })}>Back</button>}
        </div>
      </div>
    );
  }

  const x = lesson.exercises[stage.i];
  const View = VIEWS[x.type];
  return (
    <div class="ps">
      <SessionTop done={at} total={steps} label={lesson.title} closeHref={back} />
      {x.type !== 'write' && <span class="ps-tag lx-rise">Practice · {stage.i + 1} of {lesson.exercises.length}</span>}
      {x.passage && <Passage text={x.passage} />}
      <View key={`${lesson.id}-${stage.i}`} x={x} seed={`${lesson.id}${stage.i}`} onDone={exerciseDone} />
    </div>
  );
}
