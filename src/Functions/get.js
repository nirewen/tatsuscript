import variables from './Common/variables';

export default function (name) {
  const interpreted = this.interpret(name);

  if (! variables[interpreted] || (this.currentVar && this.currentVar == interpreted)) {
    return '';
  }

  this.currentVar = interpreted;

  return this.interpret(variables[interpreted]);
};
