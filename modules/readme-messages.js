const channelId = "827847386813956127";

module.exports = function() {
  require("./readme-messages/roles.js")(channelId, "828336886421520405");
  require("./readme-messages/rules.js")(channelId, "828336908773490709");
  require("./readme-messages/info.js")(channelId, "828336937748004913");

  require("./readme-messages/welcome.js")("827931271611154442");
}