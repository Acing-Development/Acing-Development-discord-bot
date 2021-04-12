module.exports = function() {
  return require("../../command.js")({
    aliases: ["restart", "rs"],
    permissions_required: ["ADMINISTRATOR"],
    executor: async function(message, args) {
      process.exit(0);
    }
  });
}