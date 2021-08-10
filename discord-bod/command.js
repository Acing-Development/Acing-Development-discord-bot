const override = require("json-override");

module.exports = function(overriteData) {
	return override(
		{
			aliases: [],
			name: "",
			description: "",
			minArgs: 0,
			maxArgs: -1,
			syntax: "",
			nsfw: false,
			clientPermissions: [],
			userPermissions: [],
			guildOnly: false,
			async run(client, message, args) {
				console.log("Note: This command hasn't been implemented yet.");
			}
		},
		overriteData
	);
}
