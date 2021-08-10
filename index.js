const path = require("path");
require("dotenv").config();

const bod = require("./discord-bod");

global.client = new bod.Client(
	async function(client) {
		console.log("I'm logged in!");
	}
);

console.log("Created client.");

global.client.registry
	.registerGroups([
		["misc", "Misc commands"],
		["mod", "Moderator commands"]
	])
	.registerCommandsIn(path.join(__dirname, "commands"))
	.registerFeaturesIn(path.join(__dirname, "features"));

console.log("Created registry.");

global.client.login(process.env.DISCORD_TOKEN);