const muteRoleId = "826895434281910273";

const tempdb = require("../tempdb.js");

module.exports = function() {
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
  });

  tempdb.disconnect();
}