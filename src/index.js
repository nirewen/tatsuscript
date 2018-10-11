import Lexer from './structures/Lexer';
import Parser from './structures/Parser';
import Functions from './Constants/Functions';

class TatsuScript {
  constructor (functions) {
    this.functions = functions;
  }

  interpret (tokens, args) {
    return tokens.map((token) => {
      if (token.type !== 'BRACKETGROUP') {
        return token.value;
      }

      const { value } = token.value.shift();

      if (value in this.functions) {
        return this.functions[value].call(this, ...token.value, ...args);
      }

      return 'Invalid tag name';
    }).join('');
  }

  registerFunction (name, callback) {
    this.functions[name] = callback;
  }

  run (script, ...args) {
    return this.interpret(Parser.parse(Lexer.lex(script)), args);
  }
};

export default new TatsuScript(Functions);
