replies = [
  "absolutely%{PossibleNot}!",
  "perhaps%{PossibleNot}.",
  "if you%{PossibleDont} think so.",
  "%{TrueFalse}, I think.",
  "what kind of question is that?",
  "I don't feel like answering that.",
  "I don't feel like answering that a%{RandNum}th time!",
  "can't you answer this yourself?",
  "at least I%{PossibleDont} think it's%{PossibleNot}%{TrueFalse}.",
  "is%{RandNum} the%{PossibleNot} right answer?",
  "E!",
  "that is%{PossibleNot} to be answered in%{RandNum} hours.",
  "you should already know the answer is%{RandNum}.",
  "maybe%{PossibleNot}.",
  "I%{PossibleDont} think it's%{PossibleNot}%{TrueFalse}."
];

function chance_50_50() {
  return Math.round(Math.random()) == 1;
}

function formatReply(message) {
  return message
    .replace("%{RandNum}", " " + Math.floor(Math.random() * 1000000 - 500000))
    .replace("%{TrueFalse}", chance_50_50() ? " true" : " false")
    .replace("%{PossibleNot}", chance_50_50() ? " not" : "")
    .replace("%{PossibleDont}", chance_50_50() ? " don't" : "")
  ;
}

module.exports = function() {
  return require("../../command.js")({
    aliases: ["ask"],
    description: "Ask a question and get a random answer",
    minArgs: 0,
    maxArgs: -1,
    executor: async function(message, args) {
      message.channel.send(
        "<@" +
        message.author.id +
        ">, " +
        formatReply(
          replies[
            Math.floor(
              Math.random() * replies.length
            )
          ]
        )
      );
    }
  });
}