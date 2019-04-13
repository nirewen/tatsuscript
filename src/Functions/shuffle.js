
  shuffle: function (str) {
    return str ? this.interpret(str).split('').sort(() => 0.5 - Math.random()).join('') : '';
  },
