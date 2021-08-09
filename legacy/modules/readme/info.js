const botMessage = require("../bot-message.js");

module.exports = function(channelId, messageId) {
  botMessage(channelId, messageId, `
  
**Permanent invite link:**
https://discord.gg/m53mPndJF3

**How to get <@&834795976107360306> and <@&834796220954181692> roles:**
For the YouTuber role you need:
- A YouTube channel
- A video containing this Discord server, it must also have at least 150 views.
- At least 50 subscribers.
If you meet these requirements, ping AceKiron asking to get the role added.

YouTuber role perks:
- This special role
- Priority speaker in voice channels
- Use of external emojis
- Send TTS messages
- Use of slash commands
- Reacting to messages

For the Partner role you need:
- Be moderator in a fellow game development Discord server.
- Have at least 100 members in your server.
- Be active in the community.
(You may also receive the Partner role if you contributed to code of any of the admins.)

Partner role perks:
- This special role
- Priority speaker in voice channels
- Use of external emojis
- Use of slash commands
- Reacting to messages
- View audit logs
- View server insights
  `);
}