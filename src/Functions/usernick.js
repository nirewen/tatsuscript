import regex from './Common/idRegex';

export default function (str) {
  let match = str ? this.interpret(str).match(regex) : '';

  if (match) {
    const members = this.context.channel.guild.members.cache
      ? this.context.channel.guild.members.cache
      : this.context.channel.guild.members;

    return members.has(match[0])
      ? members.get(match[0]).nick || members.get(match[0]).nickname || ''
      : '`User not found`';
  }

  return this.context.member.nick || this.context.member.nickname || '';
};
