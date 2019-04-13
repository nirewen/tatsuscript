const operations = {
  '!': (n) => +!n,
  '~': (n) => ~n,
  '&': (n1, n2) => n1 & n2,
  '^': (n1, n2) => n1 ^ n2,
  '|': (n1, n2) => n1 | n2,
  '<<': (n1, n2) => n1 << n2,
  '>>': (n1, n2) => n1 >> n2,
  '>>>': (n1, n2) => n1 >>> n2,
};

export default function (operator, a, b) {
  try {
    if (! a || ! operator) {
      throw new Error('`Invalid number (arg 1)`');
    }

    const interpreted = this.interpret(operator);

    if (! b && ! ['!', '~'].includes(interpreted)) {
      throw new Error('`Invalid number (arg 2)`');
    }

    const callback = operations[interpreted];

    if (! callback) {
      throw new Error('`Invalid operator`');
    }

    return callback(
      Number(this.interpret(a)),
      b ? Number(this.interpret(b)) : null
    );
  } catch (e) {
    return e.message || '`Error`';
  }
};
