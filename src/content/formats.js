// Writing formats: layouts and rules for each kind of writing. Exam formats carry a reminder to
// check the official guide, because papers change. Practice links point at path lessons.
const CHECK = 'Formats can change. Always follow the instructions on your paper and check the official guide for your exam year.';

export const FORMAT_GROUPS = [
  {
    id: 'waec', title: 'WAEC / NECO', note: CHECK,
    formats: [
      {
        id: 'waec-formal', title: 'Formal letter', use: 'Writing to an official, an editor, or someone you do not know.',
        template: ['                              Your address', '                              Date', '', 'The receiver’s title', 'The receiver’s address', '', 'Dear Sir,', '', 'HEADING THAT STATES THE SUBJECT', '', 'Paragraph 1: why you are writing.', 'Paragraphs 2 to 4: details, one point each.', 'Last paragraph: what you want done.', '', 'Yours faithfully,', 'Signature', 'Full name'],
        rules: ['Use formal words; no slang or contractions.', 'Give the letter a heading.', 'End with “Yours faithfully,” after “Dear Sir” or “Dear Madam”.', 'The continuous-writing question usually asks for about 450 words; follow the word count on your paper.'],
        mistake: 'Ending with “Yours sincerely” after “Dear Sir”, or writing “Yours Faithfully” with a capital F.', practice: ['waec', 'waec-letters']
      },
      {
        id: 'waec-informal', title: 'Informal letter', use: 'Writing to a friend, cousin or family member.',
        template: ['                              Your address', '                              Date', '', 'Dear Ada,', '', 'A warm opening: greetings and news.', 'The purpose of the letter.', 'Details in a friendly tone.', 'A friendly close and greetings to family.', '', 'Your loving friend,', 'First name'],
        rules: ['Only your address and the date; no receiver’s address.', 'Use a friendly, natural tone, but still correct English.', 'End with “Your loving friend,” “Your sister,” or similar.'],
        mistake: 'Adding the receiver’s address, or using text-message spelling.', practice: ['waec', 'waec-letters']
      },
      {
        id: 'waec-semiformal', title: 'Semi-formal letter', use: 'Writing to someone you know but respect, such as a teacher or family friend.',
        template: ['                              Your address', '                              Date', '', 'Dear Mr Okafor,', '', 'A polite opening.', 'The purpose and details.', 'A polite close.', '', 'Yours sincerely,', 'Full name'],
        rules: ['Greet by name: “Dear Mr Okafor,” or “Dear Mrs Bello,”.', 'Polite and warm, but not casual.', 'End with “Yours sincerely,” and your full name.'],
        mistake: 'Using “Dear Sir” to someone you know well.', practice: ['waec', 'waec-letters']
      },
      {
        id: 'waec-speech', title: 'Speech', use: 'A talk to an audience, such as on prize-giving day or at a debate.',
        template: ['TITLE OF THE SPEECH', '', 'The Principal, members of staff, parents and my fellow students,', '', 'Introduce yourself and the topic.', 'Points, each in its own paragraph.', 'Speak to the audience directly.', '', 'Thank you for listening.'],
        rules: ['Address the audience at the start.', 'Use a title.', 'End with “Thank you for listening.”'],
        mistake: 'Writing it like a letter with addresses and “Yours faithfully”.', practice: ['waec', 'waec-essays']
      },
      {
        id: 'waec-article', title: 'Article', use: 'Writing for a school magazine or a newspaper.',
        template: ['A CATCHY TITLE', 'by Your Name', '', 'An opening that grabs the reader.', 'Body paragraphs: one point each.', 'A strong closing paragraph.'],
        rules: ['Give it a title, and put your name under the title or at the end.', 'Write for a general reader.', 'Use clear paragraphs.'],
        mistake: 'Starting with “Dear readers” as if it were a letter.', practice: ['waec', 'waec-essays']
      },
      {
        id: 'waec-argument', title: 'Argumentative essay or debate', use: 'Taking a side on a topic, for example “Social media does more harm than good”.',
        template: ['TITLE', '', 'Introduction: the topic and your side.', 'Point 1 with a reason and an example.', 'Point 2 with a reason and an example.', 'Point 3 with a reason and an example.', 'The other side, and why your side is stronger.', 'Conclusion: restate your side.'],
        rules: ['State your side clearly at the start.', 'One point per paragraph.', 'Answer the opposing view.'],
        mistake: 'Arguing both sides equally and never choosing one.', practice: ['waec', 'waec-essays']
      }
    ]
  },
  {
    id: 'ielts', title: 'IELTS', note: CHECK,
    formats: [
      {
        id: 'ielts-t1a', title: 'Writing Task 1 (Academic): chart or graph', use: 'Describing a graph, chart, table, map or process. At least 150 words, about 20 minutes.',
        template: ['Paragraph 1: paraphrase what the chart shows.', 'Paragraph 2: overview of the main trends (“Overall, …”).', 'Paragraph 3: key details with numbers.', 'Paragraph 4: more key details with numbers.'],
        rules: ['Always include an overview.', 'Report the data; no opinions or reasons.', 'Use trend language: rose sharply, fell steadily, peaked at.'],
        mistake: 'Leaving out the overview, or listing every number.', practice: ['ielts', 'ielts-task1']
      },
      {
        id: 'ielts-t1g', title: 'Writing Task 1 (General Training): letter', use: 'A letter for a situation, such as a request or a complaint. At least 150 words.',
        template: ['Dear …,', '', 'Paragraph 1: why you are writing.', 'Paragraphs 2 and 3: cover each bullet point in the task.', 'Final line: what you want to happen.', '', 'Closing,', 'Name'],
        rules: ['Cover every bullet point in the task.', 'Match the tone to the reader: formal, semi-formal or informal.', 'No addresses are needed.'],
        mistake: 'Missing one of the bullet points.', practice: ['emails', 'email-start']
      },
      {
        id: 'ielts-t2', title: 'Writing Task 2: essay', use: 'An essay on a general topic. At least 250 words, about 40 minutes. Worth more marks than Task 1.',
        template: ['Introduction: paraphrase the question and give your position.', 'Body paragraph 1: main idea, explanation, example.', 'Body paragraph 2: main idea, explanation, example.', 'Conclusion: restate your position.'],
        rules: ['Answer every part of the question.', 'One clear idea per paragraph.', 'Give your opinion when asked.'],
        mistake: 'Writing a memorised essay that does not answer this question.', practice: ['ielts', 'ielts-task2']
      }
    ]
  },
  {
    id: 'sat', title: 'SAT', note: CHECK,
    formats: [
      {
        id: 'sat-rw', title: 'Reading and Writing questions', use: 'The digital SAT has no essay. Writing is tested through multiple-choice questions.',
        template: ['A short passage (one sentence to one paragraph).', 'One question about it.', 'Four answer choices, A to D.'],
        rules: ['Two modules of 27 questions, 32 minutes each.', 'Question types: Information and Ideas, Craft and Structure, Expression of Ideas, Standard English Conventions.', 'Scores range from 200 to 800 for this section.'],
        mistake: 'Spending too long on one question: each one has its own short passage, so move on.', practice: ['sat', 'sat-format']
      }
    ]
  },
  {
    id: 'writing', title: 'Essays, stories and reports',
    formats: [
      {
        id: 'essay', title: 'Essay', use: 'Explaining or arguing about a topic.',
        template: ['Introduction: hook, background, thesis.', 'Body paragraphs: topic sentence, example, explanation, link (PEEL).', 'Conclusion: restate the thesis and sum up.'],
        rules: ['End the introduction with a clear thesis.', 'One idea per body paragraph.', 'No new ideas in the conclusion.'],
        mistake: 'A conclusion that brings in a new argument.', practice: ['essays', 'essay-shape']
      },
      {
        id: 'story', title: 'Story', use: 'Narrative and creative writing.',
        template: ['Opening: hook, character and setting.', 'A problem starts the action.', 'Rising tension.', 'Climax: the most exciting moment.', 'Resolution: how it ends and what changed.'],
        rules: ['Start in the action.', 'Show feelings through actions.', 'New speaker, new paragraph; punctuation inside the quotation marks.'],
        mistake: 'Ending with “and then I woke up and it was all a dream”.', practice: ['stories', 'story-structure']
      },
      {
        id: 'report', title: 'Report', use: 'Presenting facts to someone who needs to decide, such as a principal or manager.',
        template: ['Title', '', 'Introduction', 'The purpose of the report and how the information was gathered.', '', 'Findings', 'What you found, under clear sub-headings, with numbers.', '', 'Conclusion', 'What the findings mean.', '', 'Recommendations', 'What should be done.'],
        rules: ['Use headings on their own lines.', 'Formal, impersonal language: “It was found that …”.', 'Recommendations must follow from the findings.'],
        mistake: 'Writing it as one long essay with no headings.', practice: ['reports', 'report-structure']
      }
    ]
  },
  {
    id: 'emails', title: 'Emails',
    formats: [
      {
        id: 'email-formal', title: 'Formal email', use: 'Writing to a client, a manager or someone you do not know.',
        template: ['Subject: what the email is about', '', 'Dear Ms Adeyemi,', '', 'Why you are writing, in one or two sentences.', 'The details.', 'The next step or request.', '', 'Kind regards,', 'Full name', 'Role'],
        rules: ['A specific subject line.', 'Purpose in the first lines.', 'No slang, emoji or capital letters for emphasis.'],
        mistake: 'A subject line like “Hello” or “Urgent!!!”.', practice: ['emails', 'email-start']
      },
      {
        id: 'email-followup', title: 'Follow-up email', use: 'When you have had no reply.',
        template: ['Subject: Follow-up: the original subject', '', 'Dear Mrs Okon,', '', 'I am following up on my email of [date] about [topic].', 'Repeat the request briefly.', 'Make it easy to reply.', '', 'Kind regards,', 'Name'],
        rules: ['Refer to your earlier email and its date.', 'Stay polite; never blame the reader.', 'Keep it short.'],
        mistake: '“Why have you not replied??”', practice: ['emails', 'email-followup']
      },
      {
        id: 'email-apology', title: 'Apology or reply to a complaint', use: 'When something went wrong.',
        template: ['Subject: Your recent order', '', 'Dear Mr Bello,', '', 'Thank you for letting us know about …', 'I am sorry for …', 'What we are doing to fix it, and when.', 'Contact for further help.', '', 'Kind regards,', 'Name, team'],
        rules: ['Thank, apologise, act, offer help.', 'Take responsibility; do not blame others.', 'Give a clear timeline.'],
        mistake: 'Blaming the delivery driver or the system.', practice: ['emails', 'email-apology']
      }
    ]
  }
];
