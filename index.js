const Utils = require("./utils.js");

const expressApp = require("express")();

const fs = require('fs');

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = "$";

const commandFiles = fs.readdirSync("./commands").filter(function(file) {
  return file.endsWith(".js");
});
for (const file of commandFiles) {
	const command = require("./commands/" + file);
	client.commands.set(command.name, command);
}

client.on("message", function(message) {
  if (message.author.bot) return; // Sender was a bot

  // Global

  if (message.content.startsWith(prefix)) {
    // Command
    const splitMessage = message.content.slice(prefix.length).split(" ");
    const cmd = splitMessage[0].toLowerCase();
    const args = splitMessage.slice(1);

    if (client.commands.has(cmd)) {
      try {
        client.commands.get(cmd).execute(client, cmd, args, message.channel, message.author, message);
      } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
      }
    }
  } else {
    // Text
  }
});

client.on("ready", function() {
  console.log("Logged in as " + client.user.tag + "!");

  let activities = ["Lucade Realm", "Roblox", "Infinite Obby"];
  Utils.setIntervalImmediately(function() {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    console.log("Changed activity: " + activity);
    client.user.setActivity(activity);
    
  }, 120000); // Fires every 120 seconds = every 2 minutes
});

client.login(process.env.DISCORD_TOKEN);

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(8000, async () => {
  console.log("Webserver is running!");
})