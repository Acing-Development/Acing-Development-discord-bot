const override = require("json-override");

module.exports = function(overriteData) {
	return override(
		{
			name: "",
			guildOnly: false,

			async onMessage(client, message) {},
			async onMessageDelete(client, message) {},
			async onReady(client) {}
		},
		overriteData
	);
}
