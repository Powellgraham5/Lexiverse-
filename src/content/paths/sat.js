// SAT Reading and Writing path. Practice material written for Lexiverse: not official SAT
// questions. The digital SAT has no essay; all practice here is multiple choice.
export default {
  note: 'Practice questions written for Lexiverse in the style of the digital SAT. They are not official SAT questions. Check the College Board website for the current test format.',
  guide: ['Start with the test format so you know what to expect.', 'Each lesson covers one type of Reading and Writing question.', 'Take the timed practice test to build speed.', 'Save grammar rules to your notebook and review them before test day.'],
  units: [
    {
      title: 'Know the test',
      lessons: [
        {
          id: 'sat-format', title: 'The digital SAT Reading and Writing section', minutes: 4,
          cards: [
            { title: 'Short passages, one question each', body: 'The Reading and Writing section has two modules of 27 questions, 32 minutes each. Every question has its own short passage, from a sentence to a paragraph, and four answer choices.' },
            { title: 'Adaptive', body: 'The test is adaptive: how you do in the first module decides whether the second module is easier or harder.' },
            { title: 'Four kinds of question', body: 'Information and Ideas (what a text says and what supports a claim), Craft and Structure (word meaning and purpose), Expression of Ideas (transitions and combining notes), and Standard English Conventions (grammar and punctuation).' },
            { title: 'No essay', body: 'The SAT no longer has an essay. Your writing skills are tested through the multiple-choice questions. Scores for Reading and Writing range from 200 to 800.' }
          ],
          exercises: [
            { type: 'choice', q: 'How many answer choices does each SAT Reading and Writing question have?', options: ['Four', 'Three', 'Five', 'Two'], answer: 0, why: 'Each question has four choices.' },
            { type: 'choice', q: 'Does the current SAT include an essay?', options: ['No, the essay was removed', 'Yes, it is required', 'Yes, it is the whole test', 'Only in Module 2'], answer: 0, why: 'The essay is no longer part of the SAT.' },
            { type: 'choice', q: 'What does “adaptive” mean on the digital SAT?', options: ['The second module’s difficulty depends on how you did in the first', 'You choose the questions', 'The test changes language', 'There is no time limit'], answer: 0, why: 'Your first-module performance decides the second module.' },
            { type: 'choice', q: 'What is the score range for the Reading and Writing section?', options: ['200 to 800', '0 to 100', '1 to 9', '400 to 1600'], answer: 0, why: 'Each section is scored from 200 to 800. 400 to 1600 is the total for both sections.' }
          ]
        }
      ]
    },
    {
      title: 'Standard English conventions',
      lessons: [
        {
          id: 'sat-punctuation', title: 'Commas, semicolons and colons', minutes: 6,
          cards: [
            { title: 'Two complete sentences', body: 'Join two independent clauses with a period, a semicolon, or a comma plus “and”, “but” or “so”. A comma alone is an error called a comma splice.', examples: [{ text: 'The river flooded; the bridge was closed.', good: true }, { text: 'The river flooded, so the bridge was closed.', good: true }, { text: 'The river flooded, the bridge was closed.', good: false }] },
            { title: 'Colons introduce', body: 'Use a colon after a complete sentence to introduce a list, an example or an explanation.', examples: [{ text: 'The lab needed three things: funding, space and time.', good: true }, { text: 'The lab needed: funding, space and time.', good: false, note: '“The lab needed” is not a complete sentence.' }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which version is punctuated correctly?', options: ['The storm lasted all night; by morning, the streets were flooded.', 'The storm lasted all night, by morning, the streets were flooded.', 'The storm lasted all night by morning, the streets were flooded.', 'The storm lasted all night: and by morning, the streets were flooded.'], answer: 0, why: 'Two complete sentences can be joined with a semicolon. A comma alone would be a comma splice.' },
            { type: 'choice', q: 'Which version is punctuated correctly?', options: ['The museum displays three kinds of art: painting, sculpture and photography.', 'The museum displays: painting, sculpture and photography.', 'The museum displays three kinds of art; painting, sculpture and photography.', 'The museum displays three kinds of art painting, sculpture and photography.'], answer: 0, why: 'A colon after a complete sentence introduces the list. “The museum displays” is not complete, so it cannot come before a colon.' },
            { type: 'choice', q: 'Which version is punctuated correctly?', options: ['Ada wanted to join the team, so she practised every day.', 'Ada wanted to join the team, she practised every day.', 'Ada wanted to join the team so, she practised every day.', 'Ada wanted to join the team; so, she practised, every day.'], answer: 0, why: 'Use a comma plus a joining word such as “so” between two complete sentences.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['The scientist checked the results twice,', 'they were', 'exactly what', 'she had predicted.'], answer: 0, fix: 'The scientist checked the results twice;', why: 'Two complete sentences joined by only a comma make a comma splice. Use a semicolon or a period.' }
          ]
        },
        {
          id: 'sat-agreement', title: 'Agreement and verb forms', minutes: 5,
          cards: [
            { title: 'Subject and verb', body: 'Find the true subject, even when a long phrase comes between it and the verb.', examples: [{ text: 'The box of old letters was found in the attic.', good: true }, { text: 'The box of old letters were found in the attic.', good: false }] },
            { title: 'Pronouns', body: 'A pronoun must match the noun it replaces in number.', examples: [{ text: 'The company announced its new policy.', good: true }, { text: 'The company announced their new policy.', good: false, note: 'On the SAT, a single company is “it”.' }] }
          ],
          exercises: [
            { type: 'gap', q: 'The collection of rare stamps ___ worth more than the house.', options: ['is', 'are', 'were', 'have been'], answer: 0, why: 'The subject is “collection”, which is singular.' },
            { type: 'gap', q: 'The committee released ___ report on Monday.', options: ['its', 'their', 'it’s', 'there'], answer: 0, why: 'A single committee is “it”, so the possessive is “its”. “It’s” means “it is”.' },
            { type: 'gap', q: 'By the time the rescue team arrived, the hikers ___ for two days.', options: ['had waited', 'have waited', 'wait', 'will wait'], answer: 0, why: 'The past perfect shows an action completed before another past action.' },
            { type: 'gap', q: 'Neither the coach nor the players ___ ready for the rain.', options: ['were', 'was', 'is', 'has been'], answer: 0, why: 'With “neither … nor”, the verb agrees with the nearer subject, “players”.' }
          ]
        }
      ]
    },
    {
      title: 'Craft, structure and ideas',
      lessons: [
        {
          id: 'sat-words', title: 'Words in context', minutes: 5,
          cards: [
            { title: 'Predict, then match', body: 'Cover the choices. Read the sentence and think of your own word for the blank. Then pick the choice closest to your word.' },
            { title: 'Use the clues', body: 'Look for contrast words (“although”, “but”) or support words (“and”, “indeed”) that tell you the direction of the missing word.' }
          ],
          exercises: [
            { type: 'gap', q: 'Although the first results were promising, the researchers remained ___, insisting that more tests were needed.', options: ['cautious', 'thrilled', 'careless', 'certain'], answer: 0, why: '“Although … promising” and “more tests were needed” show they were careful, not excited.' },
            { type: 'gap', q: 'The novelist’s style is famously ___: she can describe a whole life in a single sentence.', options: ['concise', 'wordy', 'confusing', 'ancient'], answer: 0, why: 'Describing a life in one sentence means her style is brief and precise.' },
            { type: 'gap', q: 'The new bridge was designed to ___ traffic jams by giving drivers a second route into the city.', options: ['alleviate', 'worsen', 'celebrate', 'ignore'], answer: 0, why: 'A second route would reduce, or alleviate, traffic jams.' },
            { type: 'gap', q: 'Far from being ___, the old map proved essential to finding the lost village.', options: ['useless', 'valuable', 'accurate', 'detailed'], answer: 0, why: '“Far from being … essential” needs the opposite of essential: useless.' }
          ]
        },
        {
          id: 'sat-transitions', title: 'Transitions', minutes: 5,
          cards: [
            { title: 'What is the relationship?', body: 'Read the sentence before and after the blank, then decide how they connect: contrast (however), cause and effect (therefore, as a result), addition (moreover, in addition), or example (for instance).' }
          ],
          exercises: [
            { type: 'gap', q: 'Solar panels have become much cheaper. ___, more households can now afford them.', options: ['As a result', 'However', 'For instance', 'Nevertheless'], answer: 0, why: 'Cheaper panels cause more households to afford them: cause and effect.' },
            { type: 'gap', q: 'Many birds migrate south in winter. Some species, ___, stay in the same place all year.', options: ['however', 'therefore', 'similarly', 'for example'], answer: 0, why: 'The second sentence contrasts with the first.' },
            { type: 'gap', q: 'The town has built two new schools. ___, it has opened a public library.', options: ['In addition', 'In contrast', 'As a result', 'Instead'], answer: 0, why: 'The library is another improvement added to the schools.' },
            { type: 'gap', q: 'Some plants survive with very little water. Cacti, ___, store water in their thick stems.', options: ['for example', 'however', 'therefore', 'in contrast'], answer: 0, why: 'Cacti are an example of plants that survive with little water.' }
          ]
        },
        {
          id: 'sat-evidence', title: 'Command of evidence', minutes: 6,
          cards: [
            { title: 'Support the exact claim', body: 'These questions give a claim and ask which finding best supports it. The right choice matches the claim closely; wrong choices are often true but about something else.' }
          ],
          exercises: [
            { type: 'choice', q: 'A student claims that reading aloud to young children improves their vocabulary. Which finding best supports this claim?', options: ['Children who were read to daily knew more words at age five than children who were not.', 'Many parents enjoy reading to their children.', 'Picture books are popular in libraries.', 'Older children prefer to read silently.'], answer: 0, why: 'Only this choice links reading aloud to a measured difference in vocabulary.' },
            { type: 'choice', q: 'A researcher claims that a new fertiliser increases tomato harvests. Which result would best support this?', options: ['Plots with the fertiliser produced 30% more tomatoes than identical plots without it.', 'The fertiliser is cheaper than older brands.', 'Tomatoes grow well in warm weather.', 'Farmers said the fertiliser smelled pleasant.'], answer: 0, why: 'It compares harvests with and without the fertiliser under the same conditions.' },
            { type: 'choice', q: 'A historian claims that the town’s market was busiest in the dry season, from November to March. Which detail best supports this?', options: ['Records show traders paid the most market fees between November and March.', 'The market sold cloth and grain.', 'The town was founded in 1850.', 'Some traders travelled from far away.'], answer: 0, why: 'Market fees show how busy the market was, and they were highest in exactly the months the claim names.' }
          ]
        }
      ]
    }
  ]
};
