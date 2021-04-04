module.exports = function() {
  return require("../../command.js")({
    aliases: ["say", "send"],
    permissions_required: ["ADMINISTRATOR"],
    executor: async function(message, args) {
      message.channel.send("Sample message");
    }
  });
}