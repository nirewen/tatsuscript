
  userdiscrim: function (str) {
    let match = str ? this.interpret(str).match(idRegex) : '';
    if (match)
      return this.channel.guild.members.has(match[0])
        ? this.channel.guild.members.get(match[0]).discriminator
        : '`User not found`';

    return this.author.discriminator;
  },
