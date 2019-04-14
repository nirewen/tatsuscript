export default function (str) {
  return str ? this.interpret(str).toLowerCase() : ''
};
