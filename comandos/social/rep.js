module.exports = {
  name: 'rep',
  aliases: ['reputar'],
  category: 'social',
  run: async (client, message, args) => {
    const db = require('quick.db');
    const ms = require('parse-ms');

    const user = message.mentions.members.first() || client.users.cache.get(args[0])

    if (user == message.author.id) return message.respond('você não pode dar reputação para você mesmo!');

    if (!user) return message.respond('mencione alguém para dar reputação!');

    const timeout = 3600000;
    const amount = 1;
    const rep = await client.db.ref(`Users/${user.id}/reps`).once('value').then(r => r.val()) || '0';
    const out = db.fetch(`timeout_${message.author.id}`);
    if (rep !== null && timeout - (Date.now() - out) > 0) {
      const time = ms(timeout - (Date.now() - out));

      message.respond(`Você precisa esperar ** ${time.minutes}minutos e ${time.seconds}segundos** para dar outra reputação`);
    } else {
          message.respond(`${message.author} Você deseja mesmo dar uma reputação para ${user}?`).then((sentMessage) => {
      sentMessage.react('✅');
      const filter = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === message.author.id;
      const Collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000 });

      sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })

      Collector.on('collect', async () => {
        let repsend1 = await client.db.ref(`Users/${messge.author.id}/repsend`).once('value').then(r => r.val()) || 0;

        client.db.ref(`Users/${user.id}`).update({
          reps: Number(rep) + Number(amount)
        });
        client.db.ref(`Users/${message.author.id}`).update({
          repsend: Number(repsend1) + Number(amount)
        })
        db.set(`timeout_${message.author.id}`, Date.now());
        const noworep = await client.db.ref(`Users/${user.id}/reps`).once('value').then(r => r.val()) || '0';
        let repsend = await client.db.ref(`Users/${messge.author.id}/repsend`).once('value').then(r => r.val()) || 0;
        message.respond(`${message.author} deu ${amount} reputação para ${user}! Até agora você enviou ${repsend} reputações`);
      })

    });
    }
  },
};