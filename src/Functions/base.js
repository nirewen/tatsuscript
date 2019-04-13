export default function (number, in_radix, out_radix) {
  if (! out_radix) {
    return '`Invalid radix`';
  }

  return parseInt(
    this.interpret(number),
    this.interpret(in_radix),
    this.interpret(out_radix)
  );
};
