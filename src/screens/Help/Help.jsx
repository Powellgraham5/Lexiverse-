import { goBack } from '../../app/Shell.jsx';
import { usePage } from '../../app/usePage.js';
import { BackIcon } from '../../app/icons.jsx';
import '../Paths/paths.css';
import './help.css';

// Help and FAQs, grouped so learners can scan the headings and open only what they need.
const GROUPS = [
  { title: 'Getting started', items: [
    ['How do I install Lexiverse on my phone?', 'On Android, open Lexiverse in Chrome and tap Install when it appears, or open the browser menu and choose “Install app” or “Add to Home screen”. On iPhone, open it in Safari, tap the Share button, then “Add to Home Screen”. You can also install from Me.'],
    ['Does it cost anything?', 'No. Lexiverse is free, with no adverts and no subscription.'],
    ['Can I change my subject or level?', 'Yes. Go to Me, open Settings, then “Your learning”, and pick a different goal, focus or level. Your home screen changes to match.']
  ] },
  { title: 'Practice and progress', items: [
    ['What is today’s plan?', 'Three small tasks picked for you each day, such as a mixed question set, a weak topic and a lesson. Each one ticks itself off when you finish it. A new plan starts every day.'],
    ['How do daily reminders work?', 'Tap “Remind me daily” on your plan and pick a time. Lexiverse makes a calendar event that repeats every day with an alert, so your phone reminds you even when the app is closed. To stop it, delete the event in your calendar.'],
    ['What does “Needs work” mean?', 'It lists topics where you have answered at least four questions and got fewer than 6 in 10 right. Tap Practise to get a set from just that topic.'],
    ['Where can I see my scores over time?', 'Your JAMB home shows a chart for each of your subjects, and each subject’s setup screen shows its own chart. Course pages show your practice test scores.'],
    ['What is the JAMB mock exam?', 'A full practice paper like the computer-based UTME: 60 Use of English questions and 40 in each of your three other subjects, in 2 hours. You can move between questions, flag them and change answers. Each subject is scored out of 100, for a total out of 400. A short 45-minute version is also available.'],
    ['What happens if I close the app during a mock?', 'Your answers are saved and the clock pauses. Open the mock exam again and tap Resume to carry on where you stopped.'],
    ['Are the JAMB questions real past questions?', 'No. They are practice questions written in the style of the JAMB UTME, each with an explanation. Check the current JAMB syllabus for your year.']
  ] },
  { title: 'Challenges and certificates', items: [
    ['How do I challenge a friend?', 'Finish a JAMB practice set, then use “Challenge a friend” on the results screen. Send the link on WhatsApp or copy it. Your friend answers the same questions and sees who won.'],
    ['What does a challenge link share?', 'Only the question numbers, your score and the first name you type, if any. Nothing else about you or your progress.'],
    ['How do I get a certificate?', 'Finish every lesson in a course. A “Get your certificate” button appears on the course page and your home screen. Type your name, then save or share the image.'],
    ['Is the certificate an official qualification?', 'No. It shows you completed a Lexiverse practice course. It is not issued by an exam board or school.']
  ] },
  { title: 'Your data and offline use', items: [
    ['Where is my progress saved?', 'On this device only, in your browser. There is no account yet, so if you clear your browser data or change phones, your progress does not move with you. Installing the app helps protect it.'],
    ['Does it work without the internet?', 'Most of it does once you have opened it online: lessons, practice, your words and the phrasebook. Looking up new words and translating new sentences need a connection.'],
    ['Why did translation stop working?', 'Translation uses a free service with a daily limit. If it is reached, try again tomorrow. Quick phrases in the phrasebook always work offline.']
  ] },
  { title: 'Languages and voices', items: [
    ['How do I read a word in Yoruba, Hausa or Igbo?', 'Open any word in the Dictionary and choose a language under “Read this word in”. The word, its first meanings, the examples and the word types change to that language, with the English kept underneath. Translations are made by a free machine translator and still need checking by a native speaker.'],
    ['Why do I download a voice?', 'Most phones have no Yoruba, Hausa, Igbo or Pidgin voice, so Lexiverse can download one (about 38 MB, once) that runs on your phone. After that it works offline. The Igbo voice is newer and less clear than the others. Nigerian Pidgin has no free translator, so the words stay in English and the Pidgin voice reads them.'],
    ['Where do the voices come from?', 'They are Meta’s Massively Multilingual Speech voices (MMS), shared under the CC BY-NC 4.0 licence, converted to run in your browser. The Igbo voice is Soro-TTS, trained on Google’s WAXAL Igbo recordings by Media Trust, under the same licence.']
  ] },
  { title: 'Accessibility', items: [
    ['Can I make the text bigger or easier to read?', 'Yes. In Me, open Settings. Under “Seeing and reading” you can choose larger text, a reading font, high contrast and less motion.'],
    ['Does it work with a screen reader?', 'Yes. Lexiverse is built and tested for screen readers and keyboard-only use, including answers, timers and feedback.']
  ] }
];

export default function Help() {
  usePage('Help and FAQs');
  return (
    <>
      <div class="lx-top"><a class="lx-round" href="/me" aria-label="Back" onClick={goBack}><BackIcon /></a></div>
      <header class="hp-head lx-rise">
        <h1 class="lx-page-title">Help and FAQs</h1>
        <p class="pt-sub">Quick answers about practice, progress, reminders and your data.</p>
      </header>
      {GROUPS.map((g, gi) => (
        <section key={g.title} class={`hp-group lx-rise lx-d${Math.min(gi + 1, 3)}`} aria-labelledby={`hp-${gi}`}>
          <h2 id={`hp-${gi}`}>{g.title}</h2>
          <div class="hp-list lx-card">
            {g.items.map(([q, a]) => (
              <details key={q} class="hp-item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
