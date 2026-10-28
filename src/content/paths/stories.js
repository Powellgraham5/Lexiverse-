// Better writing: Stories. Lessons and practice written for Lexiverse.
export default {
  note: 'Lessons and practice written for Lexiverse. The automatic checks look at length, paragraphs and dialogue punctuation; they cannot judge your story, so read it aloud and compare with the model.',
  guide: ['Read each lesson’s cards, then try the practice questions.', 'Every lesson ends with a short scene to write: try it before you look at the model.', 'Keep ideas, names and good sentences in your notebook.', 'Check story layout and dialogue rules in Writing formats.'],
  units: [
    {
      title: 'Story shape',
      lessons: [
        {
          id: 'story-structure', title: 'Beginning, middle and end', minutes: 5,
          cards: [
            { title: 'The story arc', body: 'Most stories follow a shape: an opening that introduces the character and setting, a problem that starts the action, rising tension, a climax (the most exciting moment), and a resolution that shows how things end.' },
            { title: 'Every story needs a problem', body: 'Without a problem there is no story. The problem can be big (a flood) or small (a lost key), but the character must want something and struggle to get it.' }
          ],
          exercises: [
            { type: 'order', q: 'Put the parts of a story in order.', parts: ['Opening: character and setting', 'A problem starts the action', 'Rising tension', 'Climax', 'Resolution'], why: 'This is the usual story arc.' },
            { type: 'choice', q: 'What is the climax of a story?', options: ['The most exciting or important moment', 'The first sentence', 'The list of characters', 'The title'], answer: 0, why: 'The climax is the turning point where tension is highest.' },
            { type: 'choice', q: 'Which is the best story problem?', options: ['On the morning of her exam, Zainab’s bus breaks down ten kilometres from school.', 'Zainab has a nice day at school.', 'Zainab lives in Kaduna.', 'Zainab likes blue.'], answer: 0, why: 'It gives the character something she wants (to reach her exam) and an obstacle.' },
            { type: 'write', kind: 'story', q: 'Plan a short story in a paragraph: who the character is, what they want, what goes wrong, and how it ends.', minWords: 60, maxWords: 160, checklist: ['A character with a goal', 'A problem', 'A climax', 'An ending'], model: 'Emeka has saved for months to buy a guitar for the school talent show. Two days before the show, his little sister knocks the guitar off the table and a string snaps. With no money left, Emeka visits an old repairman in the market, who agrees to fix it if Emeka helps in his shop. Emeka works late every evening. On the night of the show, he plays with a borrowed string and wins second place, and the repairman sits proudly in the front row.' }
          ]
        },
        {
          id: 'story-openings', title: 'Openings that hook, endings that land', minutes: 5,
          cards: [
            { title: 'Start in the action', body: 'Strong openings drop the reader into a moment: a line of dialogue, a surprising fact, or a character in trouble.', examples: [{ text: '“Run!” Tola shouted, as the first drops of rain turned the road to mud.', good: true }, { text: 'One day I woke up and brushed my teeth and had breakfast.', good: false, note: 'Slow and ordinary.' }] },
            { title: 'Endings', body: 'A good ending answers the story’s problem and shows how the character has changed. Avoid “and then I woke up and it was all a dream”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which opening hooks the reader best?', options: ['The letter had no stamp, no name and no address, yet it was waiting on my pillow.', 'My name is Ada and I am fifteen.', 'It was a normal day.', 'This is a story about my holiday.'], answer: 0, why: 'It creates a mystery the reader wants to solve.' },
            { type: 'choice', q: 'Which ending is weakest?', options: ['Then I woke up, and it was all a dream.', 'From that day on, Musa never left the gate open again.', 'As the bus pulled away, Kemi finally smiled.', 'The trophy still sits on Grandma’s shelf.'], answer: 0, why: 'A dream ending cancels everything that happened and feels like a cheat.' },
            { type: 'write', kind: 'story', q: 'Write an opening paragraph that starts in the middle of the action.', minWords: 40, maxWords: 120, checklist: ['Start in a moment of action or dialogue', 'Hint at a problem', 'One clear setting detail'], model: '“Don’t look down,” Bisi whispered, but Ade already had. Below the narrow bridge, the river roared brown and fast, carrying branches as thick as his arm. Somewhere behind them, the goats they had been sent to find were bleating, and the sun was already sinking behind the hills.' }
          ]
        }
      ]
    },
    {
      title: 'Bringing it to life',
      lessons: [
        {
          id: 'story-characters', title: 'Characters: show, don’t tell', minutes: 5,
          cards: [
            { title: 'Show feelings through actions', body: 'Instead of naming a feeling, show what the character does, says or notices.', examples: [{ text: 'Musa was nervous.', good: false }, { text: 'Musa wiped his palms on his trousers for the third time and stared at the door.', good: true }] },
            { title: 'Give characters wants and details', body: 'Readers care about characters who want something. One or two specific details (a habit, a phrase they always say) make them feel real.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence shows, rather than tells, that Ngozi is angry?', options: ['Ngozi slammed her bag on the table and refused to look at anyone.', 'Ngozi was angry.', 'Ngozi felt a lot of anger.', 'Ngozi was very, very angry.'], answer: 0, why: 'Actions let the reader feel the anger without being told.' },
            { type: 'choice', q: 'Which detail makes a character most memorable?', options: ['Grandpa hums the same old highlife tune whenever he is worried.', 'Grandpa is old.', 'Grandpa has two eyes.', 'Grandpa is a man.'], answer: 0, why: 'A specific habit gives the character personality.' },
            { type: 'write', kind: 'story', q: 'Show that a character is excited, without using the word “excited”.', minWords: 40, maxWords: 120, checklist: ['No “excited” or “happy”', 'At least two actions or details', 'One thing the character says or thinks'], model: 'Chioma read the message twice, then a third time. She jumped up so fast that her chair tipped over, and she ran to the kitchen waving her phone above her head. “Mum! Mum, they picked me!” she shouted, her words tumbling over each other.' }
          ]
        },
        {
          id: 'story-dialogue', title: 'Writing dialogue', minutes: 6,
          cards: [
            { title: 'Punctuation inside the marks', body: 'Put the spoken words and their punctuation inside the quotation marks. Use a comma before the speech tag.', examples: [{ text: '“We are late,” said Ade.', good: true }, { text: '“We are late”, said Ade.', good: false }, { text: '“Are we late?” asked Ade.', good: true }] },
            { title: 'New speaker, new line', body: 'Start a new paragraph every time a different character speaks. It shows the reader who is talking.' },
            { title: 'Keep tags simple', body: '“Said” and “asked” are usually best. Let the words and actions show the feeling.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which is punctuated correctly?', options: ['“I can’t find my keys,” said Funmi.', '“I can’t find my keys”, said Funmi.', '“I can’t find my keys” said Funmi.', 'I can’t find my keys, “said Funmi.”'], answer: 0, why: 'The comma goes inside the closing quotation mark.' },
            { type: 'choice', q: 'Which is punctuated correctly?', options: ['“Where are you going?” asked Tunde.', '“Where are you going”? asked Tunde.', '“Where are you going,” asked Tunde?', '“Where are you going.” asked Tunde.'], answer: 0, why: 'The question mark belongs to the spoken words, so it goes inside the marks.' },
            { type: 'choice', q: 'When should you start a new paragraph in dialogue?', options: ['Every time a different person speaks', 'Only at the end of the story', 'Every three sentences', 'Never'], answer: 0, why: 'A new speaker gets a new line so the reader can follow the conversation.' },
            { type: 'write', kind: 'story', q: 'Write a short conversation (at least four lines) between two friends who disagree about something.', minWords: 50, maxWords: 150, checklist: ['Quotation marks around speech', 'A new paragraph for each speaker', 'Punctuation inside the marks'], model: '“We should take the shortcut through the market,” said Lola.\n\n“No way,” replied Femi, folding his arms. “It is always packed on Saturdays.”\n\n“It is still faster than waiting for the bus.”\n\n“Fine,” Femi sighed, “but if we lose each other, I am going home.”\n\nLola laughed and grabbed his sleeve. “Then hold on tight and stop complaining.”' }
          ]
        },
        {
          id: 'story-description', title: 'Description and the senses', minutes: 5,
          cards: [
            { title: 'Use the five senses', body: 'Help the reader see, hear, smell, taste and feel the scene. One precise detail is better than many general ones.', examples: [{ text: 'The kitchen smelled of frying onions and pepper.', good: true }, { text: 'The kitchen was nice.', good: false }] },
            { title: 'Vary your sentences', body: 'Mix short sentences for tension with longer ones for description. Start sentences in different ways, not always with “I” or “Then”.' }
          ],
          exercises: [
            { type: 'choice', q: 'Which sentence uses the senses best?', options: ['Thunder rumbled over the tin roof, and the air smelled of wet earth.', 'The weather was bad.', 'It rained a lot that day.', 'There was rain.'], answer: 0, why: 'It uses sound and smell to create the scene.' },
            { type: 'choice', q: 'Which passage builds tension best?', options: ['The door creaked. Footsteps. Then silence.', 'The door creaked and then there were some footsteps and then it was quiet.', 'There was a door and some footsteps.', 'I heard things.'], answer: 0, why: 'Short sentences slow the reader and build suspense.' },
            { type: 'write', kind: 'story', q: 'Describe a place at night using at least three senses.', minWords: 60, maxWords: 150, checklist: ['Three different senses', 'Precise words', 'Mix of short and long sentences'], model: 'The compound was quiet except for the crickets. A kerosene lamp flickered on the veranda, throwing long shadows across the sand, and the air still smelled faintly of the evening’s roasted maize. Somewhere a dog barked once. Then nothing. I pulled my wrapper tighter as the cool wind brushed my arms, and I tasted the dust it carried from the empty road beyond the gate.' }
          ]
        }
      ]
    }
  ]
};
