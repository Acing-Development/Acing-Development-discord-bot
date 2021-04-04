module.exports = function(channelId) {
  global.client.on("guildMemberAdd", function(member) {
    const message = "Please welcome <@" + member.id + "> to the server!";
    const channel = member.guild.channels.cache.get(channelId);

    channel.send(message);
  });
}