const embed = require("../../modules/embed.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["help", "?", "cmds"],
    minArgs: 0,
    maxArgs: 0,
    executor: async function(message, args) {
      // 0 args = $help, show all categories
      if (args.length == 0) {
        let data = {
          title: "Help | All categories",
          color: "#6995db",
          fields: []
        };

        for (const category of global.client.categories) {
          data.fields.push([category[0], "`" + category[1].join("`, `") + "`"]);
        }

        message.reply(embed(data));
      }
    }
  });
}