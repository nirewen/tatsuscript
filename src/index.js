import Lexer from './core/Lexer';
import Parser from './core/Parser';
import Functions from './Constants/Functions';

class TatsuScript {
  constructor (functions, parser, lexer) {
    this.functions = functions;
    this.parser = parser;
    this.lexer = lexer;
  }

  interpret (script, args) {
    const tokens = Array.isArray(script)
      ? script
      : this.parser(this.lexer(script));

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

    return this;
  }

  run (script, ...args) {
    return this.interpret(script, args);
  }
};

export default new TatsuScript(Functions, Parser, Lexer);
