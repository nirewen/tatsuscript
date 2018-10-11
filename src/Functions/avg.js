export default function (...numbers) {
  return numbers.length > 0
    ? numbers.reduce((tot, crr) => tot + Number(this.interpret(crr)), 0) / numbers.length
    : '';
};
