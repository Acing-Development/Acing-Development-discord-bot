module.exports = function() {
  return require("../../command.js")({
    aliases: ["cc", "clear", "clearchannel"],
    minArgs: 0,
    maxArgs: 0,
    permissions_required: ["ADMINISTRATOR"],
    executor: async function(message, args) {
      message.channel.messages.fetch().then(function(results) {
        message.channel.bulkDelete(results);
      });
    }
  });
}