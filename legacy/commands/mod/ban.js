const punishments = require("../../modules/punishments.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["ban"],
    description: "Bans a member.",
    roles_required: ["Admin"],
    minArgs: 1,
    executor: async function(message, args) {
      const target = message.mentions.users.first();
      const reason = args.slice(1).join(" ");

      if (target) {
        punishments.punish(message, target, "Ban", reason);

        const targetMember = message.guild.members.cache.get(target.id);
        targetMember.ban();
        
        message.reply("That user has been banned.");;
      } else {
        message.reply("Please specify someone to ban.");
      }
    }
  });
}