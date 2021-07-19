module.exports = function(channelId) {
  const channel = global.client.channels.resolve(channelId);

  global.client.on("guildMemberAdd", async function(member) {
    channel.send("Welcome to our server, <@" + member.id + ">, please make sure to read through the <#827847386813956127> channel.");
  });

  global.client.on("guildMemberRemove", async function(member) {
    channel.send("We're sorry to see you leave, <@" + member.id + ">.");
  })
}