const bod = require("../discord-bod");
const punishments = require("../misc-modules/punishments.js");

async function containsAdvertisement(text) {
	return text.includes("discord.gg/") ||
    text.includes("dsc.gg/");
}

module.exports = bod.Feature({
	name: "Automod",

	async onMessage(client, message) {
		const content = message.content.toLowerCase().replace("\n", "").replace(" ", "");

		if (await containsAdvertisement(content)) {
			console.log("Automod: Contains advertisement.");

			message.reply("This message has been deleted due to advertising, you've also received a warning.");
			punishments.punish(message, message.author, "Warn", "Advertisement");
		}
	},

	async onMessageDelete(client, message) {
		if (message.author.id == deleter.id) {
			if (message.mentions.members.size) {
				console.log("Automod: Ghostping.");

				message.send("Ghostping by <@" + message.author.id + "> detected.");
				punishments.punish(message, message.author, "Warn", "Ghostpinging");
			}
		}
	}
});