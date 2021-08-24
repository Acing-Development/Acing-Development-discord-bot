const bod = require("../discord-bod");
const utils = require("../utils.js");

const questions = [
	"What is your favorite game?",
	"What do you think is essential when developing games?",
	"What game engine do you use?",
	"What platform(s) do you think should have more games?",
	"What's the latest news on your game?",
	"What game are you working on?",
	"Do you think indie or AAA games are better?",
	"Do you prefer working solo or in a team?",
	"What's the most underrated game?",
	"What have you learned from developing the latest game you've made?",
	"What platform(s) will you release your game on?",
	"What motivates you to develop games?",
	"How's your game coming along?",
	"Is your game 2D or 3D?",
  "Which programming language(s) do you use?",
  "Why did you choose for the game engine you're using?",
  "What's a must have for every game developer?"
];

async function newQuestion(channel) {
  return await channel.send(questions[Math.floor(Math.random() * questions.length)]);
}

module.exports = bod.Feature({
	name: "QOTD",

	async onReady(client) {
		const channel = client.discord_client.channels.resolve("857564542598381589");

		const messages = await channel.messages.fetch({ limit: 1 });
		let lastMessage = messages.first();

		if (!lastMessage) {
			lastMessage = await newQuestion(channel);
		}

		let offset = 1000 * 60 * 60 * 24;
		let margin = 1000 * 60;
		let lastMessageTimestampWithOffset = lastMessage.createdTimestamp + offset;
		let now = Date.now();

		async function firstFunc() {
			console.log("Executed timeout QOTD function");

			async function func() {
				console.log("Executed interval QOTD function");
				lastMessage = await newQuestion(channel);
			}

			await func();
			setInterval(func, offset);
		}

		if (now > margin + lastMessage.createdTimestamp + offset) {
			firstFunc();
		} else {
			setTimeout(firstFunc, lastMessage.createdTimestamp + offset - now);
		}
	}
});