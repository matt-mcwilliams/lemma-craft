const UNDEFINED = -1
const STATEMENT = 0
const VARIABLE = 1


const QUANTIFIER = 2
const LOGIC = 3
const COMPARISION = 4
const INVERSE = 5
const FUNCTION = 6
const OPERATION = 7



const SYMBOLTYPES = {
        QUANTIFIER: {
                symbols: ['∃', '∀'],
                inputs: [VARIABLE, STATEMENT],
                output: STATEMENT
        },
        LOGIC: {
                symbols: ['∧', '∨', '→', '↔'],
                inputs: [STATEMENT, STATEMENT],
                output: STATEMENT
        },
        COMPARISION: {
                symbols: ['=', '≠', '∈', '∉', '⊆', '⊈'],
                inputs: [VARIABLE, VARIABLE],
                output: STATEMENT
        },
        INVERSE: {
                symbols: ['¬'],
                inputs: [STATEMENT],
                output: STATEMENT
        },
        FUNCTION: {
                symbols: ['𝒫', '𝒞'],
                inputs: [VARIABLE],
                output: VARIABLE
        },
        OPERATION: {
                symbols:['∩', '∪', '\\'],
                inputs: [VARIABLE, VARIABLE],
                output: VARIABLE
        },
        STATEMENT: {
                symbols: [],
                inputs: [],
                output: STATEMENT
        },
        VARIABLE: {
                symbols: ['∅'],
                inputs: [],
                output: VARIABLE
        }
}

const SYMBOLINFO = {
        "∃": { "name": "Existential Quantifier", "order": 7, "type": "QUANTIFIER" },
        "∀": { "name": "Universal Quantifier", "order": 7, "type": "QUANTIFIER" },
        "→": { "name": "Implication", "order": 6, "type": "LOGIC" },
        "↔": { "name": "Biconditional", "order": 6, "type": "LOGIC" },
        "∧": { "name": "Logical And", "order": 5, "type": "LOGIC" },
        "∨": { "name": "Logical Or", "order": 5, "type": "LOGIC" },
        "¬": { "name": "Negation", "order": 5, "type": "INVERSE" },
        "=": { "name": "Equality", "order": 4, "type": "COMPARISION" },
        "≠": { "name": "Inequality", "order": 4, "type": "COMPARISION" },
        "∈": { "name": "Element Of", "order": 4, "type": "COMPARISION" },
        "∉": { "name": "Not Element Of", "order": 3, "type": "COMPARISION" },
        "⊆": { "name": "Subset", "order": 3, "type": "COMPARISION" },
        "⊈": { "name": "Not Subset", "order": 3, "type": "COMPARISION" },
        "∩": { "name": "Intersection", "order": 2, "type": "OPERATION" },
        "∪": { "name": "Union", "order": 2, "type": "OPERATION" },
        "\\": { "name": "Set Difference", "order": 2, "type": "OPERATION" },
        "𝒞": { "name": "Complement Set", "order": 1, "type": "FUNCTION" },
        "𝒫": { "name": "Power Set", "order": 1, "type": "FUNCTION" },
        "∅": { "name": "Empty Set", "order": 0, "type": "VARIABLE" }
}



class MathObject {
        constructor(raw, type = undefined) {
                this.raw = raw // Raw string
                this.type = UNDEFINED // Either statement or variable

                this.symbol = UNDEFINED // string symbol, such as →
                this.left = UNDEFINED // First statement
                this.right = UNDEFINED // Second statement 

                this.variables = new Set() // Set of unbounded variables

                this.parse(type)
        }
        
        parse(objectType) {

                this.raw = this.raw.trim()

                if (this.raw[0] == '(' && 
                        getClosingParenthesis(this.raw) == this.raw.length - 1) {
                        this.raw = this.raw.slice(1, -1)
                        console.log(this.raw)
                }
                
                // 1. Create list of "tokens", tokens being either single characters or parenthesis-encased chunk

                const tokens = []

                for (let i = 0; i < this.raw.length; i++) {
                        const character = this.raw[i];
                        if (character == '(') {
                                const remaining = this.raw.slice(i)
                                const length = getClosingParenthesis(remaining)
                                tokens.push(this.raw.slice(i,i+length+1))
                                i += length
                        } else if (character == '\uD835') {
                                tokens.push(this.raw.slice(i,i+2))
                                i += 1
                        } else {
                                tokens.push(character)
                        }
                }

                // console.log(tokens)


                // 2. Find the "top-level" token

                let topLevelSymbol = undefined
                let topLevelSymbolOrder = -1
                let topLevelSymbolIndex = -1

                tokens.forEach((token, index) => {
                        const tokenOrder = SYMBOLINFO[token]?.order ?? 0
                        if (tokenOrder > topLevelSymbolOrder) {
                                topLevelSymbol = token
                                topLevelSymbolOrder = tokenOrder
                                topLevelSymbolIndex = index
                        }
                })

                // console.log(topLevelSymbol)


                // 3. Find the "left" and "right" statements

                const symbolType = SYMBOLINFO[topLevelSymbol]
                this.symbol = topLevelSymbol

                let leftRaw = ''
                let rightRaw = ''

                switch (symbolType?.type) {
                        case 'LOGIC':
                                leftRaw = tokens.slice(0,topLevelSymbolIndex).join('')
                                rightRaw = tokens.slice(topLevelSymbolIndex+1).join('')
                                this.type = STATEMENT
                                break;
                                
                        case 'INVERSE':
                                leftRaw = tokens.slice(topLevelSymbolIndex+1).join('')
                                this.type = STATEMENT
                                break;
                        
                        case 'OPERATION':
                                leftRaw = tokens.slice(0,topLevelSymbolIndex).join('')
                                rightRaw = tokens.slice(topLevelSymbolIndex+1).join('')
                                this.type = VARIABLE
                                break;
                        
                        case 'FUNCTION':
                                leftRaw = tokens.slice(topLevelSymbolIndex+1).join('')
                                this.type = VARIABLE
                                break;

                        default:
                                this.symbol = UNDEFINED
                                break;
                }
                                        
                
                if (objectType && (objectType !== this.type && this.type !== UNDEFINED)) {
                        throw Error(`Help me please ${objectType} ${this.type}`)
                }

                
                // 4. Parse the left + right statements

                const symbolInputs = SYMBOLTYPES[symbolType?.type]?.inputs
                
                if (leftRaw.length > 0) {
                        this.left = new MathObject(leftRaw, symbolInputs[0])
                        this.left.variables.forEach(x => this.variables.add(x))
                } else if (leftRaw.length == 1) {
                        this.type = STATEMENT
                }
                
                if (rightRaw.length > 0) {
                        this.right = new MathObject(rightRaw, symbolInputs[1])
                        this.right.variables.forEach(x => this.variables.add(x))
                } else if (rightRaw.length == 1) {
                        this.type = STATEMENT
                }

                if (this.symbol == UNDEFINED) {
                        this.variables.add(this.raw)
                }

        }




        evaluate(variables) {

                const symbolType = SYMBOLINFO[this.symbol]?.type

                if (this.symbol == UNDEFINED) {
                        return variables[this.raw]
                }

                if (symbolType !== 'LOGIC' && symbolType !== 'INVERSE') {
                        throw Error('Only Logic in truth tables')
                }

                let leftResult = undefined

                if (this.left == UNDEFINED) {
                        leftResult = UNDEFINED
                } else if (typeof this.left=='string') {
                        leftResult = variables[this.left]
                } else {
                        leftResult = this.left.evaluate(variables)
                }

                let rightResult = undefined

                if (this.right == UNDEFINED) {
                        rightResult = UNDEFINED
                } else if (typeof this.right=='string') {
                        rightResult = variables[this.right]
                } else {
                        rightResult = this.right.evaluate(variables)
                }

                switch (this.symbol) {
                        case '∧':
                                return leftResult && rightResult
                        
                        case '∨':
                                return leftResult || rightResult
                        
                        case '→':
                                return !leftResult || rightResult
                        
                        case '↔':
                                return leftResult == rightResult
                        
                        case '¬':
                                return !leftResult
                
                        default:
                                throw Error('symbol not found...')
                }

        }



        isRegionInSet(regionVariables) {
                const symbolType = SYMBOLINFO[this.symbol]?.type

                if (this.symbol == UNDEFINED) {
                        return regionVariables[this.raw]
                }

                if (symbolType !== 'OPERATION' && symbolType !== 'FUNCTION') {
                        throw Error('Only Logic in truth tables')
                }

                let leftResult = undefined

                if (this.left == UNDEFINED) {
                        leftResult = UNDEFINED
                } else if (typeof this.left=='string') {
                        leftResult = regionVariables[this.left]
                } else {
                        leftResult = this.left.isRegionInSet(regionVariables)
                }

                let rightResult = undefined

                if (this.right == UNDEFINED) {
                        rightResult = UNDEFINED
                } else if (typeof this.right=='string') {
                        rightResult = regionVariables[this.right]
                } else {
                        rightResult = this.right.isRegionInSet(regionVariables)
                }

                switch (this.symbol) {
                        case '∩':
                                return leftResult && rightResult
                        
                        case '∪':
                                return leftResult || rightResult
                        
                        case '\\':
                                return leftResult && !rightResult
                        
                        case '𝒞':
                                return !leftResult
                
                        default:
                                throw Error('symbol not found...')
                }

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