const Discord = require('discord.js');
const moment = require('moment-timezone');
module.exports = {
  name: 'petinfo',
  description: 'mostra as informações do pet do usuário mencionado',
  aliases: ['infopet', 'pet-info', 'info-pet'],
  category: 'economy',
  run: async (client, message, args, prefix) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (user) {
      let pet = await client.db.ref(`Users/${user.id}/pet`).once('value').then(r => r.val());
      if (pet === null) return message.respond(`Este usuário não tem um pet!`);
      let petName = await client.db.ref(`Users/${user.id}/pet/name`).once('value').then(r => r.val());
      let petHearts = await client.db.ref(`Users/${user.id}/pet/hearts`).once('value').then(r => r.val());
      let petFrame = await client.db.ref(`Users/${user.id}/pet/frame`).once('value').then(r => r.val());
      let frameEmoji;
      if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f431.png') frameEmoji = '🐱';
    if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f436.png') frameEmoji = '🐶';
    if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f99c.png') frameEmoji = '🦜';
    if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f422.png') frameEmoji = '🐢';
      let petBorn = await client.db.ref(`Users/${user.id}/pet/createdAt`).once('value').then(r => r.val());
      let petHearts2 = [];
      for (var i = 0; i < petHearts; i++) {
        petHearts2.push('❤️ ')
      }
      const petInfo = new Discord.MessageEmbed()
      .setTitle(`${frameEmoji} | Pet-Info de ${petName}`)
      .setThumbnail(petFrame)
      .addFields([
        {
          name: 'Corações(' + petHearts + '):',
          value: petHearts2.join(''),
          inline: true
        },
        {
          name: 'Nome:',
          value: petName,
          inline: true
        },
        {
          name: 'Nasceu:',
          value: `${moment(petBorn).tz('America/Sao_Paulo').format('lll')}`,
          inline: true
        }
      ])
      message.respond(petInfo)
    } else if (!user) {
      user = message.author;
      let pet = await client.db.ref(`Users/${user.id}/pet`).once('value').then(r => r.val());
      if (pet === null) return message.respond(`Este usuário não tem um pet!`);
      let petName = await client.db.ref(`Users/${user.id}/pet/name`).once('value').then(r => r.val());
      let petHearts = await client.db.ref(`Users/${user.id}/pet/hearts`).once('value').then(r => r.val());
      let petFrame = await client.db.ref(`Users/${user.id}/pet/frame`).once('value').then(r => r.val());
      let frameEmoji;
      if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f431.png') frameEmoji = '🐱';
    if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f436.png') frameEmoji = '🐶';
    if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f99c.png') frameEmoji = '🦜';
    if (petFrame === 'https://twemoji.maxcdn.com/2/72x72/1f422.png') frameEmoji = '🐢';
      let petBorn = await client.db.ref(`Users/${user.id}/pet/createdAt`).once('value').then(r => r.val());
      let petHearts2 = [];
      for (var i = 0; i < petHearts; i++) {
        petHearts2.push('❤️ ')
      }
      const petInfo = new Discord.MessageEmbed()
      .setTitle(`${frameEmoji} | Pet-Info de ${petName}`)
      .setThumbnail(petFrame)
      .addFields([
        {
          name: 'Corações(' + petHearts + ')',
          value: petHearts2.join(''),
          inline: true
        },
        {
          name: 'Nome:',
          value: petName,
          inline: true
        },
        {
          name: 'Nasceu:',
          value: `${moment(petBorn).tz('America/Sao_Paulo').format('lll')}`,
          inline: true
        }
      ])
      message.respond(petInfo)
    }
  }
}