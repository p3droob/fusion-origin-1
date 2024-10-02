const Discord = require('discord.js');

module.exports = {
  name: 'invite',
  aliases: ["invite", "convidar"],
  description: 'me convide',
  category: 'info',
  run: async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setTitle(`Obrigado por me adicionar`)
.setColor('#ff0000')
.setDescription(`${message.author} você pode me adicionar [clicando aqui!](https://discord.com/oauth2/authorize?client_id=812272055457546271&scope=bot&permissions=2080374975)`)
.setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
message.respond(embed)
  }
}