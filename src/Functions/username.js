
  username: function (str) {
    console.log(this);
    let match = str ? this.interpret(str).match(regex) : '';
    if (match)
      return this.channel.guild.members.has(match[0])
        ? this.channel.guild.members.get(match[0]).username
        : '`User not found`';

    return this.author.username;
  },
