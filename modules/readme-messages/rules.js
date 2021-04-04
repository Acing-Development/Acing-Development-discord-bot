const botMessage = require("../bot-message.js");

module.exports = function(channelId, messageId) {
  botMessage(channelId, messageId, "Rules message");
}