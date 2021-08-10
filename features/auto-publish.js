const bod = require("../discord-bod");

module.exports = bod.Feature({
	name: "Auto Publish",

	async onMessage(client, message) {
        if (message.channel.type == "news") {
            message.crosspost();
            console.log("Published news message")
        }
    }
});