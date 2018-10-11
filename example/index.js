const TatsuScript = require('../');
const commander = new TatsuScript({});

const script = '{abs;-1}';

const output = commander.run(script);

console.log(output);