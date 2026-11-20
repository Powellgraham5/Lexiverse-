// Better writing: Letters. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at layout, greeting, closing, paragraphs and formal style; they cannot judge your message, so compare with the model letter.',
  guide: [
    'Start with the introduction, then formal letters (layout, language and four common types), then informal and semi-formal letters.',
    'Every writing task has a model answer: write yours first, then compare.',
    'Use Writing formats for the exact layout of each kind of letter.',
    'Finish with the final assessment, then the timed or untimed practice test.',
    'Save useful opening and closing expressions to your notebook.'
  ],
  improve: [
    'Decide the register before you write a word: who is the reader?',
    'Learn three openings and three closings for each kind of letter by heart.',
    'State your purpose in the first paragraph of every formal letter.',
    'Check that your greeting and ending match: Dear Sir or Madam with Yours faithfully, Dear Mr Bello with Yours sincerely.',
    'Read your letter as the receiver would: is it clear what you want them to do?',
    'Write one real letter or formal email a month: to a school, a company or a newspaper.'
  ],
  units: [
    {
      title: 'Letters at a glance',
      lessons: [
        {
          id: 'letter-intro', title: 'What a letter is, and the three kinds', minutes: 5, kind: 'intro',
          cards: [
            { title: 'A letter has a reader and a purpose', body: 'A letter is a written message to a particular person or organisation. Before you write, answer two questions: who will read it, and what do I want them to know or do? The answers decide the layout, the tone and the words you use.' },
            { title: 'Formal, informal and semi-formal', body: 'Formal letters go to officials, organisations or people you do not know: a principal, a company, a newspaper editor. Informal letters go to friends and family. Semi-formal letters go to people you know but respect, such as a teacher, a neighbour or a family friend.' },
            { title: 'Real life', body: 'You will write letters to apply for jobs and admission, to complain or request something, to thank someone, and to keep in touch. Exams such as WAEC and NECO often include a letter question, and IELTS General Training includes one in Writing Task 1.' },
            { title: 'Common mistakes', body: 'Choosing the wrong register for the reader, forgetting the date, and starting without stating why you are writing.' }
          ],
          exercises: [
            { type: 'choice', q: 'You are writing to the manager of a bank you have never met. Which kind of letter is it?', options: ['Formal', 'Informal', 'Semi-formal'], answer: 0, why: 'An organisation or a person you do not know gets a formal letter.' },
            { type: 'choice', q: 'You are writing to your cousin about your holiday. Which kind is it?', options: ['Informal', 'Formal', 'Semi-formal'], answer: 0, why: 'Friends and family get an informal letter.' },
            { type: 'choice', q: 'You are writing to your former English teacher to thank her for her help. Which kind is it?', options: ['Semi-formal', 'Informal', 'Formal'], answer: 0, why: 'Someone you know but respect gets a semi-formal letter: polite, but warmer than a formal one.' },
            { type: 'choice', q: 'What should you decide before writing any letter?', options: ['Who will read it and what you want them to do', 'How many pages it will be', 'Which pen to use', 'The date you will post it'], answer: 0, why: 'The reader and the purpose decide the layout, tone and words.' },
            { type: 'choice', q: 'Which is a real-life reason to write a formal letter?', options: ['To apply for admission to a university', 'To tell your cousin about a party', 'To send a joke to a friend', 'To greet your sister'], answer: 0, why: 'Admission offices expect a formal letter.' }
          ]
        }
      ]
    },
    {
      title: 'Formal letters',
      lessons: [
        {
          id: 'letter-formal-layout', title: 'Formal letter layout', minutes: 6,
          cards: [
            { title: 'The parts, in order', body: 'Your address and the date at the top right. The receiver’s title and address on the left, below. The salutation: “Dear Sir,” or “Dear Madam,” (or “Dear Mr Bello,” if you know the name). A heading that states the subject. The body in short paragraphs. The closing: “Yours faithfully,” with your signature and full name.' },
            { title: 'Matching greeting and ending', body: 'If you began with “Dear Sir” or “Dear Madam”, end with “Yours faithfully,”. If you began with the person’s name, end with “Yours sincerely,”.', examples: [{ text: 'Dear Sir, … Yours faithfully,', good: true }, { text: 'Dear Mrs Okoro, … Yours sincerely,', good: true }, { text: 'Dear Sir, … Your loving friend,', good: false }] },
            { title: 'Common mistakes', body: 'Writing a capital F in “Yours Faithfully”; leaving out the heading; putting the receiver’s address on the right; starting with “I am writing this letter to tell you that…” and then repeating the purpose; ending with a nickname instead of your full name.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a formal letter in order.', parts: ['Your address and the date', 'The receiver’s title and address', 'Dear Sir,', 'The heading', 'The body paragraphs', 'Yours faithfully, signature and full name'], why: 'This is the standard layout for a formal letter.' },
            { type: 'choice', q: 'You started with “Dear Madam,”. How should you end?', options: ['Yours faithfully,', 'Yours sincerely,', 'Your loving friend,', 'Cheers,'], answer: 0, why: 'A letter to an unnamed reader ends with “Yours faithfully,”.' },
            { type: 'choice', q: 'You started with “Dear Mr Adeyemi,”. How should you end?', options: ['Yours sincerely,', 'Yours faithfully,', 'Love,', 'See you,'], answer: 0, why: 'A letter to a named reader ends with “Yours sincerely,”.' },
            { type: 'error', q: 'Which part has a mistake?', parts: ['Thank you for your time.', 'I look forward to your reply.', 'Yours Faithfully,', 'Chinedu Okeke'], answer: 2, fix: 'Yours faithfully,', why: 'Only the first word of the closing takes a capital letter.' },
            { type: 'gap', q: 'If you begin with “Dear Sir,”, you end with “Yours ___,”.', options: ['faithfully', 'sincerely', 'truly lovingly', 'forever'], answer: 0, why: 'An unnamed reader takes “Yours faithfully”.' }
          ]
        },
        {
          id: 'letter-formal-language', title: 'Formal language and expressions', minutes: 6,
          cards: [
            { title: 'Polite, clear and complete', body: 'Formal letters use full words, complete sentences and a polite, impersonal tone. Avoid slang, contractions and text-message spelling.', examples: [{ text: 'I am writing to apply for the post of library assistant advertised in The Guardian.', good: true }, { text: 'Am writing coz I want d job.', good: false }] },
            { title: 'Useful expressions', body: 'Opening: “I am writing to request / complain about / apply for…”. Giving details: “I would like to draw your attention to…”, “Furthermore,…”. Requesting: “I would be grateful if you could…”. Closing: “I look forward to hearing from you.”' },
            { title: 'Real-life use', body: 'A clear first sentence that states the purpose helps the reader act quickly: a manager reading forty letters will remember the one that told them what was wanted at once.' },
            { title: 'Common mistakes', body: 'Contractions, slang, overly long sentences, and old-fashioned phrases such as “I beg to humbly submit”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best first sentence for a formal complaint?', options: ['I am writing to complain about the frequent power cuts on Ade Street.', 'Hi, how are you?', 'You people are useless.', 'I have been wanting to write this letter for a long time and finally I have decided to write it.'], answer: 0, why: 'It states the purpose politely and clearly in the first sentence.' },
            { type: 'gap', q: 'I would be grateful if you ___ consider my application.', options: ['could', 'can to', 'will to', 'should of'], answer: 0, why: '“I would be grateful if you could…” is the standard polite request.' },
            { type: 'choice', q: 'Which closing line suits a formal letter?', options: ['I look forward to hearing from you.', 'Gotta go now!', 'Reply me sharp sharp.', 'Bye for now.'], answer: 0, why: 'It is polite and invites a reply.' },
            { type: 'write', kind: 'letter-formal', q: 'Write a formal letter to the Chairman of your Local Government complaining about the poor state of the road leading to your school.', minWords: 150, maxWords: 350, checklist: ['Addresses, date and “Dear Sir,”', 'A heading', 'Purpose in the first paragraph', 'Effects of the problem with examples', 'A polite request and “Yours faithfully,”'], model: 'Dear Sir,\n\nTHE POOR STATE OF SCHOOL ROAD, IKOTUN\n\nI am writing to draw your attention to the very poor state of School Road, which leads to Ikotun Community Secondary School.\n\nThe road has several deep potholes that fill with water whenever it rains. As a result, many students arrive late and with muddy uniforms. Furthermore, last month a motorcycle carrying two students fell into one of the holes, and both were injured.\n\nIn addition, parents now refuse to drive on the road, so younger pupils have to walk long distances. Traders near the school have also lost customers because vehicles avoid the area.\n\nI would therefore be grateful if you could arrange for the road to be repaired before the rainy season becomes heavier. Even filling the largest potholes would make a great difference to our safety.\n\nI look forward to your favourable response.\n\nYours faithfully,\n\nFunmilayo Adebayo\nSenior Prefect' },
            { type: 'choice', q: 'Which phrase is too old-fashioned?', options: ['I humbly beg to bring to your kind notice', 'I am writing to inform you', 'I would be grateful if', 'I look forward to your reply'], answer: 0, why: 'Modern formal English is clear and direct.' }
          ]
        }
      ]
    },
    {
      title: 'Types of formal letter',
      lessons: [
        {
          id: 'letter-application', title: 'Application letters', minutes: 7,
          cards: [
            { title: 'What it is', body: 'A letter applying for a job, an admission place, a scholarship or an internship. Its goal is to make the reader want to interview you.' },
            { title: 'Structure', body: 'Paragraph 1: the position and where you saw it. Paragraph 2: your qualifications and experience, with evidence. Paragraph 3: why you want this role. Paragraph 4: availability and a polite close.', examples: [{ text: 'I am writing to apply for the position of library assistant advertised on your website.', good: true }, { text: 'I want the job.', good: false }] },
            { title: 'Real-life use', body: 'Application letters (or cover letters) go with a CV. Employers often read them for under a minute, so the first paragraph and evidence matter most.' },
            { title: 'Common mistakes', body: 'Not naming the position, listing duties instead of achievements, begging (“please give me this job, I really need it”), and spelling errors in the company’s name.' }
          ],
          exercises: [
            { type: 'choice', q: 'What should the first paragraph of an application letter say?', options: ['The position and where you saw it advertised', 'Your hobbies', 'Your family history', 'Your salary demands'], answer: 0, why: 'The reader needs to know which job you mean.' },
            { type: 'choice', q: 'Which sentence shows evidence best?', options: ['As class captain, I organised a reading club that grew from 8 to 40 members.', 'I am a very good leader.', 'Everyone says I am hardworking.', 'I can do anything.'], answer: 0, why: 'Specific achievements prove your skills.' },
            { type: 'choice', q: 'Which closing line is best?', options: ['I would welcome the opportunity to discuss my application at an interview.', 'Please give me this job, I beg you.', 'Call me.', 'Hope to hear from you or not.'], answer: 0, why: 'It is confident and polite.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['I am writing to apply', 'for the post of cashier.', 'I really really need money', 'and I am available immediately.'], answer: 2, fix: 'I have two years of experience handling cash accurately', why: 'Focus on what you offer, not on your needs.' },
            { type: 'order', q: 'Put the paragraphs of an application letter in order.', parts: ['The position you are applying for', 'Your qualifications and experience', 'Why you want this role', 'Availability and polite close'], why: 'This moves from purpose to evidence to motivation to action.' },
            { type: 'write', kind: 'letter-formal', q: 'Write an application letter for a holiday job as a library assistant at your local public library.', minWords: 100, maxWords: 260, checklist: ['The position and where you saw it', 'Evidence of relevant skills', 'Why you want the role', 'Formal greeting and matching ending'], model: '12 Ojo Street\nIbadan\n2 June 2026\n\nThe Head Librarian\nCentral Public Library\nIbadan\n\nDear Sir or Madam,\n\nI am writing to apply for the position of holiday library assistant, which was advertised on the library notice board.\n\nI am an SS2 student at Ibadan Grammar School, where I help run the school library. For example, I catalogue new books and help younger students find what they need. Furthermore, I am organised, punctual and comfortable using computers.\n\nI would like this role because I enjoy reading and helping people. In addition, it would give me valuable experience of working with the public.\n\nI am available from 20 July until the end of August. I would welcome the opportunity to attend an interview at your convenience.\n\nYours faithfully,\nTobi Adeyemi' }
          ]
        },
        {
          id: 'letter-complaint', title: 'Complaint letters', minutes: 7,
          cards: [
            { title: 'What it is', body: 'A letter that reports a problem with a product, service or situation and asks for a solution. Firm but polite gets results; rude letters get ignored.' },
            { title: 'Structure', body: 'Paragraph 1: what you are complaining about. Paragraph 2: the facts: what, when, where, any reference numbers. Paragraph 3: the effect on you. Paragraph 4: what you want done and by when.' },
            { title: 'Firm, polite language', body: '“I am writing to complain about…”, “Unfortunately,…”, “I would be grateful if you could…”, “I look forward to your prompt reply.”', examples: [{ text: 'I would be grateful if you could replace the faulty phone within seven days.', good: true }, { text: 'Fix it now or else!', good: false }] },
            { title: 'Common mistakes', body: 'Insulting the reader, giving no dates or details, not saying what you want, and writing one angry paragraph.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening suits a complaint letter?', options: ['I am writing to complain about the poor service I received at your Ikeja branch on 3 May.', 'You people are useless!', 'Hello, how are you?', 'I hate your shop.'], answer: 0, why: 'It states the purpose clearly and politely.' },
            { type: 'choice', q: 'What should the second paragraph contain?', options: ['The facts: what happened, when and where', 'Insults', 'A joke', 'Your life story'], answer: 0, why: 'Facts make your complaint credible.' },
            { type: 'gap', q: 'I would be ___ if you could refund the full amount.', options: ['grateful', 'great', 'greatful', 'gratefully'], answer: 0, why: '“Grateful” is the correct spelling and form.' },
            { type: 'choice', q: 'Which request is clearest?', options: ['Please replace the blender or refund the ₦25,000 within 14 days.', 'Do something.', 'Sort it out.', 'I want things to be better.'], answer: 0, why: 'It says exactly what and by when.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['The delivery arrived', 'five days late,', 'and your drivers are idiots.', 'I request a refund of the delivery fee.'], answer: 2, fix: 'and the driver did not call ahead as promised.', why: 'Insults weaken a complaint. Stick to facts.' },
            { type: 'write', kind: 'letter-formal', q: 'Write a letter to the manager of an electronics shop complaining about a phone that stopped working after two weeks.', minWords: 100, maxWords: 260, checklist: ['The complaint stated in paragraph 1', 'Facts: date, product, problem', 'The effect on you', 'A clear request and a deadline'], model: '5 Allen Avenue\nIkeja\nLagos\n10 May 2026\n\nThe Manager\nBright Electronics\nOpebi Road\nIkeja\n\nDear Sir or Madam,\n\nI am writing to complain about a mobile phone that I bought from your shop on 24 April.\n\nThe phone, a Nova 5 (receipt number 4471), worked well at first. However, after two weeks the screen began to flicker, and it now turns off without warning.\n\nAs a result, I have missed important calls from my employer. Moreover, I paid a high price because your staff assured me the phone was reliable.\n\nI would be grateful if you could replace the phone or refund the full amount within 14 days. I enclose a copy of my receipt.\n\nI look forward to your prompt reply.\n\nYours faithfully,\nEmeka Obi' }
          ]
        },
        {
          id: 'letter-request', title: 'Request and enquiry letters', minutes: 6,
          cards: [
            { title: 'What it is', body: 'A letter asking for information, permission or help: from a school, company, council or organisation.' },
            { title: 'Be specific', body: 'Say exactly what you need, why and by when. Number your questions if you have several.', examples: [{ text: 'Could you please tell me the closing date and the fees for the summer course?', good: true }, { text: 'Tell me everything about your courses.', good: false }] },
            { title: 'Polite request forms', body: '“I would be grateful if you could…”, “Could you please…”, “I would like to request…”, “I would appreciate it if…”.' },
            { title: 'Common mistakes', body: 'Vague requests, demanding tone (“Send me…”), no reason given, and forgetting to say how you can be contacted.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which request is most polite?', options: ['I would be grateful if you could send me a copy of the timetable.', 'Send me the timetable.', 'Give me the timetable now.', 'Timetable please thanks.'], answer: 0, why: 'It uses a polite, formal request form.' },
            { type: 'choice', q: 'You have three questions. How should you present them?', options: ['As a short numbered list', 'All in one long sentence', 'Only ask one', 'In the closing line'], answer: 0, why: 'A numbered list is clear and easy to answer.' },
            { type: 'gap', q: 'I would ___ it if you could reply by Friday.', options: ['appreciate', 'appreciation', 'appreciating', 'appreciative'], answer: 0, why: '“I would appreciate it if…” is a standard polite form.' },
            { type: 'choice', q: 'Which detail should a request letter include?', options: ['How the reader can contact you', 'Your favourite colour', 'Gossip', 'A complaint about another company'], answer: 0, why: 'The reader needs to know how to reply.' },
            { type: 'error', q: 'Find the impolite part.', parts: ['I am writing to request', 'permission to use the hall.', 'Answer me quickly', 'as the event is on 5 June.'], answer: 2, fix: 'I would be grateful for a reply by 25 May,', why: 'Commands sound rude in a formal request.' },
            { type: 'write', kind: 'letter-formal', q: 'Write a letter to the principal requesting permission to use the school hall for a charity concert.', minWords: 100, maxWords: 230, checklist: ['The request stated clearly', 'Details: date, time, purpose', 'Polite request forms', 'Formal greeting and ending'], model: 'Ikoyi Secondary School\nLagos\n2 May 2026\n\nThe Principal\nIkoyi Secondary School\nLagos\n\nDear Madam,\n\nI am writing on behalf of the Drama Club to request permission to use the school hall for a charity concert.\n\nThe concert would take place on Saturday 6 June, from 2pm to 5pm. All money raised would go to the children’s ward of the general hospital. Furthermore, club members would set up and clean the hall themselves.\n\nSince the concert supports a good cause, the club hopes that you will agree. I would be grateful if you could let me know your decision by 20 May, so that we have time to prepare.\n\nYours faithfully,\nZainab Musa\nSecretary, Drama Club' }
          ]
        },
        {
          id: 'letter-editor', title: 'Letters to the editor', minutes: 6,
          cards: [
            { title: 'What it is', body: 'A letter to a newspaper or magazine giving your opinion on a public issue, often replying to an article. It is formal but persuasive.' },
            { title: 'Structure', body: 'Paragraph 1: the issue (and the article you are replying to). Paragraphs 2 and 3: your arguments with evidence. Paragraph 4: a call to action.' },
            { title: 'Persuasive, not rude', body: 'Use reasons, facts and examples. Address “The Editor” and end with “Yours faithfully”.', examples: [{ text: 'The proposed road would destroy the only park in our area, used daily by hundreds of children.', good: true }, { text: 'Whoever planned this road is stupid.', good: false }] },
            { title: 'Common mistakes', body: 'Writing to the editor as a friend, personal attacks, no evidence, and forgetting a call to action.' }
          ],
          exercises: [
            { type: 'choice', q: 'How should a letter to the editor begin?', options: ['Dear Sir or Madam, (or Dear Editor,)', 'Hi there!', 'Yo editor,', 'My dearest friend,'], answer: 0, why: 'It is a formal letter.' },
            { type: 'choice', q: 'What makes an argument persuasive?', options: ['A reason supported by facts or examples', 'Insulting the other side', 'Writing in capitals', 'Repeating the same sentence'], answer: 0, why: 'Evidence convinces readers.' },
            { type: 'choice', q: 'Which is a call to action?', options: ['I urge the council to reconsider this plan before the vote next month.', 'The road is long.', 'I live near the park.', 'Roads are made of tar.'], answer: 0, why: 'It asks someone to do something specific.' },
            { type: 'gap', q: 'I am writing in response to your article ___ 3 March about school fees.', options: ['of', 'on', 'at', 'in'], answer: 0, why: '“Your article of 3 March” is the standard formal phrase.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['The new tax', 'will hurt small traders,', 'and the minister is clearly a fool.', 'It should be reviewed.'], answer: 2, fix: 'many of whom earn less than ₦3,000 a day.', why: 'Personal attacks weaken an argument.' },
            { type: 'write', kind: 'letter-formal', q: 'Write a letter to the editor of a newspaper arguing that your town needs more streetlights.', minWords: 100, maxWords: 260, checklist: ['The issue stated in paragraph 1', 'Two arguments with evidence', 'A call to action', 'Formal greeting and ending'], model: '14 Market Road\nEnugu\n8 April 2026\n\nThe Editor\nThe Daily Star\nEnugu\n\nDear Sir or Madam,\n\nI am writing to draw attention to the lack of streetlights in the Ogui area of our town.\n\nFirstly, dark streets are dangerous. In the last three months, residents have reported at least six robberies after sunset on Ogui Road alone.\n\nSecondly, poor lighting harms local businesses. Many traders close early because customers are afraid to walk home in the dark, so they lose valuable evening sales.\n\nI therefore urge the local government to install streetlights on Ogui Road before the end of the year. Safe streets would benefit everyone.\n\nYours faithfully,\nChinedu Eze' }
          ]
        }
      ]
    },
    {
      title: 'Informal and semi-formal letters',
      lessons: [
        {
          id: 'letter-informal', title: 'Informal letters', minutes: 6,
          cards: [
            { title: 'Layout', body: 'Your address and the date at the top right. No receiver’s address. A warm greeting: “Dear Ada,”. An opening paragraph that greets and asks after the reader. The body with your news or the purpose. A friendly closing paragraph, then an ending such as “Your loving friend,” or “Your brother,” and your first name.' },
            { title: 'Tone', body: 'Write as if you were talking to the person, but in correct English. Contractions such as “I’m” are fine. Slang and text spellings (“u”, “gr8”) are not, especially in an exam.', examples: [{ text: 'I’m so happy you passed your exams! Tell me everything.', good: true }, { text: 'Gud mornin, hw r u?', good: false }] },
            { title: 'Common mistakes', body: 'Adding the receiver’s address, using “Yours faithfully”, writing a cold, formal opening to a close friend, or forgetting to answer the question the exam actually asked.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening suits an informal letter to a friend?', options: ['Dear Tolu, how are you and your family? I hope school is going well.', 'Dear Sir, I write to inform you…', 'To whom it may concern,', 'The Manager,'], answer: 0, why: 'It is warm and personal.' },
            { type: 'choice', q: 'Which part does an informal letter NOT have?', options: ['The receiver’s address', 'Your address', 'The date', 'A greeting'], answer: 0, why: 'Informal letters include only your own address and the date.' },
            { type: 'choice', q: 'Which ending suits a letter to your sister?', options: ['Your loving sister,', 'Yours faithfully,', 'Yours sincerely, Mrs …', 'Regards, the Management'], answer: 0, why: 'A warm, personal ending fits family.' },
            { type: 'write', kind: 'letter-informal', q: 'Write a letter to a friend in another city telling them about a recent event in your school.', minWords: 120, maxWords: 300, checklist: ['Your address and the date only', 'A warm greeting and opening', 'The event, told clearly', 'A friendly closing and first name'], model: 'Dear Kemi,\n\nHow are you and everyone in Kaduna? I hope your new school is treating you well. I miss our long walks home after lessons.\n\nI am writing to tell you about our inter-house sports day, which happened last Friday. My house, Green House, won the overall trophy for the first time in five years! I ran the second leg of the relay, and although I was nervous, we finished first by a whole metre. The whole school was cheering, and our principal even danced at the prize-giving.\n\nAfterwards, we celebrated with jollof rice in the school hall. Our English teacher, Mrs Obi, asked about you. She says you should keep reading every day.\n\nPlease write back soon and tell me about your new friends. Greet your parents for me.\n\nYour loving friend,\nAmara' },
            { type: 'choice', q: 'Which ending suits a letter to your cousin?', options: ['Love, Ada', 'Yours faithfully, Ada Obi', 'Regards, the Management', 'Yours sincerely, Mrs A. Obi'], answer: 0, why: 'Informal letters use warm endings and first names.' }
          ]
        },
        {
          id: 'letter-semiformal', title: 'Semi-formal letters', minutes: 6,
          cards: [
            { title: 'What it is', body: 'A letter to someone you know but respect: a teacher, a pastor or imam, a friend’s parent, a neighbour or a family elder. It is polite and warm, without slang.' },
            { title: 'Layout', body: 'Your address and the date (no receiver’s address). Greeting with a title and surname: “Dear Mrs Okafor,”. Ending: “Yours sincerely,” and your full name.', examples: [{ text: 'Dear Mr Bello, … Yours sincerely, Ada Nwosu', good: true }, { text: 'Hey Mr Bello, … Love, Ada', good: false }] },
            { title: 'Tone', body: 'Friendly and respectful. Contractions are acceptable in moderation, but avoid slang. Show gratitude and concern where suitable.' },
            { title: 'Common mistakes', body: 'Using first names for elders, slang, “Yours faithfully” (that is for unnamed readers), and adding the receiver’s address.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which reader needs a semi-formal letter?', options: ['Your former class teacher', 'Your best friend', 'A company you have never contacted', 'A newspaper editor'], answer: 0, why: 'You know the teacher, but the relationship calls for respect.' },
            { type: 'choice', q: 'How should a semi-formal letter end?', options: ['Yours sincerely, and your full name', 'Love you loads', 'Yours faithfully', 'Bye'], answer: 0, why: 'You know the reader’s name, so use “Yours sincerely”.' },
            { type: 'choice', q: 'Which greeting suits a letter to your friend’s father?', options: ['Dear Mr Adamu,', 'Hey Baba!', 'Dear Sir or Madam,', 'Yo Mr A,'], answer: 0, why: 'Use a title and surname.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['Dear Mrs Okafor,', 'Thank you so much for the books.', 'They are lit, no cap.', 'I have already read two of them.'], answer: 2, fix: 'They are wonderful.', why: 'Slang does not suit a semi-formal letter.' },
            { type: 'choice', q: 'Which address do you include in a semi-formal letter?', options: ['Only your own', 'Only the receiver’s', 'Both', 'None'], answer: 0, why: 'Like an informal letter, only your address and the date.' },
            { type: 'write', kind: 'letter-formal', minParagraphs: 3, q: 'Write a letter to your former primary school teacher telling them about your progress at secondary school and thanking them.', minWords: 110, maxWords: 250, checklist: ['Your address and the date only', 'Dear + title + surname', 'Respectful, warm tone', 'Yours sincerely and your full name'], model: '7 Lake Road\nAbuja\n12 March 2026\n\nDear Mrs Okafor,\n\nI hope you are well and that the new school year has started smoothly. I am writing to tell you how I am getting on and to thank you.\n\nI am now in SS1 at Federal Government College. Although the work is harder, I came first in English last term. Furthermore, I was chosen to represent the school in a debate competition.\n\nI often remember how patiently you taught us to read aloud. Because of you, I am not afraid to speak in front of others, and I am very grateful.\n\nI hope to visit the school during the holidays. Please give my greetings to the other teachers.\n\nYours sincerely,\nAdaeze Nwosu' }
          ]
        },
        {
          id: 'letter-compare', title: 'Formal or informal: spot the difference', minutes: 5,
          cards: [
            { title: 'Side by side', body: 'Formal: two addresses, “Dear Sir,”, a heading, impersonal language, “Yours faithfully,” and full name. Informal: one address, “Dear Ada,”, no heading, personal language, “Your friend,” and first name. Semi-formal: one address, “Dear Mr Bello,”, no heading, polite but warm, “Yours sincerely,” and full name.' },
            { title: 'Choosing the right register', body: 'The same news sounds different to different readers.', examples: [{ text: 'To a friend: “Guess what? I got the job!”', good: true }, { text: 'To an employer: “Thank you for offering me the position. I am pleased to accept.”', good: true }] },
            { title: 'Common mistakes', body: 'Mixing registers in one letter (a formal greeting with slang inside), and using “Yours faithfully” with a friend.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which feature belongs only to a formal letter?', options: ['A heading', 'A greeting', 'The date', 'Paragraphs'], answer: 0, why: 'Formal letters carry a heading that states the subject.' },
            { type: 'choice', q: 'Which sentence suits a semi-formal letter to a family friend?', options: ['Thank you so much for your kind gift; it was very thoughtful of you.', 'Thanks bro!!!', 'I write to acknowledge receipt of the item.', 'Gift received.'], answer: 0, why: 'It is warm but polite, which suits a respected person you know.' },
            { type: 'choice', q: 'How does a semi-formal letter usually end?', options: ['Yours sincerely, and your full name', 'Yours faithfully, and your first name', 'Your loving friend, and a nickname', 'No ending'], answer: 0, why: 'Semi-formal letters end with “Yours sincerely,” and your full name.' },
            { type: 'error', q: 'Which part is wrong for an informal letter to your brother?', parts: ['Dear Tunde,', 'I hope you are well.', 'Yours faithfully,', 'Bisi'], answer: 2, fix: 'Your loving sister,', why: '“Yours faithfully” is for formal letters to unnamed readers.' },
            { type: 'choice', q: 'Which sentence is formal?', options: ['I am writing to request information about your courses.', 'Just wanted to ask about your courses.', 'What’s up with your courses?', 'Tell me about courses, yeah?'], answer: 0, why: 'It is complete, polite and impersonal.' }
          ]
        },
        {
          id: 'letter-social', title: 'Thanks, invitations and apologies', minutes: 6,
          cards: [
            { title: 'Thank-you letters', body: 'Name what you are thankful for, say why it mattered, and add a personal detail. Short and sincere is best.', examples: [{ text: 'Thank you for the dictionary. I used it every day while preparing for my exams.', good: true }] },
            { title: 'Invitations', body: 'Say what the event is, when and where, why you would like them to come, and how to reply. Formal: “I would be delighted if you could attend…”. Informal: “It would be great to see you there!”' },
            { title: 'Apologies', body: 'Apologise clearly, explain briefly (without excuses), and say how you will put it right.', examples: [{ text: 'I am sorry I missed your birthday party. I will visit you on Saturday to celebrate.', good: true }, { text: 'Sorry, but it was not really my fault.', good: false }] },
            { title: 'Common mistakes', body: 'Forgetting the date or venue in an invitation, a vague thank-you (“thanks for everything”), and apologies full of excuses.' }
          ],
          exercises: [
            { type: 'choice', q: 'What must an invitation include?', options: ['What, when and where', 'Only the date', 'Your exam results', 'A complaint'], answer: 0, why: 'Guests need all three to attend.' },
            { type: 'choice', q: 'Which thank-you sentence is best?', options: ['Thank you for the calculator; it made my maths revision so much easier.', 'Thanks for stuff.', 'Thank you for everything ever.', 'Got it, thanks.'], answer: 0, why: 'It is specific and says why it mattered.' },
            { type: 'choice', q: 'Which apology is best?', options: ['I am sorry I forgot to return your book. I will bring it tomorrow.', 'Sorry, but you should have reminded me.', 'Whatever, it is just a book.', 'Sorry not sorry.'], answer: 0, why: 'It apologises and offers a fix, without excuses.' },
            { type: 'gap', q: 'I would be ___ if you could attend our graduation ceremony.', options: ['delighted', 'delight', 'delighting', 'delightful'], answer: 0, why: '“I would be delighted if…” is a polite formal invitation.' },
            { type: 'choice', q: 'How should an informal invitation end?', options: ['Let me know if you can come!', 'Yours faithfully,', 'I await your formal response.', 'Regards, the Management'], answer: 0, why: 'It is friendly and asks for a reply.' },
            { type: 'write', kind: 'letter-informal', q: 'Write a letter to a friend inviting them to your birthday party.', minWords: 90, maxWords: 220, checklist: ['A friendly greeting', 'What, when and where', 'Why you want them to come', 'A request to reply and a friendly ending'], model: '23 Ring Road\nBenin City\n4 August 2026\n\nDear Kemi,\n\nHow are you? I hope you are enjoying the holidays. I have some exciting news: I am turning sixteen next month, and I am having a party!\n\nIt will be on Saturday 12 September at my house, from 3pm until 8pm. There will be music, games and, of course, plenty of jollof rice. In addition, my cousin is bringing his karaoke machine, so be ready to sing.\n\nIt would not be the same without you, because you have been my best friend since primary school. Please let me know by 5 September if you can come.\n\nWith love,\nTemi' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'letter-final', title: 'Final assessment: Letters', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '14 questions from the whole course: layout, language, the types of formal letter, informal and semi-formal letters, and social letters. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which ending matches “Dear Sir or Madam,”?', options: ['Yours faithfully,', 'Yours sincerely,', 'Love,', 'Cheers,'], answer: 0, why: 'Unnamed reader: Yours faithfully.' },
            { type: 'choice', q: 'Which ending matches “Dear Mr Bello,”?', options: ['Yours sincerely,', 'Yours faithfully,', 'Bye,', 'Your friend forever,'], answer: 0, why: 'Named reader: Yours sincerely.' },
            { type: 'choice', q: 'Which letter includes the receiver’s address?', options: ['A formal letter', 'An informal letter', 'A semi-formal letter', 'None'], answer: 0, why: 'Only formal letters include the receiver’s address.' },
            { type: 'choice', q: 'What should paragraph 1 of a complaint letter state?', options: ['What you are complaining about', 'A joke', 'Your hobbies', 'The solution only'], answer: 0, why: 'State your purpose first.' },
            { type: 'choice', q: 'Which sentence suits an application letter?', options: ['As prefect, I supervised 40 students during exams.', 'I am the best person ever.', 'Please, I really need this.', 'I can do anything you want.'], answer: 0, why: 'Evidence of skills persuades employers.' },
            { type: 'gap', q: 'I would be ___ if you could send me the brochure.', options: ['grateful', 'greatful', 'great', 'gratitude'], answer: 0, why: 'Correct spelling: grateful.' },
            { type: 'choice', q: 'Who receives a letter to the editor?', options: ['A newspaper or magazine', 'Your teacher', 'Your cousin', 'A bank'], answer: 0, why: 'It is published to the public.' },
            { type: 'choice', q: 'Which reader needs a semi-formal letter?', options: ['Your uncle’s friend who helped you get a job', 'Your best friend', 'An unknown company', 'A newspaper'], answer: 0, why: 'You know them but owe them respect.' },
            { type: 'error', q: 'Find the error in this formal letter.', parts: ['Dear Sir or Madam,', 'I can’t attend', 'the meeting on Friday.', 'Yours faithfully,'], answer: 1, fix: 'I cannot attend', why: 'Formal letters avoid contractions.' },
            { type: 'error', q: 'Find the error.', parts: ['Dear Mrs Danjuma,', 'Thank you for your help.', 'I am very grateful.', 'Yours faithfully,'], answer: 3, fix: 'Yours sincerely,', why: 'The reader is named, so use “Yours sincerely”.' },
            { type: 'choice', q: 'Which apology is best?', options: ['I am sorry I was late. I will leave home earlier from now on.', 'Sorry, traffic is not my fault.', 'Whatever.', 'You were late too.'], answer: 0, why: 'It apologises and promises a change.' },
            { type: 'choice', q: 'What must an invitation include?', options: ['What, when and where', 'Only the time', 'Your address only', 'A complaint'], answer: 0, why: 'Guests need all three.' },
            { type: 'order', q: 'Put the parts of a formal letter in order.', parts: ['Your address and the date', 'The receiver’s address', 'Greeting', 'Body', 'Closing and name'], why: 'This is the standard formal layout.' },
            { type: 'choice', q: 'Which phrase opens a request politely?', options: ['I would be grateful if you could…', 'Give me…', 'You must…', 'Do this now…'], answer: 0, why: 'It is polite and formal.' }
          ]
        }
      ]
    }
  ]
};
