const punishments = require("../../misc-modules/punishments.js");
const bod = require("../../discord-bod");

module.exports = bod.Command({
    aliases: ["ban"],
	name: "ban",
    minArgs: 1,
	syntax: "ban [member] [reason]",
	description: "Bans a member.",
    userPermissions: ["ADMINISTRATOR"],

    async run(client, message, args) {
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