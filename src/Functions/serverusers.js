export default function () {
  return this.context.channel.guild.members.size || this.context.channel.guild.memberCount;
};
