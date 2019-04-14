import Token from '../Core/Token';

export default function (num = new Token('WORD', '1')) {
  return ' '.repeat(this.interpret(num));
};
