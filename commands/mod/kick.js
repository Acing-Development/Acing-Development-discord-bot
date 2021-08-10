const punishments = require("../../misc-modules/punishments.js");
const bod = require("../../discord-bod");

module.exports = bod.Command({
    aliases: ["kick"],
	name: "kick",
    minArgs: 1,
	syntax: "kick [member] [reason]",
	description: "Kicks a member.",
    userPermissions: ["ADMINISTRATOR"],

    async run(client, message, args) {
        const target = message.mentions.users.first();
        const reason = args.slice(1).join(" ");

        if (target) {
            punishments.punish(message, target, "Kick", reason);

            const targetMember = message.guild.members.cache.get(target.id);
            targetMember.kick();

            message.reply("That user has been kicked.");;
        } else {
            message.reply("Please specify someone to kick.");
        }
    }
});