let currentTip = {
        title: "Hello, World!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        display: true,
}


const axioms = [
        'succ a = b',
]

let statements = []
let goalRaw = 'succ (succ a) = succ b'
let goal
let currentStatement = null



document.addEventListener('mousemove', (event) => {
        if (currentStatement == null) return

        currentStatement.element.style.left = `calc(${event.clientX + 'px'} + 18px - 25%)`;
        currentStatement.element.style.top = event.clientY + 'px';
})


document.getElementById('axiom-list').addEventListener('mousedown', () => {
        if (currentStatement == null) return

        currentStatement.element.remove()
        statements = statements.filter(s => s.id !== currentStatement.id)
        currentStatement = null
})


document.getElementById('goal-card').addEventListener('mouseup', () => {
        if (currentStatement == null) return
        
        if (goal.rw(currentStatement.mobject)) {
                currentStatement.randomPosition()
                currentStatement = null
        }
        updateGoal()
})


document.getElementById('goal-card').addEventListener('dblclick', () => {
        goal.refl()
        updateGoal()
})


document.getElementById('whiteboard').addEventListener('mouseup', () => {
        if (currentStatement == null) return
        currentStatement = null
})



function init() {

        const axiomListEl = document.getElementById('axiom-list')


        axioms.forEach((axiom) => {
                
                const axiomBlock = document.createElement('div')

                axiomBlock.textContent = axiom

                axiomBlock.style.border = '2px solid black'
                axiomBlock.style.borderRadius = '8px'
                axiomBlock.style.width = '160px'
                axiomBlock.style.padding = '8px 16px'
                axiomBlock.style.marginBottom = '16px'
                axiomBlock.style.cursor = 'pointer'

                axiomBlock.addEventListener('click', () => {
                        spawnAxiom(axiom)
                })

                axiomListEl.appendChild(axiomBlock)

        })

        goal = new MObject(goalRaw)

        updateGoal()

}


function updateGoal() {
        const goalTextEl = document.getElementById('goal-text')
        goalTextEl.innerText = goal.raw
}




function spawnAxiom(axiom) {

        const axiomBlock = document.createElement('div')

        const statement = new Statement(axiom, axiomBlock)
        statements.push(statement)

        const whiteboardEl = document.getElementById('whiteboard')

        axiomBlock.textContent = statement.mobject.raw

        axiomBlock.style.border = '2px solid black'
        axiomBlock.style.borderRadius = '8px'
        axiomBlock.style.width = '160px'
        axiomBlock.style.padding = '8px 16px'
        axiomBlock.style.cursor = 'pointer'
        axiomBlock.style.backgroundColor = 'white'
        axiomBlock.style.position = 'absolute'
        axiomBlock.style.left = `${statement.x}%`
        axiomBlock.style.top = `${statement.y}%`
        axiomBlock.style.translate = '-50%'

        axiomBlock.addEventListener('mousedown', () => {
                currentStatement = statement
        })

        whiteboardEl.appendChild(axiomBlock)

}


function hideTip() {
        currentTip.display = false
        renderTip()
}

function renderTip() {
        document.getElementById('tip-card').style.display = currentTip.display ? 'block' : 'none'
        
        document.getElementById('tip-title').innerText = currentTip.title

        document.getElementById('tip-body').innerText = currentTip.body
}