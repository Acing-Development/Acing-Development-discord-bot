module.exports = function(trigger, reply) {
  global.client.on("message", function(message) {
    if (message.content.toLowerCase() == trigger.toLowerCase()) {
      message.author.send(reply);
    }
  });
}