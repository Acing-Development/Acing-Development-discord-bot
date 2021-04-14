const fetch = require("node-fetch");

let images;
let footer;

function getPercentageChance(images) {
  const freq = 1 / images.length;
  return Math.ceil(freq * 1000) / 10;
}

fetch("https://raw.githubusercontent.com/AceKiron/public_data/main/axolotl_pictures.txt").then(res => res.text()).then(function(resText) {
  images = resText.trim().split("\n");
  footer = "This specific image had a " + getPercentageChance(images) + "% of being selected.";
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const color = require("../../modules/color.js");
const embed = require("../../modules/embed.js");

module.exports = function() {
  return require("../../command.js")({
    aliases: ["axolotl", "lotl"],
    description: "Shows you a cute picture of an axolotl.",
    minArgs: 0,
    maxArgs: 0,
    executor: async function(message, args) {
      message.reply(embed({
        title: "A cute axolotl picture for " + message.member.displayName,
        color: color.hslToHex(325, getRandomInt(60, 100), getRandomInt(65, 95)),
        image: images[getRandomInt(0, images.length - 1)],
        footer: footer
      }));
    }
  });
}