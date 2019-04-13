
  usercreatedat: function (str) {
    let match = str ? this.interpret(str).match(idRegex) : '';
    if (match)
      return this.channel.guild.members.has(match[0])
        ? this.channel.guild.members.get(match[0]).user.createdAt
        : '`User not found`';
    return this.author.createdAt;
  },
