
  usernick: function (str) {
    let match = str ? this.interpret(str).match(idRegex) : '';
    if (match)
      return this.channel.guild.members.has(match[0])
        ? this.channel.guild.members.get(match[0]).nick || this.channel.guild.members.get(match[0]).nickname || ''
        : '`User not found`';

    return this.member.nick || this.member.nickname || '';
  }
