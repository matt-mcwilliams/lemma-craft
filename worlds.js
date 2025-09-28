export const worlds = [
        {
                path: 'levels/world-1/',
                levels: [
                        {
                                name: 'The Double Click',
                                urlName: 'the-double-click',
                                newAxioms: [],
                                goal: '(x y z : nat) : x * y + z = x * y + z',
                                description: `Welcome to LemmaCraft! Here we'll build a math system from scratch. 
                                <br/>
                                <br/>
                                You may notice that the two halves of the equation at the top (this is our goal, what we're trying to prove) are the same. Whenever this is the case, simply double-click on the goal to prove it.
                                <br/>
                                <br/>
                                Most early-game goals will be solved by a double-click, and your challenge is to manipulate the equation so that both sides are *exactly* the same. For example, 1 + 2 = 2 + 1 would not work, but 1 + 2 = 1 + 2 would.`
                        },
                        
                        {
                                name: 'Drag \'n Drop',
                                urlName: 'drag-n-drop',
                                newAxioms: [],
                                goal: '(x y : nat) (y = x + 7) : 2 * y = 2 * (x + 7)',
                                description: `
                                Now the equation doesn't line up! And what's that in the middle? The definition for y, y = x + 7. (If you can't see it try closing this tip)
                                <br />
                                <br />
                                "y = x + 7" is a hypothesis, meaning that we can assume it to be true. Notice that, in the goal, if you substitute x + 7 for y, the equation becomes exactly equal. To rewrite the equation using a hypothesis, simply drag the hypothesis onto the equation.
                                <br />
                                <br />
                                This should make both sides equal and thus solvable with a double-click.
                                `
                        },

                        {
                                name: 'The Axioms',
                                urlName: 'the-axioms',
                                newAxioms: [
                                        { name: 'zero', raw:'0 : nat'},
                                        {name: 'succ', raw: '(n : nat) : succ n : nat'}
                                ],
                                goal: '(a b : nat) (succ a = b) : succ(succ(a)) = succ(b)',
                                description: `
                                You may have noticed the additional hypothesises of the form "a : nat". This means "a is a natural number", i.e. 0, 1, 2, 3, etc. 
                                <br />
                                <br />
                                Look at the left pane: notice the introduction of two axioms. Axioms are things that we will assume to be true for the entire number system. These two axioms define the natural numbers. The first axiom says "0 is a natural number" and the second axiom says "succ n is a natural number for all n". What does this mean?
                                <br />
                                <br />
                                "succ n" reads "the successor of n". For example, 1 is the successor of 0, and 2 is the successor of 1. Thus, 2 = succ (succ 0). All natural numbers besides zero are a successor of some other unique natural number.
                                <br />
                                <br />
                                Because 1 = succ 0, this statement could be written as: succ (succ 0) = succ 1. We will prove a more general statement in this level.
                                <br />
                                <br />
                                But don't be scared by the introduction of new terminology! This goal means that if a and b are natural numbers, and succ a = b (the hypothesises), then succ (succ a) = succ b. Give it a shot!
                                `
                        },

                        {
                                name: 'Addition',
                                urlName: 'addition',
                                newAxioms: [
                                        {name: 'addition', raw:'(n1 n2 : nat) : n1 + n2 : nat'},
                                        {name: 'add_zero', raw:'(n1 : nat) : n1 + 0 = n1'},
                                        {name: 'add_succ', raw:'(n1 n2 : nat) : n1 + (succ(n2)) = succ (n1 + n2)'}
                                ],
                                goal: '(a : nat) : a + (succ(0)) = succ(a)',
                                description: `
                                Now that we have natural numbers, let's add them together! Notice three new axioms. Let's break down what they mean:
                                <br />
                                <br />
                                <b>addition</b> : "(n1 n2 : nat) : n1 + n2 : nat" — the sum of any two natural numbers is a natural number. This means that addition is closed under natural numbers.
                                <br />
                                <br />
                                <b>add_zero</b> : "(n1 : nat) : n1 + 0 = n1" — the sum of a natural number and zero (notice the order — we have not proved communativity yet!) is the natural number.
                                <br />
                                <br />
                                <b>add_succ</b> : "(n1 n2 : nat) : n1 + succ(n2) = succ (n1 + n2)" — to add n1 and the successor of n2 together, take the successor of n1 + n2. Let's see an example:
                                <br />
                                <br />
                                2 + 2 =
                                <br />
                                2 + succ 1 = 
                                <br />
                                succ ( 2 + 1 ) =
                                <br />
                                succ ( 2 + succ 0 ) =
                                <br />
                                succ ( succ ( 2 + 0 )) = 
                                <br />
                                succ ( succ 2 ) = 
                                <br />
                                succ 3 =
                                <br />
                                4.
                                <br />
                                <br />
                                Thus, 2 + 3 = 5. If this feels excessive, which it should, just know that we'll be proving some statements that make our life easier going forward.
                                <br />
                                <br />
                                --
                                <br />
                                <br />
                                Now for the level at hand:
                                <br />
                                <br />
                                First, bring out the <strong>add_succ</strong> axiom by clicking on it, defining addition of successor. Because we want n1 to represent a, drag "a : nat" onto this new hypothesis. 
                                <br />
                                <br />
                                > Note: "a : nat" (or the axiom you introduced) could be hiding underneath this tip card. Try clicking the "x" if you can't find it. You can always open it again later :)</>
                                <br />
                                <br />
                                What do we want to represent n2? Bring it out and drag it onto the hypothesis. We now have something we can rewrite the goal with. Drag this new hypothesis onto the goal.
                                <br />
                                <br />
                                Now see if you can simplify "a + 0" into just "a" — which axiom could you introduce?
                                `
                        }
                ]
        },


        {
                path: 'levels/world-2/',
                levels: [
                        {
                                name: 'Again?',
                                urlName: 'again',
                                newAxioms: [],
                                goal: '(n : nat) : 0 + n = n',
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
                                                raw: "(n1 : nat) : 0 + n1 = n1"
                                        }
                                ],
                                goal: '(a b c : nat) : a + (b + c) = (a + b) + c',
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
                                                raw: "(n1 n2 n3 : nat) : n1 + (n2 + n3) = (n1 + n2) + n3"
                                        }
                                ],
                                goal: '(a b : nat) : (succ a) + b = succ (a + b)',
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
                                                raw: "(n1 n2 : nat) : (succ n1) + n2 = succ (n1 + n2)"
                                        }
                                ],
                                goal: '(a b : nat) : a + b = b + a',
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
                                                raw: "(n1 n2 : nat) : n1 + n2 = n2 + n1"
                                        },
                                        
                                        {
                                                name: "one",
                                                raw: "1 : nat"
                                        },
                                        {
                                                name: "one_eq_succ_zero",
                                                raw: "1 = succ 0"
                                        }
                                ],
                                goal: '(n : nat) : succ n = n + 1',
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
                                                raw: "(n1 : nat) : succ n1 = n1 + 1"
                                        }
                                ],
                                goal: '(a b c : nat) : (a + b) + c = (a + c) + b',
                                description: `
                                The last theorem about addition; subtracting is such sweet sorrow.
                                `
                        },

                ]
        },


        {
                path: 'levels/world-3/',
                levels: [
                        {
                                name: 'Zero Times',
                                urlName: 'zero-times',
                                newAxioms: [
                                        {
                                                name: "add_right_comm",
                                                raw: "(n1 n2 n3 : nat) : (n1 + n2) + n3 = (n1 + n3) + n2"
                                        },
                                        {
                                                name: "mul",
                                                raw: "(n1 n2 : nat) : n1 * n2 : nat"
                                        },
                                        {
                                                name: "mul_zero",
                                                raw: "(n1 : nat) : n1 * 0 = 0"
                                        },
                                        {
                                                name: "mul_succ",
                                                raw: "(n1 n2 : nat) : n1 * (succ(n2)) = (n1 * n2) + n1"
                                        }
                                ],
                                goal: '(m : nat) : 0 * m = 0',
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
                                                raw: "(n1 : nat) : 0 * n1 = 0"
                                        },
                                ],
                                goal: '(m : nat) : m * 1 = m',
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
                                                raw: "(n1 : nat) : n1 * 1 = n1"
                                        },
                                ],
                                goal: '(m : nat) : 1 * m = m',
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
                                                raw: "(n1 : nat) : 1 * n1 = n1"
                                        },
                                ],
                                goal: '(t a b : mynat) : t * (a + b) = (t * a) + (t * b)',
                                description: `
                                This is known as left distributivity (left because the "t" is on the left side of the multiplication). We'll prove right distributivity later.
                                `
                        },
                ]
        }
]