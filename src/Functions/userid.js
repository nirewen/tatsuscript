
  userid: function (str) {
    let match = str ? this.interpret(str).match(regex) : '';
    if (match)
      return this.channel.guild.members.has(match[0])
        ? this.channel.guild.members.get(match[0]).id
        : '`User not found`';

    return this.author.id;
  },
