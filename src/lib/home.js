import { focusPath } from './paths.js';

// Which home a learner sees: JAMB learners get the question bank, learners with a course get that
// course, and everyone else (Everyday English and subjects without a course) gets the word of the day.
export function homeFor(profile) {
  if (!profile?.done) return { kind: 'today' };
  if (profile.focus === 'jamb') return { kind: 'jamb' };
  const id = focusPath(profile.goal, profile.focus);
  return id ? { kind: 'course', id } : { kind: 'today' };
}
