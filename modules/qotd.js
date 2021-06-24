const questions = [
  "What is your favorite game?",
  "What do you think is essential when developing games?",
  "What game engine do you use?",
  "What platform(s) do you think should have more games?",
  "What's the latest news on your game?",
  "What game are you working on?",
  "Do you think indie or AAA games are better?",
  "Do you prefer working solo or in a team?",
  "The the most underrated game?",
  "What have you learned from developing the latest game you've made?",
  "What platform(s) will you release your game on?"
];

function newQuestion(channel) {
  return channel.send(questions[Math.floor(Math.random() * questions.length)]);
}

module.exports = async function() {
  const channel = global.client.channels.resolve("857564542598381589");

  const messages = await channel.messages.fetch({ limit: 1 });
  let lastMessage = messages.first();

  if (!lastMessage) {
    lastMessage = newQuestion(channel);
  }

  return;

  setTimeout(function() {
    function func() {
      newQuestion(channel);
    }

    func();
    setInterval(func, 1000 * 60 * 60 * 24);
  }, Date.now() - lastMessage.createdTimestamp + 1000 * 60 * 60 * 24);
}