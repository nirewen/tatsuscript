import Token from '../Core/Token';
import variables from './Common/variables';

export default function (name, value = new Token('WORD', '')) {
  if (! name)
    return '`Invalid variable name`';

  variables[this.interpret(name)] = value;

  return '';
};
