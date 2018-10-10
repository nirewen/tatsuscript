const AbstractFunction = require('./Function');
const Functions = require('../constants/Functions');

class Interpreter {
    constructor(msg) { 
        this.msg = msg;
        this.functions = {};

        for (let func in Functions)
            this.registerFunction(func, Functions[func]);
    }

    interpret(tokens) {
        let interpretedTokens = tokens.map(token => {
            if (token.type === 'BRACKETGROUP') {
                let thisToken = token.value.shift(),
                    args = token.value;

                if (thisToken.value in this.functions)
                    return this.functions[thisToken.value].run(...args);
                else 
                    return 'Invalid tag name';
            } else
                return token.value;
        });

        return interpretedTokens.join('');
    }

    registerFunction(name, code) {
        this.functions[name] = new AbstractFunction(name, code, this);
    }
}

module.exports = Interpreter;