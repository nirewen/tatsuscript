
  switch: function (value, ...cases) {
    if (!value || !cases.length) return '';
    let def = cases.pop();
    if (cases.length % 2 && cases.length > 2) cases.pop();
    for (let i = 0; i < cases.length; i += 2)
      if (this.interpret(cases[i]) == this.interpret(value))
        return this.interpret(cases[i + 1]);

    return this.interpret(def);
  },
