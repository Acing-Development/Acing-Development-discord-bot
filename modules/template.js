const events = require("events");
const emitter = new events.EventEmitter();

emitter.on("ready", function() {});
emitter.on("message", function(message) {});

module.exports = emitter;