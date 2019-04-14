export default function (str, search) {
  return str && search ? this.interpret(str).lastIndexOf(this.interpret(search)) : '';
};
