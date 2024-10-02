const Discord = require('discord.js');
const searchNpmRegistry = require('search-npm-registry');
const moment = require('moment-timezone');
module.exports = {
  name: 'npm',
  aliases: ['search-npm', 'npm-search'],
  usage: 'npm <livraria>',
  description: 'mostra as informações de uma livraria',
  category: 'util',
  run: async (client, message, args, prefix) => {
    try {
    const search = args.join(' ');
    let name = 'npm';
    let command = client.commands.get('npm');
    let aliases = command.aliases;
    let avatar = message.author.displayAvatarURL();
    if (!search) return message.respond({embed: {
      title: `${prefix}npm`,
      description: `🤔 | Como usar?\n\n**📕 | Exemplos:\n\n${prefix}npm discord.js**\n\nAliases: ${aliases}`,
      thumbnail: message.author.displayAvatarURL({format: 'gif'})
    }})

    const [npm] = await searchNpmRegistry()
      .text(search)
      .size(5)
      .search().catch(e => message.respond(e))
    const embed = new Discord.MessageEmbed()
      .setThumbnail('https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.png')
      .setTitle(npm.name)
      .setColor(client.colors.embedFields)
      .addFields([
        {
          name: `Site oficial da livraria: `,
          value: `[${npm.name}](https://www.npmjs.com/package/${search.replace(' ', '')})`
        },
        {
          name: 'Versão:',
          value: '`' + npm.version + '`'
        },
        {
          name: 'Criado em:',
          value: moment(npm.date).tz('America/Sao_Paulo').format('L')
        },
        {
          name: 'Publicado por:',
          value: npm.publisher.username
        }
      ])

    message.respond(embed)
    } catch (e) {
      message.channel.send('Módulo não encontrado.')
    }
  }
}