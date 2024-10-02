const Discord = require('discord.js');
module.exports = {
  name: "ticket",
  aliases: ["abrirticket"],
  usage: 'ticket',
  description: 'cria uma mensagem que quem clicar na reação sera direcionado para um canal de suporte',
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('Eu preciso da permissão de administrador para realizar esse comando!')
  if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author}, Você não tem a permissão de **administrador**!`)
        return message.respond(embed);
      }
  const { guild } = message
  const icon = guild.iconURL()
  const comandos = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setThumbnail(icon)
  .setImage('https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif')
  .setTitle('🎟️ - Ticket')
  .setDescription(`Olá, clique no emoji para criar um ticket!`)
  .setTimestamp()
  .setFooter(`Apenas administradores podem enviar essa mensagem`, message.author.displayAvatarURL({Size: 32}))
  let msg = await message.respond(comandos);
  msg.react('🎟️')
  let matchID = await client.db.ref(`Guilds/${message.guild.id}/configs/ticket/messages`).once('value').then(r => r.val()) || [];
  client.db.ref(`Guilds/${message.guild.id}/configs/ticket`).update({
    messages: [msg.id, ...matchID]
  })
}
}