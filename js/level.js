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



let isLevelFinished = false



document.addEventListener('mousemove', (event) => {
        if (currentStatement == null) return

        currentStatement.element.style.pointerEvents = 'none';

        console.log(tipIsHidden)
        const whiteboardEl = document.getElementById('whiteboard');
        const rect = whiteboardEl.getBoundingClientRect();
        const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
        currentStatement.element.style.left = `${xPercent}%`;
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
        // console.log(currentStatement)
        if (currentStatement == null) return
        
        if (windows[currentWindowIndex].goal.rw(currentStatement.mobject)) {
                resetCurrentStatement()
        }
        updateGoal()
})


document.getElementById('goal-card').addEventListener('dblclick', () => {
        attemptRefl()
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


document.addEventListener('keydown', (event) => {
        const searchBarEl = document.getElementById('search-bar')
        let firstAxiom = axioms.find(x => x.name.includes(searchBarEl.value))

        if (event.key === 'Escape') {
                hideTip()
        } else if (event.key === '/') {
                const searchBarEl = document.getElementById('search-bar')
                searchBarEl.value = ""
                searchBarEl.focus()
        } else if (event.key === 'Enter' && event.ctrlKey) {

                if (!firstAxiom) return

                windows[currentWindowIndex].goal.rw(new MObject(firstAxiom.raw))
                updateGoal()

        } else if (event.key === 'Enter') {
                if (firstAxiom) {
                        spawnAxiom(firstAxiom.raw)

                }
        } else if (event.key === 'j' && event.ctrlKey) {
                event.preventDefault()
                attemptRefl()
        } else if (event.key === '[') {
                event.preventDefault()
                const linkEl = document.getElementById('prev-link')
                linkEl.click()
        } else if (event.key === ']') {
                event.preventDefault()
                const linkEl = document.getElementById('next-link')
                linkEl.click()
        } else if (event.key === 'h' && document.activeElement !== document.getElementById('search-bar')) {
                event.preventDefault()
                toggleTip()
        }
});



function init() {

        updateAxioms()

        windows[currentWindowIndex].goal = new MObject(goalRaw, undefined, true)
        const hypothesises = MObject.identifyHypothesises(windows[currentWindowIndex].goal)

        hypothesises.forEach(hypothesis => {
                if (hypothesis.endsWith('nat')) {
                        const variables = hypothesis.split(':')[0].split(' ')
                        variables.forEach(variable => {
                                if (variable.length > 0) {
                                        spawnAxiom(`${variable} : nat`)
                                }
                        })
                } else {
                        spawnAxiom(hypothesis)
                }
        })
        windows[currentWindowIndex].goal.variables = []
        windows[currentWindowIndex].goal.reparseFromChunks()

        updateGoal()
        updateCheck()

}


function updateGoal() {
        const goalTextEl = document.getElementById('goal-text')
        goalTextEl.innerText = windows[currentWindowIndex].goal.raw
}




function spawnAxiom(axiom) {

        console.log(axiom)

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


let tipIsHidden = false

function hideTip() {
        document.getElementById('tip-card').style.display = 'none'
        document.getElementById('whiteboard').style.gridColumn = `span 6 / span 6`
        document.getElementById('help-toggle').innerText = 'Show Help'
        
        tipIsHidden = true
}

function showTip() {
        document.getElementById('tip-card').style.display = 'flex'
        document.getElementById('whiteboard').style.gridColumn = `span 3 / span 3`
        document.getElementById('help-toggle').innerText = 'Hide Help'
        
        tipIsHidden = false
}

function toggleTip() {
        if (tipIsHidden) {
                showTip()
        } else {
                hideTip()
        }
}


function performInduction(variable) {

        const currentWindow = windows[currentWindowIndex]
        
        const inductionResults = MObject.induction(currentWindow, variable)
        console.log(inductionResults)

        const window1 = currentWindow
        // Deep clone window1 except for statements, which need special handling
        const window2 = { goal: window1.goal, statements: [...window1.statements]};

        // For window1, duplicate each statement using spawnAxiom to ensure consistent creation
        window1.statements = window1.statements.map(statement => {
                spawnAxiom(statement.mobject.parenthesisedRaw());
                return -1;
        });
        // Remove the old statements (the originals before duplication)
        console.log(window1.statements)
        window1.statements = window1.statements.filter(x => x !== -1);
        console.log(window1.statements)

        window1.goal = inductionResults.newGoal1
        window2.goal = inductionResults.newGoal2
        
        windows.splice(currentWindowIndex, 1, window1, window2)
        
        currentWindowIndex += 1 // The new hypothesises belong to the second window
        
        spawnAxiom(inductionResults.newHyp1.parenthesisedRaw())
        spawnAxiom(inductionResults.newHyp2.parenthesisedRaw())

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
                document.getElementById('level-complete').classList.remove('hidden')
                isLevelFinished = true
                localStorage.setItem(currentLevelId, 'complete')
                launchConfetti()
                updateCheck()
        }
}


function resetCurrentStatement() {
        currentStatement.randomPosition()
        currentStatement.element.style.pointerEvents = 'auto';
        currentStatement = null
}


function updateAxioms(searchTerm="") {

        if (searchTerm.endsWith('/')) {
                const searchBarEl = document.getElementById('search-bar')
                searchBarEl.value = [...searchBarEl.value].filter(x => x !== '/').join('')
        }

        const axiomListEl = document.getElementById('axiom-list');

        [...axiomListEl.children].forEach(child => child.remove());

        const axiomCategoryEls = {}

        for (const axiom in AxiomCategory) {
                const newEl = document.createElement('div')
                const newElTitle = document.createElement('p')
                newEl.appendChild(newElTitle)
                newElTitle.innerText = [...axiom].map((a,i) => i==0 ? a.toUpperCase() : a).join('')
                newElTitle.addEventListener('click', (event) => {
                                if (event.target !== newElTitle) return; // Ignore clicks from child nodes
                                [...newEl.children].forEach((child, index) => 
                                        child.style.display = (child.style.display == 'none' || index == 0) ? 'block' : 'none')
                })

                newElTitle.style.fontWeight = 'bold'
                newElTitle.style.margin = '0px 0px 8px'
                newElTitle.style.cursor = 'pointer'

                axiomListEl.appendChild(newEl)
                axiomCategoryEls[AxiomCategory[axiom]] = newEl
        }

        console.log(axiomCategoryEls)


        axioms.forEach((axiom) => {

                if (!axiom.name.includes(searchTerm)) return
                
                const axiomBlock = document.createElement('div')

                axiomBlock.innerHTML = `<strong>${axiom.name}</strong><br />${axiom.raw}`

                axiomBlock.style.border = '2px solid black'
                axiomBlock.style.borderRadius = '8px'
                axiomBlock.style.maxWidth = '200px'
                axiomBlock.style.padding = '8px 16px'
                axiomBlock.style.marginBottom = '16px'
                axiomBlock.style.cursor = 'pointer'
                axiomBlock.style.fontWeight = 'normal'

                axiomBlock.addEventListener('click', () => {
                        spawnAxiom(axiom.raw)
                })

                axiomCategoryEls[axiom.category.toString()].appendChild(axiomBlock)

        })
}


function attemptRefl() {
        const didReflWork = windows[currentWindowIndex].goal.refl()

        if (didReflWork) {
                removeCurrentWindow()
                cycleContext(currentWindowIndex % windows.length)
        }

        updateGoal()
}


function updateCheck() {
        if (localStorage.getItem(currentLevelId) == 'complete') {
                if (!document.getElementById('level-name').innerText.endsWith('✅')) {
                        document.getElementById('level-name').innerText += ' ✅'
                }
        } else {
                console.log('not done')
        }
}


function launchConfetti() {
        confetti({
                particleCount: 200,  // Number of confetti pieces (default: 50)
                spread: 70,          // Spread angle in degrees (default: 45)
                origin: { y: 0.6 }   // Starting y-position (0 = top, 1 = bottom; default: 0.6)
        });
}