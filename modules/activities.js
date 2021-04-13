const activities = [
  "Lucade Realm",
  "Roblox",
  "Infinite Obby",
  "with axolotls",
  "some game"
];

function changeActivity() {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    global.client.user.setActivity(activity);
    console.log("Changed activity: " + activity);
  }

module.exports = function() {
  // Fires every 120 seconds = every 2 minutes
  setInterval(changeActivity, 120000);
  changeActivity();
}