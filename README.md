# TatsuScript

[![David](https://img.shields.io/david/nirewen/tatsuscript.png)](https://david-dm.org/nirewen/tatsuscript) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.png)](https://raw.githubusercontent.com/nirewen/tatsucript/master/LICENSE) [![npm](https://img.shields.io/npm/v/tatsuscript.png)](https://npm.im/tatsuscript)

A Tatsumaki tag script interpreter

## Installing

```
npm install tatsuscript --save
```

## Usage

```js
const TatsuScript = require('tatsuscript');
const commander = new TatsuScript(message); // should be a Message object, e.g. in a message event

let script = '{abs;-1}'; // the absolute function

let output = commander.run(script);

console.log(output); // 1
```

## Registering custom functions

Example using [Discord.JS](https://discord.js.org)
```js
commander.registerFunction('sendfile', function(url) { // SHOULD NOT BE AN ANON/ARROW FUNCTION
    url = this.interpret(url); // url should be interpreted, it's a token

    this.msg.channel.send(new Discord.Attachment(url));

    return `Sent file to ${this.msg.channel.name}`;
});
```
