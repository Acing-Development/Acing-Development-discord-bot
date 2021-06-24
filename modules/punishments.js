let punishmentLogsChannel = "831860118940418068";

const embed = require("./embed.js");

function getEmbedColor(type) {
  switch (type) {
    case "Ban":
      return "#9c1f1f";
    case "Kick":
      return "#c92c1e";
    case "Warn":
      return "#b38012";
  }
}

module.exports = {
  punish(message, victim, type, reason="", extraFields=[]) {
    if (reason) {
      extraFields = extraFields.concat([
        ["Reason", reason]
      ]);
    }

    message.guild.channels.resolve(punishmentLogsChannel).send(embed({
      title: "Punishment: " + type,
      color: getEmbedColor(type),
      fields: [
        ["Channel", "<#" + message.channel.id + ">"],
        ["Victim", "<@" + victim.id + ">"]
      ].concat(extraFields),
      footer: "Punisher ID: " + message.author.id
    }));
  }
}