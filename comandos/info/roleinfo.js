const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
moment.locale('pt-br')

module.exports = {
  name: 'roleinfo',
  usage: 'roleinfo <cargo>',
  description: 'mostra as informações de um cargo',
  category: 'info',
  run: async (client, message, args, prefix) => {
    let name = 'roleinfo'
    const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))
    const embed = new Discord.MessageEmbed()
    .setTitle("Roleinfo")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("🤔 |Como usar?\n\n 📕 | **Exemplos**")
      .addFields(
      { name: `🔹 Procurar cargo por menção`, value: `\`${prefix}roleinfo <cargo>\``},
      { name: `🔹 Procurar cargo por ID`, value: `\`${prefix}roleinfo 753252894974804068\``},
      { name: "Aliases:", value: `\`${comando.aliases|| 'Nenhum'}\``}
      ) 
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
    let role = message.mentions.roles.first()
    if (!role) {
      return message.respond(embed)
    } else {
      let createdate = moment.utc(role.createdAt).format("DD/MM/YYYY");
      let embed1 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(`Roleinfo de ${role.name}`)
      .addField(`Nome`, `\`${role.name}\``)
      .addField(`Menção`, `\`${role}\``)
      .addField(`Data de criação`, `**${createdate} (${moment(role.createdAt, "YYYYMMDD").fromNow()})**`)
      .addField(`Cor`, `${role.color}`)
      .addField(`Posição`, `${message.guild.roles.cache.size - role.position}`)
      .addField(`ID`, `${role.id}`)
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
      message.respond(embed1)
    }
  }
}