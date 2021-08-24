const bod = require("../discord-bod");

const activities = [
  "GameMaker Studio",
  "GameMaker Studio 2",
  "Unity",
  "Godot",
  "Unreal Engine 4",
  "Construct",
  "Pico 8",
  "Monogame"
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