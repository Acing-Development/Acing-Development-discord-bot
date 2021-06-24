const botMessage = require("../bot-message.js");

module.exports = function(channelId, messageId) {
  botMessage(channelId, messageId, `**Permanent invite link:**
https://discord.gg/KEd4Zn2McW

**How to get <@&834795976107360306> and <@&834796220954181692> roles:**
For the YouTuber role you need:
- A YouTube channel
- A video containing this Discord server, it must also have at least 150 views.
- At least 50 subscribers.
If you meet these requirements, ping AceKiron asking to get the role added.

For the Partner role you need:
- This hasn't been specified yet.`);
}