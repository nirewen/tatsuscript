
  replace: function (str, from, to) {
    return str && from && to ? this.interpret(str).replace(this.interpret(from), this.interpret(to)) : '';
  },
