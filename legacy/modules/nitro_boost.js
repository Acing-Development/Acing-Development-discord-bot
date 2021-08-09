module.exports = function() {
  global.client.on("guildMemberUpdate", function(oldMember, newMember) {
    if (!oldMember.premiumSinceTimestamp && newMember.premiumSinceTimestamp) {
      newMember.roles.add("831462382001848321"); // @Booster
    }
  })
}