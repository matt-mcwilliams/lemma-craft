const ANALYSISSTATES = {
        STATEMENT: 1,
        TRUTHTABLE: 2,
        VENNDIAGRAM: 3,
}

let analysisMode = ANALYSISSTATES.STATEMENT

let currentStatement = null
let statementQueue = []


function setAnalysisMode(mode) {
        analysisMode = mode
        statementQueue.length = 1

        if (currentStatement == null) return
        
        clearTruthTable()
        clearRender()
        // clearVennDiagram()

        switch (analysisMode) {
                case ANALYSISSTATES.STATEMENT:
                        renderStatement(currentStatement)
                        break;
                
                case ANALYSISSTATES.TRUTHTABLE:
                        truthTable(currentStatement)
                        break;
                
                case ANALYSISSTATES.VENNDIAGRAM:
                        vennDiagram(currentStatement)
                        break;
                                
                default:
                        break;
        }
}



function analyzeStatement(newMathObject) {
        let mathObject = null
        if (typeof newMathObject == 'string') {
                mathObject = new MathObject(newMathObject)
        } else {
                mathObject = newMathObject
        }
        currentStatement = mathObject
        statementQueue.push(currentStatement)

        clearRender()
        clearTruthTable()
        // clearVennDiagram()

        switch (analysisMode) {
                case ANALYSISSTATES.STATEMENT:
                        renderStatement(mathObject)
                        break;
                
                case ANALYSISSTATES.TRUTHTABLE:
                        truthTable(mathObject)
                        break;
                
                case ANALYSISSTATES.VENNDIAGRAM:
                        vennDiagram(currentStatement)
                        break

        
                default:
                        break;
        }
        
}


function insertSymbol(symbol) {
        const textBox = document.getElementById('statement-input')

        const startPos = textBox.selectionStart;
        const endPos = textBox.selectionEnd;
        const originalValue = textBox.value;

        textBox.value = originalValue.substring(0, startPos) + 
                symbol + 
                originalValue.substring(endPos, originalValue.length);

        textBox.selectionStart = startPos + symbol.length;
        textBox.selectionEnd = startPos + symbol.length;
        textBox.focus();
}


function renderStatement(statement) {
        console.log(statement)
        if (typeof statement === "string") statement = JSON.parse(statement)
        const statementAnalysisEl = document.getElementById('statement-analysis')

        const tag = `<div class="flex align-middle group relative">
                <span class="text-white/50">${SYMBOLINFO[statement.symbol]?.name ?? "variable"}:</span>
                
        </div>`

        const leftEl = statement.left == UNDEFINED ? '' : `<button class="${statement.left.left ? 'text-red-700 ' : 'text-red-300 '} ${statement.left.left ? 'cursor-pointer bg-gray-100/80 px-10 py-3 rounded-xl ' : ''}" onclick='analyzeStatement(${JSON.stringify(statement.left ?? statement)})'>${statement.left.raw ?? statement.left}</button>`

        const symbolEl = `<span class="text-white px-6">${statement.symbol !== UNDEFINED ? statement.symbol : statement.raw}</span>`
        
        const rightEl = statement.right == UNDEFINED ? '' : `<button class="${statement.right.left ? 'text-blue-700 ' : 'text-blue-300 '} ${statement.right.left ? 'cursor-pointer bg-gray-100/80 px-10 py-3 rounded-xl ' : ''}" onclick='analyzeStatement(${JSON.stringify(statement.right ?? statement)})'>${statement.right.raw ?? statement.right}</button>`

        statementAnalysisEl.innerHTML = `
        <div class="flex gap-8 justify-center-safe align-middle">${tag}  <div>${leftEl}${symbolEl}${rightEl}</div></div>
        ${statementQueue.length > 1 ? '<button class="bg-white text-4xl text-black" onclick="statementQueue.pop(); analyzeStatement(statementQueue.pop())">Back</button>' : ''}
        `
        console.log(statementQueue)

        
}


function clearRender() {
        const statementAnalysisEl = document.getElementById('statement-analysis')
        statementAnalysisEl.innerHTML = ''
}


function truthTable(statement) {
        document.getElementById('truthtable-head').innerHTML = `
        ${[...statement.variables].map(x => `<th class="px-7 py-2 border-b-4 border-b-white">${x}</th>`).join('')}
        <th class="px-7 py-2 border-b-4 border-b-white">${statement.raw}</th>
        `

        let truthTableBodyEl = document.getElementById('truthtable-body')
        truthTableBodyEl.innerHTML = ''

        for (let i = 0; i < Math.pow(2, [...statement.variables].length); i++) {

                const variables = [...i.toString(2).padStart([...statement.variables].length,'0')].map((x,index) => [x, [...statement.variables][index]])

                truthTableBodyEl.innerHTML += `
                <tr class="border-b-2 border-b-white last:border-b-0">
                        ${variables.map(x => `<td class="py-2">${x[0] == 0 ? 'F' : 'T'}</td>`).join('')}
                        <td class="py-2">${statement.evaluate(Object.fromEntries(variables.map(x => [x[1],x[0]==0 ? false : true]))) ? 'T' : 'F'}</td>
                </tr>
                `
                

        }
}

function clearTruthTable() {
        document.getElementById('truthtable-head').innerHTML = ''
        document.getElementById('truthtable-body').innerHTML = ''

}

function vennDiagram(statement) {

        clearCanvas()
        
        const variables = statement.variables
        console.log(statement)
        
        if (variables.length > 3) {
                throw Error('Too many variables for 2D venn diagram')
        }

        // drawCircle(50, 69, 25, 'rgba(200, 100, 100, 1)', 'black', 4, [...variables][2], true)
        drawCircle(34, 40, 25, 'rgba(200, 100, 100, 1)', 'black', 4, [...variables][0])
        drawCircle(66, 40, 25, 'rgba(200, 100, 100, 1)', 'black', 4, [...variables][1])
        
        // drawIntersection2([34, 40, 25], [50, 69, 25], 'rgba(50,50,50, 1)')
        drawIntersection2([34, 40, 25], [66, 40, 25], 'rgba(50,50,50, 1)')
        // drawIntersection2([66, 40, 25], [50, 69, 25], 'rgba(50,50,50, 1)')

        // drawCircle(50, 69, 25, 'rgba(0, 0, 0, 0)', 'black', 4, [...variables][2], true)
        drawCircle(34, 40, 25, 'rgba(0, 0, 0, 0)', 'black', 4)
        drawCircle(66, 40, 25, 'rgba(0, 0, 0, 0)', 'black', 4)

}

function clearVennDiagram() {
        clearCanvas()
}