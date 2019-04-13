
  randchoice: function (...choices) {
    if (choices.length < 2) return '';
    return this.interpret(choices[~~(Math.random() * choices.length)]);
  },
