// What each onboarding goal asks next, and how later screens talk about it. Keyed by the goal
// codes in profile.js (e everyday, x exam, w writing, k work). All the copy lives here.

export const GOAL_FLOW = {
  e: {
    name: 'Everyday English',
    question: 'Where do you use English most?',
    sub: "We'll pick words you can use there today.",
    options: [
      ['friends', 'Chatting with friends', 'Messages, calls and hanging out'],
      ['travel', 'Travel', 'Directions, hotels and new places'],
      ['media', 'Films, music and books', 'Understand more of what you enjoy'],
      ['school', 'School', 'Classes, homework and group work']
    ],
    ready: (f) => ({ title: 'You’re all set', first: 'Your first word', lead: `One new word a day for ${f.toLowerCase()}. A few minutes of practice. Small steps add up.` })
  },
  x: {
    name: 'Exam preparation',
    question: 'Which exam are you preparing for?',
    sub: "We'll focus on the words examiners love.",
    options: [
      ['waec', 'WAEC / NECO', 'Senior secondary school exams'],
      ['jamb', 'JAMB (UTME)', 'University entrance'],
      ['ielts', 'IELTS', 'Study, work or move abroad'],
      ['toefl', 'TOEFL', 'University abroad'],
      ['sat', 'SAT', 'US college admission'],
      ['other', 'Another exam', 'Any test that needs strong vocabulary']
    ],
    ready: (f) => ({ title: `You’re set for ${f}`, first: `Your first ${f} word`, lead: 'One exam word a day. A few minutes of practice. Walk in ready.' })
  },
  w: {
    name: 'Better writing',
    question: 'What do you write most?',
    sub: "We'll choose words that make your writing shine.",
    options: [
      ['essays', 'Essays', 'School and university'],
      ['reports', 'Reports', 'Clear, precise and professional'],
      ['stories', 'Stories', 'Vivid, creative writing'],
      ['letters', 'Letters', 'Formal, informal and semi-formal']
    ],
    ready: (f) => ({ title: 'You’re set to write', first: 'Your first writing word', lead: `One word a day for your ${f.toLowerCase()}. A few minutes of practice. Watch your writing grow.` })
  },
  k: {
    name: 'Work and career',
    question: 'Where do you need English at work?',
    sub: "We'll pick words that sound confident and professional.",
    options: [
      ['emails', 'Emails', 'Clear, polite and to the point'],
      ['meetings', 'Meetings', 'Speak up and be understood'],
      ['interviews', 'Job interviews', 'Make a strong first impression']
    ],
    ready: () => ({ title: 'You’re set for work', first: 'Your first work word', lead: 'One work word a day. A few minutes of practice. Sound like a pro.' })
  }
};

export const LEVEL_NAMES = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };

// The short label for a focus choice ("IELTS", "Essays"), or the goal's name when there is none.
export function focusLabel(goal, focus) {
  const flow = GOAL_FLOW[goal] || GOAL_FLOW.e;
  const opt = flow.options.find((o) => o[0] === focus);
  if (!opt) return flow.name;
  if (goal === 'x') return focus === 'other' ? 'exam' : opt[1].split(' ')[0];
  return opt[1];
}
