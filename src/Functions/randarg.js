export default function () {
  let args = this.context.content.split(/\s+/);

  return args[Math.floor(Math.random() * args.length)]
};
