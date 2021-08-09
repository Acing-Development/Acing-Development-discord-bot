const embed = require("../../modules/embed.js");
const githubApi = require("../../modules/github-api.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["repo"],
    description: "Search a Github repository.",
    minArgs: 1,
    maxArgs: -1,
    executor: async function(message, args) {
      const req = await githubApi.requestApi(githubApi.search_repo, {
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
          result.full_name,
          "<" + result.html_url + ">: \"" + result.description + "\""
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