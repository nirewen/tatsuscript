export default function () {
  const members = this.context.channel.guild.members.cache
    ? this.context.channel.guild.members.cache
    : this.context.channel.guild.members;

  return members.size || this.context.channel.guild.memberCount;
};
