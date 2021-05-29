const fetch = require("node-fetch");

async function containsAdvertisement(text) {
  return text.includes("discord.gg/");
}

module.exports = async function(message) {
  const content = message.content.toLowerCase().replace("\n", "").replace(" ", "");

  if (await containsAdvertisement(content)) {
    console.log("Automod: Contains advertisement.");
    return true;
  }

  return false;
}