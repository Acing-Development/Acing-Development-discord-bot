module.exports = function() {
  return require("../../command.js")({
    aliases: ["kick"],
    permissions_required: ["KICK_MEMBER"],
    minArgs: 1,
    maxArgs: 1,
    executor: async function(message, args) {
      const target = message.mentions.users.first();

      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        targetMember.kick();
        message.reply("That user has been kicked.");
      } else {
        message.reply("Please specify someone to kick.");
      }
    }
  });
}