const embed = require("../../misc-modules/embed.js");
const bod = require("../../discord-bod");

module.exports = bod.Command({
	aliases: ["help", "?", "cmds"],
	name: "help",
	maxArgs: 1,
	syntax: "help [command]",
	description: "Shows you information about specific commands.",
	clientPermissions: ["EMBED_LINKS"],

	async run(client, message, args) {
		// Show all commands from all categories
		if (args.length == 0) {
			let fields = [];

			for (const group of client.registry.groups) {
				const directory = group[0];
				const name = group[1];

				// Add category with all its commands to fields variable
				fields.push([
					name,
					"`" + client.registry.commandCategories[directory].join("`, `") + "`"
				]);
			}

			return message.reply(embed({
				title: "Help",
				fields: fields
			}, message.author));
		}

		// Show detailed information about a command
		else {
			const commandName = args[0].toLowerCase();

			for (const command of client.registry.commands) {
				if (command.aliases.includes(commandName)) {
					let fields = [
						["Aliases", "`" + command.aliases.join("`, `") + "`"],
						["Description", command.description],
						["Arguments range", command.minArgs + (command.maxArgs != -1 ? (", " + command.maxArgs) : "")],
						["Syntax", "`" + command.syntax + "`"],
						["NSFW", command.nsfw ? "Yes" : "No"],
						["Guild only", command.guildOnly ? "Yes" : "No"]
					];

					// Only add requirement bot permissions if there are any
					if (command.clientPermissions.length != 0) {
						fields.push([
							"Bot permissions",
							"`" + command.clientPermissions.join("`, `") + "`"
						]);
					}

					// Only add requirement user permissions if there are any
					if (command.userPermissions.length != 0) {
						fields.push([
							"User permissions",
							"`" + command.userPermissions.join("`, `") + "`"
						]);
					}

					return message.reply(embed({
						title: "Help - " + commandName,
						fields: fields
					}, message.author));
				}
			}

			return message.reply("That command was not found, sorry.");
		}
	}
});