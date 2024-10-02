const ms = require('parse-ms');
module.exports = {
  name: 'minerar',
  aliases: ['mine', 'mineração'],
  category: 'economy',
  run: async (client, message, args, prefix) => {
    const getAuthor = await client.db.ref(`Users/${message.author.id}`).once('value').then(r => r.val());
    let getOres = await client.db.ref(`Users/${message.author.id}/ores`).once('value').then(r => r.val()) || {};
    const start = new client.embed()
    .setTitle(`Mina ${getAuthor.mine || 1}`)
    .setThumbnail('https://cdn.discordapp.com/attachments/812266828196741124/890730861325086760/unknown.png')
    .setDescription(`**Minérios**\n\n<:gold_mine:890737496311332955> Ouros: ${getOres.golds || 0}\n<:diamond_mine:890737037144117288> Diamantes: ${getOres.diamonds || 0}\n<:titanium_mine:890923918167265300> Titânios: ${getOres.titaniums || 0}\n🛡️ Fibras de carbono: ${getOres.fibers || 0}`)
    message.respond(start).then(async msg => {
      msg.react(['<:pickaxe:890913804874055721>', '💰']);

      let filter = (reaction, user) => user.id === message.author.id;

      msg.createReactionCollector(filter, { max: 1, time: 90000 }).on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '💰') {
          const author2 = await client.db.ref(`Users/${message.author.id}`).once('value').then(r => r.val());
          let ores = await client.db.ref(`Users/${message.author.id}/ores`).once('value').then(r => r.val());
          if (ores === null) return msg.edit('Você não possui minérios!')
          const sell = {};
          Object.keys(ores).forEach(ore => {
            client.db.ref(`Users/${message.author.id}/ores/${ore}`).remove();
            switch(ore) {
              case 'golds':
              sell.golds = ores[ore] * 42;
              break;
              case 'diamonds':
              sell.diamonds = ores[ore] * 103;
              break;
              case 'titaniums':
              sell.titaniums = ores[ore] * 247;
              break;
              case 'fibers':
              sell.fibers = ores[ore] * 459;
              break;
            }
          })
          let toAdd = 0;
          Object.keys(sell).forEach(b => {
             toAdd = Number(toAdd) + Number(sell[b] || 0);
          });
          new client.transactions(client, toAdd, true, message.author).mine(author2.mine || 1)
          client.db.ref(`Users/${message.author.id}`).update({
            flocos: Number(author2.flocos || 0) + Number(toAdd)
          })
          msg.edit(new client.embed().setTitle('Vendido!').setDescription(`**Valores:**\n\nOuro: \`42\`\nDiamante: \`103\`\nTitânio: \`247\`\nFibra de Carbono: \`459\`\n\n> **Vendido:**\n\n<:gold_mine:890737496311332955> Ouro: ${sell.golds}\n<:diamond_mine:890737037144117288> Diamante: ${sell.diamonds}\n<:titanium_mine:890923918167265300> Titânio: ${sell.titaniums}\n🛡️ Fibra de Carbono: ${sell.fibers}\n\n**Total: ${toAdd}**`))
        };
        if (reaction.emoji.name === 'pickaxe') {
          const timeout = 1800000;
          const daily = await client.db.ref(`Users/${message.author.id}/cooldown/mine`).once('value').then(r => r.val())
          if (daily !== null && timeout - (Date.now() - daily) > 0) {
          const time = ms(timeout - (Date.now() - daily));

         return msg.edit(`Você já minerou recentemente! Tente de novo em **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        };
        client.db.ref(`Users/${message.author.id}/cooldown/mine`).set(Date.now())
        let pickaxe = getAuthor.pickaxe || {};
        const convM = {
          1: '`Ferro`',
          2: '`Ouro`',
          3: '`Diamante`',
          4: '`Titânio`',
          5: '`Fibra de carbono`'
        };

        let type = convM[pickaxe.type ||1];
        let porcentagem = (getAuthor.mine || 1) / 20;
        const random = {};
        let altered = {
          gold: Math.round(Math.random() * 8),
          diamond: Math.round(Math.random() * 6),
          titanium: Math.round(Math.random() * 4),
          fiber: Math.round(Math.random() * 2)
        }
        random.gold = altered.gold;
        random.diamond = altered.diamond;
        random.titanium = altered.titanium;
        random.fiber = altered.fiber;
        Object.keys(random).forEach(r => {
          for(let i = 0;i < (getAuthor.mine || 1);i++) {
            random[r] += Math.ceil(Number(altered[r]) / Number(20))
          }
        })
        client.db.ref(`Users/${message.author.id}/ores`).update({
            diamonds: Number(random.diamond || 0) + Number(getOres.diamonds || 0),
            golds: Number(random.gold || 0) + Number(getOres.golds || 0),
            titaniums: Number(random.titanium || 0) + Number(getOres.titaniums || 0),
            fibers: Number(random.fiber || 0) + Number(getOres.fibers || 0)
        });
        client.db.ref(`Users/${message.author.id}/mineredTimes`).set(Number(getAuthor.mineredTimes || 0) + Number(1));
        if ((Number(getAuthor.mineredTimes) + 1) / 8 >= (getAuthor.mine || 1)) {
          client.db.ref(`Users/${message.author.id}/mine`).set(Number(getAuthor.mine || 1)+1)
          message.reply(`Parabéns você subiu de mina, atual: \`${Math.floor((Number(getAuthor.mineredTimes || 0) + Number(1)) / 8)}\``)
        }
        const mined = new client.embed()
        .setTitle('Mineração')
        .setDescription(`Veja abaixo oque você conseguiu na mina ${getAuthor.mine || 1} com uma picareta de ${type}:\n\n<:gold_mine:890737496311332955> ${random.gold} ouro(s)\n<:diamond_mine:890737037144117288> ${random.diamond} diamante(s)\n<:titanium_mine:890923918167265300> ${random.titanium} titânio(s)\n🛡️ ${random.fiber} fibras de carbono`)
        .setFooter(`A cada 8 minerações você avança um nível na mina e pode pegar mais minérios!`);
        await msg.reactions.cache.get('890913804874055721').remove().catch(e => e)
        msg.edit(mined)
        }
      })
    })
  }
}