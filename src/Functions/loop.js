import Token from '../Core/Token';
import variables from './Common/variables';

export default function (init, final, code = new Token('WORD', ''), separator) {
  //implement private function {i} to loops and nested loops
  if (!init || !final || !code) return '';
  let end = [];
  let oldValue = variables.i;

  init = this.interpret(init);
  final = this.interpret(final);
  separator = separator ? this.interpret(separator) : '';

  if (init > final)
    return 'Invalid number pair';

  if ((final - init) > 100)
    return 'Range too large (over 100)';

  for (let i = init; i <= final; i++) {
    variables.i = new Token('WORD', i);
    end.push(this.interpret(code));
  }

  variables.i = oldValue;
  return end.join(separator);
};
