const fs = require('fs');
const path = require('path');
const { chapters, AxiomCategory } = require('./worlds');


const templateStoryPath = path.join(__dirname, 'template-story.html');
const templateMathPath = path.join(__dirname, 'template-math.html');


const axiomList = []

const levelsRoot = path.join(__dirname, 'levels');

if (fs.existsSync(levelsRoot)) {
        fs.rmSync(levelsRoot, { recursive: true, force: true });
}


chapters.forEach((world, worldIndex) => {

        const levelsDir = path.join(__dirname, world.path);
        
        if (!fs.existsSync(levelsDir)) {
                fs.mkdirSync(levelsDir, { recursive: true });
        }

        world.levels.forEach((level, levelIndex) => {

                axiomList.push(...level.newAxioms)

                const nextNewWorld = levelIndex >= world.levels.length-1
                const prevNewWorld = levelIndex == 0

                const previousLevel = prevNewWorld ? (chapters[worldIndex-1]?.levels[chapters[worldIndex-1]?.levels.length - 1] ?? null) : world.levels[levelIndex-1]
                const nextLevel = nextNewWorld ? (chapters[worldIndex+1]?.levels[0] ?? null) : world.levels[levelIndex + 1]

                const axioms = JSON.stringify(axiomList)
                const axiomCategory = JSON.stringify(AxiomCategory)
                const goal = `"${level.goal}"`

                const previousLink = previousLevel ? path.join(prevNewWorld ? `../../${chapters[worldIndex-1].path}` : '.', `${'level-' + (prevNewWorld ? chapters[worldIndex-1].levels.length : levelIndex) + '-' + previousLevel.urlName}.html`) : '#';

                const nextLink = nextLevel ? path.join(nextNewWorld ? `../../${chapters[worldIndex+1].path}` : '.', `${'level-' + ((levelIndex+1)%(world.levels.length)+1) + '-' + nextLevel.urlName}.html`) : '#';
                const levelCode = `Level ${worldIndex+1}-${levelIndex+1}`

                const levelPath = path.join(levelsDir, `${'level-' + (levelIndex+1) + '-' + level.urlName}.html`);
                let templateContent = fs.readFileSync(templateStoryPath, 'utf8');

                templateContent = templateContent.replaceAll('{{ axiomList }}', axioms);
                templateContent = templateContent.replaceAll('{{ goalRaw }}', goal);
                templateContent = templateContent.replaceAll('{{ previousLink }}', previousLink);
                templateContent = templateContent.replaceAll('{{ nextLink }}', nextLink);
                templateContent = templateContent.replaceAll('{{ levelName }}', level.name);
                templateContent = templateContent.replaceAll('{{ levelCode }}', levelCode);
                templateContent = templateContent.replaceAll('{{ storyName }}', level.name);
                templateContent = templateContent.replaceAll('{{ lemmaName }}', level.lemmaName);
                templateContent = templateContent.replaceAll('{{ story }}', level.story?.trim().replaceAll('\n', '<br/>'));
                templateContent = templateContent.replaceAll('{{ help }}', level.help?.trim().replaceAll('\n', '<br/>') ?? '');
                templateContent = templateContent.replaceAll('{{ axiomCategory }}', axiomCategory);
                templateContent = templateContent.replaceAll('{{ currentLevelId }}', `"${worldIndex+1}-${levelIndex+1}"`);

                fs.writeFileSync(levelPath, templateContent);
                console.log(`Created ${levelPath}`);

        })


})


function lemmaToUrlName(lemmaName) {
        return lemmaName.replaceAll('_','-')
}


chapters.forEach((world, worldIndex) => {

        const levelsDir = path.join(__dirname, world.path);
        
        if (!fs.existsSync(levelsDir)) {
                fs.mkdirSync(levelsDir, { recursive: true });
        }

        world.levels.forEach((level, levelIndex) => {

                axiomList.push(...level.newAxioms)

                const nextNewWorld = levelIndex >= world.levels.length-1
                const prevNewWorld = levelIndex == 0

                const previousLevel = prevNewWorld ? (chapters[worldIndex-1]?.levels[chapters[worldIndex-1]?.levels.length - 1] ?? null) : world.levels[levelIndex-1]
                const nextLevel = nextNewWorld ? (chapters[worldIndex+1]?.levels[0] ?? null) : world.levels[levelIndex + 1]

                const axioms = JSON.stringify(axiomList)
                const axiomCategory = JSON.stringify(AxiomCategory)
                const goal = `"${level.goal}"`

                const previousLink = previousLevel ? path.join(prevNewWorld ? `../../${chapters[worldIndex-1].path}` : '.', `${'level-' + (prevNewWorld ? chapters[worldIndex-1].levels.length : levelIndex) + '-' + lemmaToUrlName(previousLevel.lemmaName)}.html`) : '#';

                const nextLink = nextLevel ? path.join(nextNewWorld ? `../../${chapters[worldIndex+1].path}` : '.', `${'level-' + ((levelIndex+1)%(world.levels.length)+1) + '-' + lemmaToUrlName(nextLevel.lemmaName)}.html`) : '#';
                const levelCode = `Level ${worldIndex+1}-${levelIndex+1}`

                const levelPath = path.join(levelsDir, `${'level-' + (levelIndex+1) + '-' + lemmaToUrlName(level.lemmaName)}.html`);
                let templateContent = fs.readFileSync(templateMathPath, 'utf8');

                templateContent = templateContent.replaceAll('{{ axiomList }}', axioms);
                templateContent = templateContent.replaceAll('{{ goalRaw }}', goal);
                templateContent = templateContent.replaceAll('{{ previousLink }}', previousLink);
                templateContent = templateContent.replaceAll('{{ nextLink }}', nextLink);
                templateContent = templateContent.replaceAll('{{ levelName }}', level.name);
                templateContent = templateContent.replaceAll('{{ levelCode }}', levelCode);
                templateContent = templateContent.replaceAll('{{ storyName }}', level.name);
                templateContent = templateContent.replaceAll('{{ lemmaName }}', level.lemmaName);
                templateContent = templateContent.replaceAll('{{ story }}', level.story?.trim().replaceAll('\n', '<br/>'));
                templateContent = templateContent.replaceAll('{{ help }}', level.help?.trim().replaceAll('\n', '<br/>') ?? '');
                templateContent = templateContent.replaceAll('{{ axiomCategory }}', axiomCategory);
                templateContent = templateContent.replaceAll('{{ currentLevelId }}', `"${worldIndex+1}-${levelIndex+1}"`);

                fs.writeFileSync(levelPath, templateContent);
                console.log(`Created ${levelPath}`);

        })


})