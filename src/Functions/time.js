import moment from 'moment-timezone';
import Token from '../Core/Token';

export default function (format = new Token('WORD', 'LTS'), timestamp = new Token('WORD', `${moment()}`), tz = new Token('WORD', 'Asia/Singapore')) {
  format = this.interpret(format);
  timestamp = this.interpret(timestamp);
  tz = this.interpret(tz);
  
  return moment(timestamp).tz(tz).format(format);
};
