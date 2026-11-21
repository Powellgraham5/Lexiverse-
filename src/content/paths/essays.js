// Better writing: Essays. Practice material written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at length, paragraphs and linking words; they cannot judge your ideas, so compare your work with the model answers.',
  guide: [
    'Start with the introduction lesson, then work through structure, essay types, language and editing in order.',
    'Every lesson teaches, shows examples, lists common mistakes and ends with practice. Try each writing task before you open the model.',
    'Use “Explain it again” whenever an answer surprises you.',
    'Finish with the final assessment, then take the timed or untimed practice test.',
    'Save useful phrases and rules to your notebook as you go.'
  ],
  improve: [
    'Plan every essay for five minutes: thesis, three points, one example each.',
    'Read your essay aloud; any sentence you stumble over needs rewriting.',
    'Replace every “good”, “bad” and “thing” with a precise word.',
    'Compare your work with the model answer and copy one technique into your next essay.',
    'Keep a list of your own repeated grammar mistakes and check for them before you finish.',
    'Read one well-written opinion article a week and note how each paragraph begins.',
    'Write a timed essay once a week: 40 minutes, then 10 minutes of editing.'
  ],
  units: [
    {
      title: 'Introduction to essays',
      lessons: [
        {
          id: 'essay-intro', title: 'What an essay is, and why it matters', minutes: 5, kind: 'intro',
          cards: [
            { title: 'What an essay is', body: 'An essay is a short piece of formal writing that answers one question or develops one idea. It has a clear position, organised paragraphs and evidence that supports the position.' },
            { title: 'Where you will use essays', body: 'School and university exams (WAEC, IELTS, coursework), scholarship and job applications, opinion articles and reports at work. The skills of planning, arguing and organising carry into every kind of writing.' },
            { title: 'What this course covers', body: 'Structure (introduction, body, conclusion), the five essay types, vocabulary and register, sentence construction, grammar and punctuation, linking ideas and editing. Each lesson ends with practice and a recommendation.' },
            { title: 'Common mistakes', body: 'Starting to write without a plan, retelling the question instead of answering it, writing one long paragraph, and using informal language such as “gonna”, “stuff” or text-speak.', examples: [{ text: 'Plan: thesis, three points, an example for each.', good: true }, { text: 'Just start writing and see what happens.', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'What is the main purpose of an essay?', options: ['To answer one question or develop one idea in organised paragraphs', 'To list as many facts as possible', 'To tell the reader about your day', 'To repeat the question in different words'], answer: 0, why: 'An essay is focused: every paragraph serves one central idea.' },
            { type: 'choice', q: 'Which is a real-life use of essay skills?', options: ['Writing a scholarship application', 'Sending a text with emojis', 'Filling in your name on a form', 'Copying notes from the board'], answer: 0, why: 'Scholarship statements need a clear position, structure and evidence, exactly like an essay.' },
            { type: 'choice', q: 'What should you do before you start writing?', options: ['Make a short plan: thesis, points and examples', 'Count the words in the question', 'Write the conclusion first and stop', 'Choose the longest words you know'], answer: 0, why: 'Five minutes of planning saves time and keeps the essay focused.' },
            { type: 'choice', q: 'Which sentence suits a formal essay?', options: ['Many young people rely heavily on social media for news.', 'Loads of kids are on socials 24/7 lol.', 'Social media is like, kinda everywhere.', 'U know social media is big.'], answer: 0, why: 'Formal essays avoid slang, abbreviations and filler words.' },
            { type: 'order', q: 'Put the essay-writing process in order.', parts: ['Read the question carefully', 'Plan your thesis and points', 'Write the draft', 'Edit and proofread'], why: 'Understanding comes first, then planning, drafting and checking.' }
          ]
        }
      ]
    },
    {
      title: 'Essay structure',
      lessons: [
        {
          id: 'essay-shape', title: 'Introduction, body and conclusion', minutes: 5,
          cards: [
            { title: 'Introduction', body: 'Catch the reader’s interest, give a little background, and end with your thesis: one sentence that says what the whole essay will argue or explain.', examples: [{ text: 'Thesis: “Every school should have a library, because books build knowledge, confidence and a habit of learning.”', good: true }] },
            { title: 'Body paragraphs', body: 'Each body paragraph develops one idea that supports the thesis. Start with a topic sentence, then explain it and give an example.' },
            { title: 'Conclusion', body: 'Restate the thesis in fresh words and sum up the main points. Do not bring in new ideas at the end.' },
            { title: 'Common mistakes', body: 'No clear thesis, an introduction that is longer than a body paragraph, and a conclusion that adds new ideas.' }
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
          id: 'essay-introductions', title: 'Introductions: hook, background, thesis', minutes: 6,
          cards: [
            { title: 'Three jobs of an introduction', body: 'Catch interest with a hook, give a little background, and end with your thesis. Keep it to three or four sentences.' },
            { title: 'Kinds of hook', body: 'A striking fact, a short question, a brief scene, or a bold statement. Avoid dictionary definitions and “Since the beginning of time”.', examples: [{ text: 'In Lagos, a two-hour commute is normal for many workers.', good: true }, { text: 'Since the dawn of time, people have travelled.', good: false }] },
            { title: 'A strong thesis', body: 'It takes a clear position and, ideally, previews your main reasons. It is one sentence, at the end of the introduction.', examples: [{ text: 'Cities should invest in buses rather than roads, because buses cut traffic, pollution and costs.', good: true }, { text: 'In this essay I will talk about transport.', good: false }] },
            { title: 'Common mistakes', body: 'Introductions that are too long, a thesis hidden in the middle, announcing (“In this essay I will…”) instead of arguing, and hooks with no link to the topic.' }
          ],
          exercises: [
            { type: 'choice', q: 'Where does the thesis usually go?', options: ['At the end of the introduction', 'In the first word', 'In the conclusion only', 'In the title'], answer: 0, why: 'Ending the introduction with the thesis leads straight into the body.' },
            { type: 'choice', q: 'Which is the best hook for an essay on school uniforms?', options: ['Every morning, thousands of parents argue with their children about what to wear.', 'Since the beginning of time, people have worn clothes.', 'The dictionary defines a uniform as a set of clothes.', 'This essay is about uniforms.'], answer: 0, why: 'It is specific, relevant and makes the reader curious.' },
            { type: 'choice', q: 'Which thesis takes a clear position?', options: ['School uniforms should stay, because they reduce cost, bullying and distraction.', 'Uniforms are a topic many people discuss.', 'I will now write about uniforms.', 'Some people like uniforms and some do not.'], answer: 0, why: 'It states a view and the reasons the essay will develop.' },
            { type: 'error', q: 'Find the weak part of this introduction.', parts: ['Many students struggle to afford textbooks.', 'Libraries give free access to books.', 'In this essay I will talk about libraries.', 'Readers often become better writers.'], answer: 2, fix: 'Every school should have a library, because it gives every student free access to knowledge.', why: 'Announcing the topic is not a thesis. State your position instead.' },
            { type: 'order', q: 'Put the introduction in order.', parts: ['A surprising fact about the topic', 'A sentence of background', 'The thesis statement'], why: 'Hook, then background, then thesis.' },
            { type: 'write', kind: 'paragraph', q: 'Write an introduction for the essay “Should mobile phones be allowed in secondary schools?” Use a hook and end with a clear thesis.', minWords: 50, maxWords: 120, checklist: ['A relevant hook', 'One sentence of background', 'A thesis with your position and reasons'], model: 'Almost every secondary school student now owns a mobile phone, yet many schools still ban them completely. Teachers worry about distraction, while parents want to reach their children. However, a total ban ignores how useful phones can be. Therefore, schools should allow phones with clear rules, because they support learning, safety and responsibility.' }
          ]
        },
        {
          id: 'essay-paragraphs', title: 'Strong paragraphs (PEEL)', minutes: 5,
          cards: [
            { title: 'PEEL', body: 'A strong body paragraph follows PEEL: Point (the topic sentence), Example or evidence, Explain how the example supports the point, Link back to the thesis.', examples: [{ text: 'Point: Libraries improve students’ vocabulary.', good: true }, { text: 'Example: A student who reads a novel a month meets hundreds of new words.', good: true }, { text: 'Explain: Seeing words in context helps students remember and use them.', good: true }, { text: 'Link: This is one clear reason every school needs a library.', good: true }] },
            { title: 'One paragraph, one idea', body: 'If a sentence does not support the paragraph’s point, move it to another paragraph or remove it.' },
            { title: 'Real-life use', body: 'PEEL works in job applications (“I am organised. For example, I ran the school’s book club…”), reports and speeches: make a point, prove it, explain it, link it back.' },
            { title: 'Common mistakes', body: 'A topic sentence that is too vague, evidence with no explanation, and paragraphs with several unrelated ideas.' }
          ],
          exercises: [
            { type: 'order', q: 'Put this PEEL paragraph in order.', parts: ['Libraries improve students’ vocabulary.', 'For example, a student who reads one novel a month meets hundreds of new words.', 'Seeing words in context helps students remember them and use them correctly.', 'This is one clear reason why every school needs a library.'], why: 'Point, Example, Explain, Link.' },
            { type: 'choice', q: 'Which sentence does NOT belong in a paragraph about libraries improving vocabulary?', options: ['Our football team won the inter-house match.', 'Reading exposes students to new words.', 'Students learn words in context.', 'A wide vocabulary helps in exams.'], answer: 0, why: 'The football result has nothing to do with the paragraph’s point.' },
            { type: 'choice', q: 'What is the job of a topic sentence?', options: ['To state the main point of the paragraph', 'To give the essay a title', 'To end the essay', 'To list every example'], answer: 0, why: 'The topic sentence tells the reader what the paragraph is about.' },
            { type: 'write', kind: 'paragraph', q: 'Write one PEEL paragraph: “Reading every day helps students.”', minWords: 60, maxWords: 150, checklist: ['Point as the first sentence', 'A specific example', 'Explain the example', 'Link back to the topic'], model: 'Reading every day helps students to write better. For example, a student who reads for twenty minutes each evening sees how good writers build sentences and use words. Over time, the student begins to copy these patterns in their own work, so their essays become clearer and more varied. Therefore, a daily reading habit is one of the simplest ways to improve as a writer.' },
            { type: 'choice', q: 'In PEEL, what does the final L do?', options: ['Links back to the thesis or the next point', 'Lists sources', 'Leaves a question', 'Lengthens the paragraph'], answer: 0, why: 'The link connects the paragraph to the essay’s argument.' }
          ]
        },
        {
          id: 'essay-conclusions', title: 'Conclusions that close well', minutes: 5,
          cards: [
            { title: 'What a conclusion does', body: 'It restates the thesis in fresh words, sums up the main points briefly and leaves the reader with a final thought: a recommendation, a warning or a look ahead.' },
            { title: 'Useful openers', body: '“In conclusion,”, “To sum up,”, “Overall,”, “On balance,” (for discursive essays). Use one, then move to your restated thesis.', examples: [{ text: 'On balance, the benefits of school phones outweigh the risks, provided clear rules are in place.', good: true }] },
            { title: 'Real-life use', body: 'The same “sum up and recommend” move closes reports, proposals, speeches and cover letters. Busy readers often read only the first and last paragraphs.' },
            { title: 'Common mistakes', body: 'Adding a brand-new argument, copying the introduction word for word, apologising (“I may be wrong, but…”), and ending abruptly with no conclusion at all.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should a conclusion NOT contain?', options: ['A completely new argument', 'A restatement of the thesis', 'A short summary of the main points', 'A final thought'], answer: 0, why: 'New arguments need support, which belongs in the body.' },
            { type: 'choice', q: 'Which is the best final sentence?', options: ['If schools act now, the next generation will read more and learn faster.', 'That is all I have to say.', 'I hope you liked my essay.', 'Anyway, libraries.'], answer: 0, why: 'It gives a forward-looking final thought linked to the thesis.' },
            { type: 'gap', q: '___ the evidence suggests that a balanced approach works best.', options: ['On balance,', 'Firstly,', 'For example,', 'Meanwhile,'], answer: 0, why: '“On balance” weighs both sides before concluding, ideal for a discursive essay.' },
            { type: 'error', q: 'Find the problem in this conclusion.', parts: ['In conclusion, uniforms save money.', 'They also reduce bullying.', 'Another point is that uniforms help in sport.', 'Schools should keep them.'], answer: 2, fix: 'Remove the new point, or move it to the body.', why: 'A conclusion should not introduce a new argument.' },
            { type: 'choice', q: 'How should a conclusion restate the thesis?', options: ['In fresh words', 'Word for word', 'As a question', 'It should not restate it'], answer: 0, why: 'Repeating it exactly sounds lazy; rephrasing shows control.' },
            { type: 'write', kind: 'paragraph', q: 'Write a conclusion for an essay arguing that schools should allow mobile phones with clear rules.', minWords: 40, maxWords: 110, checklist: ['An opener such as “In conclusion,”', 'The thesis in fresh words', 'A brief summary', 'A final thought'], model: 'In conclusion, a total ban on phones does more harm than good. Phones help students research, keep them in touch with their families and teach them to manage technology responsibly. Therefore, schools should replace bans with clear rules, so that students learn to use these powerful tools well.' }
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
            { title: 'Descriptive', body: 'A descriptive essay paints a picture with words. Use the senses: what you see, hear, smell, taste and feel. Choose precise words over general ones.', examples: [{ text: 'The air smelled of roasting corn and fresh rain.', good: true }, { text: 'The place was nice.', good: false, note: 'Too general: what made it nice?' }] },
            { title: 'Common mistakes', body: 'Telling events with no description, changing tense halfway, and endings that stop suddenly or say “It was all a dream”.' }
          ],
          exercises: [
            { type: 'choice', q: '“I will never forget the day our bus broke down on the way to Jos.” What type of essay is this likely to be?', options: ['Narrative', 'Argumentative', 'Expository', 'A formal letter'], answer: 0, why: 'It introduces a personal story told in the past.' },
            { type: 'choice', q: 'Which sentence is the most descriptive?', options: ['Traders shouted prices over the hum of generators while the smell of fried plantain filled the air.', 'The market was busy.', 'There were many people at the market.', 'The market is a place where people buy things.'], answer: 0, why: 'It uses sound and smell to help the reader picture the scene.' },
            { type: 'gap', q: 'When we finally ___ the village, it was already dark.', options: ['reached', 'reach', 'reaching', 'have reach'], answer: 0, why: 'Narratives usually use the past tense: “reached”.' },
            { type: 'write', kind: 'paragraph', q: 'Describe a busy market in one paragraph. Use at least three senses.', minWords: 80, maxWords: 180, checklist: ['Sight, sound and smell (or taste or touch)', 'Precise words, not just “nice” or “good”'], model: 'By seven in the morning, the market is already alive. Women balance trays of tomatoes on their heads while traders call out prices over the hum of generators. The sharp smell of fresh pepper mixes with the sweetness of ripe mangoes, and somewhere a radio plays highlife music. Underfoot, the ground is still damp from the night’s rain, and every few steps someone brushes past with a heavy sack of rice. Then, as the sun climbs higher, the noise grows louder, until the whole market seems to hum like one giant engine.' },
            { type: 'gap', q: 'By the time we arrived, the film ___.', options: ['had started', 'starts', 'has start', 'is starting'], answer: 0, why: 'The past perfect shows an action completed before another past action.' }
          ]
        },
        {
          id: 'essay-descriptive', title: 'Descriptive essays', minutes: 6,
          cards: [
            { title: 'What it is', body: 'A descriptive essay paints a person, place, object or event so the reader can see, hear and feel it. It still has an introduction, organised body paragraphs and a conclusion.' },
            { title: 'How to organise it', body: 'Choose an order: space (left to right, near to far), time (morning to night) or importance (least to most striking). One paragraph per aspect.' },
            { title: 'Sensory detail', body: 'Use the five senses and precise words. Show with details rather than labels.', examples: [{ text: 'The market smelled of roasted corn, diesel and fresh pepper.', good: true }, { text: 'The market was very nice and busy.', good: false }] },
            { title: 'Common mistakes', body: 'Listing details with no order, relying on “nice”, “beautiful” and “very”, forgetting the overall impression, and drifting into a story with no description.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence is most descriptive?', options: ['Rain drummed on the zinc roof while the gutters gurgled.', 'It rained a lot.', 'The weather was bad.', 'There was rain and it was wet.'], answer: 0, why: 'It uses sound words and specific detail.' },
            { type: 'choice', q: 'Which is a spatial order?', options: ['From the gate to the classrooms to the field at the back', 'From the least to the most important', 'From Monday to Friday', 'From cause to effect'], answer: 0, why: 'Spatial order moves through space.' },
            { type: 'gap', q: 'The old man’s hands were ___, like the bark of a tree.', options: ['rough and cracked', 'nice', 'very good', 'okay'], answer: 0, why: 'A precise description plus a simile creates a picture.' },
            { type: 'error', q: 'Find the weak word.', parts: ['The beach at sunset', 'was very', 'nice,', 'with orange light on the water.'], answer: 2, fix: 'breathtaking (or a specific detail)', why: '“Nice” tells the reader nothing. Use a precise word or a detail.' },
            { type: 'choice', q: 'What should the introduction of a descriptive essay give?', options: ['The subject and the overall impression', 'A list of every detail', 'A thesis about a policy', 'A summary of a story'], answer: 0, why: 'The reader needs to know what is being described and the main feeling.' },
            { type: 'write', kind: 'essay', q: 'Write a short descriptive essay (three paragraphs) about a busy place you know.', minWords: 100, maxWords: 260, checklist: ['An introduction with the overall impression', 'A clear order', 'Details from at least three senses', 'A conclusion'], model: 'Every evening, the bus park near my house turns into a small, noisy city. It is crowded and chaotic, yet it has its own rhythm.\n\nFirstly, there is the sound. Conductors shout destinations, engines cough into life and hawkers call out the prices of water and bread. Meanwhile, horns blare whenever a driver tries to squeeze out.\n\nThe smells are just as strong. Diesel smoke hangs in the air, although the scent of roasted plantain from a roadside stall often wins. As the sun sets, the orange light turns the dust gold.\n\nIn conclusion, the bus park is loud and tiring, but it is also full of life. Whenever I pass it, I feel the energy of a whole city on the move.' }
          ]
        },
        {
          id: 'essay-argue', title: 'Argumentative and expository essays', minutes: 6,
          cards: [
            { title: 'Argumentative', body: 'An argumentative essay tries to persuade. Take a clear side, support it with reasons and examples, and answer the strongest point on the other side.' },
            { title: 'Expository', body: 'An expository essay explains a topic clearly and fairly, without taking sides: how something works, causes and effects, or steps in a process.', examples: [{ text: 'Expository: “How rainwater can be collected and stored at home.”', good: true }, { text: 'Argumentative: “Every home should collect rainwater.”', good: true }] },
            { title: 'Reasons beat opinions', body: '“I think uniforms are good” is an opinion. “Uniforms reduce pressure to wear expensive clothes” is a reason that can persuade.' },
            { title: 'Common mistakes', body: 'Arguments with no evidence, ignoring the other side completely, and emotional language instead of reasons.' }
          ],
          exercises: [
            { type: 'choice', q: '“How a bill becomes law in Nigeria.” What type of essay is this?', options: ['Expository', 'Argumentative', 'Narrative', 'Descriptive'], answer: 0, why: 'It explains a process without taking sides.' },
            { type: 'choice', q: 'Which is a reason, not just an opinion, for school uniforms?', options: ['Uniforms reduce pressure on students to wear expensive clothes.', 'I think uniforms are nice.', 'Uniforms are uniforms.', 'Everyone knows uniforms are best.'], answer: 0, why: 'A reason explains why, so it can persuade a reader who disagrees.' },
            { type: 'choice', q: 'How should an argumentative essay deal with the other side?', options: ['State the strongest opposing point and show why your side still wins', 'Pretend there is no other side', 'Insult people who disagree', 'Switch sides in the conclusion'], answer: 0, why: 'Answering the best counter-argument makes your case more convincing.' },
            { type: 'write', kind: 'essay', minParagraphs: 1, q: 'Write one argumentative paragraph: “Students should wear school uniforms.” Include a reason, an example and a reply to the other side.', minWords: 100, maxWords: 200, checklist: ['A clear position', 'A reason with an example', 'Mention the other side and answer it', 'Linking words'], model: 'Students should wear school uniforms because uniforms reduce the pressure to compete over clothes. For example, in schools without uniforms, some young people feel ashamed when their families cannot afford fashionable outfits, and this can damage their confidence in class. Uniforms also make it easy to recognise who belongs in the school, which keeps everyone safer. Some people argue that uniforms stop learners from expressing themselves. However, pupils can still show their personality through their ideas, their work, their hobbies and the clubs they join. Therefore, uniforms help every learner to focus on lessons rather than on appearance, and this makes the school a fairer place for all.' },
            { type: 'choice', q: 'What makes an argument persuasive?', options: ['A clear reason supported by evidence or an example', 'Writing in capital letters', 'Repeating the claim many times', 'Insulting the other side'], answer: 0, why: 'Reasons and evidence persuade; volume does not.' }
          ]
        },
        {
          id: 'essay-discursive', title: 'Discursive essays (for and against)', minutes: 6,
          cards: [
            { title: 'What it is', body: 'A discursive essay looks at both sides of an issue fairly before reaching a balanced conclusion. WAEC and IELTS often ask: “Discuss both views and give your opinion.”' },
            { title: 'Two good structures', body: 'Block: introduction, arguments for, arguments against, conclusion with your view. Point by point: each paragraph takes one issue and weighs both sides.' },
            { title: 'Balanced language', body: '“Supporters argue that…”, “On the other hand,…”, “Critics point out that…”, “While it is true that…, …”, “On balance,…”.', examples: [{ text: 'While it is true that exams cause stress, they also motivate many students.', good: true }] },
            { title: 'Common mistakes', body: 'Only giving one side, saying “I” in every sentence, giving your opinion before discussing both views, and a conclusion that does not answer the question.' }
          ],
          exercises: [
            { type: 'choice', q: 'What makes an essay discursive?', options: ['It weighs both sides before concluding', 'It tells a story', 'It describes a place', 'It only gives your opinion'], answer: 0, why: 'Discursive means discussing different views.' },
            { type: 'gap', q: '___ critics claim that homework is stressful, it helps students revise.', options: ['Although', 'Because', 'So', 'Then'], answer: 0, why: '“Although” introduces a contrast between the two views.' },
            { type: 'choice', q: 'Where should your own opinion appear in a discursive essay?', options: ['In the conclusion (and briefly in the introduction if asked)', 'In every sentence', 'Nowhere at all', 'Only in the title'], answer: 0, why: 'Discuss both views first, then judge.' },
            { type: 'order', q: 'Put a block-structure discursive essay in order.', parts: ['Introduction: the issue', 'Arguments for', 'Arguments against', 'Conclusion: your balanced view'], why: 'Both sides come before the judgement.' },
            { type: 'choice', q: 'Which phrase introduces the other side?', options: ['On the other hand,', 'For example,', 'In addition,', 'As a result,'], answer: 0, why: '“On the other hand” signals the opposing view.' },
            { type: 'write', kind: 'essay', q: 'Some people think students should wear uniforms; others think they should choose their own clothes. Discuss both views and give your opinion.', minWords: 110, maxWords: 300, checklist: ['An introduction that states the issue', 'A paragraph for each side', 'Balanced linking words', 'Your opinion in the conclusion'], model: 'Whether students should wear uniforms is a question that divides parents, teachers and students. Both sides have reasonable arguments.\n\nSupporters of uniforms argue that they save families money, because parents do not need to buy fashionable clothes. In addition, uniforms reduce bullying about clothing and help students focus on learning.\n\nOn the other hand, critics point out that uniforms limit self-expression. Teenagers are developing their identity, and choosing clothes is one way they do this. Moreover, some uniforms are expensive and uncomfortable in hot weather.\n\nOn balance, I believe uniforms should stay, although schools should make them affordable and suitable for the climate. In this way, schools can keep the benefits while answering the main criticisms.' }
          ]
        },
        {
          id: 'essay-expository', title: 'Expository essays: explain clearly', minutes: 6,
          cards: [
            { title: 'What it is', body: 'An expository essay explains a topic, process or cause and effect, without arguing. Examples: “Explain the causes of flooding in cities” or “How does recycling work?”' },
            { title: 'Patterns', body: 'Cause and effect, process (step by step), compare and contrast, and problem and solution. Pick one and organise your paragraphs around it.' },
            { title: 'Neutral tone', body: 'Use facts, examples and the third person. Avoid “I think” and emotional words.', examples: [{ text: 'Blocked drains are a major cause of urban flooding.', good: true }, { text: 'I think drains are terrible and annoying.', good: false }] },
            { title: 'Common mistakes', body: 'Slipping into opinion, explaining steps in a confusing order, missing examples, and not defining key terms.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which title asks for an expository essay?', options: ['Explain how rainfall causes flooding in cities.', 'Should cities ban cars? Give your opinion.', 'Describe your favourite place.', 'Write a story ending with “I never saw him again.”'], answer: 0, why: '“Explain how” asks you to inform, not argue.' },
            { type: 'choice', q: 'Which sentence fits an expository essay?', options: ['When drains are blocked, rainwater cannot escape and streets flood.', 'Flooding is the worst thing ever.', 'I hate the rainy season.', 'Everyone should be ashamed of the drains.'], answer: 0, why: 'It explains cause and effect neutrally.' },
            { type: 'gap', q: 'Plastic bottles are first collected. ___, they are sorted by type.', options: ['Next,', 'However,', 'In contrast,', 'Although'], answer: 0, why: '“Next” signals the following step of a process.' },
            { type: 'choice', q: 'Which pattern suits “Compare city life and village life”?', options: ['Compare and contrast', 'Process', 'Narrative', 'Descriptive'], answer: 0, why: 'The question asks for similarities and differences.' },
            { type: 'error', q: 'Find the part that does not suit an expository essay.', parts: ['Recycling reduces waste.', 'It also saves raw materials.', 'Honestly, I think people who litter are awful.', 'Many cities now recycle plastic.'], answer: 2, fix: 'Litter also blocks drains and pollutes rivers.', why: 'Expository essays explain; personal judgements belong in argumentative writing.' },
            { type: 'write', kind: 'essay', q: 'Write a short expository essay explaining two causes of traffic congestion in big cities and one effect.', minWords: 100, maxWords: 280, checklist: ['An introduction that names the topic', 'One paragraph per cause', 'An effect explained', 'A neutral tone'], model: 'Traffic congestion is a daily problem in many large cities. It has several causes, and its effects reach far beyond lost time.\n\nFirstly, the number of private cars has grown faster than the road network. As more families buy cars, roads that were built for fewer vehicles become crowded, especially at rush hour.\n\nSecondly, poor public transport pushes people into cars. When buses are unreliable or unsafe, commuters choose to drive, which adds even more vehicles to the roads.\n\nAs a result, congestion wastes millions of working hours and increases air pollution. In summary, cities can only reduce traffic by addressing both the number of cars and the quality of public transport.' }
          ]
        }
      ]
    },
    {
      title: 'Vocabulary and sentence construction',
      lessons: [
        {
          id: 'essay-register', title: 'Vocabulary and formal register', minutes: 6,
          cards: [
            { title: 'Register', body: 'Register is how formal your language is. Essays need a neutral to formal register: full words, no slang, and few personal phrases.' },
            { title: 'Formal swaps', body: 'get → obtain or receive; a lot of → many or a great deal of; kids → children; big → significant; show → demonstrate; think about → consider.', examples: [{ text: 'The policy had a significant effect on attendance.', good: true }, { text: 'The policy had a big effect on attendance.', good: false }] },
            { title: 'Precise, not fancy', body: 'Choose the word that says exactly what you mean. A long word used wrongly is worse than a short word used well.' },
            { title: 'Common mistakes', body: 'Contractions (don’t, can’t), slang, vague words (thing, stuff, good, bad), and words used with the wrong meaning to sound impressive.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which word is most formal?', options: ['obtain', 'get', 'grab', 'pick up'], answer: 0, why: '“Obtain” is the formal equivalent of “get”.' },
            { type: 'gap', q: 'The survey ___ that most students read online.', options: ['demonstrates', 'shows off', 'kind of shows', 'gets'], answer: 0, why: '“Demonstrates” is precise and formal.' },
            { type: 'error', q: 'Find the informal part.', parts: ['Governments should invest', 'in public libraries', 'because loads of kids', 'cannot afford books.'], answer: 2, fix: 'because many children', why: '“Loads of kids” is too informal for an essay.' },
            { type: 'choice', q: 'Which sentence avoids a contraction?', options: ['Students do not always have time to read.', 'Students don’t always have time to read.', 'Students dont always have time to read.', 'Students’ll not always have time.'], answer: 0, why: 'Formal essays write words in full.' },
            { type: 'choice', q: 'Replace “thing”: “Pollution is a bad thing.”', options: ['Pollution is a serious problem.', 'Pollution is a bad stuff.', 'Pollution is a big thing.', 'Pollution is a thing that is bad.'], answer: 0, why: '“Serious problem” is precise.' },
            { type: 'gap', q: 'We must ___ the needs of disabled students.', options: ['consider', 'think about stuff', 'look at things', 'get'], answer: 0, why: '“Consider” is formal and precise.' }
          ]
        },
        {
          id: 'essay-precise', title: 'Precise words and varied sentences', minutes: 6,
          cards: [
            { title: 'Swap vague words', body: 'Words like “good”, “nice”, “thing” and “very” tell the reader little. Say exactly what you mean.', examples: [{ text: 'a good meal → a filling, spicy meal', good: true }, { text: 'very tired → exhausted', good: true }] },
            { title: 'Vary sentence length', body: 'A mix of short and longer sentences keeps writing lively. Too many short sentences sound choppy; too many long ones are hard to follow.' },
            { title: 'No “very” before absolutes', body: 'Words like “unique”, “perfect” and “impossible” are already absolute.', examples: [{ text: 'a unique design', good: true }, { text: 'a very unique design', good: false }] },
            { title: 'Common mistakes', body: 'Stacking adjectives (“very very big”), using a thesaurus word with the wrong meaning, and repeating the same word in every sentence.' }
          ],
          exercises: [
            { type: 'choice', q: 'Choose the most precise replacement for “very tired”.', options: ['exhausted', 'tired', 'good', 'sleepy-ish'], answer: 0, why: '“Exhausted” is one strong word that means very tired.' },
            { type: 'choice', q: 'Which revision of “The food was nice” is the most precise?', options: ['The jollof rice was smoky and perfectly spiced.', 'The food was very nice.', 'The food was nice and good.', 'It was nice food.'], answer: 0, why: 'It names the food and says exactly what was good about it.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['Her design', 'was', 'very unique', 'and colourful.'], answer: 2, fix: 'unique', why: '“Unique” means one of a kind, so “very” adds nothing.' },
            { type: 'write', kind: 'paragraph', passage: 'Reading is good. Reading is good for students because it is good for their English. Students should read good books. Reading is also good because you learn things. In conclusion reading is good.', q: 'Rewrite this weak paragraph. Replace the repeated “good”, add an example, and vary your sentences.', minWords: 50, maxWords: 150, checklist: ['No more than one “good”', 'A specific example', 'Short and longer sentences'], model: 'Reading regularly strengthens a student’s English. Each book introduces new words and shows how skilled writers build sentences. For example, a student who reads a short novel every month soon notices phrases they can use in their own essays. Reading also widens knowledge of the world. In short, a reading habit pays off in every subject.' },
            { type: 'choice', q: 'Which is most precise?', options: ['The bridge collapsed after heavy rain.', 'The bridge had a bad thing happen.', 'Something happened to the bridge.', 'The bridge was very very bad.'], answer: 0, why: 'It says exactly what happened and why.' }
          ]
        },
        {
          id: 'essay-sentences', title: 'Sentence types and variety', minutes: 6,
          cards: [
            { title: 'Four sentence types', body: 'Simple: one clause (Prices rose.). Compound: two clauses joined by and, but, or, so (Prices rose, so sales fell.). Complex: a main clause plus a dependent one (Because prices rose, sales fell.). Compound-complex: both.' },
            { title: 'Why variety matters', body: 'All short sentences sound choppy; all long ones are tiring. Mix them, and use a short sentence for emphasis after a longer one.', examples: [{ text: 'The council promised new roads, better drainage and more buses. Nothing happened.', good: true }] },
            { title: 'Vary the openings', body: 'Start some sentences with a linking word, a time phrase or a dependent clause instead of “The” or “I”.' },
            { title: 'Common mistakes', body: 'Every sentence starting with the subject, strings of “and… and… and”, and joining two full sentences with only a comma (a comma splice).' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a complex sentence?', options: ['Although it rained, the match continued.', 'It rained.', 'It rained, and the match continued.', 'Rain!'], answer: 0, why: 'It has a dependent clause (“Although it rained”) and a main clause.' },
            { type: 'choice', q: 'Which is a compound sentence?', options: ['The bus was late, so I walked.', 'I walked.', 'Because the bus was late, I walked.', 'Walking to school.'], answer: 0, why: 'Two main clauses joined by “so”.' },
            { type: 'error', q: 'Find the error.', parts: ['The library was closed,', 'we studied', 'in the canteen', 'instead.'], answer: 0, fix: 'The library was closed, so we studied in the canteen instead.', why: 'Two full sentences cannot be joined with only a comma.' },
            { type: 'choice', q: 'Which version has the most variety?', options: ['When the results came out, everyone was shocked. Nobody had passed. The school demanded answers.', 'The results came out. Everyone was shocked. Nobody passed. The school asked.', 'The results came out and everyone was shocked and nobody had passed and the school asked.', 'Results out. Shock. No pass.'], answer: 0, why: 'It mixes a complex opener, a short emphatic sentence and a medium one.' },
            { type: 'gap', q: '___ the price of fuel rose, transport fares doubled.', options: ['When', 'And', 'But', 'So'], answer: 0, why: '“When” creates a complex sentence with a time clause.' },
            { type: 'write', kind: 'paragraph', q: 'Rewrite this choppy paragraph with varied sentences: “Our school has a garden. Students grow vegetables. They sell them. The money buys books. It is a good idea.”', minWords: 35, maxWords: 100, checklist: ['At least one complex sentence', 'At least one compound sentence', 'Varied openings', 'No comma splices'], model: 'Our school has a small garden where students grow vegetables. Every Friday, they sell the harvest to parents, and the money buys new books for the library. Because everyone benefits, the project has become very popular. Moreover, students learn about business while they work.' }
          ]
        }
      ]
    },
    {
      title: 'Grammar and punctuation',
      lessons: [
        {
          id: 'essay-grammar', title: 'Grammar: agreement, tense, fragments', minutes: 7,
          cards: [
            { title: 'Subject–verb agreement', body: 'A singular subject takes a singular verb; a plural subject takes a plural verb. Find the real subject and ignore phrases in between.', examples: [{ text: 'The quality of the roads is poor.', good: true }, { text: 'The quality of the roads are poor.', good: false }] },
            { title: 'Tense consistency', body: 'Stay in one tense unless the time really changes. Argument essays mostly use the present; narratives mostly use the past.' },
            { title: 'Fragments and run-ons', body: 'A fragment is missing a subject or a main verb (“Because it was late.”). A run-on joins sentences with no punctuation. Fix them by joining correctly or splitting.', examples: [{ text: 'Because it was late, we took a taxi.', good: true }, { text: 'Because it was late. We took a taxi.', good: false }] },
            { title: 'Common mistakes', body: '“Everyone have”, “each of the students are”, switching from past to present mid-paragraph, and starting a sentence with “Because” without finishing it.' }
          ],
          exercises: [
            { type: 'gap', q: 'Each of the students ___ a laptop.', options: ['has', 'have', 'are having', 'were have'], answer: 0, why: '“Each” is singular, so the verb is “has”.' },
            { type: 'gap', q: 'The list of names ___ on the notice board.', options: ['is', 'are', 'were', 'be'], answer: 0, why: 'The subject is “list” (singular), not “names”.' },
            { type: 'error', q: 'Find the error.', parts: ['Yesterday the teacher', 'walks into the class', 'and asked', 'for our homework.'], answer: 1, fix: 'walked into the class', why: 'The paragraph is in the past, so “walks” must be “walked”.' },
            { type: 'choice', q: 'Which is a complete sentence?', options: ['Because the bridge collapsed, the road was closed.', 'Because the bridge collapsed.', 'The road closed because.', 'After the long rain.'], answer: 0, why: 'It has a dependent clause and a complete main clause.' },
            { type: 'error', q: 'Find the error.', parts: ['Everyone in the class', 'have finished', 'the test', 'on time.'], answer: 1, fix: 'has finished', why: '“Everyone” is singular.' },
            { type: 'choice', q: 'How do you fix this run-on: “Prices are rising people are worried”?', options: ['Prices are rising, and people are worried.', 'Prices are rising people, are worried.', 'Prices, are rising people are worried.', 'Prices are rising people are worried!'], answer: 0, why: 'Join the two clauses with a comma and a conjunction.' },
            { type: 'gap', q: 'Neither the teacher nor the students ___ ready.', options: ['were', 'was', 'is', 'has'], answer: 0, why: 'With “neither… nor”, the verb agrees with the nearer subject (“students”).' }
          ]
        },
        {
          id: 'essay-punctuation', title: 'Punctuation: commas, apostrophes, semicolons', minutes: 7,
          cards: [
            { title: 'Commas', body: 'Use commas after an introductory phrase (However, …), in lists (books, pens and paper), before a conjunction joining two clauses (…, but…), and around extra information (My brother, who lives in Abuja, is a doctor.).' },
            { title: 'Apostrophes', body: 'Possession: the student’s book (one student), the students’ books (many). It’s = it is; its = belonging to it. Never use an apostrophe to make a plural.', examples: [{ text: 'The school changed its rules.', good: true }, { text: 'The school changed it’s rules.', good: false }] },
            { title: 'Semicolons and colons', body: 'A semicolon joins two closely linked full sentences (Some students walk; others take the bus.). A colon introduces a list or explanation after a full sentence (We need three things: time, money and support.).' },
            { title: 'Quotation marks', body: 'Use them for direct quotations and titles of short works. Put the full stop or comma inside when it belongs to the quotation.' },
            { title: 'Common mistakes', body: 'Comma splices, “its/it’s” confusion, apostrophes in plurals (“mango’s for sale”), and a colon after an incomplete sentence (“We need: time and money”).' }
          ],
          exercises: [
            { type: 'gap', q: 'The dog wagged ___ tail.', options: ['its', 'it’s', 'its’', 'it is'], answer: 0, why: '“Its” shows possession; “it’s” means “it is”.' },
            { type: 'choice', q: 'Which is correct for books belonging to several students?', options: ['the students’ books', 'the student’s books', 'the students books’', 'the student’s’ books'], answer: 0, why: 'For a plural ending in s, the apostrophe goes after the s.' },
            { type: 'choice', q: 'Which uses a semicolon correctly?', options: ['Some students walk; others take the bus.', 'Some students; walk to school.', 'We need; pens and paper.', 'Because; it rained.'], answer: 0, why: 'A semicolon joins two full, related sentences.' },
            { type: 'error', q: 'Find the punctuation error.', parts: ['We sell', 'mango’s,', 'oranges and', 'pineapples.'], answer: 1, fix: 'mangoes,', why: 'Plurals never take an apostrophe.' },
            { type: 'choice', q: 'Which uses a colon correctly?', options: ['You need three things: a pen, a ruler and an eraser.', 'You need: a pen and a ruler.', 'The: answer is yes.', 'I went to: the market.'], answer: 0, why: 'The colon follows a complete sentence and introduces a list.' },
            { type: 'gap', q: 'However___ the results improved the following year.', options: [',', ';', ':', '.'], answer: 0, why: 'Put a comma after an introductory linking word.' },
            { type: 'error', q: 'Find the error.', parts: ['My sister', 'who is a nurse', 'works in Kano,', 'and loves her job.'], answer: 1, fix: ', who is a nurse,', why: 'Extra information in the middle of a sentence needs commas on both sides.' }
          ]
        }
      ]
    },
    {
      title: 'Linking and improving your essay',
      lessons: [
        {
          id: 'essay-linkers', title: 'Linking your ideas', minutes: 5,
          cards: [
            { title: 'Linking words by job', body: 'Linking words show how ideas connect. Choose them by what they do.', examples: [{ text: 'Adding: moreover, in addition, also', good: true }, { text: 'Contrasting: however, although, on the other hand', good: true }, { text: 'Cause and effect: therefore, as a result, because', good: true }, { text: 'Examples: for example, for instance', good: true }] },
            { title: 'Do not double up', body: '“Although” and “but” both show contrast. Use one, not both.', examples: [{ text: 'Although it rained, we played.', good: true }, { text: 'Although it rained, but we played.', good: false }] },
            { title: 'Common mistakes', body: 'Using the same linker every time (“also… also…”), using a linker with the wrong meaning (“however” to add an idea), and starting every sentence with a linker.' }
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
          id: 'essay-editing', title: 'Editing and improving your essay', minutes: 7,
          cards: [
            { title: 'Edit in three passes', body: 'First, content: does every paragraph support the thesis? Second, organisation: are topic sentences clear and links smooth? Third, accuracy: grammar, spelling and punctuation.' },
            { title: 'A self-check list', body: 'Clear thesis? One idea per paragraph? Examples for each point? Linking words? No contractions or slang? Varied sentences? Word count met? Spelling checked?' },
            { title: 'Cut and sharpen', body: 'Delete repetition, filler (“basically”, “in my own opinion I think”) and vague words. Replace them with specific detail.', examples: [{ text: 'In my opinion, homework should be limited.', good: true }, { text: 'In my own personal opinion, I basically think that homework should kind of be limited.', good: false }] },
            { title: 'Real-life use', body: 'Professional writers always edit. A cover letter, report or application improves more in ten minutes of editing than in an hour of extra drafting.' },
            { title: 'Common mistakes', body: 'Not leaving time to edit, only checking spelling, changing the thesis but not the body, and reading too fast to notice errors. Read slowly, ideally aloud.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should the first editing pass check?', options: ['Whether every paragraph supports the thesis', 'Commas only', 'The font', 'The title spelling'], answer: 0, why: 'Fix big problems (content) before small ones (punctuation).' },
            { type: 'choice', q: 'Which is the most concise?', options: ['In my opinion, homework should be limited.', 'In my own personal opinion, I think homework should be limited.', 'I personally think in my opinion that homework should be limited.', 'Basically, in my view, I feel homework should sort of be limited.'], answer: 0, why: 'It removes repetition and filler.' },
            { type: 'error', q: 'Find the part to cut.', parts: ['Recycling saves money,', 'and basically, at the end of the day,', 'it also', 'protects the environment.'], answer: 1, fix: 'and', why: 'Filler phrases add words but no meaning.' },
            { type: 'choice', q: 'A paragraph contains two unrelated ideas. What should you do?', options: ['Split it into two paragraphs, or remove the idea that does not fit', 'Add more words', 'Leave it', 'Move it to the title'], answer: 0, why: 'One idea per paragraph keeps the essay clear.' },
            { type: 'order', q: 'Put the editing passes in order.', parts: ['Content: does it answer the question?', 'Organisation: paragraphs and links', 'Accuracy: grammar, spelling, punctuation'], why: 'Work from the big picture to the details.' },
            { type: 'write', kind: 'paragraph', q: 'Edit this paragraph to make it formal, concise and correct: “In my own opinion i think that kids should do sports alot because its good for there health and stuff, sports makes them happy to.”', minWords: 25, maxWords: 90, checklist: ['No slang or vague words', 'Correct spelling (a lot, their, too)', 'No comma splice', 'Formal tone'], model: 'In my view, children should take part in sport regularly, because it improves their physical health. In addition, exercise reduces stress and therefore helps them feel happier and more confident.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'essay-final', title: 'Final assessment: Essays', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '14 questions from the whole course: structure, essay types, vocabulary, sentences, grammar, punctuation, linking and editing. Each answer comes with an explanation. Use “Explain it again” if you get one wrong.' },
            { title: 'Before you start', body: 'Take your time: this assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'Where does the thesis statement usually appear?', options: ['At the end of the introduction', 'In the middle of the conclusion', 'In the first body paragraph', 'In the title'], answer: 0, why: 'It closes the introduction and leads into the body.' },
            { type: 'choice', q: 'What does PEEL stand for?', options: ['Point, Evidence, Explain, Link', 'Plan, Edit, Explain, List', 'Point, Example, End, Leave', 'Paragraph, Essay, Ending, Linker'], answer: 0, why: 'PEEL builds a strong body paragraph.' },
            { type: 'choice', q: 'Which essay type weighs both sides before concluding?', options: ['Discursive', 'Narrative', 'Descriptive', 'Expository'], answer: 0, why: 'Discursive essays discuss different views.' },
            { type: 'choice', q: '“Explain how recycling works” asks for which type?', options: ['Expository', 'Argumentative', 'Narrative', 'Descriptive'], answer: 0, why: 'It asks you to inform, not argue.' },
            { type: 'gap', q: 'The results ___ that attendance improved.', options: ['demonstrate', 'kinda show', 'gets', 'shows off'], answer: 0, why: '“Demonstrate” is formal and agrees with “results”.' },
            { type: 'gap', q: 'The number of students ___ increasing every year.', options: ['is', 'are', 'were', 'have'], answer: 0, why: 'The subject is “number” (singular).' },
            { type: 'error', q: 'Find the error.', parts: ['The school', 'has changed', 'it’s', 'rules.'], answer: 2, fix: 'its', why: '“Its” shows possession.' },
            { type: 'error', q: 'Find the error.', parts: ['The rain stopped,', 'we went', 'outside to', 'play football.'], answer: 0, fix: 'The rain stopped, so we went outside to play football.', why: 'A comma alone cannot join two sentences.' },
            { type: 'choice', q: 'Which is a complex sentence?', options: ['Because the road was flooded, school closed early.', 'The road flooded.', 'The road flooded, and school closed.', 'Flooded roads.'], answer: 0, why: 'It has a dependent clause and a main clause.' },
            { type: 'gap', q: 'Exams cause stress. ___, they motivate many students.', options: ['However', 'For example', 'Firstly', 'As a result'], answer: 0, why: '“However” introduces a contrast.' },
            { type: 'choice', q: 'What should a conclusion avoid?', options: ['A new argument', 'A restated thesis', 'A short summary', 'A final thought'], answer: 0, why: 'New arguments belong in the body.' },
            { type: 'choice', q: 'Which hook is weakest?', options: ['Since the beginning of time, people have eaten food.', 'In my class, one in three students skips breakfast.', 'What would you do with one extra hour a day?', 'At 6 a.m., the queue for water was already long.'], answer: 0, why: 'It is vague and overused.' },
            { type: 'order', q: 'Put the essay parts in order.', parts: ['Hook', 'Thesis', 'Body paragraphs', 'Conclusion'], why: 'Introduction (hook and thesis), body, conclusion.' },
            { type: 'choice', q: 'What is the best first step when editing?', options: ['Check that every paragraph supports the thesis', 'Count commas', 'Change the font', 'Add longer words'], answer: 0, why: 'Fix content before details.' }
          ]
        }
      ]
    }
  ]
};
