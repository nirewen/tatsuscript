export default function (...choices) {
  if (choices.length < 2)
    return '';
    
  return this.interpret(choices[Math.floor(Math.random() * choices.length)]);
};
