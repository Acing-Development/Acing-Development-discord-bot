const botMessage = require("../bot-message.js");

module.exports = function(channelId, messageId) {
  botMessage(channelId, messageId, "Permanent invite link: https://discord.gg/KEd4Zn2McW");
}