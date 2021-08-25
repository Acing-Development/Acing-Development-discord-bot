const bod = require("../discord-bod");
const utils = require("../utils.js");

const channelIds = [
    "830767810883354634", // #suggestions,
    "845348855813374063", // #xon-suggestions: Xondalf
    "834787561616310272", // #lr-suggestions: Lucade Realm

    "836881358801731585", // #test
];

module.exports = bod.Feature({
    name: "Votes",

	async onMessage(client, message) {
        if (channelIds.includes(message.channel.id)) {
            utils.addReactions(message, ["879729716767129600", "879729716767096832"]);
        }
    }
});