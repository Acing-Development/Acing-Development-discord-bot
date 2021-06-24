const ytdl = require("ytdl-core");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["sing"],
    description: "Sings a song",
    minArgs: 0,
    maxArgs: -1,
    executor: async function(message, args) {
      const songInfo = await ytdl.getInfo(args[0]);
      const song = {
        title: songInfo.title,
        url: songInfo.video_url
      };

      global.music.queue.push(song);

      if (global.music.queue.length == 1) {
        // Playing right now
        global.music.play();
      } else {
        // Not playing right now
        message.channel.send("This song has been added to the queue.");
      }
    }
  });
}