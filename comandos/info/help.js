const Discord = require('discord.js');
const { readdirSync } = require('fs');
module.exports = {
  name: 'help',
  aliases: ["ajuda"],
  description: 'um comando de ajuda',
  category: 'info',
  run: async (client, message, args, prefix) => {
    const length = {
      configs: readdirSync('comandos/configs').length,//ok
      economy: readdirSync('comandos/economy').length,//ok
      fun: readdirSync('comandos/fun').length,//ok
      info: readdirSync('comandos/info').length,
      social: readdirSync('comandos/social').length,//ok
      mod: readdirSync('comandos/mod').length,//ok
      util: readdirSync('comandos/util').length,//ok
      games: readdirSync('comandos/games').length
    }
    const { commands } = message.client
function findCategory(category) {
  return commands
    .filter(command => command.category === category)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(cmd => `\`${cmd.name}\``)
    .join(', ')
}
  const icon = message.guild.iconURL()
  const comandos = new Discord.MessageEmbed()
  .setColor(client.colors.embedFields)
  .setThumbnail(icon)
  .setTitle('<a:coroa_Fusion:816983856141172766> - Ajuda - Fusion:')
  .addFields([
    {
      name: `**Configuração [${length.configs}]**`,
      value: findCategory('configs')
    },
    {
      name: `**Economia [${length.economy}]**`,
      value: findCategory('economy')
    },
    {
      name: `**Utilidades [${length.util}]**`,
      value: findCategory('util')
    },
    {
      name: `**Diversão [${length.fun}]**`,
      value: findCategory('fun')
    },
    {
      name: `**Games [${length.games}]**`,
      value: findCategory('games')
    },
    {
      name: `**Moderação [${length.mod}]**`,
      value: findCategory('mod')
    },
    {
      name: `**Social [${length.social}]**`,
      value: findCategory('social')
    },
    {
      name: `**Informação [${length.info}]**`,
      value: findCategory('info')
    }
  ])
  .setTimestamp()
  .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
 
  message.respond(comandos)
 
 
 
  }
 
}