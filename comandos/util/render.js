const Discord = require('discord.js');
module.exports = {
  name: 'render',
  aliases: ['renderizar'],
  category: 'util',
  run: async (client, message, args, prefix) => {

    if (!message.channel.nsfw) return message.respond('Esse comando só pode ser executado em canais nsfw!')

    if (!args[0]) return message.respond('Insira um nome de url ou um url');
    let toRender = args[0].replace('https://', '');

    const info = new Discord.MessageEmbed()
    .setTitle('Renderizar site')
    .setImage(`https://image.thum.io/get/auth/53390-rendersite/https://${toRender}`)
    .setFooter(`| Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
    message.respond(info)
  }
}