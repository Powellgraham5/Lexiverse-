// IELTS path. Practice material written for Lexiverse: not official IELTS questions.
const ENERGY = 'The chart shows the percentage of homes in a town that used three types of energy for cooking between 2000 and 2020. In 2000, firewood was the most common, used by 60% of homes, while gas was used by 25% and electricity by 15%. Over the twenty years, the use of firewood fell steadily to just 15%. In contrast, gas rose sharply, reaching 55% in 2020, and electricity grew gradually to 30%.';
const MARKETS = 'Floating markets, where traders sell goods from boats, are found in several countries in Asia. They grew up in places where rivers and canals were the main roads. Today many are visited mainly by tourists, but some still serve local people, who buy fresh fruit, vegetables and cooked food early in the morning. Critics say that tourism has changed the markets, as prices have risen and some traders now sell souvenirs instead of food.';

export default {
  note: 'Practice questions written for Lexiverse to help you prepare. They are not official IELTS questions. Check the official IELTS website for the current test format.',
  guide: ['Start with “The test at a glance” to learn the four parts.', 'Work through Writing, Reading, Listening and Speaking in order, or jump to your weakest skill.', 'Look up each writing layout in Writing formats.', 'Take the timed practice test, then save rules you want to remember in your notebook.'],
  units: [
    {
      title: 'The test at a glance',
      lessons: [
        {
          id: 'ielts-overview', title: 'Four skills, one band score', minutes: 4,
          cards: [
            { title: 'Four parts', body: 'IELTS tests Listening (about 30 minutes), Reading (60 minutes), Writing (60 minutes, two tasks) and Speaking (11 to 14 minutes, a face-to-face talk with an examiner).' },
            { title: 'Academic or General Training', body: 'Listening and Speaking are the same for everyone. Reading and Writing are different: Academic is for university study; General Training is often for work or moving abroad.' },
            { title: 'Band scores', body: 'Each skill gets a band from 0 to 9, and half bands such as 6.5 are possible. Your overall band is the average of the four.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which two parts are different for Academic and General Training?', options: ['Reading and Writing', 'Listening and Speaking', 'Speaking and Writing', 'All four'], answer: 0, why: 'Listening and Speaking are the same for both. Reading and Writing differ.' },
            { type: 'choice', q: 'How long is the Writing test?', options: ['60 minutes', '30 minutes', '2 hours', '15 minutes'], answer: 0, why: 'Writing has two tasks in 60 minutes.' },
            { type: 'choice', q: 'What is the highest band score?', options: ['9', '10', '100', '7'], answer: 0, why: 'IELTS bands go from 0 to 9.' },
            { type: 'choice', q: 'How is the Speaking test done?', options: ['Face to face with an examiner', 'Written on paper', 'As a group discussion', 'By text message'], answer: 0, why: 'Speaking is a conversation with an examiner.' }
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
            { title: 'The chart', body: ENERGY }
          ],
          exercises: [
            { type: 'choice', passage: ENERGY, q: 'Which sentence is the best overview?', options: ['Overall, firewood use fell sharply, while gas and electricity both became more common.', 'In 2000, 60% of homes used firewood.', 'Gas is the best way to cook.', 'The chart is about energy.'], answer: 0, why: 'An overview sums up the main trends without listing every number.' },
            { type: 'choice', q: 'What is the minimum length for Task 1?', options: ['150 words', '250 words', '100 words', '50 words'], answer: 0, why: 'Task 1 needs at least 150 words. Task 2 needs at least 250.' },
            { type: 'choice', q: 'Which should you NOT include in Task 1?', options: ['Your opinion about why the change happened', 'An overview', 'Key numbers', 'A paraphrase of the title'], answer: 0, why: 'Task 1 reports what the data shows. Opinions belong in Task 2.' },
            { type: 'write', kind: 'paragraph', minParagraphs: 2, passage: ENERGY, q: 'Write the first two paragraphs of a Task 1 answer for this chart: a paraphrase of what it shows, then an overview.', minWords: 50, maxWords: 120, checklist: ['Paraphrase, do not copy the description', 'An overview starting with “Overall,”', 'No opinions'], model: 'The chart illustrates how the proportion of households in a town using firewood, gas and electricity for cooking changed between 2000 and 2020.\n\nOverall, firewood became much less common over the period, whereas both gas and electricity grew in popularity. By 2020, gas had replaced firewood as the main cooking fuel, while electricity was used by almost a third of homes.' }
          ]
        },
        {
          id: 'ielts-trends', title: 'Task 1 language: trends and comparisons', minutes: 5,
          cards: [
            { title: 'Describing change', body: 'Use a verb with an adverb, or an adjective with a noun.', examples: [{ text: 'Gas use rose sharply. / There was a sharp rise in gas use.', good: true }, { text: 'Firewood use fell steadily to 15%.', good: true }, { text: 'Sales peaked at 80% in 2015 and then levelled off.', good: true }] },
            { title: 'Prepositions with numbers', body: '“Rose to 55%” gives the end point. “Rose by 30%” gives the size of the change. “From 25% to 55%” gives both.' }
          ],
          exercises: [
            { type: 'gap', q: 'Gas use rose ___ 25% in 2000 ___ 55% in 2020.', options: ['from … to', 'by … at', 'at … by', 'to … from'], answer: 0, why: '“From … to” gives the starting and ending figures.' },
            { type: 'gap', q: 'Electricity use grew ___ 15 percentage points, from 15% to 30%.', options: ['by', 'to', 'at', 'on'], answer: 0, why: '“By” gives the size of the change.' },
            { type: 'choice', q: 'Which word best describes a big, fast change?', options: ['sharply', 'slightly', 'steadily', 'gradually'], answer: 0, why: '“Sharply” means a large, quick change. “Slightly” is small; “steadily” and “gradually” are slow and even.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['The number of visitors', 'peaked on', '2 million', 'in 2018.'], answer: 1, fix: 'peaked at', why: 'We say a value “peaked at” a number.' }
          ]
        },
        {
          id: 'ielts-task2', title: 'Task 2: the essay', minutes: 7,
          cards: [
            { title: 'What Task 2 asks', body: 'You write an essay of at least 250 words in about 40 minutes. It is worth more marks than Task 1, so do not run out of time on it.' },
            { title: 'Know the question type', body: 'Opinion (“To what extent do you agree?”), discussion (“Discuss both views and give your opinion”), problem and solution, and advantages and disadvantages. Answer every part of the question.' },
            { title: 'A clear structure', body: 'Introduction: paraphrase the question and give your position. Two body paragraphs: one main idea each, explained with an example. Conclusion: restate your position.' }
          ],
          exercises: [
            { type: 'choice', q: '“Some people think children should start school at age four. To what extent do you agree?” What type of question is this?', options: ['Opinion', 'Problem and solution', 'Describe a chart', 'Advantages only'], answer: 0, why: '“To what extent do you agree?” asks for your opinion.' },
            { type: 'choice', q: 'A question says “Discuss both views and give your own opinion.” What must you do?', options: ['Explain both views and say which you agree with', 'Explain only your view', 'Explain both views but give no opinion', 'Write about something else'], answer: 0, why: 'Answer every part: both views and your opinion.' },
            { type: 'choice', q: 'Which task is worth more marks?', options: ['Task 2', 'Task 1', 'They are equal', 'Neither is marked'], answer: 0, why: 'Task 2 carries more weight, so give it about 40 of your 60 minutes.' },
            { type: 'write', kind: 'essay', q: 'Write a Task 2 essay: “Some people think that young people should learn practical skills, such as cooking, at school. To what extent do you agree?”', minWords: 250, maxWords: 380, checklist: ['Introduction with your position', 'Two body paragraphs, one idea each', 'Examples', 'Conclusion that restates your view'], model: 'In many countries, school timetables are filled with academic subjects, and there is little space for practical skills such as cooking or managing money. Some people argue that schools should teach these skills as well. I strongly agree with this view, because practical skills prepare young people for independent life and also support their long-term health.\n\nFirstly, practical skills help students to become independent adults. For example, a teenager who can cook simple, healthy meals will find it far easier to live alone when they leave home for university or work. Similarly, a student who has learned how to plan a budget is less likely to fall into debt when they receive their first salary. These are lessons that many families do not have time to teach, so schools are well placed to fill the gap.\n\nSecondly, cooking lessons in particular can improve public health. When students learn how to prepare fresh food, they are less likely to depend on cheap fast food, which is often high in fat, sugar and salt. As a result, they may develop habits that protect them from illnesses such as diabetes later in life. In addition, they can share what they learn with their families at home.\n\nSome critics worry that practical lessons would take time away from important subjects such as mathematics and science. However, even one lesson a week would make a real difference without harming academic results.\n\nIn conclusion, although academic subjects remain essential, I believe schools should make room for practical skills, because they help young people to live independently and stay healthy throughout their lives.' }
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
            { title: 'The passage', body: MARKETS }
          ],
          exercises: [
            { type: 'choice', passage: MARKETS, q: '“Floating markets began where rivers and canals were the main roads.” True, False or Not Given?', options: ['True', 'False', 'Not Given'], answer: 0, why: 'The passage says they “grew up in places where rivers and canals were the main roads”.' },
            { type: 'choice', passage: MARKETS, q: '“All floating markets now serve only tourists.” True, False or Not Given?', options: ['False', 'True', 'Not Given'], answer: 0, why: 'The passage says “some still serve local people”, which contradicts “all … only tourists”.' },
            { type: 'choice', passage: MARKETS, q: '“The oldest floating market is in Thailand.” True, False or Not Given?', options: ['Not Given', 'True', 'False'], answer: 0, why: 'The passage does not say where the oldest market is. Even if you know, the answer is Not Given.' },
            { type: 'choice', passage: MARKETS, q: 'According to critics, how has tourism changed the markets?', options: ['Prices are higher and some traders sell souvenirs', 'The markets have closed', 'Boats are no longer used', 'Local people run all the stalls'], answer: 0, why: 'The last sentence mentions higher prices and souvenirs instead of food.' }
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
            { title: 'Spelling counts', body: 'Answers with spelling mistakes are marked wrong, so practise names and common words. Here the device voice reads each recording; you can also read the transcript.' }
          ],
          exercises: [
            { type: 'listen', script: 'Good morning, Greenfield Sports Centre. Yes, the swimming class for beginners is on Tuesday evenings. Oh, sorry, I tell a lie: it moved to Thursday evenings this term, from six thirty to seven thirty.', q: 'When is the beginners’ swimming class this term?', options: ['Thursday, 6.30 to 7.30', 'Tuesday, 6.30 to 7.30', 'Thursday, 7.30 to 8.30', 'Tuesday morning'], answer: 0, why: 'The speaker corrects Tuesday to Thursday. The correction is the answer.' },
            { type: 'listen', script: 'The library card costs twelve pounds for a year, but students pay half price, so that is six pounds. You will need to bring a photo and proof of address.', q: 'How much does a student pay for a library card?', options: ['£6', '£12', '£16', '£2'], answer: 0, why: 'Students pay half of twelve pounds, which is six.' },
            { type: 'listen', script: 'My surname is Okafor. That is O, K, A, F, O, R.', q: 'Which spelling is correct?', options: ['Okafor', 'Okaphor', 'Ocafor', 'Okafo'], answer: 0, why: 'The speaker spells it: O, K, A, F, O, R.' },
            { type: 'listen', script: 'The tour leaves from the main gate at nine fifteen, not from the car park. Please arrive ten minutes early.', q: 'Where does the tour leave from?', options: ['The main gate', 'The car park', 'The ticket office', 'The bus station'], answer: 0, why: 'The speaker says “from the main gate … not from the car park”.' }
          ]
        }
      ]
    },
    {
      title: 'Speaking',
      lessons: [
        {
          id: 'ielts-speaking', title: 'The three parts and the cue card', minutes: 7,
          cards: [
            { title: 'Three parts', body: 'Part 1 (4 to 5 minutes): questions about familiar topics such as home, work or study. Part 2 (3 to 4 minutes): a cue card; you have 1 minute to prepare and talk for up to 2 minutes. Part 3 (4 to 5 minutes): a deeper discussion linked to Part 2.' },
            { title: 'Answer fully', body: 'Do not answer with one word. Give an answer, a reason and an example.', examples: [{ text: '“Do you like cooking?” “Yes, I do, especially at weekends, because it relaxes me. Last Sunday I made jollof rice for my whole family.”', good: true }, { text: '“Do you like cooking?” “Yes.”', good: false }] },
            { title: 'Keep going', body: 'In Part 2, use your notes to cover every point on the card. If you finish early, add an example or a feeling.' }
          ],
          exercises: [
            { type: 'choice', q: 'How long do you get to prepare in Part 2?', options: ['1 minute', '5 minutes', 'No time', '10 seconds'], answer: 0, why: 'You get 1 minute to prepare, and you can make notes.' },
            { type: 'choice', q: '“What do you do in your free time?” Which answer is best?', options: ['I mostly play football, because it keeps me fit, and I meet my friends there every Saturday.', 'Football.', 'I don’t know.', 'Nothing much.'], answer: 0, why: 'It gives an answer, a reason and a detail.' },
            { type: 'speak', q: 'Describe a person who has helped you.', points: ['who the person is', 'how you know them', 'what they did to help you', 'and explain why you are grateful'], prep: 60, talk: 120, checklist: ['I covered every point on the card', 'I spoke for most of the two minutes', 'I gave at least one example', 'I used past tenses correctly'] }
          ]
        }
      ]
    }
  ]
};
