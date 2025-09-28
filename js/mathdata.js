// Note: If and when I have multiple operations at the same order, 
//       such as addition and subtraction, I'll need to update the end of 
//       the parse function

const SYMBOLINFO = {
        "=": { "order": 10 },
        "+": { "order": 9 },
        "*": { "order": 8 },
} 