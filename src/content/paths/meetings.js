// Work and career: Meetings. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. Speaking tasks are timed and self-checked; nothing is recorded.',
  guide: [
    'Start with the introduction, then work through preparing, taking part, presenting, running a meeting and following up.',
    'Practise the phrases aloud: the speaking tasks give you a timer and a checklist.',
    'Write the agenda, minutes and follow-up tasks, then compare with the models.',
    'Finish with the final assessment, then the timed or untimed practice test.',
    'Save phrases for agreeing, disagreeing and interrupting to your notebook.'
  ],
  improve: [
    'Before each real meeting, write one question and one point you want to make.',
    'Practise polite disagreement phrases until they come out naturally.',
    'After a meeting, write three-line minutes for yourself: decisions, actions, deadlines.',
    'Ask a colleague for one piece of feedback on how you spoke.',
    'Volunteer to chair or take minutes once: you learn fastest by doing it.',
    'In online meetings, test your sound and camera five minutes early.'
  ],
  units: [
    {
      title: 'Introduction to meetings',
      lessons: [
        {
          id: 'meeting-intro', title: 'Why meetings matter', minutes: 5, kind: 'intro',
          cards: [
            { title: 'What a meeting is for', body: 'A meeting brings people together to share information, solve a problem or make a decision. If none of these is needed, an email may be better.' },
            { title: 'Where you will use these skills', body: 'Team meetings, school or club committees, client calls, parent-teacher meetings, interviews for promotion and community gatherings.' },
            { title: 'The meeting cycle', body: 'Before: purpose, agenda, preparation. During: opening, discussion, decisions. After: minutes, actions, follow-up. This course teaches each stage.' },
            { title: 'Common mistakes', body: 'Meetings with no purpose, arriving unprepared, side conversations, and leaving without clear decisions or actions.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a good reason to hold a meeting?', options: ['To make a decision that needs discussion', 'To share one short fact that could be emailed', 'Because it is Monday', 'To fill time'], answer: 0, why: 'Meetings are for discussion and decisions.' },
            { type: 'choice', q: 'What should everyone leave a meeting with?', options: ['Clear decisions and actions', 'Nothing', 'A headache', 'A longer agenda'], answer: 0, why: 'Decisions and actions make the meeting worthwhile.' },
            { type: 'order', q: 'Put the meeting cycle in order.', parts: ['Set the purpose and agenda', 'Prepare', 'Hold the discussion', 'Record decisions and actions', 'Follow up'], why: 'Before, during, after.' },
            { type: 'choice', q: 'Which behaviour harms a meeting?', options: ['Side conversations while others speak', 'Asking a clear question', 'Arriving on time', 'Taking notes'], answer: 0, why: 'Side conversations distract everyone.' },
            { type: 'choice', q: 'A colleague wants a meeting just to say the office closes early on Friday. What is better?', options: ['Send an email', 'Hold a one-hour meeting', 'Say nothing', 'Hold two meetings'], answer: 0, why: 'Simple information does not need a meeting.' }
          ]
        }
      ]
    },
    {
      title: 'Before the meeting',
      lessons: [
        {
          id: 'meeting-prepare', title: 'Preparing and the agenda', minutes: 6,
          cards: [
            { title: 'Why meetings fail', body: 'Most meetings that waste time have no clear purpose, no agenda and no decisions at the end. A short agenda sent in advance fixes most of this.' },
            { title: 'A good agenda', body: 'It states the meeting’s purpose, the date, time and place, the people invited, and a short numbered list of items, each with who leads it and how long it takes. It ends with “Any other business” and the date of the next meeting.', examples: [{ text: '1. Sales results for March (Ngozi, 10 min)', good: true }, { text: '1. Stuff', good: false }] },
            { title: 'Prepare yourself', body: 'Read the agenda, gather any figures you need, and write down one point you want to make and one question you want to ask.' },
            { title: 'Common mistakes', body: 'Vague agenda items (“Stuff”), too many items for the time, sending the agenda the same morning, and arriving without the figures you need.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of an agenda in order.', parts: ['Title and purpose of the meeting', 'Date, time and place', 'People invited', 'Numbered items with leads and times', 'Any other business', 'Date of the next meeting'], why: 'This order lets people see why they are meeting and what will be covered.' },
            { type: 'choice', q: 'Which agenda item is the most useful?', options: ['2. Decide the date for the staff training (Musa, 10 min)', '2. Training', '2. Talk about things', '2. Miscellaneous ideas'], answer: 0, why: 'It says what will be decided, who leads it and how long it takes.' },
            { type: 'choice', q: 'When should an agenda be sent?', options: ['Before the meeting, so people can prepare', 'After the meeting', 'Only if someone asks for it', 'Never; meetings should be spontaneous'], answer: 0, why: 'People can only prepare if they see the agenda in advance.' },
            { type: 'write', kind: 'notes', q: 'Write an agenda for a 30-minute team meeting to plan your company’s end-of-year party.', minWords: 50, maxWords: 160, checklist: ['A title and purpose', 'Date, time and place', 'Numbered items with leads and times', 'Any other business'], model: 'End-of-year party planning meeting\n\nPurpose\nTo agree the date, venue and budget for the staff party.\n\nDate and place\nTuesday 2 December, 10:00 to 10:30, Meeting Room B.\n\nItems\n1. Possible dates (Tola, 5 min)\n2. Venue options and costs (Emeka, 10 min)\n3. Budget and contributions (Halima, 10 min)\n4. Any other business (all, 5 min)\n\nNext meeting\nTuesday 9 December, same time.' },
            { type: 'choice', q: 'A 30-minute meeting has twelve agenda items. What is the problem?', options: ['Too many items for the time', 'Too few items', 'Nothing', 'The meeting is too long'], answer: 0, why: 'Each item needs enough time for discussion.' }
          ]
        },
        {
          id: 'meeting-roles', title: 'Roles: chair, minute-taker, participants', minutes: 5,
          cards: [
            { title: 'The chair', body: 'Opens and closes the meeting, follows the agenda, keeps time, invites everyone to speak, and sums up decisions.' },
            { title: 'The minute-taker (secretary)', body: 'Records attendance, key points, decisions and actions, then sends the minutes soon after.' },
            { title: 'Participants', body: 'Read the agenda, prepare, speak to the point, listen, and complete their actions on time.' },
            { title: 'Common mistakes', body: 'The chair doing all the talking, nobody taking notes, and participants who have not read the papers.' }
          ],
          exercises: [
            { type: 'choice', q: 'Who keeps the meeting to time and follows the agenda?', options: ['The chair', 'The minute-taker', 'A visitor', 'Nobody'], answer: 0, why: 'Running the meeting is the chair’s job.' },
            { type: 'choice', q: 'Who records decisions and actions?', options: ['The minute-taker', 'The chair only', 'Every participant on social media', 'No one'], answer: 0, why: 'The minute-taker keeps the record.' },
            { type: 'choice', q: 'What should participants do before a meeting?', options: ['Read the agenda and prepare', 'Nothing', 'Write the minutes', 'Choose the chair’s clothes'], answer: 0, why: 'Preparation makes discussion useful.' },
            { type: 'gap', q: 'As ___, Mrs Bello opened the meeting and welcomed everyone.', options: ['chair', 'chairing', 'chaired', 'chairs'], answer: 0, why: '“As chair” names her role.' },
            { type: 'choice', q: 'Which is a chair’s phrase?', options: ['Let’s move on to item three.', 'Can someone pass the biscuits?', 'I wasn’t listening.', 'I’ll check my phone.'], answer: 0, why: 'The chair moves the meeting through the agenda.' }
          ]
        }
      ]
    },
    {
      title: 'Taking part',
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
            { type: 'speak', q: 'In a meeting, your manager suggests working every Saturday for a month to finish a project. Give your opinion politely, with a reason and an alternative.', points: ['acknowledge the idea', 'give your concern with a reason', 'suggest an alternative', 'end by offering to help'], prep: 30, talk: 60, checklist: ['I acknowledged the idea before disagreeing', 'I gave a reason', 'I suggested an alternative', 'My tone was polite'] },
            { type: 'gap', q: 'I ___ with Ngozi on this point.', options: ['agree', 'am agree', 'agreeing', 'agreed with to'], answer: 0, why: '“I agree with…” (never “I am agree”).' }
          ]
        },
        {
          id: 'meeting-clarify', title: 'Asking questions and clarifying', minutes: 5,
          cards: [
            { title: 'Asking for clarification', body: '“Could you clarify what you mean by…?”, “Sorry, I didn’t catch that. Could you repeat it?”, “Do you mean that…?”' },
            { title: 'Checking understanding', body: 'Paraphrase to confirm: “So, if I understand correctly, we are moving the launch to June?” This prevents costly misunderstandings.', examples: [{ text: 'So, to confirm: I will send the figures by Friday?', good: true }] },
            { title: 'Good questions', body: 'Open questions start discussion (“How could we reduce costs?”). Closed questions get facts (“Is the budget approved?”).' },
            { title: 'Common mistakes', body: 'Staying silent when confused, asking questions that were already answered, and asking in a way that sounds like an attack (“Why would you do that?”).' }
          ],
          exercises: [
            { type: 'choice', q: 'You did not hear a figure. What do you say?', options: ['Sorry, I didn’t catch that. Could you repeat the figure?', 'What?', 'Speak up!', '(Say nothing.)'], answer: 0, why: 'It is polite and specific.' },
            { type: 'choice', q: 'Which sentence checks understanding?', options: ['So, if I understand correctly, the deadline is now 15 March?', 'Okay.', 'Whatever you say.', 'Fine.'], answer: 0, why: 'Paraphrasing confirms the key fact.' },
            { type: 'choice', q: 'Which is an open question?', options: ['How could we attract more customers?', 'Is the room booked?', 'Did you send it?', 'Are you coming?'], answer: 0, why: 'Open questions invite ideas.' },
            { type: 'gap', q: 'Sorry, I didn’t ___ that. Could you say it again?', options: ['catch', 'hold', 'grab', 'keep'], answer: 0, why: '“I didn’t catch that” is a polite way to say you did not hear something.' },
            { type: 'error', q: 'Find the part that sounds like an attack.', parts: ['Thanks for the update.', 'Why on earth would you do that?', 'Could you explain the reason?', 'It would help me understand.'], answer: 1, fix: 'Could you tell us more about the reasons?', why: 'Neutral questions keep the discussion calm.' },
            { type: 'speak', q: 'Your manager explains a new process quickly and you are not sure what your role is. Ask for clarification politely and check your understanding.', points: ['thank them', 'say which part is unclear', 'paraphrase what you think you heard', 'confirm your next step'], prep: 30, talk: 60, checklist: ['I was polite', 'I named the unclear part', 'I paraphrased to check', 'I confirmed my action'] }
          ]
        },
        {
          id: 'meeting-suggest', title: 'Suggestions and turn-taking', minutes: 5,
          cards: [
            { title: 'Making suggestions', body: '“How about…?”, “What if we…?”, “I suggest that we…”, “Could we consider…?” Give a reason and, if possible, a cost or time.', examples: [{ text: 'What if we moved the training online? It would save travel costs.', good: true }] },
            { title: 'Taking your turn', body: 'Wait for a pause, or signal: “Could I come in here?”. Keep your point short, then hand back: “What do others think?”' },
            { title: 'Bringing others in', body: '“Amaka, you haven’t had a chance to speak yet. What do you think?” Good meetings hear from everyone, not only the loudest.' },
            { title: 'Common mistakes', body: 'Talking over people, repeating what others have said, long speeches, and rejecting ideas before they are explained.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a polite suggestion?', options: ['Could we consider starting the meeting at 9:30 instead?', 'We start at 9:30. End of story.', 'Your time is wrong.', 'Do what I say.'], answer: 0, why: 'It is tentative and invites discussion.' },
            { type: 'choice', q: 'How do you signal that you want to speak?', options: ['Could I come in here?', 'Be quiet!', '(Start talking over them.)', 'Me! Me!'], answer: 0, why: 'It politely asks for a turn.' },
            { type: 'choice', q: 'A quiet colleague has not spoken. What can you say?', options: ['Amaka, what do you think about this?', 'Some people never talk.', 'Let’s just decide without her.', 'Nothing.'], answer: 0, why: 'Inviting her in brings in more ideas.' },
            { type: 'gap', q: '___ we use the hall for the event? It is bigger.', options: ['What if', 'Why not if', 'How', 'Unless'], answer: 0, why: '“What if we…?” makes a suggestion.' },
            { type: 'choice', q: 'After making your point, what is a good way to hand over?', options: ['What do others think?', 'That’s final.', 'No questions.', 'I’m done, bye.'], answer: 0, why: 'It invites discussion.' },
            { type: 'speak', q: 'In a meeting about low attendance at a weekly club, make a suggestion with a reason, then invite others to respond.', points: ['state the problem briefly', 'make one suggestion', 'give a reason', 'invite others to comment'], prep: 30, talk: 60, checklist: ['I used a suggestion phrase', 'I gave a reason', 'I kept it short', 'I invited others in'] }
          ]
        }
      ]
    },
    {
      title: 'Presenting and online meetings',
      lessons: [
        {
          id: 'meeting-present', title: 'Short presentations in meetings', minutes: 6,
          cards: [
            { title: 'Signpost your talk', body: 'Tell people what you will cover, cover it, then sum up. “I’d like to talk about three things: the results, the problems and our next steps.”' },
            { title: 'Numbers and visuals', body: 'Give only the numbers that matter, rounded where you can (“about 40%”). Explain what each chart shows before the detail.' },
            { title: 'Handling questions', body: '“That’s a good question.” If you don’t know: “I don’t have that figure now, but I’ll send it to you this afternoon.” Never invent an answer.' },
            { title: 'Common mistakes', body: 'Reading slides word for word, too many numbers, speaking too fast, and inventing an answer to a question you cannot answer.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best opening for a short update?', options: ['I’d like to cover three things: this month’s sales, one problem, and what we plan next.', 'So, um, yeah, sales.', 'I didn’t prepare anything.', 'Let me read all forty slides.'], answer: 0, why: 'It tells the audience what to expect.' },
            { type: 'choice', q: 'Someone asks a question you cannot answer. What should you say?', options: ['I don’t have that figure now, but I’ll send it to you today.', 'Guess a number.', 'That’s not important.', 'Ignore the question.'], answer: 0, why: 'It is honest and promises a follow-up.' },
            { type: 'speak', q: 'Give a one-minute update on a project you know (school, work or community).', points: ['say what you will cover', 'one result', 'one problem', 'the next step'], prep: 45, talk: 60, checklist: ['I signposted my talk at the start', 'I gave one clear result', 'I named a problem honestly', 'I ended with a next step'] },
            { type: 'choice', q: 'What should you do with slides?', options: ['Use few words and talk about them', 'Read every word aloud', 'Fill each slide with text', 'Turn your back to the audience'], answer: 0, why: 'Slides support you; they are not a script.' },
            { type: 'gap', q: 'Let me ___ you through the figures on this slide.', options: ['walk', 'speak', 'tell', 'say'], answer: 0, why: '“Walk someone through” means explain step by step.' }
          ]
        },
        {
          id: 'meeting-online', title: 'Online meeting etiquette', minutes: 5,
          cards: [
            { title: 'Before you join', body: 'Test your microphone and camera, close noisy apps, find a quiet, well-lit place, and join a few minutes early.' },
            { title: 'During the call', body: 'Mute when not speaking, use the raise-hand button or chat to signal, say your name before speaking in large calls, and look at the camera when you talk.' },
            { title: 'Clear language online', body: 'Delays cause people to talk over each other. Pause after questions, and check: “Can everyone hear me?”, “Is my screen showing?”', examples: [{ text: 'Sorry, you cut out. Could you repeat the last point?', good: true }] },
            { title: 'Common mistakes', body: 'Unmuted background noise, eating on camera, multitasking visibly, and sharing the wrong screen with private messages showing.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should you do when you are not speaking in a large call?', options: ['Mute your microphone', 'Turn the volume up', 'Leave and rejoin', 'Talk to someone else in the room'], answer: 0, why: 'Muting avoids background noise.' },
            { type: 'choice', q: 'Someone’s audio cuts out. What do you say?', options: ['Sorry, you cut out. Could you repeat the last point?', 'You are useless with technology.', '(Ignore it.)', 'Speak properly!'], answer: 0, why: 'It is polite and asks for what you missed.' },
            { type: 'choice', q: 'What should you check before sharing your screen?', options: ['That only the right window is showing', 'Your shoes', 'The weather', 'Nothing'], answer: 0, why: 'Private messages could appear.' },
            { type: 'choice', q: 'How can you ask to speak in a large online meeting?', options: ['Use the raise-hand button or the chat', 'Shout', 'Turn your camera on and off', 'Leave the call'], answer: 0, why: 'Raise-hand features organise turns.' },
            { type: 'gap', q: 'Can everyone ___ me clearly?', options: ['hear', 'here', 'heard', 'hearing'], answer: 0, why: '“Hear” is the verb; “here” means this place.' },
            { type: 'order', q: 'Put these online meeting steps in order.', parts: ['Test your microphone and camera', 'Join a few minutes early', 'Mute when not speaking', 'Unmute and speak when it is your turn'], why: 'Prepare, join, listen, then speak.' }
          ]
        }
      ]
    },
    {
      title: 'Running meetings and handling conflict',
      lessons: [
        {
          id: 'meeting-chair', title: 'Opening, chairing and closing', minutes: 6,
          cards: [
            { title: 'Opening', body: 'Welcome people, state the purpose and timing, introduce anyone new and confirm the agenda: “Thank you all for coming. We have 30 minutes to decide the venue and budget.”' },
            { title: 'Keeping control', body: 'Move on politely: “Let’s park that for now and come back to it under any other business.” Bring people back: “To stay on time, could we focus on the budget?”' },
            { title: 'Closing', body: 'Sum up decisions and actions, confirm who does what and by when, and agree the next meeting.', examples: [{ text: 'So, to sum up: Emeka books the venue by Friday, and Halima collects contributions by the 12th.', good: true }] },
            { title: 'Common mistakes', body: 'Starting late for latecomers, letting one person dominate, running over time, and ending without a summary.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a good opening by the chair?', options: ['Thanks for coming. We have 30 minutes to agree the venue and budget.', 'So, um, what are we doing?', 'Let’s wait for everyone, however long it takes.', 'I’ll talk for an hour first.'], answer: 0, why: 'It welcomes and states the purpose and time.' },
            { type: 'choice', q: 'A discussion goes off topic. What does the chair say?', options: ['Let’s park that for now and come back to it at the end.', 'Stop talking!', '(Let it continue for an hour.)', 'This meeting is over.'], answer: 0, why: 'It is polite and keeps the agenda on track.' },
            { type: 'choice', q: 'What should the chair do at the end?', options: ['Sum up decisions and actions', 'Leave without speaking', 'Start a new topic', 'Ask who wants lunch'], answer: 0, why: 'A summary makes sure everyone agrees.' },
            { type: 'gap', q: 'To ___ up, we have agreed on three actions.', options: ['sum', 'some', 'summary', 'summing'], answer: 0, why: '“To sum up” introduces a summary.' },
            { type: 'order', q: 'Put the chair’s jobs in order.', parts: ['Welcome and state the purpose', 'Go through the agenda', 'Sum up decisions and actions', 'Agree the next meeting'], why: 'Open, run, close.' },
            { type: 'speak', q: 'You are chairing a 20-minute meeting to plan a school open day. Open the meeting.', points: ['welcome everyone', 'state the purpose', 'give the time available', 'outline the agenda items'], prep: 30, talk: 45, checklist: ['I welcomed people', 'I stated the purpose', 'I mentioned the time', 'I outlined the agenda'] }
          ]
        },
        {
          id: 'meeting-conflict', title: 'Handling disagreement and conflict', minutes: 6,
          cards: [
            { title: 'Stay calm and curious', body: 'Assume good intentions. Ask questions before arguing: “Can you help me understand your concern?”' },
            { title: 'Focus on the issue', body: 'Separate the person from the problem. Use “I” statements: “I’m concerned that the deadline is too tight” rather than “You always set impossible deadlines.”', examples: [{ text: 'I’m worried we don’t have enough staff for this deadline.', good: true }, { text: 'You never think things through.', good: false }] },
            { title: 'Find common ground', body: '“We both want the project to succeed.” Then explore options: “What if we delivered the first part in May and the rest in June?”' },
            { title: 'Common mistakes', body: 'Raising your voice, personal comments, refusing to listen, and letting a disagreement end with no decision.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence focuses on the issue, not the person?', options: ['I’m concerned that the budget does not cover transport.', 'You are terrible with money.', 'You always mess up budgets.', 'Who made this rubbish budget?'], answer: 0, why: '“I” statements about the issue avoid blame.' },
            { type: 'choice', q: 'Two colleagues disagree strongly. What can the chair say?', options: ['We both want this to succeed. What options could work for everyone?', 'Stop fighting or leave.', 'Let them shout it out.', 'I agree with whoever is louder.'], answer: 0, why: 'Common ground leads to solutions.' },
            { type: 'gap', q: 'Can you help me ___ your concern?', options: ['understand', 'understanding', 'understood', 'understands'], answer: 0, why: 'After “help me”, use the base form.' },
            { type: 'error', q: 'Find the part that will make conflict worse.', parts: ['I see your point.', 'However, the deadline is tight.', 'You obviously never plan anything.', 'Could we add one more week?'], answer: 2, fix: 'I think we need more planning time.', why: 'Personal criticism escalates conflict.' },
            { type: 'choice', q: 'What should a disagreement end with?', options: ['A decision or a clear next step', 'Silence', 'Someone storming out', 'No conclusion'], answer: 0, why: 'Meetings should resolve issues or agree how to.' },
            { type: 'speak', q: 'A colleague says your idea will never work. Respond calmly, find common ground and suggest a way forward.', points: ['acknowledge their concern', 'ask what worries them', 'state the shared goal', 'propose a test or compromise'], prep: 30, talk: 60, checklist: ['I stayed calm', 'I acknowledged their view', 'I named common ground', 'I proposed a next step'] }
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
            { title: 'Language', body: 'Use the past tense and neutral, reported language: “The team agreed…”, “Halima suggested…”, “It was decided that…”.' },
            { title: 'Common mistakes', body: 'Writing every word said, actions without names or deadlines, and sending the minutes days later.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a well-written action point?', options: ['Halima to circulate the budget by Wednesday.', 'Budget stuff.', 'People should think about money.', 'We talked about the budget for a long time.'], answer: 0, why: 'It names a person, an action and a deadline.' },
            { type: 'choice', q: 'Which tense do minutes usually use?', options: ['Past tense', 'Future tense', 'Present continuous', 'Imperative'], answer: 0, why: 'Minutes report what happened, so they use the past tense.' },
            { type: 'write', kind: 'notes', q: 'Write minutes for this meeting: the team met on Tuesday to plan the staff party. They chose Friday 19 December. Emeka will book the venue by Friday. Halima will collect contributions by 12 December.', minWords: 50, maxWords: 160, checklist: ['Title, date and attendees', 'Decisions', 'Actions with names and deadlines', 'Past tense'], model: 'Minutes: end-of-year party planning\n\nDate\nTuesday 2 December\n\nAttendees\nTola, Emeka, Halima, Musa\n\nDecisions\nThe team agreed to hold the party on Friday 19 December, after work, so that everyone can attend.\n\nActions\nEmeka to book the venue by Friday 5 December.\nHalima to collect contributions by Friday 12 December.\n\nNext meeting\nTuesday 9 December.' },
            { type: 'gap', q: 'It was ___ that the party would be held on 19 December.', options: ['decided', 'decide', 'deciding', 'decision'], answer: 0, why: 'Minutes use reported, passive language: “It was decided that…”.' },
            { type: 'choice', q: 'What do minutes NOT need?', options: ['Every word anyone said', 'Decisions', 'Actions', 'Attendees'], answer: 0, why: 'Minutes are a summary, not a transcript.' }
          ]
        },
        {
          id: 'meeting-followup', title: 'The follow-up email', minutes: 5,
          cards: [
            { title: 'Why follow up', body: 'People forget. A short email within a day confirms decisions and actions, and gives a record everyone can find.' },
            { title: 'What to include', body: 'Thanks, a summary of decisions, actions with names and deadlines, attachments (minutes, slides) and the next meeting date.', examples: [{ text: 'Actions: Emeka to book the venue by Friday 5 December.', good: true }] },
            { title: 'Real-life use', body: 'Managers, project leaders and client managers send follow-ups after nearly every important meeting. Doing it yourself makes you look organised and reliable.' },
            { title: 'Common mistakes', body: 'Sending it a week later, forgetting deadlines, writing a long story of the meeting, and leaving out people who were absent.' }
          ],
          exercises: [
            { type: 'choice', q: 'When should you send a follow-up email?', options: ['Within a day of the meeting', 'A month later', 'Before the meeting', 'Never'], answer: 0, why: 'While it is fresh in everyone’s mind.' },
            { type: 'choice', q: 'Which is a well-written action?', options: ['Halima to send the budget by Wednesday 3 December.', 'Someone will look at money.', 'Budget stuff.', 'We talked about the budget.'], answer: 0, why: 'Name, action and deadline.' },
            { type: 'choice', q: 'Who should receive the follow-up?', options: ['Everyone invited, including those who were absent', 'Only the chair', 'Nobody', 'Only people who spoke'], answer: 0, why: 'Absent people need to know the decisions.' },
            { type: 'gap', q: 'Thank you all for ___ today’s meeting.', options: ['attending', 'attend', 'attended', 'attendance'], answer: 0, why: 'After “for”, use the -ing form.' },
            { type: 'choice', q: 'What should a follow-up avoid?', options: ['A long story of everything said', 'A list of decisions', 'Actions with deadlines', 'The next meeting date'], answer: 0, why: 'Keep it short and useful.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a follow-up email after a meeting where the team agreed to hold the staff party on 19 December. Emeka will book the venue by 5 December; Halima will collect contributions by 12 December.', minWords: 50, maxWords: 150, checklist: ['Subject line', 'Thanks', 'Decisions', 'Actions with names and deadlines', 'Next meeting'], model: 'Subject: Party planning: decisions and actions\n\nHi everyone,\n\nThank you for attending today’s planning meeting. Here is a summary.\n\nDecision: the staff party will be held on Friday 19 December, after work.\n\nActions:\nEmeka to book the venue by Friday 5 December.\nHalima to collect contributions by Friday 12 December.\n\nOur next meeting is on Tuesday 9 December at 10am.\n\nBest regards,\nTola' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'meeting-final', title: 'Final assessment: Meetings', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '13 questions from the whole course: preparation, roles, speaking up, questions, suggestions, presenting, online etiquette, chairing, conflict and follow-up. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should an agenda item include?', options: ['What will be discussed, who leads it and how long it takes', 'Only a single word', 'The minutes of the meeting', 'A joke'], answer: 0, why: 'Specific items help people prepare.' },
            { type: 'choice', q: 'Who records decisions and actions?', options: ['The minute-taker', 'The chair only', 'No one', 'A visitor'], answer: 0, why: 'That is the minute-taker’s role.' },
            { type: 'choice', q: 'Which is the most polite way to disagree?', options: ['I see your point, but I’m worried about the cost.', 'That’s nonsense.', 'No.', 'You’re wrong.'], answer: 0, why: 'Acknowledge, then give a reason.' },
            { type: 'choice', q: 'You did not hear something. What do you say?', options: ['Sorry, I didn’t catch that. Could you repeat it?', 'What?', 'Huh?', '(Nothing.)'], answer: 0, why: 'Polite and clear.' },
            { type: 'gap', q: '___ we hold the training online? It would save travel time.', options: ['What if', 'Unless', 'Although', 'So'], answer: 0, why: '“What if we…?” makes a suggestion.' },
            { type: 'choice', q: 'How should a short presentation start?', options: ['By saying what you will cover', 'With an apology for being unprepared', 'With slide 40', 'With silence'], answer: 0, why: 'Signposting helps the audience follow.' },
            { type: 'choice', q: 'What should you do when not speaking in an online meeting?', options: ['Mute', 'Eat loudly', 'Share your screen', 'Leave'], answer: 0, why: 'Muting avoids noise.' },
            { type: 'choice', q: 'A discussion goes off topic. What does the chair say?', options: ['Let’s park that and come back to it at the end.', 'Be quiet!', 'Let’s end the meeting.', '(Nothing.)'], answer: 0, why: 'It keeps the agenda on track.' },
            { type: 'choice', q: 'Which sentence focuses on the issue?', options: ['I’m concerned the deadline is too tight.', 'You never plan properly.', 'You always fail.', 'Who did this?'], answer: 0, why: '“I” statements avoid blame.' },
            { type: 'choice', q: 'Which tense do minutes use?', options: ['Past tense', 'Future tense', 'Imperative', 'Present continuous'], answer: 0, why: 'Minutes report what happened.' },
            { type: 'choice', q: 'Which is a well-written action point?', options: ['Musa to circulate the report by Friday.', 'Report stuff.', 'Someone should do something.', 'We talked a lot.'], answer: 0, why: 'Name, action and deadline.' },
            { type: 'choice', q: 'When should you send the follow-up email?', options: ['Within a day', 'Next month', 'Never', 'Before the meeting'], answer: 0, why: 'While it is fresh.' },
            { type: 'order', q: 'Put the chair’s closing steps in order.', parts: ['Sum up decisions', 'Confirm actions and deadlines', 'Agree the next meeting', 'Thank everyone'], why: 'Summarise, confirm, plan, thank.' }
          ]
        }
      ]
    }
  ]
};
