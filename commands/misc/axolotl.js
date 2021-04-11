const fetch = require("node-fetch");

let images;

fetch("https://raw.githubusercontent.com/AceKiron/public_data/main/axolotl_pictures.txt").then(res => res.text()).then(function(resText) {
  images = resText.split("\n");
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const color = require("../../modules/color.js");
const embed = require("../../modules/embed.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["axolotl", "lotl"],
    executor: async function(message, args) {
      message.reply(embed({
        title: "A cute axolotl picture for " + message.member.displayName,
        color: color.hslToHex(325, getRandomInt(60, 100), getRandomInt(65, 95)),
        image: images[getRandomInt(0, images.length - 1)]
      }));
    }
  });
}