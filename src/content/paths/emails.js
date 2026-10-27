// Work and career: Emails. Practice material written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look for a subject, greeting, closing and length; they cannot judge your message, so compare it with the model email.',
  units: [
    {
      title: 'Parts of an email',
      lessons: [
        {
          id: 'email-start', title: 'Subject line, greeting and purpose', minutes: 5,
          cards: [
            { title: 'A subject line that says it all', body: 'The reader should know what the email is about before opening it. Be specific.', examples: [{ text: 'Subject: Request to move Friday’s meeting to 2pm', good: true }, { text: 'Subject: Hello', good: false }] },
            { title: 'The right greeting', body: 'Match the greeting to the relationship.', examples: [{ text: 'Dear Ms Adeyemi, (formal, you know the name)', good: true }, { text: 'Dear Hiring Manager, (formal, you do not know the name)', good: true }, { text: 'Hi Tolu, (a colleague you know well)', good: true }] },
            { title: 'Purpose first', body: 'Busy readers want the point early. Say why you are writing in the first one or two sentences.', examples: [{ text: 'I am writing to ask whether we can move Friday’s meeting to 2pm.', good: true }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which subject line is best for asking your manager for a day off?', options: ['Subject: Leave request for Monday 4 November', 'Subject: Hi', 'Subject: Question', 'Subject: URGENT!!!'], answer: 0, why: 'It tells the reader exactly what the email is about.' },
            { type: 'choice', q: 'You are applying for a job and do not know who will read your email. Which greeting fits?', options: ['Dear Hiring Manager,', 'Hey there,', 'Yo,', 'Dear Friend,'], answer: 0, why: 'When you do not know the name, a formal title is polite and professional.' },
            { type: 'choice', q: 'Which first line gets to the point?', options: ['I am writing to confirm my attendance at Tuesday’s training.', 'I hope this email finds you well and that you had a lovely weekend with your family and friends.', 'It has been a long time.', 'So, about that thing.'], answer: 0, why: 'It states the purpose straight away. A short friendly line is fine, but the purpose should come early.' },
            { type: 'order', q: 'Put the parts of an email in order.', parts: ['Subject line', 'Greeting', 'Purpose of the email', 'Details', 'Closing line or request', 'Sign-off and your name'], why: 'This order lets the reader understand the email quickly.' }
          ]
        },
        {
          id: 'email-end', title: 'Closing and sign-off', minutes: 5,
          cards: [
            { title: 'Ask for what you need', body: 'End the message with a clear next step, so the reader knows what to do.', examples: [{ text: 'Could you let me know by Thursday?', good: true }, { text: 'Please find the report attached.', good: true }] },
            { title: 'Sign off to match the greeting', body: 'Formal: “Kind regards,” or “Yours sincerely,”. Friendly but professional: “Best regards,” or “Thanks,”. Add your full name, and your role if the reader may not know you.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which closing line gives a clear next step?', options: ['Could you send me the figures by Thursday?', 'Anyway, that is all.', 'Whatever works.', 'Bye.'], answer: 0, why: 'It says exactly what is needed and when.' },
            { type: 'choice', q: 'Which sign-off fits an email to a client?', options: ['Kind regards,', 'Later,', 'Love,', 'XOXO'], answer: 0, why: '“Kind regards,” is polite and professional.' },
            { type: 'error', q: 'Which part is wrong for a professional email?', parts: ['Please find', 'the invoice attached.', 'Thx,', 'Ada Obi, Accounts'], answer: 2, fix: 'Thanks, or Kind regards,', why: '“Thx” is too casual for professional email.' },
            { type: 'write', kind: 'email', subject: true, q: 'Email your team leader asking to move tomorrow’s 10am meeting to 2pm. Include a subject line, greeting, reason, request and sign-off.', minWords: 50, maxWords: 150, checklist: ['Subject line', 'Greeting', 'Reason in one sentence', 'A clear request', 'Sign-off and name'], model: 'Subject: Request to move tomorrow’s meeting to 2pm\n\nDear Mr Eze,\n\nI am writing to ask whether we can move tomorrow’s 10am project meeting to 2pm. I have a client call in the morning that cannot be rescheduled.\n\nCould you let me know if 2pm works for you and the team?\n\nKind regards,\nFunmi Ade\nProject Officer' }
          ]
        }
      ]
    },
    {
      title: 'Tone and etiquette',
      lessons: [
        {
          id: 'email-tone', title: 'Formal or friendly?', minutes: 5,
          cards: [
            { title: 'Match the reader', body: 'Write more formally to senior people, clients and people you do not know. With close colleagues you can be friendlier, but stay professional.' },
            { title: 'Formal style', body: 'Use full words, complete sentences and no slang or emoji.', examples: [{ text: 'I would be grateful if you could review the attached proposal.', good: true }, { text: 'Pls check d proposal asap 🙏', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence is suitable for an email to a new client?', options: ['I would be grateful if you could review the attached proposal.', 'Pls check d proposal asap.', 'Check this out!!', 'Yo, proposal attached lol'], answer: 0, why: 'It is polite, complete and professional.' },
            { type: 'choice', q: 'Which is too casual for an email to your director?', options: ['Hey boss, wassup?', 'Good morning, Mrs Okoro.', 'Dear Mrs Okoro,', 'Thank you for your time.'], answer: 0, why: 'Slang such as “wassup” is not suitable for a senior colleague.' },
            { type: 'error', q: 'Which part is too informal for a formal email?', parts: ['I am writing to', 'follow up on', 'the contract, and I’m', 'awaiting your reply.'], answer: 2, fix: 'the contract, and I am', why: 'In formal emails, write contractions in full: “I am”.' },
            { type: 'choice', q: 'A colleague you work with every day asks for a file. Which reply fits?', options: ['Hi Kemi, here is the file. Let me know if you need anything else. Thanks, Dayo', 'Dear Madam, I write to transmit the requested document. Yours faithfully, Dayo', 'file', 'K'], answer: 0, why: 'Friendly and professional suits a close colleague. The second is too stiff, the last two too short.' }
          ]
        },
        {
          id: 'email-polite', title: 'Polite and concise', minutes: 5,
          cards: [
            { title: 'Soften requests', body: 'Questions sound more polite than commands.', examples: [{ text: 'Could you send me the report by Friday?', good: true }, { text: 'Would you mind sending the report by Friday?', good: true }, { text: 'Send me the report by Friday.', good: false }] },
            { title: 'Say it once, clearly', body: 'Cut words that add nothing. Avoid capital letters for emphasis: they read as shouting. “Please kindly” says “please” twice, and “do the needful” is unclear; say exactly what you need.', examples: [{ text: 'Please confirm your attendance.', good: true }, { text: 'Please kindly do the needful.', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which request is the most polite?', options: ['Could you send me the report by Friday?', 'Send me the report by Friday.', 'SEND THE REPORT.', 'Report. Friday.'], answer: 0, why: 'A question with “could you” is polite and clear.' },
            { type: 'gap', q: 'Would you mind ___ the report before the meeting?', options: ['sending', 'to send', 'send', 'sent'], answer: 0, why: '“Would you mind” is followed by the -ing form: “sending”.' },
            { type: 'choice', q: 'Which is the clearest version?', options: ['Please confirm by Friday whether you can attend.', 'Please kindly do the needful.', 'I am just writing to ask, if possible and if it is not too much trouble, whether you could perhaps confirm.', 'CONFIRM!!!'], answer: 0, why: 'It says exactly what is needed and by when, in few words.' },
            { type: 'error', q: 'Which part should be changed?', parts: ['Please kindly', 'send the signed form', 'to HR', 'by Wednesday.'], answer: 0, fix: 'Please', why: '“Please” and “kindly” mean the same thing here. One is enough.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a polite, concise email asking a colleague, Tunde, to share last month’s sales figures by Wednesday.', minWords: 40, maxWords: 120, checklist: ['Subject line', 'Friendly greeting', 'Polite request with a deadline', 'Thanks and your name'], model: 'Subject: Last month’s sales figures\n\nHi Tunde,\n\nCould you share last month’s sales figures with me by Wednesday? I need them for the quarterly report, which goes to the director on Friday.\n\nThanks for your help.\n\nBest regards,\nNgozi' }
          ]
        }
      ]
    },
    {
      title: 'Real situations',
      lessons: [
        {
          id: 'email-followup', title: 'Requests and follow-ups', minutes: 5,
          cards: [
            { title: 'Following up', body: 'If you have had no reply, follow up politely after a reasonable time. Mention your earlier email, repeat the request briefly, and make it easy to answer.', examples: [{ text: 'I am following up on my email of 2 October about the venue booking. Could you confirm whether the hall is available on 15 October?', good: true }, { text: 'Why have you not replied??', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'Which follow-up is the most professional?', options: ['I am following up on my email of 2 October. Could you confirm whether the hall is available?', 'Why have you ignored me?', 'Hello??? Anyone there?', 'I sent this already. Read it.'], answer: 0, why: 'It is polite, refers to the earlier email and repeats the request.' },
            { type: 'choice', q: 'What should a follow-up email include?', options: ['A reference to your earlier email and the request again', 'A complaint about the reader', 'Only the word “Reminder”', 'Every email you have ever sent'], answer: 0, why: 'The reader can act on it without searching for your first email.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a follow-up email to Mrs Okon, the events manager, about a hall booking request you sent a week ago with no reply.', minWords: 50, maxWords: 140, checklist: ['Subject line', 'Mention your earlier email', 'Repeat the request briefly', 'Polite closing and name'], model: 'Subject: Follow-up: hall booking for 15 October\n\nDear Mrs Okon,\n\nI am following up on my email of 2 October about booking the main hall for our training on 15 October.\n\nCould you confirm whether the hall is available on that date? If it is not, please let me know which dates are free.\n\nThank you for your help.\n\nKind regards,\nSamuel Ade\nTraining Coordinator' }
          ]
        },
        {
          id: 'email-apology', title: 'Apologies and complaints', minutes: 6,
          cards: [
            { title: 'A good apology', body: 'Acknowledge the problem, take responsibility, say how you will fix it, and say what you will do to stop it happening again. Do not blame others.' },
            { title: 'Replying to a complaint', body: 'Thank the customer for telling you, apologise, explain what you are doing and by when, and give a contact for further help.', examples: [{ text: 'Thank you for letting us know about the late delivery. I am sorry for the trouble this caused.', good: true }, { text: 'It is not our fault. The driver was late.', good: false }] }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a reply to a complaint in order.', parts: ['Thank the customer for telling you', 'Apologise for the problem', 'Explain what you are doing to fix it and when', 'Offer a contact for further help', 'Sign-off and name'], why: 'This order calms the reader first and then shows action.' },
            { type: 'choice', q: 'Which sentence takes responsibility?', options: ['I am sorry. I sent the wrong file, and I have attached the correct one.', 'Mistakes happen.', 'The system must have changed the file.', 'You should have checked it.'], answer: 0, why: 'It owns the mistake and fixes it at once.' },
            { type: 'choice', q: 'A customer complains that an order arrived late. What should you avoid?', options: ['Blaming the delivery driver', 'Apologising', 'Saying when the issue will be fixed', 'Thanking them for telling you'], answer: 0, why: 'Blaming others sounds like an excuse. The customer wants the problem solved.' },
            { type: 'write', kind: 'email-formal', subject: true, q: 'A customer, Mr Bello, complains that his order arrived three days late. Write a reply.', minWords: 70, maxWords: 180, checklist: ['Subject line', 'Thank him and apologise', 'Explain what you are doing', 'Offer further help', 'Formal sign-off and name'], model: 'Subject: Your recent order\n\nDear Mr Bello,\n\nThank you for letting us know that your order arrived three days late. I am sorry for the inconvenience this caused.\n\nWe have checked your order and found that it was delayed at our warehouse. We have refunded your delivery fee, and we are reviewing our process to prevent similar delays.\n\nIf you need any further help, please reply to this email or call me on 0800 123 4567.\n\nKind regards,\nAisha Musa\nCustomer Care Team' }
          ]
        }
      ]
    }
  ]
};
