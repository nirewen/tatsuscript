const Token     = require('../core/Token');
const idRegex   = /\d{16,18}/;
const moment    = require('moment-timezone');
let variables   = {i: new Token('WORD', '0')};

const Functions = {
    abs (num) {
        return num
            ? Math.abs(this.interpret(num))
            : NaN;
    },
    args: function (msg) {
        return msg.content.split(' ');
    },
    argslen: function (msg) {
        return msg.content.split(' ').length;
    },
    avg: function (...numbers) {
        return numbers.length > 0
            ? numbers.reduce((tot, crr) => tot + Number(this.interpret(crr)), 0) / numbers.length
            : '';
    },
    base: function (number, in_radix, out_radix) {
        if (!out_radix)
            return '`Invalid radix`';

        number    = this.interpret(number);
        in_radix  = this.interpret(in_radix);
        out_radix = this.interpret(out_radix);
        return parseInt(number, in_radix, out_radix);
    },
    bit: function (operator, num1, num2) {
        let bitwises = {
            '!': (n) => +!n,
            '~': (n) => ~n,
            '&': (n1, n2) => n1 & n2,
            '^': (n1, n2) => n1 ^ n2,
            '|': (n1, n2) => n1 | n2,
            '<<': (n1, n2) => n1 << n2,
            '>>': (n1, n2) => n1 >> n2,
            '>>>': (n1, n2) => n1 >>> n2,
        };

        if (!num1 || !operator)
            return '`Invalid number (arg 1)`';

        if (!num2 && operator && !['!', '~'].includes(this.interpret(operator)))
            return '`Invalid number (arg 2)`';

        operator = this.interpret(operator);
        num1 = Number(this.interpret(num1));

        if (num2) {
            num2 = Number(this.interpret(num2));
            if (!bitwises[operator])
                return '`Invalid operator`';
            return bitwises[operator](num1, num2);
        } else {
            if (!bitwises[operator])
                return '`Invalid operator`';
            return bitwises[operator](num1);
        }
    },
    ceil: function (num) {
        return num ? Math.ceil(this.interpret(num)) : NaN
    },
    channelid: function () {
        return this.channel.id;
    },
    channelname: function () {
        return this.channel.name;
    },
    channeltopic: function () {
        return this.channel.topic;
    },
    decr: function (num = new Token('WORD', '0')) {
        num = Number(this.interpret(num)) || 0;
        return num - 1;
    },
    floor: function (num) {
        return num ? Math.floor(this.interpret(num)) : NaN;
    },
    get: function (name) {
        name = this.interpret(name);

        if (variables[name]) {
            if (this.currentVar && this.currentVar == name)
                return '';
            this.currentVar = name;
            return this.interpret(variables[name]);
        }
        return '';
    },
    i: function (depth) {
        return variables.i ? this.interpret(variables.i) : '';
    },
    if: function (operator, value1, value2, then, el) {
        let boolean, comparators = {
            '==': (v1, v2) => v1 == v2,
            '!=': (v1, v2) => v1 != v2,
            '<' : (v1, v2) => v1 < v2,
            '>' : (v1, v2) => v1 > v2,
            '<=': (v1, v2) => v1 <= v2,
            '>=': (v1, v2) => v1 >= v2,
            '||': (v1, v2) => v1 || v2,
            '&&': (v1, v2) => v1 && v2,
        };
        operator = this.interpret(operator);
        if (!operator || !comparators[operator])
            return '`Invalid operator`';
        if (!value1 || !value2 || !then || !el)
            return '';
        if (comparators[operator])
            boolean = comparators[operator](this.interpret(value1), this.interpret(value2));

        return boolean == 'false' || boolean == '0' || !boolean
            ? this.interpret(el)
            : this.interpret(then);
    },
    incr: function (num) {
        return num ? Number(this.interpret(num)) + 1 : '';
    },
    indexof: function (str, search) {
        return str && search ? this.interpret(str).indexOf(this.interpret(search)) : '';
    },
    inject: function (code) {
        return code ? this.interpret(code) : '';
    },
    lastindexof: function (str, search) {
        return str && search ? this.interpret(str).lastIndexOf(this.interpret(search)) : '';
    },
    lb: function () {
        return '{';
    },
    length: function (str) {
        return str ? this.interpret(str).length : '';
    },
    loop: function (init, final, code = new Token('WORD', ''), separator)  {
        //implement private function {i} to loops and nested loops
        if (!init || !final || !code) return '';
        let end = [], oldValue = variables.i;
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
    },
    lower: function (str) {
        return str ? this.interpret(str).toLowerCase() : ''
    },
    math: function (operator, ...numbers) {
        if (!operator) return '`Invalid operator`';
        if (!numbers.length) return '';
        numbers = numbers.map(n => isNaN(this.interpret(n)) ? 0 : Number(this.interpret(n)));
        operator = this.interpret(operator);
        let operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '/': (a, b) => a / b,
            '*': (a, b) => a * b,
            '%': (a, b) => a % b,
            '^': (a, b) => a ** b,
            'sqrt': a => Math.sqrt(a),
            'cbrt': a => Math.cbrt(a),
        };
        if (operator in operators) {
            if (numbers.length == 1 && ['sqrt', 'cbrt'].includes(operator))
                return operators[operator](numbers[0]);
            else
                return numbers.reduce((a, b) => operators[operator](a, b), numbers.shift());
        } else
            return '`Invalid operator`';
    },
    nl: function () {
        return '\n';
    },
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
    randarg: function () {
        return args[~~(Math.random() * args.length)]
    },
    randchoice: function (...choices) {
        if (choices.length < 2) return '';
        return this.interpret(choices[~~(Math.random() * choices.length)]);
    },
    randint: function (val1, val2) {
        let from = Number(val1 ? this.interpret(val1) : 0) || 0,
            to   = Number(val2 ? this.interpret(val2) : 9) || 9;
        return ~~((Math.random() * (to - from + 1)) + from);
    },
    randstr: function (str, amount = new Token('WORD', '1')) {
        if (!str) return 'undefined';
        amount = Number(this.interpret(amount)),
        str = this.interpret(str);
        let temp = '';
        while (amount--)
            temp += str[~~(Math.random() * str.length)];
        return temp;
    },
    randuser: function () {
        return this.channel.guild.members.random().id;
    },
    rb: function () {
        return '}';
    },
    regexreplace: function (str, regex, to) {
        if (!str || !regex || !to) return '';
        str = this.interpret(str);
        regex = this.interpret(regex);
        to = this.interpret(to);
        return str.replace(new RegExp(regex.split(/\//)[1], regex.split(/\//)[2]), to);
    },
    repeat: function (str, amount) {
        return str && amount ? this.interpret(str).repeat(this.interpret(amount)) : '';
    },
    replace: function (str, from, to) {
        return str && from && to ? this.interpret(str).replace(this.interpret(from), this.interpret(to)) : '';
    },
    reverse: function (str) {
        return str ? this.interpret(str).split('').reverse().join('') : '';
    },
    round: function (num) {
        return num ? Math.round(this.interpret(num)) : '';
    },
    semi: function () {
        return ';';
    },
    serverid: function () {
        return this.channel.guild.id;
    },
    servername: function () {
        return this.channel.guild.name;
    },
    serverusers: function () {
        return this.channel.guild.memberCount;
    },
    set: function (name, value = new Token('WORD', '')) {
        if (!name) return '`Invalid variable name`';
        name = this.interpret(name);

        variables[name] = value;
        return '';
    },
    shuffle: function (str) {
        return str ? this.interpret(str).split('').sort(() => 0.5 - Math.random()).join('') : '';
    },
    space: function (num = new Token('WORD', '1')) {
        return ' '.repeat(this.interpret(num));
    },
    substr: function (str, start, end) {
        str   = this.interpret(str);
        start = this.interpret(start || new Token('WORD', 0));
        end   = this.interpret(end || new Token('WORD', str.length));
        return str ? str.substr(start, end) : '';
    },
    switch: function (value, ...cases) {
        if (!value || !cases.length) return '';
        let def = cases.pop();
        if (cases.length % 2 && cases.length > 2) cases.pop();
        for (let i = 0; i < cases.length; i += 2)
            if (this.interpret(cases[i]) == this.interpret(value))
                return this.interpret(cases[i + 1]);

        return this.interpret(def);
    },
    time: function (format = new Token('WORD', 'LTS'), timestamp = new Token('WORD', `${moment()}`), tz = new Token('WORD', 'Asia/Singapore')) {
        format    = this.interpret(format);
        timestamp = this.interpret(timestamp);
        tz        = this.interpret(tz);
        return moment(timestamp).tz(tz).format(format);
    },
    upper: function (str) {
        return str ? this.interpret(str).toUpperCase() : '';
    },
    usercreatedat: function (str) {
        let match = str ? this.interpret(str).match(idRegex) : '';
        if (match)
            return this.channel.guild.members.has(match[0])
                ? this.channel.guild.members.get(match[0]).user.createdAt
                : '`User not found`';
        return this.author.createdAt;
    },
    userdiscrim: function (str) {
        let match = str ? this.interpret(str).match(idRegex) : '';
        if (match)
            return this.channel.guild.members.has(match[0])
                ? this.channel.guild.members.get(match[0]).discriminator
                : '`User not found`';

        return this.author.discriminator;
    },
    userid: function (str) {
        let match = str ? this.interpret(str).match(regex) : '';
        if (match)
            return this.channel.guild.members.has(match[0])
                ? this.channel.guild.members.get(match[0]).id
                : '`User not found`';

        return this.author.id;
    },
    username: function (str) {
        console.log(this);
        let match = str ? this.interpret(str).match(regex) : '';
        if (match)
            return this.channel.guild.members.has(match[0])
                ? this.channel.guild.members.get(match[0]).username
                : '`User not found`';

        return this.author.username;
    },
    usernick: function (str) {
        let match = str ? this.interpret(str).match(idRegex) : '';
        if (match)
            return this.channel.guild.members.has(match[0])
                ? this.channel.guild.members.get(match[0]).nick || this.channel.guild.members.get(match[0]).nickname || ''
                : '`User not found`';

        return this.member.nick || this.member.nickname || '';
    }
};

module.exports = Functions;
