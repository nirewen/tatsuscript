import regex from './Common/idRegex';

export default function (str) {
  let match = str ? this.interpret(str).match(regex) : '';

  if (match)
    return this.context.channel.guild.members.has(match[0])
      ? this.context.channel.guild.members.get(match[0]).nick || this.context.channel.guild.members.get(match[0]).nickname || ''
      : '`User not found`';

  return this.context.member.nick || this.context.member.nickname || '';
};
