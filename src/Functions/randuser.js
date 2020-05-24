export default function () {
  const members = this.context.channel.guild.members.cache
    ? this.context.channel.guild.members.cache
    : this.context.channel.guild.members;

  return members.random().id;
};
