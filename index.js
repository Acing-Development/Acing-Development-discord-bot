const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "$";

client.on("message", function(message) {
  if (message.author.bot) return; // Sender was a bot

  // Global

  if (message.content.startsWith(prefix)) {
    // Command
  } else {
    // Text
  }
});

client.on("ready", function() {
  console.log("Logged in as " + client.user.tag + "!");
});

client.login(process.env.DISCORD_TOKEN);
