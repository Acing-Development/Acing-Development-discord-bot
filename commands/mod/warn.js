const punishments = require("../../misc-modules/punishments.js");
const bod = require("../../discord-bod");

module.exports = bod.Command({
    aliases: ["warn"],
	name: "warn",
    minArgs: 1,
	syntax: "warn [member] [reason]",
	description: "Warns a member.",
    userPermissions: ["ADMINISTRATOR"],

    async run(client, message, args) {
        const target = message.mentions.users.first();
        const reason = args.slice(1).join(" ");

        if (target) {
            punishments.punish(message, target, "Warn", reason);

            const targetMember = message.guild.members.cache.get(target.id);

            message.reply("That user has been warned.");;
        } else {
            message.reply("Please specify someone to warn.");
        }
    }
});