const botMessage = require("../bot-message.js");

module.exports = function(channelId, messageId) {
  botMessage(channelId, messageId, `**Rule 1:** Be respectful to everyone.

**Rule 2:** Keep topics in their designated channels.

**Rule 3:** No NSFW content in any channel.

**Rule 4:** Spamming in any channel is not allowed, these includes pings without context.

**Rule 5:** No advertising outside of advertisements channel.

**Rule 6:** Don't try getting around the filter, it's there for a reason.

**Rule 7:** Don't share any personal information.

**Rule 8:** Follow Discord's Terms of Service.

**Rule 9:** Only DM or pings mods for serious reasons.`);
}