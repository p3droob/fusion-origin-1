module.exports = {
  name: 'votos',
  aliases: ['votes'],
  description: 'Veja quantas vezes alguem votou em mim no topgg',
  usage: 'votos <@user>',
  category: 'economy',
  run: async (client, message, args, prefix) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    if (!user) return message.respond('Diga um usuário válido para ver seus votos!');
    if (user.bot) return message.respond('Bots não podem votar!')
    const toGet = await client.db.ref(`Users/${user.id}/votos`).once('value').then(r => r.val());
    if (!toGet) return message.respond('Esse usuário nunca votou em mim!')
    message.respond(`<@${user.id}> já votou ${toGet} vezes em mim! Vote você também e me ajude a crescer.`)
  }
}