
import Token from '../Core/Token';
  substr: function (str, start, end) {
    str = this.interpret(str);
    start = this.interpret(start || new Token('WORD', 0));
    end = this.interpret(end || new Token('WORD', str.length));
    return str ? str.substr(start, end) : '';
  },
