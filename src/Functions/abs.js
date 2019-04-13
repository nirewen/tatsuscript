export default function (num) {
  return num
      ? Math.abs(this.interpret(num))
      : NaN;
};
