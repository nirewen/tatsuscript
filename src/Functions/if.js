
  if: function (operator, value1, value2, then, el) {
    let boolean, comparators = {
      '==': (v1, v2) => v1 == v2,
      '!=': (v1, v2) => v1 != v2,
      '<': (v1, v2) => v1 < v2,
      '>': (v1, v2) => v1 > v2,
      '<=': (v1, v2) => v1 <= v2,
      '>=': (v1, v2) => v1 >= v2,
      '||': (v1, v2) => v1 || v2,
      '&&': (v1, v2) => v1 && v2,
    };
    operator = this.interpret(operator);
    if (!operator || !comparators[operator])
      return '`Invalid operator`';
    if (!value1 || !value2 || !then || !el)
      return '';
    if (comparators[operator])
      boolean = comparators[operator](this.interpret(value1), this.interpret(value2));

    return boolean == 'false' || boolean == '0' || !boolean
      ? this.interpret(el)
      : this.interpret(then);
  },
