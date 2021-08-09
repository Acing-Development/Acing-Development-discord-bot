const discord = require("discord.js");
const splitargs = require("splitargs");

const registry = require("./registry.js");

const fs = require("fs");

module.exports = class {
	constructor(onReady) {
		const bodThis = this;

		this.discord_client = new discord.Client();

		this.discord_client.on("ready", async function() {
			console.log("Logged in as " + this.user.tag + "!");
			onReady(this);

			for (const feature of bodThis.registry.features) {
				feature.onReady(bodThis);
			}

			global.startTime = Math.floor(Date.now() / 1000);
		});

		this.discord_client.on("messageDelete", async function(message) {
			if (message.author.bot) return;

			await Discord.Util.delayFor(2500);

			let logs = await message.guild.fetchAuditLogs({type: 72});
			let entry = logs.entries.first();

			for (const feature of bodThis.registry.features) {
				if (feature.guildOnly && (!message.guild)) continue;

				feature.onMessageDelete(bodThis, message);
			}
		});

		this.discord_client.on("message", async function(message) {
			if (message.author.bot) return;

			for (const feature of bodThis.registry.features) {
				if (feature.guildOnly && (!message.guild)) continue;

				feature.onMessage(bodThis, message);
			}

			let allArgs;

			if (message.guild) {
				if (message.content.startsWith("<@!" + this.user.id + "> ")) {
					allArgs = splitargs(message.content.slice(("<@!" + this.user.id + "> ").toString().length));
				} else if (message.content.startsWith("$")) {
					allArgs = splitargs(message.content.slice("$".length));
				} else {
					return;
				}
			} else {
				allArgs = splitargs(message.content);
			}

			// No text was provided
			if (allArgs.length == 0) return;

			const cmd = allArgs[0].toLowerCase();
			const args = allArgs.slice(1);

			for (const command of bodThis.registry.commands) {
				if (command.aliases.includes(cmd)) {
					console.log("Requested to execute command " + cmd + " by " + message.author.username + ".");

					return bodThis.executeCommand(command, message, args);
				}
			}
		});

		this.registry = new registry();
	}

	async executeCommand(command, message, args) {
		const isInGuild = message.guild;

		// Check if guildOnly command is executed in DM.
		if (command.guildOnly && (!isInGuild)) {
			return message.reply("This command is only available in servers.");
		}

		// Check if NSFW command is executed in SFW channel.
		if (command.nsfw && (!message.channel.nsfw)) {
			return message.reply("This command is only available in NSFW channels.");
		}

		// Check if command has too few arguments.
		if (args.length < command.minArgs) {
			return message.reply("Too few arguments.");
		}

		// Check if command has too many arguments.
		if (args.length > command.maxArgs && command.maxArgs != -1) {
			return message.reply("Too many arguments.");
		}

		if (isInGuild) {
			const botPermissions = message.channel.permissionsFor(message.guild.me);

			// Make sure bot has permission to send messages
			if (!botPermissions.has("SEND_MESSAGES")) return;

			// clientPermissions: Permissions the bot needs
			for (const permission of command.clientPermissions) {
				if (!botPermissions.has(permission)) {
					return message.reply("I don't have the required " + permission + " permission.");
				}
			}

			// userPermissions: Permissions the person needs
			for (const permission of command.userPermissions) {
				if (!message.channel.permissionsFor(message.member).has(permission)) {
					return message.reply("You don't have the required " + permission + " permission.");
				}
			}
		}

		try {
			return command.run(this, message, args);
		} catch (e) {
			console.error(e);
		}
	}

	login(token) {
		this.discord_client.login(token);
		console.log("Login requested.");
	}
}
