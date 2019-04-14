export default function (code) {
  return code ? this.interpret(this.interpret(code)) : '';
};
