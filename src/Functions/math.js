
  math: function (operator, ...numbers) {
    if (!operator) return '`Invalid operator`';
    if (!numbers.length) return '';
    numbers = numbers.map(n => isNaN(this.interpret(n)) ? 0 : Number(this.interpret(n)));
    operator = this.interpret(operator);
    let operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '/': (a, b) => a / b,
      '*': (a, b) => a * b,
      '%': (a, b) => a % b,
      '^': (a, b) => a ** b,
      'sqrt': a => Math.sqrt(a),
      'cbrt': a => Math.cbrt(a),
    };
    if (operator in operators) {
      if (numbers.length == 1 && ['sqrt', 'cbrt'].includes(operator))
        return operators[operator](numbers[0]);
      else
        return numbers.reduce((a, b) => operators[operator](a, b), numbers.shift());
    } else
      return '`Invalid operator`';
  },
