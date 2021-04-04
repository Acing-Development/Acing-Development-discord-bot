module.exports = function() {
  return require("../../command.js")({
    aliases: ["ban"],
    permissions_required: ["BAN_MEMBER"],
    minArgs: 1,
    maxArgs: 1,
    executor: async function(message, args) {
      const target = message.mentions.users.first();

      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        targetMember.ban();
        message.reply("That user has been banned.");
      } else {
        message.reply("Please specify someone to ban.");
      }
    }
  });
}