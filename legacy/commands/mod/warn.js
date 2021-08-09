const punishments = require("../../modules/punishments.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["warn"],
    description: "Warns a member.",
    roles_required: ["Admin"],
    minArgs: 1,
    executor: async function(message, args) {
      const target = message.mentions.users.first();
      const reason = args.slice(1).join(" ");

      if (target) {
        punishments.punish(message, target, "Warn", reason);

        message.reply("That user has been warned.");
      } else {
        message.reply("Please specify someone to kick.");
      }
    }
  });
}