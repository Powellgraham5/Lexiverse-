// Better writing: Essays. Practice material written for Lexiverse.
const WEAK = 'Reading is good. Reading is good for students because it is good for their English. Students should read good books. Reading is also good because you learn things. In conclusion reading is good.';

export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at length, paragraphs and linking words; they cannot judge your ideas, so compare your work with the model answers.',
  units: [
    {
      title: 'Essay structure',
      lessons: [
        {
          id: 'essay-shape', title: 'Introduction, body and conclusion', minutes: 5,
          cards: [
            { title: 'Introduction', body: 'Catch the reader’s interest, give a little background, and end with your thesis: one sentence that says what the whole essay will argue or explain.', examples: [{ text: 'Thesis: “Every school should have a library, because books build knowledge, confidence and a habit of learning.”', good: true }] },
            { title: 'Body paragraphs', body: 'Each body paragraph develops one idea that supports the thesis. Start with a topic sentence, then explain it and give an example.' },
            { title: 'Conclusion', body: 'Restate the thesis in fresh words and sum up the main points. Do not bring in new ideas at the end.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is a thesis statement?', options: ['One sentence that states the main argument of the essay', 'The title of the essay', 'The last word of the essay', 'A list of your sources'], answer: 0, why: 'The thesis tells the reader what the whole essay sets out to show.' },
            { type: 'choice', q: 'Which is the strongest thesis?', options: ['Every school should have a library, because books build knowledge, confidence and a habit of learning.', 'Libraries are buildings.', 'This essay is about libraries.', 'I like books a lot.'], answer: 0, why: 'It takes a clear position and previews the reasons the essay will develop.' },
            { type: 'choice', q: 'What belongs in the conclusion?', options: ['A short restatement of your thesis and main points', 'A completely new argument', 'A list of spelling corrections', 'The essay title again'], answer: 0, why: 'The conclusion wraps up what you have already shown. New ideas belong in the body.' },
            { type: 'order', q: 'Put these parts of an essay in order.', parts: ['Hook and background', 'Thesis statement', 'Body paragraph 1', 'Body paragraph 2', 'Conclusion'], why: 'The introduction ends with the thesis, the body proves it, and the conclusion sums it up.' },
            { type: 'write', kind: 'paragraph', q: 'Write an introduction for the essay “Every school should have a library.” End with a clear thesis.', minWords: 40, maxWords: 120, checklist: ['A hook or background sentence', 'Your thesis as the last sentence'], model: 'In many schools, students share one old textbook between three people. Yet a single room full of books could change how they learn. Every school should have a library, because books build knowledge, confidence and a lifelong habit of learning.' }
          ]
        },
        {
          id: 'essay-paragraphs', title: 'Strong paragraphs (PEEL)', minutes: 5,
          cards: [
            { title: 'PEEL', body: 'A strong body paragraph follows PEEL: Point (the topic sentence), Example or evidence, Explain how the example supports the point, Link back to the thesis.', examples: [{ text: 'Point: Libraries improve students’ vocabulary.', good: true }, { text: 'Example: A student who reads a novel a month meets hundreds of new words.', good: true }, { text: 'Explain: Seeing words in context helps students remember and use them.', good: true }, { text: 'Link: This is one clear reason every school needs a library.', good: true }] },
            { title: 'One paragraph, one idea', body: 'If a sentence does not support the paragraph’s point, move it to another paragraph or remove it.' }
          ],
          exercises: [
            { type: 'order', q: 'Put this PEEL paragraph in order.', parts: ['Libraries improve students’ vocabulary.', 'For example, a student who reads one novel a month meets hundreds of new words.', 'Seeing words in context helps students remember them and use them correctly.', 'This is one clear reason why every school needs a library.'], why: 'Point, Example, Explain, Link.' },
            { type: 'choice', q: 'Which sentence does NOT belong in a paragraph about libraries improving vocabulary?', options: ['Our football team won the inter-house match.', 'Reading exposes students to new words.', 'Students learn words in context.', 'A wide vocabulary helps in exams.'], answer: 0, why: 'The football result has nothing to do with the paragraph’s point.' },
            { type: 'choice', q: 'What is the job of a topic sentence?', options: ['To state the main point of the paragraph', 'To give the essay a title', 'To end the essay', 'To list every example'], answer: 0, why: 'The topic sentence tells the reader what the paragraph is about.' },
            { type: 'write', kind: 'paragraph', q: 'Write one PEEL paragraph: “Reading every day helps students.”', minWords: 60, maxWords: 150, checklist: ['Point as the first sentence', 'A specific example', 'Explain the example', 'Link back to the topic'], model: 'Reading every day helps students to write better. For example, a student who reads for twenty minutes each evening sees how good writers build sentences and use words. Over time, the student begins to copy these patterns in their own work, so their essays become clearer and more varied. Therefore, a daily reading habit is one of the simplest ways to improve as a writer.' }
          ]
        }
      ]
    },
    {
      title: 'Essay types',
      lessons: [
        {
          id: 'essay-narrative', title: 'Narrative and descriptive essays', minutes: 6,
          cards: [
            { title: 'Narrative', body: 'A narrative essay tells a story, usually in the past tense and often in the first person (“I”). Order events clearly, build to a high point, and end with what happened or what you learned.' },
            { title: 'Descriptive', body: 'A descriptive essay paints a picture with words. Use the senses: what you see, hear, smell, taste and feel. Choose precise words over general ones.', examples: [{ text: 'The air smelled of roasting corn and fresh rain.', good: true }, { text: 'The place was nice.', good: false, note: 'Too general: what made it nice?' }] }
          ],
          exercises: [
            { type: 'choice', q: '“I will never forget the day our bus broke down on the way to Jos.” What type of essay is this likely to be?', options: ['Narrative', 'Argumentative', 'Expository', 'A formal letter'], answer: 0, why: 'It introduces a personal story told in the past.' },
            { type: 'choice', q: 'Which sentence is the most descriptive?', options: ['Traders shouted prices over the hum of generators while the smell of fried plantain filled the air.', 'The market was busy.', 'There were many people at the market.', 'The market is a place where people buy things.'], answer: 0, why: 'It uses sound and smell to help the reader picture the scene.' },
            { type: 'gap', q: 'When we finally ___ the village, it was already dark.', options: ['reached', 'reach', 'reaching', 'have reach'], answer: 0, why: 'Narratives usually use the past tense: “reached”.' },
            { type: 'write', kind: 'paragraph', q: 'Describe a busy market in one paragraph. Use at least three senses.', minWords: 80, maxWords: 180, checklist: ['Sight, sound and smell (or taste or touch)', 'Precise words, not just “nice” or “good”'], model: 'By seven in the morning, the market is already alive. Women balance trays of tomatoes on their heads while traders call out prices over the hum of generators. The sharp smell of fresh pepper mixes with the sweetness of ripe mangoes, and somewhere a radio plays highlife music. Underfoot, the ground is still damp from the night’s rain, and every few steps someone brushes past with a heavy sack of rice. Then, as the sun climbs higher, the noise grows louder, until the whole market seems to hum like one giant engine.' }
          ]
        },
        {
          id: 'essay-argue', title: 'Argumentative and expository essays', minutes: 6,
          cards: [
            { title: 'Argumentative', body: 'An argumentative essay tries to persuade. Take a clear side, support it with reasons and examples, and answer the strongest point on the other side.' },
            { title: 'Expository', body: 'An expository essay explains a topic clearly and fairly, without taking sides: how something works, causes and effects, or steps in a process.', examples: [{ text: 'Expository: “How rainwater can be collected and stored at home.”', good: true }, { text: 'Argumentative: “Every home should collect rainwater.”', good: true }] },
            { title: 'Reasons beat opinions', body: '“I think uniforms are good” is an opinion. “Uniforms reduce pressure to wear expensive clothes” is a reason that can persuade.' }
          ],
          exercises: [
            { type: 'choice', q: '“How a bill becomes law in Nigeria.” What type of essay is this?', options: ['Expository', 'Argumentative', 'Narrative', 'Descriptive'], answer: 0, why: 'It explains a process without taking sides.' },
            { type: 'choice', q: 'Which is a reason, not just an opinion, for school uniforms?', options: ['Uniforms reduce pressure on students to wear expensive clothes.', 'I think uniforms are nice.', 'Uniforms are uniforms.', 'Everyone knows uniforms are best.'], answer: 0, why: 'A reason explains why, so it can persuade a reader who disagrees.' },
            { type: 'choice', q: 'How should an argumentative essay deal with the other side?', options: ['State the strongest opposing point and show why your side still wins', 'Pretend there is no other side', 'Insult people who disagree', 'Switch sides in the conclusion'], answer: 0, why: 'Answering the best counter-argument makes your case more convincing.' },
            { type: 'write', kind: 'essay', minParagraphs: 1, q: 'Write one argumentative paragraph: “Students should wear school uniforms.” Include a reason, an example and a reply to the other side.', minWords: 100, maxWords: 200, checklist: ['A clear position', 'A reason with an example', 'Mention the other side and answer it', 'Linking words'], model: 'Students should wear school uniforms because uniforms reduce the pressure to compete over clothes. For example, in schools without uniforms, some young people feel ashamed when their families cannot afford fashionable outfits, and this can damage their confidence in class. Uniforms also make it easy to recognise who belongs in the school, which keeps everyone safer. Some people argue that uniforms stop learners from expressing themselves. However, pupils can still show their personality through their ideas, their work, their hobbies and the clubs they join. Therefore, uniforms help every learner to focus on lessons rather than on appearance, and this makes the school a fairer place for all.' }
          ]
        }
      ]
    },
    {
      title: 'Sentences and words',
      lessons: [
        {
          id: 'essay-linkers', title: 'Linking your ideas', minutes: 5,
          cards: [
            { title: 'Linking words by job', body: 'Linking words show how ideas connect. Choose them by what they do.', examples: [{ text: 'Adding: moreover, in addition, also', good: true }, { text: 'Contrasting: however, although, on the other hand', good: true }, { text: 'Cause and effect: therefore, as a result, because', good: true }, { text: 'Examples: for example, for instance', good: true }] },
            { title: 'Do not double up', body: '“Although” and “but” both show contrast. Use one, not both.', examples: [{ text: 'Although it rained, we played.', good: true }, { text: 'Although it rained, but we played.', good: false }] }
          ],
          exercises: [
            { type: 'gap', q: 'The road was flooded. ___, the bus arrived on time.', options: ['However', 'Therefore', 'For example', 'Because'], answer: 0, why: 'The second sentence is surprising after the first, so it needs a contrast word: “However”.' },
            { type: 'gap', q: 'She studied every evening. ___, she passed with distinction.', options: ['As a result', 'However', 'Although', 'For instance'], answer: 0, why: 'Passing was the effect of studying, so use a cause-and-effect linker.' },
            { type: 'gap', q: 'Many fruits are rich in vitamin C, ___ oranges and guavas.', options: ['for example', 'however', 'therefore', 'although'], answer: 0, why: 'Oranges and guavas are examples of such fruits.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['Although the exam was hard,', 'but', 'most students', 'passed.'], answer: 1, fix: '(remove “but”)', why: '“Although” already shows contrast, so “but” is not needed.' },
            { type: 'write', kind: 'paragraph', q: 'Write a short paragraph about your town that uses at least three different linking words.', minWords: 60, maxWords: 150, checklist: ['At least three linking words', 'Different jobs: adding, contrasting, cause or example'], model: 'My town is small, but it is full of life. For example, the Saturday market brings traders from five nearby villages. In addition, the new secondary school has attracted families from the city. However, the roads are still poor, and as a result, travel during the rainy season can be slow. Even so, most people here would not live anywhere else, because the town feels like one big family.' }
          ]
        },
        {
          id: 'essay-precise', title: 'Precise words and varied sentences', minutes: 6,
          cards: [
            { title: 'Swap vague words', body: 'Words like “good”, “nice”, “thing” and “very” tell the reader little. Say exactly what you mean.', examples: [{ text: 'a good meal → a filling, spicy meal', good: true }, { text: 'very tired → exhausted', good: true }] },
            { title: 'Vary sentence length', body: 'A mix of short and longer sentences keeps writing lively. Too many short sentences sound choppy; too many long ones are hard to follow.' },
            { title: 'No “very” before absolutes', body: 'Words like “unique”, “perfect” and “impossible” are already absolute.', examples: [{ text: 'a unique design', good: true }, { text: 'a very unique design', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'Choose the most precise replacement for “very tired”.', options: ['exhausted', 'tired', 'good', 'sleepy-ish'], answer: 0, why: '“Exhausted” is one strong word that means very tired.' },
            { type: 'choice', q: 'Which revision of “The food was nice” is the most precise?', options: ['The jollof rice was smoky and perfectly spiced.', 'The food was very nice.', 'The food was nice and good.', 'It was nice food.'], answer: 0, why: 'It names the food and says exactly what was good about it.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['Her design', 'was', 'very unique', 'and colourful.'], answer: 2, fix: 'unique', why: '“Unique” means one of a kind, so “very” adds nothing.' },
            { type: 'write', kind: 'paragraph', passage: WEAK, q: 'Rewrite this weak paragraph. Replace the repeated “good”, add an example, and vary your sentences.', minWords: 50, maxWords: 150, checklist: ['No more than one “good”', 'A specific example', 'Short and longer sentences'], model: 'Reading regularly strengthens a student’s English. Each book introduces new words and shows how skilled writers build sentences. For example, a student who reads a short novel every month soon notices phrases they can use in their own essays. Reading also widens knowledge of the world. In short, a reading habit pays off in every subject.' }
          ]
        }
      ]
    }
  ]
};
