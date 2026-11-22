import { useState } from 'preact/hooks';
import { CheckIcon, ChevronIcon } from '../app/icons.jsx';
import { Sheet } from './Sheet.jsx';
import { toast } from './toast.jsx';
import { loadReminder, saveReminder, downloadReminder, niceTime } from '../lib/plan.js';
import './daily-plan.css';

// Today's plan: three tasks with a tick when done, plus a free daily reminder in the learner's calendar.
// tasks: [{ id, label, detail, href, done }]
export function DailyPlan({ tasks, id = 'plan' }) {
  const done = tasks.filter((t) => t.done).length;
  const all = done === tasks.length;
  return (
    <section class="dp lx-card" aria-labelledby={id}>
      <div class="dp-head">
        <h2 id={id}>Today’s plan</h2>
        <span class={`dp-count ${all ? 'all' : ''}`}>{all ? 'All done' : `${done} of ${tasks.length} done`}</span>
      </div>
      <span class="lx-bar dp-bar" aria-hidden="true"><span style={{ width: `${(100 * done) / tasks.length}%` }} /></span>
      <ol class="dp-list">
        {tasks.map((t) => (
          <li key={t.id}>
            <a class={`dp-task ${t.done ? 'done' : ''}`} href={t.href}>
              <span class="dp-check" aria-hidden="true">{t.done && <CheckIcon size={16} />}</span>
              <span class="dp-text"><b>{t.label}</b>{t.detail && <span>{t.detail}</span>}</span>
              <span class="lx-sr">{t.done ? ', done' : ', to do'}</span>
              <ChevronIcon />
            </a>
          </li>
        ))}
      </ol>
      {all && <p class="dp-well">Well done. Come back tomorrow for a new plan.</p>}
      <Reminder />
    </section>
  );
}

function Reminder() {
  const [time, setTime] = useState(loadReminder);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(time || '18:00');
  const add = () => {
    try {
      downloadReminder(draft, location.origin + '/');
      saveReminder(draft); setTime(draft); setOpen(false);
      toast({ text: `Open the downloaded file to add a daily ${niceTime(draft)} reminder to your calendar`, kind: 'success' });
    } catch { toast({ text: "Couldn't create the reminder", kind: 'error' }); }
  };
  return (
    <>
      <div class="dp-remind">
        <span>{time ? <>Daily reminder at <b>{niceTime(time)}</b></> : 'Get a nudge every day'}</span>
        <button type="button" class="lx-btn ghost small" onClick={() => setOpen(true)}>{time ? 'Change' : 'Remind me daily'}</button>
      </div>
      <Sheet open={open} title="Daily reminder" onClose={() => setOpen(false)}>
        <p class="dp-sheet-text">Pick a time. We make a calendar event that repeats every day with an alert, so your phone reminds you even when Lexiverse is closed. It's free and needs no account.</p>
        <label class="dp-time"><span>Reminder time</span><input type="time" value={draft} onInput={(e) => setDraft(e.currentTarget.value || '18:00')} /></label>
        <button type="button" class="lx-btn" onClick={add}>Add to my calendar</button>
        <p class="dp-sheet-note">On iPhone, tap “Add All” when the calendar opens. To stop it later, delete the event in your calendar.</p>
      </Sheet>
    </>
  );
}
