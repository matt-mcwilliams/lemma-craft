const fs = require('fs');
const path = require('path');


const worlds = [
        {
                path: 'levels/world-0/',
                levels: [
                        {
                                name: 'The Double Click',
                                urlName: 'the-double-click',
                                newAxioms: [],
                                goal: '(x y z : mynat) : x * y + z = x * y + z'
                        },
                        
                        {
                                name: 'Drag \'n Drop',
                                urlName: 'drag-n-drop',
                                newAxioms: [],
                                goal: '(x y : mynat) (y = x + 7) : 2 * y = 2 * (x + 7)'
                        },

                        {
                                name: 'The Axioms',
                                urlName: 'the-axioms',
                                newAxioms: [
                                        '0 : nat',
                                        '(n : nat) : succ n : nat'
                                ],
                                goal: '(a b : mynat) (succ a = b) : succ(succ(a)) = succ(b)'
                        },

                        {
                                name: 'Addition',
                                urlName: 'addition',
                                newAxioms: [
                                        '(n1 n2 : mynat) : n1 + n2 : nat',
                                        '(n1 : mynat) : n1 + 0 = n1',
                                        '(n1 n2 : mynat) : n1 + succ(n2) = succ (n1 + n2)'
                                ],
                                goal: '(a : mynat) : a + succ(0) = succ(a)'
                        }
                ]
        }
]


const templatePath = path.join(__dirname, 'template.html');


const axiomList = []


worlds.forEach((world, worldIndex) => {

        const levelsDir = path.join(__dirname, world.path);
        
        if (!fs.existsSync(levelsDir)) {
                fs.mkdirSync(levelsDir, { recursive: true });
        }

        world.levels.forEach((level, levelIndex) => {

                axiomList.push(...level.newAxioms)

                const previousLevel = levelIndex > 0 ? world.levels[levelIndex - 1] : null
                const nextLevel = levelIndex < world.levels.length-1 ? world.levels[levelIndex + 1] : null

                const axioms = axiomList.map(x => `'${x}'`).join(',')
                const goal = `"${level.goal}"`
                const previousLink = previousLevel ? path.join('/' + world.path, `${'level-' + (levelIndex+0) + '-' + previousLevel.urlName}.html`) : '#';
                const nextLink = nextLevel ? path.join('/' + world.path, `${'level-' + (levelIndex+2) + '-' + nextLevel.urlName}.html`) : '#';
                const levelName = level.name
                const levelCode = `Level ${worldIndex+1}-${levelIndex+1}`

                const levelPath = path.join(levelsDir, `${'level-' + (levelIndex+1) + '-' + level.urlName}.html`);
                let templateContent = fs.readFileSync(templatePath, 'utf8');

                templateContent = templateContent.replace('{{ axiomList }}', axioms);
                templateContent = templateContent.replace('{{ goalRaw }}', goal);
                templateContent = templateContent.replace('{{ previousLink }}', previousLink);
                templateContent = templateContent.replace('{{ nextLink }}', nextLink);
                templateContent = templateContent.replace('{{ levelName }}', levelName);
                templateContent = templateContent.replace('{{ levelCode }}', levelCode);

                fs.writeFileSync(levelPath, templateContent);
                console.log(`Created ${levelPath}`);

        })


})
