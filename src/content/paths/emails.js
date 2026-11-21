// Work and career: Emails. Practice material written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look for a subject, greeting, closing and length; they cannot judge your message, so compare it with the model email.',
  guide: [
    'Start with the introduction, then the parts of an email, tone and etiquette, everyday situations and finally advanced correspondence.',
    'Every lesson ends with an email to write. Write yours first, then compare with the model.',
    'Use Writing formats for ready-made email layouts.',
    'Finish with the final assessment, then the timed or untimed practice test.',
    'Save useful phrases for requests, apologies and follow-ups to your notebook.'
  ],
  improve: [
    'Write the subject line last, once you know exactly what the email asks.',
    'Put your main point or request in the first two sentences.',
    'Read every email once as the receiver before you press Send.',
    'Keep a personal phrase bank: openings, requests, follow-ups, apologies and closings.',
    'For important emails, wait ten minutes and reread before sending, especially when you are upset.',
    'Notice how senior colleagues write and borrow the phrases that work.'
  ],
  units: [
    {
      title: 'Email basics',
      lessons: [
        {
          id: 'email-intro', title: 'Why email skills matter', minutes: 5, kind: 'intro',
          cards: [
            { title: 'What a good email does', body: 'It gets the right action from the right person quickly. A good email is clear about its purpose, polite, short enough to read on a phone and easy to reply to.' },
            { title: 'Where you will use it', body: 'Applying for jobs and internships, writing to teachers and universities, arranging meetings, working with clients, and solving problems with companies.' },
            { title: 'This course, basic to advanced', body: 'Parts of an email, tone and etiquette, requests and follow-ups, apologies and complaints, bad news, writing to senior people and clients, applications, internal and external emails, and difficult correspondence.' },
            { title: 'Common mistakes', body: 'No subject line, a greeting that does not fit the reader, the request hidden at the bottom, and emails written like text messages.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the main goal of a work email?', options: ['To get the right action from the reader quickly', 'To be as long as possible', 'To show off vocabulary', 'To use emojis'], answer: 0, why: 'Clarity and action are what matter.' },
            { type: 'choice', q: 'Where should your main request usually go?', options: ['Near the start', 'At the very bottom', 'In the attachment only', 'In the signature'], answer: 0, why: 'Busy readers may not read to the end.' },
            { type: 'choice', q: 'Which email is most likely to get a quick reply?', options: ['One with a clear subject line and a specific question', 'One with no subject line', 'One with five unrelated topics', 'One written in capital letters'], answer: 0, why: 'Clear, focused emails are easy to answer.' },
            { type: 'choice', q: 'Which is a text message habit to avoid in work emails?', options: ['“pls send asap thx”', '“Could you please send it by Friday?”', '“Thank you for your help.”', '“Best regards,”'], answer: 0, why: 'Abbreviations look careless in professional email.' },
            { type: 'choice', q: 'Which email will a busy reader understand fastest?', options: ['One that states its purpose in the first sentence', 'One that starts with a long story', 'One with no greeting or subject', 'One that hides the request in the last line'], answer: 0, why: 'Purpose first saves the reader time.' }
          ]
        },
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
            { type: 'order', q: 'Put the parts of an email in order.', parts: ['Subject line', 'Greeting', 'Purpose of the email', 'Details', 'Closing line or request', 'Sign-off and your name'], why: 'This order lets the reader understand the email quickly.' },
            { type: 'choice', q: 'Which greeting suits an email to someone whose name you do not know?', options: ['Dear Sir or Madam,', 'Hey you,', 'Hi dear,', 'Yo,'], answer: 0, why: 'It is the standard formal greeting for an unknown reader.' }
          ]
        },
        {
          id: 'email-end', title: 'Closing and sign-off', minutes: 5,
          cards: [
            { title: 'Ask for what you need', body: 'End the message with a clear next step, so the reader knows what to do.', examples: [{ text: 'Could you let me know by Thursday?', good: true }, { text: 'Please find the report attached.', good: true }] },
            { title: 'Sign off to match the greeting', body: 'Formal: “Kind regards,” or “Yours sincerely,”. Friendly but professional: “Best regards,” or “Thanks,”. Add your full name, and your role if the reader may not know you.' },
            { title: 'Common mistakes', body: 'No sign-off, a sign-off that does not match the greeting (“Dear Sir… Cheers!”), and no clear next step.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which closing line gives a clear next step?', options: ['Could you send me the figures by Thursday?', 'Anyway, that is all.', 'Whatever works.', 'Bye.'], answer: 0, why: 'It says exactly what is needed and when.' },
            { type: 'choice', q: 'Which sign-off fits an email to a client?', options: ['Kind regards,', 'Later,', 'Love,', 'XOXO'], answer: 0, why: '“Kind regards,” is polite and professional.' },
            { type: 'error', q: 'Which part is wrong for a professional email?', parts: ['Please find', 'the invoice attached.', 'Thx,', 'Ada Obi, Accounts'], answer: 2, fix: 'Thanks, or Kind regards,', why: '“Thx” is too casual for professional email.' },
            { type: 'write', kind: 'email', subject: true, q: 'Email your team leader asking to move tomorrow’s 10am meeting to 2pm. Include a subject line, greeting, reason, request and sign-off.', minWords: 50, maxWords: 150, checklist: ['Subject line', 'Greeting', 'Reason in one sentence', 'A clear request', 'Sign-off and name'], model: 'Subject: Request to move tomorrow’s meeting to 2pm\n\nDear Mr Eze,\n\nI am writing to ask whether we can move tomorrow’s 10am project meeting to 2pm. I have a client call in the morning that cannot be rescheduled.\n\nCould you let me know if 2pm works for you and the team?\n\nKind regards,\nFunmi Ade\nProject Officer' },
            { type: 'choice', q: 'Which closing line asks for action clearly?', options: ['Could you confirm by Thursday whether the date works?', 'Bye.', 'That is all.', 'Whatever works.'], answer: 0, why: 'It states the action and deadline.' }
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
            { title: 'Formal style', body: 'Use full words, complete sentences and no slang or emoji.', examples: [{ text: 'I would be grateful if you could review the attached proposal.', good: true }, { text: 'Pls check d proposal asap 🙏', good: false }] },
            { title: 'Common mistakes', body: 'Writing to a manager like a friend, writing to a friend like a lawyer, capital letters (they look like shouting) and sarcasm, which rarely works in writing.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence is suitable for an email to a new client?', options: ['I would be grateful if you could review the attached proposal.', 'Pls check d proposal asap.', 'Check this out!!', 'Yo, proposal attached lol'], answer: 0, why: 'It is polite, complete and professional.' },
            { type: 'choice', q: 'Which is too casual for an email to your director?', options: ['Hey boss, wassup?', 'Good morning, Mrs Okoro.', 'Dear Mrs Okoro,', 'Thank you for your time.'], answer: 0, why: 'Slang such as “wassup” is not suitable for a senior colleague.' },
            { type: 'error', q: 'Which part is too informal for a formal email?', parts: ['I am writing to', 'follow up on', 'the contract, and I’m', 'awaiting your reply.'], answer: 2, fix: 'the contract, and I am', why: 'In formal emails, write contractions in full: “I am”.' },
            { type: 'choice', q: 'A colleague you work with every day asks for a file. Which reply fits?', options: ['Hi Kemi, here is the file. Let me know if you need anything else. Thanks, Dayo', 'Dear Madam, I write to transmit the requested document. Yours faithfully, Dayo', 'file', 'K'], answer: 0, why: 'Friendly and professional suits a close colleague. The second is too stiff, the last two too short.' },
            { type: 'choice', q: 'What do capital letters suggest in an email?', options: ['Shouting', 'Politeness', 'Formality', 'Kindness'], answer: 0, why: 'ALL CAPS reads as anger.' }
          ]
        },
        {
          id: 'email-polite', title: 'Polite and concise', minutes: 5,
          cards: [
            { title: 'Soften requests', body: 'Questions sound more polite than commands.', examples: [{ text: 'Could you send me the report by Friday?', good: true }, { text: 'Would you mind sending the report by Friday?', good: true }, { text: 'Send me the report by Friday.', good: false }] },
            { title: 'Say it once, clearly', body: 'Cut words that add nothing. Avoid capital letters for emphasis: they read as shouting. “Please kindly” says “please” twice, and “do the needful” is unclear; say exactly what you need.', examples: [{ text: 'Please confirm your attendance.', good: true }, { text: 'Please kindly do the needful.', good: false }] },
            { title: 'Common mistakes', body: 'Commands without “please”, long apologies for asking, and three paragraphs where one sentence would do.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which request is the most polite?', options: ['Could you send me the report by Friday?', 'Send me the report by Friday.', 'SEND THE REPORT.', 'Report. Friday.'], answer: 0, why: 'A question with “could you” is polite and clear.' },
            { type: 'gap', q: 'Would you mind ___ the report before the meeting?', options: ['sending', 'to send', 'send', 'sent'], answer: 0, why: '“Would you mind” is followed by the -ing form: “sending”.' },
            { type: 'choice', q: 'Which is the clearest version?', options: ['Please confirm by Friday whether you can attend.', 'Please kindly do the needful.', 'I am just writing to ask, if possible and if it is not too much trouble, whether you could perhaps confirm.', 'CONFIRM!!!'], answer: 0, why: 'It says exactly what is needed and by when, in few words.' },
            { type: 'error', q: 'Which part should be changed?', parts: ['Please kindly', 'send the signed form', 'to HR', 'by Wednesday.'], answer: 0, fix: 'Please', why: '“Please” and “kindly” mean the same thing here. One is enough.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a polite, concise email asking a colleague, Tunde, to share last month’s sales figures by Wednesday.', minWords: 40, maxWords: 120, checklist: ['Subject line', 'Friendly greeting', 'Polite request with a deadline', 'Thanks and your name'], model: 'Subject: Last month’s sales figures\n\nHi Tunde,\n\nCould you share last month’s sales figures with me by Wednesday? I need them for the quarterly report, which goes to the director on Friday.\n\nThanks for your help.\n\nBest regards,\nNgozi' }
          ]
        },
        {
          id: 'email-etiquette', title: 'Etiquette: Cc, Bcc, Reply all and attachments', minutes: 6,
          cards: [
            { title: 'To, Cc and Bcc', body: 'To: people who must act. Cc (copy): people who need to know but not act. Bcc (blind copy): hidden recipients, useful for large mailing lists so addresses stay private.' },
            { title: 'Reply or Reply all?', body: 'Use Reply all only when everyone on the thread needs your answer. “Thanks!” to 50 people wastes 50 people’s time.' },
            { title: 'Attachments and response times', body: 'Mention attachments in the email (“I have attached the report”), name files clearly, and check they are attached. Reply to work emails within one working day, even if only to say when you will answer fully.', examples: [{ text: 'Attached: March_sales_report.pdf', good: true }, { text: 'Attached: scan0001.pdf', good: false }] },
            { title: 'Common mistakes', body: 'Forgetting the attachment, Reply all for a personal message, putting everyone in To, and showing a long list of private addresses instead of using Bcc.' }
          ],
          exercises: [
            { type: 'choice', q: 'Your manager should know about a decision but does not need to act. Where do you put them?', options: ['Cc', 'To', 'Bcc', 'Nowhere'], answer: 0, why: 'Cc is for people who need to be informed.' },
            { type: 'choice', q: 'You are emailing 200 parents. How should you add them?', options: ['Bcc, so their addresses stay private', 'To, so everyone sees everyone', 'Cc', 'One email each by hand'], answer: 0, why: 'Bcc protects people’s privacy.' },
            { type: 'choice', q: 'Someone asks the whole team a question that only you can answer. What do you do?', options: ['Reply to the sender (and Cc only those who need it)', 'Reply all with a long message', 'Ignore it', 'Forward it to a friend'], answer: 0, why: 'Only people who need the reply should get it.' },
            { type: 'choice', q: 'Which file name is best?', options: ['Budget_2026_draft.xlsx', 'Document1.xlsx', 'final final new.xlsx', 'asdf.xlsx'], answer: 0, why: 'Clear names help the reader find and use files.' },
            { type: 'gap', q: 'Please find the agenda ___.', options: ['attached', 'attach', 'attaching', 'attachment'], answer: 0, why: '“Please find the agenda attached” is the standard phrase.' },
            { type: 'choice', q: 'You cannot answer fully today. What should you do?', options: ['Reply briefly to say when you will answer', 'Wait a week silently', 'Never reply', 'Reply all asking for help'], answer: 0, why: 'A short holding reply shows respect for the sender.' }
          ]
        }
      ]
    },
    {
      title: 'Everyday situations',
      lessons: [
        {
          id: 'email-followup', title: 'Requests and follow-ups', minutes: 5,
          cards: [
            { title: 'Following up', body: 'If you have had no reply, follow up politely after a reasonable time. Mention your earlier email, repeat the request briefly, and make it easy to answer.', examples: [{ text: 'I am following up on my email of 2 October about the venue booking. Could you confirm whether the hall is available on 15 October?', good: true }, { text: 'Why have you not replied??', good: false }] },
            { title: 'Making a request', body: 'Say what you need, why, and by when. One request per email, if possible.', examples: [{ text: 'Could you send the signed form by Wednesday, so I can submit it on Thursday?', good: true }] },
            { title: 'Common mistakes', body: 'Following up too soon or too often, sounding accusing, and not repeating the original request so the reader has to search for it.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which follow-up is the most professional?', options: ['I am following up on my email of 2 October. Could you confirm whether the hall is available?', 'Why have you ignored me?', 'Hello??? Anyone there?', 'I sent this already. Read it.'], answer: 0, why: 'It is polite, refers to the earlier email and repeats the request.' },
            { type: 'choice', q: 'What should a follow-up email include?', options: ['A reference to your earlier email and the request again', 'A complaint about the reader', 'Only the word “Reminder”', 'Every email you have ever sent'], answer: 0, why: 'The reader can act on it without searching for your first email.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a follow-up email to Mrs Okon, the events manager, about a hall booking request you sent a week ago with no reply.', minWords: 50, maxWords: 140, checklist: ['Subject line', 'Mention your earlier email', 'Repeat the request briefly', 'Polite closing and name'], model: 'Subject: Follow-up: hall booking for 15 October\n\nDear Mrs Okon,\n\nI am following up on my email of 2 October about booking the main hall for our training on 15 October.\n\nCould you confirm whether the hall is available on that date? If it is not, please let me know which dates are free.\n\nThank you for your help.\n\nKind regards,\nSamuel Ade\nTraining Coordinator' },
            { type: 'choice', q: 'How long should you usually wait before following up on a non-urgent email?', options: ['A few working days', 'Ten minutes', 'Six months', 'Never follow up'], answer: 0, why: 'Give people reasonable time to reply.' },
            { type: 'gap', q: 'I am writing to ___ up on my request of 4 March.', options: ['follow', 'following', 'followed', 'follows'], answer: 0, why: '“Follow up” is the phrasal verb.' }
          ]
        },
        {
          id: 'email-apology', title: 'Apologies and complaints', minutes: 6,
          cards: [
            { title: 'A good apology', body: 'Acknowledge the problem, take responsibility, say how you will fix it, and say what you will do to stop it happening again. Do not blame others.' },
            { title: 'Replying to a complaint', body: 'Thank the customer for telling you, apologise, explain what you are doing and by when, and give a contact for further help.', examples: [{ text: 'Thank you for letting us know about the late delivery. I am sorry for the trouble this caused.', good: true }, { text: 'It is not our fault. The driver was late.', good: false }] },
            { title: 'Common mistakes', body: 'Apologising without a solution, blaming the customer, and copying a template that does not mention their actual problem.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a reply to a complaint in order.', parts: ['Thank the customer for telling you', 'Apologise for the problem', 'Explain what you are doing to fix it and when', 'Offer a contact for further help', 'Sign-off and name'], why: 'This order calms the reader first and then shows action.' },
            { type: 'choice', q: 'Which sentence takes responsibility?', options: ['I am sorry. I sent the wrong file, and I have attached the correct one.', 'Mistakes happen.', 'The system must have changed the file.', 'You should have checked it.'], answer: 0, why: 'It owns the mistake and fixes it at once.' },
            { type: 'choice', q: 'A customer complains that an order arrived late. What should you avoid?', options: ['Blaming the delivery driver', 'Apologising', 'Saying when the issue will be fixed', 'Thanking them for telling you'], answer: 0, why: 'Blaming others sounds like an excuse. The customer wants the problem solved.' },
            { type: 'write', kind: 'email-formal', subject: true, q: 'A customer, Mr Bello, complains that his order arrived three days late. Write a reply.', minWords: 70, maxWords: 180, checklist: ['Subject line', 'Thank him and apologise', 'Explain what you are doing', 'Offer further help', 'Formal sign-off and name'], model: 'Subject: Your recent order\n\nDear Mr Bello,\n\nThank you for letting us know that your order arrived three days late. I am sorry for the inconvenience this caused.\n\nWe have checked your order and found that it was delayed at our warehouse. We have refunded your delivery fee, and we are reviewing our process to prevent similar delays.\n\nIf you need any further help, please reply to this email or call me on 0800 123 4567.\n\nKind regards,\nAisha Musa\nCustomer Care Team' },
            { type: 'choice', q: 'Which apology sentence is best?', options: ['I am sorry that your order arrived damaged; we will send a replacement today.', 'Sorry for any inconvenience caused, if any.', 'This is not our fault.', 'Things happen.'], answer: 0, why: 'It is specific and offers a solution.' }
          ]
        },
        {
          id: 'email-badnews', title: 'Declining and delivering bad news', minutes: 6,
          cards: [
            { title: 'A kind structure', body: 'Thank or acknowledge, give the news clearly, explain briefly, offer an alternative if you can, and end positively.', examples: [{ text: 'Thank you for inviting me to speak. Unfortunately, I am travelling that week, so I cannot attend. However, my colleague Ruth would be happy to speak instead.', good: true }] },
            { title: 'Softening language', body: '“Unfortunately,…”, “I am afraid that…”, “I regret to inform you that…”, “On this occasion,…”. Be kind, but do not hide the message.' },
            { title: 'Real-life use', body: 'Declining invitations, turning down job applicants, telling a client a deadline will move, and refusing requests from colleagues.' },
            { title: 'Common mistakes', body: 'Being so vague the reader does not understand the answer, long excuses, blaming others, and no alternative or next step.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence delivers bad news best?', options: ['Unfortunately, the order will arrive on 12 May instead of 5 May because of a supplier delay.', 'Things happened.', 'It is not our fault, the supplier is useless.', 'Your order might maybe be late, possibly.'], answer: 0, why: 'It is clear, specific and gives a brief reason.' },
            { type: 'gap', q: 'I am ___ that we cannot offer you a place this year.', options: ['afraid', 'scared', 'frightened', 'happy'], answer: 0, why: '“I am afraid that…” softens bad news politely.' },
            { type: 'choice', q: 'What should you add after declining, if you can?', options: ['An alternative or next step', 'A complaint', 'A long excuse', 'Nothing at all'], answer: 0, why: 'An alternative keeps the relationship positive.' },
            { type: 'error', q: 'Find the weak part.', parts: ['Thank you for your proposal.', 'Unfortunately, we cannot accept it', 'because my boss is difficult.', 'We hope to work with you in future.'], answer: 2, fix: 'as it is above our budget for this year.', why: 'Do not blame people; give a professional reason.' },
            { type: 'order', q: 'Put a decline email in order.', parts: ['Thank the sender', 'Give the news clearly', 'Explain briefly', 'Offer an alternative', 'End positively'], why: 'This structure is clear and kind.' },
            { type: 'write', kind: 'email', subject: true, q: 'Decline an invitation from a colleague, Mr Ade, to speak at a staff training day on Friday. Suggest an alternative.', minWords: 50, maxWords: 170, checklist: ['Subject line', 'Thanks first', 'A clear decline with a short reason', 'An alternative', 'A positive ending'], model: 'Subject: Staff training day on Friday\n\nDear Mr Ade,\n\nThank you for inviting me to speak at the staff training day. Unfortunately, I will be visiting our Kano office on Friday, so I cannot attend.\n\nHowever, my colleague Ruth Okoro knows the new system well, and she would be happy to give the session. Alternatively, I could share my slides with you.\n\nI hope the day goes well.\n\nBest regards,\nFunmi' }
          ]
        }
      ]
    },
    {
      title: 'Professional correspondence',
      lessons: [
        {
          id: 'email-senior', title: 'Writing to senior people and clients', minutes: 6,
          cards: [
            { title: 'Respect their time', body: 'Start with the point, keep it short, and make any decision easy: give options and a recommendation.', examples: [{ text: 'Could you approve one of these two venues by Thursday? I recommend option A because it is cheaper.', good: true }] },
            { title: 'Formal but warm', body: 'Use “Dear Dr Musa” or “Dear Mrs Bello” until they sign with their first name. Avoid slang, jokes and emojis with people you do not know well.' },
            { title: 'Clients', body: 'Be helpful and specific, confirm what you will do and by when, and never promise what you cannot deliver.' },
            { title: 'Common mistakes', body: 'Long background before the point, asking open questions (“What do you think?”) with no options, overfamiliar greetings (“Hey boss”), and making promises without checking.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening suits an email to your director?', options: ['Dear Dr Musa,', 'Hey boss!', 'Yo,', 'Hiya Musa'], answer: 0, why: 'Use a title and surname until invited otherwise.' },
            { type: 'choice', q: 'Which question is easiest for a busy manager to answer?', options: ['Shall we choose venue A (₦200,000) or venue B (₦350,000)? I recommend A.', 'What do you think about venues?', 'Any thoughts?', 'Venues?'], answer: 0, why: 'Options and a recommendation make the decision quick.' },
            { type: 'choice', q: 'A client asks for delivery in two days, but it takes five. What do you write?', options: ['We can deliver in five working days, by Friday 14 June.', 'Sure, two days, no problem!', 'Maybe, we will see.', 'Ignore the deadline.'], answer: 0, why: 'Be honest and specific; never overpromise.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['Dear Mrs Bello,', 'Thanks a mil for the order 😂😂', 'We will deliver it on Monday.', 'Kind regards,'], answer: 1, fix: 'Thank you for your order.', why: 'Emojis and slang do not suit client emails.' },
            { type: 'gap', q: 'I would ___ your approval by Thursday, if possible.', options: ['appreciate', 'appreciating', 'appreciation', 'appreciated'], answer: 0, why: '“I would appreciate…” is polite and direct.' },
            { type: 'write', kind: 'email', subject: true, q: 'Email your manager, Mrs Danjuma, asking her to choose between two dates for the team training: 10 or 17 July. Recommend one.', minWords: 50, maxWords: 170, checklist: ['Subject line', 'The decision needed, at the start', 'Two clear options', 'Your recommendation with a reason', 'A deadline'], model: 'Subject: Please choose a date for team training\n\nDear Mrs Danjuma,\n\nCould you choose a date for the team training by Friday?\n\nThe two options are Thursday 10 July or Thursday 17 July. I recommend 10 July, because three team members are on leave the following week.\n\nOnce you decide, I will book the room and send invitations.\n\nKind regards,\nYusuf' }
          ]
        },
        {
          id: 'email-application', title: 'Job applications and cover emails', minutes: 7,
          cards: [
            { title: 'The cover email', body: 'When you send a CV by email, the email itself is your cover letter. Subject: the job title and your name. Body: the role, two or three strengths with evidence, and a polite close.' },
            { title: 'Show, do not claim', body: 'Back each strength with a fact.', examples: [{ text: 'I managed the school shop, increasing monthly sales by 20%.', good: true }, { text: 'I am very hardworking and dedicated.', good: false }] },
            { title: 'Professional details', body: 'Use a professional email address (firstname.lastname@…), name the attachment clearly (Ada_Okafor_CV.pdf) and check the recruiter’s name and the company name.' },
            { title: 'Common mistakes', body: 'An empty email with only an attachment, a casual address (coolbabe99@…), the wrong company name, and copying the same email for every job.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which subject line is best for a job application?', options: ['Application for Sales Assistant: Ada Okafor', 'Job', 'Hello', 'Please read'], answer: 0, why: 'It says what the email is and who it is from.' },
            { type: 'choice', q: 'Which email address is most professional?', options: ['ada.okafor@gmail.com', 'princessada4life@gmail.com', 'xXadaXx@gmail.com', 'iamthebest@gmail.com'], answer: 0, why: 'A name-based address looks professional.' },
            { type: 'choice', q: 'Which sentence shows a strength with evidence?', options: ['I trained five new volunteers at the community library.', 'I am the best worker you will find.', 'I am a people person.', 'I can do everything.'], answer: 0, why: 'A specific fact proves the skill.' },
            { type: 'error', q: 'Find the mistake.', parts: ['Dear Ms Lawal,', 'I am applying for the role of cashier at FreshMart.', 'I have attached my CV.', 'I look forward to joining CityMart.'], answer: 3, fix: 'I look forward to hearing from you.', why: 'Naming the wrong company shows a copied email.' },
            { type: 'choice', q: 'What should the CV file be called?', options: ['Ada_Okafor_CV.pdf', 'CV final final.pdf', 'Document3.pdf', 'scan.pdf'], answer: 0, why: 'A clear name helps the recruiter.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a cover email applying for an internship as a marketing assistant at Bright Media. Mention that your CV is attached.', minWords: 50, maxWords: 170, checklist: ['Subject line with the role and your name', 'The role in the first line', 'Two strengths with evidence', 'The attachment mentioned', 'A polite close'], model: 'Subject: Application for Marketing Intern: Ada Okafor\n\nDear Ms Lawal,\n\nI am writing to apply for the marketing internship at Bright Media, which I saw on your website.\n\nI am a second-year business student at the University of Lagos. Last year, I ran social media for our student union and grew its Instagram following from 800 to 3,000. In addition, I designed posters for three campus events.\n\nI have attached my CV. I would welcome the chance to discuss how I could support your team.\n\nKind regards,\nAda Okafor\n0803 000 0000' }
          ]
        },
        {
          id: 'email-internal', title: 'Internal and external emails', minutes: 6,
          cards: [
            { title: 'Internal emails', body: 'To colleagues in your organisation. Usually shorter and less formal (“Hi Tunde,”), but still clear and polite. Announcements to many people need a clear subject and the key facts first.' },
            { title: 'External emails', body: 'To clients, suppliers and the public. More formal, more careful: they represent your organisation, and they can be forwarded to anyone.' },
            { title: 'Announcements', body: 'Who, what, when, where, and what readers must do. Bullet points help.', examples: [{ text: 'What: fire drill. When: Tuesday 10am. Action: leave by the nearest exit and meet in the car park.', good: true }] },
            { title: 'Common mistakes', body: 'Sharing internal gossip or confidential information externally, using internal jargon with clients, and announcements that bury the date or action.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which greeting suits an email to a teammate you work with daily?', options: ['Hi Tunde,', 'Dear Sir or Madam,', 'To whom it may concern,', 'Esteemed colleague,'], answer: 0, why: 'Internal emails to familiar colleagues can be friendly.' },
            { type: 'choice', q: 'Why should external emails be especially careful?', options: ['They represent your organisation and can be forwarded', 'They are never read', 'They must be long', 'They need emojis'], answer: 0, why: 'External readers judge the whole organisation.' },
            { type: 'choice', q: 'What should an announcement email put first?', options: ['The key facts and the action needed', 'A long history of the topic', 'A joke', 'Your signature'], answer: 0, why: 'Readers need to know what to do.' },
            { type: 'error', q: 'Which part should not go to a client?', parts: ['Thank you for your order.', 'It will ship on Monday.', 'Between us, our warehouse is a mess.', 'Kind regards,'], answer: 2, fix: 'Remove it.', why: 'Internal problems and gossip should never go to clients.' },
            { type: 'choice', q: 'A client does not know your team’s abbreviations. What should you do?', options: ['Write terms in full', 'Use even more abbreviations', 'Ignore it', 'Add a glossary of 50 terms'], answer: 0, why: 'Clear language avoids confusion.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write an internal email announcing a fire drill on Tuesday at 10am. Say what staff must do.', minWords: 50, maxWords: 170, checklist: ['Clear subject line', 'What, when and where', 'The action staff must take', 'Short and easy to scan'], model: 'Subject: Fire drill on Tuesday at 10am\n\nHi everyone,\n\nWe will hold a fire drill on Tuesday 3 June at 10am. It will last about 15 minutes.\n\nWhen the alarm sounds, please stop work, leave by the nearest exit and meet in the front car park. Do not use the lifts. Floor wardens will check that everyone is out.\n\nThank you for your cooperation.\n\nBest regards,\nGrace\nFacilities Team' }
          ]
        },
        {
          id: 'email-advanced', title: 'Difficult emails: chasing, negotiating, escalating', minutes: 7,
          cards: [
            { title: 'Chasing politely', body: 'Remind, do not accuse. Refer to your earlier email, restate the request and the deadline, and make it easy to reply.', examples: [{ text: 'I am following up on my email of 3 May about the invoice. Could you confirm when payment will be made?', good: true }, { text: 'Why have you ignored me?', good: false }] },
            { title: 'Negotiating', body: 'Acknowledge their position, state yours with a reason, and propose a middle way: “I understand the budget is tight. Could we agree on ₦400,000, with delivery in two stages?”' },
            { title: 'Escalating', body: 'If repeated requests fail, write to a more senior person. Stay factual: what you asked, when, what happened, what you need now. Tell the original person you are doing so.' },
            { title: 'Common mistakes', body: 'Emotional language, writing when angry, threats, and escalating before giving people a fair chance to reply.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which follow-up is best?', options: ['I am following up on my email of 3 May. Could you confirm the delivery date?', 'Why are you ignoring me?!', 'Hello??? Anyone there?', 'I will report you.'], answer: 0, why: 'It is polite, specific and easy to answer.' },
            { type: 'choice', q: 'What is a good negotiation move?', options: ['Acknowledge their view and propose a middle way', 'Refuse to discuss', 'Insult their offer', 'Agree to everything'], answer: 0, why: 'Finding middle ground keeps relationships strong.' },
            { type: 'choice', q: 'When should you escalate an issue?', options: ['After repeated polite requests have failed', 'Immediately, before asking anyone', 'Never', 'When you are angry'], answer: 0, why: 'Give people a fair chance first.' },
            { type: 'gap', q: 'I understand your concerns. ___, could we consider a shorter contract?', options: ['However', 'Because', 'Firstly', 'For example'], answer: 0, why: '“However” introduces your counter-proposal after acknowledging theirs.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['Dear Mr Obi,', 'I have emailed three times about the refund.', 'Your company is a scam.', 'Could you confirm the payment date?'], answer: 2, fix: 'I still have not received a reply.', why: 'Accusations make a reply less likely. Stick to facts.' },
            { type: 'write', kind: 'email-formal', subject: true, q: 'Your supplier has not replied to two emails about a late delivery. Write a polite but firm follow-up to the account manager, Mr Obi.', minWords: 50, maxWords: 170, checklist: ['Subject line', 'Refer to the earlier emails', 'State the problem and its effect', 'A clear request and deadline', 'A polite, firm tone'], model: 'Subject: Follow-up: late delivery for order 2241\n\nDear Mr Obi,\n\nI am following up on my emails of 2 and 6 May about order 2241, which was due on 30 April.\n\nThe delay is now affecting our production schedule, and we have had to pause one line.\n\nCould you please confirm a delivery date by Friday 10 May? If the order cannot be delivered this month, please let me know, so that we can make other arrangements.\n\nKind regards,\nHalima Yusuf\nPurchasing Manager' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'email-final', title: 'Final assessment: Emails', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '14 questions from the whole course: the parts of an email, tone, etiquette, requests, apologies, bad news, senior readers, applications and difficult emails. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which subject line is best?', options: ['Request: move Friday’s meeting to 2pm', 'Hi', 'Important!!!', 'Meeting'], answer: 0, why: 'It says exactly what the email is about.' },
            { type: 'choice', q: 'Where should your main request go?', options: ['Near the start', 'In the signature', 'At the very end only', 'In the attachment'], answer: 0, why: 'Readers see it immediately.' },
            { type: 'choice', q: 'Which sign-off suits “Dear Mrs Okon,”?', options: ['Kind regards,', 'Cheers mate,', 'Love,', 'Later,'], answer: 0, why: 'It is polite and professional.' },
            { type: 'choice', q: 'Who goes in Cc?', options: ['People who need to know but not act', 'People who must act', 'Hidden recipients', 'Nobody'], answer: 0, why: 'Cc is for information.' },
            { type: 'choice', q: 'When should you use Bcc?', options: ['For a large list, to keep addresses private', 'For your manager', 'Never', 'For attachments'], answer: 0, why: 'Bcc protects privacy.' },
            { type: 'gap', q: 'Could you ___ send the report by Friday?', options: ['please', 'pleased', 'pleasing', 'pleasant'], answer: 0, why: '“Could you please…” is a polite request.' },
            { type: 'choice', q: 'Which follow-up is best?', options: ['I am following up on my email of 2 May about the booking.', 'Why haven’t you answered?!', 'Hello???', 'Reply now.'], answer: 0, why: 'Polite and specific.' },
            { type: 'choice', q: 'What should a good apology include?', options: ['An apology, a short explanation and a solution', 'Excuses only', 'Blame', 'Nothing specific'], answer: 0, why: 'Apologise, explain, fix.' },
            { type: 'gap', q: 'I am ___ that we cannot accept your proposal this year.', options: ['afraid', 'frightened', 'scaring', 'fear'], answer: 0, why: '“I am afraid that…” softens bad news.' },
            { type: 'choice', q: 'Which question suits a busy director?', options: ['Shall we choose option A or B? I recommend A.', 'Thoughts?', 'What should we do about everything?', 'Any ideas at all?'], answer: 0, why: 'Options and a recommendation save time.' },
            { type: 'choice', q: 'Which email address suits a job application?', options: ['tunde.bello@gmail.com', 'tundeswagz@gmail.com', 'bigboss007@gmail.com', 'lovelytunde@gmail.com'], answer: 0, why: 'Name-based addresses look professional.' },
            { type: 'error', q: 'Find the mistake.', parts: ['Please find attached', 'the report.', 'Let me know', 'if you have any question.'], answer: 3, fix: 'if you have any questions.', why: '“Any questions” takes the plural.' },
            { type: 'choice', q: 'When should you escalate a problem?', options: ['After polite requests have failed', 'At once', 'When angry', 'Never'], answer: 0, why: 'Give people a fair chance first.' },
            { type: 'order', q: 'Put the email parts in order.', parts: ['Subject line', 'Greeting', 'Purpose', 'Details', 'Sign-off'], why: 'The standard email order.' }
          ]
        }
      ]
    }
  ]
};
