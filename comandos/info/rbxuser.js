module.exports = {
  name: 'rbxuser',
  aliases: ['rbxuser', 'rbuser', 'robloxuser', 'robloxu', 'rbuser'],
  usage: 'rbxuser <nick do roblox>',
  description: 'mostra as informações de um usuário do roblox',
  category: 'info',
  run: async (client, message, args) => {
    const discord = require('discord.js');
    const roblox = require('noblox.js');
    const moment = require('moment');

    const username = args[0];
    if (!username) return message.reply('Especifique um usuário!');
    if (username) {
      roblox.getIdFromUsername(username).then((id) => {
        if (id) {
          roblox.getPlayerInfo(parseInt(id)).then((info) => {
            moment.locale('pt-br');
            const date = new Date(info.joinDate);
            const data = moment(date).format('LL');

            const embed = new discord.MessageEmbed()
              .setTitle(info.username)
              .setColor(client.colors.embedFields)
              .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)

              .addField('<:roblox_logo:871066240347676692> Username', `\`${info.username}\`` || 'Sem solução', true)
              .addField(':computer: User ID', id || 'Sem solução', true)
              .addField(':blue_book: Sobre mim', info.blurb || 'Nada', true)
              .addField(':star: Status', info.status || 'Nada', true)
              .addField(':date: Data de conta', `${info.age} Dias` || 'Sem solução', true)
              .addField(':calendar: Data de registro', `${data}` || 'Sem solução', true)
              .addField('User Link', `https://roblox.com/users/${id}/profile`, true);
            message.respond(embed);
          });
        }


      }).catch((err) => {
        message.respond('Ah! Eu não encontrei este usuário, ou talvez ele não exista'); // catching error
      });
    } else { message.respond('Por favor especifique um usuário válido'); }
  },
};