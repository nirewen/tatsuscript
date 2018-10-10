const Interpreter = require('./src/structures/Interpreter');
const Parser      = require('./src/structures/Parser');
const Lexer       = require('./src/structures/Lexer');

module.exports = class TatsuScript extends Interpreter {
    constructor(message) {
        super(message);
    }
    
    run(script) {
        return this.interpret(Parser.parse(Lexer.lex(script)));
    }
};