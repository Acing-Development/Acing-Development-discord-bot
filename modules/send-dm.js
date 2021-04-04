module.exports = function(channel, text, duration = 60) { // Default duration = 1 minute
  channel.send(text).then(function(message) {
    if (duration == -1) return;
    
    setTimeout(function() {
      message.delete();
    }, duration * 1000);
  });
}