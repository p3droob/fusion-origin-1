const Discord = require('discord.js');
const moment = require('moment-timezone');
module.exports = {
  name: 'status',
  description: 'Mostra o status de alguém',
  category: 'info',
  run: async (client, message, args) => {
    let user = await message.mentions.users.first() || await client.users.cache.get(args[0]) || message.author;
    let status;
    if (user.presence.status === "dnd") status = client.controllers.emojis.status.dnd;
    if (user.presence.status === "idle") status = client.controllers.emojis.status.idle;
    if (user.presence.status === "offline") status = client.controllers.emojis.status.offline;
    if (user.presence.status === "online") status = client.controllers.emojis.status.online;
    if (user.presence.activities[0]) {
    let emoji;
    if (user.presence.activities[0].emoji === null) emoji = 'Nenhum';
    if (user.presence.activities[0].emoji.animated) emoji = `<a:${user.presence.activities[0].emoji.name}:${user.presence.activities[0].emoji.id}>`;
    if (!user.presence.activities[0].emoji.animated) emoji = `<:${user.presence.activities[0].emoji.name}:${user.presence.activities[0].emoji.id}>`;

    const infoAll = new Discord.MessageEmbed()
    .setTitle('Status de ' + user.tag)
    .addFields([
      {
        name: 'Status:',
        value: status,
        inline: true
      },
      {
        name: 'Tipo de status',
        value: user.presence.activities[0].type,
        inline: true
      },
      {
        name: 'Data de definição:',
        value: `${moment(user.presence.activities[0].createdTimestamp).tz('America/Sao_Paulo').format('L')} - ${moment(user.presence.activities[0].createdTimestamp).tz('America/Sao_Paulo').format('LTS')}`,
        inline: true
      },
      {
        name: 'Mensagem',
        value: user.presence.activities[0].state || 'nenhuma',
        inline: true
      },
      {
        name: 'Emoji',
        value: emoji,
        inline: true
      }
    ])
    message.respond(infoAll)
    } else if (!user.presence.activities[0]) {
      const infoS = new Discord.MessageEmbed()
    .setTitle('Status de ' + user.tag)
    .addFields([
      {
        name: 'Status:',
        value: status,
        inline: true
      }
    ])
    message.respond(infoS)
    }
  }
}