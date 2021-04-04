const fs = require("fs");
const path = require('path');

const Discord = require("discord.js");

global.client = new Discord.Client();
global.client.commands = [];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

walkDir("./commands", function(file) {
  if (file.endsWith(".js")) {
    const command = require("./" + file)();
    global.client.commands.push(command);
  }
})

const config = require("./config.json");

global.client.on("message", async function(message) {
  if (!message.content.startsWith(config.prefix)) return;

  const contentSplit = message.content.slice(config.prefix.length).split(" ");

  let cmd = contentSplit[0].toLowerCase();
  let args = contentSplit.slice(1);

  for (const command of global.client.commands) {
    if (command.aliases.includes(cmd)) {
      await command.execute(command, message, args);
      break;
    }
  }
});

const readmeMessages = require("./modules/readme-messages.js");
const poll = require("./modules/poll.js");
const finishPunishments = require("./modules/finishPunishments.js");

global.client.on("ready", async function() {
  console.log("Logged in as " + global.client.user.tag + "!");

  function changeActivity() {
    let activities = ["Lucade Realm", "Roblox", "Infinite Obby"];
    let activity = activities[Math.floor(Math.random() * activities.length)];
    global.client.user.setActivity(activity);
    console.log("Changed activity: " + activity);
  }

  // Fires every 120 seconds = every 2 minutes
  setInterval(changeActivity, 120000);
  changeActivity();

  readmeMessages();
  poll();
  finishPunishments();
});

client.login(process.env.DISCORD_TOKEN);

const expressApp = require("express")();

expressApp.get("/", (req, res) => {
  res.send("Ping!");
});

expressApp.listen(8000, async () => {
  console.log("Webserver is running!");
});