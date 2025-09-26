const fs = require('fs');
const path = require('path');


const worlds = [
        {
                path: 'levels/world-0/',
                levels: [
                        {
                                name: 'the-double-click',
                                newAxioms: [],
                                goal: '(x y z : mynat) : x * y + z = x * y + z'
                        },
                ]
        }
]


const templatePath = path.join(__dirname, 'template.html');


const axiomList = []


worlds.forEach(world => {

        const levelsDir = path.join(__dirname, world.path);
        
        if (!fs.existsSync(levelsDir)) {
                fs.mkdirSync(levelsDir, { recursive: true });
        }

        world.levels.forEach((level, index) => {

                axiomList.push(...level.newAxioms)

                const previousLevel = index > 0 ? world.levels[index - 1] : null
                const nextLevel = index < world.levels.length-1 ? world.levels[index + 1] : null

                const axioms = axiomList.map(x => `'${x}'`).join(',')
                const goal = `"${level.goal}"`
                const previousLink = previousLevel ? path.join('/' + world.path, `${'level-' + (index+0) + '-' + previousLevel.name}.html`) : '#';
                const nextLink = nextLevel ? path.join('/' + world.path, `${'level-' + (index+2) + '-' + nextLevel.name}.html`) : '#';

                const levelPath = path.join(levelsDir, `${'level-' + (index+1) + '-' + level.name}.html`);
                let templateContent = fs.readFileSync(templatePath, 'utf8');

                templateContent = templateContent.replace('{{ axiomList }}', axioms);
                templateContent = templateContent.replace('{{ goalRaw }}', goal);
                templateContent = templateContent.replace('{{ previousLink }}', previousLink);
                templateContent = templateContent.replace('{{ nextLink }}', nextLink);

                fs.writeFileSync(levelPath, templateContent);
                console.log(`Created ${levelPath}`);

        })


})
