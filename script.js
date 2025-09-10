
function analyzeStatement(raw) {
        const mathObject = new MathObject(raw)
        truthTable(mathObject)     

        console.log(mathObject.variables)
        
        renderStatement(mathObject)
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
                <span class="text-white/50">${SYMBOLNAMES[statement.symbol]}:</span>
                <div class="group-hover:block hidden absolute top-[110%] bg-gray-200/80 text-gray-900 min-w-full rounded-xl text-2xl text-left px-5 py-3">
                        ${statement.symbolType[0]}
                        <p class="text-xl text-black">${statement.symbolType[1].inputs.map(x => x==STATEMENT ? 'statement' : 'variable').join(', ')}<br/><span class="text-center">↓</span><br/>${statement.symbolType[1].output == STATEMENT ? "statement" : "variable"}</p>
                        </div>
        </div>`

        const leftEl = statement.left == UNDEFINED ? '' : `<button class="${statement.left.left ? 'text-red-700 ' : 'text-red-300 '} ${statement.left.left ? 'cursor-pointer bg-gray-100/80 px-10 py-3 rounded-xl ' : ''}" onclick='renderStatement(${JSON.stringify(statement.left ?? statement)})'>${statement.left.raw ?? statement.left}</button>`
        const symbolEl = `<span class="text-white px-6">${statement.symbol}</span>`
        const rightEl = statement.right == UNDEFINED ? '' : `<button class="${statement.right.left ? 'text-blue-700 ' : 'text-blue-300 '} ${statement.right.left ? 'cursor-pointer bg-gray-100/80 px-10 py-3 rounded-xl ' : ''}" onclick='renderStatement(${JSON.stringify(statement.right ?? statement)})'>${statement.right.raw ?? statement.right}</button>`

        statementAnalysisEl.innerHTML = `
        <div class="flex gap-8 justify-center-safe align-middle">${tag}  <div>${leftEl}${symbolEl}${rightEl}</div></div>
        `
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
