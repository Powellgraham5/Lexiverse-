// IELTS path. Practice material written for Lexiverse: not official IELTS questions.
export default {
  note: 'Practice questions written for Lexiverse to help you prepare. They are not official IELTS questions. Check the official IELTS website for the current test format.',
  guide: [
    'Start with the test at a glance, then work through Listening, Reading, Writing and Speaking. Each skill has several lessons.',
    'Listening tasks are read aloud by your device: listen once, as in the real test, then replay to check.',
    'Speaking tasks give you preparation and speaking timers with a checklist. Nothing is recorded.',
    'Practice questions are written for Lexiverse in IELTS style. Use official practice materials as well.',
    'Finish with topic vocabulary and the final assessment, then take the practice test timed.'
  ],
  improve: [
    'Listen to English radio or podcasts daily and write down five new phrases.',
    'Do one timed reading passage a week (20 minutes) and review every wrong answer.',
    'Write one Task 1 and one Task 2 a week within the time limits, then check them against the band criteria.',
    'Record yourself answering Part 2 cue cards and listen for hesitations and repeated words.',
    'Build topic word lists (environment, education, technology, health) with collocations, not single words.',
    'Learn the spelling of numbers, dates, months and common names: Listening marks spelling.'
  ],
  units: [
    {
      title: 'The test at a glance',
      lessons: [
        {
          id: 'ielts-overview', title: 'Four skills, one band score', minutes: 4, kind: 'intro',
          cards: [
            { title: 'Four parts', body: 'IELTS tests Listening (about 30 minutes), Reading (60 minutes), Writing (60 minutes, two tasks) and Speaking (11 to 14 minutes, a face-to-face talk with an examiner).' },
            { title: 'Academic or General Training', body: 'Listening and Speaking are the same for everyone. Reading and Writing are different: Academic is for university study; General Training is often for work or moving abroad.' },
            { title: 'Band scores', body: 'Each skill gets a band from 0 to 9, and half bands such as 6.5 are possible. Your overall band is the average of the four, rounded to the nearest half band.' },
            { title: 'Common mistakes', body: 'Taking the wrong version (Academic or General Training), not knowing the timing of each part, and practising only one skill.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which two parts are different for Academic and General Training?', options: ['Reading and Writing', 'Listening and Speaking', 'Speaking and Writing', 'All four'], answer: 0, why: 'Listening and Speaking are the same for both. Reading and Writing differ.' },
            { type: 'choice', q: 'How long is the Writing test?', options: ['60 minutes', '30 minutes', '2 hours', '15 minutes'], answer: 0, why: 'Writing has two tasks in 60 minutes.' },
            { type: 'choice', q: 'What is the highest band score?', options: ['9', '10', '100', '7'], answer: 0, why: 'IELTS bands go from 0 to 9.' },
            { type: 'choice', q: 'How is the Speaking test done?', options: ['Face to face with an examiner', 'Written on paper', 'As a group discussion', 'By text message'], answer: 0, why: 'Speaking is a conversation with an examiner.' },
            { type: 'choice', q: 'Which version do most university applicants take?', options: ['Academic', 'General Training', 'Either, it never matters', 'Neither'], answer: 0, why: 'Universities usually ask for IELTS Academic; check the requirements of your institution.' }
          ]
        }
      ]
    },
    {
      title: 'Listening',
      lessons: [
        {
          id: 'ielts-listening', title: 'Listening for details', minutes: 6,
          cards: [
            { title: 'Read ahead', body: 'Use the time before each part to read the questions and guess what kind of answer you need: a number, a name, a date or a place.' },
            { title: 'Watch for corrections', body: 'Speakers often change their minds: “The meeting is on Tuesday. Oh, sorry, I mean Thursday.” The second answer is the one that counts.' },
            { title: 'Spelling counts', body: 'Answers with spelling mistakes are marked wrong, so practise names and common words. Here the device voice reads each recording; you can also read the transcript.' },
            { title: 'Common mistakes', body: 'Losing concentration after missing one answer, not reading ahead, and copying answers with spelling errors.' }
          ],
          exercises: [
            { type: 'listen', script: 'Good morning, Greenfield Sports Centre. Yes, the swimming class for beginners is on Tuesday evenings. Oh, sorry, I tell a lie: it moved to Thursday evenings this term, from six thirty to seven thirty.', q: 'When is the beginners’ swimming class this term?', options: ['Thursday, 6.30 to 7.30', 'Tuesday, 6.30 to 7.30', 'Thursday, 7.30 to 8.30', 'Tuesday morning'], answer: 0, why: 'The speaker corrects Tuesday to Thursday. The correction is the answer.' },
            { type: 'listen', script: 'The library card costs twelve pounds for a year, but students pay half price, so that is six pounds. You will need to bring a photo and proof of address.', q: 'How much does a student pay for a library card?', options: ['£6', '£12', '£16', '£2'], answer: 0, why: 'Students pay half of twelve pounds, which is six.' },
            { type: 'listen', script: 'My surname is Okafor. That is O, K, A, F, O, R.', q: 'Which spelling is correct?', options: ['Okafor', 'Okaphor', 'Ocafor', 'Okafo'], answer: 0, why: 'The speaker spells it: O, K, A, F, O, R.' },
            { type: 'listen', script: 'The tour leaves from the main gate at nine fifteen, not from the car park. Please arrive ten minutes early.', q: 'Where does the tour leave from?', options: ['The main gate', 'The car park', 'The ticket office', 'The bus station'], answer: 0, why: 'The speaker says “from the main gate … not from the car park”.' },
            { type: 'listen', script: 'The library opens at eight, but on Saturdays it opens an hour later.', q: 'What time does the library open on Saturdays?', options: ['9:00', '8:00', '7:00', '10:00'], answer: 0, why: 'An hour later than eight is nine.' }
          ]
        },
        {
          id: 'ielts-listen-forms', title: 'Form and note completion', minutes: 7,
          cards: [
            { title: 'What the task looks like', body: 'You complete a form, table or notes with words you hear, often in Part 1 (a conversation about everyday arrangements). Each answer has a word limit, such as “NO MORE THAN TWO WORDS AND/OR A NUMBER”.' },
            { title: 'Predict the answer type', body: 'Before the recording, read each gap and decide what it needs: a name, a number, a date, a price, a place. This tells you what to listen for.', examples: [{ text: 'Phone: ______ (a number). Day of visit: ______ (a day).', good: true }] },
            { title: 'Numbers and spelling', body: 'Speakers spell names letter by letter and say numbers in groups. Know “double” (double five = 55), the difference between thirteen and thirty, and how dates are said.' },
            { title: 'Common mistakes', body: 'Going over the word limit, misspelling words that were spelled out, writing the first number you hear when the speaker corrects it, and leaving gaps blank.' }
          ],
          exercises: [
            { type: 'listen', script: 'My name is Grace Adebayo. That’s A, D, E, B, A, Y, O.', q: 'How is the surname spelled?', options: ['Adebayo', 'Adebiyo', 'Adeboyo', 'Adabayo'], answer: 0, why: 'Listen to each letter: A, D, E, B, A, Y, O.' },
            { type: 'listen', script: 'You can call me on oh seven nine, double four, six two, eight one.', q: 'What is the phone number?', options: ['079 446 281', '079 4462 81', '079 464 281', '097 446 281'], answer: 0, why: '“Double four” means 44.' },
            { type: 'listen', script: 'The course costs fifty pounds. Actually, no, sorry, that was last year. It is sixty pounds now.', q: 'How much does the course cost now?', options: ['£60', '£50', '£15', '£16'], answer: 0, why: 'The speaker corrects the first figure.' },
            { type: 'listen', script: 'We are meeting on the fourteenth of March, at the library on Hill Street.', q: 'Where is the meeting?', options: ['the library on Hill Street', 'the school on Hill Street', 'the library on Mill Street', 'Hill Park'], answer: 0, why: 'Listen for the exact place and street name.' },
            { type: 'choice', q: 'The instruction says “NO MORE THAN TWO WORDS”. Which answer is acceptable?', options: ['city centre', 'in the city centre', 'the busy city centre', 'near the city centre area'], answer: 0, why: 'Only two words are allowed.' },
            { type: 'listen', script: 'The tour starts at a quarter to ten, so please arrive at half past nine.', q: 'What time should visitors arrive?', options: ['9:30', '9:45', '10:15', '10:30'], answer: 0, why: 'The tour starts at 9:45, but visitors should arrive at 9:30.' }
          ]
        },
        {
          id: 'ielts-listen-maps', title: 'Multiple choice and maps', minutes: 7,
          cards: [
            { title: 'Multiple choice', body: 'You will often hear words from several options. Distractors are mentioned but then rejected or changed. Listen for the final answer, not the first mention.' },
            { title: 'Maps and plans', body: 'Learn direction language: opposite, next to, between, at the end of, on your left, go past, turn right at the crossroads, in the north-east corner.', examples: [{ text: 'The café is opposite the main entrance, next to the gift shop.', good: true }] },
            { title: 'Follow the route', body: 'Find the starting point on the map before the recording starts. Move your pencil along the route as the speaker talks.' },
            { title: 'Common mistakes', body: 'Choosing an option because you heard its word, losing your place on the map, and confusing left and right when the speaker faces a different direction.' }
          ],
          exercises: [
            { type: 'listen', script: 'We thought about going to the beach, and the museum was an option too, but in the end we chose the zoo because the children love animals.', q: 'Where did they decide to go?', options: ['the zoo', 'the beach', 'the museum', 'the park'], answer: 0, why: 'The beach and museum were considered but rejected.' },
            { type: 'listen', script: 'As you come in through the main entrance, the reception desk is straight ahead. The toilets are on your left, and the lifts are just behind reception.', q: 'Where are the lifts?', options: ['behind reception', 'on the left', 'by the main entrance', 'opposite the toilets'], answer: 0, why: 'The lifts are “just behind reception”.' },
            { type: 'listen', script: 'Walk past the bank and turn right at the crossroads. The post office is the second building on your left.', q: 'Where is the post office?', options: ['after turning right, second on the left', 'next to the bank', 'at the crossroads', 'first on the right'], answer: 0, why: 'Follow each step of the route.' },
            { type: 'listen', script: 'Most students said the new library was too noisy. A few mentioned the opening hours, but noise was the main complaint.', q: 'What was the main complaint about the library?', options: ['the noise', 'the opening hours', 'the location', 'the books'], answer: 0, why: 'Opening hours were mentioned, but noise was the main complaint.' },
            { type: 'choice', q: 'What should you do before a map question starts?', options: ['Find the starting point on the map', 'Close your eyes', 'Answer randomly', 'Read the next section'], answer: 0, why: 'Knowing where you start lets you follow the route.' },
            { type: 'gap', q: 'The car park is ___ the sports hall and the library.', options: ['between', 'among', 'within', 'across'], answer: 0, why: '“Between” is used for a position with something on each side.' }
          ]
        }
      ]
    },
    {
      title: 'Reading',
      lessons: [
        {
          id: 'ielts-reading', title: 'Skimming, scanning and True / False / Not Given', minutes: 6,
          cards: [
            { title: 'Skim, then scan', body: 'Skim the passage quickly for the main idea of each paragraph. Then scan for key words, names and numbers from the question.' },
            { title: 'True, False or Not Given', body: 'True: the passage agrees with the statement. False: the passage says the opposite. Not Given: the passage does not say. Do not use your own knowledge.' },
            { title: 'The passage', body: 'Floating markets, where traders sell goods from boats, are found in several countries in Asia. They grew up in places where rivers and canals were the main roads. Today many are visited mainly by tourists, but some still serve local people, who buy fresh fruit, vegetables and cooked food early in the morning. Critics say that tourism has changed the markets, as prices have risen and some traders now sell souvenirs instead of food.' },
            { title: 'Common mistakes', body: 'Reading every word slowly, confusing False with Not Given, and using your own knowledge instead of the passage.' }
          ],
          exercises: [
            { type: 'choice', passage: 'Floating markets, where traders sell goods from boats, are found in several countries in Asia. They grew up in places where rivers and canals were the main roads. Today many are visited mainly by tourists, but some still serve local people, who buy fresh fruit, vegetables and cooked food early in the morning. Critics say that tourism has changed the markets, as prices have risen and some traders now sell souvenirs instead of food.', q: '“Floating markets began where rivers and canals were the main roads.” True, False or Not Given?', options: ['True', 'False', 'Not Given'], answer: 0, why: 'The passage says they “grew up in places where rivers and canals were the main roads”.' },
            { type: 'choice', passage: 'Floating markets, where traders sell goods from boats, are found in several countries in Asia. They grew up in places where rivers and canals were the main roads. Today many are visited mainly by tourists, but some still serve local people, who buy fresh fruit, vegetables and cooked food early in the morning. Critics say that tourism has changed the markets, as prices have risen and some traders now sell souvenirs instead of food.', q: '“All floating markets now serve only tourists.” True, False or Not Given?', options: ['False', 'True', 'Not Given'], answer: 0, why: 'The passage says “some still serve local people”, which contradicts “all … only tourists”.' },
            { type: 'choice', passage: 'Floating markets, where traders sell goods from boats, are found in several countries in Asia. They grew up in places where rivers and canals were the main roads. Today many are visited mainly by tourists, but some still serve local people, who buy fresh fruit, vegetables and cooked food early in the morning. Critics say that tourism has changed the markets, as prices have risen and some traders now sell souvenirs instead of food.', q: '“The oldest floating market is in Thailand.” True, False or Not Given?', options: ['Not Given', 'True', 'False'], answer: 0, why: 'The passage does not say where the oldest market is. Even if you know, the answer is Not Given.' },
            { type: 'choice', passage: 'Floating markets, where traders sell goods from boats, are found in several countries in Asia. They grew up in places where rivers and canals were the main roads. Today many are visited mainly by tourists, but some still serve local people, who buy fresh fruit, vegetables and cooked food early in the morning. Critics say that tourism has changed the markets, as prices have risen and some traders now sell souvenirs instead of food.', q: 'According to critics, how has tourism changed the markets?', options: ['Prices are higher and some traders sell souvenirs', 'The markets have closed', 'Boats are no longer used', 'Local people run all the stalls'], answer: 0, why: 'The last sentence mentions higher prices and souvenirs instead of food.' },
            { type: 'choice', q: 'How long is the IELTS Reading test?', options: ['60 minutes', '30 minutes', '2 hours', '20 minutes'], answer: 0, why: 'Reading lasts 60 minutes for three passages.' }
          ]
        },
        {
          id: 'ielts-headings', title: 'Matching headings', minutes: 7,
          cards: [
            { title: 'The task', body: 'You choose the best heading for each paragraph from a list. There are more headings than paragraphs, so some are not used.' },
            { title: 'Find the main idea', body: 'Read the first and last sentences of each paragraph, then decide what the whole paragraph is about. The heading matches the main idea, not a detail.', examples: [{ text: 'Paragraph about rising costs, with one example of flour: heading “A growing financial pressure”.', good: true }, { text: 'Choosing “The history of flour” because the word “flour” appears.', good: false }] },
            { title: 'Paraphrase', body: 'Headings rarely repeat the paragraph’s words. Expect synonyms: “expensive” for “costly”, “a shift in taste” for “customers changed what they buy”.' },
            { title: 'Common mistakes', body: 'Matching words instead of meaning, choosing a heading that fits only one sentence, and spending too long on one paragraph.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which heading best fits Paragraph A?', options: ['Humble beginnings', 'A change in customer taste', 'Financial pressure', 'Plans for the future'], answer: 0, why: 'Paragraph A describes how the bakery started.', passage: 'Paragraph A: The town’s first bakery opened in 1952, selling only white bread. Paragraph B: Today, more than half of its customers buy wholegrain loaves, which the bakery began making in 1998. Paragraph C: The owners say their biggest challenge is the rising price of flour, which has doubled in five years.' },
            { type: 'choice', q: 'Which heading best fits Paragraph B?', options: ['A change in customer taste', 'Humble beginnings', 'Financial pressure', 'New staff'], answer: 0, why: 'Customers now prefer wholegrain bread.', passage: 'Paragraph A: The town’s first bakery opened in 1952, selling only white bread. Paragraph B: Today, more than half of its customers buy wholegrain loaves, which the bakery began making in 1998. Paragraph C: The owners say their biggest challenge is the rising price of flour, which has doubled in five years.' },
            { type: 'choice', q: 'Which heading best fits Paragraph C?', options: ['Financial pressure', 'A change in customer taste', 'Humble beginnings', 'Award-winning bread'], answer: 0, why: 'The paragraph is about rising costs.', passage: 'Paragraph A: The town’s first bakery opened in 1952, selling only white bread. Paragraph B: Today, more than half of its customers buy wholegrain loaves, which the bakery began making in 1998. Paragraph C: The owners say their biggest challenge is the rising price of flour, which has doubled in five years.' },
            { type: 'choice', q: 'Why are there more headings than paragraphs?', options: ['Some headings are distractors', 'You must use every heading twice', 'It is a printing error', 'Two headings go with each paragraph'], answer: 0, why: 'Extra headings test whether you really understand each paragraph.' },
            { type: 'choice', q: 'Where is the main idea of a paragraph often found?', options: ['In the first or last sentence', 'Only in the middle', 'In the title of the passage', 'In the questions'], answer: 0, why: 'Topic sentences usually open or close a paragraph.' },
            { type: 'choice', q: 'A heading uses the word “costly”. Which word in a paragraph might match it?', options: ['expensive', 'cheap', 'quick', 'healthy'], answer: 0, why: 'Headings paraphrase; costly means expensive.' }
          ]
        },
        {
          id: 'ielts-completion', title: 'Sentence and summary completion', minutes: 7,
          cards: [
            { title: 'The task', body: 'You complete sentences or a summary with words from the passage, within a word limit. Some summary tasks give a box of words to choose from instead.' },
            { title: 'How to do it', body: 'Read the sentence, predict the type of word needed (noun, verb, number), find the part of the passage it paraphrases, then copy the exact words.', examples: [{ text: 'Sentence: “Solar lamps can give light for up to ___ hours.” Passage: “provide up to eight hours of light”. Answer: eight.', good: true }] },
            { title: 'Grammar check', body: 'Your answer must fit the sentence grammatically. Plural or singular matters.' },
            { title: 'Common mistakes', body: 'Changing the passage’s words, going over the word limit, spelling errors when copying, and answers that do not fit the grammar of the sentence.' }
          ],
          exercises: [
            { type: 'gap', q: 'Solar lamps are charged by ___ during the day.', options: ['sunlight', 'kerosene', 'batteries', 'electricity'], answer: 0, why: 'The passage says “charged by sunlight”.', passage: 'Solar lamps are now common in rural homes. They are charged by sunlight during the day and provide up to eight hours of light at night. Because they need no fuel, families save money that was once spent on kerosene, and children can study after dark. However, cheaper lamps often break within a year, so buyers are advised to choose models with a warranty.' },
            { type: 'gap', q: 'They can provide up to ___ hours of light.', options: ['eight', 'six', 'ten', 'twelve'], answer: 0, why: '“up to eight hours of light at night”.', passage: 'Solar lamps are now common in rural homes. They are charged by sunlight during the day and provide up to eight hours of light at night. Because they need no fuel, families save money that was once spent on kerosene, and children can study after dark. However, cheaper lamps often break within a year, so buyers are advised to choose models with a warranty.' },
            { type: 'gap', q: 'Families save money that used to be spent on ___.', options: ['kerosene', 'books', 'food', 'school fees'], answer: 0, why: 'The money was “once spent on kerosene”.', passage: 'Solar lamps are now common in rural homes. They are charged by sunlight during the day and provide up to eight hours of light at night. Because they need no fuel, families save money that was once spent on kerosene, and children can study after dark. However, cheaper lamps often break within a year, so buyers are advised to choose models with a warranty.' },
            { type: 'gap', q: 'Buyers should choose models that come with a ___.', options: ['warranty', 'charger', 'discount', 'manual'], answer: 0, why: '“choose models with a warranty”.', passage: 'Solar lamps are now common in rural homes. They are charged by sunlight during the day and provide up to eight hours of light at night. Because they need no fuel, families save money that was once spent on kerosene, and children can study after dark. However, cheaper lamps often break within a year, so buyers are advised to choose models with a warranty.' },
            { type: 'choice', q: 'The instruction says “ONE WORD ONLY”. Which answer breaks the rule?', options: ['solar power', 'sunlight', 'warranty', 'kerosene'], answer: 0, why: '“Solar power” is two words.' },
            { type: 'choice', q: 'Why should you check grammar after completing a sentence?', options: ['The answer must fit the sentence correctly', 'It does not matter', 'To make it longer', 'To change the passage’s words'], answer: 0, why: 'A word that breaks the grammar is likely wrong.' }
          ]
        }
      ]
    },
    {
      title: 'Writing',
      lessons: [
        {
          id: 'ielts-task1', title: 'Task 1 (Academic): describe a chart', minutes: 6,
          cards: [
            { title: 'What Task 1 asks', body: 'You describe a graph, chart, table, map or process in at least 150 words. Spend about 20 minutes. Report the information; do not give your opinion or reasons the chart does not show.' },
            { title: 'A clear shape', body: 'Paragraph 1: paraphrase what the chart shows. Paragraph 2: an overview of the main trends. Paragraphs 3 and 4: key details with numbers.', examples: [{ text: 'Overview: “Overall, firewood use fell, while gas and electricity rose.”', good: true }, { text: '“I think people stopped using firewood because it is bad.”', good: false, note: 'An opinion the chart does not show.' }] },
            { title: 'The chart', body: 'The chart shows the percentage of homes in a town that used three types of energy for cooking between 2000 and 2020. In 2000, firewood was the most common, used by 60% of homes, while gas was used by 25% and electricity by 15%. Over the twenty years, the use of firewood fell steadily to just 15%. In contrast, gas rose sharply, reaching 55% in 2020, and electricity grew gradually to 30%.' }
          ],
          exercises: [
            { type: 'choice', passage: 'The chart shows the percentage of homes in a town that used three types of energy for cooking between 2000 and 2020. In 2000, firewood was the most common, used by 60% of homes, while gas was used by 25% and electricity by 15%. Over the twenty years, the use of firewood fell steadily to just 15%. In contrast, gas rose sharply, reaching 55% in 2020, and electricity grew gradually to 30%.', q: 'Which sentence is the best overview?', options: ['Overall, firewood use fell sharply, while gas and electricity both became more common.', 'In 2000, 60% of homes used firewood.', 'Gas is the best way to cook.', 'The chart is about energy.'], answer: 0, why: 'An overview sums up the main trends without listing every number.' },
            { type: 'choice', q: 'What is the minimum length for Task 1?', options: ['150 words', '250 words', '100 words', '50 words'], answer: 0, why: 'Task 1 needs at least 150 words. Task 2 needs at least 250.' },
            { type: 'choice', q: 'Which should you NOT include in Task 1?', options: ['Your opinion about why the change happened', 'An overview', 'Key numbers', 'A paraphrase of the title'], answer: 0, why: 'Task 1 reports what the data shows. Opinions belong in Task 2.' },
            { type: 'write', kind: 'paragraph', minParagraphs: 2, passage: 'The chart shows the percentage of homes in a town that used three types of energy for cooking between 2000 and 2020. In 2000, firewood was the most common, used by 60% of homes, while gas was used by 25% and electricity by 15%. Over the twenty years, the use of firewood fell steadily to just 15%. In contrast, gas rose sharply, reaching 55% in 2020, and electricity grew gradually to 30%.', q: 'Write the first two paragraphs of a Task 1 answer for this chart: a paraphrase of what it shows, then an overview.', minWords: 50, maxWords: 120, checklist: ['Paraphrase, do not copy the description', 'An overview starting with “Overall,”', 'No opinions'], model: 'The chart illustrates how the proportion of households in a town using firewood, gas and electricity for cooking changed between 2000 and 2020.\n\nOverall, firewood became much less common over the period, whereas both gas and electricity grew in popularity. By 2020, gas had replaced firewood as the main cooking fuel, while electricity was used by almost a third of homes.' },
            { type: 'choice', q: 'Should you give your opinion in Academic Task 1?', options: ['No, describe the data objectively', 'Yes, always', 'Only at the end', 'Only if you disagree'], answer: 0, why: 'Task 1 is a factual description.' }
          ]
        },
        {
          id: 'ielts-trends', title: 'Task 1 language: trends and comparisons', minutes: 5,
          cards: [
            { title: 'Describing change', body: 'Use a verb with an adverb, or an adjective with a noun.', examples: [{ text: 'Gas use rose sharply. / There was a sharp rise in gas use.', good: true }, { text: 'Firewood use fell steadily to 15%.', good: true }, { text: 'Sales peaked at 80% in 2015 and then levelled off.', good: true }] },
            { title: 'Prepositions with numbers', body: '“Rose to 55%” gives the end point. “Rose by 30%” gives the size of the change. “From 25% to 55%” gives both.' },
            { title: 'Common mistakes', body: '“Raise” instead of “rise”, the wrong preposition (rose by 10% is the change; rose to 50% is the final figure), and listing every number.' }
          ],
          exercises: [
            { type: 'gap', q: 'Gas use rose ___ 25% in 2000 ___ 55% in 2020.', options: ['from … to', 'by … at', 'at … by', 'to … from'], answer: 0, why: '“From … to” gives the starting and ending figures.' },
            { type: 'gap', q: 'Electricity use grew ___ 15 percentage points, from 15% to 30%.', options: ['by', 'to', 'at', 'on'], answer: 0, why: '“By” gives the size of the change.' },
            { type: 'choice', q: 'Which word best describes a big, fast change?', options: ['sharply', 'slightly', 'steadily', 'gradually'], answer: 0, why: '“Sharply” means a large, quick change. “Slightly” is small; “steadily” and “gradually” are slow and even.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['The number of visitors', 'peaked on', '2 million', 'in 2018.'], answer: 1, fix: 'peaked at', why: 'We say a value “peaked at” a number.' },
            { type: 'gap', q: 'Unemployment fell ___ 8% to 5%.', options: ['from', 'at', 'on', 'by to'], answer: 0, why: '“From… to…” shows the start and end points.' }
          ]
        },
        {
          id: 'ielts-process', title: 'Task 1: processes and maps', minutes: 7,
          cards: [
            { title: 'Processes', body: 'Describe each stage in order with sequence words (first, next, then, after that, finally) and often the passive voice: “The cocoa beans are dried in the sun.” Your overview gives the number of stages and the start and end.' },
            { title: 'Maps', body: 'Compare two maps of a place at different times. Use the past and present perfect and change verbs: was replaced by, was demolished, was extended, was built, became.', examples: [{ text: 'The farmland to the north was replaced by a housing estate.', good: true }] },
            { title: 'Overview first', body: 'In both, the overview is the key: “Overall, the process has six stages, from harvesting to packaging.” or “Overall, the town became more residential.”' },
            { title: 'Common mistakes', body: 'Missing stages, no overview, active voice that invents a doer (“the workers put the beans”), and giving opinions about the changes.' }
          ],
          exercises: [
            { type: 'gap', q: 'First, the cocoa pods ___ from the trees.', options: ['are harvested', 'harvest', 'are harvesting', 'harvested'], answer: 0, why: 'Processes use the present passive: are + past participle.' },
            { type: 'choice', q: 'Which is the best overview for a process?', options: ['Overall, there are five stages, from collecting the plastic to making new bottles.', 'The process is very interesting.', 'In stage three, plastic is melted.', 'I think recycling is good.'], answer: 0, why: 'It gives the number of stages and the start and end.' },
            { type: 'gap', q: 'Between 1990 and 2020, the old factory ___ and a park was built.', options: ['was demolished', 'demolished', 'is demolishing', 'has demolish'], answer: 0, why: 'Passive past: was + past participle.' },
            { type: 'order', q: 'Put the stages of this process in order.', parts: ['The beans are harvested', 'They are dried in the sun', 'They are roasted', 'They are ground into powder'], why: 'Follow the process from start to finish.' },
            { type: 'choice', q: 'Which sentence suits a map description?', options: ['A new road was built to the east of the school.', 'The new road is a great idea.', 'I would prefer more trees.', 'Maps are useful.'], answer: 0, why: 'It describes a change objectively.' },
            { type: 'error', q: 'Find the error.', parts: ['After that,', 'the sugar', 'are mixed', 'with water.'], answer: 2, fix: 'is mixed', why: '“Sugar” is uncountable, so the verb is singular.' }
          ]
        },
        {
          id: 'ielts-gt-letter', title: 'General Training Task 1: the letter', minutes: 7,
          cards: [
            { title: 'The task', body: 'General Training candidates write a letter of at least 150 words in about 20 minutes. The question gives a situation and three bullet points that you must cover.' },
            { title: 'Choose the right tone', body: 'Formal (to a company or someone you do not know): Dear Sir or Madam… Yours faithfully. Semi-formal (a named person you do not know well): Dear Mr Smith… Yours sincerely. Informal (a friend): Dear Sam… Best wishes.' },
            { title: 'Cover every bullet point', body: 'Give each bullet point its own paragraph. Open with your purpose: “I am writing to complain about…”, “I am writing to ask whether…”.', examples: [{ text: 'I am writing to request information about your evening courses.', good: true }] },
            { title: 'Common mistakes', body: 'Missing a bullet point, the wrong tone for the reader, an ending that does not match the greeting, and fewer than 150 words.' }
          ],
          exercises: [
            { type: 'choice', q: 'How many words must a General Training letter have?', options: ['At least 150', 'At least 250', 'Exactly 100', 'No limit'], answer: 0, why: 'Task 1 requires at least 150 words.' },
            { type: 'choice', q: 'You are writing to a friend. Which ending fits?', options: ['Best wishes,', 'Yours faithfully,', 'Yours sincerely,', 'Respectfully,'], answer: 0, why: 'Informal letters use friendly endings.' },
            { type: 'choice', q: 'What must you do with the three bullet points?', options: ['Cover all of them, ideally one paragraph each', 'Choose one', 'Ignore them', 'Copy them word for word'], answer: 0, why: 'Missing a bullet point lowers your score.' },
            { type: 'choice', q: 'Which opening states the purpose of a formal letter?', options: ['I am writing to complain about the noise from the building site.', 'Hi! How are you?', 'Long time no see!', 'So, guess what happened.'], answer: 0, why: 'It states the purpose clearly and formally.' },
            { type: 'gap', q: 'I would be grateful if you could ___ me a refund.', options: ['give', 'gave', 'giving', 'given'], answer: 0, why: 'After “could”, use the base form.' },
            { type: 'write', kind: 'letter-formal', q: 'You bought a laptop online, but it arrived damaged. Write to the company. In your letter: describe what you bought, explain the damage, say what you want them to do.', minWords: 150, maxWords: 230, checklist: ['A formal greeting', 'Each bullet point covered', 'Formal language', 'A matching ending'], model: '14 Palm Avenue\nAccra\n3 June 2026\n\nCustomer Services\nTechWorld Online\n\nDear Sir or Madam,\n\nI am writing to complain about a laptop that I ordered from your website on 25 May. It was a Zentro 15 laptop, order number 55821, and it cost $650.\n\nWhen the parcel arrived on 1 June, the box was crushed. Furthermore, the laptop screen was cracked across one corner, and the keyboard was loose. As a result, I have not been able to use it for my work, and I have had to borrow a computer from a colleague. This is very disappointing, since your website promised careful packaging and safe delivery.\n\nI would therefore like you to collect the damaged laptop and send a replacement within seven days. If this is not possible, I would expect a full refund.\n\nI enclose photographs of the damage and a copy of my receipt. I look forward to your prompt reply.\n\nYours faithfully,\nKwame Mensah' }
          ]
        },
        {
          id: 'ielts-task2', title: 'Task 2: the essay', minutes: 7,
          cards: [
            { title: 'What Task 2 asks', body: 'You write an essay of at least 250 words in about 40 minutes. It is worth more marks than Task 1, so do not run out of time on it.' },
            { title: 'Know the question type', body: 'Opinion (“To what extent do you agree?”), discussion (“Discuss both views and give your opinion”), problem and solution, and advantages and disadvantages. Answer every part of the question.' },
            { title: 'A clear structure', body: 'Introduction: paraphrase the question and give your position. Two body paragraphs: one main idea each, explained with an example. Conclusion: restate your position.' },
            { title: 'Common mistakes', body: 'Not answering the exact question, no clear position, ideas with no examples, and a missing conclusion.' }
          ],
          exercises: [
            { type: 'choice', q: '“Some people think children should start school at age four. To what extent do you agree?” What type of question is this?', options: ['Opinion', 'Problem and solution', 'Describe a chart', 'Advantages only'], answer: 0, why: '“To what extent do you agree?” asks for your opinion.' },
            { type: 'choice', q: 'A question says “Discuss both views and give your own opinion.” What must you do?', options: ['Explain both views and say which you agree with', 'Explain only your view', 'Explain both views but give no opinion', 'Write about something else'], answer: 0, why: 'Answer every part: both views and your opinion.' },
            { type: 'choice', q: 'Which task is worth more marks?', options: ['Task 2', 'Task 1', 'They are equal', 'Neither is marked'], answer: 0, why: 'Task 2 carries more weight, so give it about 40 of your 60 minutes.' },
            { type: 'write', kind: 'essay', q: 'Write a Task 2 essay: “Some people think that young people should learn practical skills, such as cooking, at school. To what extent do you agree?”', minWords: 250, maxWords: 380, checklist: ['Introduction with your position', 'Two body paragraphs, one idea each', 'Examples', 'Conclusion that restates your view'], model: 'In many countries, school timetables are filled with academic subjects, and there is little space for practical skills such as cooking or managing money. Some people argue that schools should teach these skills as well. I strongly agree with this view, because practical skills prepare young people for independent life and also support their long-term health.\n\nFirstly, practical skills help students to become independent adults. For example, a teenager who can cook simple, healthy meals will find it far easier to live alone when they leave home for university or work. Similarly, a student who has learned how to plan a budget is less likely to fall into debt when they receive their first salary. These are lessons that many families do not have time to teach, so schools are well placed to fill the gap.\n\nSecondly, cooking lessons in particular can improve public health. When students learn how to prepare fresh food, they are less likely to depend on cheap fast food, which is often high in fat, sugar and salt. As a result, they may develop habits that protect them from illnesses such as diabetes later in life. In addition, they can share what they learn with their families at home.\n\nSome critics worry that practical lessons would take time away from important subjects such as mathematics and science. However, even one lesson a week would make a real difference without harming academic results.\n\nIn conclusion, although academic subjects remain essential, I believe schools should make room for practical skills, because they help young people to live independently and stay healthy throughout their lives.' },
            { type: 'choice', q: 'How long should you spend on Task 2?', options: ['About 40 minutes', 'About 10 minutes', 'About 20 minutes', 'Two hours'], answer: 0, why: 'Task 2 is worth more, so spend about 40 minutes on it.' }
          ]
        },
        {
          id: 'ielts-task2-types', title: 'Task 2: question types and band criteria', minutes: 8,
          cards: [
            { title: 'Question types', body: 'Opinion (To what extent do you agree?), discussion (Discuss both views and give your opinion), advantages and disadvantages, problem and solution, and two-part questions. Answer every part of the question.' },
            { title: 'The four criteria', body: 'Each worth a quarter: Task Response (answer the question fully with a clear position and developed ideas), Coherence and Cohesion (logical paragraphs and linking), Lexical Resource (range and accuracy of vocabulary) and Grammatical Range and Accuracy.' },
            { title: 'Developing ideas', body: 'Each body paragraph: a clear main idea, an explanation, and a specific example. Depth beats a long list of ideas.', examples: [{ text: 'For example, in Finland, where homework is limited, students still achieve high results.', good: true }] },
            { title: 'Common mistakes', body: 'Answering only part of a two-part question, no clear position, memorised phrases that do not fit, and under 250 words.' }
          ],
          exercises: [
            { type: 'choice', q: '“Discuss both views and give your opinion.” What must you do?', options: ['Discuss both views and state your own opinion', 'Discuss only one view', 'Give only your opinion', 'Describe a chart'], answer: 0, why: 'Every part of the question must be answered.' },
            { type: 'choice', q: 'Which criterion covers paragraphing and linking?', options: ['Coherence and Cohesion', 'Task Response', 'Lexical Resource', 'Pronunciation'], answer: 0, why: 'Coherence and Cohesion is about organisation and links.' },
            { type: 'choice', q: 'What is the minimum length for Task 2?', options: ['250 words', '150 words', '100 words', '400 words'], answer: 0, why: 'Task 2 requires at least 250 words.' },
            { type: 'choice', q: 'What makes a body paragraph strong?', options: ['A clear idea, an explanation and an example', 'Five different ideas in one sentence', 'Memorised phrases', 'Questions to the reader'], answer: 0, why: 'Development earns Task Response marks.' },
            { type: 'choice', q: '“What are the causes of traffic congestion, and what can be done?” This is', options: ['a problem and solution question', 'an opinion question', 'a discussion question', 'a process question'], answer: 0, why: 'It asks for causes (problems) and solutions.' },
            { type: 'error', q: 'Find the error.', parts: ['Many people believes', 'that technology', 'has made life', 'easier.'], answer: 0, fix: 'Many people believe', why: '“People” is plural.' }
          ]
        }
      ]
    },
    {
      title: 'Speaking',
      lessons: [
        {
          id: 'ielts-part1', title: 'Part 1: everyday questions', minutes: 6,
          cards: [
            { title: 'What happens', body: 'For four to five minutes the examiner asks about familiar topics: your home, studies or work, hobbies, food and daily routine.' },
            { title: 'Extend your answers', body: 'Answer, then add a reason or example. Two or three sentences is ideal.', examples: [{ text: 'Yes, I love cooking. I usually make jollof rice at weekends because my family enjoys it.', good: true }, { text: 'Yes.', good: false }] },
            { title: 'Natural language', body: 'Use everyday expressions and contractions: “I’d say…”, “To be honest,…”, “It depends on…”. Speak as if to a friendly stranger.' },
            { title: 'Common mistakes', body: 'One-word answers, long memorised speeches, and repeating the examiner’s exact words.' }
          ],
          exercises: [
            { type: 'choice', q: '“Do you like reading?” Which answer is best?', options: ['Yes, especially novels. I read most evenings because it helps me relax.', 'Yes.', 'Reading is the action of looking at words.', 'Do I like reading? Yes, I like reading.'], answer: 0, why: 'It answers and extends with detail and a reason.' },
            { type: 'choice', q: 'How long should a Part 1 answer usually be?', options: ['Two or three sentences', 'One word', 'Two minutes', 'Ten sentences'], answer: 0, why: 'Short but extended answers fit Part 1.' },
            { type: 'choice', q: 'Which phrase helps you give an opinion naturally?', options: ['I’d say that…', 'In conclusion, firstly…', 'Hereby I state…', 'The answer is obvious.'], answer: 0, why: 'It sounds natural in conversation.' },
            { type: 'gap', q: 'It ___ on the weather, but I usually walk to work.', options: ['depends', 'depend', 'depending', 'is depend'], answer: 0, why: '“It depends on…” is a common, natural phrase.' },
            { type: 'speak', q: 'Answer: “Tell me about your hometown.”', points: ['where it is', 'what it is like', 'one thing you like about it'], prep: 20, talk: 45, checklist: ['I answered in two to four sentences', 'I gave a detail or example', 'I spoke naturally, not from memory'] },
            { type: 'speak', q: 'Answer: “What do you usually do at weekends?”', points: ['your usual activities', 'who you spend time with', 'why you enjoy it'], prep: 20, talk: 45, checklist: ['I extended my answer with a reason', 'I used everyday language', 'I did not stop after one sentence'] }
          ]
        },
        {
          id: 'ielts-speaking', title: 'The three parts and the cue card', minutes: 7,
          cards: [
            { title: 'Three parts', body: 'Part 1 (4 to 5 minutes): questions about familiar topics such as home, work or study. Part 2 (3 to 4 minutes): a cue card; you have 1 minute to prepare and talk for up to 2 minutes. Part 3 (4 to 5 minutes): a deeper discussion linked to Part 2.' },
            { title: 'Answer fully', body: 'Do not answer with one word. Give an answer, a reason and an example.', examples: [{ text: '“Do you like cooking?” “Yes, I do, especially at weekends, because it relaxes me. Last Sunday I made jollof rice for my whole family.”', good: true }, { text: '“Do you like cooking?” “Yes.”', good: false }] },
            { title: 'Keep going', body: 'In Part 2, use your notes to cover every point on the card. If you finish early, add an example or a feeling.' },
            { title: 'Common mistakes', body: 'Stopping after 30 seconds in Part 2, ignoring points on the cue card, and memorised answers that sound unnatural.' }
          ],
          exercises: [
            { type: 'choice', q: 'How long do you get to prepare in Part 2?', options: ['1 minute', '5 minutes', 'No time', '10 seconds'], answer: 0, why: 'You get 1 minute to prepare, and you can make notes.' },
            { type: 'choice', q: '“What do you do in your free time?” Which answer is best?', options: ['I mostly play football, because it keeps me fit, and I meet my friends there every Saturday.', 'Football.', 'I don’t know.', 'Nothing much.'], answer: 0, why: 'It gives an answer, a reason and a detail.' },
            { type: 'speak', q: 'Describe a person who has helped you.', points: ['who the person is', 'how you know them', 'what they did to help you', 'and explain why you are grateful'], prep: 60, talk: 120, checklist: ['I covered every point on the card', 'I spoke for most of the two minutes', 'I gave at least one example', 'I used past tenses correctly'] },
            { type: 'choice', q: 'How long should you speak in Part 2?', options: ['Up to two minutes', '10 seconds', '10 minutes', 'Only one sentence'], answer: 0, why: 'Aim to keep talking until the examiner stops you.' },
            { type: 'choice', q: 'What should you do in the one minute of preparation?', options: ['Note key words for each point on the card', 'Write a full script', 'Sit silently', 'Ask the examiner questions'], answer: 0, why: 'Short notes guide you without reading.' }
          ]
        },
        {
          id: 'ielts-part3', title: 'Part 3: discussion, fluency and pronunciation', minutes: 7,
          cards: [
            { title: 'What happens', body: 'For four to five minutes the examiner asks more abstract questions linked to your Part 2 topic: society, causes, comparisons, the future.' },
            { title: 'Develop and compare', body: 'Give an opinion, explain it, give an example, and consider another view: “I think…, because… For instance,… Having said that, some people argue…”.', examples: [{ text: 'I think online learning will grow, because it is flexible. For instance, many workers now study at night. Having said that, younger children still need classrooms.', good: true }] },
            { title: 'Fluency and pronunciation', body: 'Fluency means speaking at length without long pauses, using fillers like “Well, let me think”. Pronunciation means being easy to understand: clear word stress, chunking, and natural rhythm. An accent is fine.' },
            { title: 'Common mistakes', body: 'Short answers to big questions, answering about yourself only when the question is about society, long silences, and trying to change your accent.' }
          ],
          exercises: [
            { type: 'choice', q: 'How are Part 3 questions different from Part 1?', options: ['They are more abstract and about society', 'They are about your name', 'They are shorter', 'They are written'], answer: 0, why: 'Part 3 is a deeper discussion.' },
            { type: 'choice', q: 'Which phrase introduces another view?', options: ['Having said that,…', 'For example,…', 'Firstly,…', 'Yes.'], answer: 0, why: 'It shows you can balance ideas.' },
            { type: 'choice', q: 'What does the Pronunciation criterion reward?', options: ['Being easy to understand', 'Having a British accent', 'Speaking very fast', 'Using long words'], answer: 0, why: 'Clarity matters, not accent.' },
            { type: 'choice', q: 'You need a moment to think. What can you say?', options: ['Well, that’s an interesting question. Let me think…', '(Silence for 20 seconds.)', 'Next question.', 'I don’t know anything.'], answer: 0, why: 'A natural filler keeps you fluent.' },
            { type: 'gap', q: 'In my view, governments ___ invest more in public transport.', options: ['should', 'shoulds', 'should to', 'must to'], answer: 0, why: 'Modal verbs take the base form without “to”.' },
            { type: 'speak', q: 'Answer: “Why do you think some young people prefer to live in cities?”', points: ['your opinion', 'a reason', 'an example', 'another view'], prep: 20, talk: 60, checklist: ['I gave an opinion and a reason', 'I gave an example', 'I considered another view', 'I spoke without long pauses'] }
          ]
        }
      ]
    },
    {
      title: 'Topic vocabulary',
      lessons: [
        {
          id: 'ielts-vocab', title: 'Topic vocabulary and collocations', minutes: 6,
          cards: [
            { title: 'Collocations', body: 'Words that naturally go together. Examiners reward them under Lexical Resource: make a decision, play a role, a major problem, heavy traffic, raise awareness, take measures.', examples: [{ text: 'Governments should take measures to reduce heavy traffic.', good: true }, { text: 'Governments should do measures to reduce strong traffic.', good: false }] },
            { title: 'Common IELTS topics', body: 'Environment (carbon emissions, renewable energy), education (academic performance, tuition fees), technology (artificial intelligence, screen time), health (a balanced diet, sedentary lifestyle), work (work-life balance, job satisfaction).' },
            { title: 'Use, do not show off', body: 'Precise, natural words score better than rare words used wrongly. Learn words in phrases, with an example sentence.' },
            { title: 'Common mistakes', body: 'Wrong collocations (“do a mistake”), memorised lists used in the wrong context, and repeating the same word throughout an essay.' }
          ],
          exercises: [
            { type: 'gap', q: 'Schools should ___ awareness of healthy eating.', options: ['raise', 'rise', 'arise', 'lift up'], answer: 0, why: '“Raise awareness” is a common collocation.' },
            { type: 'gap', q: 'Parents play an important ___ in their children’s education.', options: ['role', 'part of', 'game', 'roll'], answer: 0, why: '“Play a role” is the collocation.' },
            { type: 'gap', q: 'Many workers struggle to maintain a healthy work-life ___.', options: ['balance', 'equal', 'scale', 'weight'], answer: 0, why: '“Work-life balance” is a fixed phrase.' },
            { type: 'gap', q: 'Cities need to reduce carbon ___.', options: ['emissions', 'emotions', 'admissions', 'missions'], answer: 0, why: '“Carbon emissions” is the correct term.' },
            { type: 'error', q: 'Find the wrong collocation.', parts: ['Students often', 'do mistakes', 'when they', 'write quickly.'], answer: 1, fix: 'make mistakes', why: 'We “make” mistakes.' },
            { type: 'choice', q: 'Which phrase means a lifestyle with little physical activity?', options: ['a sedentary lifestyle', 'a balanced diet', 'job satisfaction', 'renewable energy'], answer: 0, why: '“Sedentary” means involving a lot of sitting.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'ielts-final', title: 'Final assessment: IELTS', minutes: 20, kind: 'final',
          cards: [
            { title: 'How this works', body: '15 questions from the whole course: test format, listening, reading, writing and vocabulary. They are written for Lexiverse in IELTS style, not official questions. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'How many parts does the IELTS Listening test have?', options: ['Four', 'Two', 'Three', 'Six'], answer: 0, why: 'Listening has four parts.' },
            { type: 'listen', script: 'The meeting was planned for Monday, but it has been moved to Wednesday afternoon.', q: 'When is the meeting now?', options: ['Wednesday afternoon', 'Monday', 'Wednesday morning', 'Tuesday'], answer: 0, why: 'The speaker corrects the day.' },
            { type: 'listen', script: 'The total cost is forty-five dollars, including delivery.', q: 'How much is the total cost?', options: ['$45', '$54', '$40', '$405'], answer: 0, why: 'Forty-five, including delivery.' },
            { type: 'choice', q: 'In True/False/Not Given, when do you choose Not Given?', options: ['When the passage does not say', 'When the statement is false', 'When you are unsure', 'Always'], answer: 0, why: 'Not Given means there is no information.' },
            { type: 'choice', q: 'In matching headings, what should a heading match?', options: ['The main idea of the paragraph', 'One word in the paragraph', 'The first word', 'A number'], answer: 0, why: 'Headings summarise the whole paragraph.' },
            { type: 'choice', q: 'The instruction says “NO MORE THAN TWO WORDS”. Which answer is wrong?', options: ['the main station', 'main station', 'station', 'bus stop'], answer: 0, why: '“The main station” is three words.' },
            { type: 'choice', q: 'What is the minimum length for Writing Task 1?', options: ['150 words', '250 words', '100 words', '300 words'], answer: 0, why: 'Task 1 needs at least 150 words.' },
            { type: 'choice', q: 'What should a Task 1 Academic answer include near the start?', options: ['An overview of the main trends', 'Your opinion', 'A conclusion with advice', 'A personal story'], answer: 0, why: 'The overview is essential for a good score.' },
            { type: 'gap', q: 'Sales ___ sharply between 2010 and 2015.', options: ['rose', 'raised', 'arose', 'rised'], answer: 0, why: '“Rise” takes no object.' },
            { type: 'gap', q: 'Next, the bottles ___ and melted.', options: ['are crushed', 'crush', 'crushing', 'are crush'], answer: 0, why: 'Processes use the present passive.' },
            { type: 'choice', q: 'Which letter ending matches “Dear Sir or Madam”?', options: ['Yours faithfully,', 'Best wishes,', 'Yours sincerely,', 'Cheers,'], answer: 0, why: 'Unknown reader: Yours faithfully.' },
            { type: 'choice', q: 'Which Writing criterion covers vocabulary?', options: ['Lexical Resource', 'Task Response', 'Coherence and Cohesion', 'Pronunciation'], answer: 0, why: 'Lexical Resource is about vocabulary.' },
            { type: 'choice', q: 'What is the minimum length for Task 2?', options: ['250 words', '150 words', '200 words', '350 words'], answer: 0, why: 'Task 2 needs at least 250 words.' },
            { type: 'gap', q: 'We need to ___ measures to protect the environment.', options: ['take', 'do', 'make up', 'have'], answer: 0, why: '“Take measures” is the collocation.' },
            { type: 'choice', q: 'In Speaking Part 2, how long do you prepare?', options: ['One minute', 'Five minutes', 'Ten seconds', 'No time'], answer: 0, why: 'You get one minute to prepare and then speak for up to two minutes.' }
          ]
        }
      ]
    }
  ]
};
