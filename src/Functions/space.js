
import Token from '../Core/Token';
  space: function (num = new Token('WORD', '1')) {
    return ' '.repeat(this.interpret(num));
  },
