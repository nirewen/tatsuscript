import regex from './Common/idRegex';

export default function (str) {
  let match = str ? this.interpret(str).match(regex) : '';
  
  if (match) {
    const members = this.context.channel.guild.members.cache
      ? this.context.channel.guild.members.cache
      : this.context.channel.guild.members;

    return members.has(match[0])
      ? members.get(match[0]).id
      : '`User not found`';
  }

  return this.context.author.id;
};
