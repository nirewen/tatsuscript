
import Token from '../Core/Token';
  randstr: function (str, amount = new Token('WORD', '1')) {
    if (!str) return 'undefined';
    amount = Number(this.interpret(amount)),
      str = this.interpret(str);
    let temp = '';
    while (amount--)
      temp += str[~~(Math.random() * str.length)];
    return temp;
  },
