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

let script = '{abs;-1}'; // the absolute function

let output = TatsuScript.run(script, message); // the message is the context the command was run in

console.log(output); // 1
```

## Registering custom functions

Example using [Discord.JS](https://discord.js.org)
```js
TatsuScript.registerFunction('sendfile', function (url) {
    url = this.interpret(url); // url should be interpreted, it's a token

    this.context.channel.send(new Discord.MessageAttachment(url));

    return `Sent file to ${this.context.channel.name}`;
});
```
