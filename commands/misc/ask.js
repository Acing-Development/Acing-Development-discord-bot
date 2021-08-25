const bod = require("../../discord-bod");
const utils = require("../../utils.js");

const replies = [
    "absolutely%{PossibleNot}!",
    "perhaps%{PossibleNot}.",
    "if you%{PossibleDont} think so.",
    "%{TrueFalse}, I think.",
    "what kind of question is that?",
    "I don't feel like answering that.",
    "I don't feel like answering that a%{RandNum}th time!",
    "can't you answer this yourself?",
    "at least I%{PossibleDont} think it's%{PossibleNot}%{TrueFalse}.",
    "is%{RandNum}%{PossibleNot} the right answer?",
    "E!",
    "that is%{PossibleNot} to be answered in%{RandNum} hours.",
    "you should already know the answer is%{RandNum}.",
    "maybe%{PossibleNot}.",
    "I%{PossibleDont} think it's%{PossibleNot}%{TrueFalse}.",
    "I will%{PossibleNot} floccinaucinihilipilificate that question.",
    "%{PossibleNot}yes.",
    "%{PossibleNot}no.",
    "%{PossibleNot}dihydrogen monoxide.",
    "I%{PossibleDont} know.",
    "%{Question}",
    "how could I%{PossibleNot} know that?"
];

function formatReply(message, question) {
    message = message
        .replace("%{RandNum}", " " + Math.floor(Math.random() * 1000000 - 500000))
        .replace("%{TrueFalse}", utils.chance_50_50() ? " true " : " false ")
        .replace("%{PossibleNot}", utils.chance_50_50() ? " not " : "")
        .replace("%{PossibleDont}", utils.chance_50_50() ? " don't " : "")
        .replace("%{Question}", question)
    ;

    while (message.includes("  ")) {
      message = message.replace("  ", " ");
    }
    
    return message;
}

module.exports = bod.Command({
  aliases: ["ask"],
	name: "ask",
  minArgs: 1,
	syntax: "ask [question]",
	description: "Ask a question and get a random answer.",

  async run(client, message, args) {
    message.channel.send("<@" + message.author.id + ">, " + formatReply(replies[Math.floor(Math.random() * replies.length)], args.join(" ")));
  }
});