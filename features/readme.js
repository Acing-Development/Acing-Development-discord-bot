const bod = require("../discord-bod");
const utils = require("../utils.js");

const getEmoji = function(client, emojiName) {
	let emoji = client.discord_client.emojis.cache.find(function(emoji) {
		return emoji.name == emojiName;
	});

	if (emoji) return emoji;

	return emojiName;
}

const handleRoleReaction = function(client, reaction, user, add) {
	if (user.id == client.discord_client.user.id) return;

	const emoji = reaction._emoji.name;
	const roleName = emojis[emoji];

	const role = reaction.message.guild.roles.cache.find(function(role) {
		return role.name == roleName;
	});
	const member = reaction.message.guild.members.cache.find(function(member) {
		return member.id == user.id;
	});

	if (add) {
		member.roles.add(role);
	} else {
		member.roles.remove(role);
	}
}

module.exports = bod.Feature({
	name: "Readme",

	async onReady(client) {
		const readmeChannel = client.discord_client.channels.resolve("827847386813956127");

		// Roles
		await (async function() {
			const emojis = {
				"🖥️": "Programmer",
				"📜": "Translator",
				"🎵": "Music Composer",
				"🎮": "Beta Tester",
				"🖌️": "Artist",
				"🏃": "Animator",
				"💬": "Story Writer",
				"🎲": "Game Designer"
			};

			const reactions = [];
			let emojiText = "Add a reaction to claim a role.\n\n";
			for (const emojiName in emojis) {
				const emoji = getEmoji(client, emojiName);
				reactions.push(emoji);

				const role = emojis[emojiName];
				emojiText += `${emoji}: ${role}\n\n`;
			}

			let message = await readmeChannel.messages.fetch("848143295658065920");

			if (message) {
				message.edit(emojiText);
			} else {
				message = await readmeChannel.send(emojiText);
			}

			if (reactions.length > 0) {
				utils.addReactions(message, reactions);
			}

			client.discord_client.on("messageReactionAdd", function(reaction, user) {
				if (reaction.message.channel == readmeChannel) {
					handleRoleReaction(client, reaction, user, true);
				}
			});

			client.discord_client.on("messageReactionRemove", function(reaction, user) {
				if (reaction.message.channel == readmeChannel) {
					handleRoleReaction(client, reaction, user, false);
				}
			});
		})();

		// Rules
		await (async function() {
			let message = await readmeChannel.messages.fetch("848143296119439411");

			const text = `
**Rule 1:** Be respectful to everyone.

**Rule 2:** Keep topics in their designated channels.

**Rule 3:** No NSFW content in any channel.

**Rule 4:** Spamming in any channel is not allowed, these includes pings without context.

**Rule 5:** No advertising outside of advertisement related channels and custom statuses.

**Rule 6:** Don't try getting around the filter, it's there for a reason.

**Rule 7:** Don't share any personal information.

**Rule 8:** Follow Discord's Terms of Service.

**Rule 9:** Only DM or ping mods for serious reasons.
			`;

			if (message) {
				message.edit(text);
			} else {
				message = await readmeChannel.send(text);
			}
		})();

		// Info
		await (async function() {
			let message = await readmeChannel.messages.fetch("848143296961183744");

			const text = `
**Permanent invite link:**
https://discord.gg/m53mPndJF3

**How to get <@&834795976107360306> and <@&834796220954181692> roles:**
For the YouTuber role you need:
- A YouTube channel
- A video containing this Discord server, it must also have at least 150 views.
- At least 50 subscribers.
If you meet these requirements, ping AceKiron asking to get the role added.

YouTuber role perks:
- This special role
- Priority speaker in voice channels
- Use of external emojis
- Send TTS messages
- Use of slash commands
- Reacting to messages

For the Partner role you need:
- Be moderator in a fellow game development Discord server.
- Have at least 100 members in your server.
- Be active in the community.
(You may also receive the Partner role if you contributed to code of any of the admins.)

Partner role perks:
- This special role
- Priority speaker in voice channels
- Use of external emojis
- Use of slash commands
- Reacting to messages
- View audit logs
- View server insights
			`;

			if (message) {
				message.edit(text);
			} else {
				message = await readmeChannel.send(text);
			}
		})();

		// Welcome
		await (async function() {
			const channel = client.discord_client.channels.resolve("827931271611154442");

			client.discord_client.on("guildMemberAdd", async function(member) {
				channel.send("Welcome to our server, <@" + member.id + ">, please make sure to read through the <#827847386813956127> channel.");
			});

			client.discord_client.on("guildMemberRemove", async function(member) {
				channel.send("We're sorry to see you leave, <@" + member.id + ">.");
			})
		})();
	}
});
