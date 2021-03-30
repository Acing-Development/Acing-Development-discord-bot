require("./keepalive.js");

const Discord = require("discord.js");
const client = new Discord.Client();

// Utils and config
const Utils = require("./utils.js");
const config = require("./config.json");

const command = require("./command.js");

client.on("ready", function() {
  console.log("Logged in as " + client.user.tag + "!");

  let activities = ["Lucade Realm", "Roblox", "Infinite Obby"];
  Utils.setIntervalImmediately(function() {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    console.log("Changed activity: " + activity);
    client.user.setActivity(activity);
  }, 120000); // Fires every 120 seconds = every 2 minutes

  command(client, "ping", function(message) {
    message.channel.send("Pong!");
  })
});

client.login(process.env.DISCORD_TOKEN);