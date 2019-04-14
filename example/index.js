const TatsuScript = require('../dist');
const assert = require('assert');
const variables = require('../dist/Functions/Common/variables');

/**
 * abs function
 */
assert.equal(1, TatsuScript.run('{abs;-1}'));

/**
 * args function
 */
assert.equal('foo,bar', TatsuScript.run('{args}', {
  content: 'foo bar',
}));

/**
 * argslen function
 */
assert.equal(2, TatsuScript.run('{argslen}', {
  content: 'foo bar',
}));

/**
 * avg function
 */
assert.equal(10, TatsuScript.run('{avg;5;15}'));
assert.equal(20, TatsuScript.run('{avg;10;30}'));
assert.equal(30, TatsuScript.run('{avg;10;30;50}'));

/**
 * base function
 */
assert.equal(2, TatsuScript.run('{base;10;2;10}'));
assert.equal(64, TatsuScript.run('{base;100;8;10}'));
assert.equal('`Invalid radix`', TatsuScript.run('{base;10;2}'));

/**
 * bit function
 */
assert.equal('0', TatsuScript.run('{bit;!;2}'));
assert.equal('-3', TatsuScript.run('{bit;~;2}'));
assert.equal('2', TatsuScript.run('{bit;&;2;10}'));
assert.equal('8', TatsuScript.run('{bit;^;2;10}'));
assert.equal('10', TatsuScript.run('{bit;|;2;10}'));
assert.equal('2048', TatsuScript.run('{bit;<<;2;10}'));
assert.equal('0', TatsuScript.run('{bit;>>;2;10}'));
assert.equal('0', TatsuScript.run('{bit;>>>;2;10}'));

/**
 * ceil function
 */
assert.equal('3', TatsuScript.run('{ceil;2.6}'));
assert.equal('3', TatsuScript.run('{ceil;2.3}'));
assert.equal('-2', TatsuScript.run('{ceil;-2.6}'));
assert.equal('-2', TatsuScript.run('{ceil;-2.3}'));

/**
 * channelid function
 */
assert.equal('123456789123456789', TatsuScript.run('{channelid}', {
  channel: { id: '123456789123456789' },
}));

/**
 * channelname function
 */
assert.equal('foobar', TatsuScript.run('{channelname}', {
  channel: { name: 'foobar' },
}));

/**
 * channeltopic function
 */
assert.equal('foo bar foobar', TatsuScript.run('{channeltopic}', {
  channel: { topic: 'foo bar foobar' },
}));

/**
 * decr function
 */
assert.equal(1, TatsuScript.run('{decr;2}'));
assert.equal(-1, TatsuScript.run('{decr;0}'));

/**
 * floor function
 */
assert.equal(1, TatsuScript.run('{floor;1.6}'));
assert.equal(1, TatsuScript.run('{floor;1.3}'));
assert.equal(-2, TatsuScript.run('{floor;-1.6}'));
assert.equal(-2, TatsuScript.run('{floor;-1.3}'));

/**
 * set function
 */
assert.equal('', TatsuScript.run('{set;foo;bar}'));
assert.equal('bar', variables.foo[0].value);

/**
 * get function
 */
assert.equal('bar', TatsuScript.run('{get;foo}'));

/**
 * i function
 */
assert.equal('0', TatsuScript.run('{i}'));

/**
 * if function
 */
assert.equal('yes', TatsuScript.run('{if;==;2;2;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;!=;2;3;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;<;2;3;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;>;3;2;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;<=;2;3;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;>=;3;2;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;||;1;0;yes;no}'));
assert.equal('yes', TatsuScript.run('{if;&&;1;1;yes;no}'));

/**
 * incr function
 */
assert.equal('2', TatsuScript.run('{incr;1}'));
assert.equal('0', TatsuScript.run('{incr;-1}'));

/**
 * indexof function
 */
assert.equal('0', TatsuScript.run('{indexof;abcdefghij;a}'));
assert.equal('9', TatsuScript.run('{indexof;jihgfedbca;a}'));

/**
 * inject function
 */
assert.equal('1', TatsuScript.run('{inject;{lb}floor{semi}1.4{rb}}'));

/**
 * lastindexof function
 */
assert.equal('9', TatsuScript.run('{lastindexof;abcabcabca;a}'));

/**
 * lb function
 */
assert.equal('{', TatsuScript.run('{lb}'));

/**
 * length function
 */
assert.equal('10', TatsuScript.run('{length;abcabcabca}'));
assert.equal('', TatsuScript.run('{length}'));

/**
 * loop function
 */
assert.equal('A A A A A A', TatsuScript.run('{loop;1;6;A; }'));

/**
 * lower function
 */
assert.equal('aaaaa', TatsuScript.run('{lower;aAaAa}'));

/**
 * math function
 */
assert.equal('3', TatsuScript.run('{math;+;1;2}'));
assert.equal('1', TatsuScript.run('{math;-;3;1;1}'));
assert.equal('2', TatsuScript.run('{math;/;4;2}'));
assert.equal('2', TatsuScript.run('{math;*;1;2}'));
assert.equal('1', TatsuScript.run('{math;%;9;2}'));
assert.equal('4', TatsuScript.run('{math;^;2;2}'));
assert.equal('2', TatsuScript.run('{math;sqrt;4}'));
assert.equal('2', TatsuScript.run('{math;cbrt;8}'));

/**
 * nl function
 */
assert.equal('\n', TatsuScript.run('{nl}'));

/**
 * pad function
 */
assert.equal('0000a', TatsuScript.run('{pad;l;a;5;0}'));
assert.equal('a0000', TatsuScript.run('{pad;r;a;5;0}'));
assert.equal('`Invalid direction`', TatsuScript.run('{pad}'));
assert.equal('', TatsuScript.run('{pad;l}'));

/**
 * randarg function
 */
assert.equal('a', TatsuScript.run('{randarg}', {
  content: 'a a a a',
}));

/**
 * randchoice function
 */
assert.equal('a', TatsuScript.run('{randchoice;a;a;a;a;a}'));

/**
 * randint function
 */
assert.equal('1', TatsuScript.run('{randint;1;1}'));

/**
 * randstr function
 */
assert.equal('a', TatsuScript.run('{randstr;a;1}'));

/**
 * randuser function
 */
assert.equal('123456789123456789', TatsuScript.run('{randuser}', {
  channel: { guild: { members: { random: () => ({ id: '123456789123456789' }) } } },
}));

/**
 * rb function
 */
assert.equal('}', TatsuScript.run('{rb}'));

/**
 * regexreplace function
 */
assert.equal('abbbba', TatsuScript.run('{regexreplace;a1111a;/\\d/g;b}'));

/**
 * repeat function
 */
assert.equal('aaaaa', TatsuScript.run('{repeat;a;5}'));

/**
 * replace function
 */
assert.equal('accdeb', TatsuScript.run('{replace;abcdeb;b;c}'));

/**
 * reverse function
 */
assert.equal('edcba', TatsuScript.run('{reverse;abcde}'));

/**
 * round function
 */
assert.equal('2', TatsuScript.run('{round;2.3}'));
assert.equal('3', TatsuScript.run('{round;2.6}'));

/**
 * semi function
 */
assert.equal(';', TatsuScript.run('{semi}'));

/**
 * serverid function
 */
assert.equal('123456789123456789', TatsuScript.run('{serverid}', {
  channel: { guild: { id: '123456789123456789' } },
}));

/**
 * servername function
 */
assert.equal('foobar', TatsuScript.run('{servername}', {
  channel: { guild: { name: 'foobar' } },
}));

/**
 * serverusers function
 */
assert.equal('100', TatsuScript.run('{serverusers}', {
  channel: { guild: { members: { size: 100 } } },
}));
assert.equal('100', TatsuScript.run('{serverusers}', {
  channel: { guild: { members: {}, memberCount: 100 } },
}));

/**
 * shuffle function
 */
assert.equal('aaaaa', TatsuScript.run('{shuffle;aaaaa}'));

/**
 * space function
 */
assert.equal('   ', TatsuScript.run('{space;3}'));
assert.equal(' ', TatsuScript.run('{space}'));

/**
 * substr function
 */
assert.equal('cdef', TatsuScript.run('{substr;abcdef;2}'));
assert.equal('bcde', TatsuScript.run('{substr;abcdef;1;4}'));
assert.equal('', TatsuScript.run('{substr}'));
assert.equal('abcdef', TatsuScript.run('{substr;abcdef}'));

/**
 * switch function
 */
assert.equal('3', TatsuScript.run('{switch;c;a;1;b;2;c;3;d;4;5}'));
assert.equal('5', TatsuScript.run('{switch;e;a;1;b;2;c;3;d;4;5}'));

/**
 * time function
 */
//assert.equal('07:40:00', TatsuScript.run('{time;LTS;600000}'));
//assert.equal('21:10', TatsuScript.run('{time;HH:mm;600000;America/Sao_Paulo}'));

/**
 * upper function
 */
assert.equal('AAAAA', TatsuScript.run('{upper;aaaAa}'));

/**
 * usercreatedat function
 */
assert.equal('600000', TatsuScript.run('{usercreatedat;123456789123456789}', {
  channel: { guild: { members: {
    get: () => ({ user: { createdAt: 600000 } }),
    has: () => true 
  } } },
}));
assert.equal('600000', TatsuScript.run('{usercreatedat}', {
  author: { createdAt: 600000 },
}));

/**
 * userdiscrim function
 */
assert.equal('4000', TatsuScript.run('{userdiscrim;123456789123456789}', {
  channel: { guild: { members: {
    get: () => ({ discriminator: '4000' }),
    has: () => true 
  } } },
}));
assert.equal('4000', TatsuScript.run('{userdiscrim}', {
  author: { discriminator: '4000' },
}));

/**
 * userid function
 */
assert.equal('123456789123456789', TatsuScript.run('{userid;<@123456789123456789>}', {
  channel: { guild: { members: {
    get: () => ({ id: '123456789123456789' }),
    has: () => true 
  } } },
}));
assert.equal('123456789123456789', TatsuScript.run('{userid}', {
  author: { id: '123456789123456789' },
}));

/**
 * username function
 */
assert.equal('foobar', TatsuScript.run('{username;<@123456789123456789>}', {
  channel: { guild: { members: {
    get: () => ({ user: { username: 'foobar' } }),
    has: () => true 
  } } },
}));
assert.equal('foobar', TatsuScript.run('{username}', {
  author: { username: 'foobar' },
}));

/**
 * usernick function
 */
assert.equal('foobar', TatsuScript.run('{usernick;<@123456789123456789>}', {
  channel: { guild: { members: {
    get: () => ({ nick: 'foobar' }),
    has: () => true 
  } } },
}));
assert.equal('foobar', TatsuScript.run('{usernick;<@123456789123456789>}', {
  channel: { guild: { members: {
    get: () => ({ nickname: 'foobar' }),
    has: () => true 
  } } },
}));
assert.equal('foobar', TatsuScript.run('{usernick}', {
  member: { nick: 'foobar' },
}));
assert.equal('foobar', TatsuScript.run('{usernick}', {
  member: { nickname: 'foobar' },
}));