// Work and career: Interviews. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. Mock interview questions are timed and self-checked; nothing is recorded.',
  guide: ['Start with preparing for an interview and introducing yourself.', 'Learn the STAR method, then practise common and difficult questions.', 'Do the mock interview questions with the timer, out loud.', 'Save your best answers to your notebook and refine them before each real interview.'],
  improve: ['Write a 60-second introduction and practise it until it sounds natural, not memorised.', 'Prepare three STAR stories you can adapt to many questions.', 'Research every organisation before you meet them and prepare two questions to ask.', 'Record yourself answering one question and listen for filler words.'],
  units: [
    {
      title: 'Getting ready',
      lessons: [
        {
          id: 'interview-prepare', title: 'Preparing and introducing yourself', minutes: 6,
          cards: [
            { title: 'Research', body: 'Read about the organisation: what it does, its customers, recent news and its values. Read the job description and list the skills it asks for. Prepare an example for each.' },
            { title: 'Interview formats', body: 'Face to face, by phone, by video call, panel interviews with several interviewers, and group assessments. For video calls, test your camera and sound, choose a quiet, tidy space, and look at the camera when you speak.' },
            { title: '“Tell me about yourself”', body: 'Answer in about a minute: who you are now (study or work), one or two achievements related to the job, and why you want this role. It is not your life story.', examples: [{ text: 'I’m a final-year accounting student at UNILAG. Last year I managed the finances for our student union’s ₦2 million budget, and I want to bring that experience to your audit team.', good: true }, { text: 'I was born in 2002 in Ibadan, I have four siblings…', good: false }] }
          ],
          exercises: [
            { type: 'choice', q: 'What is the best way to prepare for an interview?', options: ['Research the organisation and match your examples to the job description', 'Memorise a long speech about your childhood', 'Arrive without reading anything, to sound natural', 'Learn the interviewer’s home address'], answer: 0, why: 'Matching your examples to what the job needs shows you are a good fit.' },
            { type: 'choice', q: 'Which is the best start to “Tell me about yourself”?', options: ['I’m a final-year accounting student, and I’ve managed a ₦2 million student union budget.', 'Well, I was born in a small town…', 'There’s nothing much to say.', 'It’s on my CV.'], answer: 0, why: 'It is current, relevant and specific.' },
            { type: 'choice', q: 'In a video interview, where should you look when you speak?', options: ['At the camera', 'At your own picture', 'Out of the window', 'At your notes the whole time'], answer: 0, why: 'Looking at the camera feels like eye contact to the interviewer.' },
            { type: 'speak', q: 'Tell me about yourself.', points: ['who you are now', 'one or two relevant achievements', 'why you want this role'], prep: 60, talk: 60, checklist: ['I spoke for about a minute', 'I started with who I am now, not my childhood', 'I gave a specific achievement', 'I said why I want this role'] }
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
            { type: 'speak', q: 'Tell me about a time you solved a difficult problem.', points: ['Situation', 'Task', 'Action', 'Result'], prep: 60, talk: 120, checklist: ['I covered all four STAR parts', 'I said what I did, not just the team', 'I gave a clear result', 'The example fits a work setting'] }
          ]
        },
        {
          id: 'interview-hard', title: 'Difficult questions', minutes: 7,
          cards: [
            { title: '“What is your greatest weakness?”', body: 'Name a real weakness that is not essential to the job, and show what you are doing about it.', examples: [{ text: 'I used to find public speaking hard, so I joined my church’s youth committee, where I present every month. It is much easier now.', good: true }, { text: 'I work too hard.', good: false, note: 'Sounds rehearsed and avoids the question.' }] },
            { title: 'Salary and gaps', body: 'Salary: research the usual range and give a range, not one number. Gaps in your CV: explain them briefly and honestly, and say what you did or learned during that time.' },
            { title: 'Ask your own questions', body: 'At the end, ask one or two thoughtful questions: “What does success look like in the first six months?” or “How does the team support new staff?” Avoid asking only about holidays and pay.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is the best answer to “What is your greatest weakness?”', options: ['I found presenting hard, so I volunteer to present monthly and I have improved a lot.', 'I don’t have any weaknesses.', 'I’m a perfectionist.', 'I’m always late.'], answer: 0, why: 'It is honest and shows how you are improving.' },
            { type: 'choice', q: 'What should you do when asked about a gap in your CV?', options: ['Explain briefly and honestly, and say what you learned', 'Pretend there is no gap', 'Refuse to answer', 'Blame your last employer'], answer: 0, why: 'Honesty and a positive focus build trust.' },
            { type: 'choice', q: 'Which is a good question to ask at the end?', options: ['What does success look like in the first six months?', 'How many days off do I get?', 'Can I work from home every day?', 'No questions.'], answer: 0, why: 'It shows interest in doing the job well.' },
            { type: 'speak', q: 'What is your greatest weakness?', points: ['a real weakness', 'why it matters', 'what you are doing about it', 'how you have improved'], prep: 45, talk: 90, checklist: ['I named a real weakness', 'It is not essential to the job', 'I said what I am doing about it', 'I sounded honest, not rehearsed'] }
          ]
        }
      ]
    },
    {
      title: 'Mock interview',
      lessons: [
        {
          id: 'interview-mock', title: 'A full mock interview', minutes: 10,
          cards: [
            { title: 'How this works', body: 'Answer four common questions out loud, with time to prepare each. Treat it like the real thing: sit up, speak clearly, and use your STAR stories.' },
            { title: 'Body language and closing', body: 'Greet politely, sit upright, keep your hands still, and smile when it fits. At the end, thank the interviewers: “Thank you for your time. I’m very interested in this role.” A short thank-you email the same day is a good idea.' }
          ],
          exercises: [
            { type: 'speak', q: 'Why do you want to work here?', points: ['something specific about the organisation', 'how it matches your skills', 'what you want to learn or contribute'], prep: 45, talk: 60, checklist: ['I named something specific about them', 'I linked it to my skills', 'I said what I can contribute'] },
            { type: 'speak', q: 'Tell me about a time you worked in a team.', points: ['Situation', 'Task', 'Action', 'Result'], prep: 45, talk: 120, checklist: ['I used STAR', 'My own role was clear', 'I gave a result'] },
            { type: 'speak', q: 'Where do you see yourself in five years?', points: ['skills you want to build', 'responsibility you hope to have', 'how it connects to this role'], prep: 30, talk: 60, checklist: ['My answer was realistic', 'It connected to this role', 'I sounded committed'] },
            { type: 'choice', q: 'How should you end an interview?', options: ['Thank them and say you are interested in the role', 'Leave without speaking', 'Ask when you will get the salary', 'Tell them you have other offers to pressure them'], answer: 0, why: 'A polite thank-you leaves a good final impression.' }
          ]
        }
      ]
    }
  ]
};
