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

                const previousLevel = levelIndex > 0 ? world.levels[levelIndex - 1] : null
                const nextLevel = levelIndex < world.levels.length-1 ? world.levels[levelIndex + 1] : null

                const axioms = JSON.stringify(axiomList)
                const axiomCategory = JSON.stringify(AxiomCategory)
                const goal = `"${level.goal}"`
                const previousLink = previousLevel ? path.join('/' + world.path, `${'level-' + (levelIndex+0) + '-' + previousLevel.urlName}.html`) : '#';
                const nextLink = nextLevel ? path.join('/' + world.path, `${'level-' + (levelIndex+2) + '-' + nextLevel.urlName}.html`) : '#';
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
                templateContent = templateContent.replaceAll('{{ tipDescription }}', level.description);
                templateContent = templateContent.replaceAll('{{ axiomCategory }}', axiomCategory);
                templateContent = templateContent.replaceAll('{{ currentLevelId }}', `"${worldIndex+1}-${levelIndex+1}"`);

                fs.writeFileSync(levelPath, templateContent);
                console.log(`Created ${levelPath}`);

        })


})
