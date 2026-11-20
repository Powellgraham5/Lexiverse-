// Better writing: Stories. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at length, paragraphs and dialogue punctuation; they cannot judge your story, so read it aloud and compare with the model.',
  guide: [
    'Start with the introduction, then learn story shape, characters, setting, voice and style in order.',
    'Write a short scene after every lesson before you open the model.',
    'Use “Explain it again” when an answer surprises you.',
    'Finish with the final assessment, then the practice test.',
    'Save strong verbs, openings and dialogue rules to your notebook.'
  ],
  improve: [
    'Read short stories every week and notice how the first line pulls you in.',
    'Cut every “very” and “suddenly”; use a stronger verb or a detail instead.',
    'Read your dialogue aloud: if nobody would say it, rewrite it.',
    'Give every main character a clear want and something in the way.',
    'Finish a draft, put it away for a day, then edit it with fresh eyes.',
    'Keep a notebook of details you notice: sounds, smells, the way people talk.'
  ],
  units: [
    {
      title: 'Introduction to stories',
      lessons: [
        {
          id: 'story-intro', title: 'What makes a story', minutes: 5, kind: 'intro',
          cards: [
            { title: 'What a story is', body: 'A story shows a character who wants something, meets a problem, and changes or learns something by the end. Without a problem, nothing happens; without change, the story feels flat.' },
            { title: 'Where stories are used', body: 'Exams (WAEC narrative essays, “write a story ending with…”), creative writing competitions, speeches, adverts, job interviews (telling a story about yourself) and everyday conversation.' },
            { title: 'The building blocks', body: 'Character, setting, plot (what happens), conflict (the problem), point of view (who tells it), dialogue and description. This course gives each one its own lesson.' },
            { title: 'Common mistakes', body: 'A list of events with no problem (“I woke up, I ate, I went to school”), too many characters, and endings like “It was all a dream”.' }
          ],
          exercises: [
            { type: 'choice', q: 'What does every story need?', options: ['A character with a problem', 'At least ten characters', 'A happy ending', 'A dragon'], answer: 0, why: 'The problem drives the story forward.' },
            { type: 'choice', q: 'Which is the best story idea?', options: ['A girl must find her lost brother before the last bus leaves the market.', 'A girl wakes up, eats breakfast and goes to school.', 'A day when nothing happened.', 'A list of my favourite foods.'], answer: 0, why: 'It has a character, a goal, a problem and a time limit.' },
            { type: 'choice', q: 'Which ending should you avoid?', options: ['And then I woke up. It was all a dream.', 'She finally understood why her grandmother kept the key.', 'The bus pulled away, but Tunde was smiling.', 'From that day on, he always checked twice.'], answer: 0, why: '“It was all a dream” cancels everything that happened.' },
            { type: 'choice', q: 'Where might you use storytelling at work?', options: ['Answering “Tell me about a challenge you faced” in an interview', 'Filling in a tax form', 'Typing a password', 'Reading a timetable'], answer: 0, why: 'Interview answers are short true stories.' },
            { type: 'order', q: 'Put the parts of a simple story in order.', parts: ['A character wants something', 'A problem gets in the way', 'Things get worse', 'The character acts and something changes'], why: 'Want, problem, rising tension, change.' }
          ]
        }
      ]
    },
    {
      title: 'Story shape',
      lessons: [
        {
          id: 'story-structure', title: 'Beginning, middle and end', minutes: 5,
          cards: [
            { title: 'The story arc', body: 'Most stories follow a shape: an opening that introduces the character and setting, a problem that starts the action, rising tension, a climax (the most exciting moment), and a resolution that shows how things end.' },
            { title: 'Every story needs a problem', body: 'Without a problem there is no story. The problem can be big (a flood) or small (a lost key), but the character must want something and struggle to get it.' },
            { title: 'Common mistakes', body: 'A beginning that goes on too long, a middle where nothing gets harder, and an ending that solves everything by luck.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a story in order.', parts: ['Opening: character and setting', 'A problem starts the action', 'Rising tension', 'Climax', 'Resolution'], why: 'This is the usual story arc.' },
            { type: 'choice', q: 'What is the climax of a story?', options: ['The most exciting or important moment', 'The first sentence', 'The list of characters', 'The title'], answer: 0, why: 'The climax is the turning point where tension is highest.' },
            { type: 'choice', q: 'Which is the best story problem?', options: ['On the morning of her exam, Zainab’s bus breaks down ten kilometres from school.', 'Zainab has a nice day at school.', 'Zainab lives in Kaduna.', 'Zainab likes blue.'], answer: 0, why: 'It gives the character something she wants (to reach her exam) and an obstacle.' },
            { type: 'write', kind: 'story', q: 'Plan a short story in a paragraph: who the character is, what they want, what goes wrong, and how it ends.', minWords: 60, maxWords: 160, checklist: ['A character with a goal', 'A problem', 'A climax', 'An ending'], model: 'Emeka has saved for months to buy a guitar for the school talent show. Two days before the show, his little sister knocks the guitar off the table and a string snaps. With no money left, Emeka visits an old repairman in the market, who agrees to fix it if Emeka helps in his shop. Emeka works late every evening. On the night of the show, he plays with a borrowed string and wins second place, and the repairman sits proudly in the front row.' },
            { type: 'choice', q: 'What should happen in the middle of a story?', options: ['The problem gets harder', 'Nothing', 'The story ends', 'A new title appears'], answer: 0, why: 'Rising tension keeps readers interested.' }
          ]
        },
        {
          id: 'story-openings', title: 'Openings that hook, endings that land', minutes: 5,
          cards: [
            { title: 'Start in the action', body: 'Strong openings drop the reader into a moment: a line of dialogue, a surprising fact, or a character in trouble.', examples: [{ text: '“Run!” Tola shouted, as the first drops of rain turned the road to mud.', good: true }, { text: 'One day I woke up and brushed my teeth and had breakfast.', good: false, note: 'Slow and ordinary.' }] },
            { title: 'Endings', body: 'A good ending answers the story’s problem and shows how the character has changed. Avoid “and then I woke up and it was all a dream”.' },
            { title: 'Common mistakes', body: 'Starting with waking up, with the weather for a whole paragraph, or with “Once upon a time” in a modern story; ending with “It was all a dream”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening hooks the reader best?', options: ['The letter had no stamp, no name and no address, yet it was waiting on my pillow.', 'My name is Ada and I am fifteen.', 'It was a normal day.', 'This is a story about my holiday.'], answer: 0, why: 'It creates a mystery the reader wants to solve.' },
            { type: 'choice', q: 'Which ending is weakest?', options: ['Then I woke up, and it was all a dream.', 'From that day on, Musa never left the gate open again.', 'As the bus pulled away, Kemi finally smiled.', 'The trophy still sits on Grandma’s shelf.'], answer: 0, why: 'A dream ending cancels everything that happened and feels like a cheat.' },
            { type: 'write', kind: 'story', q: 'Write an opening paragraph that starts in the middle of the action.', minWords: 40, maxWords: 120, checklist: ['Start in a moment of action or dialogue', 'Hint at a problem', 'One clear setting detail'], model: '“Don’t look down,” Bisi whispered, but Ade already had. Below the narrow bridge, the river roared brown and fast, carrying branches as thick as his arm. Somewhere behind them, the goats they had been sent to find were bleating, and the sun was already sinking behind the hills.' },
            { type: 'choice', q: 'Why should a story start close to the action?', options: ['It hooks the reader at once', 'It makes the story longer', 'It avoids using dialogue', 'Examiners prefer weather descriptions'], answer: 0, why: 'Readers keep reading when something is already happening.' },
            { type: 'choice', q: 'Which ending feels earned?', options: ['Because she finally spoke up, the whole class was allowed to retake the test.', 'Then a fairy fixed everything.', 'It was all a dream.', 'The end.'], answer: 0, why: 'The ending comes from the character’s action.' }
          ]
        },
        {
          id: 'story-conflict', title: 'Conflict and climax', minutes: 6,
          cards: [
            { title: 'Kinds of conflict', body: 'Character against character (a rival), against nature (a flood), against society (unfair rules) and against self (fear or guilt). Many stories mix two.' },
            { title: 'Rising action', body: 'Make things harder step by step. Each attempt to solve the problem fails or creates a new one, until the character must make a big choice.' },
            { title: 'The climax', body: 'The moment of greatest tension, when the problem is faced. Slow down here: use short sentences, detail and the character’s feelings.', examples: [{ text: 'The water reached her knees. Then her waist. She grabbed the rope and pulled.', good: true }] },
            { title: 'Common mistakes', body: 'Solving the problem too easily, a climax that happens “off stage”, and luck or a stranger saving the character instead of their own action.' }
          ],
          exercises: [
            { type: 'choice', q: 'A boy is afraid to sing in front of the school. What kind of conflict is this?', options: ['Character against self', 'Character against nature', 'Character against society', 'No conflict'], answer: 0, why: 'The struggle is inside him.' },
            { type: 'choice', q: 'What is the climax?', options: ['The point of greatest tension, when the problem is faced', 'The first sentence', 'The title', 'The description of the setting'], answer: 0, why: 'Everything builds to the climax.' },
            { type: 'choice', q: 'Which climax is strongest?', options: ['Ada pushed past her fear and grabbed the microphone.', 'Luckily, a teacher solved everything for Ada.', 'Then the problem went away.', 'Ada woke up and it was a dream.'], answer: 0, why: 'The character solves the problem by her own action.' },
            { type: 'choice', q: 'What makes rising action work?', options: ['Each attempt makes things harder', 'Nothing changes', 'The problem is solved at once', 'The setting is described for pages'], answer: 0, why: 'Growing difficulty builds tension.' },
            { type: 'gap', q: 'Storm clouds gathered, the river rose, ___ the bridge began to shake.', options: ['and then', 'but luckily nothing happened, and', 'so the end,', 'because'], answer: 0, why: 'Each event increases the danger.' },
            { type: 'write', kind: 'story', q: 'Write the climax of a story in which a student must give a speech while terrified.', minWords: 40, maxWords: 160, checklist: ['Short sentences to build tension', 'The character’s feelings shown through actions', 'The character acts to solve the problem'], model: 'My hands shook as I walked to the microphone. Six hundred faces stared at me. My mouth was dry, and the first line vanished from my mind. Then I saw my grandmother in the front row, nodding slowly. I took a breath, unfolded my notes and began. My voice cracked on the first word, but by the third sentence it was steady.' }
          ]
        }
      ]
    },
    {
      title: 'Characters and setting',
      lessons: [
        {
          id: 'story-characters', title: 'Characters: show, don’t tell', minutes: 5,
          cards: [
            { title: 'Show feelings through actions', body: 'Instead of naming a feeling, show what the character does, says or notices.', examples: [{ text: 'Musa was nervous.', good: false }, { text: 'Musa wiped his palms on his trousers for the third time and stared at the door.', good: true }] },
            { title: 'Give characters wants and details', body: 'Readers care about characters who want something. One or two specific details (a habit, a phrase they always say) make them feel real.' },
            { title: 'Common mistakes', body: 'Describing appearance only, characters with no want, and telling feelings (“she was sad”) instead of showing them.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence shows, rather than tells, that Ngozi is angry?', options: ['Ngozi slammed her bag on the table and refused to look at anyone.', 'Ngozi was angry.', 'Ngozi felt a lot of anger.', 'Ngozi was very, very angry.'], answer: 0, why: 'Actions let the reader feel the anger without being told.' },
            { type: 'choice', q: 'Which detail makes a character most memorable?', options: ['Grandpa hums the same old highlife tune whenever he is worried.', 'Grandpa is old.', 'Grandpa has two eyes.', 'Grandpa is a man.'], answer: 0, why: 'A specific habit gives the character personality.' },
            { type: 'write', kind: 'story', q: 'Show that a character is excited, without using the word “excited”.', minWords: 40, maxWords: 120, checklist: ['No “excited” or “happy”', 'At least two actions or details', 'One thing the character says or thinks'], model: 'Chioma read the message twice, then a third time. She jumped up so fast that her chair tipped over, and she ran to the kitchen waving her phone above her head. “Mum! Mum, they picked me!” she shouted, her words tumbling over each other.' },
            { type: 'choice', q: 'Which shows anger best?', options: ['He slammed the book down and stared out of the window.', 'He was angry.', 'He felt angry.', 'Anger was in him.'], answer: 0, why: 'Actions show the feeling.' },
            { type: 'choice', q: 'What makes a character interesting?', options: ['A clear want and something in the way', 'A long name', 'Lots of clothes', 'Being perfect'], answer: 0, why: 'Wants and obstacles create story.' }
          ]
        },
        {
          id: 'story-setting', title: 'Setting: time, place and mood', minutes: 6,
          cards: [
            { title: 'What setting does', body: 'Setting tells the reader where and when the story happens, and it creates mood. A dark, rainy market feels very different from a bright Saturday market.' },
            { title: 'Show the setting through a character', body: 'Let the character notice things as they move, instead of a long list at the start.', examples: [{ text: 'Chidi pushed through the crowd, stepping over puddles that smelled of fish and diesel.', good: true }, { text: 'The market was big. It had many stalls. It was busy.', good: false }] },
            { title: 'Setting can create problems', body: 'A flood, a blackout, a locked school or a long journey can drive the plot.' },
            { title: 'Common mistakes', body: 'Long descriptions that stop the story, no setting at all, and settings that do not match the mood of the scene.' }
          ],
          exercises: [
            { type: 'choice', q: 'What two things does a setting tell the reader?', options: ['Where and when the story happens', 'The ending and the title', 'The writer’s age and name', 'The number of pages'], answer: 0, why: 'Setting is time and place.' },
            { type: 'choice', q: 'Which sentence creates a tense mood?', options: ['The corridor was silent except for a dripping tap.', 'The corridor was nice.', 'There was a corridor.', 'The corridor had walls.'], answer: 0, why: 'Silence and a single sound create tension.' },
            { type: 'choice', q: 'Which shows the setting through a character?', options: ['Bola wiped the red dust from her shoes as the harmattan wind whipped her face.', 'It was harmattan. It was dusty. It was windy.', 'The setting was a dusty town.', 'Dust was there.'], answer: 0, why: 'We experience the setting through Bola’s actions.' },
            { type: 'gap', q: 'Lightning lit up the empty classroom, and the windows ___ in the wind.', options: ['rattled', 'were nice', 'were there', 'did things'], answer: 0, why: 'A precise verb adds sound and tension.' },
            { type: 'choice', q: 'How can a setting drive the plot?', options: ['A flood traps the characters and creates the problem', 'It cannot', 'By being described for a whole page', 'By having a long name'], answer: 0, why: 'Setting can cause the conflict.' },
            { type: 'write', kind: 'story', q: 'Describe the setting of a scary scene in a school at night, through a character’s eyes.', minWords: 40, maxWords: 160, checklist: ['Time and place clear', 'At least two senses', 'A mood of fear', 'The character moves through the setting'], model: 'Kemi crept along the corridor, her torch shaking in her hand. The classrooms were dark, and the smell of chalk dust hung in the air. Somewhere a door creaked. Rain hammered on the roof, so loud that she almost missed the footsteps behind her.' }
          ]
        },
        {
          id: 'story-pov', title: 'Point of view and tense', minutes: 6,
          cards: [
            { title: 'First person', body: '“I” tells the story. It feels close and personal, but the narrator only knows what they see, hear and think.', examples: [{ text: 'I knew something was wrong the moment I opened the gate.', good: true }] },
            { title: 'Third person', body: '“He”, “she” or “they”. Limited third person follows one character closely; all-knowing third person can enter anyone’s mind.' },
            { title: 'Choose a tense and keep it', body: 'Most stories use the past tense. The present tense can feel immediate. Whatever you choose, do not switch without a reason.' },
            { title: 'Common mistakes', body: 'Switching between “I” and “he” for the same narrator, slipping between past and present, and a first-person narrator who knows other people’s thoughts.' }
          ],
          exercises: [
            { type: 'choice', q: '“I ran to the gate, but it was locked.” Which point of view is this?', options: ['First person', 'Third person', 'Second person', 'No point of view'], answer: 0, why: '“I” is first person.' },
            { type: 'choice', q: 'Which point of view lets you enter every character’s mind?', options: ['All-knowing (omniscient) third person', 'First person', 'Limited third person', 'Second person'], answer: 0, why: 'An all-knowing narrator knows everyone’s thoughts.' },
            { type: 'error', q: 'Find the tense error.', parts: ['She opened the door', 'and saw the room.', 'Then she walks in', 'and sat down.'], answer: 2, fix: 'Then she walked in', why: 'The story is in the past, so keep the past tense.' },
            { type: 'error', q: 'Find the point-of-view error in this first-person story.', parts: ['I waited at the bus stop.', 'The driver was late.', 'Inside his head, the driver secretly hoped I would leave.', 'Finally, the bus arrived.'], answer: 2, fix: 'The driver looked annoyed, as if he wished I would leave.', why: 'A first-person narrator cannot know another person’s secret thoughts.' },
            { type: 'gap', q: 'Every morning, Musa ___ the goats to the stream.', options: ['took', 'takes took', 'taked', 'taking'], answer: 0, why: 'In a past-tense story, use “took”.' },
            { type: 'write', kind: 'story', q: 'Rewrite this in the first person, past tense: “Halima walks into the hall. She sees the results board. Her heart races.”', minWords: 25, maxWords: 100, checklist: ['First person (I)', 'Past tense throughout', 'Feelings shown'], model: 'I walked into the hall and looked for the results board. When I saw it, my heart raced. I pushed through the crowd, searching for my name, and my hands were damp with sweat.' }
          ]
        }
      ]
    },
    {
      title: 'Bringing it to life',
      lessons: [
        {
          id: 'story-dialogue', title: 'Writing dialogue', minutes: 6,
          cards: [
            { title: 'Punctuation inside the marks', body: 'Put the spoken words and their punctuation inside the quotation marks. Use a comma before the speech tag.', examples: [{ text: '“We are late,” said Ade.', good: true }, { text: '“We are late”, said Ade.', good: false }, { text: '“Are we late?” asked Ade.', good: true }] },
            { title: 'New speaker, new line', body: 'Start a new paragraph every time a different character speaks. It shows the reader who is talking.' },
            { title: 'Keep tags simple', body: '“Said” and “asked” are usually best. Let the words and actions show the feeling.' },
            { title: 'Real-life use', body: 'Good dialogue skills help in scripts, adverts, speeches and reported conversations in reports and news writing.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is punctuated correctly?', options: ['“I can’t find my keys,” said Funmi.', '“I can’t find my keys”, said Funmi.', '“I can’t find my keys” said Funmi.', 'I can’t find my keys, “said Funmi.”'], answer: 0, why: 'The comma goes inside the closing quotation mark.' },
            { type: 'choice', q: 'Which is punctuated correctly?', options: ['“Where are you going?” asked Tunde.', '“Where are you going”? asked Tunde.', '“Where are you going,” asked Tunde?', '“Where are you going.” asked Tunde.'], answer: 0, why: 'The question mark belongs to the spoken words, so it goes inside the marks.' },
            { type: 'choice', q: 'When should you start a new paragraph in dialogue?', options: ['Every time a different person speaks', 'Only at the end of the story', 'Every three sentences', 'Never'], answer: 0, why: 'A new speaker gets a new line so the reader can follow the conversation.' },
            { type: 'write', kind: 'story', q: 'Write a short conversation (at least four lines) between two friends who disagree about something.', minWords: 50, maxWords: 150, checklist: ['Quotation marks around speech', 'A new paragraph for each speaker', 'Punctuation inside the marks'], model: '“We should take the shortcut through the market,” said Lola.\n\n“No way,” replied Femi, folding his arms. “It is always packed on Saturdays.”\n\n“It is still faster than waiting for the bus.”\n\n“Fine,” Femi sighed, “but if we lose each other, I am going home.”\n\nLola laughed and grabbed his sleeve. “Then hold on tight and stop complaining.”' },
            { type: 'gap', q: '“Where are you going?” ___ Mum.', options: ['asked', 'asking', 'ask', 'asks to'], answer: 0, why: 'A simple past-tense tag such as “asked” keeps the focus on the words.' }
          ]
        },
        {
          id: 'story-description', title: 'Description and the senses', minutes: 5,
          cards: [
            { title: 'Use the five senses', body: 'Help the reader see, hear, smell, taste and feel the scene. One precise detail is better than many general ones.', examples: [{ text: 'The kitchen smelled of frying onions and pepper.', good: true }, { text: 'The kitchen was nice.', good: false }] },
            { title: 'Vary your sentences', body: 'Mix short sentences for tension with longer ones for description. Start sentences in different ways, not always with “I” or “Then”.' },
            { title: 'Common mistakes', body: 'Piling up adjectives, using only sight, and long descriptions that stop the action.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence uses the senses best?', options: ['Thunder rumbled over the tin roof, and the air smelled of wet earth.', 'The weather was bad.', 'It rained a lot that day.', 'There was rain.'], answer: 0, why: 'It uses sound and smell to create the scene.' },
            { type: 'choice', q: 'Which passage builds tension best?', options: ['The door creaked. Footsteps. Then silence.', 'The door creaked and then there were some footsteps and then it was quiet.', 'There was a door and some footsteps.', 'I heard things.'], answer: 0, why: 'Short sentences slow the reader and build suspense.' },
            { type: 'write', kind: 'story', q: 'Describe a place at night using at least three senses.', minWords: 60, maxWords: 150, checklist: ['Three different senses', 'Precise words', 'Mix of short and long sentences'], model: 'The compound was quiet except for the crickets. A kerosene lamp flickered on the veranda, throwing long shadows across the sand, and the air still smelled faintly of the evening’s roasted maize. Somewhere a dog barked once. Then nothing. I pulled my wrapper tighter as the cool wind brushed my arms, and I tasted the dust it carried from the empty road beyond the gate.' },
            { type: 'choice', q: 'Which uses a sense other than sight?', options: ['The air smelled of burnt sugar.', 'The room was blue.', 'The sky was bright.', 'The car was red.'], answer: 0, why: 'Smell adds depth.' },
            { type: 'choice', q: 'Which is a simile?', options: ['Her voice was as soft as cotton.', 'Her voice was soft.', 'She spoke.', 'Her voice was a thing.'], answer: 0, why: 'A simile compares using “as” or “like”.' }
          ]
        },
        {
          id: 'story-suspense', title: 'Suspense and pacing', minutes: 6,
          cards: [
            { title: 'What suspense is', body: 'Suspense is the reader’s worry about what will happen next. Create it by hinting at danger, delaying the answer and raising the stakes.' },
            { title: 'Control the pace', body: 'Short sentences and paragraphs speed up action. Longer sentences with detail slow down calm or important moments.', examples: [{ text: 'A noise. Footsteps. Closer. She held her breath.', good: true }] },
            { title: 'Hints and cliffhangers', body: 'Foreshadowing hints at later events (“If only she had checked the brakes”). A cliffhanger ends a section at a moment of danger.' },
            { title: 'Common mistakes', body: 'Overusing “suddenly”, revealing everything at once, and making every scene fast so nothing stands out.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which creates the most suspense?', options: ['The lights went out. Somewhere in the house, a door clicked shut.', 'The lights went out, so they lit a candle and had a nice dinner.', 'The house was normal.', 'They went to bed early.'], answer: 0, why: 'An unexplained sound in the dark makes readers worry.' },
            { type: 'choice', q: 'How do short sentences affect pace?', options: ['They speed it up', 'They slow it down', 'They have no effect', 'They confuse the reader'], answer: 0, why: 'Short sentences feel quick and urgent.' },
            { type: 'choice', q: 'What is foreshadowing?', options: ['A hint about something that will happen later', 'A description of the weather', 'The last line of a story', 'A list of characters'], answer: 0, why: 'Foreshadowing builds expectation.' },
            { type: 'error', q: 'Find the weakest part.', parts: ['Suddenly, the door opened.', 'Suddenly, a man walked in.', 'Suddenly, everyone screamed.', 'Nobody moved.'], answer: 1, fix: 'A man stepped inside.', why: 'Repeating “suddenly” weakens it; remove it and use a sharper verb.' },
            { type: 'choice', q: 'Which ending of a chapter is a cliffhanger?', options: ['She turned the key, and the box began to tick.', 'She went home and slept well.', 'Everything was fine.', 'The end.'], answer: 0, why: 'It stops at a moment of danger.' },
            { type: 'write', kind: 'story', q: 'Write a short suspense scene (5 to 8 sentences) about hearing a strange noise at home during a blackout.', minWords: 40, maxWords: 160, checklist: ['Short sentences to build tension', 'A hint of danger', 'No more than one “suddenly”', 'End on a cliffhanger'], model: 'The fan stopped, and the room went black. I waited for the generator, but it stayed silent. Then I heard it. A slow scrape, like metal on concrete. It came from the kitchen. I gripped my phone and crept forward. The scraping stopped. In the silence, the back door handle began to turn.' }
          ]
        }
      ]
    },
    {
      title: 'Genres and editing',
      lessons: [
        {
          id: 'story-genres', title: 'Genres: fable, mystery, adventure', minutes: 6,
          cards: [
            { title: 'Fable and folk tale', body: 'Short stories, often with animals, that teach a lesson (a moral). Many African folk tales feature the clever tortoise.', examples: [{ text: 'Moral: Greed often leaves you with nothing.', good: true }] },
            { title: 'Mystery', body: 'A puzzle to solve: something is missing or someone did wrong. Plant clues fairly so the reader could guess the answer.' },
            { title: 'Adventure', body: 'A journey or challenge with danger, obstacles and a goal. Keep the pace high and the stakes clear.' },
            { title: 'Common mistakes', body: 'A fable with no clear lesson, a mystery solved by a clue the reader never saw, and an adventure with no real danger.' }
          ],
          exercises: [
            { type: 'choice', q: 'What does a fable usually end with?', options: ['A moral or lesson', 'A recipe', 'A list of characters', 'A question for the reader'], answer: 0, why: 'Fables teach a lesson.' },
            { type: 'choice', q: 'What makes a mystery fair?', options: ['The clues are shown to the reader before the answer', 'The answer comes from nowhere', 'There are no clues', 'The detective is never named'], answer: 0, why: 'Readers enjoy guessing from fair clues.' },
            { type: 'choice', q: 'Which opening suits an adventure?', options: ['The map was torn, the river was rising, and the village was still two days away.', 'Tortoise was greedy, as everyone knew.', 'Someone had stolen the class register.', 'It was a calm afternoon with nothing to do.'], answer: 0, why: 'It sets up a journey, danger and a goal.' },
            { type: 'choice', q: 'Which genre often uses animals to teach a lesson?', options: ['Fable', 'Mystery', 'Science fiction', 'Romance'], answer: 0, why: 'Fables use animals to show human faults.' },
            { type: 'gap', q: 'The moral of the story is that patience ___ rewarded.', options: ['is', 'are', 'were', 'be'], answer: 0, why: '“Patience” is singular.' },
            { type: 'write', kind: 'story', q: 'Write a short fable (6 to 10 sentences) about a tortoise and ending with a moral.', minWords: 40, maxWords: 160, checklist: ['Animal characters', 'A clear problem', 'A consequence', 'A moral at the end'], model: 'Tortoise heard that the king was giving away free yams. He borrowed a large basket and hurried to the palace. However, when he arrived, he filled the basket so full that he could not lift it. While he pushed and pulled, the other animals collected their yams and went home. By evening, the guards closed the gates, and Tortoise was left with nothing. Moral: Greed often leaves you with less than you need.' }
          ]
        },
        {
          id: 'story-editing', title: 'Editing your story', minutes: 6,
          cards: [
            { title: 'Read for the big picture', body: 'Is the problem clear? Does tension rise? Does the character act at the climax? Does the ending feel earned?' },
            { title: 'Then the sentences', body: 'Cut “very”, “really” and “suddenly”. Replace weak verbs (went, said, got) with precise ones (crept, whispered, snatched). Vary sentence openings.', examples: [{ text: 'She crept down the stairs.', good: true }, { text: 'She went very slowly down the stairs.', good: false }] },
            { title: 'Then the accuracy', body: 'Check dialogue punctuation, tense, spelling and paragraphing (new speaker, new paragraph).' },
            { title: 'Common mistakes', body: 'Only fixing spelling, leaving every sentence starting with “I” or “Then”, and keeping scenes that do not move the story forward.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which verb is strongest?', options: ['snatched', 'got', 'took quickly', 'had'], answer: 0, why: '“Snatched” shows speed and force.' },
            { type: 'error', q: 'Find the punctuation error.', parts: ['“Wait for me”,', 'shouted Tolu', 'as the bus', 'pulled away.'], answer: 0, fix: '“Wait for me!”', why: 'Speech punctuation goes inside the closing quotation mark.' },
            { type: 'choice', q: 'Most sentences start with “Then”. What should you do?', options: ['Vary the openings', 'Add more “then”', 'Remove all full stops', 'Change the title'], answer: 0, why: 'Varied openings make writing flow.' },
            { type: 'choice', q: 'A scene does not move the story forward. What should you do?', options: ['Cut it or shorten it', 'Make it longer', 'Move it to the end', 'Add more adjectives'], answer: 0, why: 'Every scene should serve the story.' },
            { type: 'order', q: 'Put the editing steps in order.', parts: ['Big picture: problem, tension, ending', 'Sentences: verbs, openings, cuts', 'Accuracy: punctuation, tense, spelling'], why: 'Fix big problems before small ones.' },
            { type: 'write', kind: 'story', q: 'Improve this paragraph: “Then I went to the shop. Then I saw a man. He was very very scary. Then he said give me your bag. I was very scared.”', minWords: 25, maxWords: 120, checklist: ['Stronger verbs', 'Varied openings', 'Correct dialogue punctuation', 'No “very very”'], model: 'I hurried to the shop as the streetlights flickered on. Near the door, a tall man stepped out of the shadows. His eyes were cold and unblinking. “Give me your bag,” he growled. My heart pounded, and my legs refused to move.' }
          ]
        }
      ]
    },
    {
      title: 'Final assessment',
      lessons: [
        {
          id: 'story-final', title: 'Final assessment: Stories', minutes: 15, kind: 'final',
          cards: [
            { title: 'How this works', body: '13 questions from the whole course: structure, conflict, characters, setting, point of view, dialogue, suspense, genres and editing. Every answer comes with an explanation.' },
            { title: 'Before you start', body: 'This assessment is untimed. For timed practice, take the practice test on the course page afterwards.' }
          ],
          exercises: [
            { type: 'choice', q: 'What drives a story forward?', options: ['A problem the character must face', 'A long description', 'A list of names', 'The title'], answer: 0, why: 'Conflict creates the plot.' },
            { type: 'choice', q: 'A girl fights her fear of water. What kind of conflict is this?', options: ['Character against self', 'Character against society', 'Character against character', 'None'], answer: 0, why: 'The struggle is internal.' },
            { type: 'choice', q: 'What is the climax?', options: ['The moment of greatest tension', 'The opening line', 'The setting', 'The moral'], answer: 0, why: 'The climax is the turning point.' },
            { type: 'choice', q: 'Which shows rather than tells?', options: ['His hands trembled as he opened the envelope.', 'He was nervous.', 'He felt very nervous.', 'Nervous was what he was.'], answer: 0, why: 'Actions reveal the feeling.' },
            { type: 'choice', q: 'Which sentence shows setting through a character?', options: ['Ngozi shielded her eyes from the sand as the wind howled.', 'It was windy and sandy.', 'The setting was a desert.', 'Sand.'], answer: 0, why: 'We experience the setting through her actions.' },
            { type: 'error', q: 'Find the tense error.', parts: ['He grabbed his bag,', 'ran to the gate', 'and jumps', 'onto the bus.'], answer: 2, fix: 'and jumped', why: 'Keep the past tense.' },
            { type: 'error', q: 'Find the punctuation error.', parts: ['“We are late”,', 'said Ade,', 'grabbing', 'his keys.'], answer: 0, fix: '“We are late,”', why: 'The comma goes inside the closing quotation mark.' },
            { type: 'choice', q: 'When does dialogue need a new paragraph?', options: ['Each time a new person speaks', 'Never', 'Every three words', 'Only at the end'], answer: 0, why: 'New speaker, new line.' },
            { type: 'choice', q: 'What effect do short sentences have?', options: ['They speed up the pace', 'They slow it down', 'They make it formal', 'None'], answer: 0, why: 'Short sentences create urgency.' },
            { type: 'choice', q: 'What does a fable end with?', options: ['A moral', 'A cliffhanger', 'A recipe', 'A list'], answer: 0, why: 'Fables teach a lesson.' },
            { type: 'choice', q: 'Which point of view uses “I”?', options: ['First person', 'Third person', 'All-knowing third', 'None'], answer: 0, why: '“I” is first person.' },
            { type: 'choice', q: 'Which ending is weakest?', options: ['It was all a dream.', 'She finally opened the letter and smiled.', 'He never ran from the river again.', 'The village slept safely for the first time in weeks.'], answer: 0, why: 'It cancels the whole story.' },
            { type: 'order', q: 'Put the story arc in order.', parts: ['Opening', 'Rising action', 'Climax', 'Resolution'], why: 'This is the classic story shape.' }
          ]
        }
      ]
    }
  ]
};
