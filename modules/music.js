const ytdl = require("ytdl-core");

async function leave() {
  global.music.channel.leave();

  if (global.music.connection) {
    if (global.music.connection.destroy) {
      global.music.connection.destroy();
    } else {
      console.warn(global.music.connection);
    }
  }
}

async function play() {
  if (global.music.queue.length == 0) {
    return await leave();
  }

  if (!global.music.connection) {
    global.music.connection = await global.music.channel.join();
  }

  function func() {
    global.music.queue.shift();
    play();
  }

  global.music.connection.play(global.music.queue[0].url).on("finish", func).on("error", console.error);
}

global.music = {
  "queue": [],
  "play": play,
  "connection": null
}

module.exports = function() {
  global.music.channel = global.client.guilds.resolve("825743723681939466").channels.resolve("857527211854659584");
}