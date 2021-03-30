const startTime = new Date().getTime();

module.exports = {
  name: "uptime",
  description: "Tells the uptime of the bot in ms.",
  execute(client, cmd, args, channel, author, _message) {
    channel.send(new Date().getTime() - startTime + "ms");
  }
}