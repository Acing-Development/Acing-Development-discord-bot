const discord = require("discord.js");

module.exports = {
	Client: require("./client.js"),
	Command: require("./command.js"),
	Registry: require("./registry.js"),
	Feature: require("./feature.js"),

	Discord: discord,
}
