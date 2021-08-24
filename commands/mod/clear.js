const bod = require("../../discord-bod");

module.exports = bod.Command({
  aliases: ["clear", "clr", "cc", "clearchannel"],
	name: "clear",
  maxArgs: 0,
	syntax: "clear",
	description: "Clears all messages in a text channel.",
  userPermissions: ["ADMINISTRATOR"],

  async run(client, message, args) {
    message.channel.messages.fetch().then(function(results) {
      message.channel.bulkDelete(results);
    });
  }
});