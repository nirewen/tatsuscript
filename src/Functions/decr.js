import Token from '../Core/Token';

export default function (num = new Token('WORD', '0')) {
  num = Number(this.interpret(num)) || 0;
  return num - 1;
};
