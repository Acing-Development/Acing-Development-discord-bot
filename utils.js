module.exports = {
	addReactions(message, reactions) {
		let reactionIndex = 0;

		let interval = setInterval(function() {
			if (reactionIndex >= reactions.length - 1) {
				clearInterval(interval);
			}

			message.react(reactions[reactionIndex]);

			reactionIndex += 1;
		}, 750);
	},

	chance_50_50() {
		return Math.round(Math.random()) == 1;
	}
}