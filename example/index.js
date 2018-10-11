const TatsuScript = require('../');
const assert = require('assert');
const variables = require('../dist/Functions/Common/variables');

/**
 * Abs function.
 */
assert.equal(1, TatsuScript.run('{abs;-1}'));

/**
 * Args function.
 */
assert.equal('foo,bar', TatsuScript.run('{args}', {
  content: 'foo bar',
}));

/**
 * Args len function.
 */
assert.equal(2, TatsuScript.run('{argslen}', {
  content: 'foo bar',
}));

/**
 * Set function.
 */
assert.equal('', TatsuScript.run('{set;foo;bar}'));
assert.equal('bar', variables.foo[0].value);

/**
 * Get function
 */
assert.equal('bar', TatsuScript.run('{get;foo}'));
