const Discord = require("discord.js")
const ms = require("ms");
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'coinflip',
  aliases: ["caracoroa"],
  usage: "coinflip cara/coroa",
  description: "escolha cara ou coroa",
  category: 'fun',
  run: async (client, message, args) => {
  var array1 = ["cara", "coroa"];

  var rand = Math.floor(Math.random() * array1.length);

  if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
    message.respond("insira **cara** ou **coroa** na frente do comando.");
  } 
else if (args[0].toLowerCase() == array1[rand]) {
    message.respond("Deu **" + array1[rand] + "**, você ganhou dessa vez!");
  } 
else if (args[0].toLowerCase() != array1[rand]) {
    message.respond("Deu **" + array1[rand] + "**, você perdeu dessa vez!"
    );
  }
}
}