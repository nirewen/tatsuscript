const Interpreter = require('./src/Interpreter');
const Parser      = require('./src/Parser');
const Lexer       = require('./src/Lexer');

module.exports = class TatsuScript {
	static run(message) {
		return new Interpreter(message).interpret(Parser.parse(Lexer.lex(message.content)));
	}
};