module.exports = {
  name: 'configuser',
  run: async (client, message, args) => {
    if (message.author.id !== '753252894974804068') return;
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) return message.respond('|| ||').then(msg => msg.delete({ timeout: 10000 }));
    const getUser = await client.db.ref(`Users/${user.id}`).once('value').then(r => r.val());
    const dbG = await client.db.ref(`Guilds`).once('value').then(r => r.val());
    const embed = new client.embed()
    .setTitle('configurar usuário')
    .addFields([
      {
        name: 'Vip (add/remove)',
        value: '<a:coroa_Fusion:816983856141172766>'
      }
    ]);
    message.respond(embed).then(mgs => {
      let filter = (reaction, user) => user.id === message.author.id;
      msg.createReactionCollector(filter, { time: 90000 }).on('collect', async (reaction, user) => {
        switch (reaction.emoji.name) {
          case 'coroa_Fusion':
          if (getUser.vip) {
            client.db.ref(`Users/${user.id}/vip`).remove()
            client.db.ref(`Users/${user.id}/keys`).remove();
            Object.keys(dbG).forEach(g => {
              if (!dbG[g].premium) return;
              if (dbG[g].key !== user.id) return;
              client.db.ref(`Guilds/${g}/premium`).remove();
              client.db.ref(`Guilds/${g}/key`).remove()
            })
            message.respond('Sucessfuly removed!')
          } else {
            client.db.ref(`Users/${user.id}/vip`).set(true)
            message.respond('Sucessifully added vip to ' + user + '!')
          }
          break;
        }
      })
    })
  }
}