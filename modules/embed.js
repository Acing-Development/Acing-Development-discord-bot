const Discord = require("discord.js");

module.exports = function(overwrittenData) {
  let data = Object.assign({}, require("../templates/embed.js"));

  for (let key in overwrittenData) {
    data[key] = overwrittenData[key];
  }

  let embed = new Discord.MessageEmbed();

  embed.setTitle(data.title);
  embed.setColor(data.color);

  if (data.image != null) {
    embed.setImage(data.image);
  }

  embed.setTimestamp()

  for (const field of data.fields) {
    embed.addField(field[0], field[1]);
  }

  return embed;
}