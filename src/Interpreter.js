const Functions = require('./Constants/Functions');

class Interpreter {
    constructor(msg) { this.msg = msg; }
    interpret(tokens) {
        return tokens.map(token => {
            switch (token.type) {
                case 'BRACKETGROUP': {
                    let thisToken = token.value[0],
                    args = token.value.slice(1);

                    if (thisToken.value in Functions(this))
                        return Functions(this)[thisToken.value].call(this.msg, ...args);
                    else 
                        return 'Invalid tag name';
                }
                default:
                    return token.value;
            }
        }).join('');
    }
}

module.exports = Interpreter;