const embed = require("../../modules/embed.js");

const config = require("../../config.json");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["help", "?", "cmds"],
    description: "Shows a list of all commands.",
    minArgs: 0,
    maxArgs: 1,
    executor: async function(message, args) {
      let data;

      if (args.length == 0) {
        // 0 args = $help, show all categories
        data = {
          title: "Help | All commands",
          color: "#6995db",
          fields: []
        };

        for (const category of global.client.categories) {
          data.fields.push([category[0], "`" + category[1].join("`, `") + "`"]);
        }
      } else {
        // 1 arg = $help [alias], show information about command
        data = {
          title: "Help | " + config.prefix + args[0],
          color: "#6995db"
        };

        for (const command of global.client.commands) {
          if (command.aliases.includes(args[0])) {
            data.fields = [
              ["Description", command.description],
              ["Aliases", "`" + command.aliases.join("`, `") + "`"],
              ["Argument range:", command.minArgs + ", " + command.maxArgs]
            ]
          }
        }
      }

      message.reply(embed(data));
    }
  });
}