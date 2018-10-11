const Interpreter = require('./structures/Interpreter');
const Parser      = require('./structures/Parser');
const Lexer       = require('./structures/Lexer');

module.exports = class TatsuScript extends Interpreter {
    constructor(message) {
        super(message);
    }
    
    run(script) {
        return this.interpret(Parser.parse(Lexer.lex(script)));
    }
};