const Discord = require('discord.js');
const db = require('quick.db');
const Topgg = require(`@top-gg/sdk`);
const moment = require('moment-timezone');
module.exports ={
  name: 'topgg',
  aliases: ['topgginfo'],
  description: 'mostra as suas informações no Top.gg',
  usage: 'topgg <menção>',
  category: 'info',
  run: async (client, message, args, prefix) => {
    
const mySecret = process.env['TOPGG']

    const api = new Topgg.Api(mySecret)
      let user = message.mentions.users.first() || client.users.cache.get(args[0]);
      if (!args[0]) {
        let noargs = new Discord.MessageEmbed()
        .setTitle(client.controllers.emojis.list + ' Falta de argumentos')
        .setColor('#ff0000')
        .addFields(
          [
            {
              name: 'Pesquisar bot',
              value: `${prefix}topgg <@bot>`
            },
            {
              name: 'Pesquisar user',
              value: `${prefix}topgg <@user>`
            },
            {
              name: 'Veja quem votou em mim',
              value: `${prefix}topgg votos`
            }
          ]
        )
        message.respond(noargs)
      } else {
        if (args[0] === 'votos') {
          try {
            let apivotos = await api.getVotes()
            let embedvotos = new Discord.MessageEmbed()
            .setTitle(`${client.controllers.emojis.dbl} Pessoas que votaram em mim:`)
            .setImage('https://top.gg/api/widget/812272055457546271.svg')
            .addFields(
              [
                {
                  name: '[Vote você também](https://top.gg/bot/812272055457546271/vote)',
                  value: `\n${apivotos.map(a => `${a.username}\`(${a.id})\``).join('\n').length > 1024 ? apivotos.substring(0, 1020) + '...' : apivotos.map(a => `${a.username}\`(${a.id})\``).join('\n')}`
                }
              ]
            )
            message.respond(embedvotos)
          } catch (e) {
            console.log(e)
          }
        } else {
          if (!user) return message.respond('Usuário inválido!')
      if (user.bot) {
        try {
      let apibot = await api.getBot(`${user.id}`)
      moment.locale('pt-br')
      const embedbot = new Discord.MessageEmbed()
    .setTitle(`Top.gg de ${user.username}`)
    .setThumbnail(user.displayAvatarURL({format: 'gif'}))
    .addFields([
      {
        name: 'Dono',
        value: `\`${apibot.owners}\``
      },
      {
        name: 'Nome',
        value: `[${apibot.username}](${apibot.invite})`
      },
      {
        name: 'Entrou no Top.gg em:',
        value: `\`${moment(apibot.date).tz('America/Sao_Paulo').format('L')}\``
      },
      {
        name: 'Prefixo',
        value: `\`${apibot.prefix}\``
      },
      {
        name: 'Descrição pequena',
        value: `\`${apibot.shortdesc}\``
      },
      {
        name: 'Descrição longa',
        value: `\`${apibot.longdesc.length > 1024 ? apibot.longdesc.substring(0, 1020) + '...' : apibot.longdesc}`
      },
      {
        name: 'Website',
        value: `${apibot.website ? `[clique aqui](${apibot.website})` : 'Nenhum'}`
      },
      {
        name: 'Servidor de suporte',
        value: `${apibot.support ? `\`discord.gg/${apibot.support}\`` : 'Nenhum'}`
      },
      {
        name: 'Github',
        value: `${apibot.github ? `[clique aqui](${apibot.github})` : 'Nenhum'}`
      },
      {
        name: 'Votos',
        value: `Mensais: \`${apibot.monthlyPoints}\`\nTotais: \`${apibot.points}\``
      },
      {
        name: 'Tags',
        value: `\`${apibot.tags}\``
      }
      ]
    )
    message.respond(embedbot)
        } catch (e) {
          message.channel.send(`Ocorreu o erro: \`\`` + e + '``')
          console.log(e)
        }
    
      } else {
    
    
    let apiuser = await api.getUser(`${user.id}`)
    let infouser = [
    `Administrador: ${apiuser.admin}`.replace('true', 'sim').replace('false', 'não'),//bot1
    `Moderador: ${apiuser.mod}`.replace('true', 'sim').replace('false', 'não'),
    `Desenvolvedor certificado: ${apiuser.certifiedDev}`.replace('true', 'sim').replace('false', 'não'),`Suporte: ${apiuser.supporter}`.replace('true', 'sim').replace('false', 'não')
    ]
    const embeduser1 = new Discord.MessageEmbed()
    .setThumbnail(user.displayAvatarURL({format: 'gif'}))
    .setTitle(`Top.gg de ${user.username}`)
    .addFields(
      [
        {
          name: 'Estatísticas',
          value: infouser.join('\n')
        }
      ]
    )
    let embeduser = embeduser1
    message.respond(embeduser)
    
    }
        }
      }
}
}