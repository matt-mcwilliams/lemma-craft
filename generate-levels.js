const fs = require('fs');
const path = require('path');


const worlds = [
        {
                path: 'levels/world-0/',
                levels: [
                        'level-1-double-click'
                ]
        }
]


const templatePath = path.join(__dirname, 'template.html');


worlds.forEach(world => {

        const levelsDir = path.join(__dirname, world.path);

        if (!fs.existsSync(levelsDir)) {
                fs.mkdirSync(levelsDir);
        }


        world.levels.forEach(level => {

                const levelPath = path.join(levelsDir, `${level}.html`);
                fs.copyFileSync(templatePath, levelPath);
                console.log(`Created ${levelPath}`);

        })


})
