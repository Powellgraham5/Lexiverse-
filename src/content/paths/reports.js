// Better writing: Reports. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at length, headings and formal style; they cannot judge your findings, so compare with the model report.',
  guide: [
    'Start with the introduction, then learn report types, planning, structure and language in order.',
    'Use the report layout in Writing formats as a template for every writing task.',
    'Each lesson explains, shows examples and common mistakes, then gives practice with explanations.',
    'Finish with the final assessment, then the timed or untimed practice test.',
    'Save useful report phrases to your notebook.'
  ],
  improve: [
    'Always start with the reader: what do they need to decide?',
    'Use headings on their own lines and keep each section short.',
    'Back every finding with a number or a specific example.',
    'Check that each recommendation follows from a finding.',
    'Write the summary last, after you know what the report says.',
    'Read real reports (school, company, government) and note their headings.',
    'Ask someone who knows nothing about the topic to read your report: can they act on it?'
  ],
  units: [
    {
      title: 'Reports at a glance',
      lessons: [
        {
          id: 'report-intro', title: 'What a report is for', minutes: 5, kind: 'intro',
          cards: [
            { title: 'What a report is', body: 'A report is a structured document that presents facts about a situation, explains what they mean and, often, recommends action. It is written for a specific reader who needs to understand or decide something.' },
            { title: 'Where reports are used', body: 'At school (club reports, science reports, WAEC report questions), at work (progress, incident and sales reports), and in public life (council and survey reports).' },
            { title: 'How a report differs from an essay', body: 'An essay argues or explains in continuous paragraphs. A report is organised under headings so readers can jump to the part they need, and it ends with conclusions and recommendations.' },
            { title: 'Common mistakes', body: 'Writing a report like a story, forgetting the reader, missing headings, and giving opinions without facts.' }
          ],
          exercises: [
            { type: 'choice', q: 'Who is a report written for?', options: ['A specific reader who needs to understand or decide something', 'Anyone who likes stories', 'Only the writer', 'Nobody in particular'], answer: 0, why: 'Reports are written for a reader with a purpose.' },
            { type: 'choice', q: 'How does a report differ from an essay?', options: ['It uses headings and ends with recommendations', 'It has no paragraphs', 'It is always shorter', 'It tells a story'], answer: 0, why: 'Headings and recommendations are the key features.' },
            { type: 'choice', q: 'Which is a real-life report?', options: ['A summary of last month’s sales for a manager', 'A birthday card', 'A poem about rain', 'A text to a friend'], answer: 0, why: 'It presents facts for a reader who will act on them.' },
            { type: 'choice', q: 'What should every finding be based on?', options: ['Facts or evidence', 'Rumours', 'Feelings only', 'Guesses'], answer: 0, why: 'Readers trust findings that rest on evidence.' },
            { type: 'order', q: 'Put the report-writing process in order.', parts: ['Understand the purpose and reader', 'Gather information', 'Write under headings', 'Check and edit'], why: 'Purpose first, then evidence, writing and checking.' }
          ]
        },
        {
          id: 'report-basics', title: 'Reports, formal and informal', minutes: 5,
          cards: [
            { title: 'A report informs and recommends', body: 'A report presents facts about a topic clearly, so the reader can make a decision. It is organised under headings and usually ends with recommendations.' },
            { title: 'Formal or informal', body: 'A formal report (to a principal, manager or council) uses impersonal language and a fixed structure. An informal report (for a club newsletter, say) can be friendlier, but still uses headings and facts.' },
            { title: 'Common mistakes', body: 'Writing a report as one block of text, forgetting who the reader is, and using “I feel” instead of facts.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the main purpose of a report?', options: ['To present facts clearly so the reader can decide what to do', 'To tell an exciting story', 'To persuade with emotion only', 'To describe your feelings'], answer: 0, why: 'Reports inform, usually to help someone decide.' },
            { type: 'choice', q: 'Which feature is typical of a report?', options: ['Headings', 'Dialogue', 'Rhyme', 'A surprise ending'], answer: 0, why: 'Headings help the reader find information quickly.' },
            { type: 'choice', q: 'Who would usually receive a formal report?', options: ['A school principal or a manager', 'Your best friend', 'A pen pal', 'Your little brother'], answer: 0, why: 'Formal reports go to people in authority who need to act on them.' },
            { type: 'choice', q: 'Which opening suits a formal report?', options: ['This report examines the condition of the school library.', 'Hey, so I checked the library.', 'Once upon a time there was a library.', 'Libraries are cool, right?'], answer: 0, why: 'It states the purpose formally.' },
            { type: 'error', q: 'Which part is unsuitable for a formal report?', parts: ['The report', 'covers the library,', 'which is honestly', 'in a bad state.'], answer: 2, fix: 'which is', why: '“Honestly” is a personal, informal comment.' }
          ]
        },
        {
          id: 'report-types', title: 'Types of report', minutes: 6,
          cards: [
            { title: 'School and club reports', body: 'Report on an event, a visit, a club’s year or a problem at school. WAEC questions often ask you to report to the principal on something you saw or organised.' },
            { title: 'Work reports', body: 'Progress report (how a project is going), incident report (what happened, when, who was involved, what was done), sales or performance report (numbers and trends).' },
            { title: 'Survey reports', body: 'Explain who was asked, how, what they said (with numbers) and what should be done.', examples: [{ text: '45 of the 60 students surveyed (75%) want longer library hours.', good: true }] },
            { title: 'Common mistakes', body: 'Using the wrong type (a story instead of an incident report), leaving out who, when and where in an incident report, and survey reports with no numbers.' }
          ],
          exercises: [
            { type: 'choice', q: 'A worker slipped on a wet floor. Which report is needed?', options: ['An incident report', 'A survey report', 'A book report', 'A progress report'], answer: 0, why: 'Incident reports record what happened and what was done.' },
            { type: 'choice', q: 'Which report says how far a project has got?', options: ['A progress report', 'An incident report', 'A survey report', 'A complaint letter'], answer: 0, why: 'Progress reports track work against a plan.' },
            { type: 'choice', q: 'What must an incident report include?', options: ['What happened, when, where, who was involved and what was done', 'Only your feelings', 'A poem', 'A list of jokes'], answer: 0, why: 'These facts let others understand and act.' },
            { type: 'gap', q: 'Of the 80 parents ___, 60 supported the new timetable.', options: ['surveyed', 'survey', 'surveying', 'surveys'], answer: 0, why: '“Surveyed” (past participle) describes the parents who were asked.' },
            { type: 'choice', q: 'Which detail improves a survey report most?', options: ['The number of people asked and how many gave each answer', 'The colour of the questionnaire', 'The writer’s favourite subject', 'A joke'], answer: 0, why: 'Numbers make the findings reliable.' }
          ]
        }
      ]
    },
    {
      title: 'Planning and structure',
      lessons: [
        {
          id: 'report-planning', title: 'Planning and gathering information', minutes: 6,
          cards: [
            { title: 'Start with the brief', body: 'Ask: Who is the reader? What do they need to decide? What is the scope (what is included and what is not)? Write the purpose in one sentence before you start.' },
            { title: 'Ways to gather information', body: 'Observation (visit and note what you see), surveys and questionnaires, interviews, records (attendance lists, sales figures) and reading existing documents.' },
            { title: 'Organise before you write', body: 'Group your notes into themes. Each theme becomes a sub-heading under Findings.', examples: [{ text: 'Findings: 1. Opening hours 2. Book stock 3. Seating', good: true }] },
            { title: 'Common mistakes', body: 'Collecting information with no clear purpose, relying on one person’s opinion, and mixing all the facts in one long section.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should you write before you start a report?', options: ['Its purpose in one sentence', 'The final recommendation', 'A list of jokes', 'The page numbers'], answer: 0, why: 'A clear purpose keeps the report focused.' },
            { type: 'choice', q: 'Which is an example of observation?', options: ['Visiting the canteen at lunchtime and noting queue times', 'Guessing how long queues are', 'Asking one friend', 'Reading a novel'], answer: 0, why: 'Observation means seeing and recording directly.' },
            { type: 'choice', q: 'Your notes cover opening hours, book stock and seating. How should you organise the findings?', options: ['One sub-heading for each theme', 'All in one paragraph', 'In the order you wrote the notes', 'In the conclusion'], answer: 0, why: 'Sub-headings make findings easy to follow.' },
            { type: 'choice', q: 'Which source is most reliable for attendance figures?', options: ['The school register', 'A rumour', 'One student’s memory', 'A social media post'], answer: 0, why: 'Official records are the most accurate source.' },
            { type: 'order', q: 'Put the planning steps in order.', parts: ['Define the purpose and reader', 'Gather information', 'Group notes into themes', 'Turn themes into headings'], why: 'Each step prepares the next.' }
          ]
        },
        {
          id: 'report-structure', title: 'Structure and headings', minutes: 6,
          cards: [
            { title: 'The usual parts', body: 'Title, then: Introduction (the purpose of the report), Findings (what you found, under clear sub-headings), Conclusion (what the findings mean) and Recommendations (what should be done). Long reports may start with a short summary.' },
            { title: 'Headings that say something', body: 'A heading should tell the reader what is in the section.', examples: [{ text: 'Findings: the state of the school library', good: true }, { text: 'Part 2', good: false }] },
            { title: 'Common mistakes', body: 'Headings that say nothing (“Part 2”), sections in the wrong order, and recommendations hidden inside the findings.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a report in order.', parts: ['Title', 'Introduction', 'Findings', 'Conclusion', 'Recommendations'], why: 'This order moves from purpose, to facts, to meaning, to action.' },
            { type: 'choice', q: 'Where do you state the purpose of the report?', options: ['In the introduction', 'In the recommendations', 'In the title only', 'Nowhere'], answer: 0, why: 'The introduction tells the reader why the report was written.' },
            { type: 'choice', q: 'Which is the most useful heading?', options: ['Findings: student use of the library', 'Stuff I found', 'Section B', 'More'], answer: 0, why: 'It tells the reader exactly what the section covers.' },
            { type: 'choice', q: 'What comes after the findings?', options: ['The conclusion', 'The title', 'The introduction', 'The method'], answer: 0, why: 'The conclusion explains what the findings mean.' },
            { type: 'gap', q: 'Headings should go on ___ own lines.', options: ['their', 'there', 'they’re', 'theirs'], answer: 0, why: '“Their” shows possession.' }
          ]
        },
        {
          id: 'report-full', title: 'The full structure, from summary to appendix', minutes: 7,
          cards: [
            { title: 'Front matter', body: 'Title (what the report is about), To, From and Date (for memos and school reports), and, in longer reports, a summary of the whole report in a few sentences.' },
            { title: 'The main sections', body: 'Introduction (purpose and scope), Method (how information was gathered), Findings (the facts, under sub-headings), Conclusions (what the facts mean), Recommendations (what should be done).' },
            { title: 'Numbering', body: 'Number sections and points (1, 1.1, 1.2) in long reports so readers can refer to them: “See 2.3”. Short reports may use headings only.' },
            { title: 'Common mistakes', body: 'Writing the summary first (write it last), mixing findings and opinions, and recommendations that appear nowhere in the findings.' }
          ],
          exercises: [
            { type: 'order', q: 'Put these sections in order.', parts: ['Summary', 'Introduction', 'Method', 'Findings', 'Conclusions', 'Recommendations'], why: 'This is the standard order for a full report.' },
            { type: 'choice', q: 'What goes in the Method section?', options: ['How the information was gathered', 'What should be done', 'The writer’s feelings', 'A summary of the findings'], answer: 0, why: 'Method explains how you got your facts, so readers can trust them.' },
            { type: 'choice', q: 'When should you write the summary?', options: ['Last, once the report is complete', 'First, before any research', 'Never', 'In the middle'], answer: 0, why: 'You can only summarise what you have already written.' },
            { type: 'choice', q: 'Why number sections in a long report?', options: ['So readers can find and refer to points quickly', 'To make it look longer', 'Because numbers are formal', 'To hide information'], answer: 0, why: 'Numbering helps navigation and discussion.' },
            { type: 'error', q: 'Which heading is in the wrong place?', parts: ['1. Introduction', '2. Recommendations', '3. Findings', '4. Conclusions'], answer: 1, fix: 'Recommendations should come last.', why: 'Recommendations follow from the findings and conclusions.' },
            { type: 'write', kind: 'report', q: 'Write the opening of a report to your principal about the school canteen: Title, To, From, Date, Introduction and Method.', minWords: 60, maxWords: 160, checklist: ['A clear title', 'To, From and Date', 'The purpose in the introduction', 'How information was gathered'], model: 'Report on the school canteen\n\nTo\nThe Principal\n\nFrom\nAmina Bello, Head Girl\n\nDate\n14 March\n\nIntroduction\nThe purpose of this report is to examine the quality and speed of service in the school canteen. In addition, it suggests practical improvements.\n\nMethod\nQueue times were observed at lunchtime for five days. Furthermore, 60 students from all classes completed a short questionnaire about prices and food quality.' }
          ]
        }
      ]
    },
    {
      title: 'Report language',
      lessons: [
        {
          id: 'report-language', title: 'Formal, impersonal language', minutes: 5,
          cards: [
            { title: 'Focus on facts, not on “I”', body: 'Formal reports often use impersonal or passive phrases.', examples: [{ text: 'It was found that most students visit the library once a week.', good: true }, { text: 'I asked loads of people and they said they go there sometimes.', good: false }] },
            { title: 'Be precise', body: 'Use numbers and specific details instead of vague words.', examples: [{ text: '42 of the 60 students surveyed said the library closes too early.', good: true }, { text: 'Lots of people complained.', good: false }] },
            { title: 'Common mistakes', body: 'Personal phrases (“I reckon”), vague words (“lots”, “stuff”), exaggeration (“super”, “totally”) and contractions.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence suits a formal report?', options: ['It was found that 70% of students walk to school.', 'Loads of kids walk to school, I think.', 'Walking is cool.', 'Everyone walks, obviously.'], answer: 0, why: 'It is impersonal and precise.' },
            { type: 'choice', q: 'Which is more precise?', options: ['18 of the 25 classrooms have working fans.', 'Some classrooms have fans.', 'Fans are a thing.', 'Most rooms are fine.'], answer: 0, why: 'Numbers give the reader exact information.' },
            { type: 'error', q: 'Which part is too informal for a report?', parts: ['The survey showed', 'that the canteen', 'is super expensive', 'for most students.'], answer: 2, fix: 'is too expensive', why: '“Super” is informal. Use plain, precise words in a report.' },
            { type: 'gap', q: '___ that the hall is too small for assemblies.', options: ['It was found', 'I reckon', 'Everyone knows', 'Obviously'], answer: 0, why: '“It was found that” is impersonal and formal.' },
            { type: 'choice', q: 'Which is most precise?', options: ['Five of the eight taps in the toilets are broken.', 'Lots of taps are broken.', 'The toilets are bad.', 'Some stuff is broken.'], answer: 0, why: 'Specific numbers inform the reader.' }
          ]
        },
        {
          id: 'report-cautious', title: 'The passive and cautious language', minutes: 6,
          cards: [
            { title: 'The passive voice', body: 'The passive puts the action first and hides who did it, which suits reports: “The survey was conducted in May” rather than “I did the survey in May”. Form: be + past participle.', examples: [{ text: 'Sixty students were interviewed.', good: true }, { text: 'Me and my friends interviewed loads of students.', good: false }] },
            { title: 'Cautious language (hedging)', body: 'Reports claim only what the evidence shows: “appears to”, “suggests”, “the majority of”, “it is likely that”. Avoid “always”, “everyone” and “prove” unless you are sure.' },
            { title: 'Real-life use', body: 'Managers, scientists and journalists use hedging to stay accurate. Overclaiming damages trust if one exception appears.' },
            { title: 'Common mistakes', body: 'Overusing the passive so every sentence is long and vague, wrong participles (“was took”), and absolute claims (“all students hate the canteen”).' }
          ],
          exercises: [
            { type: 'gap', q: 'The questionnaire ___ to 80 parents.', options: ['was sent', 'sent', 'was send', 'is sending'], answer: 0, why: 'The passive is was + past participle (sent).' },
            { type: 'choice', q: 'Which is the most cautious claim?', options: ['The results suggest that most students prefer shorter breaks.', 'Everyone hates long breaks.', 'This proves all students want short breaks.', 'Students always want short breaks.'], answer: 0, why: '“Suggest” and “most” match what a survey can show.' },
            { type: 'error', q: 'Find the error.', parts: ['The data', 'was took', 'from the', 'school register.'], answer: 1, fix: 'was taken', why: 'The past participle of “take” is “taken”.' },
            { type: 'choice', q: 'Which sentence is passive?', options: ['The new rules were introduced in January.', 'The principal introduced new rules.', 'We introduce rules.', 'Rules are good.'], answer: 0, why: 'were + introduced is the passive.' },
            { type: 'gap', q: 'It ___ that the delays were caused by a shortage of staff.', options: ['appears', 'is proving', 'always is', 'definitely shows everyone'], answer: 0, why: '“It appears that” is cautious and formal.' },
            { type: 'choice', q: 'Rewrite “I think the bus is late a lot” for a report.', options: ['The bus appears to be late on most days.', 'The bus is late a lot I think.', 'Buses are bad.', 'The bus is always, always late.'], answer: 0, why: 'It is impersonal, cautious and precise.' }
          ]
        },
        {
          id: 'report-data', title: 'Describing tables and charts', minutes: 7,
          cards: [
            { title: 'Say what the data shows', body: 'Start with the overall picture, then the key details. You do not need every number: choose the important ones.' },
            { title: 'Useful language', body: 'rose, increased, fell, decreased, remained stable, peaked at, the majority of, a third of, twice as many as, compared with.', examples: [{ text: 'Library visits rose from 120 in January to 310 in March.', good: true }, { text: 'The numbers went up and stuff.', good: false }] },
            { title: 'Fractions and percentages', body: '50% = half, 25% = a quarter, 33% = about a third, 75% = three quarters. Round sensibly: 48% is “almost half”.' },
            { title: 'Common mistakes', body: 'Listing every figure, describing the chart without saying what it means, mixing up “rise” (no object) and “raise” (needs an object), and wrong fractions.' }
          ],
          exercises: [
            { type: 'gap', q: 'Sales ___ from 200 to 350 units.', options: ['rose', 'raised', 'rised', 'arose up'], answer: 0, why: '“Rise” has no object: sales rose.' },
            { type: 'choice', q: 'What is 26% best described as?', options: ['about a quarter', 'about half', 'about a third', 'nearly all'], answer: 0, why: '25% is a quarter, so 26% is about a quarter.' },
            { type: 'choice', q: 'How should you start describing a chart?', options: ['With the overall trend', 'With the smallest number', 'With your feelings', 'With every figure in order'], answer: 0, why: 'The big picture helps the reader understand the details.' },
            { type: 'error', q: 'Find the error.', parts: ['The company', 'rose', 'its prices', 'in June.'], answer: 1, fix: 'raised', why: '“Raise” takes an object (its prices).' },
            { type: 'gap', q: 'Attendance ___ at 95% in March before falling slightly.', options: ['peaked', 'peaks up', 'peaking', 'was peak'], answer: 0, why: '“Peaked at” describes the highest point.' },
            { type: 'choice', q: 'Visits: Jan 100, Feb 100, Mar 100. Which description fits?', options: ['Visits remained stable.', 'Visits rose sharply.', 'Visits fell.', 'Visits peaked in January.'], answer: 0, why: 'The number did not change.' }
          ]
        }
      ]
    },
    {
      title: 'Findings, conclusions and recommendations',
      lessons: [
        {
          id: 'report-conclusions', title: 'Findings versus conclusions', minutes: 6,
          cards: [
            { title: 'Three different jobs', body: 'Findings: what you found (facts). Conclusions: what the facts mean. Recommendations: what should be done about it.', examples: [{ text: 'Finding: the queue takes 25 minutes. Conclusion: students lose most of their break. Recommendation: open a second serving point.', good: true }] },
            { title: 'Writing findings', body: 'Use sub-headings, numbers and neutral language. Keep opinions out of findings.' },
            { title: 'Writing conclusions', body: 'Draw out the meaning of the findings in a few sentences. Use phrases such as “This shows that…”, “Overall, the findings indicate…”.' },
            { title: 'Common mistakes', body: 'Putting opinions in the findings, repeating the findings in the conclusion without saying what they mean, and conclusions that the evidence does not support.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a finding?', options: ['The library has 30 seats for 600 students.', 'The library is a disgrace.', 'The school should build a new library.', 'This shows the library is too small.'], answer: 0, why: 'A finding is a fact.' },
            { type: 'choice', q: 'Which is a conclusion?', options: ['This shows that the library cannot meet demand.', 'The library has 30 seats.', 'Buy 50 more chairs.', 'The library opens at 8am.'], answer: 0, why: 'A conclusion explains what the facts mean.' },
            { type: 'choice', q: 'Which is a recommendation?', options: ['The school should add 50 seats to the library.', 'The library has 30 seats.', 'The library is crowded at lunch.', 'This shows demand is high.'], answer: 0, why: 'A recommendation says what should be done.' },
            { type: 'gap', q: '___, the findings indicate that the canteen is too small for the number of students.', options: ['Overall', 'Suddenly', 'Once upon a time', 'Anyway'], answer: 0, why: '“Overall” introduces a conclusion.' },
            { type: 'error', q: 'Which part does not belong in the findings?', parts: ['The queue took 25 minutes on average.', '40% of students skipped lunch.', 'Prices rose by 10% this term.', 'The canteen staff are lazy.'], answer: 3, fix: 'Remove it, or replace it with a fact such as “Two of the five serving points were closed.”', why: 'Findings must be facts, not personal judgements.' }
          ]
        },
        {
          id: 'report-recommend', title: 'Findings and recommendations', minutes: 6,
          cards: [
            { title: 'Findings report, recommendations advise', body: 'Findings say what is true now. Recommendations say what should be done, and should follow from the findings.', examples: [{ text: 'Finding: The library closes at 3pm, before most students are free.', good: true }, { text: 'Recommendation: It is recommended that the library stays open until 5pm.', good: true }] },
            { title: 'Useful phrases', body: '“It is recommended that…”, “The school should consider…”, “To address this, …”.' },
            { title: 'Common mistakes', body: 'Recommendations that do not follow from any finding, vague advice, and too many recommendations with no priority.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a recommendation, not a finding?', options: ['It is recommended that more books be bought for SS3 students.', 'The library has 1,200 books.', 'Most students visit on Fridays.', 'The library opens at 8am.'], answer: 0, why: 'A recommendation says what should be done.' },
            { type: 'choice', q: 'A finding says the canteen queue takes 25 minutes. Which recommendation follows from it?', options: ['Open a second serving point at lunchtime.', 'Paint the canteen blue.', 'Cancel sports day.', 'Buy more library books.'], answer: 0, why: 'A good recommendation solves the problem in the finding.' },
            { type: 'write', kind: 'report', q: 'Write a short report to your principal on the school library. Use the headings Introduction, Findings and Recommendations.', minWords: 100, maxWords: 250, checklist: ['A title', 'Headings: Introduction, Findings, Recommendations', 'Facts with numbers', 'Formal, impersonal language'], model: 'Report on the School Library\n\nIntroduction\nThis report examines how students use the school library and suggests improvements. It is based on a survey of 60 students in October.\n\nFindings\nIt was found that 42 of the 60 students visit the library at least once a week. However, most of them said that it closes too early, at 3pm. In addition, many respondents reported that there are not enough recent textbooks for SS3 subjects.\n\nRecommendations\nIt is recommended that the library stays open until 5pm on weekdays. Furthermore, the school should consider buying new SS3 textbooks before the examination period, so that final-year learners can prepare properly.' },
            { type: 'gap', q: 'It is recommended that the school ___ two more water points.', options: ['install', 'installs', 'installing', 'installed'], answer: 0, why: 'After “It is recommended that”, use the base form of the verb.' },
            { type: 'choice', q: 'How many recommendations should a short report usually have?', options: ['A few clear ones, each linked to a finding', 'As many as possible', 'None', 'Exactly twenty'], answer: 0, why: 'Few, focused recommendations are easier to act on.' }
          ]
        },
        {
          id: 'report-editing', title: 'Checking and improving a report', minutes: 6,
          cards: [
            { title: 'Check the structure', body: 'Does each heading say what is in the section? Is the order logical? Does every recommendation follow from a finding?' },
            { title: 'Check the language', body: 'Formal and impersonal? Numbers and specific details? No contractions or slang? Cautious claims where the evidence is limited?' },
            { title: 'Check for the reader', body: 'Could a busy reader understand the main point from the summary and recommendations alone? If not, make them clearer.' },
            { title: 'Common mistakes', body: 'Inconsistent numbers (60 students in one section, 65 in another), headings that do not match the content, and recommendations that are vague (“things should improve”).', examples: [{ text: 'The school should open the library until 5pm on weekdays.', good: true }, { text: 'Things should be better.', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which recommendation is clearest?', options: ['The school should open the library until 5pm on weekdays from next term.', 'The library should be better.', 'Something should be done.', 'Books are important.'], answer: 0, why: 'It says what, when and how.' },
            { type: 'choice', q: 'One section says 60 students were surveyed; another says 65. What should you do?', options: ['Check the data and make the numbers consistent', 'Leave it', 'Delete both numbers', 'Add a third number'], answer: 0, why: 'Inconsistent numbers damage trust.' },
            { type: 'error', q: 'Which part needs changing for a formal report?', parts: ['The survey', 'shows that students', 'can’t find', 'quiet places to study.'], answer: 2, fix: 'cannot find', why: 'Write words in full in formal reports.' },
            { type: 'choice', q: 'What can a busy reader read to understand a report quickly?', options: ['The summary and recommendations', 'Only the title', 'The method section', 'The appendix'], answer: 0, why: 'They should give the main message.' },
            { type: 'choice', q: 'A heading says “Seating” but the section discusses opening hours. What is the fix?', options: ['Change the heading or move the text', 'Leave it', 'Delete the section', 'Add a picture'], answer: 0, why: 'Headings must match their content.' },
            { type: 'write', kind: 'report', q: 'Write a short report to your manager on staff lateness. Use the headings Introduction, Findings, Conclusion and Recommendations.', minWords: 100, maxWords: 250, checklist: ['A title and four headings', 'Numbers in the findings', 'A conclusion that explains the findings', 'Clear recommendations'], model: 'Report on staff lateness\n\nIntroduction\nThis report examines staff lateness over the past month and suggests ways to reduce it.\n\nFindings\nAttendance records show that 14 of the 40 staff arrived late at least twice a week. In addition, 9 of them live on the same bus route, which was delayed by roadworks. However, lateness was rare on Fridays, when the roads are quieter.\n\nConclusion\nThe findings suggest that most lateness is caused by transport problems rather than poor attitude.\n\nRecommendations\nIt is recommended that staff on the affected route be allowed to start at 9:30 until the roadworks end. Furthermore, the company should review attendance again next month.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'report-final', title: 'Final assessment: Reports', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '13 questions from the whole course: report types, planning, structure, language, data, findings and recommendations. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the main purpose of a report?', options: ['To present facts so a reader can understand or decide', 'To entertain', 'To express feelings', 'To tell a story'], answer: 0, why: 'Reports inform and support decisions.' },
            { type: 'choice', q: 'Which report records what happened after an accident?', options: ['An incident report', 'A progress report', 'A survey report', 'A book report'], answer: 0, why: 'Incident reports record events and actions taken.' },
            { type: 'order', q: 'Put these sections in order.', parts: ['Introduction', 'Method', 'Findings', 'Conclusions', 'Recommendations'], why: 'Purpose, method, facts, meaning, action.' },
            { type: 'choice', q: 'Which section explains how information was gathered?', options: ['Method', 'Recommendations', 'Summary', 'Title'], answer: 0, why: 'Method shows how the facts were collected.' },
            { type: 'gap', q: 'The interviews ___ in the staff room.', options: ['were held', 'held', 'was hold', 'are holding'], answer: 0, why: 'Passive: were + past participle.' },
            { type: 'choice', q: 'Which claim is suitably cautious?', options: ['The results suggest that most staff prefer flexible hours.', 'Everyone wants flexible hours.', 'This proves all staff are unhappy.', 'Staff always arrive late.'], answer: 0, why: '“Suggest” and “most” match the evidence.' },
            { type: 'gap', q: 'Visits ___ from 50 to 150 in three months.', options: ['rose', 'raised', 'rised', 'were rise'], answer: 0, why: '“Rise” takes no object.' },
            { type: 'choice', q: 'What is 51% best described as?', options: ['just over half', 'about a quarter', 'nearly all', 'a third'], answer: 0, why: '50% is half.' },
            { type: 'choice', q: 'Which is a finding?', options: ['Twelve of the 20 computers do not work.', 'The computer room is shameful.', 'Buy new computers.', 'This shows the room is outdated.'], answer: 0, why: 'Findings are facts.' },
            { type: 'choice', q: 'Which is a conclusion?', options: ['This shows that most computers need replacing.', 'Twelve computers do not work.', 'Buy ten computers.', 'The room has 20 computers.'], answer: 0, why: 'Conclusions interpret the facts.' },
            { type: 'error', q: 'Which part is too informal?', parts: ['It was found', 'that the generator', 'is like totally', 'unreliable.'], answer: 2, fix: 'is', why: '“Like totally” is slang.' },
            { type: 'choice', q: 'Which recommendation is clearest?', options: ['The school should service the generator every three months.', 'Fix things.', 'The generator is old.', 'Power is important.'], answer: 0, why: 'It states the action and frequency.' },
            { type: 'choice', q: 'When should you write the summary?', options: ['Last', 'First', 'Never', 'Before you gather information'], answer: 0, why: 'Summarise once the report is complete.' }
          ]
        }
      ]
    }
  ]
};
