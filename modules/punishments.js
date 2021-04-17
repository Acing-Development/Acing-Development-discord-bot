const muteRoleId = "826895434281910273";

let punishmentLogsChannel = "831860118940418068";

const tempdb = require("../tempdb.js");
const embed = require("./embed.js");

function getEmbedColor(type) {
  switch (type) {
    case "Ban":
      return "#9c1f1f";
    case "Kick":
      return "#c92c1e";
    case "Mute":
      return "#db8930";
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
        ["Victim", "<@" + victim.id + ">"]
      ].concat(extraFields),
      footer: "Punisher ID: " + message.author.id
    }));
  },

  ready() {
    tempdb.connect();

    global.client.guilds.cache.each(function(guild) {
      guild.members.cache.each(function(member) {
        member.roles.cache.filter(function(role) { return role.id == muteRoleId; }).each(function(role) {
          const dbData = tempdb.get("mute_" + member.id);

          if (dbData) { // Member is still muted
            let timeDiff = Math.floor(dbData.expireTime - Date.now() / 1000);
            if (timeDiff >= 60) { // Member is muted at least 1 more minute
              setTimeout(function() {
                member.roles.remove(muteRoleId);
              }, timeDiff * 1000);
              return;
            }
          }

          // Member is still muted for less than 1 minute, or not at all
          member.roles.remove(muteRoleId);
        });
      });

      guild.channels.cache.each(async function(channel) {
        await channel.createOverwrite(muteRoleId, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    });

    tempdb.disconnect();
  }
}