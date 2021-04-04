module.exports = function() {
  return require("../../command.js")({
    aliases: ["cc", "clear", "clearchannel"],
    permissions_required: ["ADMINISTRATOR"],
    executor: async function(message, args) {
      message.channel.messages.fetch().then(function(results) {
        message.channel.bulkDelete(results);
      });
    }
  });
}