module.exports = {
  name: 'badge',
  description: 'Escolha a badge para seu servidor',
  run: async (client, message, args, prefix) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.respond('Você necessita da permissão de administrador para executar este comando!');
    let db = await client.db.ref(`Guilds/${message.guild.id}/premium`).once('value');
    db = db.val();
    if (!db) return message.respond('Esse servidor não possui uma key portanto, não poderá ter uma badge.')
    const emoji = message.emojis.first();
    if (!emoji) return message.respond('Mencione um emoji válido para ser a badge do servidor!');
    if (!message.guild.emojis.cache.get(emoji.id)) return message.respond('Esse emoji não foi encontrado neste servidor!');
    let mencao;
    if (emoji.animated) mencao = `<a:${emoji.name}:${emoji.id}>`;
    if (!emoji.animated) mencao = `<:${emoji.name}:${emoji.id}>`
    client.db.ref(`Guilds/${message.guild.id}/badge`).set(mencao);
    (message.guild.members.cache.filter(m1 => !m1.user.bot).map(m => m.user.id)).forEach(async (mem) => {
      let memB = await client.db.ref(`Users/${mem}/badges`).once('value').then(r => r.val()) || [];
      if (memB.indexOf(mencao) !== -1) return;
      memB.push(mencao);
      client.db.ref(`Users/${mem}/badges`).set(memB)
    })
    const correct = new client.embed()
    .setTitle('Nova badge')
    .setThumbnail(emoji.url);
    message.respond(correct);
  }
}