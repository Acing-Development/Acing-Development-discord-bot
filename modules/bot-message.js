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

  let message = await channel.messages.fetch(messageId);

  if (message) {
    message.edit(text);
  } else {
    message = await channel.send(text);
  }

  if (reactions.length > 0) {
    addReactions(message, reactions);
  }
}