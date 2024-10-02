const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'dbl',
  aliases: ["upvote", "vote", 'votar'],
  description: 'Vote em mim e me ajude a crescer',
  category: 'economy',
  run: async (client, message, args) => {

    const zuraaa = 'https://fusion-support.glitch.me/upvote';

    const embed = new Discord.MessageEmbed()
    .setColor(client.colors.embedFields)
    .setTitle(client.controllers.emojis.dbl + ' | Discord Bot List!')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${message.author} sabia que votando em mim você me ajuda a crescer?\nMuito obrigado mesmo!\n\nClique no link abaixo para votar em mim, assim você ganha 3000 flocos e a cada 40 votos você ganha 1 vip ilimitado e 4 keys!\n\n${zuraaa}\n\n`);
    
    message.respond(embed)

  }
}