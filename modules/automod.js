const fetch = require("node-fetch");

const punishments = require("./punishments.js");

async function containsAdvertisement(text) {
  return text.includes("discord.gg/");
}

module.exports = {
  onMessage: async function(message) {
    const content = message.content.toLowerCase().replace("\n", "").replace(" ", "");

    if (await containsAdvertisement(content)) {
      console.log("Automod: Contains advertisement.");
      
      message.reply("This message has been deleted due to advertising, you've also received a warning.");
      punishments.punish(message, message.author, "Warn", "Advertisement");

      return true;
    }

    return false;
  },

  onMessageDelete: async function(deleter, message) {
    if (message.author.id == deleter.id) {
      if (message.mentions.members.size) {
        console.log("Automod: Ghostping.");
      
        message.send("Ghostping by <@" + message.author.id + "> detected.");
        punishments.punish(message, message.author, "Warn", "Ghostpinging");

        return true;
      }
    }
  }
}