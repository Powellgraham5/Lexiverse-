// Exam preparation: JAMB (UTME) Use of English. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse in the style of the UTME Use of English paper. They are not official JAMB questions. Check the current JAMB syllabus and brochure for your year, including the recommended text.',
  guide: [
    'Start with the exam at a glance, then work through comprehension, lexis and structure, oral forms and the recommended text.',
    'Every question is in the UTME style but written for Lexiverse. Read every explanation, even when you are right.',
    'The UTME is computer-based, so finish with CBT strategy and take the practice test with the timer on.',
    'Save every rule you miss to your notebook and revise it weekly.',
    'Read the novel set for your year more than once: questions come from it.'
  ],
  improve: [
    'Answer twenty lexis and structure questions a day and review every mistake.',
    'Read the recommended text twice: once for the story, once making notes on characters and events.',
    'Read a newspaper article daily and find three words you could be asked a synonym for.',
    'Practise on a computer under time pressure, so the CBT format feels normal.',
    'Say difficult words aloud and check their stress and vowel sounds in a dictionary.',
    'Keep an error log and test yourself on it every Sunday.'
  ],
  units: [
    {
      title: 'The exam at a glance',
      lessons: [
        {
          id: 'jamb-intro', title: 'The UTME Use of English paper', minutes: 5, kind: 'intro',
          cards: [
            { title: 'What the UTME is', body: 'The Unified Tertiary Matriculation Examination, run by JAMB, is the entrance exam for Nigerian universities, polytechnics and colleges of education. Use of English is compulsory for every candidate.' },
            { title: 'A computer-based test', body: 'The UTME is taken on a computer at an accredited centre. You choose answers with the mouse or keyboard and can move between questions. Check the current JAMB brochure for the number of questions and the time.' },
            { title: 'What it tests', body: 'Comprehension and cloze passages, lexis and structure (vocabulary, grammar, sentence interpretation), oral forms (sounds and stress) and questions on a recommended novel set for your year.' },
            { title: 'Common mistakes', body: 'Leaving the recommended text until the last week, never practising on a computer, and spending too long on one question.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which subject is compulsory for every UTME candidate?', options: ['Use of English', 'Mathematics', 'Biology', 'Literature in English'], answer: 0, why: 'Every candidate takes Use of English.' },
            { type: 'choice', q: 'How is the UTME taken?', options: ['On a computer at an accredited centre', 'On paper at home', 'Orally with an examiner', 'Online from any phone'], answer: 0, why: 'The UTME is a computer-based test.' },
            { type: 'choice', q: 'Where should you check the number of questions and the time?', options: ['The current JAMB brochure and syllabus', 'A friend’s memory', 'An old newspaper', 'Social media rumours'], answer: 0, why: 'Official documents give the current details for your year.' },
            { type: 'choice', q: 'Which area is part of the Use of English paper?', options: ['Questions on a recommended novel', 'Algebra', 'Map reading', 'Chemical equations'], answer: 0, why: 'A set text is part of the paper.' },
            { type: 'order', q: 'Put a sensible study plan in order.', parts: ['Read the syllabus and set text', 'Learn the rules in each area', 'Practise questions with explanations', 'Take timed CBT practice tests'], why: 'Know the scope, learn, practise, then test under exam conditions.' }
          ]
        }
      ]
    },
    {
      title: 'Comprehension',
      lessons: [
        {
          id: 'jamb-comprehension', title: 'Reading passages', minutes: 6,
          cards: [
            { title: 'Read for the main idea first', body: 'Read the whole passage once, then the questions, then return to the part each question is about. Answers must come from the passage, not general knowledge.' },
            { title: 'Question types', body: 'Main idea, details, the writer’s attitude, the meaning of a word as used in the passage, and inference (what the passage suggests without saying it directly).', examples: [{ text: '“Halima disagreed” suggests she believed farming could be rewarding.', good: true }] },
            { title: 'Real-life use', body: 'Reading carefully for main ideas and evidence is what university courses demand every day.' },
            { title: 'Common mistakes', body: 'Choosing an answer because it repeats words from the passage, using your own opinion, and missing words such as “not”, “only” and “most”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Why were young people leaving the village?', options: ['They thought farming was hard work with little reward', 'The village had no school', 'The city paid for their travel', 'Halima asked them to leave'], answer: 0, why: 'The passage says farming “was hard work with little reward”.', passage: 'When Halima returned to her village after university, she noticed that young people were leaving for the city in large numbers. Farming, they said, was hard work with little reward. Halima disagreed. She started a cooperative that bought fertiliser in bulk and sold the members’ yams directly to supermarkets in Abuja. Within two years, members were earning twice as much, and several young people who had left came back to join.' },
            { type: 'choice', q: 'What did Halima’s cooperative do?', options: ['Bought fertiliser in bulk and sold yams directly to supermarkets', 'Built a university', 'Moved the village to Abuja', 'Stopped growing yams'], answer: 0, why: 'Both actions are stated in the fourth sentence.', passage: 'When Halima returned to her village after university, she noticed that young people were leaving for the city in large numbers. Farming, they said, was hard work with little reward. Halima disagreed. She started a cooperative that bought fertiliser in bulk and sold the members’ yams directly to supermarkets in Abuja. Within two years, members were earning twice as much, and several young people who had left came back to join.' },
            { type: 'choice', q: 'What is the main idea of the passage?', options: ['A cooperative made farming profitable enough to bring young people back', 'Abuja supermarkets sell yams', 'University graduates should live in cities', 'Fertiliser is expensive'], answer: 0, why: 'The passage moves from the problem to Halima’s successful solution.', passage: 'When Halima returned to her village after university, she noticed that young people were leaving for the city in large numbers. Farming, they said, was hard work with little reward. Halima disagreed. She started a cooperative that bought fertiliser in bulk and sold the members’ yams directly to supermarkets in Abuja. Within two years, members were earning twice as much, and several young people who had left came back to join.' },
            { type: 'choice', q: 'As used in the passage, “in bulk” means', options: ['in large quantities', 'in small bags', 'on credit', 'secretly'], answer: 0, why: 'Buying in bulk means buying a large amount at once, usually more cheaply.', passage: 'When Halima returned to her village after university, she noticed that young people were leaving for the city in large numbers. Farming, they said, was hard work with little reward. Halima disagreed. She started a cooperative that bought fertiliser in bulk and sold the members’ yams directly to supermarkets in Abuja. Within two years, members were earning twice as much, and several young people who had left came back to join.' },
            { type: 'choice', q: 'What can be inferred about the young people who came back?', options: ['They saw that farming could now pay well', 'They failed in the city', 'They were forced to return', 'They disliked Abuja'], answer: 0, why: 'They returned after members began earning twice as much.', passage: 'When Halima returned to her village after university, she noticed that young people were leaving for the city in large numbers. Farming, they said, was hard work with little reward. Halima disagreed. She started a cooperative that bought fertiliser in bulk and sold the members’ yams directly to supermarkets in Abuja. Within two years, members were earning twice as much, and several young people who had left came back to join.' }
          ]
        },
        {
          id: 'jamb-cloze', title: 'Cloze passages', minutes: 6,
          cards: [
            { title: 'The task', body: 'A passage with numbered gaps. For each gap you choose the word that fits both the grammar and the meaning of the whole passage.' },
            { title: 'How to do it', body: 'Read the whole passage first. For each gap, decide the part of speech needed, then check the words around it, including collocations such as “make a difference”.', examples: [{ text: '“Even a short walk can make a big difference.” “Make” and “difference” go together.', good: true }] },
            { title: 'Check the logic', body: 'Some gaps need a linker (however, therefore). Read the sentences before and after to see whether the idea contrasts, adds or results.' },
            { title: 'Common mistakes', body: 'Choosing a word that fits the sentence but not the passage, ignoring collocations, and not rereading the completed passage.' }
          ],
          exercises: [
            { type: 'gap', q: 'Gap 1: Regular exercise has many ___ for students.', options: ['benefits', 'beneficial', 'benefit', 'beneficially'], answer: 0, why: 'After “many”, a plural noun is needed: benefits.', passage: 'Regular exercise has many (1) ___ for students. It improves concentration, (2) ___ stress and helps the body sleep well. Even a short walk every day can make a (3) ___ difference.' },
            { type: 'gap', q: 'Gap 2: It improves concentration, ___ stress and helps the body sleep well.', options: ['reduces', 'raises', 'reduction', 'reduce'], answer: 0, why: 'The verbs are in the present with “It”: improves, reduces, helps.', passage: 'Regular exercise has many (1) ___ for students. It improves concentration, (2) ___ stress and helps the body sleep well. Even a short walk every day can make a (3) ___ difference.' },
            { type: 'gap', q: 'Gap 3: Even a short walk every day can make a ___ difference.', options: ['big', 'tall', 'wide', 'long'], answer: 0, why: '“Make a big difference” is the natural collocation.', passage: 'Regular exercise has many (1) ___ for students. It improves concentration, (2) ___ stress and helps the body sleep well. Even a short walk every day can make a (3) ___ difference.' },
            { type: 'gap', q: 'The roads were flooded; ___, the school closed early.', options: ['consequently', 'however', 'nevertheless', 'although'], answer: 0, why: 'The school closing was a result of the flooding.' },
            { type: 'choice', q: 'What should you do first in a cloze test?', options: ['Read the whole passage', 'Fill in gap 1 immediately', 'Read only the options', 'Guess every answer'], answer: 0, why: 'The whole passage gives the meaning each gap must fit.' }
          ]
        }
      ]
    },
    {
      title: 'Lexis and structure',
      lessons: [
        {
          id: 'jamb-synonyms', title: 'Nearest and opposite in meaning', minutes: 6,
          cards: [
            { title: 'Nearest in meaning', body: 'You choose the word or phrase closest in meaning to the underlined word in a sentence. Use the sentence: the meaning must fit the context.', examples: [{ text: 'The manager was reticent about the plans: reserved, unwilling to talk.', good: true }] },
            { title: 'Opposite in meaning', body: 'Decide what the word means in the sentence, then find its opposite with the same part of speech.' },
            { title: 'Build your word bank', body: 'Learn words in families and with prefixes: un-, in-, dis- and mis- often make opposites (honest, dishonest; legible, illegible).' },
            { title: 'Common mistakes', body: 'Choosing a word that sounds similar (affect, effect), picking a synonym when the question asks for an opposite, and ignoring the context.' }
          ],
          exercises: [
            { type: 'choice', q: 'Nearest in meaning: The manager was reticent about the new plans.', options: ['reserved', 'excited', 'angry', 'certain'], answer: 0, why: '“Reticent” means unwilling to say much.' },
            { type: 'choice', q: 'Nearest in meaning: The doctor gave a lucid explanation.', options: ['clear', 'long', 'confusing', 'quick'], answer: 0, why: '“Lucid” means clear and easy to understand.' },
            { type: 'choice', q: 'Opposite in meaning: The rules here are rigid.', options: ['flexible', 'strict', 'firm', 'harsh'], answer: 0, why: '“Rigid” means fixed; its opposite is “flexible”.' },
            { type: 'choice', q: 'Opposite in meaning: The prince was known for his benevolence.', options: ['cruelty', 'kindness', 'wealth', 'wisdom'], answer: 0, why: '“Benevolence” means kindness; the opposite is cruelty.' },
            { type: 'choice', q: 'Opposite in meaning: Her handwriting is legible.', options: ['illegible', 'neat', 'readable', 'large'], answer: 0, why: 'The prefix “il-” makes the opposite: illegible.' },
            { type: 'choice', q: 'Nearest in meaning: The team’s victory was imminent.', options: ['about to happen', 'impossible', 'far away', 'surprising'], answer: 0, why: '“Imminent” means about to happen.' }
          ]
        },
        {
          id: 'jamb-interpretation', title: 'Sentence interpretation and idioms', minutes: 6,
          cards: [
            { title: 'The task', body: 'You read a sentence and choose the option that best explains its meaning. Many sentences contain an idiom or figurative expression.' },
            { title: 'Common idioms', body: 'to take the bull by the horns (face a problem directly), to turn over a new leaf (change for the better), to be in hot water (be in trouble), to burn the midnight oil (study or work late), a storm in a teacup (a lot of fuss about something small).', examples: [{ text: 'Ada burnt the midnight oil before the exam: she studied late into the night.', good: true }] },
            { title: 'Read the whole sentence', body: 'Context shows whether a phrase is literal or idiomatic. Choose the meaning that fits the situation described.' },
            { title: 'Common mistakes', body: 'Taking idioms literally, choosing an option that adds information not in the sentence, and missing negatives (“hardly”, “barely”).' }
          ],
          exercises: [
            { type: 'choice', q: '“Musa decided to take the bull by the horns and speak to the principal.” This means Musa', options: ['faced the problem directly', 'went to a farm', 'was afraid', 'avoided the principal'], answer: 0, why: 'The idiom means dealing with a difficult situation directly.' },
            { type: 'choice', q: '“After the warning, the boy turned over a new leaf.” This means he', options: ['changed his behaviour for the better', 'started a new book', 'planted a tree', 'became lazy'], answer: 0, why: '“Turn over a new leaf” means start behaving better.' },
            { type: 'choice', q: '“The argument was just a storm in a teacup.” This means', options: ['a lot of fuss about something unimportant', 'a serious fight', 'bad weather', 'a tea party'], answer: 0, why: 'The idiom describes exaggerated fuss.' },
            { type: 'choice', q: '“She is in hot water with her parents.” This means she is', options: ['in trouble', 'in the kitchen', 'feeling warm', 'on holiday'], answer: 0, why: '“In hot water” means in trouble.' },
            { type: 'choice', q: '“He had hardly sat down when the phone rang.” This means', options: ['the phone rang just after he sat down', 'he did not sit down', 'he sat for hours', 'the phone never rang'], answer: 0, why: '“Hardly… when” means one thing happened immediately after another.' },
            { type: 'choice', q: '“The candidates burnt the midnight oil.” This means they', options: ['studied late into the night', 'caused a fire', 'wasted fuel', 'slept early'], answer: 0, why: 'The idiom means working or studying late.' }
          ]
        },
        {
          id: 'jamb-structure', title: 'Grammar: concord, tenses and prepositions', minutes: 7,
          cards: [
            { title: 'Concord', body: 'The verb agrees with the head of the subject. “Each”, “every”, “either” and “neither” take singular verbs. With “neither… nor”, the verb agrees with the nearer subject.', examples: [{ text: 'The bag of oranges is on the table.', good: true }, { text: 'The bag of oranges are on the table.', good: false }] },
            { title: 'Tenses', body: 'Use the past simple with finished time (yesterday, in 2020), the present perfect for past actions linked to now (I have finished), and the past perfect for an earlier past action (had left before we arrived).' },
            { title: 'Prepositions', body: 'Learn fixed pairs: congratulate on, prefer to, accuse of, abide by, interested in, different from, comprise (no “of”), discuss (no “about”).' },
            { title: 'Common mistakes', body: '“The news are”, “I have seen him last week”, “discuss about”, “prefer rice than beans” and “married with”.' }
          ],
          exercises: [
            { type: 'gap', q: 'The news of the results ___ spread quickly.', options: ['has', 'have', 'are', 'were'], answer: 0, why: '“News” is uncountable and takes a singular verb.' },
            { type: 'gap', q: 'Neither the driver nor the passengers ___ hurt.', options: ['were', 'was', 'is', 'has'], answer: 0, why: 'The verb agrees with the nearer subject, “passengers”.' },
            { type: 'gap', q: 'By the time the police arrived, the thieves ___.', options: ['had escaped', 'have escaped', 'escape', 'are escaping'], answer: 0, why: 'The past perfect shows the earlier past action.' },
            { type: 'gap', q: 'I prefer reading ___ watching television.', options: ['to', 'than', 'over', 'from'], answer: 0, why: 'We say “prefer X to Y”.' },
            { type: 'gap', q: 'The man was accused ___ stealing a goat.', options: ['of', 'for', 'with', 'about'], answer: 0, why: 'The fixed phrase is “accused of”.' },
            { type: 'error', q: 'Choose the part with an error.', parts: ['The committee', 'discussed about', 'the matter', 'yesterday.'], answer: 1, fix: 'discussed', why: '“Discuss” takes no preposition.' },
            { type: 'gap', q: 'All candidates must abide ___ the rules of the examination.', options: ['by', 'with', 'to', 'on'], answer: 0, why: 'The fixed phrase is “abide by”.' }
          ]
        },
        {
          id: 'jamb-spelling', title: 'Spelling and word choice', minutes: 6,
          cards: [
            { title: 'Correctly spelt words', body: 'Some questions ask you to choose the correctly spelt word. Learn the common traps: accommodate (double c, double m), necessary (one c, double s), embarrass (double r, double s), occurrence, receive (e before i after c).' },
            { title: 'Commonly confused words', body: 'affect (verb) / effect (noun); principal (head) / principle (rule); stationary (not moving) / stationery (paper and pens); lose / loose; advice (noun) / advise (verb).', examples: [{ text: 'The principal explained the principle behind the new rule.', good: true }] },
            { title: 'Real-life use', body: 'Spelling errors in applications and emails make a poor impression. Spell-checkers miss confused words such as principal and principle.' },
            { title: 'Common mistakes', body: '“Accomodation”, “neccessary”, “recieve”, “seperate”, and using “advise” as a noun.' }
          ],
          exercises: [
            { type: 'choice', q: 'Choose the correctly spelt word.', options: ['accommodation', 'accomodation', 'acommodation', 'accommadation'], answer: 0, why: 'Accommodation has a double c and a double m.' },
            { type: 'choice', q: 'Choose the correctly spelt word.', options: ['necessary', 'neccessary', 'necesary', 'neccesary'], answer: 0, why: 'One c, double s: necessary.' },
            { type: 'choice', q: 'Choose the correctly spelt word.', options: ['receive', 'recieve', 'receeve', 'reseive'], answer: 0, why: '“I before e, except after c”: receive.' },
            { type: 'gap', q: 'The new law will ___ thousands of traders.', options: ['affect', 'effect', 'affection', 'effective'], answer: 0, why: '“Affect” is the verb meaning to influence.' },
            { type: 'gap', q: 'Please buy some ___ for the office: pens, paper and envelopes.', options: ['stationery', 'stationary', 'stationering', 'stationed'], answer: 0, why: '“Stationery” means writing materials.' },
            { type: 'gap', q: 'My father gave me good ___ about choosing a course.', options: ['advice', 'advise', 'advices', 'advised'], answer: 0, why: '“Advice” is the noun; it is uncountable.' }
          ]
        }
      ]
    },
    {
      title: 'Oral forms',
      lessons: [
        {
          id: 'jamb-vowels', title: 'Vowels, consonants and rhymes', minutes: 6,
          cards: [
            { title: 'Sound, not spelling', body: 'Questions ask which word has the same vowel or consonant sound as a given word, or which words rhyme. Say the words in your head; ignore the spelling.', examples: [{ text: '“Key” and “quay” sound the same; “bow” (to bend) and “cow” share a vowel sound.', good: true }] },
            { title: 'Vowel contrasts', body: 'Short and long pairs: ship /ɪ/ and sheep /iː/, full /ʊ/ and fool /uː/, cot /ɒ/ and caught /ɔː/. The vowel in “cup” /ʌ/ is also in “blood”, “love” and “country”.' },
            { title: 'Consonant contrasts', body: '/θ/ in “think”, /ð/ in “this”, /ʃ/ in “ship”, “sugar” and “nation”, /tʃ/ in “church” and “nature”, /ʒ/ in “measure” and “vision”.' },
            { title: 'Common mistakes', body: 'Matching by letters (“food” and “good” look alike but have different vowels), and forgetting silent letters (knife, debt, psychology).' }
          ],
          exercises: [
            { type: 'choice', q: 'Which word has the same vowel sound as “cup”?', options: ['love', 'cop', 'cope', 'coop'], answer: 0, why: '“Cup” and “love” both have /ʌ/.' },
            { type: 'choice', q: 'Which word has the same vowel sound as “food”?', options: ['rule', 'good', 'flood', 'foot'], answer: 0, why: '“Food” and “rule” share the long /uː/; “good” and “foot” have /ʊ/.' },
            { type: 'choice', q: 'Which word contains the sound /ʒ/?', options: ['measure', 'mention', 'machine', 'match'], answer: 0, why: 'The “s” in “measure” is /ʒ/.' },
            { type: 'choice', q: 'Which word begins with /ʃ/?', options: ['sugar', 'cinema', 'chorus', 'circle'], answer: 0, why: '“Sugar” begins with the “sh” sound.' },
            { type: 'choice', q: 'Which word rhymes with “weight”?', options: ['great', 'height', 'night', 'white'], answer: 0, why: '“Weight” and “great” both end in /eɪt/.' },
            { type: 'choice', q: 'In which word is the letter “p” silent?', options: ['psychology', 'happy', 'paper', 'stop'], answer: 0, why: 'The “p” in “psychology” is not pronounced.' }
          ]
        },
        {
          id: 'jamb-stress', title: 'Word stress and emphatic stress', minutes: 6,
          cards: [
            { title: 'Word stress', body: 'One syllable in a word is stronger. Questions ask which syllable is stressed or which word has a different stress pattern. Capitals show the stressed syllable here.', examples: [{ text: 'TEAcher, beGIN, comPUter, ecoNOmic', good: true }] },
            { title: 'Patterns that help', body: 'Words ending in -tion and -sion stress the syllable before it (eduCAtion). Words ending in -ic stress the syllable before it (draMAtic). Many two-syllable nouns stress the first syllable and verbs the second (a REcord, to reCORD).' },
            { title: 'Emphatic stress', body: 'The stressed word in a sentence answers a question. “My SISTER bought the shoes” answers “Who bought the shoes?”' },
            { title: 'Common mistakes', body: 'Stressing every syllable equally, forgetting the noun and verb difference, and choosing the stressed word in a sentence by its position instead of its meaning.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which syllable is stressed in “photography”?', options: ['the second: phoTOgraphy', 'the first: PHOtography', 'the third: photoGRAphy', 'the last: photograPHY'], answer: 0, why: '“Photography” is stressed on the second syllable.' },
            { type: 'choice', q: 'Which word is stressed on the first syllable?', options: ['TEAcher', 'beGIN', 'toDAY', 'aGREE'], answer: 0, why: '“Teacher” has first-syllable stress.' },
            { type: 'choice', q: '“The workers will proTEST tomorrow.” Here “protest” is', options: ['a verb', 'a noun', 'an adjective', 'an adverb'], answer: 0, why: 'Second-syllable stress shows the verb.' },
            { type: 'choice', q: 'Which word is stressed on the syllable before “-ic”?', options: ['ecoNOmic', 'Economic', 'econoMIC', 'eCOnomic'], answer: 0, why: 'Words ending in -ic stress the syllable before it.' },
            { type: 'choice', q: '“My SISTER bought the shoes.” Which question does this answer?', options: ['Who bought the shoes?', 'What did your sister buy?', 'Did your sister sell the shoes?', 'Where are the shoes?'], answer: 0, why: 'Stress on “sister” answers “who”.' },
            { type: 'choice', q: '“My sister bought the SHOES.” Which question does this answer?', options: ['What did your sister buy?', 'Who bought the shoes?', 'Did your sister borrow the shoes?', 'When did she buy them?'], answer: 0, why: 'Stress on “shoes” answers “what”.' }
          ]
        }
      ]
    },
    {
      title: 'The recommended text',
      lessons: [
        {
          id: 'jamb-novel', title: 'Studying the recommended novel', minutes: 6,
          cards: [
            { title: 'Know which book', body: 'JAMB sets a novel for Use of English, and it can change. Check the current syllabus or brochure, get the book early and read it at least twice.' },
            { title: 'What questions ask', body: 'Who said or did something, the order of events, why characters act as they do, the setting, themes and the meaning of key incidents. Questions reward detailed knowledge of the story.' },
            { title: 'How to study it', body: 'Keep a notebook: a list of characters with one line each, a chapter-by-chapter summary, important quotations and the main themes. Test yourself with a friend.', examples: [{ text: 'Chapter 3: the narrator moves to Lagos and meets her uncle for the first time.', good: true }] },
            { title: 'Common mistakes', body: 'Reading only a summary, confusing minor characters, studying last year’s book, and leaving the novel until the final week.' }
          ],
          exercises: [
            { type: 'choice', q: 'Where should you check which novel is set for your year?', options: ['The current JAMB syllabus or brochure', 'Last year’s list', 'A random website', 'Your neighbour'], answer: 0, why: 'The set text can change, so use the official current list.' },
            { type: 'choice', q: 'Why read the novel more than once?', options: ['Questions test detailed knowledge of events and characters', 'It is very short', 'To memorise the cover', 'It is not necessary'], answer: 0, why: 'Detail questions need close knowledge of the story.' },
            { type: 'choice', q: 'What is the most useful study aid?', options: ['Your own chapter summaries and character list', 'Only the back cover', 'A film of a different book', 'Guessing in the exam'], answer: 0, why: 'Your own notes help you remember details.' },
            { type: 'choice', q: 'A question asks why a character acted in a certain way. What is it testing?', options: ['Understanding of motivation', 'Spelling', 'Word stress', 'Punctuation'], answer: 0, why: 'Motivation questions ask why characters do things.' },
            { type: 'order', q: 'Put the steps for studying the novel in order.', parts: ['Read the whole book for the story', 'Read again, making chapter notes', 'Make a character list and note themes', 'Test yourself with questions'], why: 'From understanding to detailed notes to practice.' },
            { type: 'gap', q: 'The ___ of a novel is the time and place in which it happens.', options: ['setting', 'theme', 'plot', 'narrator'], answer: 0, why: 'Setting is time and place.' }
          ]
        }
      ]
    },
    {
      title: 'CBT strategy',
      lessons: [
        {
          id: 'jamb-cbt', title: 'Computer-based test strategy', minutes: 5,
          cards: [
            { title: 'Before the day', body: 'Practise on a computer so using the mouse and moving between questions feels normal. Know your centre, arrive early, and bring only what the rules allow.' },
            { title: 'During the test', body: 'Answer the easy questions first, then return to the harder ones. Keep an eye on the timer on screen. Read every option before you choose.', examples: [{ text: 'Skip a hard question, answer the rest, then come back.', good: true }] },
            { title: 'Before you submit', body: 'Check that every question has an answer and review any you were unsure about. Do not submit early with time left unless you have checked everything.' },
            { title: 'Common mistakes', body: 'Spending too long on one question, panicking about the computer, leaving questions unanswered, and submitting without checking.' }
          ],
          exercises: [
            { type: 'choice', q: 'You meet a very hard question early. What should you do?', options: ['Move on and come back to it later', 'Spend ten minutes on it', 'Submit the test', 'Leave the hall'], answer: 0, why: 'Answer the questions you know first.' },
            { type: 'choice', q: 'How can you get used to the CBT format?', options: ['Practise questions on a computer', 'Only read textbooks', 'Practise on paper only', 'Ignore it'], answer: 0, why: 'Computer practice makes the real test feel familiar.' },
            { type: 'choice', q: 'What should you check before submitting?', options: ['That every question has an answer', 'The screen brightness', 'Your name only', 'Nothing'], answer: 0, why: 'Unanswered questions score nothing.' },
            { type: 'choice', q: 'Why read every option before choosing?', options: ['A later option may be more accurate', 'It wastes time', 'The first option is always right', 'It is not allowed'], answer: 0, why: 'Distractors can look right until you see the best answer.' },
            { type: 'choice', q: 'There are ten minutes left and you have finished. What should you do?', options: ['Review the questions you were unsure about', 'Submit at once without checking', 'Close your eyes', 'Change every answer'], answer: 0, why: 'Use spare time to check.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'jamb-final', title: 'Final assessment: JAMB Use of English', minutes: 20, kind: 'final',
          cards: [
            { title: 'How this works', body: '15 UTME-style questions from the whole course: comprehension, cloze, synonyms and antonyms, interpretation, grammar, spelling and oral forms. They are written for Lexiverse, not official JAMB questions.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed CBT-style practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'What problem did Halima notice?', options: ['Young people were leaving the village for the city', 'The yams were diseased', 'Supermarkets were closing', 'There was no university'], answer: 0, why: 'The first sentence states the problem.', passage: 'When Halima returned to her village after university, she noticed that young people were leaving for the city in large numbers. Farming, they said, was hard work with little reward. Halima disagreed. She started a cooperative that bought fertiliser in bulk and sold the members’ yams directly to supermarkets in Abuja. Within two years, members were earning twice as much, and several young people who had left came back to join.' },
            { type: 'gap', q: 'Gap 1: Regular exercise has many ___ for students.', options: ['benefits', 'benefit', 'beneficial', 'benefited'], answer: 0, why: 'After “many”, use the plural noun.', passage: 'Regular exercise has many (1) ___ for students. It improves concentration, (2) ___ stress and helps the body sleep well. Even a short walk every day can make a (3) ___ difference.' },
            { type: 'choice', q: 'Nearest in meaning: Her answer was lucid.', options: ['clear', 'wrong', 'brief', 'loud'], answer: 0, why: '“Lucid” means clear.' },
            { type: 'choice', q: 'Opposite in meaning: The rules are rigid.', options: ['flexible', 'strict', 'old', 'written'], answer: 0, why: '“Rigid” means fixed; its opposite is flexible.' },
            { type: 'choice', q: '“He is in hot water with the police.” This means he is', options: ['in trouble', 'swimming', 'cooking', 'safe'], answer: 0, why: '“In hot water” means in trouble.' },
            { type: 'gap', q: 'The news ___ very encouraging.', options: ['was', 'were', 'are', 'have been'], answer: 0, why: '“News” takes a singular verb.' },
            { type: 'gap', q: 'Neither the teacher nor the pupils ___ present.', options: ['were', 'was', 'is', 'has'], answer: 0, why: 'The verb agrees with the nearer subject, “pupils”.' },
            { type: 'gap', q: 'I prefer rice ___ beans.', options: ['to', 'than', 'from', 'over than'], answer: 0, why: '“Prefer X to Y.”' },
            { type: 'error', q: 'Choose the part with an error.', parts: ['The students', 'discussed about', 'their results', 'after school.'], answer: 1, fix: 'discussed', why: '“Discuss” takes no preposition.' },
            { type: 'choice', q: 'Choose the correctly spelt word.', options: ['embarrass', 'embarass', 'emberrass', 'embarras'], answer: 0, why: 'Double r and double s: embarrass.' },
            { type: 'gap', q: 'The principal explained the ___ behind the rule.', options: ['principle', 'principal', 'principality', 'principled'], answer: 0, why: 'A principle is a basic rule or idea.' },
            { type: 'choice', q: 'Which word has the same vowel sound as “cup”?', options: ['blood', 'cop', 'cape', 'coup'], answer: 0, why: '“Blood” has /ʌ/ like “cup”.' },
            { type: 'choice', q: 'Which word begins with /ʃ/?', options: ['sugar', 'circle', 'chorus', 'cinema'], answer: 0, why: '“Sugar” begins with the “sh” sound.' },
            { type: 'choice', q: 'Which word is stressed on the second syllable?', options: ['beGIN', 'TAble', 'HAPpy', 'WAter'], answer: 0, why: '“Begin” is stressed on “gin”.' },
            { type: 'choice', q: '“My BROTHER won the prize.” Which question does this answer?', options: ['Who won the prize?', 'What did your brother win?', 'Did your brother lose?', 'When was the prize?'], answer: 0, why: 'Stress on “brother” answers “who”.' }
          ]
        }
      ]
    }
  ]
};
