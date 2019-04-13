
import Token from '../Core/Token';
  pad: function (direction, str, size, pattern = new Token('WORD', '')) {
    if (!direction) return '`Invalid direction`';
    if (!str) return '';
    direction = this.interpret(direction);
    str = this.interpret(str);
    size = this.interpret(size);
    pattern = this.interpret(pattern);

    if (['l', 'left'].includes(direction))
      return str.padStart(size, pattern);

    if (['r', 'right'].includes(direction))
      return str.padEnd(size, pattern);

    return str;
  },
