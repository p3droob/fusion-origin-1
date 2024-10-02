const Discord = require('discord.js');
const ms = require('parse-ms');
module.exports = {
  name: 'brincar',
  description: 'brinque com seu pet, aumente os corações dele e seja mais forte nas rinhas!',
  category: 'economy',
  run: async (client, message, args, prefix) => {
    const matchPet = await client.db.ref(`Users/${message.author.id}/pet`).once('value').then(r => r.val());
    const matchHearts = await client.db.ref(`Users/${message.author.id}/pet/hearts`).once('value').then(r => r.val());
    const matchPlays = await client.db.ref(`Users/${message.author.id}/pet/plays`).once('value').then(r => r.val()) || 0;
    if (matchPet === null) return message.respond('Você não possui um pet!');
    const timeout = 43200000;//
    const daily = await client.db.ref(`Users/${message.author.id}/cooldown/play`).once('value').then(r => r.val());
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily));

      message.respond(`Você já brincou com seu pet hoje! Tente de novo em **${time.hours}hora(s) ${time.minutes}minuto(s) ${time.seconds}segundo(s)**`);
    } else {
      client.db.ref(`Users/${message.author.id}/pet`).update({
        plays: Number(matchPlays) + Number(1),
        hearts: Number(matchHearts) + Number(1)
      })
      client.db.ref(`Users/${message.author.id}/cooldown`).update({
        play: Date.now()
      })
      let hearts2 = await client.db.ref(`Users/${message.author.id}/pet/hearts`).once('value').then(r => r.val());
      message.respond('Parabéns, você brincou com o seu pet e agora ele possui ' + hearts2 + ' corações!')
    }
  }
}