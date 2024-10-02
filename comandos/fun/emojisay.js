const Discord = require('discord.js');

module.exports = {
  name: 'emojisay',
  aliases: ["sayemoji", "falaremoji", "emojify"],
  desription: 'transforma uma frase em emoji',
  usage: 'emojisay <texto>',
  category: 'fun',
  run: async (client, message, args) => {
    if (!args[0]) return message.respond('Insira um texto')
    const { convert } = require("discord-emoji-convert")
    message.respond(`resposta:\n${convert(args.join(' '))}`)
  }
}