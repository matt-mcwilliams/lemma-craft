let id_MObject = 0

class MObject {
        constructor(raw, type = undefined, hypothesises = false) {
                this.raw = raw // Raw string
                this.chunks = []
                this.id = id_MObject++

                this.symbol = undefined // string symbol, such as →
                this.left = undefined // First statement
                this.right = undefined // Second statement 

                this.variables = []

                this.parse(hypothesises)
        }

        static copy(mobject) {
                return new MObject(mobject.raw)
        }
        
        parse(hasHypothesis) {

                this.raw = this.raw.trim()

                if (this.raw[0] == '(' && 
                        getClosingParenthesis(this.raw) == this.raw.length - 1) {
                        this.raw = this.raw.slice(1, -1)
                }
                
                
                
                // 1. Create list of "chunks", chunks being either space-separated or parenthesis-encased
                
                
                this.chunks = this.raw.replace(/\(/g,    ' ( ')
                                      .replace(/\)/g,    ' ) ')
                                      .split(' ')
                                      .filter(x => x.length > 0)


                for (let i = 0; i < this.chunks.length; i++) {
                        const chunk = this.chunks[i];
                        if (chunk == '(') {
                                if (this.chunks[i+2] == ')') {
                                        this.chunks.splice(i,3,this.chunks[i+1])
                                        i=0
                                        continue
                                }
                        }
                }

                this.raw = this.chunks.join(' ')
                
                
                
                
                // console.log(this.chunks)
                
                
                // 2. ID variables

                if (!hasHypothesis) {

                        
                        let variableDefinitions
                        
                        if (this.chunks[0] == '(') {
                                
                                let colonIndex = -1
                                
                                let index = 0
                                
                                while (index < this.chunks.length) {
                                        if (this.chunks[index] == '(') {
                                                const remaining = this.chunks.slice(index)
                                                const parenthesisLength = getClosingParenthesis(remaining)
                                                index += parenthesisLength
                                        } else if (this.chunks[index] == ':') {
                                                colonIndex = index
                                                break
                                        }
                                        index++;
                                }
                                
                                variableDefinitions = (this.chunks.splice(0,colonIndex + 1))
                                variableDefinitions.pop()
                                                                                                
                                this.variables = variableDefinitions.slice(1, variableDefinitions.indexOf(':'))
                                
                                
                        }
                        
                        
                }
                
                                
                
                // 3. Find the "top-level" token/chunk
                
                let topLevelSymbol = undefined
                let topLevelSymbolOrder = -1
                let topLevelSymbolIndex = -1

                const lastColon = this.chunks.lastIndexOf(':')

                for (let index = lastColon+1; index < this.chunks.length; index++) {
                        const chunk = this.chunks[index];
                        const chunkOrder = SYMBOLINFO[chunk]?.order ?? 0;
                        if (chunkOrder > topLevelSymbolOrder) {
                                topLevelSymbol = chunk;
                                topLevelSymbolOrder = chunkOrder;
                                topLevelSymbolIndex = index;
                        }
                }


                // console.log('topLevelSymbol', topLevelSymbol)


                // 4. Find the "left" and "right" statements

                const symbolType = SYMBOLINFO[topLevelSymbol]
                this.symbol = topLevelSymbol

                let leftRaw = []
                let rightRaw = []

                switch (symbolType?.type) {
                        case 'EQUALITY':
                                leftRaw = this.chunks.slice(0,topLevelSymbolIndex)
                                rightRaw = this.chunks.slice(topLevelSymbolIndex+1)
                                break;


                        default:
                                this.symbol = undefined
                                break;
                }

                // console.log(leftRaw + '::' + rightRaw)

                
                // 5. Parse the left + right statements
                
                if (leftRaw.length > 0) {
                        this.left = new MObject(leftRaw.join(' '))
                }
                
                if (rightRaw.length > 0) {
                        this.right = new MObject(rightRaw.join(' '))
                }


                // console.log(this)

        }

        reparseFromChunks() {
                const variableChunks = [...this.variables, ':', 'nat']

                if (this.variables.length > 0) {
                        
                        this.chunks.unshift('(', ...variableChunks, ')', ':')
                }

                this.raw = this.chunks.join(' ')

                this.symbol = undefined // string symbol, such as →
                this.left = undefined // First statement
                this.right = undefined // Second statement 


                this.parse()
        }

        rw (mobject2, backward = false, didwork = false, start = 0) {

                // console.log(this, mobject2)

                // Check for variable unbounding


                if (mobject2.chunks.length >= 3 && mobject2.chunks[mobject2.chunks.length - 2] == ':' && this.variables.length > 0) {


                        const newVariable = mobject2.chunks.slice(0, mobject2.chunks.length - 2)
                        const replacementVariable = this.variables.shift()

                        this.chunks = this.chunks.map(chunk => chunk == replacementVariable ?
                                '( ' + newVariable.join(' ') + ' )' : chunk
                        )

                        this.reparseFromChunks()

                        return true

                }



                // Check for equality replacment

                if (mobject2.symbol !== '=') {
                        throw Error('only rw for equalities')
                }
                
                const searchPattern = backward ? mobject2.right.chunks : mobject2.left.chunks
                const replacement = backward ? mobject2.left.chunks : ['(', ...mobject2.right.chunks, ')']

                let didRwWork = false

                for (let i = start; i < this.chunks.length; i++) {
                        const chunk = this.chunks[i];
                        
                        if (chunk == searchPattern[0]) {
                                const target = this.chunks.slice(i, i + searchPattern.length)
                                
                                if (target.length !== searchPattern.length) { continue }
                                if (!target.every((targetChunk, j) => targetChunk == searchPattern[j])) { continue }
                                
                                this.chunks.splice(i, searchPattern.length, ...replacement)
                                console.log(this.chunks, i)
                                didRwWork = true
                                break
                        }
                }

                if (didRwWork) { 
                        this.reparseFromChunks()
                        this.rw(mobject2, backward, true, start+replacement.length+1) 
                } else if (!backward && !didwork) {
                        this.rw(mobject2, true, false)
                }

                return didRwWork

        }

        refl () {

                if (this.symbol !== '=') {
                        alert('only refl for equalities')
                        return false
                }

                if (this.left.raw !== this.right.raw) {
                        alert("both sides don't match")
                        return false
                }

                return true

        }

        static induction(window, variable) {
                console.log(window, variable)
                
                const newGoal1 = this.copy(window.goal)
                newGoal1.chunks = newGoal1.chunks.map(x => x==variable ? '0' : x)
                newGoal1.reparseFromChunks()

                const newGoal2 = this.copy(window.goal)
                newGoal2.chunks = newGoal2.chunks.map(x => x==variable ? '( succ h )' : x)
                newGoal2.reparseFromChunks()

                const newHyp1 = this.copy(window.goal)
                newHyp1.chunks = newHyp1.chunks.map(x => x==variable ? 'h' : x)
                newHyp1.reparseFromChunks()

                const newHyp2 = new MObject('h : nat')

                return {
                        newGoal1,
                        newGoal2,
                        newHyp1,
                        newHyp2,
                }
        }


        static identifyHypothesises(mobject) {
                const hypothesises = []
                for (let i = 0; i < mobject.chunks.length; i++) {
                        const chunk = mobject.chunks[i];
                        if (chunk == '(') {
                                const length = getClosingParenthesis(mobject.chunks.slice(i))
                                hypothesises.push(mobject.chunks.slice(i+1, i+length))
                                i += length
                        } else if (chunk == ':') {
                                mobject.chunks.splice(0, i+1)
                                mobject.reparseFromChunks()
                                return hypothesises.map(h => h.join(' '))
                        }
                }
                return hypothesises
        }
}


function getClosingParenthesis(string) {
        const closeParenthesisIndex = [0, 1]

        while (closeParenthesisIndex[1] > 0) {
                closeParenthesisIndex[0] += 1
                if (closeParenthesisIndex[0] >= string.length) {
                        return undefined
                }
                const currentCharacter = string[closeParenthesisIndex[0]]
                if (currentCharacter == '(') {
                        closeParenthesisIndex[1]++
                } else if (currentCharacter == ')') {
                        closeParenthesisIndex[1]--
                }
        }

        return closeParenthesisIndex[0]
}