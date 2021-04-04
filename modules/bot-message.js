const addReactions = function(message, reactions) {
  let reactionIndex = 0;

  let interval = setInterval(function() {
    if (reactionIndex >= reactions.length - 1) {
      clearInterval(interval);
    }

    message.react(reactions[reactionIndex]);

    reactionIndex += 1;
  }, 750);
}

module.exports = async function(channelId, messageId, text, reactions = []) {
  const channel = await global.client.channels.fetch(channelId);
  channel.messages.fetch(messageId).then(function(message) {
    message.edit(text);
    if (reactions.length > 0) {
      addReactions(message, reactions);
    }
  });
}