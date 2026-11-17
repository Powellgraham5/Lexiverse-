// Better writing: Letters. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at layout, greeting, closing, paragraphs and formal style; they cannot judge your message, so compare with the model letter.',
  guide: ['Start with what a letter is and the three kinds: formal, informal and semi-formal.', 'Learn each layout, then the language that suits it.', 'Write the practice letter at the end of each lesson, check it, then compare with the model.', 'Copy the layouts from Writing formats and save useful expressions to your notebook.'],
  improve: ['Read your letter aloud: anything you would not say to that reader should change.', 'Check the ending matches the greeting: “Dear Sir” goes with “Yours faithfully”, a name with “Yours sincerely”.', 'Keep one purpose per paragraph and state the main purpose in the first paragraph.', 'Collect five good opening and closing sentences in your notebook and reuse them.'],
  units: [
    {
      title: 'Letters at a glance',
      lessons: [
        {
          id: 'letter-intro', title: 'What a letter is, and the three kinds', minutes: 5,
          cards: [
            { title: 'A letter has a reader and a purpose', body: 'A letter is a written message to a particular person or organisation. Before you write, answer two questions: who will read it, and what do I want them to know or do? The answers decide the layout, the tone and the words you use.' },
            { title: 'Formal, informal and semi-formal', body: 'Formal letters go to officials, organisations or people you do not know: a principal, a company, a newspaper editor. Informal letters go to friends and family. Semi-formal letters go to people you know but respect, such as a teacher, a neighbour or a family friend.' },
            { title: 'Real life', body: 'You will write letters to apply for jobs and admission, to complain or request something, to thank someone, and to keep in touch. Exams such as WAEC and NECO often include a letter question, and IELTS General Training includes one in Writing Task 1.' }
          ],
          exercises: [
            { type: 'choice', q: 'You are writing to the manager of a bank you have never met. Which kind of letter is it?', options: ['Formal', 'Informal', 'Semi-formal'], answer: 0, why: 'An organisation or a person you do not know gets a formal letter.' },
            { type: 'choice', q: 'You are writing to your cousin about your holiday. Which kind is it?', options: ['Informal', 'Formal', 'Semi-formal'], answer: 0, why: 'Friends and family get an informal letter.' },
            { type: 'choice', q: 'You are writing to your former English teacher to thank her for her help. Which kind is it?', options: ['Semi-formal', 'Informal', 'Formal'], answer: 0, why: 'Someone you know but respect gets a semi-formal letter: polite, but warmer than a formal one.' },
            { type: 'choice', q: 'What should you decide before writing any letter?', options: ['Who will read it and what you want them to do', 'How many pages it will be', 'Which pen to use', 'The date you will post it'], answer: 0, why: 'The reader and the purpose decide the layout, tone and words.' }
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
            { type: 'error', q: 'Which part has a mistake?', parts: ['Thank you for your time.', 'I look forward to your reply.', 'Yours Faithfully,', 'Chinedu Okeke'], answer: 2, fix: 'Yours faithfully,', why: 'Only the first word of the closing takes a capital letter.' }
          ]
        },
        {
          id: 'letter-formal-language', title: 'Formal language and expressions', minutes: 6,
          cards: [
            { title: 'Polite, clear and complete', body: 'Formal letters use full words, complete sentences and a polite, impersonal tone. Avoid slang, contractions and text-message spelling.', examples: [{ text: 'I am writing to apply for the post of library assistant advertised in The Guardian.', good: true }, { text: 'Am writing coz I want d job.', good: false }] },
            { title: 'Useful expressions', body: 'Opening: “I am writing to request / complain about / apply for…”. Giving details: “I would like to draw your attention to…”, “Furthermore,…”. Requesting: “I would be grateful if you could…”. Closing: “I look forward to hearing from you.”' },
            { title: 'Real-life use', body: 'A clear first sentence that states the purpose helps the reader act quickly: a manager reading forty letters will remember the one that told them what was wanted at once.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best first sentence for a formal complaint?', options: ['I am writing to complain about the frequent power cuts on Ade Street.', 'Hi, how are you?', 'You people are useless.', 'I have been wanting to write this letter for a long time and finally I have decided to write it.'], answer: 0, why: 'It states the purpose politely and clearly in the first sentence.' },
            { type: 'gap', q: 'I would be grateful if you ___ consider my application.', options: ['could', 'can to', 'will to', 'should of'], answer: 0, why: '“I would be grateful if you could…” is the standard polite request.' },
            { type: 'choice', q: 'Which closing line suits a formal letter?', options: ['I look forward to hearing from you.', 'Gotta go now!', 'Reply me sharp sharp.', 'Bye for now.'], answer: 0, why: 'It is polite and invites a reply.' },
            { type: 'write', kind: 'letter-formal', q: 'Write a formal letter to the Chairman of your Local Government complaining about the poor state of the road leading to your school.', minWords: 150, maxWords: 350, checklist: ['Addresses, date and “Dear Sir,”', 'A heading', 'Purpose in the first paragraph', 'Effects of the problem with examples', 'A polite request and “Yours faithfully,”'], model: 'Dear Sir,\n\nTHE POOR STATE OF SCHOOL ROAD, IKOTUN\n\nI am writing to draw your attention to the very poor state of School Road, which leads to Ikotun Community Secondary School.\n\nThe road has several deep potholes that fill with water whenever it rains. As a result, many students arrive late and with muddy uniforms. Furthermore, last month a motorcycle carrying two students fell into one of the holes, and both were injured.\n\nIn addition, parents now refuse to drive on the road, so younger pupils have to walk long distances. Traders near the school have also lost customers because vehicles avoid the area.\n\nI would therefore be grateful if you could arrange for the road to be repaired before the rainy season becomes heavier. Even filling the largest potholes would make a great difference to our safety.\n\nI look forward to your favourable response.\n\nYours faithfully,\n\nFunmilayo Adebayo\nSenior Prefect' }
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
            { type: 'write', kind: 'letter-informal', q: 'Write a letter to a friend in another city telling them about a recent event in your school.', minWords: 120, maxWords: 300, checklist: ['Your address and the date only', 'A warm greeting and opening', 'The event, told clearly', 'A friendly closing and first name'], model: 'Dear Kemi,\n\nHow are you and everyone in Kaduna? I hope your new school is treating you well. I miss our long walks home after lessons.\n\nI am writing to tell you about our inter-house sports day, which happened last Friday. My house, Green House, won the overall trophy for the first time in five years! I ran the second leg of the relay, and although I was nervous, we finished first by a whole metre. The whole school was cheering, and our principal even danced at the prize-giving.\n\nAfterwards, we celebrated with jollof rice in the school hall. Our English teacher, Mrs Obi, asked about you. She says you should keep reading every day.\n\nPlease write back soon and tell me about your new friends. Greet your parents for me.\n\nYour loving friend,\nAmara' }
          ]
        },
        {
          id: 'letter-compare', title: 'Formal or informal: spot the difference', minutes: 5,
          cards: [
            { title: 'Side by side', body: 'Formal: two addresses, “Dear Sir,”, a heading, impersonal language, “Yours faithfully,” and full name. Informal: one address, “Dear Ada,”, no heading, personal language, “Your friend,” and first name. Semi-formal: one address, “Dear Mr Bello,”, no heading, polite but warm, “Yours sincerely,” and full name.' },
            { title: 'Choosing the right register', body: 'The same news sounds different to different readers.', examples: [{ text: 'To a friend: “Guess what? I got the job!”', good: true }, { text: 'To an employer: “Thank you for offering me the position. I am pleased to accept.”', good: true }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which feature belongs only to a formal letter?', options: ['A heading', 'A greeting', 'The date', 'Paragraphs'], answer: 0, why: 'Formal letters carry a heading that states the subject.' },
            { type: 'choice', q: 'Which sentence suits a semi-formal letter to a family friend?', options: ['Thank you so much for your kind gift; it was very thoughtful of you.', 'Thanks bro!!!', 'I write to acknowledge receipt of the item.', 'Gift received.'], answer: 0, why: 'It is warm but polite, which suits a respected person you know.' },
            { type: 'choice', q: 'How does a semi-formal letter usually end?', options: ['Yours sincerely, and your full name', 'Yours faithfully, and your first name', 'Your loving friend, and a nickname', 'No ending'], answer: 0, why: 'Semi-formal letters end with “Yours sincerely,” and your full name.' },
            { type: 'error', q: 'Which part is wrong for an informal letter to your brother?', parts: ['Dear Tunde,', 'I hope you are well.', 'Yours faithfully,', 'Bisi'], answer: 2, fix: 'Your loving sister,', why: '“Yours faithfully” is for formal letters to unnamed readers.' }
          ]
        }
      ]
    }
  ]
};
