export const AxiomCategory = {
        numbers: 0,
        addition: 1,
        multiplication: 2,
        exponents: 3,
}


export const chapters = [
        {
                path: 'levels/chapter-1/',
                name: 'The Apprentice',
                mathName: 'Tutorial World',
                levels: [
                        {
                                name: 'Basic Alchemy',
                                urlName: 'basic-alchemy',
                                lemmaName: 'reflection',
                                newAxioms: [],
                                goal: '(a b c : nat) : ((a + b) + c) = ((a + b) + c)',
                                story: `
You wake up to find yourself in a soft bed in a lush, green village. Outside your window, you see the giant golden bell overlooking the walled-in school-town.

It’s been two weeks since you began alchemy school. The school is small, with only thirty students each apprenticed to a wizard, and one Principal known only as the Second Sage. The Second Sage is the keeper of the spell-book, the most powerful object in the world. Wars have been fought over this book since the beginning of time. 

Most of the apprentices have been here for multiple years and are waiting on the Principal's leave to graduate. They’ve learned beautiful, powerful spells. But not you. Your wizard, who hasn’t shown up on time once this year, is somewhat forgetful. His last student quit before three months had passed, and if he doesn’t soon teach you a spell that does anything useful, you might do the same.

As you arrive at the blood-red apple orchard  where you are scheduled to meet him, you try out the only spell you know: a reflection. A reflection is really, really simple. You can transform an object into another object — but only if you can prove this transformation’s Lemma.

You pull down one of the apples in the tree above you and notice a dark brown spot. Fortunately, you know how to transform the apple with a reflection: the magic formula to remove a blemish is “a + b + c = a + b + c”. To cast the spell, you must prove the lemma.
`,
                                help: `
Welcome to LemmaCraft! Every level will be focused on proving one lemma. To do this, we will set the lemma to be our goal and manipulate the goal until we’ve proven the lemma. “a + b + c = a + b + c” is this level’s lemma and goal: if you can make both sides of the goal exactly the same, you prove the lemma; meaning that if you can show that “a + b + c” is indeed the same thing as “a + b + c” then you can confidently say that “a + b + c = a + b + c”. This might seem obvious, but in the future both sides of the lemma will not be the same, and you’ll have to manipulate the equation to show that the lemma is true.

This screen is where you prove the goal is exactly the same. On the left is your Lemma list. This is like your “toolbox” with some helpful tools. On your right is your work bench. This is where you can manipulate these magic formulas. Notice that in the middle of the work bench are three draggable blocks. These are your hypotheses, and the three in this level will not be used (If you’re curious, “a : nat” means “a is a natural number,” but we won’t use these just yet).

At the top of the work bench is your goal, “a + b + c = a + b + c”. Fortunately, both sides of the equation are exactly the same. You can cast a reflection by double-clicking the goal.

Go ahead! Double click.
`
                        },
                        
                        {
                                name: 'A New Spell',
                                urlName: 'a-new-spell',
                                newAxioms: [],
                                lemmaName: 'rewrite',
                                goal: '(x y : nat) (y = x + 7) : (2 * y) = (2 * (x + 7))',
                                story: `
As you cast the reflection, the apple begins to transform. Slowly, like a block of ice in the sun, the spot on the apple melts into a smooth, enchanting crimson.

“Hoy! Simon!” You look over your shoulder to find Magi Grambletόn, your assigned wizard, sitting on a fallen tree. He removes his pointy gray hat as he stands up. “I’ve been thinkin’: you know these basic reflection spells pretty well. Mighty fast learner. How’s about we learn a new spell?”

“Yes, I’d love to. What kind of spell?” you ask. Of course you are ready for a new spell. You’ve been ready since the second day of school, after he taught you to do a reflection.

“A powerful spell: a rewrite. Powerful indeed! Many lemmas you can make with it. And some of these lemmas have powerful magic in them. Shall we try turning this beautiful apple into an orange now?”

`,
                                help: `
To prove this lemma, we will have to use a new ability: a rewrite. Rewrites allow you to manipulate goals into something you can use a reflection to solve.

To perform a rewrite, use one of your hypotheses. Remember that the hypotheses are the draggable blocks in the middle of your workbench. Notice that if you substitute “x + 7” into the equation for “y”, the equation becomes symmetrical on both sides. Drag the hypothesis “y = x + 7” onto the goal and watch it transform. 

Now, both sides are equal and you can cast a reflection by double-clicking on the goal.
`
                        },

                        {
                                name: 'The Axioms',
                                urlName: 'the-axioms',
                                newAxioms: [
                                        {name: 'succ',     raw: '(n : nat) : succ n : nat',                             category: AxiomCategory.numbers},
                                        {name: 'zero',     raw:'0 : nat',                                               category: AxiomCategory.numbers},
                                        {name: 'add',      raw:'(n1 n2 : nat) : n1 + n2 : nat',                         category: AxiomCategory.addition},
                                        {name: 'add_zero', raw:'(n1 : nat) : n1 + 0 = n1',                              category: AxiomCategory.addition},
                                        {name: 'add_succ', raw:'(n1 n2 : nat) : (n1 + (succ(n2))) = (succ (n1 + n2))',  category: AxiomCategory.addition}
                                ],
                                lemmaName: 'axioms',
                                goal: '(m n : nat) : ((m + n) + 0) = (m + n)',
                                story: `
Drops of blood-red paint fall from the apple as it melts into a picture-perfect orange. Two months ago you would never believe your eyes at this, but ever since you’ve joined alchemy school you’ve seen dozens of such transformations.

You practice more. For two months, you show up daily and practice using the rewrite spell. At first, it’s just fruits that you transform, but before long you’ve made trees straighten, put out a fire, and even treated an injury.

One day, Magi Grambletόn brings five polished silver bars to your training. “These here are axioms,” he says. “With these wonderful little tools you can rewrite almost anything. Many of these to collect, there are. But these five will meet our needs for now. Now, let me show you a spell to shave the bark off this log. This is important in the wild, you know, if you need to make a fire.”

You put the silver bars in your toolbox and begin to de-bark the log.
                                
                                `,
                                help: `
An axiom in math is something we assume to be true but can’t necessarily prove because it is fundamental to the system. For example, we must assume that adding zero to a number keeps it the same. Thus, the zero identity for addition is an axiom; think of it as part of the definition of addition. Notice the axioms appearing in your toolbox on the left pane. You have five axioms, all dealing with either natural numbers or addition. Recall that natural numbers are all integers greater than or equal to 0:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9, …

Here is a short description of all the axioms:

<strong>zero</strong>: This axiom ( 0 : nat ) says that zero is a natural number. If you ever need to substitute 0 in to represent a natural number, use this.

<strong>succ</strong>: succ (short for successor) says that the successor of a natural number is a natural number. Thus, for any natural number n1, the successor of n1 (denoted succ n1) is a natural number. For example, the successor of 0 is 1: succ 0 = 1 (this is the definition of “1”). Thus, 1 is a natural number. 

All natural numbers can be defined as either zero or the successor of another natural number. For example 10 is the successor of 9, 3 is the successor of 2, and 0 is a natural number by definition.

<strong>add</strong>: The sum of two natural numbers is a natural number. For example, 2 and 3 are both natural numbers, and 2 + 3 = 5. Thus, 5 is a natural number.

<strong>add_zero</strong>: Adding zero to a number keeps it the same. For example, 4 + 0 = 4. If you have a goal of the form “x + 0 = x” you can use this lemma to rewrite it into “x = x”.

<strong>add_succ</strong>: This is the most complicated lemma of them all — it’s a recursive definition for addition. We’ll discuss this axiom in detail in the next level.

To use an axiom, click on it on the left to bring it onto the workbench. For example, this level has the following goal:

m + n + 0 = m + n

Note that this math system treats “m + n + 0” as “(m + n) + 0”.

Adding zero to a natural number (m + n is a natural number because m and n are natural numbers) is equivalent to just that natural number. So, click on “add_zero”. The following hypothesis is added to the workbench:

(n1 : nat) : n1 + 0 = n1

This means that for any natural number n1, n1 + 0 = n1. Thus we can substitute anything for n1 and the statement would be true — for instance, we could substitute “m + n” for n1 because “m + n” is a natural number. The program can usually guess at what you want to substitute when you drag a hypothesis onto the goal.

Go for it, drag this “add_zero” hypothesis onto your goal.
`
                        },
                        
                        {
                                name: 'Now We\'re Adding',
                                urlName: 'now-were-adding',
                                newAxioms: [
                                        {name: 'one', raw:'1 : nat',  category: AxiomCategory.numbers},
                                        {name: 'one_eq_succ_zero', raw:'(1) = (succ 0)',  category: AxiomCategory.numbers},
                                        {name: 'two', raw:'2 : nat',  category: AxiomCategory.numbers},
                                        {name: 'two_eq_succ_zero', raw:'(2) = (succ 1)',  category: AxiomCategory.numbers},
                                ],
                                goal: '(1 + 1) = (2)',
                                lemmaName: 'one_plus_one',
                                story: `
Sure enough, the bark dissolves into the wood. Magi Grambletόn, impressed, says aloud, “I thought it would take weeks to learn this. Nothin’ left for today's session I guess.”

You exhale in disappointment: disappointment in your assigned wizard, in your snail’s pace lessons, and most of all, in your unsatisfied desire for greatness. It has now been two months since you’ve started learning alchemy, and you feel miles behind everyone else.

Walking back to the center village, pondering on your life, you hear the golden bell start ringing. At first you think it’s the dinner bell, but the bell doesn’t make the jingle you love hearing. Then you imagine a ceremony, perhaps someone had finally graduated, but in your time the only ceremony at the school was planned for weeks and you surely would have heard about it.

The bell continues to ring. You have a growing feeling that something has gone terribly wrong. You start to run. You’re several miles away from the village but you hardly notice the distance. Within a couple of minutes you arrive at the large black door at the entrance to the town. 

The door is shut, which is rather odd for this time of day. But what’s even more strange is that it won’t open. In fact, your key won’t open it, which you discover after you fail to unlock it. No, something far worse has happened: a sealing spell was cast on the door, which you discern after trying to cast a spell to break the door.

To open it, you’ll need to use a counter-spell, something you’ve only seen a glimpse of in books. 

You vaguely recall a counter-spell cast from the lemma “1 + 1 = 2,” but don’t recollect whether that is the correct one. You decide to give it a shot.

                                `,
                                help: `
To prove this lemma, you’ll need to make use of a few new axioms that define 1 and 2:

<strong>one</strong>, <strong>two</strong>: These two axioms introduce the natural numbers 1 and 2. 

<strong>one_eq_succ_zero</strong>, <strong>two_eq_succ_one</strong>: These two axioms define 1 and 2 as the successors of their previous numbers.

This theorem requires the use of the “add_succ” axiom. This defines addition for all numbers other than zero, and it does so recursively. Recursively means that you may need to apply it a number of times to add some numbers. To use “add_succ”, you must have something of the form “a + succ b.” Then, you can cast a rewrite and change it to the form “succ a + b.” While this isn’t immediately helpful, eventually you can rewrite this expression into “succ m + 0” and use “add_zero” to simplify to “succ m.”

For example, to solve 0 + 2 with this definition of addition, one would proceed as follows:

0 + 2
0 + succ 1 ← apply definition of 2 as the successor of 1
succ ( 0 + 1 ) ← apply “add_succ”
succ ( 0 + succ 0 ) ← apply definition of 1 as the successor of 0
succ ( succ ( 0 + 0 ) ) ← apply “add_succ”
succ ( succ 0 ) ← apply “add_zero”
succ 1 ← apply definition of 1 as successor of 0
2 ← apply definition of 2 as successor of 1

Thus, 0 + 2 = 2.

To begin solving this lemma, apply the “one_eq_succ_zero” axiom.
`
                        },
                        
                        {
                                name: 'A Dark Day',
                                urlName: 'a-dark-day',
                                newAxioms: [],
                                goal: '(n : nat) : (0 + n) = (n)',
                                lemmaName: 'zero_add',
                                story: `
The spell works, and the door opens. A sudden horror overtakes you, as if the sealing spell on the door had masked some form of evil inside the village.

You notice hundreds of small footprints stampeding across the town. These are not human footprints, nor animal footprints, but something in between. You’ve heard stories of dwarves, goblins, and even conscious animals, but have never seen anything of the sort before.

Suddenly, a flash of light and a thunderous boom rock the complex. It came from the library, residence of the Second Sage, and appeared as if lightning struck the ground without a streaking flash from the sky. Running towards the library, you see a horrible sight. A wizard, Magi Crageono, lies on the floor unconscious, and his pupil Charlie lies next to him. Sharp arrows with silver heads and green shafts decorate their bodies. You put your ear to their chests, but hear no heartbeat.

These were the first dead bodies you’ve seen in your life. As you fight back tears, a spirit of revenge overtakes you. You follow the footprints to the library and stumble past the body of the ugliest creature you’ve ever seen. It was a goblin, for it had pale green skin, pointy ears, and skin drier than a raisin. Of course it was a goblin; you’ve heard of goblin raids (though you’ve never seen one), and the curses that they left on the ransacked villages as they left.

The library was engulfed in darkness; even though the sun shone on it, it seems that darkness shone out of the ground and veiled the building from the sun. You’ve never seen something like this before — you begin to shiver in the cold void around the library.

The Second Sage walks out of the open-doored building, coughing, and you notice that his once-vibrant eyes have become gray.

“Principle, what has happened?” you ask aloud. You bow in respect but he doesn’t notice you, for he has been blinded.

“My child,” he says, coughing. “We’ve been ambushed. Goblins, many goblins. They took *cough* the spell-book. It is a dark day.” Suddenly he collapses to the floor. “I don’t expect myself to live *cough* *cough* much longer. Before I go, I have one spell I want to teach you. A spell of Induction. With this you can cast powerful spells. Try *cough* casting the spell *cough* 0 + n = n.” 

With this, he teaches you how to perform an Induction.
                                `,
                                help: `
To perform an induction, first decide what variable you would like to induct on. In this case, there is only one variable, “n”. To perform induction on “n” first select the definition of n (“n : nat”) and drag it over the “i” that’s to the right of the goal.

After performing the induction, notice at the bottom right of the workbench “Goal 1/1” has changed to “Goal 1/2". This is because an induction creates two goals (If you want to toggle between the goals you can click on this button).

Recall that all natural numbers are either zero or the successor of another natural number. Thus, if we can prove that a statement is true for zero, and if we can prove that is true for the successor of zero, and the successor of that number, and so on, then the statement is true for all natural numbers.

First, we must prove that “0 + n = n” is true when n equals zero. Thus we need to prove 0 + 0 = 0. We already know that for any natural number a, a + 0 = a, so we can use add_zero to prove this step. This is the first goal — go ahead and use add_zero to prove 0 + 0 = 0.

Now, there is one goal left, and we need to prove that “0 + succ h = succ h,” given that “h” is an arbitrary natural number and that “0 + h = h”. Remember, all natural numbers are either zero or a successor of another natural number. So if we can prove a statement is true for zero, and that a statement is true for the following natural number given that it is true for one natural number, we will eventually prove it for all natural numbers. 

For example, to prove 0 + 3 = 3, we would assume 0 + 2 = 2 and prove 0 + succ 2 = succ 2 (this is easier than 0 + 3 because we know how to do add_succ). We would prove 0 + 2 = 2 by assuming 0 + 1 = 1, and we could prove this assumption that 0 + 1 = 1 by assuming 0 + 0 = 0. However, we’ve already proven that 0 + 0 = 0, so it follows that 0 + 1 = 1, 0 + 2 = 2, 0 + 3 = 3, and so on for all natural numbers.

Therefore, if we can prove 0 + succ h = succ h for any arbitrary h, given that 0 + h = h, as we do in this second goal, we complete the proof that 0 + n = n for any arbitrary n.

Go ahead! Use add_succ to prove this. By proving both steps of the goal you prove 0 + n = n.
`
                        }
                ]
        },


        {
                path: 'levels/chapter-2/',
                name: 'Goblin Hunting',
                mathName: 'Addition World',
                levels: [
                        {
                                name: 'The Sage Dies',
                                urlName: 'the-sage-dies',
                                newAxioms: [
                                        {
                                                name: "zero_add",
                                                raw: "(n1 : nat) : (0 + n1) = (n1)", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b c : nat) : (a + (b + c)) = ((a + b) + c)',
                                lemmaName: 'add_assoc',
                                story: `
A cloud of mist steams out of the ground, making a soft fizzle, and as it dissipates a heavy leather-encased book with thin, golden pages appears in its place. The book is titled <em>Principia Mathematica</em>, and the first page in the book is titled “zero_add,” followed by instructions to prove the previous lemma.

“Complete the book,” the sage whispers frailly, softly gripping your hand. “Complete the book, and reclaim the artifact. You must not fail; the fate of the Earth… the fate of the stars… and the fate of the cosmos… all of it lies at your feet. And Simon… you are… destined…” His breath stops. He lets go of your hand. The Second Sage has died.

“Chosen for what? Chosen for what? Don’t leave me!” you cry out. A lone tear falls onto his hand. You’ll never admit to it, but tonight you will shed many tears. But not now. Now you must follow the goblins.

You begin to run. Vengeance floods through your blood, and your feet fly over the wall, through the forest, and to the river. When you arrive at the river, you find the bridge freshly destroyed and footprints on the other side. You conclude that the goblins are at fault, grit your teeth, and look for something to bridge across with. You walk over to take a look at a log lying nearby, but as you set your new spell book down to gauge its weight, you notice a crimson red bookmark marking one of its pages. That bookmark was not there before, so you open up to the page it marked. On the bookmark, a message reads, “This is a magic bookmark. Heed its instructions.” The bookmark was signed <em>The Second Sage</em>. 

The page has a beautifully written script with a heading that reads “add_assoc”. Underneath it is a lemma, much like “zero_add”, which reads “(a b c : nat) : a + ( b + c ) = a + b + c”. There is no proof of the lemma, and you infer that you must prove this lemma and cast its spell.

                                `,
                                help: `
This lemma is the associative property of addition. To get started, perform induction on one of the variables. Which variable do you think will be easiest to induct on? Remember, your current axioms allow you to operate on the rightmost variable most easily. For instance, a + succ b is manipulatable while succ a + b is not, at least for now. 

Also, notice that your previous lemma is available in your toolbox along with your axioms (“zero_add”).
`
                        },

                        {
                                name: 'Map to the Island',
                                urlName: 'map-to-the-island',
                                newAxioms: [
                                        {
                                                name: "add_assoc",
                                                raw: "(n1 n2 n3 : nat) : (n1 + (n2 + n3)) = ((n1 + n2) + n3)", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b : nat) : ((succ a) + b) = (succ (a + b))',
                                lemmaName: 'succ_add',
                                story: `
As you finish the spell, something wonderful happens. The water in front of you starts to bubble, and suddenly dries up, leaving a gravel floor for you to traverse. As you walk through the river with a wall of water on both sides, you can’t help yourself from opening your mouth in wonder. A large orange fish swims even with you, followed by a smaller blue one, and by the time you cross the river more than a dozen colorful river-fish accompany you on either side. It warms your heart, even if just for the moment.

But you cross the river, the water floods back into its place, and the moment ends. You journey to the port-city of Addithia, where you hope to gather more information about the goblins. You are still following the path of footprints, but they grow fainter and fainter as the ground you run on becomes less muddy and more dry. You arrive at Addithia as the sun meets the horizon and the sky begins to darken. You can no longer see any footprints, but to the north, beyond the well-kept wooden docks, you see a ship setting sail with the goblin’s signature sword-handle proudly displayed on its sail. Here you sleep for the night and prepare for the following day’s journey.

In the morning, you inquire the local villagers about the goblin’s destination. One of them claimed to have heard of a “Goblin Island,” but could not recall any other details. Another said they’ve once seen a map to the Goblins, but couldn’t remember where they saw it. Finally, they met a sailor with graying golden hair and a large frame who vaguely said, “Aye. I lived there once.” After saying this he looked down back at his rope and tied a knot in it.

“Can you show me the way?” you ask, hopeful that this stranger was telling the truth. “They took something immensely potent from my village — a spell book — and they could do great evil with the powers of that book.”

“I escaped Goblin Island with my ship when I was a young child. There was a map inside of the boat, painted beautifully on a piece of parchment, but it was destroyed in a fire. Its remains are hung in the northern wall of the bait shop. I have no intention of returning.”

“Well… I might be able to do something about that map.” You hope that your magic bookmark can save you once again.

He skeptically takes the parchment off of the wall and lays the parchment in front of you, and you see the strokes of ink decorate what once was a burnt map. You open your own spell book and find the bookmark in a new place. 

The lemma is titled “succ_add” and it teaches you an important prerequisite to the commutative property, which is a very powerful spell. Prove “succ_add”, cast the spell, and restore the map!

                                `
                        },

                        {
                                name: 'Gale\'s Awakening',
                                urlName: 'gales-awakening',
                                newAxioms: [
                                        {
                                                name: "succ_add",
                                                raw: "(n1 n2 : nat) : ((succ n1) + n2) = (succ (n1 + n2))", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b : nat) : (a + b) = (b + a)',
                                lemmaName: 'add_comm',
                                story: `
Sure as day, the map begins to foam over, resulting in a beautiful, detailed map with tight coastlines, beautiful script, and careful paints. The map shows the east coast of the continent Nicholea, and includes a dot marking the village you reside in now, Addithia. The ocean, blue, vast, and empty, spans for a hundred miles to the east, until it meets a large green island marked with a sword handle thrust into a skull labeled “Goblin Island.”

“There lie the bones of my parents and my brother.” As the sailor said this he took a step back and bit on his lip.

“Will you take me there? And avenge your family? The fate of all Nicholea may lie on this quest.”

He paused for a moment. “Aye. I will. We’ll leave with the evening wind. Goblin blood will be shed in memory of my father.”

That evening, you board Gale’s ship — you learned his name from the shopkeeper of the town — and you stare off into the empty ocean. Two dozen sailors, soldiers, and farmers accompany you, but you doubt that that will be enough to overtake the goblins. After all, two dozen wizards was not enough to stop the goblins. Much of your company is far too skinny to be of use in battle. But you remind yourself: you don’t need to defeat the goblins, just find the spell-book and bring it back.

Gale comes down from the upper deck. “We have no wind with us tonight, and this is not a rowing boat. We must wait until the morning, unless your magic can do anything about it.”

Indeed, controlling the wind is a difficult spell to cast, but it is an important spell. The magical bookmark opens to a new page, this one marked with a small star to signal its importance.

In this lemma, “add_comm”, you prove the commutative property of addition. This is one of the most important lemmas of addition. You should be well prepared to handle this monumental proof!

                                `
                        },

                        {
                                name: 'The Wind Obeys',
                                urlName: 'the-wind-obeys',
                                newAxioms: [
                                        {
                                                name: "add_comm",
                                                raw: "(n1 n2 : nat) : (n1 + n2) = (n2 + n1)", category: AxiomCategory.addition
                                        },
                                ],
                                goal: '(n : nat) : (n + 1) = (succ n)',
                                lemmaName: 'add_one',
                                story: `
A song bird flies overhead, alone, whistling a lovely tune as it travels east. Suddenly a small flock of seagulls follow it, and before you know it, hundreds of birds, all flying east, fill the sky. A small breeze comes from the west and you think you hear a song playing in the wind. The wind picks up, and Gale, surprised at your ability to actually command the wind, hangs his mouth open in wonder. “That settles it,” he says. “We leave tonight!”

Gale commands the crewmates to open the sail, and you begin your voyage. The journey is not long, and you expect to only be on the water for one night and one day. For the night, the sky remains clear, and the full moon shines upon your deck.

As the sun rises the following morning, you can see the island growing in the distance. The island is circular and has a diameter of about 2 miles. There is a large distinguishing mountain in the center of it with smaller hills shielding it. As you get closer, Gale points to one of the hills. “That’s where my family once lived. We didn’t even know about the goblins, but one night, while I was away tending the sheep, I heard bells ringing and immediately ran home. Three lifeless bodies lay on the floor.” You think back to the goblin raid of your own school village. Gale continues, “We’ll sail to land near my old home. But Simon, if you have any more magic in you, cast a cloaking spell upon this ship so that we may anchor unnoticed.”

You open your spell book and find the bookmark. 
`,
                                help: `
This lemma creates a shorthand for the addition of one. You do not need to use induction on this level. Begin by applying “one_eq_succ_zero” and simplifying from there. In general, whenever you have a non-zero number in the goal, it is best to start by applying the definition of that number and simplifying from there.

—

Now that you’ve built up a stack of lemmas, it may be tedious to search through them and keyboard shortcuts become very helpful:

To quickly navigate to the search bar, type “ / ”. Then, search for the lemma you want to introduce. It’s a good idea to try to learn the naming conventions of these lemmas, as this will make solving them much faster.

When the lemma you want to introduce is at the top of the search, press enter to move it onto the workbench. 

If you don’t want to bring it onto the workbench but immediately want to do a rewrite on the goal, press “ctrl + enter” and the goal will be rewritten. 

Once both sides of the equation are the same, press “ctrl + j” to reflect (same as double clicking on the goal). 

To move between levels, use the square brackets to move to the previous ( “[” ) and next ( “]” ) levels.

Try solving this level without using your mouse at all. Getting comfortable with keyboard shortcuts will be more and more helpful as the number of lemmas in your book increases. 
`
                        },

                ]
        },


        {
                path: 'levels/chapter-3/',
                name: 'The Cave and the Mountain',
                mathName: 'Multiplication World',
                levels: [
                        {
                                name: 'A Sealed Door',
                                urlName: 'a-sealed-door',
                                newAxioms: [
                                        {
                                                name: "add_one",
                                                raw: "(n1 : nat) : (n1 + 1) = (succ n1)", category: AxiomCategory.addition
                                        },
                                        {
                                                name: "mul",
                                                raw: "(n1 n2 : nat) : n1 * n2 : nat", category: AxiomCategory.multiplication
                                        },
                                        {
                                                name: "mul_zero",
                                                raw: "(n1 : nat) : (n1 * 0) = (0)", category: AxiomCategory.multiplication
                                        },
                                        {
                                                name: "mul_succ",
                                                raw: "(n1 n2 : nat) : (n1 * (succ(n2))) = ((n1 * n2) + n1)", category: AxiomCategory.multiplication
                                        }
                                ],
                                goal: '(m : nat) : (0 * m) = (0)',
                                lemmaName: 'zero_mul',
                                story: `
As long as you stay on the ship, you are undetectable by the goblins. You can see your crew and you can see the ship, but goblin-targeted magic veils you and the ship from their sight.

You anchor out two hundred meters from the island and take the ship’s row boats to the shore. While walking along the beach, you find three axioms lying on the ground, each as silver and as smooth as the ones you received at the academy. You take them and put them into your bag. 

You then hike up the hill and examine the island. Gale claims that his family lived underneath this hill, but he cannot find the door to enter. He looks at you and says, “I dearly wish to visit my home while I’m here. The door was once here, I think, but has been destroyed. Can you do something about it?”

You open your spell-book and begin to cast the spell. 

                                `,
                                help: `
The three new axioms define multiplication recursively:

<strong>mul:</strong> The multiplication of two natural numbers is another natural number.

<strong>mul_zero:</strong> The multiplication of any natural number by zero is zero.

<strong>mul_succ:</strong> This axiom defines multiplication of any non-zero number: Any non-zero number can be written as “succ b” for some number b, thus mul_succ defines multiplication for any natural numbers a and b: 

a * succ b = a * b + a

You can intuit why this is true by imagining it written like this:

a * succ b 
= a * ( b + 1 ) 
= a * b + a * 1 
= a * b + a

To prove this lemma, begin by applying induction on <em>m</em> by dragging “m : nat” onto the “i” next to the goal.

                                `
                        },
                        {
                                name: 'This Is No Home.',
                                urlName: 'this-is-no-home',
                                newAxioms: [
                                        {
                                                name: "zero_mul",
                                                raw: "(n1 : nat) :( 0 * n1) = (0)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(m : nat) : (m * 1) = (m)',
                                lemmaName: 'mul_one',
                                story: `
As you say the final words of the spell, the ground shakes, and a hole opens in the hill exactly where Gale remembered. Gale brings his hand up to his mouth, pondering silently in awe of your magic. He leads the way into the hill, and you follow. Everyone else chooses to stay outside. As you enter the opening, you hear strange voices whispering to you. You cannot make out most of what they are saying, but you do hear the words “run away.” You begin to shake nervously.

A cold darkness envelopes you as you walk through the cave. You turn around, looking for the sunlight, but a dark cloud shields any light from the outside. You continue forward, looking for Gale, and you trip on something you cannot see, face-planting into the cold stone floor. As you get up, you reach for your spell-book and open to the bookmark. A soft glow emits from the letters in the spell-book, illuminating instructions in the book and a new lemma to prove. The bookmark’s text has changed; it now reads “Where there is light there can be no darkness.”

This lemma is called “mul_one” and is the identity property of multiplication. You close your eyes and begin to work the lemma.
                                `
                        },
                        {
                                name: 'It\'s a Tomb!',
                                urlName: 'its-a-tomb',
                                newAxioms: [
                                        {
                                                name: "mul_one",
                                                raw: "(n1 : nat) : (n1 * 1) = (n1)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(m : nat) : (1 * m) = (m)',
                                lemmaName: 'one_mul',
                                story: `
Luminescent flowers bloom above your head and a hissing sound fills the cave, like hot water mixing with oil. The dark fog dissipates until it is nearly gone, and the sun fills the cave with a warm light. You call out for Gale but hear no response.

You venture further into the tomb, examining the detailed engravings that were carefully cut into the stone walls of the tomb. A faded green paint can be seen highlighting parts of the wall, and you suspect that the wall tells a story. Indeed, the engravings depict a goblin army on a large sailboat, landing on an island, and a human family hiding underground. The engravings were in fact telling the story of this island, and someone from Gale’s family was responsible for their creation. As you come to the end of the hallway, an engraving catches your eye. This one has the most detail and shows three people, one smaller than the other two, embracing, with tears running down their neck. Meanwhile, the cave’s opening was covered by a large rock, and a young boy stood outside, crying against the sealed entrance. This young boy was Gale.

You take a step back, breathing heavy, and call out for Gale once more. This time you hear a solemn response: “Come here.” You follow the voice, which leads you into a dark, foggy hallway. A single white flower hanging from the ceiling highlights the end of it, and the bodies of three dead people lay on the floor in the light. You bump into Gale’s large frame, unable to see it in the dark. “Can you, wizard, bring them back?” He turns to face you. Tears are running down his face. “Is there power in you to raise them?” 

You open your book, but a feeling of guilt runs over you. Are you allowed to do this? You shake your head and find the bookmark. The message on the bookmark has changed again. “Power over life and death is not to be reckoned with.” Your breath quickens.

“Please?” Gale asks, looking you in the eyes. You have to make a choice. You feel Gale’s emotion tugging at you while you weigh your options.

Guilt overtakes you; you begin to cast the spell.
                                `
                        },
                        {
                                name: 'Family Reunion',
                                urlName: 'family-reunion',
                                newAxioms: [
                                        {
                                                name: "one_mul",
                                                raw: "(n1 : nat) : (1 * n1) = (n1)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(t a b : nat) : (t * (a + b)) = ((t * a) + (t * b))',
                                lemmaName: 'left_distrib',
                                story: `
The cave begins to shake. You made a big mistake. Why wouldn’t you listen to the bookmark? Are Gale’s wishes more important than your life? You start running out the cave, but when you look back, Gale is hanging back, and on one knee he kneels next to his family’s soulless bodies. The bodies, each nearly as dry as a skeleton, begin to animate slowly. The largest body, probably Gale’s father, wearily lifts his hand to Gale’s face to wipe away a tear. You leave the room before you can see anything else.

The entrance of the cave collapses as you sprint out of the cave, leaving a mess of rubble. You cannot enter the cave. Gale is now trapped, and you will never see him again. You instruct the sailors, who have been anxiously waiting outside of the cave, to make camp; tonight you will mourn Gale’s loss. Though he is not dead, you fear going back into the cave. Something about the cave seems dark, like a night that won’t end, and you interpret that as a warning to avoid the cave. In the morning you will set out for the goblin dungeon and try to find the book.

Cast this lemma’s spell to make food for the camp. 

                                `,
                                help: `
This lemma is the distributive property, and it is one of the most important lemmas in multiplication. More specifically, this is known as left distributivity (called left_distrib) because the “t” is on the left side of the multiplication symbol. We will prove right distributivity later.
`
                        },
                        {
                                name: 'Terrible Thunder',
                                urlName: 'terrible-thunder',
                                newAxioms: [
                                        {
                                                name: "left_distrib",
                                                raw: "(n1 n2 n3 : nat) : (n1 * (n2 + n3)) = ((n1 * n2) + (n1 * n3))", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b c : nat) : ((a * b) * c) = (a * (b * c))',
                                lemmaName: 'mul_assoc',
                                story: `
The next morning, before the sun rises and while the sky is still dark, you and your companions set off for the mountain. The mountain was no more than ten miles away, but you want to get an early start and delay your confrontation no more. Last night you grieved for Gale and his family; today you must avenge him. As you draw nearer to the mountain your path loses its lush green cheer and everything becomes dry and lifeless. This affects your company; for by the time you arrive at the footsteps of the mountain and the slope steepens, the soldiers and sailors following you are disheartened; several of them are shaking, worried they’ll die in battle.

Abruptly, a voice not unlike a goblin’s booms from the top of the mountain, cackling mischievously. The voice is unnaturally loud and deep; like thunder without the lightning. Following it, words, still thundering and terrible, echo across the sky.  The words sound like magic that you recognize yet can’t put a finger on. Dark storm clouds begin to collect near the top of the mountain’s snowy peak.

The words, carried by thunder, grow louder as you draw nearer to the top of the mountain. The voice suddenly grew angry and shouted something in a foreign language. The voice shakes the rocky surface you walk on, and lightning strikes the peak of the mountain as if commanded by some evil magic. Snow from the top of the mountain collects into an unnaturally large snowball, more than forty feet across, which rolls down the hill directly at you with a frightening speed. To its left and right piles of snow follow it in an avalanche.

Depleted of options, you open your spellbook to the bookmark, and desperately hope to prove the lemma in time. This lemma is the associative property of multiplication, mul_assoc, and it is essential to manipulating complex equations involving multiplication.

                                `
                        },
                        {
                                name: 'The Sun Rises',
                                urlName: 'the-sun-rises',
                                newAxioms: [
                                        {
                                                name: "mul_assoc",
                                                raw: "(n1 n2 n3 : nat) : ((n1 * n2) * n3) = (n1 * (n2 * n3))", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b : nat) : ((succ a) * b) = ((a * b) + b)',
                                lemmaName: 'succ_mul',
                                story: `
Just in time, you finish the spell. The snowball is not twenty meters from crushing you and your entire crew, leaving the world unaware of and unprotected from the dangers of the goblin king and the spellbook. The sun rises, peaking over the mountain top, as if all time slows down except for the rising of the sun, and the sun penetrates the dark clouds in a blinding flash of light. The snowball melts quickly, and for a moment the clouds intensify the sunlight into a sharp beam, like a glass lens used to concentrate sunlight onto kindlewood. Several of your companions fall backward as the remaining water washes over them, but quickly stand up uninjured and shocked from the control over nature your spellbook has.

You continue to march up the slopes of the mountain, and every step seems to give new life to your company. Since the sun climbed over the mountain, the journey has been getting warmer, and now the weather was pleasantly mild. The voice in the air has stopped. There were no more clouds masking the sky. You and your company no longer feel like you are marching to your death. 

Later, when you are within a hundred meters of the cave, one of your crewmates, Andy, asks aloud, “So what are we to do when we arrive? I suspect a fisherman’s harpoon won’t be of much use against the godlike magic of the goblin king. Perhaps your little spellbook can give us something to work with?”

You open up your spellbook to the bookmark, and the bookmark reads, “Do not hesitate. They have shown themselves worthy.” 

The lemma for this is called succ_mul, and it is necessary for proving multiplicative commutativity.
                                `,
                                help: `
This lemma is called succ_mul, and it is necessary for proving multiplicative commutativity.

A quick trick: if you need to specify which part of the equation you want to target with your rewrites, which happens when there are multiple parts of the goal that meet the correct format, you can drag the variables into the hypothesis. 

For example, if you have an equation like this:  “ (a + b) + c ” and you want to use the commutative property to switch the “a” and “b” around, using the commutative property like normal would result in “ c + (a + b) ”. 

To target the correct variables, click the additive commutative property to introduce it into the workbench, and then drag “ a : nat ” onto the commutative property hypothesis in the workbench. After that, drag “ b : nat ” onto the hypothesis. This specifies the correct variables for the rewrite and allows you to be precise with your rewrites and resolve any uncertainty.
`
                        },
                        {
                                name: 'In the Hall of the Goblin King',
                                urlName: 'in-the-hall-of-the-goblin-king',
                                newAxioms: [
                                        {
                                                name: "succ_mul",
                                                raw: "(n1 n2 : nat) : ((succ n1) * n2) = ((n1 * n2) + n2)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b t : nat) : ((a + b) * t) = ((a * t) + (b * t))',
                                lemmaName: 'right_distrib',
                                story: `
The fishermen's gear, which is slung over the sailors’ backs, melts into bright swords, shining with a silver luster uncharacteristic of man-made weaponry. They all emit a faint yellow glow, the glow of the bright magic within them struggling to be contained, and your company no longer looks like the poor, unconfident sailors you left off with; an outsider might think they were nobility leading an army into battle. Indeed, the soldiers look stronger, bigger, and more confident, as if gripping the swords gave them an unnatural presence that could make even the most fearless goblins cower at their sight.

You stride into the front door of the enemy, which is no more than a treasure stash carved into the heights of a mountain, and the goblin king sits on his large golden throne, apparently oblivious to your arrival. His left hand holds the spellbook, which he is violently studying, and his right holds a beautiful white staff capped with a glowing green stone. He has a large, muscular frame and as pleasant of a face as one can find in a goblin. 

Without a moment's hesitation, you open your spellbook. The bookmark reads, “A passionate underdog will never meet an obstacle too strong to overcome. Act quickly.”

This lemma, right_distrib, is exactly what it sounds like: distributivity where the number being distributed (t) is on the right side of the equation.
                                `
                        },
                        {
                                name: 'Darkness Unleashed',
                                urlName: 'darkness-unleashed',
                                newAxioms: [
                                        {
                                                name: "right_distrib",
                                                raw: "(n1 n2 n3 : nat) : ((n1 + n2) * n3) = ((n1 * n3) + (n2 * n3))", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b : nat) : (a * b) = (b * a)',
                                lemmaName: 'mul_comm',
                                story: `
The hair on your arm stands up, and blue electrical sparks rise out of the coins piled underneath the goblin king. The spell you cast was a lightning spell, apparently, and lightning was soon to strike your enemy. But the goblin king had other plans. Still looking down at the spellbook, he begins to smirk, and a feeling of failure overtakes you. He lifts his staff, and lightning from the cave ceiling comes down thunderously but is absorbed into the staff. He points his staff in your direction, and the lightning strikes from his staff into the entrance of the cave, causing a rockslide to block the only way out. The room darkens, and the only source of light is the four torches burning on either side of his golden throne.

The goblin king closes his spellbook, and looks down upon you. His blood red eyes meet your gaze and he says, with the same thunderous voice that was in the air earlier, “You’re late.” With this, he smiles and begins to cackle a terrible, deep laugh. He knocks the bottom of his staff on the floor, and several things happen at once: a bright yellow portal opens next to the goblin king’s throne, and he walks through it, leaving the room; the ground begins to shake, and several of your companions fall to the floor; and dozens of pairs of glowing red eyes appear across the chamber, the eyes of wolves hungry for a snack. The wolves growl and step into the dim light, showing sharp teeth and large grey-brown coats of fur. 

The magic bookmark marks a lemma for the commutative property of multiplication (“mul_comm”), one of the most powerful and important lemmas in multiplication. You begin to cast the spell without any delay.
                                `
                        },
                        {
                                name: 'A Spell of Confidence',
                                urlName: 'a-spell-of-confidence',
                                newAxioms: [
                                        {
                                                name: "mul_comm",
                                                raw: "(n1 n2 : nat) : (n1 * n2) = (n2 * n1)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b c : nat) : (a * (b * c)) = (b * (a * c))',
                                lemmaName: 'mul_left_comm',
                                story: `
While you are casting the spell, one of the wolves leaps in your direction, and sprints through the darkness. You don’t know it, but this wolf is targeting you; it somehow knows that you are capable of its defeat. You say the final words of the spell and expect something to happen, but nothing does. Nothing happens to stop the hungry wolf from reaching its prey. You tear up and step back, expecting this to be your end, but your companions step forward. Wielding the magical swords, they fearlessly stand ready; with one heavy stroke of the sword, one of your companions, Yogu, slays the beast.

The death of this wolf only enraged the others. All of the other beasts growl, and just moments after killing the first wolf, two dozen wolves are charging in your direction. But your companions, as if guided by a spell of confidence, don’t even flinch. One by one, they slay the encroaching wolves, the magical swords shining brighter with every swing. All of the wolves are soon lying lifelessly on the ground. After finishing with the wolves, your companions all shake their heads in unison and look confused. “Did I just do that?” one of them asks. “I felt as if some spirit overtook me, a spirit of fighting and of vengeance. But…” He looks at you. “Did you do this?”

You’ll never know for sure, but you suspect your spell had something to do with it. You respond, “I… I think so, yes. But… but for now we must look to the future.” You look up confidently. “How are we going to escape?”

“I was hoping to ask you,” one of your companions says. “Can’t you make a portal like that ugly goblin did?”

You open your spellbook to the bookmark, and begin to cast the spell. This lemma, mul_left_comm, is useful for simplifying equations. You do not need to perform an induction to prove it. This is the last lemma about multiplication.
                                `
                        },
                ]
        },

        {
                
                path: 'levels/chapter-4/',
                name: 'The End of the World',
                mathName: 'Power World',
                levels: [
                        {
                                name: 'The Path is Hidden',
                                urlName: 'the-path-is-hidden',
                                newAxioms: [
                                        {
                                                name: "mul_comm_left",
                                                raw: "(n1 n2 n3 : nat) : (n1 * (n2 * n3)) = (n2 * (n1 * n3))", category: AxiomCategory.multiplication
                                        },
                                        {
                                                name: "pow",
                                                raw: "(n1 n2 : nat) : n1 ^ n2 : nat", category: AxiomCategory.exponents
                                        },
                                        {
                                                name: "pow_zero",
                                                raw: "(n1 : nat) : (n1 ^ 0) = (1)", category: AxiomCategory.exponents
                                        },
                                        {
                                                name: "pow_succ",
                                                raw: "(n1 n2 : nat) : (n1 ^ (succ(n2))) = ((n1 ^ n2) * n1)", category: AxiomCategory.exponents
                                        }
                                ],
                                goal: '(0 ^ 0) = (1)',
                                lemmaName: 'zero_pow_zero',
                                story: `
A portal much like the one the goblin king used opens next to you. The light from it nearly blinds you, but you can faintly make out the other side. There is a clearing in a forest with tall grass and a small pond not too far from you. You look to your companions on either side and watch as they enter the portal, one by one, until you are the only one left. You take a deep breath and step forward into the portal. It takes your eyes a minute to adjust to the sun, but once you do, you realize that this meadow is near your alchemy school’s village. 

You lead the group, pointing in the direction of the village, but after venturing through the forest you find yourself back in the same meadow. You do not remember the way to the village. One of the sailors offers to guide us back to his port-city Addithia, but after trying to describe the path he realizes that he has forgotten which way to go. Devoid of other options, you open your spellbook and hope for some luck.
                                `,
                                help: `
Three new axioms have been added, definitions of exponentiation:

<strong>pow</strong> — when you raise one natural number to the power of another, the result is a natural number.

<strong>pow_zero</strong> — raising any number to the zeroth power is one.

<strong>pow_succ</strong> — to raise any number a to the successor of another number b, raise a to the b-th power and multiply by a. This defines exponentiation recursively much like addition and multiplication are defined. For example:

3 ^ 2 
= 3 ^ ( succ 1 ) 
= 3 ^ 1 * 3 
= 3 ^ ( succ 0 ) * 3 
= ( 3 ^ 0 ) * 3 * 3 
= 1 * 3 * 3 
= 9

The lemma for this level, “zero_pow_zero”, is fairly straightforward. 

Note: Mathematicians working beyond the set of natural numbers will tell you this statement is incorrect because 0^0 is undefined, but the axioms we are using define this to be true.

                                `
                        },
                        {
                                name: 'No Place Like Home',
                                urlName: 'no-place-like-home',
                                newAxioms: [
                                        {
                                                name: "zero_pow_zero",
                                                raw: "(0 ^ 0) = (1)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(m : nat) : ((0) ^ (succ m)) = (0)',
                                lemmaName: 'zero_pow_succ',
                                story: `
You finish the spell and become hyperalert to your surroundings as you wait for a response. Maybe the clouds are floating in the correct direction? Or perhaps you need to look at the fish decorating the pond? As you wait for some sort of sign, fifteen seconds pass, then a minute, and then five minutes. Your companions offer suggestions: try the spell again, let’s walk around the woods, and one of them thinks they might remember the way to their home. Just as you are about to cave into one of their requests, a familiar sound pierces nature’s silence: the golden bell of your school. The bell’s enchanting ring fills the atmosphere and imbues hope and joy into your company. The sound is coming from the north, so you and your companions hike through the woods in that direction.

After about five minutes, you exit the forest and enter another clearing, and looking over the tree line reveals the bell-tower, proudly shining against the dusky dawn. You lead your company into the walls of the village and a familiar face sits near the entrance. “Magi Grambletόn!” you exclaim. As you run up to and embrace your teacher, you recall how amazing this town was, and you realize that you shouldn’t have been so impatient in the months you stayed here.

“It’s been quite a while now, hasn’t it?” he says. You share your story: how you found the Second Sage dying; the magic book and bookmark he gave you; the port-city and Gale’s family; setting sail and commanding the wind; and confronting the goblin king. You realize just how much has happened to you, and you cannot believe that it has been only three days since Magi Grambletόn gave you the axioms in the apple orchard.

As the rest of your company is introducing themselves to the wizards, a strange bird with black feathers and a long beak perches on the ground in front of you. It looks directly into your eyes and coughs. You squat down to look at it, and it hobbles over to you, still coughing, as if it were trying to tell you something but couldn’t. It starts to poke its beak at you, and you jump back, but after realizing it didn’t intend to hurt you, you notice that it was poking at your spellbook resting in the sack draped across your shoulder. You take out the spellbook and open it to the bookmark, and the bird looks at you and motions with its beak towards the book. The bird obviously wants you to cast a spell, so you open the book and begin to cast the spell.
`,
                                help: `
This lemma is straightforward and proves that 0 ^ n = 0 for all n > 0 — we know that this is false when n = 0 because of the previous lemma; this lemma proves it true for all others because all natural numbers are either 0 or the successor of another natural number. 

                                `
                        },
                        {
                                name: 'Impending Doom',
                                urlName: 'impending-doom',
                                newAxioms: [
                                        {
                                                name: "zero_pow_succ",
                                                raw: "(n1 : nat) : ((0) ^ (succ n1)) = (0)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a : nat) : (a ^ 1) = (a)',
                                lemmaName: 'pow_one',
                                story: `
The bird’s coughing gets worse, and the bird begins to choke on something. When you finish casting the spell, however, the bird spits out a rock stuck in its throat. And then something weird happens: the bird begins to speak.

“Oh, my apologies. I’ve been choking on that rock all day. Oh my — is something wrong?” He looks up at you confused, probably because you are looking at him confused. “Dear me, you’ve never seen a talking bird I suppose. Well, no time for that. I was flying through the mountains up north, and there I heard a speech that sounded like thunder ringing through the air. Out of curiosity I followed the voice, and a great goblin was standing high on a hill commanding an army, some two thousand soldiers at least. Truth be told I didn’t realize the leader was a goblin at first, I thought it was a great king, until I saw the army. Now I didn’t get too close, but the army, at the leader’s command, began to march south, instructed to siege this town and pillage anything in their path. Now they’re still some distance away, but you have hardly enough time to do anything but retreat—”

“Is there time to get to the port-city of Addithia?” You cut to the point. “Can we make it?”

“Oh, dear me, not on foot. Maybe as the bird flies, yes, or as the horse runs, but there’s no way you’d make it before every villager is slayed. Oh, tragedy! Certain doom for us all!”

You look around at your companions and wizards. “Do any of y’all have a horse?” They look at one another, but none of them do. If you are going to survive the siege, you reason, then you need all the help you can get. There’s not enough hands here to protect the entire perimeter, even with the magical powers of the wizards, so you must seek out help. The nearest town was Addithia, and if you have any hope of surviving this battle you know you must hurry. You open your spellbook to a lemma titled “pow_one” and hope that this next spell could bring fortune.
                                `
                        },
                        {
                                name: 'Village Rescue',
                                urlName: 'village-rescue',
                                newAxioms: [
                                        {
                                                name: "pow_one",
                                                raw: "(n1 : nat) : (n1 ^ 1) = (n1)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(m : nat) : (1 ^ m) = (1)',
                                lemmaName: 'one_pow',
                                story: `
A horse neighs outside of the village entrance. You smile, and some of the most experienced wizards among you were surprised. “Only the Second Sage, with his spell book, was capable of such unpracticed and impromptu spells,” Magi Somerio says. “You’ve got quite a future ahead of you, kid.”

“Only if I live to see it,” you reply, and run out the gate to find a beautiful brown horse with a dark mane as pure and smooth as silk. The horse squats down for you as you approach it. You jump on its back, and, seeming to know exactly where to go, the horse immediately begins to run down the north path. The horse cuts through the forest vegetation like a sharp knife cutting through soft meat. About halfway to Addithia, just after the horse leapt gravity-defyingly over the river in a single smooth jump, something wonderful happens: dozens of horses, maybe even a hundred, all saddled, join you from either side and run with you. They form a line with you leading from the front, for the path is no more than three horse widths across.

You arrive at Addithia and run around, shouting for everyone. As each person exits their homes and prepares to leave, they find that they are each given a horse, which trots up and squats down for them to ride on. After everyone is saddled and you are preparing to leave, you hear a horn in the distance accompanied by a slow beat of drums. The goblin army was nearing. The villagers look at one another, frightened. The horn blows again, and this time, dark clouds accompany it and block the sun, darkening the sky. One of the children screams and several others begin to sob with their mothers, who themselves are struggling to stay calm. Even the horses begin to get restless.

You must do something about these clouds, or else you won’t be able to leave. You pull out your spellbook to the bookmark and wish for a solution. 

This lemma is called “one_pow” and proves that one raised to any power is one.

                                `
                        },
                        {
                                name: 'The Final Stand',
                                urlName: 'the-final-stand',
                                newAxioms: [
                                        {
                                                name: "one_pow",
                                                raw: "(n1 : nat) : (1 ^ n1) = (1)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a m n : nat) :( a ^ (m + n)) = ((a ^ m) * (a ^ n))',
                                lemmaName: 'pow_add',
                                story: `
As you finish the spell, the clouds disperse, carried by a strong westward wind. The sun shines, and the goblin horns and drums cannot be heard anymore. The villagers look at you with amazement. You call them all together, and begin to lead them through the forest path. Most of the villagers had never seen a horse before, but these horses were incredibly natural to ride and gave no difficulties to any of their riders. 

You arrive in the village, and all of the women, children, and horses retreat into the library. About a hundred men are left, plus twenty-nine wizards and their apprentices. Each person takes a place on the wall. You hold your breath as you look out into the stillness of nature and imagine an army of repulsive goblins laying siege. The forest, which sits some thirty meters away, is unusually quiet. You, standing on the eastern wall with Magi Grambletόn, begin to shake nervously, but your instructor’s steady hand calms you down as he rests it on your shoulder. 

Finally, a goblin horn sounds faintly in the distance, and you turn to the north to see torches burning brightly behind the treeline. Storm clouds blacken the dark sky and hide the moon’s light as the army approaches. The goblin army marches out of the trees, stopping just out of bowshot distance, and blows their horns loudly. They surround the village from all sides. Rain begins to fall from the sky. After this brief halt, the goblins, shouting hideously, begin to charge the village. Armed with nothing but your spellbook, you prepare yourself for battle. The men who stand on the wall fire arrows down at the intruding goblin army. Most of the arrows miss their targets, but about a dozen goblins are killed in the initial barrage of arrows.

You open your spellbook to the bookmark and begin to cast a spell. This lemma, “pow_add,” is exponentiation’s equivalent to the distributive property of multiplication.
                                `
                        },
                        {
                                name: 'Retreat',
                                urlName: 'retreat',
                                newAxioms: [
                                        {
                                                name: "pow_add",
                                                raw: "(n1 n2 n3 : nat) :( n1 ^ (n2 + n3)) = ((n1 ^ n2) * (n1 ^ n3))", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a b n : nat) : ((a * b) ^ n) = ((a ^ n) * (b ^ n))',
                                lemmaName: 'mul_pow',
                                story: `
Suddenly, lightning strikes down from the sky and smites a large tree in the middle of the goblin army. The tree falls, and its large shadow of branched limbs crushes dozens of goblins. After falling, it begins to roll to the forest and another fifty goblins are flattened under its weight, until the tree comes to a rest at the tree line. 

“Hoy! Not bad!” Magi Grambletόn says. “Watch this, if you will.” With this, he brought his hands together into a ball, and pushed out as if throwing something at the approaching army. A fire breaks out among the ranks of the goblins, burning a few of them to a crisp, but the fire is quickly extinguished by the rain. Around the walls of the village, wizards and apprentices alike are bringing ruin down upon the goblin army. Meanwhile, the men are showering arrows down upon the enemies, slaying dozens. 

But your upper hand is short-lived. A goblin horn blows, and all of the goblins retreat out of bowshot range. Large catapults are pushed out of the forest, each loaded with large spherical rocks. The horn is blown again, and all of the catapults are launched concurrently. The giant stones fly through the air like meteors raining down from the heavens. As they land, they explode like fireworks. The first stone lands in the middle of the village meeting space, destroying a statue but taking no lives. The next hits part of the western wall, killing two wizards and their apprentices, as well as five men, and that piece of the wall collapses into a pile of rubble. One by one, the stones land in fiery eruptions across the village, taking out the cafeteria, then the sleeping quarters, and then the lecture halls. Much of the northern wall is destroyed. Only the library, by chance or some spell of protection, remains unscathed by the hellish explosions.

The horn is blown a third time. The goblin army charges forward, this time without walls blocking their path. You look around at the remaining soldiers, wizards, and apprentices. So few of them remain! One of the wizards on the southern wall (you believe it's Magi Somerio) finally yells, “Retreat! Retreat to the library!” The library is on the eastern wall, just underneath you, and has a basement that connects to a cave system. The women and children were hiding in there, and it served as a place for injured soldiers to retreat to. You and Magi Grambletόn climb down the wall and run to the library, where you join the rest of the soldiers.

After everyone gets in, you slam the door and cast a sealing spell on the door. You open your book and begin to prove the sealing-spell lemma, which is titled “mul_pow.”
                                `
                        },
                        {
                                name: 'Certain Doom',
                                urlName: 'certain-doom',
                                newAxioms: [
                                        {
                                                name: "mul_pow",
                                                raw: "(n1 n2 n3 : nat) : ((n1 * n2) ^ n3) = ((n1 ^ n3) * (n2 ^ n3))", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a m n : nat) : ((a ^ m) ^ n) = (a ^ (m * n))',
                                lemmaName: 'pow_pow',
                                story: `
The door of the library, which was made of wood, hardens into stone and melts into its surroundings, creating an unbreakable seal on the library. You turn around and look at your company. Only around ten wizards and ten apprentices remain, along with about thirty men. 

“What now?” One of the apprentices asks. “Do we retreat into the caves to live out the rest of our lives? As far as I can tell there is no way out of the cave.”

You suggest opening a portal to escape. Some of the men agree with you, but the wizards think that to be cowardly. “For then we’d only delay defeat. If we cannot win here I doubt we stand a chance anywhere else. Then the goblin king would have nothing standing in its way to rule over all the free world.”

Another wizard speaks. “It is only a matter of time before the goblin king himself marches up to our door and breaks the sealing spell. We must make a choice. Retreat and spare our lives, but leave the world under the rule of the goblin king? Or fight to our certain doom, but with one last hope of sparing the world?”

Many voices begin to argue all at once. Some say retreat into the caves as you stand a better chance fighting there anyways. Others say take the portal and leave. One voice rises above all the others: “Hoy! Ride out and fight! Fight! Folly it is to think we can defeat the goblin king from a cave!” You look over, and to your surprise, that voice is Magi Grambletόn. After further deliberation, a consensus is reached: everyone will ride out on the horses except for you. You will stand back, just outside the cave, awaiting the goblin king, and cast a spell with him off guard to seek his defeat. 

Everyone climbs onto their horses, a fiery determination set in their eyes. Magi Somerio, the tallest and wisest of the wizards, valiantly shouts, “Let us meet this moment not cowering with fear but proud to be the last defenders of the free world. Courage! Courage! For as soon as we give in to cowardice the enemy has already won. Let us ride now! Ride for victory! Ride for freedom! Ride!”

The sealing spell breaks, and the stone door on the library explodes into small pieces. Everyone charges forward, led by Magi Somerio, shouting “Ride!” in unison. All of the riders exit the cave resolutely determined to slay goblins and thinking little of their own lives. As they charged, the goblins fled, cowering with fear. The sun, which was covered by the dark blanket of storm clouds, penetrates through the clouds and casts a blinding ray of light behind the riders, light so bright that many of the goblins fell over as they were running away. 

On the other side of the village, the goblin king enters through the northern wall. Staff in hand, he points at several of your riders, commanding lightning to strike and kill them. Then, he grasps his staff with both hands and thrusts it into the earth, causing the world to shake violently. A hill begins to grow around the staff, which is implanted in the ground. The hill grows to about fifty meters tall, and the goblin king removes his staff from the earth. He then begins to wave it around in a circle, and the clouds begin to spiral in the sky around the library. The spiraling clouds form a tornado that starts to come down to touch ground on top of the library. Now might be your only chance. 

You open your spellbook to the bookmark and begin to cast the spell. You are shaking under the weight of this pressure; you’ve been thinking about this moment all day: the moment when the fate of the free world rests on your shoulders. A tear runs down your cheek. 

This lemma, pow_pow, is the culmination of all of exponentiation. Act quickly before you run out of time and lose your chance.
                                `
                        },
                        {
                                name: 'The Third Sage',
                                urlName: 'the-third-sage',
                                newAxioms: [],
                                goal: '(a b : nat) : ((a + b) ^ 2) = (((a ^ 2) + (b ^ 2)) + ((2 * a) * b))',
                                lemmaName: 'add_squared',
                                story: `
The tornado slowly lowers from the sky. As you finish the spell, the bottom of the hill which the goblin king made hardens into stone. The stone slowly spreads upwards from the ground. You look back at the tornado, lowering towards the library, then back at the stone, expanding upwards to the goblin king. It’s a cruel race of fate; you start to shake anxiously since all you can do is wait to see what happens. The stone growing on the hill is approaching the goblin king, but the tornado tears the roof off the library first. The roof is absorbed into the tornado and carried high into the air, and the goblin king laughs a terrible laugh. “Too little too late!” he yells tauntingly from the sky. “This is the end!”

Moments away from destruction, you reflect on your time here at alchemy school. Although short-lived, you were able to experience a timeless adventure. Now the top story is pried from the library. You wipe tears from your face. “This is the end indeed,” you tell yourself. “The end of the world. All ‘cuz of me.” You fall prostrate onto the ground and begin to cry into the earth. If only you’d finished that last spell faster, or finished this all the first time you encountered the goblin king. 

But then a loud, deep, terrible cry of defeat thunders from above. You look up, and the goblin king’s legs are turning to stone. He was not expecting this at all. As he looks down at his feet, he stops waving his staff, and the tornado begins to recede back into the sky. “Hear this!” he yells; his final words. “A far more terrifying creature is coming! I am but a taste of his power! I am only mortal! You will cower! You will cower under the reign of Surro the Deceiver!" With this, his face hardens and grays, cementing into stone. The spellbook and his staff also harden into stone.

The clouds dissipate from the sky, and the sun shines warmly. It’s over. The battle. The adventure. All of it. Soon everything will be back in its place, and everything will be made good again. You gather all of the men from the battle. Some forty remain, including about six wizards and seven apprentices. Many have died in the battle. But the world is freed from the clutch of evil. 

That night you have a great banquet, celebrating the lives and sacrifices of the triumphant dead. Magi Grambletόn leads a toast for the lost soldiers, and everyone cheers. Many of the women and children who have lost husbands and fathers abstain from any celebration as they mourn their departed family. 

After the banquet, Magi Somerio approaches you. “You did remarkably well for someone so young,” he says. “Leadership like that is not common. And that spellbook you have seems to have found a great master. As you know, the Second Sage has died and we no longer have a principal leading us all. So — and this is after much deliberation and thought — I think it would be prudent for you to begin training as a candidate for the Third Sage. It will not be easy and you will regret your decision for many years. But I think that this is for the betterment of the world. Do you have any interest?” 

“I… I don’t know,” you say solemnly. “This has been beyond my dreams for many years, but I don’t know if I can manage another difficult adventure. My last adventure was hard.”

“Of course, of course. It will be extremely difficult; far worse than anything you’ve been through already. But by your fruits you will bring much good to the world. And there’s not much better of a way to spend your life than that, is there? Regardless, you don’t have to decide right now. Sleep soundly, knowing that you’ve already saved the world once. Good night!”

You walk away towards the tent pitched over your destroyed hut. After about two minutes, you turn around. You will prepare to become the Third Sage. You will give your life to this calling. You run back down the path, towards Magi Somerio, and catch up to him.

“I’ll do it,” you say confidently. “I’ll train to become the Third Sage.”

“Oh, young apprentice. I am proud to have worked in your presence. But there’s nothing left for us to do tonight. If you keep this decision then come meet me in the western meadows tomorrow and I will give further instruction. And bring your spellbook.”

The next morning, after breakfast, you find Magi Somerio in the meadow sitting on a fallen tree, pondering. Before you say anything, he speaks. “This is your last chance to change your mind. Are you sure of your choice?”

“Certain,” you assert. “Certain as I’ll ever be.”

“Ok. Open your spellbook and heed its instructions,” the old wizard says. “These are the instructions in the library’s law book for finding a new sage. Though, I suppose your spellbook isn’t exactly the same as the last one… I think that shouldn’t matter, if you truly are destined to become the next sage. Anyways, the spell should make some kind of compass to lead you to your training grounds. Go ahead, whenever you’re ready.”

You open the spellbook to the bookmark and look up into the distance. The world is quiet, peaceful, happy. 

Calmly, you start to cast the spell. The lemma for this spell is titled add_squared and concludes the lemmas for exponentiation. 
                                `,

                                help: `
Hint:

If you need to target, for example, the following two terms in an add_comm rewrite, here’s how you do it.

a * a + b * b → b * b + a * a


First, grab a “mul” from the toolbox that looks like this and click on it to bring it into the workbench: 

(n1 n2 : nat) n1 * n2 : nat


Then, drag “a : nat” onto this hypothesis twice so that the hypothesis now looks like this:  

a * a : nat


Drag this new hypothesis (a * a : nat) onto an add_comm hypothesis to make it look like this:  

( n2 : nat ) : a * a + n2 = n2 + a * a


Repeat with “b : nat” and you’ll get this: 

a * a + b * b = b * b + a * a

which can be used to carry out the rewrite

`
                        },
                        
                ]
        }
]