// Better writing: Reports. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at length, headings and formal style; they cannot judge your findings, so compare with the model report.',
  guide: ['Learn the parts of a report first, then practise each part.', 'Use the report layout in Writing formats as a template.', 'Each lesson ends with a short writing task and a model answer.', 'Save useful phrases to your notebook.'],
  units: [
    {
      title: 'What a report is',
      lessons: [
        {
          id: 'report-basics', title: 'Reports, formal and informal', minutes: 5,
          cards: [
            { title: 'A report informs and recommends', body: 'A report presents facts about a topic clearly, so the reader can make a decision. It is organised under headings and usually ends with recommendations.' },
            { title: 'Formal or informal', body: 'A formal report (to a principal, manager or council) uses impersonal language and a fixed structure. An informal report (for a club newsletter, say) can be friendlier, but still uses headings and facts.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the main purpose of a report?', options: ['To present facts clearly so the reader can decide what to do', 'To tell an exciting story', 'To persuade with emotion only', 'To describe your feelings'], answer: 0, why: 'Reports inform, usually to help someone decide.' },
            { type: 'choice', q: 'Which feature is typical of a report?', options: ['Headings', 'Dialogue', 'Rhyme', 'A surprise ending'], answer: 0, why: 'Headings help the reader find information quickly.' },
            { type: 'choice', q: 'Who would usually receive a formal report?', options: ['A school principal or a manager', 'Your best friend', 'A pen pal', 'Your little brother'], answer: 0, why: 'Formal reports go to people in authority who need to act on them.' }
          ]
        },
        {
          id: 'report-structure', title: 'Structure and headings', minutes: 6,
          cards: [
            { title: 'The usual parts', body: 'Title, then: Introduction (the purpose of the report), Findings (what you found, under clear sub-headings), Conclusion (what the findings mean) and Recommendations (what should be done). Long reports may start with a short summary.' },
            { title: 'Headings that say something', body: 'A heading should tell the reader what is in the section.', examples: [{ text: 'Findings: the state of the school library', good: true }, { text: 'Part 2', good: false }] }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a report in order.', parts: ['Title', 'Introduction', 'Findings', 'Conclusion', 'Recommendations'], why: 'This order moves from purpose, to facts, to meaning, to action.' },
            { type: 'choice', q: 'Where do you state the purpose of the report?', options: ['In the introduction', 'In the recommendations', 'In the title only', 'Nowhere'], answer: 0, why: 'The introduction tells the reader why the report was written.' },
            { type: 'choice', q: 'Which is the most useful heading?', options: ['Findings: student use of the library', 'Stuff I found', 'Section B', 'More'], answer: 0, why: 'It tells the reader exactly what the section covers.' }
          ]
        }
      ]
    },
    {
      title: 'Writing it well',
      lessons: [
        {
          id: 'report-language', title: 'Formal, impersonal language', minutes: 5,
          cards: [
            { title: 'Focus on facts, not on “I”', body: 'Formal reports often use impersonal or passive phrases.', examples: [{ text: 'It was found that most students visit the library once a week.', good: true }, { text: 'I asked loads of people and they said they go there sometimes.', good: false }] },
            { title: 'Be precise', body: 'Use numbers and specific details instead of vague words.', examples: [{ text: '42 of the 60 students surveyed said the library closes too early.', good: true }, { text: 'Lots of people complained.', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence suits a formal report?', options: ['It was found that 70% of students walk to school.', 'Loads of kids walk to school, I think.', 'Walking is cool.', 'Everyone walks, obviously.'], answer: 0, why: 'It is impersonal and precise.' },
            { type: 'choice', q: 'Which is more precise?', options: ['18 of the 25 classrooms have working fans.', 'Some classrooms have fans.', 'Fans are a thing.', 'Most rooms are fine.'], answer: 0, why: 'Numbers give the reader exact information.' },
            { type: 'error', q: 'Which part is too informal for a report?', parts: ['The survey showed', 'that the canteen', 'is super expensive', 'for most students.'], answer: 2, fix: 'is too expensive', why: '“Super” is informal. Use plain, precise words in a report.' }
          ]
        },
        {
          id: 'report-recommend', title: 'Findings and recommendations', minutes: 6,
          cards: [
            { title: 'Findings report, recommendations advise', body: 'Findings say what is true now. Recommendations say what should be done, and should follow from the findings.', examples: [{ text: 'Finding: The library closes at 3pm, before most students are free.', good: true }, { text: 'Recommendation: It is recommended that the library stays open until 5pm.', good: true }] },
            { title: 'Useful phrases', body: '“It is recommended that…”, “The school should consider…”, “To address this, …”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is a recommendation, not a finding?', options: ['It is recommended that more books be bought for SS3 students.', 'The library has 1,200 books.', 'Most students visit on Fridays.', 'The library opens at 8am.'], answer: 0, why: 'A recommendation says what should be done.' },
            { type: 'choice', q: 'A finding says the canteen queue takes 25 minutes. Which recommendation follows from it?', options: ['Open a second serving point at lunchtime.', 'Paint the canteen blue.', 'Cancel sports day.', 'Buy more library books.'], answer: 0, why: 'A good recommendation solves the problem in the finding.' },
            { type: 'write', kind: 'report', q: 'Write a short report to your principal on the school library. Use the headings Introduction, Findings and Recommendations.', minWords: 100, maxWords: 250, checklist: ['A title', 'Headings: Introduction, Findings, Recommendations', 'Facts with numbers', 'Formal, impersonal language'], model: 'Report on the School Library\n\nIntroduction\nThis report examines how students use the school library and suggests improvements. It is based on a survey of 60 students in October.\n\nFindings\nIt was found that 42 of the 60 students visit the library at least once a week. However, most of them said that it closes too early, at 3pm. In addition, many respondents reported that there are not enough recent textbooks for SS3 subjects.\n\nRecommendations\nIt is recommended that the library stays open until 5pm on weekdays. Furthermore, the school should consider buying new SS3 textbooks before the examination period, so that final-year learners can prepare properly.' }
          ]
        }
      ]
    }
  ]
};
