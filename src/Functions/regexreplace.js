
  regexreplace: function (str, regex, to) {
    if (!str || !regex || !to) return '';
    str = this.interpret(str);
    regex = this.interpret(regex);
    to = this.interpret(to);
    return str.replace(new RegExp(regex.split(/\//)[1], regex.split(/\//)[2]), to);
  },
