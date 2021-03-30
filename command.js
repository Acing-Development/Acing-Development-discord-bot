const config = require("./config.json");

module.exports = function(client, aliases, callback) {
  // Ensure aliases variable is an array
  if (typeof aliases === "string") aliases = [aliases];

  client.on("message", function(message) {
    if (!message.content.startsWith(config.prefix)) return;

    const contentSplit = message.content.slice(config.prefix.length).split(" ");

    let command = contentSplit[0].toLowerCase();
    let args = contentSplit.slice(1);

    aliases.forEach(function(alias) {
      if (command == alias) {
        console.log("Running the command " + command);
        callback(message);
      }
    });
  });
}