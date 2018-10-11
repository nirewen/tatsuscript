const TatsuScript = require('../');

const script = '{abs;-1}';

const output = TatsuScript.run(script, 'foo');

console.log(output);
