let currentTip = {
        title: "Hello, World!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        display: true,
}


const axioms = [
        '0 : nat',
        'n : nat',
        '( a : nat ) : a + 0 = a',
        '( a d : nat ) : a + succ ( d ) = succ ( a + d )'
]

let goalRaw = '0 + n = n'




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
        currentStatement = null
})


document.getElementById('goal-card').addEventListener('mouseup', () => {
        console.log(currentStatement)
        if (currentStatement == null) return
        
        if (windows[currentWindowIndex].goal.rw(currentStatement.mobject)) {
                currentStatement.randomPosition()
                currentStatement = null
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
                statement.mobject.rw(currentStatement.mobject)
                axiomBlock.textContent = statement.mobject.raw
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



function performInduction() {

        const currentWindow = windows[currentWindowIndex]
        
        const inductionResults = MObject.induction(currentWindow, 'n')

        const window1 = currentWindow
        const window2 = JSON.parse(JSON.stringify(window1))

        window1.goal = inductionResults.newGoal1
        window2.goal = inductionResults.newGoal2
        
        windows.splice(currentWindowIndex, 1, window1, window2)
        
        currentWindowIndex += 1 // The new hypothesises belong to the second window
        
        spawnAxiom(inductionResults.newHyp1.raw)
        spawnAxiom(inductionResults.newHyp2.raw)

        currentWindowIndex -= 1
        
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