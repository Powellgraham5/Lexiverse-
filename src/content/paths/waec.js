// WAEC / NECO English Language path. Practice material written for Lexiverse: not official past
export default {
  note: 'Practice questions written for Lexiverse to help you prepare. They are not official WAEC or NECO past questions. Always check your school and the exam body for the current syllabus.',
  guide: [
    'Start with the introduction to the exam, then work through lexis and structure, comprehension and summary, continuous writing and oral English.',
    'Every lesson explains the rule, shows examples and common mistakes, then gives exam-style practice with explanations.',
    'Practice questions are written for Lexiverse in the style of the exam. They are not official past questions.',
    'Finish with exam strategy and the final assessment, then take the practice test timed, the way the real exam is.',
    'Save every rule you get wrong to your notebook and revise it weekly.'
  ],
  improve: [
    'Do ten lexis and structure questions every day and read the explanation for each one you miss.',
    'Read a newspaper editorial twice a week and summarise each paragraph in one sentence.',
    'Write one continuous-writing answer a week within the time limit, then check format, register and length.',
    'Say difficult words aloud and check their stress and vowel sounds in a dictionary.',
    'Keep an error log: every mistake, the rule and a correct example.',
    'Use past papers from your school or the exam body to practise, alongside these questions.'
  ],
  units: [
    {
      title: 'Know the exam',
      lessons: [
        {
          id: 'waec-exam', title: 'What the English paper tests', minutes: 4, kind: 'intro',
          cards: [
            { title: 'Three kinds of task', body: 'The WAEC and NECO English Language exams test you in three ways: objective questions where you choose the right option, written work (an essay or letter, comprehension and summary), and oral English (sounds and stress). Your school can tell you the exact papers and timings for your year.' },
            { title: 'What each part rewards', body: 'Objective questions reward accurate grammar and vocabulary. Written work rewards clear organisation, correct expression and staying on the question. Oral English rewards knowing how words sound, not how they are spelled.', examples: [{ text: 'Grammar: “Each of the boys has a book.”', good: true }, { text: 'Sound: “sugar” begins with the same sound as “ship”.', good: true }] },
            { title: 'Common mistakes', body: 'Not knowing which sections carry the most marks, ignoring instructions such as the number of questions to answer, and practising only objective questions.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which part asks you to pick the correct option from A to D?', options: ['Objective questions', 'Essay writing', 'Summary', 'Letter writing'], answer: 0, why: 'Objective questions give you options to choose from. Essays, letters and summaries are written in your own words.' },
            { type: 'choice', q: 'In a summary answer, what should you write?', options: ['Short, clear sentences in your own words', 'Long sentences copied from the passage', 'A list of single words', 'Your opinion of the passage'], answer: 0, why: 'A summary gives the main points briefly, one point per sentence, in your own words. Copying whole sentences or adding opinions is a common way to lose marks.' },
            { type: 'choice', q: 'What does oral English test?', options: ['Sounds, stress and intonation', 'Handwriting', 'Reading speed', 'Spelling only'], answer: 0, why: 'Oral English is about pronunciation: vowel and consonant sounds, word stress and intonation.' },
            { type: 'choice', q: 'Before writing an essay in the exam, what should you do first?', options: ['Read the question carefully and plan your points', 'Start writing at once to save time', 'Write the conclusion first', 'Copy the question as your first paragraph'], answer: 0, why: 'A few minutes of planning keeps you on the question and gives your essay a clear order.' },
            { type: 'choice', q: 'How should you use this course?', options: ['Learn each rule, practise, and record your mistakes', 'Memorise answers only', 'Skip the writing lessons', 'Only take the final assessment'], answer: 0, why: 'Steady practice with explanations builds lasting skill.' }
          ]
        }
      ]
    },
    {
      title: 'Lexis and structure',
      lessons: [
        {
          id: 'waec-concord', title: 'Concord: subject and verb agree', minutes: 5,
          cards: [
            { title: 'Find the real subject', body: 'The verb agrees with the head of the subject, not with the nearest noun.', examples: [{ text: 'The list of names is on the board.', good: true, note: 'The subject is “list”, which is singular.' }, { text: 'The list of names are on the board.', good: false }] },
            { title: 'Each, every, one of', body: '“Each”, “every”, “everyone” and “one of …” take a singular verb.', examples: [{ text: 'Each of the students has a textbook.', good: true }, { text: 'One of my brothers lives in Kano.', good: true }] },
            { title: 'Either … or, neither … nor', body: 'The verb agrees with the subject nearer to it.', examples: [{ text: 'Neither the principal nor the teachers were in the hall.', good: true }, { text: 'Neither the teachers nor the principal was in the hall.', good: true }] },
            { title: 'Common mistakes', body: 'Making the verb agree with the nearest noun instead of the real subject (“The box of mangoes are”), and treating “each”, “every” and “one of” as plural.' }
          ],
          exercises: [
            { type: 'gap', q: 'The list of names ___ on the notice board.', options: ['is', 'are'], answer: 0, why: 'The subject is “list” (singular), not “names”.' },
            { type: 'gap', q: 'Each of the students ___ a textbook.', options: ['has', 'have'], answer: 0, why: '“Each” is singular, so it takes “has”.' },
            { type: 'gap', q: 'Neither the principal nor the teachers ___ in the hall.', options: ['was', 'were'], answer: 1, why: 'With “neither … nor”, the verb agrees with the nearer subject, “teachers”, which is plural.' },
            { type: 'gap', q: 'One of my brothers ___ in Kano.', options: ['live', 'lives'], answer: 1, why: 'The subject is “one”, which is singular.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['The quality of the mangoes', 'are', 'better than', 'last year’s.'], answer: 1, fix: 'is', why: 'The subject is “quality” (singular), so the verb should be “is”.' },
            { type: 'gap', q: 'Mathematics ___ my favourite subject.', options: ['is', 'are'], answer: 0, why: 'Names of subjects such as mathematics, physics and economics take a singular verb.' }
          ]
        },
        {
          id: 'waec-tense', title: 'Tenses and prepositions', minutes: 5,
          cards: [
            { title: 'Finished time? Use the past simple', body: 'Use the present perfect (have/has + past participle) for the past linked to now. With a finished time such as “yesterday” or “last week”, use the past simple.', examples: [{ text: 'I saw him yesterday.', good: true }, { text: 'I have seen him yesterday.', good: false }, { text: 'I have finished my homework, so I can play now.', good: true }] },
            { title: 'Fixed prepositions', body: 'Some words always take the same preposition. Learn them as pairs.', examples: [{ text: 'married to', good: true }, { text: 'congratulate someone on', good: true }, { text: 'interested in', good: true }, { text: 'discuss the problem (no “about”)', good: true }, { text: 'comprise four rooms (no “of”)', good: true }] },
            { title: 'Common mistakes', body: '“I have seen him yesterday” (use the past simple with finished time), “discuss about” (discuss takes no preposition) and “married with” (married to).' }
          ],
          exercises: [
            { type: 'gap', q: 'I ___ him at the market yesterday.', options: ['saw', 'have seen', 'had seen', 'see'], answer: 0, why: '“Yesterday” is a finished time, so use the past simple “saw”.' },
            { type: 'gap', q: 'She has been married ___ Tunde for five years.', options: ['to', 'with', 'by', 'for'], answer: 0, why: 'The fixed phrase is “married to” someone.' },
            { type: 'gap', q: 'We congratulated her ___ her success.', options: ['on', 'for', 'at', 'with'], answer: 0, why: 'We “congratulate someone on” something.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['The committee', 'discussed about', 'the problem', 'for two hours.'], answer: 1, fix: 'discussed', why: '“Discuss” takes a direct object: discuss the problem, not discuss about it.' },
            { type: 'gap', q: 'By the time we arrived, the film ___.', options: ['had started', 'has started', 'starts', 'was start'], answer: 0, why: 'The past perfect (“had started”) shows it happened before another past event (“we arrived”).' },
            { type: 'choice', q: 'Which sentence is correct?', options: ['The house comprises four bedrooms.', 'The house comprises of four bedrooms.'], answer: 0, why: '“Comprise” takes no “of”. You can say “is composed of” or “consists of” instead.' }
          ]
        },
        {
          id: 'waec-vocab', title: 'Synonyms, antonyms and idioms', minutes: 5,
          cards: [
            { title: 'Nearest in meaning', body: 'Read the whole sentence first. The right word is the one that fits this context, not just any dictionary meaning.', examples: [{ text: 'The trader was frugal with his money: careful, thrifty.', good: true }] },
            { title: 'Opposite in meaning', body: 'Decide what the word means here, then find its opposite with the same part of speech.', examples: [{ text: 'temporary ↔ permanent', good: true }, { text: 'ambiguous ↔ clear', good: true }] },
            { title: 'Idioms', body: 'An idiom means more than its words. Learn the meaning as a whole.', examples: [{ text: 'bury the hatchet: make peace', good: true }, { text: 'once in a blue moon: very rarely', good: true }, { text: 'a wet blanket: someone who spoils other people’s fun', good: true }] }
          ],
          exercises: [
            { type: 'choice', q: 'Nearest in meaning to “frugal”: The trader was very frugal with his money.', options: ['thrifty', 'careless', 'generous', 'angry'], answer: 0, why: '“Frugal” means careful not to spend much, which is “thrifty”.' },
            { type: 'choice', q: 'Opposite in meaning to “ambiguous”: Her answer was ambiguous.', options: ['clear', 'unclear', 'long', 'rude'], answer: 0, why: 'Ambiguous means it could mean more than one thing. The opposite is “clear”.' },
            { type: 'choice', q: 'The two brothers finally decided to bury the hatchet. They…', options: ['made peace', 'dug a hole', 'started fighting', 'sold their tools'], answer: 0, why: '“Bury the hatchet” is an idiom meaning to stop quarrelling and make peace.' },
            { type: 'choice', q: 'My uncle visits us once in a blue moon. He visits…', options: ['very rarely', 'every month', 'at night', 'when it rains'], answer: 0, why: '“Once in a blue moon” means very rarely.' },
            { type: 'choice', q: 'Opposite in meaning to “temporary”: The new rule is temporary.', options: ['permanent', 'short', 'strict', 'recent'], answer: 0, why: 'Temporary means it lasts a short time. The opposite is “permanent”.' },
            { type: 'choice', q: '“Don’t be a wet blanket at the party.” This means…', options: ['do not spoil the fun for others', 'do not spill water', 'do not arrive late', 'do not bring a blanket'], answer: 0, why: 'A “wet blanket” is someone who spoils other people’s enjoyment.' }
          ]
        },
        {
          id: 'waec-phrasal', title: 'Phrasal verbs and idioms', minutes: 6,
          cards: [
            { title: 'Phrasal verbs', body: 'A verb plus a particle that together have a new meaning: put off (postpone), call off (cancel), look into (investigate), turn down (refuse), give up (stop trying), make up for (compensate).', examples: [{ text: 'The match was called off because of the rain.', good: true }] },
            { title: 'Idioms in the exam', body: 'Questions ask for the meaning of an idiom in a sentence. Read the whole sentence: the context usually points to the meaning. Examples: a wet blanket (someone who spoils fun), let the cat out of the bag (reveal a secret), at the eleventh hour (at the last moment).' },
            { title: 'Real-life use', body: 'Phrasal verbs and idioms are everywhere in spoken English, news reports and novels. Knowing them helps comprehension as much as the objective paper.' },
            { title: 'Common mistakes', body: 'Taking idioms literally, mixing up particles (put up with / put off), and using informal phrasal verbs in formal letters where a single verb is better (postpone, not put off).' }
          ],
          exercises: [
            { type: 'gap', q: 'The meeting has been ___ until next week.', options: ['put off', 'put up', 'put on', 'put in'], answer: 0, why: '“Put off” means postpone.' },
            { type: 'gap', q: 'The police promised to ___ the complaint.', options: ['look into', 'look up', 'look after', 'look down on'], answer: 0, why: '“Look into” means investigate.' },
            { type: 'choice', q: '“The news of the strike came at the eleventh hour.” This means it came', options: ['at the last moment', 'at 11 o’clock', 'too early', 'every hour'], answer: 0, why: '“At the eleventh hour” means very late, just in time.' },
            { type: 'choice', q: '“Bola let the cat out of the bag.” This means Bola', options: ['revealed a secret', 'freed a pet', 'went shopping', 'told a lie'], answer: 0, why: 'The idiom means to reveal a secret by accident.' },
            { type: 'gap', q: 'She ___ the job offer because the salary was too low.', options: ['turned down', 'turned up', 'turned on', 'turned in'], answer: 0, why: '“Turn down” means refuse.' },
            { type: 'choice', q: '“Don’t be a wet blanket at the party.” A wet blanket is someone who', options: ['spoils other people’s fun', 'is very generous', 'arrives late', 'brings drinks'], answer: 0, why: 'The idiom describes a person who dampens enjoyment.' },
            { type: 'error', q: 'Choose the part with an error.', parts: ['I cannot put', 'off with', 'his rudeness', 'any longer.'], answer: 1, fix: 'up with', why: '“Put up with” means tolerate.' }
          ]
        },
        {
          id: 'waec-tags', title: 'Question tags and reported speech', minutes: 7,
          cards: [
            { title: 'Question tags', body: 'A positive statement takes a negative tag, and a negative statement takes a positive tag. Use the same auxiliary and a pronoun.', examples: [{ text: 'She is coming, isn’t she?', good: true }, { text: 'You didn’t call, did you?', good: true }] },
            { title: 'Tricky tags', body: '“I am late, aren’t I?”; “Let’s go, shall we?”; “Nobody came, did they?”; “He hardly studies, does he?” (hardly, seldom, never, nobody are negative); “Everybody is here, aren’t they?”' },
            { title: 'Reported speech', body: 'Move the tense back and change pronouns and time words: “I am tired,” he said → He said that he was tired. today → that day; tomorrow → the next day; here → there.' },
            { title: 'Common mistakes', body: 'Using “isn’t it?” for every tag, a positive tag after “never” or “hardly”, and forgetting to backshift the tense in reported speech.' }
          ],
          exercises: [
            { type: 'gap', q: 'You have finished your homework, ___?', options: ['haven’t you', 'have you', 'didn’t you', 'isn’t it'], answer: 0, why: 'Positive statement with “have”: negative tag “haven’t you”.' },
            { type: 'gap', q: 'Let’s start the meeting, ___?', options: ['shall we', 'will we', 'don’t we', 'let’s not'], answer: 0, why: 'Tags after “Let’s” use “shall we”.' },
            { type: 'gap', q: 'He seldom comes late, ___?', options: ['does he', 'doesn’t he', 'is he', 'isn’t he'], answer: 0, why: '“Seldom” is negative, so the tag is positive.' },
            { type: 'gap', q: 'I am your friend, ___?', options: ['aren’t I', 'amn’t I', 'isn’t it', 'am not I'], answer: 0, why: 'The standard tag for “I am” is “aren’t I”.' },
            { type: 'choice', q: '“I will travel tomorrow,” Ada said. In reported speech:', options: ['Ada said that she would travel the next day.', 'Ada said that I will travel tomorrow.', 'Ada said she will travels tomorrow.', 'Ada says that she travelled yesterday.'], answer: 0, why: 'will → would, I → she, tomorrow → the next day.' },
            { type: 'choice', q: '“Are you ready?” the teacher asked. In reported speech:', options: ['The teacher asked if we were ready.', 'The teacher asked are we ready.', 'The teacher asked if are we ready.', 'The teacher said are you ready.'], answer: 0, why: 'Reported questions use “if” and statement word order.' },
            { type: 'gap', q: 'Nobody called while I was out, ___?', options: ['did they', 'didn’t they', 'did he', 'didn’t he'], answer: 0, why: '“Nobody” is negative and takes “they” in the tag.' }
          ]
        }
      ]
    },
    {
      title: 'Comprehension and summary',
      lessons: [
        {
          id: 'waec-comprehension', title: 'Reading for meaning', minutes: 6,
          cards: [
            { title: 'Read twice', body: 'Read the passage once for the main idea. Then read the questions, and go back to the part of the passage each one is about.' },
            { title: 'Words in context', body: 'When asked what a word or phrase means “as used in the passage”, choose the meaning that fits that sentence. Try your answer in place of the word: it should still make sense.' },
            { title: 'The passage', body: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.' },
            { title: 'Common mistakes', body: 'Answering from general knowledge instead of the passage, copying long chunks when a short answer is asked for, and replacing a word with one of a different part of speech.' }
          ],
          exercises: [
            { type: 'choice', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: 'Why did many traders complain at first?', options: ['They thought they were losing money', 'The council fined them', 'They were too tired', 'It always rained on Saturdays'], answer: 0, why: 'The passage says: “many traders complained that they were losing money”.' },
            { type: 'choice', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: '“Mama Ronke … was the loudest.” This suggests she…', options: ['complained more strongly than anyone', 'had the loudest voice in the market', 'sold the most peppers', 'liked the clean-up from the start'], answer: 0, why: 'In context, “the loudest” describes her complaining, not just her voice.' },
            { type: 'choice', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: 'As used in the passage, “drove buyers away” means…', options: ['made buyers leave', 'gave buyers a lift', 'attracted buyers', 'hid from buyers'], answer: 0, why: 'The bad smell made buyers leave. Try it in the sentence: “the smell that once made buyers leave”.' },
            { type: 'choice', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: 'What changed Mama Ronke’s mind?', options: ['More customers came and the market was cleaner', 'The council paid her', 'Her children asked her to help', 'She was given a new broom'], answer: 0, why: 'After three months customers returned in larger numbers, the flooding stopped and the smell was gone.' },
            { type: 'choice', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: 'Which sentence best states the main idea?', options: ['A monthly clean-up that traders resisted ended up helping their business', 'Mama Ronke sells the best peppers in the market', 'Burning rubbish is the fastest way to clean a market', 'Traders should never close their stalls'], answer: 0, why: 'The passage follows the clean-up from complaints to success. The other options are details or not in the passage.' }
          ]
        },
        {
          id: 'waec-figurative', title: 'Figurative language and grammatical function', minutes: 7,
          cards: [
            { title: 'Figures of speech', body: 'Simile (compares with like or as: as brave as a lion), metaphor (says one thing is another: the classroom was a zoo), personification (gives human qualities to things: the wind whispered), hyperbole (exaggeration: I have told you a million times), irony (the opposite of what is expected).' },
            { title: 'Grammatical name and function', body: 'Comprehension questions ask for the grammatical name of a group of words (noun clause, adverbial clause, adjectival clause, phrase) and its function (subject, object, complement, modifying a noun or verb).', examples: [{ text: '“that the bridge was unsafe” in “We knew that the bridge was unsafe” is a noun clause, object of the verb “knew”.', good: true }] },
            { title: 'How to answer', body: 'Find the phrase in the passage, read the whole sentence, then ask: what does it do in the sentence? A clause has a subject and a finite verb; a phrase does not.' },
            { title: 'Common mistakes', body: 'Confusing simile and metaphor, calling a phrase a clause, and giving the name without the function when both are asked for.' }
          ],
          exercises: [
            { type: 'choice', q: '“Her smile was sunshine on a cloudy day.” This is', options: ['a metaphor', 'a simile', 'hyperbole', 'irony'], answer: 0, why: 'It says the smile is sunshine, without “like” or “as”.' },
            { type: 'choice', q: '“The old house groaned in the storm.” This is', options: ['personification', 'a simile', 'irony', 'alliteration'], answer: 0, why: 'A house cannot groan; it is given a human action.' },
            { type: 'choice', q: '“I have warned you a thousand times.” This is', options: ['hyperbole', 'a metaphor', 'personification', 'irony'], answer: 0, why: 'It is deliberate exaggeration.' },
            { type: 'choice', q: 'In “The boy who won the prize is my cousin”, “who won the prize” is', options: ['an adjectival clause qualifying “boy”', 'a noun clause, subject', 'an adverbial clause of time', 'a prepositional phrase'], answer: 0, why: 'It describes the noun “boy”.' },
            { type: 'choice', q: 'In “We left when the rain stopped”, “when the rain stopped” is', options: ['an adverbial clause of time', 'a noun clause', 'an adjectival clause', 'a phrase'], answer: 0, why: 'It tells us when we left.' },
            { type: 'choice', q: 'In “What she said surprised everyone”, “What she said” is', options: ['a noun clause, subject of “surprised”', 'an adjectival clause', 'an adverbial clause', 'a verb phrase'], answer: 0, why: 'The clause acts as the subject of the sentence.' },
            { type: 'choice', q: 'Which is a phrase, not a clause?', options: ['under the old mango tree', 'because he was ill', 'when the bell rang', 'that she was right'], answer: 0, why: 'It has no subject or finite verb.' }
          ]
        },
        {
          id: 'waec-summary', title: 'Writing a summary', minutes: 6,
          cards: [
            { title: 'One point, one sentence', body: 'Summary questions often ask for a number of points, “one sentence for each”. Write each point as one complete, short sentence.' },
            { title: 'Leave out the extras', body: 'Do not include examples, quotations, repetitions or your own opinion. Use your own words where you can.', examples: [{ text: 'The market stopped flooding when it rained.', good: true }, { text: '“Who will pay my children’s school fees while I hold a broom?” she asked.', good: false, note: 'A quotation is detail, not a point.' }] },
            { title: 'Common mistakes', body: 'Copying whole sentences from the passage, including examples and illustrations, writing more points than asked, and writing a paragraph when separate sentences are required.' }
          ],
          exercises: [
            { type: 'choice', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: 'Which is a main point about the benefits of the clean-up?', options: ['More customers came to the market', 'Mama Ronke sells peppers', 'The clean-up ends at ten o’clock', 'Mama Ronke teases the latecomers'], answer: 0, why: 'More customers is a benefit. The others are details about people or timing.' },
            { type: 'choice', q: 'Which is the best summary sentence?', options: ['The market no longer floods when it rains.', 'The market, which used to flood badly every single time it rained heavily, no longer floods now.', 'Flooding.', 'I think the market is better now.'], answer: 0, why: 'It is a complete, short sentence with one point. The second is wordy, the third is not a sentence, and the fourth is an opinion.' },
            { type: 'choice', q: 'Which of these should you leave out of a summary?', options: ['A quotation from a character', 'A main point', 'A complete sentence', 'Your own words'], answer: 0, why: 'Quotations are supporting detail. A summary keeps only the main points.' },
            { type: 'write', kind: 'summary', passage: 'Every last Saturday of the month, the traders of Oja Tuntun market keep their stalls closed until ten o’clock. Instead of selling, they sweep the walkways, clear the gutters and carry the rubbish to the council’s waste truck, because burning it would send smoke over the homes nearby. At first, many traders complained that they were losing money. Mama Ronke, who sells peppers, was the loudest. “Who will pay my children’s school fees while I hold a broom?” she asked. But after three months, customers began to return in larger numbers. The market no longer flooded when it rained, and the smell that once drove buyers away was gone. Now Mama Ronke arrives first, broom in hand, and teases the latecomers.', q: 'In two sentences, one for each, summarise two benefits of the monthly clean-up.', minWords: 10, maxWords: 45, checklist: ['Two separate sentences', 'Benefits only, no examples or quotations', 'Your own words where you can'], model: 'The market no longer floods when it rains. Customers have returned because the bad smell is gone.' },
            { type: 'choice', q: 'What should a summary sentence contain?', options: ['One main point, in your own words where possible', 'Every example from the paragraph', 'Your opinion', 'Two or three points joined with “and”'], answer: 0, why: 'One clear point per sentence is what the question asks for.' }
          ]
        }
      ]
    },
    {
      title: 'Continuous writing',
      lessons: [
        {
          id: 'waec-letters', title: 'Formal, informal and semi-formal letters', minutes: 7,
          cards: [
            { title: 'Formal letter', body: 'Write to an official or someone you do not know: your address and the date at the top right, the receiver’s title and address on the left, “Dear Sir,” or “Dear Madam,”, a heading that states the subject, short clear paragraphs, then “Yours faithfully,” with your signature and full name.' },
            { title: 'Informal letter', body: 'Write to a friend or relative: your address and the date only, a warm greeting such as “Dear Ada,”, a friendly opening, the purpose, and an ending such as “Your loving friend,” with your first name.' },
            { title: 'Semi-formal letter', body: 'Write to someone you know but respect, such as a teacher or family friend: “Dear Mr Okafor,”, polite but warm language, and “Yours sincerely,” with your full name.' },
            { title: 'Formal style', body: 'In formal letters write words in full and avoid slang.', examples: [{ text: 'I am writing to request permission to start a reading club.', good: true }, { text: 'I’m writing ’cos we wanna start a club.', good: false }] }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a formal letter in order.', parts: ['Your address and the date', 'The receiver’s title and address', 'Dear Sir,', 'A heading that states the subject', 'The body paragraphs', 'Yours faithfully, signature and full name'], why: 'This is the usual layout of a formal letter in WAEC and NECO answers.' },
            { type: 'choice', q: 'You are writing to the Chairman of your Local Government. Which ending fits?', options: ['Yours faithfully,', 'Your loving friend,', 'Cheers,', 'See you soon,'], answer: 0, why: 'A formal letter to an official ends with “Yours faithfully,”.' },
            { type: 'choice', q: 'Which opening suits an informal letter to your cousin?', options: ['Dear Chidi, how are you and everyone at home?', 'Dear Sir, I write to complain…', 'To whom it may concern,', 'The Principal, sir,'], answer: 0, why: 'An informal letter opens warmly by name.' },
            { type: 'error', q: 'Which part is wrong for a formal letter?', parts: ['I am writing to', 'request permission', 'to use the hall,', 'coz we need space.'], answer: 3, fix: 'because we need space.', why: '“Coz” is slang. Formal letters use full, standard words.' },
            { type: 'write', kind: 'letter-formal', q: 'Write a formal letter to your principal asking for permission to start a reading club. Include a greeting, a heading, three short paragraphs and a formal ending.', minWords: 120, maxWords: 300, checklist: ['Greeting: “Dear Sir,” or “Dear Madam,”', 'A heading that states the subject', 'Purpose in the first paragraph', 'Details: when, where and who', 'Ending: “Yours faithfully,” and your full name'], model: 'Dear Sir,\n\nREQUEST TO START A READING CLUB\n\nI am writing on behalf of some students in SS2 to request permission to start a reading club in our school.\n\nThe club would meet in the library every Wednesday from 3pm to 4pm, after lessons have ended. Members would read one book each month and discuss it together. We believe this would improve our vocabulary, our comprehension and our confidence in speaking. Furthermore, it would help many of us to prepare for our English examinations.\n\nMrs Bello, our English teacher, has agreed to guide the club, and twenty students have already shown interest. Therefore, we would be grateful if you could approve our request so that we can begin next term.\n\nYours faithfully,\n\nAmina Yusuf\nSS2 Science' }
          ]
        },
        {
          id: 'waec-essays', title: 'Argumentative essays, speeches and articles', minutes: 7,
          cards: [
            { title: 'Argumentative essay', body: 'Take one side and state it in the introduction. Give three or more points, each in its own paragraph with a reason and an example. Mention the other side briefly and answer it. End by restating your position.' },
            { title: 'Speech', body: 'A speech is written to be heard. Address the audience at the start, for example “The Principal, members of staff and my fellow students,”, use a title, speak to them directly, and end with “Thank you for listening.”' },
            { title: 'Article', body: 'An article for a newspaper or magazine needs a catchy title and is usually signed with the writer’s name. Write in clear paragraphs for a general reader.' },
            { title: 'Common mistakes', body: 'No title for an article, no salutation for a speech (“The Principal, teachers and fellow students…”), and taking both sides in an argumentative essay that asks you to choose.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening suits a speech at your school’s prize-giving day?', options: ['The Principal, members of staff, parents and my fellow students,', 'Dear Sir,', 'Once upon a time,', 'Yours faithfully,'], answer: 0, why: 'A speech begins by addressing the audience.' },
            { type: 'choice', q: 'Where should you state your position in an argumentative essay?', options: ['In the introduction', 'Only in the last sentence', 'Nowhere, the reader should guess', 'In a footnote'], answer: 0, why: 'Say clearly which side you support at the start, then prove it.' },
            { type: 'choice', q: 'Which is the best topic sentence for a paragraph against social media for students?', options: ['Social media can distract students from their studies.', 'I have a phone.', 'Many people use Facebook and other apps.', 'Social media.'], answer: 0, why: 'A topic sentence states the paragraph’s main point and links to the argument.' },
            { type: 'choice', q: 'How should you treat the opposing view?', options: ['Mention it briefly and explain why your side is stronger', 'Ignore it completely', 'Agree with it in the conclusion', 'Spend most of the essay on it'], answer: 0, why: 'Answering the other side shows you have thought about the issue and makes your argument stronger.' },
            { type: 'write', kind: 'essay', minParagraphs: 2, q: 'Write the introduction and one body paragraph for: “Social media does more harm than good to students.”', minWords: 100, maxWords: 260, checklist: ['State your side in the introduction', 'One clear point in the body paragraph', 'A reason and an example', 'Linking words such as “however” or “for example”'], model: 'Social media is now part of every student’s life, from WhatsApp groups to TikTok videos. While it helps young people stay in touch and share ideas, I strongly believe that it does more harm than good to students.\n\nFirstly, social media distracts students from their studies. Many students check their phones every few minutes, even while doing homework. For example, a student who means to study for an hour may spend half of that time scrolling. As a result, assignments take longer and are done less carefully. In addition, late-night chatting leaves many students tired in class the next morning. Therefore, the time spent online often comes from time that should be spent learning and resting.' }
          ]
        },
        {
          id: 'waec-narrative', title: 'Narrative and descriptive essays', minutes: 7,
          cards: [
            { title: 'Narrative essays', body: 'Tell a story, usually in the first person and the past tense: “Write a story that ends with: ‘…and that was the last time I ever told a lie.’” Plan a clear beginning, a problem, a climax and an ending that matches the given line exactly.' },
            { title: 'Descriptive essays', body: 'Describe a person, place or event so the reader can picture it: “Describe your school’s inter-house sports.” Organise by space, time or importance, and use the senses.' },
            { title: 'What examiners reward', body: 'Content that answers the question, clear organisation into paragraphs, varied and accurate expression, and correct grammar and spelling. Keep to the length the question gives.', examples: [{ text: 'A clear sequence of paragraphs, each with one stage of the story.', good: true }] },
            { title: 'Common mistakes', body: 'Changing the given ending line, drifting from the topic, writing one long paragraph, switching tenses, and memorised essays that do not fit the question.' }
          ],
          exercises: [
            { type: 'choice', q: 'A story must end with a given sentence. What should you do?', options: ['Use the sentence exactly as the final line', 'Change it slightly', 'Put it in the middle', 'Leave it out'], answer: 0, why: 'Changing the given line loses marks.' },
            { type: 'choice', q: 'Which tense suits most narrative essays?', options: ['The past tense', 'The future tense', 'The imperative', 'Mixed tenses'], answer: 0, why: 'Stories are usually told in the past.' },
            { type: 'choice', q: 'What should a descriptive essay use?', options: ['Details from the senses, in a clear order', 'A list of facts with no order', 'Only dialogue', 'Arguments for and against'], answer: 0, why: 'Sensory detail and order help the reader picture it.' },
            { type: 'error', q: 'Find the tense error.', parts: ['When we arrived,', 'the hall was full,', 'and the principal starts', 'his speech.'], answer: 2, fix: 'and the principal started', why: 'Keep the past tense throughout.' },
            { type: 'gap', q: 'The athletes ___ round the track as the crowd cheered.', options: ['sprinted', 'went', 'did', 'were going on'], answer: 0, why: 'A precise verb makes the description vivid.' },
            { type: 'write', kind: 'essay', q: 'Write a story (about 3 to 4 paragraphs here) that ends with: “…and that was the last time I ever told a lie.”', minWords: 120, maxWords: 300, checklist: ['A clear beginning, problem and climax', 'Past tense throughout', 'Paragraphs', 'The given ending as the final line'], model: 'When I was twelve, I broke my father’s radio. I had been trying to find a football commentary, but I turned the dial so hard that it snapped off.\n\nWhen my father came home, he asked who had touched the radio. Without thinking, I said that my little brother had been playing with it. As a result, my brother was not allowed to watch television for a week.\n\nHowever, the guilt grew every day. My brother kept saying he was innocent, and I could not look at him. Finally, on Sunday evening, I went to my father and told him the truth.\n\nHe was disappointed, but he thanked me for being honest. He also made me apologise to my brother and share my pocket money with him for a month, and that was the last time I ever told a lie.' }
          ]
        }
      ]
    },
    {
      title: 'Oral English',
      lessons: [
        {
          id: 'waec-sounds', title: 'Vowel and consonant sounds', minutes: 5,
          cards: [
            { title: 'Sound, not spelling', body: 'In oral English, match words by how they sound. The same letters can make different sounds, and different letters can make the same sound.', examples: [{ text: 'feet, seat, key: the same long vowel /iː/', good: true }, { text: 'ship, sugar, nation: the same first sound /ʃ/', good: true }] },
            { title: 'Long and short vowels', body: 'Some pairs differ only in vowel length. Listen to them with the Listen button on any word page.', examples: [{ text: 'ship /ɪ/ and sheep /iː/', good: true }, { text: 'full /ʊ/ and fool /uː/', good: true }] },
            { title: '“th” has two sounds', body: '“think” and “thin” have /θ/ (no voice). “this” and “then” have /ð/ (with voice).' },
            { title: 'Common mistakes', body: 'Judging sounds by spelling, mixing up /ɪ/ and /iː/ (ship, sheep), and pronouncing “th” as /t/ or /d/ in every word.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which word has the same vowel sound as “seat”?', options: ['feet', 'sit', 'set', 'sat'], answer: 0, why: '“Seat” and “feet” both have the long vowel /iː/.' },
            { type: 'choice', q: 'Which word has the same vowel sound as “ship”?', options: ['fit', 'feet', 'fate', 'fight'], answer: 0, why: '“Ship” and “fit” both have the short vowel /ɪ/.' },
            { type: 'choice', q: 'Which word has the same vowel sound as “cut”?', options: ['blood', 'boot', 'put', 'coat'], answer: 0, why: '“Cut” and “blood” both have /ʌ/, even though they are spelled differently.' },
            { type: 'choice', q: 'Which word begins with the same sound as “ship”?', options: ['sugar', 'sip', 'chip', 'zip'], answer: 0, why: '“Sugar” begins with /ʃ/, the same sound as “sh” in “ship”.' },
            { type: 'choice', q: 'Which word begins with /θ/, the sound in “think”?', options: ['thin', 'this', 'tin', 'then'], answer: 0, why: '“Thin” has /θ/. “This” and “then” have the voiced sound /ð/.' },
            { type: 'choice', q: 'In which word is the “b” silent?', options: ['climb', 'number', 'rubber', 'table'], answer: 0, why: 'In “climb” the final “b” is not pronounced.' }
          ]
        },
        {
          id: 'waec-stress', title: 'Word stress and emphatic stress', minutes: 5,
          cards: [
            { title: 'Word stress', body: 'In a word of two or more syllables, one syllable is said more strongly. Capital letters show it here.', examples: [{ text: 'PHO-to-graph, pho-TO-gra-pher, pho-to-GRAPH-ic', good: true }, { text: 'ed-u-CA-tion', good: true }] },
            { title: 'Noun or verb?', body: 'Some two-syllable words are stressed on the first syllable as nouns and the second as verbs.', examples: [{ text: 'a PRE-sent (noun) / to pre-SENT (verb)', good: true }, { text: 'a RE-cord (noun) / to re-CORD (verb)', good: true }] },
            { title: 'Emphatic stress', body: 'Stressing one word in a sentence answers a particular question.', examples: [{ text: 'TUNDE bought the car. (Who bought the car?)', good: true }, { text: 'Tunde bought the CAR. (What did Tunde buy?)', good: true }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which syllable is stressed in “education”?', options: ['ED-u-ca-tion', 'ed-U-ca-tion', 'ed-u-CA-tion', 'ed-u-ca-TION'], answer: 2, why: 'Words ending in “-tion” are stressed on the syllable just before it: ed-u-CA-tion.' },
            { type: 'choice', q: '“She will present the prizes.” How is “present” stressed here?', options: ['pre-SENT', 'PRE-sent'], answer: 0, why: 'Here “present” is a verb, so the stress falls on the second syllable.' },
            { type: 'choice', q: 'Which is stressed correctly?', options: ['pho-TO-gra-pher', 'PHO-to-gra-pher', 'pho-to-GRA-pher', 'pho-to-gra-PHER'], answer: 0, why: '“Photographer” is stressed on the second syllable: pho-TO-gra-pher.' },
            { type: 'choice', q: '“TUNDE bought the car.” Which question does this answer?', options: ['Who bought the car?', 'What did Tunde buy?', 'Did Tunde sell the car?', 'When did Tunde buy the car?'], answer: 0, why: 'The stress is on “Tunde”, so it answers “Who?”.' },
            { type: 'choice', q: '“Tunde bought the CAR.” Which question does this answer?', options: ['What did Tunde buy?', 'Who bought the car?', 'Did Tunde steal the car?', 'Where is the car?'], answer: 0, why: 'The stress is on “car”, so it answers “What did he buy?”.' }
          ]
        },
        {
          id: 'waec-intonation', title: 'Intonation and rhymes', minutes: 6,
          cards: [
            { title: 'Falling intonation', body: 'The voice falls at the end of statements (I live in Kano.), commands (Close the door.), and questions starting with a question word (Where do you live?).' },
            { title: 'Rising intonation', body: 'The voice rises at the end of yes/no questions (Are you ready?), and on items before the last one in a list (bread, eggs, and milk: rise, rise, fall).' },
            { title: 'Rhymes', body: 'Words rhyme when their last vowel sound and any final consonant sound are the same, whatever the spelling.', examples: [{ text: 'said / bread, through / blue, cough / off, hair / wear', good: true }, { text: 'cough / bough (different vowel sounds)', good: false }] },
            { title: 'Common mistakes', body: 'Judging rhymes by spelling (“cough” and “through” look alike but do not rhyme), and using rising intonation on every question.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which intonation does “Where are you going?” usually take?', options: ['Falling', 'Rising', 'Flat', 'Rising then falling on every word'], answer: 0, why: 'Questions with a question word usually fall.' },
            { type: 'choice', q: 'Which intonation does “Have you eaten?” usually take?', options: ['Rising', 'Falling', 'Flat', 'None'], answer: 0, why: 'Yes/no questions usually rise.' },
            { type: 'choice', q: 'Which word rhymes with “said”?', options: ['bread', 'paid', 'side', 'seed'], answer: 0, why: '“Said” and “bread” share the same vowel sound /e/ and final /d/.' },
            { type: 'choice', q: 'Which word rhymes with “blue”?', options: ['through', 'though', 'tough', 'bough'], answer: 0, why: '“Through” and “blue” end in the same /uː/ sound.' },
            { type: 'choice', q: 'Which word rhymes with “hair”?', options: ['wear', 'hear', 'here', 'her'], answer: 0, why: '“Hair” and “wear” share the same vowel sound.' },
            { type: 'choice', q: 'Which intonation does “Sit down.” (a command) take?', options: ['Falling', 'Rising', 'Flat', 'Rising sharply'], answer: 0, why: 'Commands usually fall.' },
            { type: 'choice', q: 'Which pair does NOT rhyme?', options: ['cough / bough', 'cough / off', 'bread / said', 'blue / through'], answer: 0, why: '“Cough” has the vowel in “off”; “bough” rhymes with “cow”.' }
          ]
        }
      ]
    },
    {
      title: 'Exam strategy',
      lessons: [
        {
          id: 'waec-habits', title: 'Exam-day habits', minutes: 3,
          cards: [
            { title: 'Obey the instructions', body: 'Instructions such as “Answer one question only from this section” are part of the test. Answering extra questions does not earn extra marks and wastes time.' },
            { title: 'Share your time', body: 'Before you start, decide roughly how long each section gets, and leave five minutes at the end to read your work again and correct mistakes in spelling, punctuation and concord.' },
            { title: 'Common mistakes', body: 'Spending too long on one question, answering more questions than the instructions allow, writing a draft but not a final copy, and leaving answers blank in the objective paper.' }
          ],
          exercises: [
            { type: 'choice', q: 'The paper says: “Answer TWO questions from this section.” What do you do?', options: ['Answer exactly two questions', 'Answer all of them to be safe', 'Answer one very long question', 'Answer three and cross one out'], answer: 0, why: 'Follow the instruction exactly. Extra answers are not marked as a bonus.' },
            { type: 'choice', q: 'What is the best use of the last five minutes?', options: ['Read your work again and fix errors', 'Start a new essay', 'Rewrite everything neatly', 'Leave the hall early'], answer: 0, why: 'A final read catches spelling, punctuation and concord mistakes that cost marks.' },
            { type: 'choice', q: 'You do not know the answer to an objective question. What is sensible?', options: ['Rule out options you know are wrong, choose the best one and move on', 'Spend ten minutes on it', 'Leave the whole section', 'Choose two options'], answer: 0, why: 'Eliminating wrong options improves your chances, and moving on protects your time for other questions.' },
            { type: 'choice', q: 'You are stuck on an objective question. What should you do?', options: ['Mark your best guess, note it and come back if time allows', 'Spend 20 minutes on it', 'Leave the exam', 'Skip all remaining questions'], answer: 0, why: 'Keep moving; time is limited.' },
            { type: 'choice', q: 'The instruction says “Answer one question only”. You answer two. What happens?', options: ['You may lose marks or only one may be marked', 'You get double marks', 'Nothing', 'You get a bonus'], answer: 0, why: 'Always obey the rubric.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'waec-final', title: 'Final assessment: WAEC / NECO English', minutes: 20, kind: 'final',
          cards: [
            { title: 'How this works', body: '15 exam-style questions from the whole course: concord, tenses, vocabulary, phrasal verbs, tags, reported speech, figurative language, grammatical function, letters and oral English. They are written for Lexiverse, not taken from past papers.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice like the real exam, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'gap', q: 'Neither the principal nor the teachers ___ present.', options: ['were', 'was', 'is', 'has been'], answer: 0, why: 'With “neither… nor”, the verb agrees with the nearer subject (teachers).' },
            { type: 'gap', q: 'Each of the boys ___ a bicycle.', options: ['has', 'have', 'are having', 'were having'], answer: 0, why: '“Each” is singular.' },
            { type: 'gap', q: 'I ___ him yesterday at the market.', options: ['saw', 'have seen', 'see', 'had saw'], answer: 0, why: '“Yesterday” is finished time, so use the past simple.' },
            { type: 'choice', q: 'Choose the word nearest in meaning to “candid”.', options: ['frank', 'sweet', 'careful', 'secret'], answer: 0, why: '“Candid” means honest and direct.' },
            { type: 'choice', q: 'Choose the word opposite in meaning to “scarce”.', options: ['plentiful', 'rare', 'small', 'costly'], answer: 0, why: 'Scarce means in short supply; plentiful is its opposite.' },
            { type: 'gap', q: 'The concert was ___ because the singer was ill.', options: ['called off', 'called on', 'called up', 'called in'], answer: 0, why: '“Call off” means cancel.' },
            { type: 'gap', q: 'She never complains, ___?', options: ['does she', 'doesn’t she', 'is she', 'isn’t it'], answer: 0, why: '“Never” is negative, so the tag is positive.' },
            { type: 'choice', q: '“I am hungry,” Musa said. In reported speech:', options: ['Musa said that he was hungry.', 'Musa said that I am hungry.', 'Musa says he is hungry yesterday.', 'Musa said that he is hungrier.'], answer: 0, why: 'Backshift the tense and change the pronoun.' },
            { type: 'choice', q: '“The market was an ocean of faces.” This is', options: ['a metaphor', 'a simile', 'personification', 'irony'], answer: 0, why: 'It says the market was an ocean, without “like” or “as”.' },
            { type: 'choice', q: 'In “I know where he lives”, “where he lives” is', options: ['a noun clause, object of “know”', 'an adverbial clause of place', 'an adjectival clause', 'a phrase'], answer: 0, why: 'It answers “know what?” so it is the object.' },
            { type: 'choice', q: 'Which ending suits a letter that begins “Dear Sir,”?', options: ['Yours faithfully,', 'Yours sincerely,', 'Your loving son,', 'Cheers,'], answer: 0, why: 'An unnamed reader takes “Yours faithfully”.' },
            { type: 'choice', q: 'Which address appears only in a formal letter?', options: ['The receiver’s address', 'The writer’s address', 'The date', 'None'], answer: 0, why: 'Informal and semi-formal letters omit it.' },
            { type: 'choice', q: 'Which word has the same vowel sound as “seat”?', options: ['key', 'sit', 'set', 'sat'], answer: 0, why: '“Key” and “seat” share the long /iː/ sound.' },
            { type: 'choice', q: 'Which word is stressed on the second syllable?', options: ['beGIN', 'TAble', 'WAter', 'HAPpy'], answer: 0, why: '“Begin” is stressed on “gin”.' },
            { type: 'choice', q: 'Which intonation does “Is it raining?” take?', options: ['Rising', 'Falling', 'Flat', 'None'], answer: 0, why: 'Yes/no questions usually rise.' }
          ]
        }
      ]
    }
  ]
};
