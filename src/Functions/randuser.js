export default function () {
  return this.context.channel.guild.members.random().id;
};
