// Exam preparation: TOEFL iBT. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse in TOEFL style. They are not official ETS questions. The test changed in January 2026, so check the official ETS guide for your test date.',
  guide: [
    'Start with the test at a glance, then work through Reading, Listening, Writing and Speaking in the order the test uses.',
    'Listening tasks are read aloud by your device. Speaking tasks have timers and a checklist; nothing is recorded.',
    'Every writing task has a model answer that passes the automatic checks. Write yours before you look.',
    'Finish with academic vocabulary and test strategy, then the final assessment and the timed practice test.',
    'Use the official ETS practice materials as well: they show the exact screens and timing.'
  ],
  improve: [
    'Read one short academic article a day and write its main idea in one sentence.',
    'Listen to university lectures or podcasts and note the main point and two details.',
    'Practise typing: the Writing section is done on a keyboard against the clock.',
    'Record yourself answering interview questions for 45 seconds and listen for long pauses.',
    'Learn academic word families (analyse, analysis, analytical) rather than single words.',
    'Take one full timed practice test from ETS before the real exam.'
  ],
  units: [
    {
      title: 'The test at a glance',
      lessons: [
        {
          id: 'toefl-intro', title: 'The TOEFL iBT, section by section', minutes: 6, kind: 'intro',
          cards: [
            { title: 'Four sections', body: 'Reading (about 30 minutes), Listening (about 29 minutes), Writing (about 23 minutes) and Speaking (about 8 minutes). ETS advises allowing about two hours in total, including directions. There are no scheduled breaks.' },
            { title: 'An adaptive test', body: 'The test adapts to how you are doing, so the exact number of items and the time can vary. You can take it at a test centre or at home (the Home Edition) with a live proctor.' },
            { title: 'Scores', body: 'Each section gets a score on a 1 to 6 scale, and the overall score is the average of the four, rounded to the nearest half band. For two years after January 2026, you also receive a comparable score on the old 0 to 120 scale.' },
            { title: 'Common mistakes', body: 'Preparing with old-format materials, skipping a section (if you do not answer at least one item in every section, the test is not scored), and practising only reading.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which section is the shortest?', options: ['Speaking', 'Reading', 'Listening', 'Writing'], answer: 0, why: 'Speaking takes about 8 minutes, the shortest of the four.' },
            { type: 'choice', q: 'What scale is used for section scores from 2026?', options: ['1 to 6', '0 to 9', '200 to 800', '0 to 30'], answer: 0, why: 'Each section and the overall score use the 1 to 6 scale.' },
            { type: 'choice', q: 'How is the overall score worked out?', options: ['The average of the four sections, rounded to the nearest half band', 'The highest section score', 'The sum of the four sections', 'The Reading score only'], answer: 0, why: 'ETS averages the four section scores.' },
            { type: 'choice', q: 'What happens if you skip a whole section?', options: ['The test is not scored', 'You lose a quarter of your marks', 'Nothing', 'That section counts as 1'], answer: 0, why: 'You must answer at least one item in each section for any score.' },
            { type: 'choice', q: 'Are there scheduled breaks?', options: ['No', 'Yes, one ten-minute break', 'Yes, between every section', 'Only at the test centre'], answer: 0, why: 'There are no scheduled breaks, so plan for about two hours.' },
            { type: 'order', q: 'Put the sections in the order listed by ETS.', parts: ['Reading', 'Listening', 'Writing', 'Speaking'], why: 'ETS lists the sections as Reading, Listening, Writing and Speaking.' }
          ]
        }
      ]
    },
    {
      title: 'Reading',
      lessons: [
        {
          id: 'toefl-words', title: 'Complete the Words', minutes: 6,
          cards: [
            { title: 'The task', body: 'You read a short academic paragraph in which some words are incomplete, and you fill in the missing letters. It tests vocabulary, spelling and how well you follow the meaning and grammar of the text.' },
            { title: 'Use grammar and meaning', body: 'Ask what kind of word fits: a noun, verb or adjective? Singular or plural? Past or present? Then think of the word that completes both the letters and the sense.', examples: [{ text: 'Plants pro___ oxygen. Answer: produce (a present-tense verb that fits “plants”).', good: true }] },
            { title: 'Spelling matters', body: 'Common endings help: -tion, -ment, -ive, -ous, -ly, -ed. Practise words you often misspell, such as environment, necessary and government.' },
            { title: 'Common mistakes', body: 'Choosing a word that fits the letters but not the meaning, ignoring grammar (writing “produces” after “plants”), and spending too long on one word.' }
          ],
          exercises: [
            { type: 'gap', q: 'Bees play an important ro___ in pollinating crops.', options: ['le (role)', 'ad (road)', 'om (room)', 'ot (root)'], answer: 0, why: '“Play a role” fits both the letters and the meaning.' },
            { type: 'gap', q: 'The results of the experiment were publ___ in a science journal.', options: ['ished (published)', 'ic (public)', 'isher (publisher)', 'ishing (publishing)'], answer: 0, why: 'After “were”, the passive needs the past participle “published”.' },
            { type: 'gap', q: 'Rainforests are home to a wide vari___ of animals.', options: ['ety (variety)', 'ous (various)', 'able (variable)', 'ed (varied)'], answer: 0, why: '“A wide variety of” needs the noun “variety”.' },
            { type: 'gap', q: 'Many scientists beli___ that the climate is changing faster than before.', options: ['eve (believe)', 'ef (belief)', 'eves (believes)', 'eving (believing)'], answer: 0, why: '“Scientists” is plural, so the verb is “believe”.' },
            { type: 'choice', q: 'Which question helps most with an incomplete word?', options: ['What part of speech fits here?', 'How long is the passage?', 'Who wrote the text?', 'What colour is the screen?'], answer: 0, why: 'Grammar narrows down the word quickly.' },
            { type: 'error', q: 'Find the misspelled word.', parts: ['The government', 'announced', 'a new enviroment', 'policy.'], answer: 2, fix: 'environment', why: 'Environment has an “n” before the “m”.' }
          ]
        },
        {
          id: 'toefl-daily', title: 'Read in Daily Life', minutes: 6,
          cards: [
            { title: 'The task', body: 'Short everyday texts: notices, emails, adverts, schedules or messages, often from campus life. Questions ask about the purpose, key details and what someone should do.' },
            { title: 'Read for purpose and action', body: 'Ask: who wrote it, to whom, and why? What changes, when, and what must the reader do? These are the usual questions.', examples: [{ text: 'Purpose: to announce shorter library hours. Action: book study rooms online or use the 24-hour lab.', good: true }] },
            { title: 'Real-life use', body: 'Reading notices and emails quickly is a daily skill at university and work: deadlines, room changes and requirements often arrive this way.' },
            { title: 'Common mistakes', body: 'Missing a date or condition, choosing an answer that repeats words but changes the meaning, and reading every word slowly instead of looking for the key facts.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the main purpose of the notice?', options: ['To announce shorter library hours during repairs', 'To close the library permanently', 'To advertise the computer lab', 'To ask students to repair the heating'], answer: 0, why: 'The notice explains that the library will close earlier while the heating is repaired.', passage: 'Campus Library Notice: From Monday 3 March, the library will close at 9 p.m. instead of 11 p.m. on weekdays while the heating system is repaired. Study rooms can still be booked online. The 24-hour computer lab in the Science Building is not affected.' },
            { type: 'choice', q: 'When will the library close on weekdays from 3 March?', options: ['At 9 p.m.', 'At 11 p.m.', 'At midnight', 'At 3 p.m.'], answer: 0, why: '“The library will close at 9 p.m. instead of 11 p.m.”', passage: 'Campus Library Notice: From Monday 3 March, the library will close at 9 p.m. instead of 11 p.m. on weekdays while the heating system is repaired. Study rooms can still be booked online. The 24-hour computer lab in the Science Building is not affected.' },
            { type: 'choice', q: 'Why is the change being made?', options: ['The heating system is being repaired', 'Fewer students use the library', 'The computer lab is closing', 'Staff are on holiday'], answer: 0, why: 'The notice says the change is “while the heating system is repaired”.', passage: 'Campus Library Notice: From Monday 3 March, the library will close at 9 p.m. instead of 11 p.m. on weekdays while the heating system is repaired. Study rooms can still be booked online. The 24-hour computer lab in the Science Building is not affected.' },
            { type: 'choice', q: 'A student needs to study at midnight. What can they do?', options: ['Use the 24-hour computer lab in the Science Building', 'Book a library study room for midnight', 'Stay in the library after closing', 'Nothing until the repairs end'], answer: 0, why: 'The lab “is not affected”, so it stays open 24 hours.', passage: 'Campus Library Notice: From Monday 3 March, the library will close at 9 p.m. instead of 11 p.m. on weekdays while the heating system is repaired. Study rooms can still be booked online. The 24-hour computer lab in the Science Building is not affected.' },
            { type: 'choice', q: 'What should you look for first in an everyday notice?', options: ['Who it is for and what it asks them to do', 'The font', 'Every adjective', 'The longest sentence'], answer: 0, why: 'Purpose and action are the most common questions.' }
          ]
        },
        {
          id: 'toefl-academic', title: 'Read an Academic Passage', minutes: 7,
          cards: [
            { title: 'The task', body: 'A short academic text on a subject such as biology, history or economics, followed by questions on the main idea, details, vocabulary in context and inferences.' },
            { title: 'Main idea and details', body: 'Read the first and last sentences for the main idea. For detail questions, find the exact sentence and check each option against it. Wrong options often use words from the text but change the meaning.' },
            { title: 'Vocabulary in context', body: 'Questions ask what a word means in this passage. Replace the word with each option and see which keeps the sentence’s meaning.', examples: [{ text: '“Polyps expel the algae”: expel most nearly means “force out”.', good: true }] },
            { title: 'Common mistakes', body: 'Using outside knowledge, choosing an option that is true in general but not stated, and missing words such as “not”, “only” and “immediately”.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the passage mainly about?', options: ['How coral reefs support marine life and how warm water can harm them', 'How to build a coral reef', 'Why algae are dangerous', 'The history of ocean exploration'], answer: 0, why: 'It covers the importance of reefs and the effects of bleaching.', passage: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all known marine species. Reefs are built by tiny animals called polyps, which take calcium from seawater to form hard skeletons. When water temperatures rise for long periods, polyps expel the algae that live inside them and give them colour and food. This process, known as bleaching, does not kill the coral immediately, but if the water stays warm, the coral may starve.' },
            { type: 'choice', q: 'According to the passage, what do polyps use to form their skeletons?', options: ['Calcium from seawater', 'Algae', 'Sand', 'Plants on the ocean floor'], answer: 0, why: '“Polyps … take calcium from seawater to form hard skeletons.”', passage: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all known marine species. Reefs are built by tiny animals called polyps, which take calcium from seawater to form hard skeletons. When water temperatures rise for long periods, polyps expel the algae that live inside them and give them colour and food. This process, known as bleaching, does not kill the coral immediately, but if the water stays warm, the coral may starve.' },
            { type: 'choice', q: 'The word “expel” in the passage is closest in meaning to', options: ['force out', 'feed', 'protect', 'attract'], answer: 0, why: 'During bleaching, the polyps push the algae out.', passage: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all known marine species. Reefs are built by tiny animals called polyps, which take calcium from seawater to form hard skeletons. When water temperatures rise for long periods, polyps expel the algae that live inside them and give them colour and food. This process, known as bleaching, does not kill the coral immediately, but if the water stays warm, the coral may starve.' },
            { type: 'choice', q: 'What can be inferred about bleached coral?', options: ['It may recover if the water cools in time', 'It always dies at once', 'It produces more colour', 'It grows faster'], answer: 0, why: 'Bleaching “does not kill the coral immediately”; it may starve only “if the water stays warm”.', passage: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all known marine species. Reefs are built by tiny animals called polyps, which take calcium from seawater to form hard skeletons. When water temperatures rise for long periods, polyps expel the algae that live inside them and give them colour and food. This process, known as bleaching, does not kill the coral immediately, but if the water stays warm, the coral may starve.' },
            { type: 'choice', q: 'Which statement is NOT supported by the passage?', options: ['Coral reefs cover a quarter of the ocean floor.', 'Reefs support about a quarter of known marine species.', 'Algae give coral colour and food.', 'Long periods of warm water cause bleaching.'], answer: 0, why: 'Reefs cover less than one percent of the ocean floor; a quarter refers to species.', passage: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all known marine species. Reefs are built by tiny animals called polyps, which take calcium from seawater to form hard skeletons. When water temperatures rise for long periods, polyps expel the algae that live inside them and give them colour and food. This process, known as bleaching, does not kill the coral immediately, but if the water stays warm, the coral may starve.' }
          ]
        }
      ]
    },
    {
      title: 'Listening',
      lessons: [
        {
          id: 'toefl-response', title: 'Listen and Choose a Response', minutes: 6,
          cards: [
            { title: 'The task', body: 'You hear one short sentence or question, then choose the most natural reply. It tests everyday spoken English and how people really answer.' },
            { title: 'Listen for the function', body: 'Is it a question, a request, an offer, a complaint or news? The right reply matches the function, not just the topic.', examples: [{ text: '“Could you help me move these chairs?” “Sure, where do you want them?”', good: true }, { text: '“Could you help me move these chairs?” “Chairs are made of wood.”', good: false }] },
            { title: 'Indirect answers', body: 'Natural replies are often indirect. “Are you coming to the seminar?” “I have a dentist appointment at three.” means “probably not”.' },
            { title: 'Common mistakes', body: 'Choosing a reply that repeats a word you heard, missing the tense (asking about the past, answering about the future), and not noticing a question word such as “where” or “when”.' }
          ],
          exercises: [
            { type: 'listen', script: 'Do you know where the history department is?', q: 'Choose the best response.', options: ['It’s on the second floor of the Arts Building.', 'History is my favourite subject.', 'Yes, I know history well.', 'It was built in 1990.'], answer: 0, why: 'The question asks “where”, so the reply gives a location.' },
            { type: 'listen', script: 'Would you like me to save you a seat?', q: 'Choose the best response.', options: ['That would be great, thanks.', 'The seats are blue.', 'I saved some money.', 'Yes, I sat there yesterday.'], answer: 0, why: 'It is an offer; the natural reply accepts or declines it.' },
            { type: 'listen', script: 'I can’t believe the exam has been moved to Friday.', q: 'Choose the best response.', options: ['I know, now we have two more days to revise.', 'Friday is a day of the week.', 'The exam was hard.', 'I moved house last year.'], answer: 0, why: 'The reply reacts to the news.' },
            { type: 'listen', script: 'When is the essay due?', q: 'Choose the best response.', options: ['Next Tuesday, before class.', 'About climate change.', 'In the library.', 'Professor Adeyemi.'], answer: 0, why: '“When” asks for a time.' },
            { type: 'listen', script: 'Are you joining us for lunch?', q: 'Which reply means “no”?', options: ['I have to finish my lab report first.', 'Sure, I’m starving.', 'Yes, let’s go.', 'Lunch sounds perfect.'], answer: 0, why: 'An indirect excuse means the speaker cannot come.' },
            { type: 'choice', q: 'What should you notice first in the sentence you hear?', options: ['Its function: question, offer, request or news', 'The speaker’s accent', 'The longest word', 'The number of syllables'], answer: 0, why: 'The function decides which reply is natural.' }
          ]
        },
        {
          id: 'toefl-conversation', title: 'Conversations and announcements', minutes: 7,
          cards: [
            { title: 'Conversations', body: 'Two people talk, often a student and a classmate, librarian or professor, about a problem or plan. Questions ask about the main topic, the problem, the solution and what someone will do next.' },
            { title: 'Announcements', body: 'One speaker gives information to a group: a change of plan, an event or instructions. Listen for what, when, where and what listeners must do.' },
            { title: 'Take short notes', body: 'Write key words, names and numbers, using arrows and abbreviations. Notes are allowed: scratch paper at a test centre, or a whiteboard at home.', examples: [{ text: 'Prob: lab report late → sol: email prof today, ext to Fri', good: true }] },
            { title: 'Common mistakes', body: 'Trying to write everything, losing the main topic in the details, and missing a change of plan (“Actually, let’s meet at four instead”).' }
          ],
          exercises: [
            { type: 'listen', script: 'Student: Hi, I missed the lab session on Monday because I was ill. Professor: That’s fine. You can join Thursday’s session instead, but please bring a note from the health centre.', q: 'What does the professor ask the student to do?', options: ['Attend Thursday’s session with a note from the health centre', 'Repeat the whole course', 'Write an essay', 'Visit the lab on Monday'], answer: 0, why: 'The professor offers Thursday’s session and asks for a note.' },
            { type: 'listen', script: 'Woman: Shall we meet at the library at two to plan the presentation? Man: I have a class until two thirty. Can we say three? Woman: Three works.', q: 'When will they meet?', options: ['At three', 'At two', 'At two thirty', 'At four'], answer: 0, why: 'They agree on three because the man has a class until two thirty.' },
            { type: 'listen', script: 'Attention, students. Tonight’s guest lecture has been moved from Hall A to the main auditorium because so many people have registered. It will still begin at six.', q: 'Why has the lecture been moved?', options: ['More people registered than Hall A can hold', 'Hall A is being repaired', 'The speaker is late', 'The lecture is cancelled'], answer: 0, why: 'It moved “because so many people have registered”.' },
            { type: 'listen', script: 'Attention, students. Tonight’s guest lecture has been moved from Hall A to the main auditorium because so many people have registered. It will still begin at six.', q: 'What has NOT changed?', options: ['The start time', 'The location', 'The room size', 'Nothing has changed'], answer: 0, why: '“It will still begin at six.”' },
            { type: 'choice', q: 'What should your notes focus on?', options: ['Key words, names, numbers and changes of plan', 'Every word the speakers say', 'Only the first sentence', 'Drawings of the speakers'], answer: 0, why: 'Short notes keep you listening.' },
            { type: 'gap', q: 'The meeting was moved, ___ it still starts at six.', options: ['but', 'so', 'because', 'or'], answer: 0, why: '“But” shows the contrast between what changed and what did not.' }
          ]
        },
        {
          id: 'toefl-lecture', title: 'Listen to an Academic Talk', minutes: 7,
          cards: [
            { title: 'The task', body: 'A short talk from a university class. Questions ask about the main idea, important details, examples and why the speaker mentions something.' },
            { title: 'Follow the structure', body: 'Lecturers signal structure: “Today we’ll look at…”, “The first reason is…”, “For example,…”, “So, to sum up…”. These signposts tell you what matters.' },
            { title: 'Why does the speaker mention…?', body: 'An example usually supports a general point. Ask what idea the example illustrates.', examples: [{ text: 'The professor mentions the camel to illustrate how animals adapt to dry climates.', good: true }] },
            { title: 'Common mistakes', body: 'Getting lost in one example and missing the main idea, confusing the speaker’s view with a view they describe, and not noticing contrast words.' }
          ],
          exercises: [
            { type: 'listen', script: 'Today we will look at why some desert animals can survive with very little water. The camel is a good example. It can lose a large share of its body water and still function, and it can drink a great deal very quickly when water is found.', q: 'What is the talk mainly about?', options: ['How desert animals survive with little water', 'The history of camels in trade', 'Why deserts are hot', 'How to find water in a desert'], answer: 0, why: 'The speaker introduces the topic in the first sentence.' },
            { type: 'listen', script: 'Today we will look at why some desert animals can survive with very little water. The camel is a good example. It can lose a large share of its body water and still function, and it can drink a great deal very quickly when water is found.', q: 'Why does the speaker mention the camel?', options: ['To give an example of an animal adapted to dry conditions', 'To compare camels with horses', 'To describe camel racing', 'To explain how deserts form'], answer: 0, why: 'The camel illustrates the main idea.' },
            { type: 'listen', script: 'Many people think the printing press spread quickly because it was cheap. In fact, early printed books were expensive. What really helped was that printers could produce many identical copies, so ideas could be shared accurately.', q: 'According to the speaker, what really helped printing spread?', options: ['Printers could make many identical copies', 'Books were cheap', 'Kings paid for printing', 'People stopped writing by hand'], answer: 0, why: '“What really helped” introduces the speaker’s own view.' },
            { type: 'listen', script: 'Many people think the printing press spread quickly because it was cheap. In fact, early printed books were expensive. What really helped was that printers could produce many identical copies, so ideas could be shared accurately.', q: 'What is the speaker’s attitude to the common belief?', options: ['The speaker disagrees with it', 'The speaker fully agrees', 'The speaker has no opinion', 'The speaker finds it funny'], answer: 0, why: '“In fact” signals that the speaker corrects the belief.' },
            { type: 'choice', q: 'Which phrase signals a summary?', options: ['So, to sum up,', 'For example,', 'The first reason is', 'Today we’ll look at'], answer: 0, why: '“To sum up” introduces the conclusion.' },
            { type: 'choice', q: 'A lecturer says “In fact”. What usually follows?', options: ['A correction or a surprising truth', 'A joke', 'A list of names', 'The end of the lecture'], answer: 0, why: '“In fact” often contrasts with what people believe.' }
          ]
        }
      ]
    },
    {
      title: 'Writing',
      lessons: [
        {
          id: 'toefl-build', title: 'Build a Sentence', minutes: 6,
          cards: [
            { title: 'The task', body: 'You put words or short phrases in order to make a correct sentence, often a reply in a short conversation. It tests word order and grammar.' },
            { title: 'English word order', body: 'Statements: subject, verb, object, then place and time (She studied chemistry in the library yesterday). Questions: auxiliary before the subject (Did she study…?). Adverbs of frequency go before the main verb (She often studies late).', examples: [{ text: 'Where did you find the book?', good: true }, { text: 'Where you did find the book?', good: false }] },
            { title: 'Indirect questions', body: 'After “Do you know…” or “Could you tell me…”, use statement word order: “Could you tell me where the library is?”, not “where is the library?”' },
            { title: 'Common mistakes', body: 'Putting the time before the object, forgetting the auxiliary in questions, and using question word order in indirect questions.' }
          ],
          exercises: [
            { type: 'order', q: 'Build the sentence.', parts: ['The professor', 'returned', 'our essays', 'on Monday'], why: 'Subject, verb, object, time.' },
            { type: 'order', q: 'Build the question.', parts: ['Where', 'did', 'you', 'find', 'the article?'], why: 'Question word, auxiliary, subject, main verb, object.' },
            { type: 'order', q: 'Build the indirect question.', parts: ['Could you tell me', 'when', 'the assignment', 'is due?'], why: 'After “Could you tell me”, use statement order: when the assignment is due.' },
            { type: 'order', q: 'Build the sentence.', parts: ['She', 'often', 'studies', 'in the library'], why: 'Frequency adverbs such as “often” go before the main verb.' },
            { type: 'choice', q: 'Which sentence is correct?', options: ['Do you know where the lab is?', 'Do you know where is the lab?', 'Do you know the lab where is?', 'Where do you know the lab is?'], answer: 0, why: 'Indirect questions use statement word order.' },
            { type: 'error', q: 'Find the error.', parts: ['I', 'have visited', 'yesterday', 'the museum.'], answer: 2, fix: 'I visited the museum yesterday.', why: 'Time goes at the end, and “yesterday” needs the past simple.' }
          ]
        },
        {
          id: 'toefl-email', title: 'Write an Email', minutes: 7,
          cards: [
            { title: 'The task', body: 'You read a short situation, often with points to include, and write an email: for example, to a professor, a classmate or an organisation. You have limited time, so plan quickly.' },
            { title: 'Cover every point', body: 'Give each required point its own sentence or short paragraph. Start with your purpose, end with a clear request or thanks.', examples: [{ text: 'I am writing to ask whether I could submit my report on Friday instead of Wednesday.', good: true }] },
            { title: 'Tone', body: 'Match the reader: polite and formal for a professor or organisation, friendly but clear for a classmate. Avoid text-message spelling.' },
            { title: 'Common mistakes', body: 'Missing one of the points, no greeting or sign-off, a tone that is too casual for a professor, and long background before the purpose.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening suits an email to a professor?', options: ['Dear Professor Bello,', 'Hey prof!', 'Yo,', 'Hi dude,'], answer: 0, why: 'Use a title and surname with a professor.' },
            { type: 'choice', q: 'Where should you state your purpose?', options: ['In the first sentence or two', 'At the very end', 'Nowhere', 'In the subject only'], answer: 0, why: 'Readers want to know why you are writing straight away.' },
            { type: 'choice', q: 'The task lists three points to include. What should you do?', options: ['Cover all three clearly', 'Choose the easiest one', 'Write about something else', 'List them as single words'], answer: 0, why: 'Missing a point lowers your score.' },
            { type: 'gap', q: 'I would be grateful if you could ___ me an extension.', options: ['give', 'giving', 'gave', 'given'], answer: 0, why: 'After “could”, use the base form.' },
            { type: 'error', q: 'Find the part that is too casual.', parts: ['Dear Professor Okafor,', 'Thanks so much 4 ur help', 'with my research question.', 'Kind regards,'], answer: 1, fix: 'Thank you very much for your help', why: 'Text-message spelling does not suit an email to a professor.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write to your professor, Dr Adeyemi. You missed a class because you were ill. Apologise, explain briefly, and ask how to catch up.', minWords: 60, maxWords: 160, checklist: ['Subject line', 'A polite greeting', 'An apology and a short explanation', 'A clear question about catching up', 'A polite sign-off'], model: 'Subject: Missed class on Tuesday\n\nDear Dr Adeyemi,\n\nI am sorry that I missed your lecture on Tuesday. I had a fever and stayed at home on the advice of the health centre.\n\nCould you tell me how I can catch up? In particular, I would like to know whether the slides will be posted online, and whether I need to complete the in-class exercise.\n\nThank you for your understanding.\n\nKind regards,\nAmina Yusuf' }
          ]
        },
        {
          id: 'toefl-discussion', title: 'Write for an Academic Discussion', minutes: 8,
          cards: [
            { title: 'The task', body: 'A professor posts a question to an online class discussion, and two students reply with their views. You write your own reply that gives your opinion and adds to the discussion.' },
            { title: 'A clear structure', body: 'State your position in the first sentence. Give one main reason and develop it with an example or explanation. Refer to a classmate’s idea, agreeing or disagreeing politely, and add something new.', examples: [{ text: 'I agree with Kofi that online courses are flexible, but I think their biggest advantage is that students can replay difficult lectures.', good: true }] },
            { title: 'Add, do not repeat', body: 'Do not just repeat the students’ points. Bring a new reason or example. Specific examples score better than general claims.' },
            { title: 'Common mistakes', body: 'No clear opinion, copying a classmate’s idea, a list of reasons with no development, and running out of time before finishing.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should your first sentence do?', options: ['State your position', 'Repeat the professor’s question', 'Introduce yourself', 'Apologise'], answer: 0, why: 'A clear position starts a strong reply.' },
            { type: 'choice', q: 'Two classmates have posted. What should you do with their ideas?', options: ['Refer to one and add a new point', 'Copy them', 'Ignore the topic', 'Criticise them personally'], answer: 0, why: 'Adding to the discussion shows engagement.' },
            { type: 'choice', q: 'Which sentence develops a point best?', options: ['For example, in my country, students in rural areas can now take university courses online without moving to the city.', 'This is very good.', 'Many people think so.', 'It is important for everyone.'], answer: 0, why: 'A specific example develops the idea.' },
            { type: 'gap', q: 'I see Kofi’s point; ___, I believe cost is the bigger issue.', options: ['however', 'therefore', 'for example', 'similarly'], answer: 0, why: '“However” introduces your contrasting view.' },
            { type: 'order', q: 'Put a discussion reply in order.', parts: ['Your position', 'Your main reason', 'An example', 'A link to a classmate’s idea'], why: 'Position, reason, example, connection.' },
            { type: 'write', kind: 'paragraph', q: 'Professor: “Should universities require all students to take a course in public speaking?” Kofi says it builds confidence. Ama says students should choose their own courses. Write your reply.', minWords: 70, maxWords: 180, checklist: ['A clear position in the first sentence', 'A developed reason with an example', 'A reference to Kofi or Ama', 'A new idea'], model: 'I believe universities should require a short public speaking course. I agree with Kofi that it builds confidence, but I think the main benefit is practical: almost every career involves presenting ideas. For example, engineers must explain their designs to clients, and nurses must give clear instructions to patients. Although Ama is right that choice matters, a single short course would not take much time away from other subjects. Therefore, the benefits clearly outweigh the cost.' }
          ]
        }
      ]
    },
    {
      title: 'Speaking',
      lessons: [
        {
          id: 'toefl-repeat', title: 'Listen and Repeat', minutes: 5,
          cards: [
            { title: 'The task', body: 'You hear sentences, often in a setting such as a campus tour, and repeat each one exactly. It tests pronunciation, rhythm and how much you can hold in memory.' },
            { title: 'Listen in chunks', body: 'Hear the sentence as meaningful groups of words, not single words: “The library / is on your left / next to the café.” Chunks are easier to remember and repeat.' },
            { title: 'Rhythm and stress', body: 'Stress the important words (nouns, main verbs, adjectives) and say small words such as “to”, “the” and “of” lightly. Keep a steady pace.', examples: [{ text: 'The CAFÉ is NEXT to the LIBrary.', good: true }] },
            { title: 'Common mistakes', body: 'Changing words, leaving out small words such as “the” and “of”, rushing, and stopping to correct yourself many times.' }
          ],
          exercises: [
            { type: 'listen', script: 'Welcome to the campus tour. The library is on your left.', q: 'Which sentence did you hear?', options: ['The library is on your left.', 'The library is on your right.', 'The libraries are on the left.', 'The library was on your left.'], answer: 0, why: 'Listen for small differences such as left and right, singular and plural, present and past.' },
            { type: 'listen', script: 'Please collect your student card from the main office.', q: 'Which sentence did you hear?', options: ['Please collect your student card from the main office.', 'Please collect your student cards from the main office.', 'Please correct your student card at the main office.', 'Please collect your student card from the post office.'], answer: 0, why: 'Every word matters when you repeat.' },
            { type: 'choice', q: 'How should you remember a long sentence?', options: ['In meaningful chunks', 'Word by word', 'By its first letter', 'By writing it all down'], answer: 0, why: 'Chunks are easier to hold in memory.' },
            { type: 'choice', q: 'Which words usually carry stress?', options: ['Nouns, main verbs and adjectives', '“the”, “a” and “of”', 'Every word equally', 'Only the last word'], answer: 0, why: 'Content words carry stress; small words are said lightly.' },
            { type: 'speak', q: 'Repeat aloud: “The science building is next to the main car park.” Then: “Lectures begin at nine o’clock every morning.”', points: ['say each sentence exactly', 'stress the key words', 'keep a steady pace'], prep: 10, talk: 20, checklist: ['I did not change any words', 'I stressed the important words', 'I spoke at a steady pace'] }
          ]
        },
        {
          id: 'toefl-interview', title: 'Take an Interview', minutes: 6,
          cards: [
            { title: 'The task', body: 'You answer a series of questions, as in a short interview, about everyday or academic topics. You speak each answer within a time limit.' },
            { title: 'A strong answer', body: 'Answer directly, give a reason, add a short example, and stop when you have made your point. Aim to use most of the time without long pauses.', examples: [{ text: 'I prefer studying in the morning, because my mind is clearer. For example, I solve maths problems faster before lunch.', good: true }] },
            { title: 'Fluency', body: 'Use linking words (because, for example, so, also) and natural fillers (“Well,…”, “Let me think…”) instead of silence. Clear pronunciation matters more than accent.' },
            { title: 'Common mistakes', body: 'One-sentence answers, memorised speeches that do not fit the question, long silences, and speaking so fast that words run together.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which answer to “Do you prefer studying alone or in a group?” is best?', options: ['Alone, because I concentrate better. For example, I finish my reading twice as fast at home.', 'Alone.', 'Groups are groups.', 'I do not know.'], answer: 0, why: 'It answers, gives a reason and an example.' },
            { type: 'choice', q: 'You need a moment to think. What should you say?', options: ['Well, let me think about that…', '(Silence for ten seconds.)', 'Next question, please.', 'Pass.'], answer: 0, why: 'A natural filler keeps you fluent.' },
            { type: 'choice', q: 'What matters more for your score?', options: ['Being clear and easy to understand', 'Sounding American', 'Using very rare words', 'Speaking as fast as possible'], answer: 0, why: 'Clarity is what raters listen for.' },
            { type: 'gap', q: 'I enjoy volunteering, ___ it lets me meet new people.', options: ['because', 'although', 'unless', 'so that not'], answer: 0, why: '“Because” introduces your reason.' },
            { type: 'speak', q: 'Answer: “What is one skill you would like to learn, and why?”', points: ['name the skill', 'give a reason', 'add an example'], prep: 15, talk: 45, checklist: ['I answered directly', 'I gave a reason', 'I added an example', 'I avoided long pauses'] },
            { type: 'speak', q: 'Answer: “Some people say students should work part-time while studying. What do you think?”', points: ['your opinion', 'a reason', 'an example', 'a short conclusion'], prep: 15, talk: 45, checklist: ['I gave a clear opinion', 'I explained a reason', 'I gave an example', 'I spoke without long pauses'] }
          ]
        }
      ]
    },
    {
      title: 'Vocabulary and strategy',
      lessons: [
        {
          id: 'toefl-strategy', title: 'Academic vocabulary and test-day strategy', minutes: 6,
          cards: [
            { title: 'Academic word families', body: 'Learn words with their family: analyse (verb), analysis (noun), analytical (adjective); significant, significance; evidence, evident. Questions test the right form for the sentence.' },
            { title: 'Signal words', body: 'However and nevertheless show contrast; therefore and consequently show results; furthermore and moreover add points; for instance introduces examples.' },
            { title: 'Test-day rules', body: 'Arrive early or set up your room for the Home Edition. There are no scheduled breaks. Notes are allowed (paper at a centre, a whiteboard or a transparent sheet at home). Writing assistance software and phones are not allowed.', examples: [{ text: 'Check your computer and the ETS requirements the day before a Home Edition test.', good: true }] },
            { title: 'Common mistakes', body: 'Learning single words without their forms, panicking when the adaptive test feels hard (it may mean you are doing well), and running out of time in Writing.' }
          ],
          exercises: [
            { type: 'gap', q: 'The researchers carried out a detailed ___ of the data.', options: ['analysis', 'analyse', 'analytical', 'analysed'], answer: 0, why: 'After “a detailed”, a noun is needed.' },
            { type: 'gap', q: 'The results were ___, so the study was published.', options: ['significant', 'significance', 'signify', 'significantly'], answer: 0, why: 'After “were”, an adjective is needed.' },
            { type: 'gap', q: 'The experiment failed. ___, the team learned a great deal.', options: ['Nevertheless', 'Therefore', 'For instance', 'Moreover'], answer: 0, why: 'The second sentence contrasts with the first.' },
            { type: 'choice', q: 'Are notes allowed during the TOEFL iBT?', options: ['Yes', 'No', 'Only in Speaking', 'Only at home'], answer: 0, why: 'ETS allows notes on scratch paper or an approved whiteboard.' },
            { type: 'choice', q: 'The test feels harder halfway through. What might this mean?', options: ['The adaptive test may be giving you harder items because you are doing well', 'You have failed', 'The computer is broken', 'You should stop'], answer: 0, why: 'Adaptive tests adjust to your level, so stay calm.' },
            { type: 'error', q: 'Find the wrong word form.', parts: ['The study', 'provided clear', 'evident', 'that sleep improves memory.'], answer: 2, fix: 'evidence', why: 'After “clear”, a noun is needed: evidence.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'toefl-final', title: 'Final assessment: TOEFL iBT', minutes: 20, kind: 'final',
          cards: [
            { title: 'How this works', body: '14 questions from the whole course: test facts, reading, listening, writing and vocabulary. They are written for Lexiverse in TOEFL style, not official ETS questions.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'What scale do section scores use from 2026?', options: ['1 to 6', '0 to 30', '0 to 9', '200 to 800'], answer: 0, why: 'Sections and the overall score use the 1 to 6 scale.' },
            { type: 'choice', q: 'About how long is the whole test, including directions?', options: ['About two hours', 'About four hours', 'About 45 minutes', 'A whole day'], answer: 0, why: 'ETS advises allowing about two hours.' },
            { type: 'choice', q: 'Which is a Writing task?', options: ['Write for an Academic Discussion', 'Listen and Repeat', 'Read in Daily Life', 'Take an Interview'], answer: 0, why: 'The Writing tasks are Build a Sentence, Write an Email and Write for an Academic Discussion.' },
            { type: 'choice', q: 'Which is a Speaking task?', options: ['Take an Interview', 'Complete the Words', 'Build a Sentence', 'Listen to an Announcement'], answer: 0, why: 'The Speaking tasks are Listen and Repeat and Take an Interview.' },
            { type: 'gap', q: 'Volcanoes can ___ huge amounts of ash.', options: ['release', 'releasing', 'released', 'releases'], answer: 0, why: 'After “can”, use the base form.' },
            { type: 'choice', q: 'Which place stays open 24 hours?', options: ['The computer lab in the Science Building', 'The library', 'The study rooms', 'The heating office'], answer: 0, why: 'The 24-hour lab “is not affected”.', passage: 'Campus Library Notice: From Monday 3 March, the library will close at 9 p.m. instead of 11 p.m. on weekdays while the heating system is repaired. Study rooms can still be booked online. The 24-hour computer lab in the Science Building is not affected.' },
            { type: 'choice', q: 'What does bleaching mean in the passage?', options: ['Polyps expel the algae that give them colour and food', 'Coral grows faster', 'Reefs cover more of the ocean floor', 'Algae build skeletons'], answer: 0, why: 'The passage defines bleaching in the third sentence.', passage: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all known marine species. Reefs are built by tiny animals called polyps, which take calcium from seawater to form hard skeletons. When water temperatures rise for long periods, polyps expel the algae that live inside them and give them colour and food. This process, known as bleaching, does not kill the coral immediately, but if the water stays warm, the coral may starve.' },
            { type: 'listen', script: 'Could you tell me where I can print my essay?', q: 'Choose the best response.', options: ['There are printers in the computer lab.', 'My essay is about history.', 'I printed it yesterday.', 'Essays are due on Friday.'], answer: 0, why: 'The question asks “where”, so the reply gives a place.' },
            { type: 'listen', script: 'The seminar was supposed to start at ten, but the speaker’s train is delayed, so we will begin at eleven.', q: 'When will the seminar begin?', options: ['At eleven', 'At ten', 'At ten thirty', 'At twelve'], answer: 0, why: 'The new time is eleven.' },
            { type: 'order', q: 'Build the indirect question.', parts: ['Do you know', 'what time', 'the lab', 'opens?'], why: 'Statement order after “Do you know”.' },
            { type: 'choice', q: 'Which opening suits an email to a professor?', options: ['Dear Professor Musa,', 'Hey there!', 'Sup prof,', 'Hiya,'], answer: 0, why: 'Use a title and surname.' },
            { type: 'choice', q: 'In an academic discussion reply, what should you do with classmates’ ideas?', options: ['Refer to one and add something new', 'Copy them', 'Ignore them all', 'Criticise them personally'], answer: 0, why: 'Adding to the discussion scores well.' },
            { type: 'gap', q: 'The study found strong ___ that exercise improves mood.', options: ['evidence', 'evident', 'evidently', 'evidential'], answer: 0, why: 'After “strong”, a noun is needed.' },
            { type: 'choice', q: 'What happens if you skip an entire section?', options: ['The test is not scored', 'You lose 10 points', 'Nothing', 'That section is scored 1'], answer: 0, why: 'At least one item in every section must be answered.' }
          ]
        }
      ]
    }
  ]
};
