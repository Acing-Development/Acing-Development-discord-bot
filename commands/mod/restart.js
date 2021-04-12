module.exports = function() {
  return require("../../command.js")({
    aliases: ["restart", "rs"],
    minArgs: 0,
    maxArgs: 0,
    permissions_required: ["ADMINISTRATOR"],
    executor: async function(message, args) {
      process.exit(0);
    }
  });
}