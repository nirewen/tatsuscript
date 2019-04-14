export default function (str, search) {
  return str && search ? this.interpret(str).indexOf(this.interpret(search)) : '';
};
