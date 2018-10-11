const TatsuScript = require('../');
const assert = require('assert');

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
