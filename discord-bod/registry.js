const fs = require("fs");

module.exports = class {
	constructor() {
		this.commands = [];
		this.commandCategories = {};
		this.groups = [];
		this.features = [];
	}

	registerGroups(groups) {
		this.groups = groups;

		return this;
	}

	registerCommandsIn(path) {
		let newCommands = [];
		let newCommandCategories = {};

		fs.readdirSync(path).forEach(function(category) {
			const commandNames = [];

			fs.readdirSync(path + "/" + category).forEach(function(file) {
				commandNames.push(file.replace(".js", ""));

				const command = require(path + "/" + category + "/" + file);
				newCommands.push(command);
			});

			newCommandCategories[category] = commandNames;
		});

		this.commands = newCommands;
		this.commandCategories = newCommandCategories;

		return this;
	}

	registerFeaturesIn(path) {
		let newFeatures = [];

		fs.readdirSync(path).forEach(function(feature) {
			newFeatures.push(require(path + "/" + feature));
		});

		this.features = newFeatures;

		return this;
	}
}
