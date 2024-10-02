const Discord = require('discord.js');
module.exports = {
  name: 'uptime',
  description: 'mostra a quanto tempo eu estou acordado',
  category: 'info',
  run: async (client, message, args, prefix) => {

  
    const embed = new Discord.MessageEmbed()
    .setTitle('Estou acordado há:')
    .setColor(client.user.displayAvatarURL())
    .setDescription(client.msToTime(client.uptime))
    .setColor(client.colors.embedFields)
    message.respond(embed)

  }
}