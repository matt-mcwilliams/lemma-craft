let currentTip = {
        title: "Hello, World!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        display: true,
}

let windows = [
        {
                statements: [],
                goal: undefined
        }
]

let currentWindowIndex = 0

let currentStatement = null



document.addEventListener('mousemove', (event) => {
        if (currentStatement == null) return

        currentStatement.element.style.pointerEvents = 'none';

        currentStatement.element.style.left = `calc(${event.clientX + 'px'} + 18px - 25%)`;
        currentStatement.element.style.top = event.clientY + 'px';
})


document.getElementById('axiom-list').addEventListener('mouseup', () => {
        if (currentStatement == null) return

        currentStatement.element.remove()
        windows[currentWindowIndex].statements = windows[currentWindowIndex].statements.filter(s => s.id !== currentStatement.id)
        currentStatement.element.style.pointerEvents = 'auto';
        currentStatement = null
})


document.getElementById('goal-card').addEventListener('mouseup', () => {
        console.log(currentStatement)
        if (currentStatement == null) return
        
        if (windows[currentWindowIndex].goal.rw(currentStatement.mobject)) {
                resetCurrentStatement()
        }
        updateGoal()
})


document.getElementById('goal-card').addEventListener('dblclick', () => {
        const didReflWork = windows[currentWindowIndex].goal.refl()

        if (didReflWork) {
                removeCurrentWindow()
                cycleContext(currentWindowIndex % windows.length)
        }

        updateGoal()
})


document.getElementById('whiteboard').addEventListener('mouseup', () => {
        if (currentStatement == null) return
        currentStatement.element.style.pointerEvents = 'auto';
        currentStatement = null
})


document.getElementById('induction-button').addEventListener('mouseup', () => {
        if (currentStatement == null) return
        if (currentStatement.mobject.chunks.length !== 3 || currentStatement.mobject.chunks[1] !== ':') return

        const variable = currentStatement.mobject.chunks[0]

        windows[currentWindowIndex].statements = windows[currentWindowIndex].statements.map(statement => statement != currentStatement ? statement : null).filter(statement => statement != null)
        currentStatement.element.remove()

        performInduction(variable)
})



function init() {

        const axiomListEl = document.getElementById('axiom-list')


        axioms.forEach((axiom) => {
                
                const axiomBlock = document.createElement('div')

                axiomBlock.textContent = axiom

                axiomBlock.style.border = '2px solid black'
                axiomBlock.style.borderRadius = '8px'
                axiomBlock.style.maxWidth = '200px'
                axiomBlock.style.padding = '8px 16px'
                axiomBlock.style.marginBottom = '16px'
                axiomBlock.style.cursor = 'pointer'

                axiomBlock.addEventListener('click', () => {
                        spawnAxiom(axiom)
                })

                axiomListEl.appendChild(axiomBlock)

        })

        windows[currentWindowIndex].goal = new MObject(goalRaw)

        windows[currentWindowIndex].goal.variables.forEach(variable => spawnAxiom(`${variable} : nat`))
        windows[currentWindowIndex].goal.variables = []
        windows[currentWindowIndex].goal.reparseFromChunks()

        updateGoal()

}


function updateGoal() {
        const goalTextEl = document.getElementById('goal-text')
        goalTextEl.innerText = windows[currentWindowIndex].goal.raw
}




function spawnAxiom(axiom) {

        const axiomBlock = document.createElement('div')

        const statement = new Statement(axiom, axiomBlock)
        windows[currentWindowIndex].statements.push(statement)

        const whiteboardEl = document.getElementById('whiteboard')

        axiomBlock.textContent = statement.mobject.raw

        axiomBlock.style.border = '2px solid black'
        axiomBlock.style.borderRadius = '8px'
        axiomBlock.style.maxWidth = '600px'
        axiomBlock.style.whiteSpace = 'nowrap'
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

        axiomBlock.addEventListener('mouseup', () => {
                if (statement.id === currentStatement.id) { return }
                if (statement.mobject.rw(currentStatement.mobject)) {
                        axiomBlock.textContent = statement.mobject.raw
                        currentStatement.randomPosition()
                }
        })

        whiteboardEl.appendChild(axiomBlock)

        return axiom

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



function performInduction(variable) {

        const currentWindow = windows[currentWindowIndex]
        
        const inductionResults = MObject.induction(currentWindow, variable)

        const window1 = currentWindow
        // Deep clone window1 except for statements, which need special handling
        const window2 = { goal: window1.goal, statements: [...window1.statements]};

        // For window1, duplicate each statement using spawnAxiom to ensure consistent creation
        window1.statements = window1.statements.map(statement => {
                // Use spawnAxiom to create a new statement and DOM element
                spawnAxiom(statement.mobject.raw);
                // The new statement is pushed to window1.statements by spawnAxiom,
                // so we don't need to return anything here.
                // We'll remove the old statements after this map.
                return statement;
        });
        // Remove the old statements (the originals before duplication)
        window1.statements.splice(0, window1.statements.length / 2);

        window1.goal = inductionResults.newGoal1
        window2.goal = inductionResults.newGoal2
        
        windows.splice(currentWindowIndex, 1, window1, window2)
        
        currentWindowIndex += 1 // The new hypothesises belong to the second window
        
        spawnAxiom(inductionResults.newHyp1.raw)
        spawnAxiom(inductionResults.newHyp2.raw)

        currentWindowIndex -= 1

        console.log(windows)
        
        cycleContext(currentWindowIndex)

}



function cycleContext(newIndex = null) {
        
        if (newIndex == null) {
                newIndex = (currentWindowIndex + 1) % windows.length
        }
        
        currentWindowIndex = newIndex

        windows.forEach((window, windowIndex) => {
                window.statements.forEach(statement => {
                        if (windowIndex == newIndex) {
                                statement.element.classList.add('block')
                                statement.element.classList.remove('hidden')
                        } else {
                                statement.element.classList.add('hidden')
                                statement.element.classList.remove('block')
                        }
                })
        })

        document.getElementById('windowIndex').textContent = newIndex + 1
        document.getElementById('windowCount').textContent = windows.length
        
        updateGoal()


}


function removeCurrentWindow() {
        windows[currentWindowIndex].statements.forEach(statement => {
                statement.element.remove()
        })
        windows.splice(currentWindowIndex, 1)

        if (windows.length > 0) {
                cycleContext(currentWindowIndex % windows.length)
        } else {
                alert('Finish!')
        }
}


function resetCurrentStatement() {
        currentStatement.randomPosition()
        currentStatement.element.style.pointerEvents = 'auto';
        currentStatement = null
}