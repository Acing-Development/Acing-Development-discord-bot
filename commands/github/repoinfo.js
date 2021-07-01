const embed = require("../../modules/embed.js");
const githubApi = require("../../modules/github-api.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["repoinfo"],
    description: "Get information about a Github repository.",
    minArgs: 1,
    maxArgs: 1,
    executor: async function(message, args) {
      const results = await githubApi.requestApi(githubApi.repo_info, {
        ownerAndRepo: args[0]
      });

      if (results.message) {
        return message.reply(embed({
          title: "Github search",
          color: "#333333",
          fields: [
            ["An error occured", results.message]
          ]
        }));
      }

      let fields = [
        ["Last commit", results.updated_at.split("T")[0]],
        ["Created at", results.created_at.split("T")[0]]
      ];

      if (results.description) {
        fields.push(["Description", results.description]);
      } if (results.license) {
        fields.push(["License", results.license.key]);
      }

      message.reply(embed({
        title: "Github search",
        color: "#333333",
        image: results.owner.avatar_url,
        fields: fields
      }));
    }
  });
}