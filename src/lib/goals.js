// What each onboarding goal asks next, and how later screens talk about it. Keyed by the goal
// codes in profile.js (e everyday, x exam, w writing, k work). All the copy lives here.
import { hash } from './hash.js';

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
    levelTitle: () => 'Which word feels just right?',
    ready: (f) => ({ title: 'Your universe is ready', first: 'Your first word', lead: `One new word a day for ${f.toLowerCase()}. A few minutes of practice. Watch your world grow.` })
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
    levelTitle: (f) => `Which word would you want in your ${f} answer?`,
    ready: (f) => ({ title: `Your ${f} universe is ready`, first: `Your first ${f} word`, lead: 'One exam word a day. A few minutes of practice. Walk in ready.' })
  },
  w: {
    name: 'Better writing',
    question: 'What do you write most?',
    sub: "We'll choose words that make your writing shine.",
    options: [
      ['essays', 'Essays', 'School and university'],
      ['reports', 'Reports', 'Clear, precise and professional'],
      ['stories', 'Stories', 'Vivid, creative writing'],
      ['posts', 'Posts and messages', 'Social media, blogs and chats']
    ],
    levelTitle: (f) => `Which word would you love to use in your ${f.toLowerCase()}?`,
    ready: (f) => ({ title: 'Your writing universe is ready', first: 'Your first writing word', lead: `One word a day for your ${f.toLowerCase()}. A few minutes of practice. Watch your writing grow.` })
  },
  k: {
    name: 'Work and career',
    question: 'Where do you need English at work?',
    sub: "We'll pick words that sound confident and professional.",
    options: [
      ['emails', 'Emails', 'Clear, polite and to the point'],
      ['meetings', 'Meetings', 'Speak up and be understood'],
      ['interviews', 'Job interviews', 'Make a strong first impression'],
      ['presentations', 'Presentations', 'Explain ideas with confidence']
    ],
    levelTitle: (f) => `Which word would you use in your ${f.toLowerCase()}?`,
    ready: () => ({ title: 'Your career universe is ready', first: 'Your first work word', lead: 'One work word a day. A few minutes of practice. Sound like a pro.' })
  }
};

export const LEVEL_NAMES = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
const LEVEL_HINTS = { 1: 'everyday words I can use right away', 2: 'words that make me sound natural', 3: 'rich, precise, impressive words' };

// The short label for a focus choice ("IELTS", "Essays"), or the goal's name when there is none.
export function focusLabel(goal, focus) {
  const flow = GOAL_FLOW[goal] || GOAL_FLOW.e;
  const opt = flow.options.find((o) => o[0] === focus);
  if (!opt) return flow.name;
  if (goal === 'x') return focus === 'other' ? 'exam' : opt[1].split(' ')[0];
  return opt[1];
}

// One sample word per level for the level question, picked from the goal's own words.
export function levelSamples(words, goal, seed = 'lvl') {
  return [1, 2, 3].map((l) => {
    const tagged = words.filter((w) => w.l === l && w.goals.includes(goal));
    const pool = tagged.length ? tagged : words.filter((w) => w.l === l);
    const pick = [...pool].sort((a, b) => hash(seed + goal + a.w) - hash(seed + goal + b.w))[0];
    return { level: l, word: pick?.w || LEVEL_NAMES[l], hint: `${LEVEL_NAMES[l]} · ${LEVEL_HINTS[l]}` };
  });
}
