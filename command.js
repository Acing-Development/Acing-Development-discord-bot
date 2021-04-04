async function executorWrapper(command, message, args) {
  for (const permission of command.permissions_required) {
    if (!message.member.hasPermission(permission)) {
      message.reply("You do not have permission to use this command.");
      return;
    }
  }

  for (const role of command.roles_required) {
    if (!message.member.roles.cache.find(function(r) {
      return r.name == role;
    })) {
      message.reply("You do not have the required role(s) to use this command.");
      return;
    }
  }

  if (args.length < command.minArgs) {
    message.reply("This command does not have enough arguments.");
    return;
  } else if (args.length > command.maxArgs && command.maxArgs != -1) {
    message.reply("This command does has too many arguments.");
    return;
  }

  await command.executor(message, args);
}

module.exports = function(overwrittenData) {
  let data = Object.assign({}, require("./templates/command.js"));

  for (let key in overwrittenData) {
    data[key] = overwrittenData[key];
  }

  data.execute = executorWrapper;

  return data;
}