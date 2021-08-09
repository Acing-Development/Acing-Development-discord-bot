const embed = require("../../modules/embed.js");
const githubApi = require("../../modules/github-api.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["user"],
    description: "Search a Github user.",
    minArgs: 1,
    maxArgs: -1,
    executor: async function(message, args) {
      const req = await githubApi.requestApi(githubApi.search_user, {
        query: args.join(" ")
      });

      if (req.message) {
        return message.reply(embed({
          title: "Github search",
          color: "#333333",
          fields: [
            ["An error occured", req.message]
          ]
        }));
      }

      const results = req.items;

      let fields = [];

      for (result of results) {
        fields.push([
          result.login,
          "<" + result.html_url + ">"
        ]);
      }

      message.reply(embed({
        title: "Github search",
        color: "#333333",
        fields: fields
      }));
    }
  });
}