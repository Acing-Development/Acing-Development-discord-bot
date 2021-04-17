const fs = require("fs");
const path = require('path');

const config = require("./config.json");

const Discord = require("discord.js");

global.client = new Discord.Client();
global.client.commands = [];
global.client.categories = [];

fs.readdirSync("./commands").forEach(function(category) {
  const commandNames = [];

  fs.readdirSync("./commands/" + category).forEach(function(file) {
    commandNames.push(config.prefix + file.replace(".js", ""));

    const command = require("./commands/" + category + "/" + file)();
    global.client.commands.push(command);
  });

  global.client.categories.push([category, commandNames]);
});

const autoMod = require("./modules/automod.js");

global.client.on("message", async function(message) {
  if (message.author.bot) return;

  if (await autoMod(message)) {
    message.delete();
    return;
  }

  if (!message.content.startsWith(config.prefix)) return;

  const contentSplit = message.content.slice(config.prefix.length).split(" ");

  let cmd = contentSplit[0].toLowerCase();
  let args = contentSplit.slice(1);

  for (const command of global.client.commands) {
    if (command.aliases.includes(cmd)) {
      await command.execute(command, message, args);
      return;
    }
  }
});

global.client.on("ready", async function() {
  console.log("Logged in as " + global.client.user.tag + "!");

  require("./modules/readme.js")();
  require("./modules/poll.js")();
  require("./modules/nitro_boost.js")();
  require("./modules/activities.js")();

  require("./modules/punishments.js").ready();

  global.client.guilds.resolve("825743723681939466").channels.resolve("830885460564770906").send("I'm back online!");
});

global.client.login(process.env.DISCORD_TOKEN);

const expressApp = require("express")();

expressApp.get("/", (req, res) => {
  res.send("Ping!");
});

expressApp.listen(8000, async () => {
  console.log("Webserver is running!");
});