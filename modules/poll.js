const addReactions = function(message) {
  const reactions = ["👍", "👎"];

  let reactionIndex = 0;

  let interval = setInterval(function() {
    if (reactionIndex >= reactions.length - 1) {
      clearInterval(interval);
    }

    message.react(reactions[reactionIndex]);

    reactionIndex += 1;
  }, 750);
}

module.exports = function() {
  const channelIds = [
    "830767810883354634" // #suggestions
  ];

  global.client.on("message", function(message) {
    if (channelIds.includes(message.channel.id)) {
      addReactions(message);
    }
  });
}