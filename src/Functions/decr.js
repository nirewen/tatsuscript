
import Token from '../Core/Token';
  decr: function (num = new Token('WORD', '0')) {
    num = Number(this.interpret(num)) || 0;
    return num - 1;
  },
