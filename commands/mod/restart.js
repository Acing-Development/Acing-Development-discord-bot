module.exports = function() {
  return require("../../command.js")({
    aliases: ["restart", "rs"],
    description: "Restarts the bot.",
    minArgs: 0,
    maxArgs: 0,
    roles_required: ["Owner"],
    executor: async function(message, args) {
      process.exit(0);
    }
  });
}