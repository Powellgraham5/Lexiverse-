// Work and career: Interviews. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. Mock interview questions are timed and self-checked; nothing is recorded.',
  guide: [
    'Start with the introduction, then prepare, learn to answer every kind of question, and finish with two mock interviews.',
    'Speak every practice answer aloud with the timer, then tick the checklist honestly.',
    'Write your own STAR stories as you go and save them to your notebook.',
    'Finish with the final assessment, then the timed or untimed practice test.',
    'Before a real interview, repeat the mock interview lessons the day before.'
  ],
  improve: [
    'Prepare five STAR stories that show different skills: teamwork, leadership, problem solving, a mistake, a success.',
    'Record yourself answering “Tell me about yourself” and cut it to under 90 seconds.',
    'Research every organisation: what it does, its recent news and its values.',
    'Prepare two thoughtful questions to ask at the end of every interview.',
    'Practise with a friend acting as a strict interviewer, then swap roles.',
    'After each real interview, write down the questions you were asked and how you could improve.'
  ],
  units: [
    {
      title: 'Introduction to interviews',
      lessons: [
        {
          id: 'interview-intro', title: 'What interviewers are looking for', minutes: 5, kind: 'intro',
          cards: [
            { title: 'Three questions behind every interview', body: 'Can you do the job (skills and experience)? Will you do the job (motivation)? Will you fit in (attitude and teamwork)? Every question you are asked links to one of these.' },
            { title: 'Where you will use these skills', body: 'Job and internship interviews, university and scholarship interviews, promotions, school prefect selections and volunteering roles.' },
            { title: 'What this course covers', body: 'Research, matching your CV to the job, interview formats, introducing yourself, STAR answers, common and difficult questions, questions to ask, body language, video interviews, after the interview, and two mock interviews.' },
            { title: 'Common mistakes', body: 'Not researching the organisation, memorising answers word for word, speaking negatively about past employers or teachers, and having no questions at the end.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which three things do interviewers want to know?', options: ['Can you do it, will you do it, will you fit in?', 'Your age, height and weight', 'Your favourite food, film and colour', 'Nothing in particular'], answer: 0, why: 'Skills, motivation and fit drive every question.' },
            { type: 'choice', q: '“Why do you want this job?” tests which area?', options: ['Motivation', 'Height', 'Spelling', 'Typing speed'], answer: 0, why: 'It shows whether you will commit to the role.' },
            { type: 'choice', q: 'Which habit hurts you in an interview?', options: ['Criticising your previous employer', 'Researching the company', 'Preparing examples', 'Asking a thoughtful question'], answer: 0, why: 'Negativity makes interviewers worry about your attitude.' },
            { type: 'choice', q: 'Where might you use interview skills outside work?', options: ['A scholarship interview', 'Buying bread', 'Watching TV', 'Sleeping'], answer: 0, why: 'Scholarship panels ask very similar questions.' },
            { type: 'order', q: 'Put interview preparation in order.', parts: ['Read the job description', 'Research the organisation', 'Prepare examples for each requirement', 'Practise aloud'], why: 'Understand, research, prepare, practise.' }
          ]
        }
      ]
    },
    {
      title: 'Getting ready',
      lessons: [
        {
          id: 'interview-prepare', title: 'Research and introducing yourself', minutes: 6,
          cards: [
            { title: 'Research', body: 'Read about the organisation: what it does, its customers, recent news and its values. Read the job description and list the skills it asks for. Prepare an example for each.' },
            { title: 'Interview formats', body: 'Face to face, by phone, by video call, panel interviews with several interviewers, and group assessments. For video calls, test your camera and sound, choose a quiet, tidy space, and look at the camera when you speak.' },
            { title: '“Tell me about yourself”', body: 'Answer in about a minute: who you are now (study or work), one or two achievements related to the job, and why you want this role. It is not your life story.', examples: [{ text: 'I’m a final-year accounting student at UNILAG. Last year I managed the finances for our student union’s ₦2 million budget, and I want to bring that experience to your audit team.', good: true }, { text: 'I was born in 2002 in Ibadan, I have four siblings…', good: false }] },
            { title: 'Common mistakes', body: 'Knowing nothing about the organisation, a “Tell me about yourself” answer that starts with your childhood, and arriving without a copy of your CV.' }
          ],
          exercises: [
            { type: 'choice', q: 'What is the best way to prepare for an interview?', options: ['Research the organisation and match your examples to the job description', 'Memorise a long speech about your childhood', 'Arrive without reading anything, to sound natural', 'Learn the interviewer’s home address'], answer: 0, why: 'Matching your examples to what the job needs shows you are a good fit.' },
            { type: 'choice', q: 'Which is the best start to “Tell me about yourself”?', options: ['I’m a final-year accounting student, and I’ve managed a ₦2 million student union budget.', 'Well, I was born in a small town…', 'There’s nothing much to say.', 'It’s on my CV.'], answer: 0, why: 'It is current, relevant and specific.' },
            { type: 'choice', q: 'In a video interview, where should you look when you speak?', options: ['At the camera', 'At your own picture', 'Out of the window', 'At your notes the whole time'], answer: 0, why: 'Looking at the camera feels like eye contact to the interviewer.' },
            { type: 'speak', q: 'Tell me about yourself.', points: ['who you are now', 'one or two relevant achievements', 'why you want this role'], prep: 60, talk: 60, checklist: ['I spoke for about a minute', 'I started with who I am now, not my childhood', 'I gave a specific achievement', 'I said why I want this role'] },
            { type: 'choice', q: 'How long should “Tell me about yourself” usually take?', options: ['About one to two minutes', 'Ten minutes', 'Five seconds', 'As long as possible'], answer: 0, why: 'Short and focused keeps the interviewer interested.' }
          ]
        },
        {
          id: 'interview-cv', title: 'Matching yourself to the job', minutes: 6,
          cards: [
            { title: 'Read the job description closely', body: 'Underline the skills and qualities it asks for. These are the interviewer’s checklist, so prepare evidence for each one.' },
            { title: 'Map your evidence', body: 'For each requirement, note one example from school, work, volunteering or a club.', examples: [{ text: 'Requirement: customer service. Evidence: I served customers at my aunt’s shop every Saturday for two years.', good: true }] },
            { title: 'Know your CV', body: 'Interviewers ask about anything on your CV. Be ready to explain every job, gap, grade and skill you listed.' },
            { title: 'Common mistakes', body: 'Not reading the job description, claiming skills you cannot explain, and forgetting what you wrote on your CV.' }
          ],
          exercises: [
            { type: 'choice', q: 'Where do you find what the interviewer is looking for?', options: ['In the job description', 'In a newspaper horoscope', 'On your phone wallpaper', 'Nowhere'], answer: 0, why: 'It lists the skills they will test.' },
            { type: 'choice', q: 'A job asks for teamwork. Which evidence is strongest?', options: ['I organised a football tournament with four classmates.', 'I am a team player.', 'Everyone likes me.', 'I have seen teams before.'], answer: 0, why: 'A specific example proves the skill.' },
            { type: 'choice', q: 'Why should you reread your CV before an interview?', options: ['Interviewers may ask about anything on it', 'To check the font', 'It is not important', 'To count the pages'], answer: 0, why: 'You must be able to explain everything you claim.' },
            { type: 'gap', q: 'The role requires strong ___ skills, so I will mention my debating experience.', options: ['communication', 'communicate', 'communicating', 'communicated'], answer: 0, why: 'A noun is needed before “skills”.' },
            { type: 'error', q: 'Find the risky claim.', parts: ['I speak English and Hausa.', 'I use Excel daily.', 'I am fluent in French', '(though I only know a few words).'], answer: 2, fix: 'I am learning French.', why: 'Never claim a skill you cannot show; it may be tested.' }
          ]
        },
        {
          id: 'interview-formats', title: 'Interview formats: phone, panel, group, assessment', minutes: 6,
          cards: [
            { title: 'Phone interviews', body: 'Often a first screening. Find a quiet place, keep your CV and notes in front of you, smile as you speak (it changes your voice), and give slightly shorter answers.' },
            { title: 'Panel interviews', body: 'Several interviewers. Make eye contact with the person who asked, then include the others as you answer. Learn their names if you can.' },
            { title: 'Group interviews and assessment days', body: 'Tasks or discussions with other candidates. Employers watch how you work with others: listen, include quieter people, and help the group reach a decision.', examples: [{ text: 'That’s a good idea, Musa. Could we combine it with Amina’s plan?', good: true }, { text: 'My idea is best. Let’s just do mine.', good: false }] },
            { title: 'Common mistakes', body: 'Treating a phone interview casually, looking at only one panel member, and dominating a group task instead of collaborating.' }
          ],
          exercises: [
            { type: 'choice', q: 'In a panel interview, who should you look at when answering?', options: ['Mainly the person who asked, then the others too', 'Only the most senior person', 'The floor', 'The door'], answer: 0, why: 'Including everyone builds connection with the whole panel.' },
            { type: 'choice', q: 'What should you have in front of you in a phone interview?', options: ['Your CV and short notes', 'The television', 'A meal', 'Nothing'], answer: 0, why: 'Notes help, as long as you do not read from them.' },
            { type: 'choice', q: 'What are employers watching in a group task?', options: ['How you work with others', 'Who talks the loudest', 'Who finishes first alone', 'Your shoes'], answer: 0, why: 'Collaboration and leadership are what they assess.' },
            { type: 'choice', q: 'Which behaviour is best in a group discussion?', options: ['Building on others’ ideas and including quieter people', 'Interrupting to give your view', 'Staying silent', 'Criticising every idea'], answer: 0, why: 'Good teamwork stands out.' },
            { type: 'gap', q: 'Thank you all for ___ me today.', options: ['meeting', 'meet', 'met', 'meets'], answer: 0, why: 'After “for”, use the -ing form.' },
            { type: 'choice', q: 'Why smile during a phone interview?', options: ['It makes your voice sound warmer', 'They can see you', 'It is a rule', 'It is not useful'], answer: 0, why: 'Your tone carries over the phone.' }
          ]
        }
      ]
    },
    {
      title: 'Answering questions',
      lessons: [
        {
          id: 'interview-star', title: 'The STAR method', minutes: 6,
          cards: [
            { title: 'Behavioural questions', body: 'Questions such as “Tell me about a time you solved a problem” ask for a real example. Answer with STAR: Situation (the background), Task (what you had to do), Action (what you did), Result (what happened, with numbers if possible).' },
            { title: 'An example', body: 'Situation: our class project was two weeks behind. Task: as team lead, I had to get it finished on time. Action: I split the work into weekly goals and held short check-ins. Result: we submitted a day early and got the highest grade in the class.' },
            { title: 'Common mistakes', body: 'Talking about “we” the whole time so the interviewer cannot see your role, giving no result, or choosing an example with nothing to do with the job.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the STAR parts in order.', parts: ['Situation', 'Task', 'Action', 'Result'], why: 'Situation and Task set the scene; Action and Result show what you did and achieved.' },
            { type: 'choice', q: 'Which part of an answer is the Result?', options: ['We finished a day early and got the top grade.', 'Our project was behind schedule.', 'I was the team lead.', 'I set weekly goals.'], answer: 0, why: 'The Result is the outcome of your action.' },
            { type: 'choice', q: 'Why should you say “I” more than “we” in a STAR answer?', options: ['The interviewer needs to know what you did', 'It sounds more confident to boast', 'Teams are not important', 'It is shorter'], answer: 0, why: 'They are hiring you, so they need to see your own actions.' },
            { type: 'speak', q: 'Tell me about a time you solved a difficult problem.', points: ['Situation', 'Task', 'Action', 'Result'], prep: 60, talk: 120, checklist: ['I covered all four STAR parts', 'I said what I did, not just the team', 'I gave a clear result', 'The example fits a work setting'] },
            { type: 'gap', q: 'As a result, attendance at our club ___ by 50%.', options: ['increased', 'increase', 'increasing', 'was increase'], answer: 0, why: 'Past tense for the Result: attendance increased.' }
          ]
        },
        {
          id: 'interview-common', title: 'Common questions and strong answers', minutes: 7,
          cards: [
            { title: '“Why do you want to work here?”', body: 'Mention something specific about the organisation (its work, values or reputation), then link it to your skills and goals.', examples: [{ text: 'I admire how your bank supports small businesses, and my experience helping traders keep records fits that work.', good: true }, { text: 'I need a job and you are hiring.', good: false }] },
            { title: '“What are your strengths?”', body: 'Choose two or three that the job needs, and prove each with a short example.' },
            { title: '“Where do you see yourself in five years?”', body: 'Show ambition that fits the organisation: growing skills, taking on responsibility. Avoid “in your chair” or “running my own company”.' },
            { title: '“Why are you leaving your current job?”', body: 'Stay positive and forward-looking: “I am looking for more responsibility and a chance to grow.” Never criticise your employer.' },
            { title: 'Common mistakes', body: 'Generic answers that could fit any company, strengths with no evidence, and talking about salary or holidays as your main motivation.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which answer to “Why do you want to work here?” is strongest?', options: ['Your focus on rural health matches my volunteering at a village clinic.', 'Because you are hiring.', 'My friend works here.', 'The salary is good.'], answer: 0, why: 'It is specific and links the company to your experience.' },
            { type: 'choice', q: 'How should you answer “What are your strengths?”', options: ['Name two or three relevant strengths with examples', 'Say “everything”', 'List twenty adjectives', 'Say “I don’t know”'], answer: 0, why: 'Evidence makes strengths believable.' },
            { type: 'choice', q: 'Which answer to “Why are you leaving?” is best?', options: ['I am looking for more responsibility and new challenges.', 'My boss is terrible.', 'I hate my colleagues.', 'They do not pay me enough, and the office is ugly.'], answer: 0, why: 'Positive and forward-looking.' },
            { type: 'choice', q: 'Which answer to “Where do you see yourself in five years?” fits best?', options: ['Leading a small team here, with stronger project skills.', 'In your job.', 'On a beach.', 'I have no idea.'], answer: 0, why: 'It shows ambition that fits the organisation.' },
            { type: 'gap', q: 'One of my strengths is ___; for example, I never missed a deadline in my internship.', options: ['reliability', 'reliable', 'rely', 'relying'], answer: 0, why: 'A noun is needed after “is”.' },
            { type: 'speak', q: 'Answer: “Why do you want to work here?” for a job at a company you admire.', points: ['something specific about the company', 'how your skills match', 'what you hope to contribute', 'a confident close'], prep: 30, talk: 60, checklist: ['I mentioned something specific', 'I linked it to my skills', 'I said what I would contribute', 'I avoided talking about money'] }
          ]
        },
        {
          id: 'interview-hard', title: 'Difficult questions', minutes: 7,
          cards: [
            { title: '“What is your greatest weakness?”', body: 'Name a real weakness that is not essential to the job, and show what you are doing about it.', examples: [{ text: 'I used to find public speaking hard, so I joined my church’s youth committee, where I present every month. It is much easier now.', good: true }, { text: 'I work too hard.', good: false, note: 'Sounds rehearsed and avoids the question.' }] },
            { title: 'Salary and gaps', body: 'Salary: research the usual range and give a range, not one number. Gaps in your CV: explain them briefly and honestly, and say what you did or learned during that time.' },
            { title: 'Ask your own questions', body: 'At the end, ask one or two thoughtful questions: “What does success look like in the first six months?” or “How does the team support new staff?” Avoid asking only about holidays and pay.' },
            { title: 'Common mistakes', body: 'Saying you have no weakness, lying about gaps, naming a salary before you know the role, and getting defensive.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best answer to “What is your greatest weakness?”', options: ['I found presenting hard, so I volunteer to present monthly and I have improved a lot.', 'I don’t have any weaknesses.', 'I’m a perfectionist.', 'I’m always late.'], answer: 0, why: 'It is honest and shows how you are improving.' },
            { type: 'choice', q: 'What should you do when asked about a gap in your CV?', options: ['Explain briefly and honestly, and say what you learned', 'Pretend there is no gap', 'Refuse to answer', 'Blame your last employer'], answer: 0, why: 'Honesty and a positive focus build trust.' },
            { type: 'choice', q: 'Which is a good question to ask at the end?', options: ['What does success look like in the first six months?', 'How many days off do I get?', 'Can I work from home every day?', 'No questions.'], answer: 0, why: 'It shows interest in doing the job well.' },
            { type: 'speak', q: 'What is your greatest weakness?', points: ['a real weakness', 'why it matters', 'what you are doing about it', 'how you have improved'], prep: 45, talk: 90, checklist: ['I named a real weakness', 'It is not essential to the job', 'I said what I am doing about it', 'I sounded honest, not rehearsed'] },
            { type: 'choice', q: 'How should you answer a question about a gap in your CV?', options: ['Honestly and briefly, then focus on what you learned or did', 'Lie about it', 'Refuse to answer', 'Get angry'], answer: 0, why: 'Honesty plus a positive focus works best.' }
          ]
        },
        {
          id: 'interview-ask', title: 'Questions to ask the interviewer', minutes: 5,
          cards: [
            { title: 'Why ask questions', body: 'It shows interest and preparation, and helps you decide whether you want the job. “No, I don’t have any questions” can sound uninterested.' },
            { title: 'Good questions', body: '“What does a typical day look like in this role?”, “What would success look like after six months?”, “How does the team support new staff?”, “What are the next steps in the process?”', examples: [{ text: 'What would you expect me to achieve in the first three months?', good: true }] },
            { title: 'Questions to avoid at first', body: 'Salary, holidays and benefits in a first interview (unless they raise it), anything easily found on their website, and “Did I get the job?”' },
            { title: 'Common mistakes', body: 'Asking nothing, asking only about pay, and asking something they already explained.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best question to ask?', options: ['What would success look like in the first six months?', 'How many holidays do I get?', 'What does your company do?', 'Did I get the job?'], answer: 0, why: 'It shows you are thinking about doing well.' },
            { type: 'choice', q: 'Why should you ask questions at the end?', options: ['To show interest and learn about the role', 'To fill time', 'To test the interviewer', 'It is not useful'], answer: 0, why: 'Questions show preparation and interest.' },
            { type: 'choice', q: 'Which question shows you did not research the company?', options: ['What does your company do?', 'How does the team measure success?', 'What training do new staff receive?', 'What are the next steps?'], answer: 0, why: 'This information is on their website.' },
            { type: 'choice', q: 'What can you ask to understand the timeline?', options: ['What are the next steps in the process?', 'Why so slow?', 'Hurry up, please.', 'When do I start?'], answer: 0, why: 'It is polite and practical.' },
            { type: 'gap', q: 'Could you tell me more ___ the training programme?', options: ['about', 'of', 'at', 'on to'], answer: 0, why: '“Tell me more about…” is the natural phrase.' }
          ]
        }
      ]
    },
    {
      title: 'Presence and video interviews',
      lessons: [
        {
          id: 'interview-body', title: 'Body language and voice', minutes: 5,
          cards: [
            { title: 'First impressions', body: 'Arrive 10 minutes early, dress one level smarter than the workplace, greet everyone politely (including the receptionist), and offer a firm handshake if appropriate.' },
            { title: 'While you speak', body: 'Sit upright, keep your hands visible and still, make natural eye contact, and nod while listening.' },
            { title: 'Your voice', body: 'Speak at a steady pace, pause before answering difficult questions, and vary your tone. Pausing to think looks confident, not weak.', examples: [{ text: 'That’s a good question. Let me think for a moment.', good: true }] },
            { title: 'Common mistakes', body: 'Crossing arms, looking at the floor, fidgeting with a pen or phone, speaking too fast, and filling silences with “um”.' }
          ],
          exercises: [
            { type: 'choice', q: 'When should you arrive for an in-person interview?', options: ['About 10 minutes early', 'Exactly on time or a little late', 'An hour early, waiting at reception', 'Whenever'], answer: 0, why: 'Early but not too early shows good timing.' },
            { type: 'choice', q: 'What does crossing your arms often suggest?', options: ['Defensiveness', 'Confidence', 'Interest', 'Friendliness'], answer: 0, why: 'Open posture looks more confident and approachable.' },
            { type: 'choice', q: 'You need time to think. What do you say?', options: ['That’s a good question. Let me think for a moment.', 'Um, um, um…', 'Next question.', 'I don’t know.'], answer: 0, why: 'Pausing calmly shows confidence.' },
            { type: 'choice', q: 'How should you treat the receptionist?', options: ['Politely: interviewers often ask for their impression', 'Ignore them', 'Rudely', 'It does not matter'], answer: 0, why: 'Everyone you meet may influence the decision.' },
            { type: 'gap', q: 'Speak at a steady ___ and pause between points.', options: ['pace', 'place', 'pass', 'piece'], answer: 0, why: '“Pace” means speed.' },
            { type: 'order', q: 'Put these first moments in order.', parts: ['Arrive 10 minutes early', 'Greet the receptionist', 'Greet the interviewer and sit when invited', 'Wait for the first question'], why: 'Each step makes a good first impression.' }
          ]
        },
        {
          id: 'interview-video', title: 'Video interviews', minutes: 5,
          cards: [
            { title: 'Set up', body: 'Test the link, camera and microphone a day before. Use a plain background, light in front of you (not behind), and put the camera at eye level.' },
            { title: 'During the call', body: 'Look at the camera when you speak, not at your own picture. Mute notifications, keep notes off-screen and short, and pause slightly longer before answering in case of delay.' },
            { title: 'Recorded interviews', body: 'Some companies send questions you answer on a recording. Treat it like a live interview: dress well, look at the camera and use the preparation time to note your STAR points.' },
            { title: 'Common mistakes', body: 'A messy or noisy background, a window behind you (your face goes dark), reading from the screen, and joining late because of a software update.' }
          ],
          exercises: [
            { type: 'choice', q: 'Where should you look when speaking in a video interview?', options: ['At the camera', 'At your own picture', 'At your notes', 'Out of the window'], answer: 0, why: 'Looking at the camera feels like eye contact.' },
            { type: 'choice', q: 'Where should the light come from?', options: ['In front of you', 'Behind you', 'Below you only', 'Nowhere'], answer: 0, why: 'Light behind you darkens your face.' },
            { type: 'choice', q: 'When should you test your link and equipment?', options: ['The day before', 'After the interview', 'Never', 'During the first question'], answer: 0, why: 'Problems can be fixed in time.' },
            { type: 'choice', q: 'What should you do with phone notifications?', options: ['Silence them', 'Read them during pauses', 'Turn the volume up', 'Leave them on'], answer: 0, why: 'Notifications distract you and the interviewer.' },
            { type: 'gap', q: 'Sorry, the connection ___. Could you repeat the question?', options: ['dropped', 'drops of', 'dropping', 'drop'], answer: 0, why: 'Past tense: the connection dropped.' },
            { type: 'choice', q: 'In a recorded interview, how should you behave?', options: ['Like a live interview', 'Casually, since nobody is watching', 'Read a script', 'Skip questions'], answer: 0, why: 'The recording is watched carefully later.' }
          ]
        }
      ]
    },
    {
      title: 'After the interview',
      lessons: [
        {
          id: 'interview-after', title: 'Thank-you emails, offers and rejections', minutes: 6,
          cards: [
            { title: 'The thank-you email', body: 'Send it within 24 hours: thank them, mention one thing you discussed, restate your interest briefly and close politely.' },
            { title: 'Receiving an offer', body: 'Thank them, ask for the offer in writing, and ask for a short time to consider if you need it. Check the start date, pay and duties.' },
            { title: 'Handling rejection', body: 'Reply politely, thank them and ask for feedback. Companies remember gracious candidates when the next job opens.', examples: [{ text: 'Thank you for letting me know. I would be grateful for any feedback to help me improve.', good: true }] },
            { title: 'Common mistakes', body: 'No thank-you note, accepting an offer without reading it, and angry replies to rejections.' }
          ],
          exercises: [
            { type: 'choice', q: 'When should you send a thank-you email?', options: ['Within 24 hours', 'After a month', 'Before the interview', 'Never'], answer: 0, why: 'Soon enough to be remembered.' },
            { type: 'choice', q: 'What should you do when you receive an offer?', options: ['Thank them and ask for it in writing', 'Accept immediately without details', 'Ignore it', 'Post it online first'], answer: 0, why: 'Check the details before accepting.' },
            { type: 'choice', q: 'Which reply to a rejection is best?', options: ['Thank you for letting me know. Could you share any feedback?', 'You made a big mistake.', '(No reply.)', 'Why not me?!'], answer: 0, why: 'Gracious replies leave a good impression.' },
            { type: 'gap', q: 'Thank you for ___ the time to meet me yesterday.', options: ['taking', 'take', 'took', 'taken'], answer: 0, why: 'After “for”, use the -ing form.' },
            { type: 'error', q: 'Find the inappropriate part.', parts: ['Dear Mrs Lawal,', 'Thank you for the interview.', 'I hope you pick me because I really need money.', 'Kind regards,'], answer: 2, fix: 'I am excited about the chance to support your team.', why: 'Focus on what you offer, not on your needs.' },
            { type: 'write', kind: 'email', subject: true, q: 'Write a thank-you email to Mrs Lawal after an interview for an assistant role at a publishing company.', minWords: 50, maxWords: 150, checklist: ['Subject line', 'Thanks', 'One thing you discussed', 'Your continued interest', 'A polite close'], model: 'Subject: Thank you for the interview\n\nDear Mrs Lawal,\n\nThank you for meeting me yesterday to discuss the editorial assistant role. I enjoyed learning about your new children’s book series.\n\nOur conversation confirmed my interest in the position. In particular, I would love to help with proofreading and organising author schedules.\n\nPlease let me know if you need any further information.\n\nKind regards,\nTunde Bello' }
          ]
        }
      ]
    },
    {
      title: 'Mock interviews',
      lessons: [
        {
          id: 'interview-mock', title: 'A full mock interview', minutes: 10,
          cards: [
            { title: 'How this works', body: 'Answer four common questions out loud, with time to prepare each. Treat it like the real thing: sit up, speak clearly, and use your STAR stories.' },
            { title: 'Body language and closing', body: 'Greet politely, sit upright, keep your hands still, and smile when it fits. At the end, thank the interviewers: “Thank you for your time. I’m very interested in this role.” A short thank-you email the same day is a good idea.' },
            { title: 'Common mistakes', body: 'Rushing answers, forgetting to smile and greet the panel, and ending without a question or a thank-you.' }
          ],
          exercises: [
            { type: 'speak', q: 'Why do you want to work here?', points: ['something specific about the organisation', 'how it matches your skills', 'what you want to learn or contribute'], prep: 45, talk: 60, checklist: ['I named something specific about them', 'I linked it to my skills', 'I said what I can contribute'] },
            { type: 'speak', q: 'Tell me about a time you worked in a team.', points: ['Situation', 'Task', 'Action', 'Result'], prep: 45, talk: 120, checklist: ['I used STAR', 'My own role was clear', 'I gave a result'] },
            { type: 'speak', q: 'Where do you see yourself in five years?', points: ['skills you want to build', 'responsibility you hope to have', 'how it connects to this role'], prep: 30, talk: 60, checklist: ['My answer was realistic', 'It connected to this role', 'I sounded committed'] },
            { type: 'choice', q: 'How should you end an interview?', options: ['Thank them and say you are interested in the role', 'Leave without speaking', 'Ask when you will get the salary', 'Tell them you have other offers to pressure them'], answer: 0, why: 'A polite thank-you leaves a good final impression.' },
            { type: 'choice', q: 'What should you say as the interview ends?', options: ['Thank you for your time. I look forward to hearing from you.', 'Finally!', 'Bye.', 'So did I get it?'], answer: 0, why: 'A polite, confident close leaves a good last impression.' }
          ]
        },
        {
          id: 'interview-mock2', title: 'Mock interview: graduate trainee', minutes: 10,
          cards: [
            { title: 'The scenario', body: 'You are interviewing for a graduate trainee programme at a large bank. The panel will ask about your studies, teamwork, a challenge and your motivation.' },
            { title: 'How to use this lesson', body: 'Read each question, use the preparation time to note your points, then speak until the timer ends. Tick the checklist honestly and repeat any answer that felt weak.' },
            { title: 'Common mistakes', body: 'Answers that are too short (“Yes, I like teamwork”), forgetting the Result in STAR answers, and not linking your answer back to the job.' }
          ],
          exercises: [
            { type: 'speak', q: 'Tell us about yourself.', points: ['your studies or current role', 'one achievement', 'why this programme', 'a short close'], prep: 30, talk: 75, checklist: ['I spoke for about a minute', 'I mentioned one achievement', 'I linked it to the programme', 'I did not just repeat my CV'] },
            { type: 'speak', q: 'Tell us about a time you worked in a team that disagreed.', points: ['the situation', 'your task', 'what you did to help', 'the result'], prep: 30, talk: 90, checklist: ['I used STAR', 'I said what I did, not only the team', 'I gave a clear result', 'I stayed positive about others'] },
            { type: 'speak', q: 'Describe a challenge you faced in your studies and how you dealt with it.', points: ['the challenge', 'your action', 'what you learned', 'the result'], prep: 30, talk: 90, checklist: ['I named a real challenge', 'I explained my actions', 'I shared what I learned', 'I ended positively'] },
            { type: 'speak', q: 'Why do you want to join our graduate programme?', points: ['something specific about the bank', 'how it fits your goals', 'what you can offer'], prep: 30, talk: 60, checklist: ['I was specific about the bank', 'I linked it to my goals', 'I said what I offer'] },
            { type: 'choice', q: 'Which ending to a mock answer is strongest?', options: ['As a result, our project won first prize, and I learned how to manage disagreements.', 'So yeah, that happened.', 'Anyway.', 'That’s all I remember.'], answer: 0, why: 'A clear result and lesson make a memorable ending.' },
            { type: 'choice', q: 'What should you do if an answer felt weak in practice?', options: ['Repeat it, using the checklist to improve', 'Skip it forever', 'Memorise a perfect script', 'Ignore the checklist'], answer: 0, why: 'Repetition builds confidence.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'interview-final', title: 'Final assessment: Interviews', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '13 questions from the whole course: preparation, formats, STAR, common and difficult questions, questions to ask, body language, video interviews and after the interview. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'Where do you find the skills an interviewer will test?', options: ['In the job description', 'On social media', 'In the newspaper', 'Nowhere'], answer: 0, why: 'It is the interviewer’s checklist.' },
            { type: 'order', q: 'Put STAR in order.', parts: ['Situation', 'Task', 'Action', 'Result'], why: 'Situation, Task, Action, Result.' },
            { type: 'choice', q: 'In a STAR answer, which part needs the most detail?', options: ['Action', 'Situation', 'Task', 'None'], answer: 0, why: 'Your actions show your skills.' },
            { type: 'choice', q: 'Which answer to “What is your greatest weakness?” is best?', options: ['I used to take on too much, so now I plan my week and ask for help early.', 'I have no weaknesses.', 'I am lazy.', 'I work too hard, that’s all.'], answer: 0, why: 'A real weakness plus improvement is honest and positive.' },
            { type: 'choice', q: 'Which answer to “Why are you leaving?” is best?', options: ['I want more responsibility and room to grow.', 'My boss is awful.', 'I hate the work.', 'They are unfair to me.'], answer: 0, why: 'Stay positive.' },
            { type: 'choice', q: 'Which question should you ask at the end?', options: ['What would success look like in the first six months?', 'How long is lunch?', 'What does your company do?', 'Did I get it?'], answer: 0, why: 'It shows you think about performing well.' },
            { type: 'choice', q: 'In a panel interview, who should you look at?', options: ['Mainly the person who asked, then the others', 'Only the chair', 'The floor', 'Your phone'], answer: 0, why: 'Include everyone.' },
            { type: 'choice', q: 'In a group task, what impresses employers?', options: ['Building on others’ ideas', 'Talking the most', 'Staying silent', 'Rejecting every idea'], answer: 0, why: 'Collaboration matters.' },
            { type: 'choice', q: 'Where should you look in a video interview?', options: ['At the camera', 'At your picture', 'At your notes', 'Away'], answer: 0, why: 'It feels like eye contact.' },
            { type: 'choice', q: 'You need a moment to think. What do you say?', options: ['That’s a good question. Let me think for a moment.', 'Um, um…', 'Pass.', 'Whatever.'], answer: 0, why: 'Calm pauses look confident.' },
            { type: 'gap', q: 'Thank you for ___ the time to meet me.', options: ['taking', 'take', 'took', 'taken'], answer: 0, why: 'After “for”, use the -ing form.' },
            { type: 'choice', q: 'When should you send a thank-you email?', options: ['Within 24 hours', 'Next month', 'Never', 'Before the interview'], answer: 0, why: 'Soon enough to be remembered.' },
            { type: 'choice', q: 'You are rejected. What is the best reply?', options: ['Thank them and ask for feedback', 'Complain', 'Say nothing ever', 'Post about it angrily'], answer: 0, why: 'Graciousness is remembered.' }
          ]
        }
      ]
    }
  ]
};
