const muteRoleId = "826895434281910273";

const tempdb = require("../../tempdb.js");

function convertDurationToSeconds(duration) {
  const [hours, minutes, seconds] = duration.split(':');
  return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
};

async function getUserFromMention(guild, mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

    return await guild.members.fetch(mention);
	}
}

function mute(target, time) {
  target.roles.add(muteRoleId);

  tempdb.connect();
  tempdb.set("mute_" + target.id, true, time);
  tempdb.disconnect();

  setTimeout(function() {
    target.roles.remove(muteRoleId);
  }, time * 1000);
}

module.exports = function() {
  return require("../../command.js")({
    aliases: ["mute"],
    description: "Mutes a member",
    roles_required: ["Admin"],
    minArgs: 2,
    maxArgs: 2,
    executor: async function(message, args) {
      const target = await getUserFromMention(message.guild, args[0]);
      const time = convertDurationToSeconds(args[1]);

      if (time != NaN) {
        if (target) {
          mute(target, time);
        }
      } else {
        message.reply("Please specify a valid time using the HH:MM:SS format.");
      }
    }
  });
}