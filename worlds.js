export const AxiomCategory = {
        numbers: 0,
        addition: 1,
        multiplication: 2,
        exponents: 3,
}


export const worlds = [
        {
                path: 'levels/world-1/',
                name: 'The Apprentice',
                levels: [
                        {
                                name: 'Basic Alchemy',
                                urlName: 'basic-alchemy',
                                newAxioms: [],
                                goal: '(a b c : nat) : ((a + b) + c) = ((a + b) + c)',
                                description: `
You wake up to find yourself in a soft bed in a lush, green village. Outside your window, you see the giant golden bell overlooking the walled-in school-town.

It’s been two weeks since you began alchemy school. The school is small, with only thirty apprentices, each with a wizard they apprentice to, and one Principal known only as the Second Sage. The Second Sage is the keeper of the spell-book, the most powerful object the world knows about. Wars have been fought over this book since the beginning of time. Most of the apprentices have been here for multiple years and are waiting on the Principal's leave to graduate.

But not you. Your wizard, who hasn’t shown up on time once this year, is somewhat forgetful. His last student had quit before three months had passed, and if he doesn’t begin to teach you a spell that does anything useful, you might do the same.

As you arrive at the blood-red apple orchard near where you are scheduled to meet him, you try out the only spell you know: a reflection. A reflection is really simple, really. You can transform an object into another object — but only if you can prove this transformation’s Lemma.

You pull down one of the apples in the tree above you and notice a dark brown spot. Fortunately, you know how to transform the apple with a reflection: the magic formula to remove a blemish is a + b + c = a + b + c. This is your goal: if you can make both sides of the goal exactly the same, you can cast the spell.

This screen is where you prove the goal is exactly the same. On the left is your Lemma list. This is like your “toolbox” with some helpful tools. You received this on your first day of school but have since not needed to use it. On your right is your work bench. This is where you can manipulate these “magic formulas.” Notice that in the middle of the work bench are three draggable blocks. These are your hypothesises, and the three in this level will not be used (If you’re curious, “a : nat” means “a is a natural number,” but we won’t use these just yet).

At the top of the work bench is your goal, a + b + c = a + b + c. Fortunately, both sides of the equation are exactly the same for you. You can cast a reflection by double-clicking your goal.

Go ahead! Double click.

`
                        },
                        
                        {
                                name: 'A New Spell',
                                urlName: 'a-new-spell',
                                newAxioms: [],
                                goal: '(x y : nat) (y = x + 7) : (2 * y) = (2 * (x + 7))',
                                description: `
As you cast the reflection, the apple begins to transform. Slowly, like a block of ice melting in the sun, the spot on the apple fades into a smooth, enchanting crimson.

“Hoy! Simon!” You look over your shoulder to find Magi Grambletόn, your assigned wizard, sitting on a fallen tree. He removes his pointy gray hat as he stands up. “I’ve been thinkin’: you know these basic reflection spells pretty well. Mighty fast learner. How’s about we learn a new spell?”

“Yes, I’d love to. What kind of spell?” you ask. Of course you are ready for a new spell. You’ve been ready since the second day of school, after he taught you to do a reflection.

“A powerful spell, a rewrite, many lemmas you can make with it. And some of these lemmas have powerful magic in them. Shall we try turning this beautiful apple into an orange now?”

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
                                goal: '(m n : nat) : ((m + n) + 0) = (m + n)',
                                description: `
Drops of blood-red paint fall from the apple as it melts into a picture-perfect orange. Two months ago you would never believe your eyes at this, but ever since you’ve joined alchemy school you’ve seen dozens of such transformations.

You practice more. At first, it’s just fruits that you transform, but before long you’ve made statues dance, put out a fire, and even treated a cut.

After a couple of weeks with this spell, Magi Grambletόn brings five polished silver bars to your training. “These here are axioms,” he said. “With these wonderful little tools you can rewrite almost anything. Many of these to collect, there are. But these five will meet our needs for now.

“Now, let me show you how to melt the bark off this log. This is important in the wild, you know, if you need to make a fire.”

You put the silver bars in your toolbox and begin to de-bark the log.

An axiom in math is something we assume to be true but can’t necessarily prove. For example, we must assume that adding zero to a number keeps it the same. Think of it as part of the definition of addition. Notice the axioms appearing in your toolbox on the left pane. You have five axioms, all dealing with either natural numbers or addition. Recall that natural numbers are all integers greater than or equal to 0:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9, …

Here is a short description of all the axioms:

zero: This axiom ( 0 : nat ) says that zero is a natural number. If you ever need to substitute 0 in to represent a natural number, use this.

succ: succ (short for successor) says that the successor of a natural number is a natural number. Thus, for any natural number n1, the successor of n1 (denoted succ n1) is a natural number. For example, the successor of 0 is 1: succ 0 = 1 (this is the definition of “1”). Thus, 1 is a natural number.

All natural numbers can be defined as either zero or the successor of another natural number. For example 10 is the successor of 9, 3 is the successor of 2, and 0 is a natural number by definition.

add: The sum of two natural numbers is a natural number. For example, 2 and 3 are both natural numbers, and 2 + 3 = 5. Thus, 5 is a natural number.

add_zero: Adding zero to a number keeps it the same. For example, 4 + 0 = 4.

add_succ: This is the most “complicated” of them all — it’s a recursive definition for addition. We’ll discuss this axiom in detail in the next level.

To use an axiom, click on it on the left to bring it onto the workbench. For example, this level has the following goal:

m + n + 0 = m + n

Note that this math system treats “m + n + 0” as “(m + n) + 0”.

Adding zero to a natural number (m + n is a natural number because m and n are natural numbers) is equivalent to just that natural number. So, click on add_zero. The following hypothesis is added to the workbench:

(n1 : nat) : n1 + 0 = n1

This means that for any natural number n1, n1 + 0 = n1. Thus we can substitute anything for n1 and the statement would be true — for instance, we could substitute “m + n” for n1 because “m + n” is a natural number. The interpreter can guess at what you want to substitute when you drag the hypothesis onto the goal.

Go for it, drag this add_zero hypothesis onto your goal.
                                
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
                                description: `
Sure enough, the bark dissolves into the wood. Magi Grambletόn, impressed, says aloud, “I thought it would take weeks to learn this. Nothin’ left for today's session I guess.”

You exhale in disappointment: disappointment in your assigned wizard, in your snail’s pace lessons, and most of all, in your unsatisfied desire for greatness. It has now been two months since you’ve started learning alchemy, and you feel miles behind everyone else.

Walking back to the center village, pondering on your life, you hear the golden bell start ringing. At first you think it’s the dinner bell, but the bell doesn’t make the jingle you love hearing. Then you imagine a ceremony, perhaps someone had finally graduated, but in your time the only ceremony at the school was planned for weeks and you would have heard about it.

The bell continues to ring. You have a growing feeling that something has gone terribly wrong. You start to run. You’re a couple of miles away from the village but you hardly notice the distance. Within a couple of minutes you arrive at the large black door at the entrance to the town. 

The door is shut, which is rather odd for this time of day. But what’s even more strange is that it won’t open. In fact, your given key won’t open it, which you discover after you fail to unlock it. No, something far worse has happened: a sealing spell was cast on the door, which you discern after trying to cast a spell to break the door.

To open it, you’ll need to use a counter-spell, something you’ve only seen a glimpse of in books. 

You vaguely recall a counter-spell cast from the lemma “1 + 1 = 2,” but don’t recollect whether that is the correct one. You decide to give it a shot.

To prove this lemma, you’ll need to make use of a few new axioms that define 1 and 2:

one, two: These two axioms introduce the natural numbers 1 and 2. 

one_eq_succ_zero, two_eq_succ_one: These two axioms define 1 and 2 as the successors of their previous numbers.

This theorem requires the use of the add_succ axiom. This defines addition for all numbers other than zero, and it does so recursively. Recursively means that you may need to apply it a number of times to add some numbers. To use add_succ, you must have something of the form “a + succ b.” Then, you can cast a rewrite and change it to the form “succ a + b.” While this isn’t immediately helpful, eventually you can rewrite this expression into “succ m + 0” and use add_zero to simplify to “succ m.”

For example, to solve 0 + 2 with this definition of addition, one would proceed as follows:

0 + 2
0 + succ 1 ← apply definition of 2 as the successor of 1
succ ( 0 + 1 ) ← apply add_succ
succ ( 0 + succ 0 ) ← apply definition of 1 as the successor of 0
succ ( succ ( 0 + 0 ) ) ← apply add_succ
succ ( succ 0 ) ← apply add_zero
succ 1 ← apply definition of 1 as successor of 0
2 ← apply definition of 2 as successor of 1

Thus, 0 + 2 = 2.

                                `
                        },
                        
                        {
                                name: 'A Dark Day',
                                urlName: 'a-dark-day',
                                newAxioms: [],
                                goal: '(n : nat) : (0 + n) = (n)',
                                description: `
The spell works, and the door opens. A sudden horror overtakes you, as if the sealing spell on the door had masked some form of evil inside the village.

You notice hundreds of small footprints stampeding across the town. These are not human footprints, nor animal footprints, but something in between. You’ve heard stories of dwarves, goblins, and even conscious animals, but have never seen anything of the sort before.

Suddenly, a flash of light and a thunderous boom rock the complex. It came from the library, residence of the Second Sage, and appeared as if lightning struck the ground without a streaking flash from the sky. Running towards the library, you see a horrible sight. A wizard, Magi Crageona, lies on the floor unconscious, and his pupil Charlie lies next to him. Sharp arrows with silver polished heads and green shafts decorate their bodies. You put your ear to their chests, but hear no heartbeat.

These were the first dead bodies you’ve seen in your life. As you fight back tears, a spirit of vengeance overtakes you. You follow the footprints to the library and stumble past the body of the ugliest creature you’ve ever seen. It was a goblin, for it had pale green skin, pointy ears, and skin drier than a raisin. Of course it was a goblin; you’ve heard of goblin raids (though you’ve never seen one), and the curses that they left on the ransacked villages as they left.

The library was engulfed in darkness; even though the sun shone on it, it seems that darkness shone out of the ground and veiled the building from the sun. You’ve never seen something like this before — you begin to shiver in the cold void around the library.

The Second Sage walks out of the open-doored building, coughing, and you notice that his once-vibrant eyes have become gray.

“Principle, what has happened?” you ask aloud. You bow in respect but he doesn’t notice you, for he has been blinded.

“My child,” he says, coughing. “We’ve been ambushed. Goblins, many goblins. They took *chough* the spell-book. It is a dark day.” Suddenly he collapses to the floor. “I don’t expect myself to live *cough* *cough* much longer. Before I go, I have one spell I want to teach you. A spell of Induction. With this you can cast powerful spells. Try *cough* casting the spell *cough* 0 + n = n.” With this, he teaches you how to perform an Induction.

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
                path: 'levels/world-2/',
                name: 'Addition',
                levels: [
                        {
                                name: 'Again?',
                                urlName: 'again',
                                newAxioms: [],
                                goal: '(n : nat) : (0 + n) = (n)',
                                description: `
                                Wait — isn't this already true? No; we've been given the communative property equivalent for this, n + 0 = n. But we didn't proove the communative property yet, so how will we solve this?
                                <br />
                                <br />
                                This problem cannot be solved using only draggings and double-clicks (rewrites and reflections); we must use something called <strong>proof by induction</strong>.
                                <br />
                                <br />
                                Proof by induction allows a statement to be solved given the following: 
                                <br />
                                - a statement regarding n is true for n = 0
                                <br />
                                - given that a statement regarding n is true for n then it is true for the successor of n
                                <br />
                                <br />
                                If both of the above criteria are correct, then the statement about n is true for all natural numbers of n. Take a moment and think about why this makes sense — if a statement is true for zero, and, for all natural numbers (zero being one of the natural numbers) if it is true for n then it is true for the successor of n — why would all natural numbers be included in this?
                                <br />
                                <br />
                                To start a proof by induction, drag "n : nat" onto the "i" icon next to the goal to begin. Notice at the top right it shows 1 / 2 now, instead of 1 / 1 as it did before. This is because there is now two goals to be proved, i.e. the two bullet points listed above. To cycle between them click on the 1 / 2; they can be solved in any order.
                                `
                        },

                        {
                                name: 'Association',
                                urlName: 'association',
                                newAxioms: [
                                        {
                                                name: "zero_add",
                                                raw: "(n1 : nat) : (0 + n1) = (n1)", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b c : nat) : (a + (b + c)) = ((a + b) + c)',
                                description: `
                                We will now prove the associative property. Notice that you now have access to the theorem you proved in the last level. Hint: try using induction on one of the variables — which one gives you an easy simplification?
                                `
                        },

                        {
                                name: 'Succ Add',
                                urlName: 'succ-add',
                                newAxioms: [
                                        {
                                                name: "add_assoc",
                                                raw: "(n1 n2 n3 : nat) : (n1 + (n2 + n3)) = ((n1 + n2) + n3)", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b : nat) : ((succ a) + b) = (succ (a + b))',
                                description: `
                                Next level is the boss level: communative property. We'll need this lemma before we can prove it.
                                `
                        },

                        {
                                name: '💀 Add Comm',
                                urlName: 'add-comm',
                                newAxioms: [
                                        {
                                                name: "succ_add",
                                                raw: "(n1 n2 : nat) : ((succ n1) + n2) = (succ (n1 + n2))", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b : nat) : (a + b) = (b + a)',
                                description: `
                                The first boss: communativity.
                                <br />
                                <br />
                                You should be well prepared, my friend.
                                `
                        },

                        {
                                name: 'Plus One',
                                urlName: 'plus-one',
                                newAxioms: [
                                        {
                                                name: "add_comm",
                                                raw: "(n1 n2 : nat) : (n1 + n2) = (n2 + n1)", category: AxiomCategory.addition
                                        },
                                        
                                        {
                                                name: "one",
                                                raw: "1 : nat", category: AxiomCategory.numbers
                                        },
                                        {
                                                name: "one_eq_succ_zero",
                                                raw: "(1) = (succ 0)", category: AxiomCategory.numbers
                                        }
                                ],
                                goal: '(n : nat) : (succ n) = (n + 1)',
                                description: `
                                The definition of "1" has been added: 1 = succ 0. 
                                <br />
                                <br />
                                There are 2 more levels to provide us with some useful theorems for the multiplication world. 1 will become very important in the multiplication world, so it's important to be comfortable with it.
                                `
                        },

                        {
                                name: 'On Your Right',
                                urlName: 'on-your-right',
                                newAxioms: [
                                        {
                                                name: "succ_eq_add_one",
                                                raw: "(n1 : nat) : (succ n1) = (n1 + 1)", category: AxiomCategory.addition
                                        }
                                ],
                                goal: '(a b c : nat) : ((a + b) + c) = ((a + c) + b)',
                                description: `
                                The last theorem about addition; subtracting is such sweet sorrow.
                                `
                        },

                ]
        },


        {
                path: 'levels/world-3/',
                name: 'Multiplication',
                levels: [
                        {
                                name: 'Zero Times',
                                urlName: 'zero-times',
                                newAxioms: [
                                        {
                                                name: "add_right_comm",
                                                raw: "(n1 n2 n3 : nat) : ((n1 + n2) + n3) = ((n1 + n3) + n2)", category: AxiomCategory.addition
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
                                description: `
                                Like addition, this can be proven using induction.
                                <br/><br/>
                                Notice that there are three new theorems defining multiplication at the bottom. Like addition, multiplication is defined recursively.
                                `
                        },
                        {
                                name: 'Times One',
                                urlName: 'times-one',
                                newAxioms: [
                                        {
                                                name: "zero_mul",
                                                raw: "(n1 : nat) :( 0 * n1) = (0)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(m : nat) : (m * 1) = (m)',
                                description: `
                                Oh dear.
                                `
                        },
                        {
                                name: 'One (More) Times',
                                urlName: 'one-more-times',
                                newAxioms: [
                                        {
                                                name: "mul_one",
                                                raw: "(n1 : nat) : (n1 * 1) = (n1)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(m : nat) : (1 * m) = (m)',
                                description: `
                                Prove "one times" from "times one" one more times.
                                `
                        },
                        {
                                name: 'Distribute',
                                urlName: 'distribute',
                                newAxioms: [
                                        {
                                                name: "one_mul",
                                                raw: "(n1 : nat) : (1 * n1) = (n1)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(t a b : nat) : (t * (a + b)) = ((t * a) + (t * b))',
                                description: `
                                This is known as left distributivity (left because the "t" is on the left side of the multiplication). We'll prove right distributivity later.
                                `
                        },
                        {
                                name: 'Assoc Football',
                                urlName: 'assoc-football',
                                newAxioms: [
                                        {
                                                name: "left_distrib",
                                                raw: "(n1 n2 n3 : nat) : (n1 * (n2 + n3)) = ((n1 * n2) + (n1 * n3))", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b c : nat) : ((a * b) * c) = (a * (b * c))',
                                description: `
                                What's similar about soccer and multiplication? They're both associative! Wait, you don't understand? Like "Association Football" and "Associative Prop"— oh never mind.
                                `
                        },
                        {
                                name: 'succ_mul',
                                urlName: 'succ-mul',
                                newAxioms: [
                                        {
                                                name: "mul_assoc",
                                                raw: "(n1 n2 n3 : nat) : ((n1 * n2) * n3) = (n1 * (n2 * n3))", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b : nat) : ((succ a) * b) = ((a * b) + b)',
                                description: `
                                Levels SIX and SEVEN in this world will equip us with what we need to tackle the boss: Communativity.
                                `
                        },
                        {
                                name: 'right_distrib',
                                urlName: 'right-distrib',
                                newAxioms: [
                                        {
                                                name: "succ_mul",
                                                raw: "(n1 n2 : nat) : ((succ n1) * n2) = ((n1 * n2) + n2)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b t : nat) : ((a + b) * t) = ((a * t) + (b * t))',
                                description: `
                                Levels SIX and SEVEN in this world will equip us with what we need to tackle the boss: Communativity.
                                `
                        },
                        {
                                name: '💀 mul_comm',
                                urlName: 'mul-comm',
                                newAxioms: [
                                        {
                                                name: "right_distrib",
                                                raw: "(n1 n2 n3 : nat) : ((n1 + n2) * n3) = ((n1 * n3) + (n2 * n3))", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b : nat) : (a * b) = (b * a)',
                                description: `
                                You should be well-prepared.
                                `
                        },
                        {
                                name: 'mul_left_comm',
                                urlName: 'mul-left-comm',
                                newAxioms: [
                                        {
                                                name: "mul_comm",
                                                raw: "(n1 n2 : nat) : (n1 * n2) = (n2 * n1)", category: AxiomCategory.multiplication
                                        },
                                ],
                                goal: '(a b c : nat) : (a * (b * c)) = (b * (a * c))',
                                description: `
                                just do it
                                `
                        },
                ]
        },

        {
                
                path: 'levels/world-4/',
                name: 'Exponents',
                levels: [
                        {
                                name: 'zero_pow_zero',
                                urlName: 'zero-pow-zero',
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
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'zero_pow_succ',
                                urlName: 'zero-pow-succ',
                                newAxioms: [
                                        {
                                                name: "zero_pow_zero",
                                                raw: "(0 ^ 0) = (1)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(m : nat) : ((0) ^ (succ m)) = (0)',
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'pow_one',
                                urlName: 'pow-one',
                                newAxioms: [
                                        {
                                                name: "zero_pow_succ",
                                                raw: "(n1 : nat) : ((0) ^ (succ n1)) = (0)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a : nat) : (a ^ 1) = (a)',
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'one_pow',
                                urlName: 'one-pow',
                                newAxioms: [
                                        {
                                                name: "pow_one",
                                                raw: "(n1 : nat) : (n1 ^ 1) = (n1)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(m : nat) : (1 ^ m) = (1)',
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'pow_add',
                                urlName: 'pow-add',
                                newAxioms: [
                                        {
                                                name: "one_pow",
                                                raw: "(n1 : nat) : (1 ^ n1) = (1)", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a m n : nat) :( a ^ (m + n)) = ((a ^ m) * (a ^ n))',
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'mul_pow',
                                urlName: 'mul-pow',
                                newAxioms: [
                                        {
                                                name: "pow_add",
                                                raw: "(n1 n2 n3 : nat) :( n1 ^ (n2 + n3)) = ((n1 ^ n2) * (n1 ^ n3))", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a b n : nat) : ((a * b) ^ n) = ((a ^ n) * (b ^ n))',
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'pow_pow',
                                urlName: 'pow-pow',
                                newAxioms: [
                                        {
                                                name: "mul_pow",
                                                raw: "(n1 n2 n3 : nat) : ((n1 * n2) ^ n3) = ((n1 ^ n3) * (n2 ^ n3))", category: AxiomCategory.exponents
                                        },
                                ],
                                goal: '(a m n : nat) : ((a ^ m) ^ n) = (a ^ (m * n))',
                                description: `
                                Powers
                                `
                        },
                        {
                                name: 'add_squared',
                                urlName: 'add-squared',
                                newAxioms: [
                                        {
                                                name: "pow_pow",
                                                raw: "(n1 n2 n3 : nat) : ((n1 ^ n2) ^ n3) = (n1 ^ (n2 * n3))", category: AxiomCategory.exponents
                                        },
                                        {
                                                name: "two",
                                                raw: "2 : nat", category: AxiomCategory.numbers
                                        },
                                        {
                                                name: "two_eq_succ_one",
                                                raw: "(2) = (succ 1)", category: AxiomCategory.numbers
                                        },
                                ],
                                goal: '(a b : nat) : ((a + b) ^ 2) = (((a ^ 2) + (b ^ 2)) + ((2 * a) * b))',
                                description: `
                                Powers
                                `
                        },
                        
                ]
        }
]