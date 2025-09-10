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
                symbols: ['𝒫'],
                inputs: [VARIABLE],
                output: STATEMENT
        },
        OPERATION: {
                symbols:['∩', '∪'],
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

const SYMBOLNAMES = {
  "∃": "Existential Quantifier",
  "∀": "Universal Quantifier",
  "∧": "Logical And",
  "∨": "Logical Or",
  "→": "Implication",
  "↔": "Biconditional",
  "=": "Equality",
  "≠": "Inequality",
  "∈": "Element Of",
  "∉": "Not Element Of",
  "⊆": "Subset",
  "⊈": "Not Subset",
  "¬": "Negation",
  "𝒫": "Power Set",
  "∩": "Intersection",
  "∪": "Union",
  "∅": "Empty Set"
}



class MathObject {
        constructor(raw, type = STATEMENT) {
                this.raw = raw
                this.type = UNDEFINED
                this.item = UNDEFINED

                this.symbol = UNDEFINED
                this.symbolType = UNDEFINED
                this.left = UNDEFINED
                this.right = UNDEFINED

                this.variables = new Set()

                this.parse(type)
        }

        parse(objecttype) {

                this.raw = this.raw.trim()

                let object1 = UNDEFINED

                let obj1Wrapped = false

                if (this.raw.startsWith('(')) {
                        const index = getClosingParenthesis(this.raw)
                        if (index >= this.raw.length - 1) {
                                this.raw = this.raw.slice(1, index)
                                return this.parse(objecttype)
                        }

                        object1 = this.raw.slice(1, index)
                        obj1Wrapped = true

                } else {
                        object1 = this.raw[0]
                }

                if (object1 == '¬') {
                        this.symbol = object1
                        const object2 = this.raw.slice(1)
                        this.left = object2.length > 1 ? new MathObject(object2) : object2
                } else {

                        this.left = object1.length > 1 ? new MathObject(object1) : object1
        
                        
                        this.symbol = this.raw[object1.length + 2*obj1Wrapped ]
                        
                        let object2 = this.raw.slice(object1.length + 3)
                        if (object2.startsWith('(')) {
                                const index = getClosingParenthesis(object2)
                                if (index < object2.length - 1) {
                                        throw Error(`Shame on you, ${index, object2}`)
                                }
                                object2 = object2.slice(1,index)
                        } else if (object2.length > 1) {
                                throw Error("Shame on you")
                        } else {
                                object2 = this.raw[object1.length + 2*obj1Wrapped + 1]
                        }
                        
                        this.right = object2.length > 1 ? new MathObject(object2) : object2
                        
                }
                
                if (this.left == UNDEFINED) {
                        
                } else if (typeof this.left == 'string') {
                        this.variables.add(this.left)
                } else {
                        this.left.variables.forEach(variable => {
                                this.variables.add(variable)
                        });
                }

                if (this.right == UNDEFINED) {
                        
                } else if (typeof this.right == 'string') {
                        this.variables.add(this.right)
                } else {
                        this.right.variables.forEach(variable => {
                                this.variables.add(variable)
                        });
                }

                this.symbolType = Object.entries(SYMBOLTYPES)
                        .find(symboltype => symboltype[1].symbols.includes(this.symbol))
                this.type = this.symbolType[1].output

                if (this.type !== objecttype) {
                        throw Error('Invalid type')
                }

                return this.type
        }

        evaluate(variables) {
                // LOGIC ONLY FOR NOW

                if (this.symbolType[0] !== 'LOGIC' && this.symbolType[0] !== 'INVERSE') {
                        console.log(this.symbolType[0])
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