module.exports = function() {
  return require("../../command.js")({
    aliases: ["ban"],
    description: "Bans a member.",
    roles_required: ["Admin"],
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