const bod = require("../discord-bod");

module.exports = bod.Feature({
    name: "Nitro Boost",

    async onMemberUpdate(client, oldMember, newMember) {
        if (!oldMember.premiumSinceTimestamp && newMember.premiumSinceTimestamp) {
            newMember.roles.add("831462382001848321"); // @Booster
        }
    }
});