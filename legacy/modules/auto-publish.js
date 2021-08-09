module.exports = function() {
  global.client.on("message", function(message) {
    if (message.channel.type == "news") {
      message.crosspost();
      console.log("Published news message")
    }
  });
}