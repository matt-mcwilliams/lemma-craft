let id_MObject = 0

class MObject {
        constructor(raw, type = undefined) {
                this.raw = raw // Raw string
                this.chunks = []
                this.id = id_MObject++

                this.symbol = undefined // string symbol, such as →
                this.left = undefined // First statement
                this.right = undefined // Second statement 

                this.parse()
        }
        
        parse() {

                this.raw = this.raw.trim()

                if (this.raw[0] == '(' && 
                        getClosingParenthesis(this.raw) == this.raw.length - 1) {
                        this.raw = this.raw.slice(1, -1)
                        console.log(this.raw)
                }
                
                // // 1. Create list of "chunks", chunks being either space-separated or parenthesis-encased


                this.chunks = this.raw.replace('(',    ' ( ')
                                       .replace(')',    ' ) ')
                                       .split(' ')
                                       .filter(x => x.length > 0)

                for (let i = 0; i < this.chunks.length; i++) {
                        const chunk = this.chunks[i];
                        if (chunk == '(') {
                                if (this.chunks[i+2] == ')') {
                                        console.log(this.chunks, 'waste')
                                        this.chunks.splice(i,3,this.chunks[i+1])
                                        i=0
                                        continue
                                }
                        }
                }

                this.raw = this.chunks.join(' ')




                // console.log(this.chunks)





                // 2. Find the "top-level" token/chunk

                let topLevelSymbol = undefined
                let topLevelSymbolOrder = -1
                let topLevelSymbolIndex = -1

                this.chunks.forEach((chunk, index) => {
                        const chunkOrder = SYMBOLINFO[chunk]?.order ?? 0
                        if (chunkOrder > topLevelSymbolOrder) {
                                topLevelSymbol = chunk
                                topLevelSymbolOrder = chunkOrder
                                topLevelSymbolIndex = index
                        }
                })

                // console.log('topLevelSymbol', topLevelSymbol)


                // 3. Find the "left" and "right" statements

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

                
                // 4. Parse the left + right statements
                
                if (leftRaw.length > 0) {
                        this.left = new MObject(leftRaw.join(' '))
                }
                
                if (rightRaw.length > 0) {
                        this.right = new MObject(rightRaw.join(' '))
                }

        }


        reparseFromChunks() {
                this.raw = this.chunks.join(' ')

                this.symbol = undefined // string symbol, such as →
                this.left = undefined // First statement
                this.right = undefined // Second statement 

                this.parse()
        }


        rw (mobject2) {

                if (mobject2.symbol !== '=') {
                        throw Error('only rw for equalities')
                }
                
                const searchPattern = mobject2.left.chunks

                let didRwWork = false

                for (let i = 0; i < this.chunks.length; i++) {
                        const chunk = this.chunks[i];
                        
                        if (chunk == searchPattern[0]) {
                                const target = this.chunks.slice(i, i + searchPattern.length)
        
                                if (!target.every((targetChunk, j) => targetChunk == searchPattern[j])) { continue }
                                
                                this.chunks.splice(i, searchPattern.length, ...mobject2.right.chunks)
                                didRwWork = true
                                break
                        }
                }

                if (didRwWork) { 
                        this.reparseFromChunks()
                        this.rw(mobject2) 
                        console.log('hello')
                }

                return didRwWork

        }


        refl () {

                if (this.symbol !== '=') {
                        throw Error('only refl for equalities')
                }

                if (this.left.raw !== this.right.raw) {
                        throw Error("both sides don't match")
                }

                alert('Finish!')

        }


}


function getClosingParenthesis(string) {
        const closeParenthesisIndex = [0, 1]

        while (closeParenthesisIndex[1] > 0) {
                closeParenthesisIndex[0] += 1
                if (closeParenthesisIndex[0] >= string.length) {
                        throw Error(`No closing parenthesis, ${string}`)
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