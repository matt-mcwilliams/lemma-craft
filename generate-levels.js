const fs = require('fs');
const path = require('path');
const { worlds, AxiomCategory } = require('./worlds');


const templatePath = path.join(__dirname, 'template.html');


const axiomList = []

const levelsRoot = path.join(__dirname, 'levels');

if (fs.existsSync(levelsRoot)) {
        fs.rmSync(levelsRoot, { recursive: true, force: true });
}


worlds.forEach((world, worldIndex) => {

        const levelsDir = path.join(__dirname, world.path);
        
        if (!fs.existsSync(levelsDir)) {
                fs.mkdirSync(levelsDir, { recursive: true });
        }

        world.levels.forEach((level, levelIndex) => {

                axiomList.push(...level.newAxioms)

                const nextNewWorld = levelIndex >= world.levels.length-1
                const prevNewWorld = levelIndex == 0

                const previousLevel = prevNewWorld ? (worlds[worldIndex-1]?.levels[worlds[worldIndex-1]?.levels.length - 1] ?? null) : world.levels[levelIndex-1]
                const nextLevel = nextNewWorld ? (worlds[worldIndex+1]?.levels[0] ?? null) : world.levels[levelIndex + 1]

                const axioms = JSON.stringify(axiomList)
                const axiomCategory = JSON.stringify(AxiomCategory)
                const goal = `"${level.goal}"`

                const previousLink = previousLevel ? path.join(prevNewWorld ? `../../${worlds[worldIndex-1].path}` : '.', `${'level-' + (prevNewWorld ? worlds[worldIndex-1].levels.length : levelIndex) + '-' + previousLevel.urlName}.html`) : '#';

                const nextLink = nextLevel ? path.join(nextNewWorld ? `../../${worlds[worldIndex+1].path}` : '.', `${'level-' + ((levelIndex+1)%(world.levels.length)+1) + '-' + nextLevel.urlName}.html`) : '#';
                const levelCode = `Level ${worldIndex+1}-${levelIndex+1}`

                const levelPath = path.join(levelsDir, `${'level-' + (levelIndex+1) + '-' + level.urlName}.html`);
                let templateContent = fs.readFileSync(templatePath, 'utf8');

                templateContent = templateContent.replaceAll('{{ axiomList }}', axioms);
                templateContent = templateContent.replaceAll('{{ goalRaw }}', goal);
                templateContent = templateContent.replaceAll('{{ previousLink }}', previousLink);
                templateContent = templateContent.replaceAll('{{ nextLink }}', nextLink);
                templateContent = templateContent.replaceAll('{{ levelName }}', level.name);
                templateContent = templateContent.replaceAll('{{ levelCode }}', levelCode);
                templateContent = templateContent.replaceAll('{{ tipName }}', level.name);
                templateContent = templateContent.replaceAll('{{ tipDescription }}', level.description.replaceAll('\n', '<br/>'));
                templateContent = templateContent.replaceAll('{{ axiomCategory }}', axiomCategory);
                templateContent = templateContent.replaceAll('{{ currentLevelId }}', `"${worldIndex+1}-${levelIndex+1}"`);

                fs.writeFileSync(levelPath, templateContent);
                console.log(`Created ${levelPath}`);

        })


})
