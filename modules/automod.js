const fetch = require("node-fetch");

async function containsAdvertisement(text) {
  return text.includes("discord.gg/");
}

async function containsSwearwords(text) {
  return await fetch("https://raw.githubusercontent.com/AceKiron/public_data/main/swearwords.txt").then(res => res.text()).then(function(resText) {
    const swearwords = resText.split("\n");

    for (const swearword of swearwords) {
      if (text.includes(swearword)) {
        return true;
      }
    }

    return false;
  });
}

module.exports = async function(message) {
  const content = message.content.toLowerCase().replace("\n", "").replace(" ", "");

  if (await containsAdvertisement(content)) {
    return true;
  }

  if (await containsSwearwords(content)) {
    return true;
  }

  return false;
}