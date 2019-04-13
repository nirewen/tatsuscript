
  randint: function (val1, val2) {
    let from = Number(val1 ? this.interpret(val1) : 0) || 0,
      to = Number(val2 ? this.interpret(val2) : 9) || 9;
    return ~~((Math.random() * (to - from + 1)) + from);
  },
