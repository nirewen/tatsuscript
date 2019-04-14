import Token from '../Core/Token';

export default function (str = new Token('WORD', ''), start = new Token('WORD', 0), end) {
  str = this.interpret(str);
  start = this.interpret(start);
  end = this.interpret(end || new Token('WORD', str.length));
  
  return str ? str.substr(start, end) : '';
};
