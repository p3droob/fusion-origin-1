const Discord = require('discord.js');
module.exports = {
  name: 'afk',
  category: 'util',
  run: async (client, message, args, prefix) => {
    let afk = await client.db.ref(`Users/${message.author.id}/afk`).once('value').then(r => r.val());
    const motivo1 = args.join(' ') || 'Sem motivo';
    message.respond('😴 | Você agora está AFK pelo motivo: `' + motivo1 + '`, para a sua conveniência o AFK será desativado quando você falar algo no chat.')
    client.db.ref(`Users/${message.author.id}/afk`).update({
      motivo: motivo1
    })
  }
}