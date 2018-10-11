
  repeat: function (str, amount) {
    return str && amount ? this.interpret(str).repeat(this.interpret(amount)) : '';
  },
