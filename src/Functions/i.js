import variables from './Common/variables';

export default function (depth) {
  return variables.i ? this.interpret(variables.i) : '';
};
