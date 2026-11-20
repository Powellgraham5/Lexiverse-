// SAT Reading and Writing path. Practice material written for Lexiverse: not official SAT
export default {
  note: 'Practice questions written for Lexiverse in the style of the digital SAT. They are not official SAT questions. Check the College Board website for the current test format.',
  guide: [
    'Start with the test at a glance, then work through the four content domains: Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions.',
    'Every question is SAT style but written for Lexiverse. Use the official free practice tests as well.',
    'Read each explanation, especially when you got the answer right by guessing.',
    'Finish with pacing strategy and the final assessment, then take the practice test timed.',
    'Save grammar rules and transition words to your notebook.'
  ],
  improve: [
    'Do 10 questions a day from one domain and track which question types you miss.',
    'For every wrong answer, write why the right answer is right and why yours was wrong.',
    'Learn the punctuation rules for joining clauses until you can apply them in seconds.',
    'Read one short science or history article a day and state its main idea in one sentence.',
    'Practise with the official free digital practice tests under timed conditions.',
    'Predict an answer before looking at the choices, then find the option that matches.'
  ],
  units: [
    {
      title: 'Know the test',
      lessons: [
        {
          id: 'sat-format', title: 'The digital SAT Reading and Writing section', minutes: 4, kind: 'intro',
          cards: [
            { title: 'Short passages, one question each', body: 'The Reading and Writing section has two modules of 27 questions, 32 minutes each. Every question has its own short passage, from a sentence to a paragraph, and four answer choices.' },
            { title: 'Adaptive', body: 'The test is adaptive: how you do in the first module decides whether the second module is easier or harder.' },
            { title: 'Four kinds of question', body: 'Information and Ideas (what a text says and what supports a claim), Craft and Structure (word meaning and purpose), Expression of Ideas (transitions and combining notes), and Standard English Conventions (grammar and punctuation).' },
            { title: 'No essay', body: 'The SAT no longer has an essay. Your writing skills are tested through the multiple-choice questions. Scores for Reading and Writing range from 200 to 800.' },
            { title: 'Common mistakes', body: 'Preparing for an essay that no longer exists, ignoring the adaptive design, and practising with long passages from the old paper SAT.' }
          ],
          exercises: [
            { type: 'choice', q: 'How many answer choices does each SAT Reading and Writing question have?', options: ['Four', 'Three', 'Five', 'Two'], answer: 0, why: 'Each question has four choices.' },
            { type: 'choice', q: 'Does the current SAT include an essay?', options: ['No, the essay was removed', 'Yes, it is required', 'Yes, it is the whole test', 'Only in Module 2'], answer: 0, why: 'The essay is no longer part of the SAT.' },
            { type: 'choice', q: 'What does “adaptive” mean on the digital SAT?', options: ['The second module’s difficulty depends on how you did in the first', 'You choose the questions', 'The test changes language', 'There is no time limit'], answer: 0, why: 'Your first-module performance decides the second module.' },
            { type: 'choice', q: 'What is the score range for the Reading and Writing section?', options: ['200 to 800', '0 to 100', '1 to 9', '400 to 1600'], answer: 0, why: 'Each section is scored from 200 to 800. 400 to 1600 is the total for both sections.' },
            { type: 'choice', q: 'How many modules does the Reading and Writing section have?', options: ['Two', 'One', 'Four', 'Six'], answer: 0, why: 'The section has two modules; the second adapts to your performance in the first.' }
          ]
        }
      ]
    },
    {
      title: 'Information and Ideas',
      lessons: [
        {
          id: 'sat-central', title: 'Central ideas and details', minutes: 6,
          cards: [
            { title: 'What the question asks', body: '“Which choice best states the main idea of the text?” The answer covers the whole passage, not just one sentence.' },
            { title: 'How to find it', body: 'Read the whole passage, then say its point in your own words before looking at the choices. Eliminate options that are too narrow, too broad or not stated.', examples: [{ text: 'Main idea: city hives produce more honey because cities have more varied flowers.', good: true }] },
            { title: 'Detail questions', body: '“According to the text…” The answer is stated directly, usually in different words. Find the line that proves it.' },
            { title: 'Common mistakes', body: 'Choosing an option that is true but only covers one detail, choosing an option that goes beyond the text, and relying on outside knowledge.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which choice best states the main idea of the text?', options: ['City hives may produce more honey because cities offer more varied flowers.', 'Farms should stop growing single crops.', 'Bees cannot survive on farms.', 'Honey from cities tastes better.'], answer: 0, why: 'It covers both the finding and the explanation.', passage: 'Researchers studying urban beekeeping found that hives in cities produced more honey than hives in nearby farmland. The team suggests that city parks and gardens offer a wider variety of flowers throughout the season, while farms often grow a single crop that blooms only briefly.' },
            { type: 'choice', q: 'According to the text, why might farm hives produce less honey?', options: ['Farms often grow one crop that blooms briefly.', 'Farmers use more chemicals.', 'Farm bees are a different species.', 'Farms are too cold.'], answer: 0, why: 'The text says farms grow “a single crop that blooms only briefly”.', passage: 'Researchers studying urban beekeeping found that hives in cities produced more honey than hives in nearby farmland. The team suggests that city parks and gardens offer a wider variety of flowers throughout the season, while farms often grow a single crop that blooms only briefly.' },
            { type: 'choice', q: 'Which choice best states the main idea?', options: ['An artist’s murals, once dismissed, became influential landmarks.', 'Critics are always wrong.', 'Murals are only decoration.', 'Young artists dislike public spaces.'], answer: 0, why: 'It summarises the change from dismissal to influence.', passage: 'When the artist Nike Davies-Okundaye painted her first large mural, critics dismissed it as decoration. Within a decade, however, her murals had become landmarks, and younger artists cited her as the reason they began working in public spaces.' },
            { type: 'choice', q: 'An option is true but mentions only one sentence of the passage. It is probably', options: ['too narrow', 'the main idea', 'too broad', 'the best answer'], answer: 0, why: 'Main ideas cover the whole text.' },
            { type: 'choice', q: 'What should you do before reading the answer choices?', options: ['State the main idea in your own words', 'Guess', 'Read only the last line', 'Count the words'], answer: 0, why: 'Predicting protects you from attractive wrong options.' }
          ]
        },
        {
          id: 'sat-inference', title: 'Inferences: completing the text', minutes: 7,
          cards: [
            { title: 'What the question asks', body: 'The passage ends with a blank: “Which choice most logically completes the text?” The answer must follow from the information given.' },
            { title: 'Follow the logic', body: 'Identify the claim, the evidence and any contrast (however, but). The correct answer is the conclusion the evidence supports, no more.' },
            { title: 'Stay modest', body: 'Correct inferences are usually cautious. Extreme words (always, never, proves, all) are often wrong.', examples: [{ text: 'suggests that more varied flowers may increase honey production', good: true }, { text: 'proves that all bees prefer cities', good: false }] },
            { title: 'Common mistakes', body: 'Choosing an answer that sounds smart but is not supported, ignoring contrast words, and bringing in outside knowledge.' }
          ],
          exercises: [
            { type: 'choice', q: 'Passage: “Plants in the shaded part of the garden grew more slowly than those in full sun. The soil and water were the same in both areas. This suggests that ______” Which choice most logically completes the text?', options: ['sunlight affected how quickly the plants grew.', 'the soil was poor in the shade.', 'shaded plants were watered less.', 'all plants dislike shade forever.'], answer: 0, why: 'Soil and water were controlled, so sunlight is the likely cause.' },
            { type: 'choice', q: 'Passage: “The museum extended its opening hours, and visitor numbers rose by 30%. However, the number of school groups did not change. This suggests that the extra visitors were likely ______”', options: ['people who could only visit outside school hours.', 'school groups.', 'museum staff.', 'people who never visit museums.'], answer: 0, why: 'School groups stayed the same, so the increase came from other visitors.' },
            { type: 'choice', q: 'Which word in an answer choice is often a warning sign?', options: ['always', 'may', 'suggests', 'likely'], answer: 0, why: 'Extreme words often claim more than the evidence shows.' },
            { type: 'choice', q: 'Based on the text, which conclusion is best supported?', options: ['More sleep is linked to better memory test scores.', 'Sleep definitely causes higher scores.', 'Students should sleep 12 hours.', 'Memory tests are unfair.'], answer: 0, why: 'The researchers say it shows a link, not proof.', passage: 'In a study of 300 secondary school students, those who slept at least eight hours on school nights scored, on average, 12% higher on memory tests than those who slept fewer than six hours. The researchers caution that the study shows a link, not proof that sleep causes the difference.' },
            { type: 'choice', q: 'A passage gives evidence and then uses “however”. What should you do?', options: ['Pay attention to the contrast; it often changes the conclusion', 'Ignore it', 'Choose the first option', 'Stop reading'], answer: 0, why: 'Contrast words signal a shift in the logic.' }
          ]
        },
        {
          id: 'sat-evidence', title: 'Command of evidence', minutes: 6,
          cards: [
            { title: 'Support the exact claim', body: 'These questions give a claim and ask which finding best supports it. The right choice matches the claim closely; wrong choices are often true but about something else.' },
            { title: 'Find the claim first', body: 'Underline the exact claim in the question. The right quotation or finding supports that claim directly, not just the topic.' },
            { title: 'Common mistakes', body: 'Choosing evidence about the right topic but the wrong claim, and choosing the quotation that sounds most dramatic.' }
          ],
          exercises: [
            { type: 'choice', q: 'A student claims that reading aloud to young children improves their vocabulary. Which finding best supports this claim?', options: ['Children who were read to daily knew more words at age five than children who were not.', 'Many parents enjoy reading to their children.', 'Picture books are popular in libraries.', 'Older children prefer to read silently.'], answer: 0, why: 'Only this choice links reading aloud to a measured difference in vocabulary.' },
            { type: 'choice', q: 'A researcher claims that a new fertiliser increases tomato harvests. Which result would best support this?', options: ['Plots with the fertiliser produced 30% more tomatoes than identical plots without it.', 'The fertiliser is cheaper than older brands.', 'Tomatoes grow well in warm weather.', 'Farmers said the fertiliser smelled pleasant.'], answer: 0, why: 'It compares harvests with and without the fertiliser under the same conditions.' },
            { type: 'choice', q: 'A historian claims that the town’s market was busiest in the dry season, from November to March. Which detail best supports this?', options: ['Records show traders paid the most market fees between November and March.', 'The market sold cloth and grain.', 'The town was founded in 1850.', 'Some traders travelled from far away.'], answer: 0, why: 'Market fees show how busy the market was, and they were highest in exactly the months the claim names.' },
            { type: 'choice', q: 'Which finding best supports the claim that sleep is linked to memory?', options: ['Students who slept at least eight hours scored 12% higher on memory tests.', 'The study involved 300 students.', 'The researchers were cautious.', 'The students attended secondary school.'], answer: 0, why: 'It directly links sleep to memory scores.', passage: 'In a study of 300 secondary school students, those who slept at least eight hours on school nights scored, on average, 12% higher on memory tests than those who slept fewer than six hours. The researchers caution that the study shows a link, not proof that sleep causes the difference.' },
            { type: 'choice', q: 'Evidence is about the right topic but not the exact claim. It is', options: ['wrong', 'correct', 'the best answer', 'partly right, so choose it'], answer: 0, why: 'Evidence must support the specific claim.' }
          ]
        },
        {
          id: 'sat-data', title: 'Quantitative evidence: tables and graphs', minutes: 7,
          cards: [
            { title: 'What the question asks', body: 'A short text plus a table or graph. “Which choice most effectively uses data from the table to complete the example?” The answer must be accurate and match the claim.' },
            { title: 'Two checks', body: 'First, is the statement true according to the data? Second, does it support the specific claim in the text? Many wrong answers are true but irrelevant.', examples: [{ text: 'Claim: screen time rose then fell. Answer: it rose from 4.1 to 6.3 hours, then fell to 5.2.', good: true }] },
            { title: 'Read labels carefully', body: 'Check units, years and categories. A small misreading (hours or minutes, 2020 or 2022) makes an answer wrong.' },
            { title: 'Common mistakes', body: 'Choosing a true fact that does not support the claim, misreading axes or units, and comparing the wrong categories.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which choice accurately describes the data?', options: ['Screen time rose between 2018 and 2020, then fell by 2022.', 'Screen time fell every year.', 'Screen time was highest in 2018.', 'Screen time stayed the same.'], answer: 0, why: '4.1 to 6.3 is a rise; 6.3 to 5.2 is a fall.', passage: 'Table: Average daily screen time (hours). 2018: 4.1. 2020: 6.3. 2022: 5.2.' },
            { type: 'choice', q: 'In which year was screen time highest?', options: ['2020', '2018', '2022', 'All years were equal'], answer: 0, why: '6.3 hours in 2020 is the highest value.', passage: 'Table: Average daily screen time (hours). 2018: 4.1. 2020: 6.3. 2022: 5.2.' },
            { type: 'choice', q: 'A student claims screen time in 2022 was still higher than in 2018. Which data supports this?', options: ['5.2 hours in 2022 compared with 4.1 hours in 2018', '6.3 hours in 2020', '4.1 hours in 2018 only', '5.2 hours in 2022 compared with 6.3 hours in 2020'], answer: 0, why: 'It compares exactly the two years in the claim.', passage: 'Table: Average daily screen time (hours). 2018: 4.1. 2020: 6.3. 2022: 5.2.' },
            { type: 'choice', q: 'An answer is true according to the graph but does not relate to the claim. It is', options: ['wrong', 'correct', 'partly correct', 'the best choice'], answer: 0, why: 'It must both be accurate and support the claim.' },
            { type: 'choice', q: 'What should you check first on a graph?', options: ['The labels, units and categories', 'The colours', 'The title font', 'Nothing'], answer: 0, why: 'Misreading labels causes many errors.' }
          ]
        }
      ]
    },
    {
      title: 'Craft and Structure',
      lessons: [
        {
          id: 'sat-words', title: 'Words in context', minutes: 5,
          cards: [
            { title: 'Predict, then match', body: 'Cover the choices. Read the sentence and think of your own word for the blank. Then pick the choice closest to your word.' },
            { title: 'Use the clues', body: 'Look for contrast words (“although”, “but”) or support words (“and”, “indeed”) that tell you the direction of the missing word.' },
            { title: 'Common mistakes', body: 'Choosing the most common meaning of a word instead of its meaning in context, and choosing a word that is too positive or too negative for the sentence.' }
          ],
          exercises: [
            { type: 'gap', q: 'Although the first results were promising, the researchers remained ___, insisting that more tests were needed.', options: ['cautious', 'thrilled', 'careless', 'certain'], answer: 0, why: '“Although … promising” and “more tests were needed” show they were careful, not excited.' },
            { type: 'gap', q: 'The novelist’s style is famously ___: she can describe a whole life in a single sentence.', options: ['concise', 'wordy', 'confusing', 'ancient'], answer: 0, why: 'Describing a life in one sentence means her style is brief and precise.' },
            { type: 'gap', q: 'The new bridge was designed to ___ traffic jams by giving drivers a second route into the city.', options: ['alleviate', 'worsen', 'celebrate', 'ignore'], answer: 0, why: 'A second route would reduce, or alleviate, traffic jams.' },
            { type: 'gap', q: 'Far from being ___, the old map proved essential to finding the lost village.', options: ['useless', 'valuable', 'accurate', 'detailed'], answer: 0, why: '“Far from being … essential” needs the opposite of essential: useless.' },
            { type: 'gap', q: 'The witness gave a ___ account, leaving out no detail.', options: ['thorough', 'brief', 'vague', 'careless'], answer: 0, why: '“Leaving out no detail” points to thorough.' }
          ]
        },
        {
          id: 'sat-purpose', title: 'Text structure and purpose', minutes: 6,
          cards: [
            { title: 'Purpose questions', body: '“Which choice best describes the main purpose of the text?” Use verbs that match the author’s job: to explain, to argue, to describe, to challenge a view, to present a finding.' },
            { title: 'Structure questions', body: '“Which choice best describes the function of the underlined sentence?” Ask what the sentence does: introduces a claim, gives an example, presents a contrast, offers a conclusion.', examples: [{ text: 'The sentence beginning “Within a decade, however” presents a contrast with the critics’ early view.', good: true }] },
            { title: 'Read for the shape', body: 'Many passages follow a pattern: claim then evidence, problem then solution, common view then challenge.' },
            { title: 'Common mistakes', body: 'Describing the topic instead of the purpose, choosing a verb that is too strong (“to attack”), and ignoring signal words such as however and for example.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which choice best describes the main purpose of the text?', options: ['To show how an artist’s reputation changed over time', 'To criticise public art', 'To explain how to paint murals', 'To argue that critics should be ignored'], answer: 0, why: 'The text moves from dismissal to recognition.', passage: 'When the artist Nike Davies-Okundaye painted her first large mural, critics dismissed it as decoration. Within a decade, however, her murals had become landmarks, and younger artists cited her as the reason they began working in public spaces.' },
            { type: 'choice', q: 'What is the function of the second sentence?', options: ['It contrasts the critics’ early view with the murals’ later influence.', 'It introduces the artist for the first time.', 'It gives a definition of a mural.', 'It repeats the first sentence.'], answer: 0, why: '“However” signals the contrast.', passage: 'When the artist Nike Davies-Okundaye painted her first large mural, critics dismissed it as decoration. Within a decade, however, her murals had become landmarks, and younger artists cited her as the reason they began working in public spaces.' },
            { type: 'choice', q: 'Which best describes the structure of the text?', options: ['A finding, then a possible explanation', 'A question, then a joke', 'A list of unrelated facts', 'A story with dialogue'], answer: 0, why: 'It presents a result and suggests why.', passage: 'Researchers studying urban beekeeping found that hives in cities produced more honey than hives in nearby farmland. The team suggests that city parks and gardens offer a wider variety of flowers throughout the season, while farms often grow a single crop that blooms only briefly.' },
            { type: 'choice', q: 'Which verb is usually too strong for a neutral science passage?', options: ['to attack', 'to explain', 'to describe', 'to present'], answer: 0, why: 'Neutral texts rarely “attack” anything.' },
            { type: 'choice', q: 'A sentence begins “For example,”. What is its likely function?', options: ['To support a claim with an illustration', 'To contradict the claim', 'To conclude the text', 'To change the topic'], answer: 0, why: '“For example” introduces supporting evidence.' }
          ]
        },
        {
          id: 'sat-crosstext', title: 'Cross-text connections', minutes: 7,
          cards: [
            { title: 'What the question asks', body: 'Two short texts on the same topic. “Based on the texts, how would the author of Text 2 most likely respond to Text 1?”' },
            { title: 'Map each position', body: 'Summarise each text in a few words: Text 1 claims X; Text 2 found Y. Then decide: does Text 2 agree, disagree, qualify (partly agree) or add evidence?', examples: [{ text: 'Text 1: higher wages cut jobs. Text 2: one study found no job losses. Text 2 would challenge Text 1’s claim.', good: true }] },
            { title: 'Respond fairly', body: 'The right answer reflects how strongly the second author would react, based only on what their text says.' },
            { title: 'Common mistakes', body: 'Mixing up which text says what, choosing an extreme response, and answering from your own opinion.' }
          ],
          exercises: [
            { type: 'choice', q: 'How would the author of Text 2 most likely respond to the economists in Text 1?', options: ['By noting that evidence from some towns does not support their claim', 'By agreeing completely', 'By saying the minimum wage should be abolished', 'By ignoring the issue'], answer: 0, why: 'Text 2’s study found employment stayed the same.', passage: 'Text 1: Some economists argue that raising the minimum wage reduces jobs, because employers can afford fewer workers. Text 2: A recent study of several towns found that after the minimum wage rose, employment stayed the same, as workers spent more and businesses grew.' },
            { type: 'choice', q: 'What is the main claim of Text 1?', options: ['Raising the minimum wage reduces jobs.', 'Raising the minimum wage helps businesses grow.', 'Employment always rises.', 'Workers spend less.'], answer: 0, why: 'Text 1 states that employers can afford fewer workers.', passage: 'Text 1: Some economists argue that raising the minimum wage reduces jobs, because employers can afford fewer workers. Text 2: A recent study of several towns found that after the minimum wage rose, employment stayed the same, as workers spent more and businesses grew.' },
            { type: 'choice', q: 'According to Text 2, why did employment stay the same?', options: ['Workers spent more and businesses grew.', 'Prices fell.', 'Fewer people looked for work.', 'The government hired everyone.'], answer: 0, why: 'Text 2 explains the result directly.', passage: 'Text 1: Some economists argue that raising the minimum wage reduces jobs, because employers can afford fewer workers. Text 2: A recent study of several towns found that after the minimum wage rose, employment stayed the same, as workers spent more and businesses grew.' },
            { type: 'choice', q: 'Text 2 agrees with part of Text 1 but adds a limit. This is called', options: ['qualifying', 'contradicting completely', 'ignoring', 'repeating'], answer: 0, why: 'Qualifying means partly agreeing with conditions.' },
            { type: 'choice', q: 'What should you do first with a two-text question?', options: ['Summarise each text’s position', 'Read only Text 2', 'Choose the longest answer', 'Use your own opinion'], answer: 0, why: 'Clear summaries make the relationship easy to see.' }
          ]
        }
      ]
    },
    {
      title: 'Expression of Ideas',
      lessons: [
        {
          id: 'sat-transitions', title: 'Transitions', minutes: 5,
          cards: [
            { title: 'What is the relationship?', body: 'Read the sentence before and after the blank, then decide how they connect: contrast (however), cause and effect (therefore, as a result), addition (moreover, in addition), or example (for instance).' },
            { title: 'Common transitions', body: 'Contrast: however, nevertheless, in contrast. Cause and effect: therefore, as a result, consequently. Addition: moreover, furthermore. Example: for example, for instance. Sequence: then, subsequently, finally.' },
            { title: 'Common mistakes', body: 'Choosing a transition because it sounds formal, and not reading both sentences before choosing.' }
          ],
          exercises: [
            { type: 'gap', q: 'Solar panels have become much cheaper. ___, more households can now afford them.', options: ['As a result', 'However', 'For instance', 'Nevertheless'], answer: 0, why: 'Cheaper panels cause more households to afford them: cause and effect.' },
            { type: 'gap', q: 'Many birds migrate south in winter. Some species, ___, stay in the same place all year.', options: ['however', 'therefore', 'similarly', 'for example'], answer: 0, why: 'The second sentence contrasts with the first.' },
            { type: 'gap', q: 'The town has built two new schools. ___, it has opened a public library.', options: ['In addition', 'In contrast', 'As a result', 'Instead'], answer: 0, why: 'The library is another improvement added to the schools.' },
            { type: 'gap', q: 'Some plants survive with very little water. Cacti, ___, store water in their thick stems.', options: ['for example', 'however', 'therefore', 'in contrast'], answer: 0, why: 'Cacti are an example of plants that survive with little water.' },
            { type: 'gap', q: 'The trial was small. ___, its results were promising enough to fund a larger study.', options: ['Nevertheless', 'Therefore', 'For instance', 'Similarly'], answer: 0, why: 'The second sentence contrasts with the limitation in the first.' }
          ]
        },
        {
          id: 'sat-synthesis', title: 'Rhetorical synthesis', minutes: 7,
          cards: [
            { title: 'What the question asks', body: 'You see a student’s notes as bullet points and a goal: “The student wants to emphasise a similarity between the two species. Which choice most effectively uses relevant information from the notes to accomplish this goal?”' },
            { title: 'The goal decides', body: 'Read the goal first. The right answer achieves exactly that goal (compare, introduce, emphasise a difference, explain a finding to a new audience). Other choices may be accurate but do the wrong job.', examples: [{ text: 'Goal: emphasise a similarity. Answer: “Both species build nests from mud.”', good: true }] },
            { title: 'Check accuracy', body: 'The answer must also match the notes. Eliminate choices that add information not in the notes.' },
            { title: 'Common mistakes', body: 'Choosing the most detailed sentence instead of the one that meets the goal, and missing words such as “both” or “unlike” that show comparison.' }
          ],
          exercises: [
            { type: 'choice', q: 'Notes: The swallow builds mud nests. The swift builds nests from feathers and saliva. Both migrate to Africa in winter. Goal: emphasise a similarity. Which choice works best?', options: ['Both the swallow and the swift migrate to Africa in winter.', 'The swallow builds nests from mud.', 'The swift uses feathers and saliva in its nests.', 'Unlike the swift, the swallow uses mud.'], answer: 0, why: 'Only this choice states a similarity.' },
            { type: 'choice', q: 'Same notes. Goal: emphasise a difference. Which choice works best?', options: ['The swallow builds with mud, whereas the swift uses feathers and saliva.', 'Both birds migrate to Africa.', 'Swallows are birds.', 'Both birds build nests.'], answer: 0, why: '“Whereas” highlights the contrast.' },
            { type: 'choice', q: 'What should you read first in a synthesis question?', options: ['The goal', 'The longest choice', 'Only the notes', 'The title'], answer: 0, why: 'The goal decides which choice is correct.' },
            { type: 'choice', q: 'Notes: A study tracked 500 commuters. Cyclists reported less stress than drivers. Goal: present the study’s finding to a general audience. Which works best?', options: ['A study of 500 commuters found that cyclists reported less stress than drivers.', 'Cycling is a sport.', 'Drivers own cars.', 'Stress is common.'], answer: 0, why: 'It states the finding clearly and accurately.' },
            { type: 'choice', q: 'A choice is accurate but does not meet the goal. It is', options: ['wrong', 'correct', 'the best answer', 'acceptable'], answer: 0, why: 'Synthesis questions test whether you meet the goal.' }
          ]
        }
      ]
    },
    {
      title: 'Standard English Conventions',
      lessons: [
        {
          id: 'sat-punctuation', title: 'Commas, semicolons and colons', minutes: 6,
          cards: [
            { title: 'Two complete sentences', body: 'Join two independent clauses with a period, a semicolon, or a comma plus “and”, “but” or “so”. A comma alone is an error called a comma splice.', examples: [{ text: 'The river flooded; the bridge was closed.', good: true }, { text: 'The river flooded, so the bridge was closed.', good: true }, { text: 'The river flooded, the bridge was closed.', good: false }] },
            { title: 'Colons introduce', body: 'Use a colon after a complete sentence to introduce a list, an example or an explanation.', examples: [{ text: 'The lab needed three things: funding, space and time.', good: true }, { text: 'The lab needed: funding, space and time.', good: false, note: '“The lab needed” is not a complete sentence.' }] },
            { title: 'Common mistakes', body: 'Joining two sentences with only a comma, using a semicolon before a phrase that is not a full sentence, and putting a colon after an incomplete clause.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which version is punctuated correctly?', options: ['The storm lasted all night; by morning, the streets were flooded.', 'The storm lasted all night, by morning, the streets were flooded.', 'The storm lasted all night by morning, the streets were flooded.', 'The storm lasted all night: and by morning, the streets were flooded.'], answer: 0, why: 'Two complete sentences can be joined with a semicolon. A comma alone would be a comma splice.' },
            { type: 'choice', q: 'Which version is punctuated correctly?', options: ['The museum displays three kinds of art: painting, sculpture and photography.', 'The museum displays: painting, sculpture and photography.', 'The museum displays three kinds of art; painting, sculpture and photography.', 'The museum displays three kinds of art painting, sculpture and photography.'], answer: 0, why: 'A colon after a complete sentence introduces the list. “The museum displays” is not complete, so it cannot come before a colon.' },
            { type: 'choice', q: 'Which version is punctuated correctly?', options: ['Ada wanted to join the team, so she practised every day.', 'Ada wanted to join the team, she practised every day.', 'Ada wanted to join the team so, she practised every day.', 'Ada wanted to join the team; so, she practised, every day.'], answer: 0, why: 'Use a comma plus a joining word such as “so” between two complete sentences.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['The scientist checked the results twice,', 'they were', 'exactly what', 'she had predicted.'], answer: 0, fix: 'The scientist checked the results twice;', why: 'Two complete sentences joined by only a comma make a comma splice. Use a semicolon or a period.' },
            { type: 'gap', q: 'The festival was cancelled___ the organisers promised refunds.', options: [';', ',', ':', ' and,'], answer: 0, why: 'A semicolon joins two closely related independent clauses.' }
          ]
        },
        {
          id: 'sat-agreement', title: 'Agreement and verb forms', minutes: 5,
          cards: [
            { title: 'Subject and verb', body: 'Find the true subject, even when a long phrase comes between it and the verb.', examples: [{ text: 'The box of old letters was found in the attic.', good: true }, { text: 'The box of old letters were found in the attic.', good: false }] },
            { title: 'Pronouns', body: 'A pronoun must match the noun it replaces in number.', examples: [{ text: 'The company announced its new policy.', good: true }, { text: 'The company announced their new policy.', good: false, note: 'On the SAT, a single company is “it”.' }] },
            { title: 'Common mistakes', body: 'Matching the verb to the nearest noun instead of the subject, and treating “each”, “either” and “neither” as plural.' }
          ],
          exercises: [
            { type: 'gap', q: 'The collection of rare stamps ___ worth more than the house.', options: ['is', 'are', 'were', 'have been'], answer: 0, why: 'The subject is “collection”, which is singular.' },
            { type: 'gap', q: 'The committee released ___ report on Monday.', options: ['its', 'their', 'it’s', 'there'], answer: 0, why: 'A single committee is “it”, so the possessive is “its”. “It’s” means “it is”.' },
            { type: 'gap', q: 'By the time the rescue team arrived, the hikers ___ for two days.', options: ['had waited', 'have waited', 'wait', 'will wait'], answer: 0, why: 'The past perfect shows an action completed before another past action.' },
            { type: 'gap', q: 'Neither the coach nor the players ___ ready for the rain.', options: ['were', 'was', 'is', 'has been'], answer: 0, why: 'With “neither … nor”, the verb agrees with the nearer subject, “players”.' },
            { type: 'gap', q: 'The collection of rare coins ___ valuable.', options: ['is', 'are', 'were', 'have been'], answer: 0, why: 'The subject is “collection”.' }
          ]
        },
        {
          id: 'sat-modifiers', title: 'Pronouns, modifiers and verb forms', minutes: 7,
          cards: [
            { title: 'Pronoun agreement', body: 'A pronoun must match its noun in number: “The company released its report” (singular), not “their report”. “Each of the students brought his or her own lunch.”' },
            { title: 'Dangling modifiers', body: 'An opening phrase must describe the noun that follows the comma.', examples: [{ text: 'Walking to school, Ada saw a rainbow.', good: true }, { text: 'Walking to school, a rainbow appeared.', good: false }] },
            { title: 'Verb forms and tense', body: 'Keep tenses consistent with the time in the passage. Use the past perfect for an earlier past action (“had finished”), and the correct participle (“had written”, not “had wrote”).' },
            { title: 'Common mistakes', body: 'Using “their” with a singular noun such as company or team, opening phrases that describe the wrong noun, and wrong participles.' }
          ],
          exercises: [
            { type: 'gap', q: 'The committee announced ___ decision on Friday.', options: ['its', 'their', 'it’s', 'there'], answer: 0, why: '“Committee” is treated as singular in standard written English.' },
            { type: 'choice', q: 'Which sentence is correct?', options: ['Having finished the experiment, the students wrote their report.', 'Having finished the experiment, the report was written.', 'Having finished the experiment, it was time for the report.', 'Having finished, the report the students wrote.'], answer: 0, why: 'The students finished the experiment, so they must follow the comma.' },
            { type: 'gap', q: 'By the time the bus arrived, we ___ for an hour.', options: ['had waited', 'waited', 'have waited', 'wait'], answer: 0, why: 'The past perfect shows the earlier action.' },
            { type: 'error', q: 'Find the error.', parts: ['She had', 'wrote three letters', 'before the post office', 'closed.'], answer: 1, fix: 'written three letters', why: 'The past participle of “write” is “written”.' },
            { type: 'gap', q: 'Each of the paintings ___ been restored.', options: ['has', 'have', 'are', 'were'], answer: 0, why: '“Each” is singular.' },
            { type: 'choice', q: 'Which sentence is correct?', options: ['The team celebrated its first victory.', 'The team celebrated their first victory, it was great.', 'The team celebrate its first victory yesterday.', 'The team, celebrated its first victory.'], answer: 0, why: 'Singular pronoun, correct tense and punctuation.' }
          ]
        }
      ]
    },
    {
      title: 'Strategy',
      lessons: [
        {
          id: 'sat-strategy', title: 'Pacing and test strategy', minutes: 6,
          cards: [
            { title: 'Timing', body: 'The Reading and Writing section has two modules of 27 questions, each lasting 32 minutes: a little over a minute per question. Some questions take 30 seconds; others take two minutes.' },
            { title: 'Mark and move', body: 'If a question takes too long, choose your best answer, flag it and move on. There is no penalty for wrong answers, so never leave a question blank.' },
            { title: 'The adaptive module', body: 'Your performance in the first module decides how difficult the second module is. Accuracy in module 1 matters, so stay focused from the start.' },
            { title: 'Common mistakes', body: 'Spending three minutes on one hard question, leaving blanks, rushing the easy grammar questions, and not using the review screen at the end.' }
          ],
          exercises: [
            { type: 'choice', q: 'How many questions are in each Reading and Writing module?', options: ['27', '10', '52', '100'], answer: 0, why: 'Each module has 27 questions.' },
            { type: 'choice', q: 'Is there a penalty for wrong answers?', options: ['No, so answer every question', 'Yes, half a point', 'Yes, one point', 'Only in module 2'], answer: 0, why: 'Blank answers can only lose you points.' },
            { type: 'choice', q: 'A question is taking too long. What should you do?', options: ['Choose your best answer, flag it and move on', 'Keep working on it for five minutes', 'Leave it blank', 'Restart the test'], answer: 0, why: 'Time is better spent on questions you can answer.' },
            { type: 'choice', q: 'What decides the difficulty of module 2?', options: ['Your performance in module 1', 'The day of the week', 'Your school', 'Random choice'], answer: 0, why: 'The test adapts to your first-module performance.' },
            { type: 'choice', q: 'About how long do you have per question on average?', options: ['A little over a minute', 'Ten seconds', 'Five minutes', 'Ten minutes'], answer: 0, why: '32 minutes for 27 questions is just over a minute each.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'sat-final', title: 'Final assessment: SAT Reading and Writing', minutes: 20, kind: 'final',
          cards: [
            { title: 'How this works', body: '14 SAT-style questions from all four domains. They are written for Lexiverse, not official questions. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which choice best states the main idea?', options: ['City hives may produce more honey because cities have more varied flowers.', 'Farms are bad for bees.', 'Bees prefer cold places.', 'Honey prices are rising.'], answer: 0, why: 'It covers the finding and its explanation.', passage: 'Researchers studying urban beekeeping found that hives in cities produced more honey than hives in nearby farmland. The team suggests that city parks and gardens offer a wider variety of flowers throughout the season, while farms often grow a single crop that blooms only briefly.' },
            { type: 'choice', q: 'Which claim is best supported by the text?', options: ['Students who slept more tended to score higher.', 'Sleep causes higher scores in everyone.', 'Memory tests are inaccurate.', 'Students should sleep less.'], answer: 0, why: 'The study shows a link, not proof of cause.', passage: 'In a study of 300 secondary school students, those who slept at least eight hours on school nights scored, on average, 12% higher on memory tests than those who slept fewer than six hours. The researchers caution that the study shows a link, not proof that sleep causes the difference.' },
            { type: 'choice', q: 'Which statement is accurate?', options: ['Screen time was lower in 2022 than in 2020.', 'Screen time was highest in 2018.', 'Screen time never changed.', 'Screen time doubled from 2020 to 2022.'], answer: 0, why: '5.2 is lower than 6.3.', passage: 'Table: Average daily screen time (hours). 2018: 4.1. 2020: 6.3. 2022: 5.2.' },
            { type: 'choice', q: 'What is the main purpose of the text?', options: ['To show how an artist’s work came to be respected', 'To teach painting', 'To criticise artists', 'To describe a city'], answer: 0, why: 'It traces the change in the artist’s reputation.', passage: 'When the artist Nike Davies-Okundaye painted her first large mural, critics dismissed it as decoration. Within a decade, however, her murals had become landmarks, and younger artists cited her as the reason they began working in public spaces.' },
            { type: 'choice', q: 'How would the author of Text 2 most likely respond to Text 1?', options: ['By pointing to evidence that challenges its claim', 'By agreeing completely', 'By changing the topic', 'By attacking economists personally'], answer: 0, why: 'Text 2’s study found no job losses.', passage: 'Text 1: Some economists argue that raising the minimum wage reduces jobs, because employers can afford fewer workers. Text 2: A recent study of several towns found that after the minimum wage rose, employment stayed the same, as workers spent more and businesses grew.' },
            { type: 'gap', q: 'The bridge was old. ___, engineers decided it was still safe.', options: ['Nevertheless', 'Therefore', 'For example', 'Similarly'], answer: 0, why: 'The second sentence contrasts with the first.' },
            { type: 'gap', q: 'The scientist collected samples from the river; ___, she tested them in the lab.', options: ['then', 'however', 'for instance', 'in contrast'], answer: 0, why: 'The actions happen in sequence.' },
            { type: 'choice', q: 'The word “meticulous” in “a meticulous researcher who checked every figure twice” most nearly means', options: ['careful', 'careless', 'quick', 'famous'], answer: 0, why: 'Checking every figure twice shows great care.' },
            { type: 'gap', q: 'The results were surprising___ the team repeated the experiment.', options: [', so', ',', ' so,', ';so'], answer: 0, why: 'Two independent clauses can be joined with a comma and a conjunction.' },
            { type: 'gap', q: 'My favourite subjects are clear___ history, biology and art.', options: [':', ';', ',', ' and'], answer: 0, why: 'A colon introduces a list after a complete clause.' },
            { type: 'gap', q: 'The list of winners ___ posted on the board.', options: ['was', 'were', 'are', 'have been'], answer: 0, why: 'The subject is “list” (singular).' },
            { type: 'gap', q: 'The organisation changed ___ name last year.', options: ['its', 'their', 'it’s', 'theirs'], answer: 0, why: '“Organisation” is singular.' },
            { type: 'choice', q: 'Which sentence is correct?', options: ['Running for the bus, Musa dropped his phone.', 'Running for the bus, the phone fell.', 'Running for the bus, it was dropped.', 'Running for the bus, his phone dropped by Musa.'], answer: 0, why: 'The opening phrase must describe Musa.' },
            { type: 'choice', q: 'Is there a penalty for wrong answers on the SAT?', options: ['No', 'Yes, a quarter point', 'Yes, one point', 'Only on grammar questions'], answer: 0, why: 'Always answer every question.' }
          ]
        }
      ]
    }
  ]
};
