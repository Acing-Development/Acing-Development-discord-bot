const botMessage = require("../bot-message.js");

module.exports = function(channelId, messageId) {
  const getEmoji = function(emojiName) {
    let emoji = global.client.emojis.cache.find(function(emoji) {
      return emoji.name == emojiName;
    });

    if (emoji) return emoji;

    return emojiName;
  }

  const emojis = {
    "🖥️": "Programmer",
    "📜": "Translator",
    "🎵": "Music Composer",
    "🎮": "Beta Tester",
    "🖌️": "Artist",
    "🏃": "Animator",
    "💬": "Story Writer",
    "🎲": "Game Designer"
  }

  const reactions = [];
  let emojiText = "Add a reaction to claim a role.\n\n";
  for (const emojiName in emojis) {
    const emoji = getEmoji(emojiName);
    reactions.push(emoji);

    const role = emojis[emojiName];
    emojiText += `${emoji}: ${role}\n\n`;
  }

  botMessage(channelId, messageId, emojiText, reactions);

  const handleReaction = function(reaction, user, add) {
    if (user.id == global.client.user.id) return;

    const emoji = reaction._emoji.name;
    const roleName = emojis[emoji];

    const role = reaction.message.guild.roles.cache.find(function(role) {
      return role.name == roleName;
    });
    const member = reaction.message.guild.members.cache.find(function(member) {
      return member.id == user.id;
    });

    if (add) {
      member.roles.add(role);
    } else {
      member.roles.remove(role);
    }
  }

  global.client.on("messageReactionAdd", function(reaction, user) {
    if (reaction.message.channel.id == channelId) {
      handleReaction(reaction, user, true);
    }
  });

  global.client.on("messageReactionRemove", function(reaction, user) {
    if (reaction.message.channel.id == channelId) {
      handleReaction(reaction, user, false);
    }
  });
}