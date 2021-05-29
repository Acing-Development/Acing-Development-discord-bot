module.exports = function(channelId) {
  global.client.on("guildMemberAdd", function(member) {
    const channel = member.guild.channels.cache.get(channelId);

    channel.send("Welcome to our server, <@" + member.id + ">, please make sure to read through the <#827847386813956127> channel.");
  });
}