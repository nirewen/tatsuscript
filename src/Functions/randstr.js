import Token from '../Core/Token';

export default function (str, amount = new Token('WORD', '1')) {
  if (!str) 
    return '';
  
  amount = Number(this.interpret(amount));
  str = this.interpret(str);

  let temp = '';

  while (amount--)
    temp += str[Math.floor(Math.random() * str.length)];

  return temp;
};
