// Work and career: Meetings. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. Speaking tasks are timed and self-checked; nothing is recorded.',
  guide: ['Start with preparing for a meeting, then taking part, then running one.', 'Practise the phrases aloud: the speaking tasks give you a timer and a checklist.', 'Write the agenda and minutes tasks, then compare with the models.', 'Save phrases for agreeing, disagreeing and interrupting to your notebook.'],
  improve: ['Before each real meeting, write one question and one point you want to make.', 'Practise polite disagreement phrases until they come out naturally.', 'After a meeting, write three-line minutes for yourself: decisions, actions, deadlines.', 'Ask a colleague for one piece of feedback on how you spoke.'],
  units: [
    {
      title: 'Before the meeting',
      lessons: [
        {
          id: 'meeting-prepare', title: 'Preparing and the agenda', minutes: 6,
          cards: [
            { title: 'Why meetings fail', body: 'Most meetings that waste time have no clear purpose, no agenda and no decisions at the end. A short agenda sent in advance fixes most of this.' },
            { title: 'A good agenda', body: 'It states the meeting’s purpose, the date, time and place, the people invited, and a short numbered list of items, each with who leads it and how long it takes. It ends with “Any other business” and the date of the next meeting.', examples: [{ text: '1. Sales results for March (Ngozi, 10 min)', good: true }, { text: '1. Stuff', good: false }] },
            { title: 'Prepare yourself', body: 'Read the agenda, gather any figures you need, and write down one point you want to make and one question you want to ask.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of an agenda in order.', parts: ['Title and purpose of the meeting', 'Date, time and place', 'People invited', 'Numbered items with leads and times', 'Any other business', 'Date of the next meeting'], why: 'This order lets people see why they are meeting and what will be covered.' },
            { type: 'choice', q: 'Which agenda item is the most useful?', options: ['2. Decide the date for the staff training (Musa, 10 min)', '2. Training', '2. Talk about things', '2. Miscellaneous ideas'], answer: 0, why: 'It says what will be decided, who leads it and how long it takes.' },
            { type: 'choice', q: 'When should an agenda be sent?', options: ['Before the meeting, so people can prepare', 'After the meeting', 'Only if someone asks for it', 'Never; meetings should be spontaneous'], answer: 0, why: 'People can only prepare if they see the agenda in advance.' },
            { type: 'write', kind: 'notes', q: 'Write an agenda for a 30-minute team meeting to plan your company’s end-of-year party.', minWords: 50, maxWords: 160, checklist: ['A title and purpose', 'Date, time and place', 'Numbered items with leads and times', 'Any other business'], model: 'End-of-year party planning meeting\n\nPurpose\nTo agree the date, venue and budget for the staff party.\n\nDate and place\nTuesday 2 December, 10:00 to 10:30, Meeting Room B.\n\nItems\n1. Possible dates (Tola, 5 min)\n2. Venue options and costs (Emeka, 10 min)\n3. Budget and contributions (Halima, 10 min)\n4. Any other business (all, 5 min)\n\nNext meeting\nTuesday 9 December, same time.' }
          ]
        }
      ]
    },
    {
      title: 'During the meeting',
      lessons: [
        {
          id: 'meeting-speak', title: 'Giving opinions, agreeing and disagreeing', minutes: 6,
          cards: [
            { title: 'Giving an opinion', body: '“In my view,…”, “I think we should…”, “From my experience,…”. Give a reason and, if you can, an example.' },
            { title: 'Agreeing and disagreeing politely', body: 'Agree: “I agree with Ngozi on this.”, “That’s a good point.” Disagree politely: “I see your point, but…”, “I’m not sure that will work, because…”. Disagree with the idea, never with the person.', examples: [{ text: 'I see your point, but the deadline is very tight.', good: true }, { text: 'That’s a stupid idea.', good: false }] },
            { title: 'Interrupting and asking', body: '“Sorry to interrupt, but…”, “Could I just add something?”, “Could you clarify what you mean by…?”' },
            { title: 'Common mistakes', body: 'Staying silent all meeting, speaking without a point, interrupting rudely, and disagreeing in a way that sounds personal.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the most polite way to disagree?', options: ['I see your point, but I’m worried about the cost.', 'No, that’s wrong.', 'You don’t understand.', 'Whatever.'], answer: 0, why: 'It acknowledges the other view, then gives a reason.' },
            { type: 'choice', q: 'You need to add something while someone is speaking. What do you say?', options: ['Sorry to interrupt, but could I just add something?', 'Stop talking.', 'Me now!', '(Start talking louder.)'], answer: 0, why: 'It is polite and asks permission.' },
            { type: 'gap', q: 'Could you ___ what you mean by “soft launch”?', options: ['clarify', 'clearify', 'clear', 'clearance'], answer: 0, why: '“Could you clarify…?” asks for an explanation politely.' },
            { type: 'speak', q: 'In a meeting, your manager suggests working every Saturday for a month to finish a project. Give your opinion politely, with a reason and an alternative.', points: ['acknowledge the idea', 'give your concern with a reason', 'suggest an alternative', 'end by offering to help'], prep: 30, talk: 60, checklist: ['I acknowledged the idea before disagreeing', 'I gave a reason', 'I suggested an alternative', 'My tone was polite'] }
          ]
        },
        {
          id: 'meeting-present', title: 'Short presentations in meetings', minutes: 6,
          cards: [
            { title: 'Signpost your talk', body: 'Tell people what you will cover, cover it, then sum up. “I’d like to talk about three things: the results, the problems and our next steps.”' },
            { title: 'Numbers and visuals', body: 'Give only the numbers that matter, rounded where you can (“about 40%”). Explain what each chart shows before the detail.' },
            { title: 'Handling questions', body: '“That’s a good question.” If you don’t know: “I don’t have that figure now, but I’ll send it to you this afternoon.” Never invent an answer.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best opening for a short update?', options: ['I’d like to cover three things: this month’s sales, one problem, and what we plan next.', 'So, um, yeah, sales.', 'I didn’t prepare anything.', 'Let me read all forty slides.'], answer: 0, why: 'It tells the audience what to expect.' },
            { type: 'choice', q: 'Someone asks a question you cannot answer. What should you say?', options: ['I don’t have that figure now, but I’ll send it to you today.', 'Guess a number.', 'That’s not important.', 'Ignore the question.'], answer: 0, why: 'It is honest and promises a follow-up.' },
            { type: 'speak', q: 'Give a one-minute update on a project you know (school, work or community).', points: ['say what you will cover', 'one result', 'one problem', 'the next step'], prep: 45, talk: 60, checklist: ['I signposted my talk at the start', 'I gave one clear result', 'I named a problem honestly', 'I ended with a next step'] }
          ]
        }
      ]
    },
    {
      title: 'After the meeting',
      lessons: [
        {
          id: 'meeting-minutes', title: 'Taking minutes', minutes: 6,
          cards: [
            { title: 'What minutes record', body: 'Minutes are a short record of a meeting: who attended, what was decided, who will do what, and by when. They do not record every word.' },
            { title: 'A clear format', body: 'Title, date and attendees, then one section per agenda item with the key points, decisions and actions. Actions name a person and a deadline.', examples: [{ text: 'Action: Emeka to send three venue quotes by Friday 5 December.', good: true }, { text: 'Someone will look at venues.', good: false }] },
            { title: 'Language', body: 'Use the past tense and neutral, reported language: “The team agreed…”, “Halima suggested…”, “It was decided that…”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a well-written action point?', options: ['Halima to circulate the budget by Wednesday.', 'Budget stuff.', 'People should think about money.', 'We talked about the budget for a long time.'], answer: 0, why: 'It names a person, an action and a deadline.' },
            { type: 'choice', q: 'Which tense do minutes usually use?', options: ['Past tense', 'Future tense', 'Present continuous', 'Imperative'], answer: 0, why: 'Minutes report what happened, so they use the past tense.' },
            { type: 'write', kind: 'notes', q: 'Write minutes for this meeting: the team met on Tuesday to plan the staff party. They chose Friday 19 December. Emeka will book the venue by Friday. Halima will collect contributions by 12 December.', minWords: 50, maxWords: 160, checklist: ['Title, date and attendees', 'Decisions', 'Actions with names and deadlines', 'Past tense'], model: 'Minutes: end-of-year party planning\n\nDate\nTuesday 2 December\n\nAttendees\nTola, Emeka, Halima, Musa\n\nDecisions\nThe team agreed to hold the party on Friday 19 December, after work, so that everyone can attend.\n\nActions\nEmeka to book the venue by Friday 5 December.\nHalima to collect contributions by Friday 12 December.\n\nNext meeting\nTuesday 9 December.' }
          ]
        }
      ]
    }
  ]
};
