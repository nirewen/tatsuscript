export default function (val1, val2) {
  let from = Number(val1 ? this.interpret(val1) : 0) || 0;
  let to = Number(val2 ? this.interpret(val2) : 9) || 9;

  return Math.floor((Math.random() * (to - from + 1)) + from);
};
