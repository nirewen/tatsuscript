import Lexer from './Core/Lexer';
import Parser from './Core/Parser';
import Functions from './Functions';

class TatsuScript {
  constructor (functions, parser, lexer) {
    this.functions = functions;
    this.parser = parser;
    this.lexer = lexer;
  }

  interpret (script) {
    const tokens = Array.isArray(script)
      ? script
      : this.parser(this.lexer(script));

    return tokens.map((token) => {
      if (token.type !== 'BRACKETGROUP') {
        return token.value;
      }

      const { value } = token.value.shift();

      if (value in this.functions) {
        return this.functions[value].call(this, ...token.value);
      }

      return 'Invalid tag name';
    }).join('');
  }

  registerFunction (name, callback) {
    this.functions[name] = callback;

    return this;
  }

  run (script, context) {
    this.context = context;
    
    return this.interpret(script);
  }
};

export default new TatsuScript(Functions, Parser, Lexer);
