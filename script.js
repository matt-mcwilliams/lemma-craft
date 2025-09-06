let idCounter = 0

let hypothesises = []

let selectedStatements = []
let conclusion = ""

let workingBlock = {
        working: true,
        givens: [],
        goal: {item:'',id:++idCounter},
}

let proof = [
        workingBlock
]

function newTheorem() {
        document.getElementById('expanded-file').classList.add('hidden')
        document.getElementById('theorem').style.display = 'block'
}

function newTheoremAddHypothesis(newItem) {
        if (!isValidStatement(newItem)) {
                alert("Invalid statement")
                return
        }

        hypothesises.push({id:++idCounter, item:newItem})
        selectedStatements.length = 0
        updateHypothesisList()  
}


function updateHypothesisList() {
        const hypothesisList = document.getElementById('new-theorem-hypothesises')
        hypothesisList.innerHTML = hypothesises.map((item) => {
                const classList = selectedStatements.includes(item.id) ? 'selected' : ''
                const onclick = `selectStatement(${item.id})`
                return `<p class="${classList}" onclick="${onclick}">${item.item}</p>`
        }).join('')
}

function updateConclusion() {
        document.getElementById('new-theorem-conclusion').innerText = conclusion
}

function selectStatement(id) {
        if (selectedStatements.includes(id)) {
                selectedStatements = selectedStatements.filter((item) => id !== item)
                updateHypothesisList()
                updateProof()
                return
        }
        selectedStatements.push(id)
        updateHypothesisList()
        updateProof()
}

function newTheoremSetConclusion(newItem) {
        conclusion = newItem;
        updateConclusion()
        document.getElementById('ok-button').disabled = false;
}

function setNewTheorem() {

        workingBlock = {
                working: true,
                givens: [],
                goal: {item:'',id:++idCounter},
        }

        proof = [
                workingBlock
        ]

        document.getElementById('theorem').style.display = 'none';
        document.getElementById('proof-screen').style.display = 'block'
        document.getElementById('welcome-screen').style.display = 'none'

        if (hypothesises.length > 0) {
                document.getElementById('assumptions').innerText = `Suppose ${hypothesises.map(h => h.item).join(', ')}. `
        } else {
                document.getElementById('assumptions').innerText = ``
        }

        document.getElementById('conclusion').innerText = `Then ${conclusion}. `

        workingBlock.givens = hypothesises.map((h,i) => ({item:parseStatement(h.item), id:++idCounter}))
        workingBlock.goal.item = parseStatement(conclusion)

        updateProof()
}


function updateProof() {
        const blockHTML = `
        <div style='background-color:#ffaaaa; border: 1px solid black; padding: 6px;'>
                <p>Proof of ${workingBlock.goal.item.raw} goes here.</p>
                <p><strong>Givens:</strong></p>
                <ul>
                        ${workingBlock.givens.map(
                                ({item, id}) => `<li 
                                class='${selectedStatements.includes(id) ? 'selected ' : ''}'
                                onclick='selectStatement(${id})'
                                >${item.raw}</li>`
                        )}
                </ul>
                <p><strong>Goals:</strong></p>
                <ul>
                        <li
                        class='${selectedStatements.includes(workingBlock.goal.id) ? 'selected ' : ''}'
                        onclick='selectStatement(${workingBlock.goal.id})'
                        >${workingBlock.goal.item.raw}</li>
                </ul>
        </div>
        `
        document.getElementById('proof').innerHTML = proof.map(
                step => step.working ? blockHTML : `<p>${step}</p>`
        ).join('')
}

function finishTheorem() {

        if (selectedStatements.length !== 1) {
                alert('please select one statement')
                return
        }

        const selectedStatement = workingBlock.givens.find(given => given.id == selectedStatements)

        if (selectedStatement && selectedStatement.item.raw == workingBlock.goal.item.raw) {
                proof = proof.map(chunk => chunk.working ? `Thus, ${workingBlock.goal.item.raw}` : chunk)
                updateProof()
        } else {
                console.log('fail')
        }

}

function isValidStatement(statement, firstStatement=true) {
        try {
                const parsed = statement.left ? statement : parseStatement(statement)
                if (!!parsed.left) {
                        return isValidStatement(parsed.left, false) && isValidStatement(parsed.right, false)
                }
                return !firstStatement && statement.length==1
        } catch {
                return false
        }
        
}

function parseStatement(statement) {
        let statements;
        // 1. Conditionals
        statements = statement.split('→')
        if (statements.length > 2) { throw Error('Improper statement') }
        if (statements.length == 2) { return { 
                left: parseStatement(statements[0]),
                right: parseStatement(statements[1]),
                operator: '→',
                raw: statement
        }}

        return statement
}


function applyDirect() {
        if (selectedStatements[0] != workingBlock.goal.id || workingBlock.goal.item.operator !== '→') {
                alert('select a → goal')
                return
        }

        const blockIndex = proof.findIndex(statement => statement.working)

        proof.splice(blockIndex+1,0,`Therefore ${workingBlock.goal.item.raw}`)
        proof.splice(blockIndex,0,`Suppose ${workingBlock.goal.item.left.raw}`)

        workingBlock.givens.push({
                id: ++idCounter,
                item: workingBlock.goal.item.left
        })

        workingBlock.goal.item = workingBlock.goal.item.right

        updateProof()
}