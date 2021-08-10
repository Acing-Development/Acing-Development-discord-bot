const bod = require("../discord-bod");

const activities = [
    ""
];

function changeActivity(client) {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.discord_client.user.setActivity(activity);
    console.log("Changed activity: " + activity);
}

module.exports = bod.Feature({
    name: "Activities",

	async onReady(client) {
        // Fires every 120 seconds = every 2 minutes
        setInterval(function() {
            changeActivity(client);
        }, 120000);

        changeActivity(client);
    }
});