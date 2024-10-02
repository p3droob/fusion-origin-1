module.exports = {
  name: 'tempo',
  aliases: ['t'],
  run: async (client, message, args, prefix) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const tempos = await client.db.ref(`Users/${user.id}/cooldown`).once('value').then(k => k.val()) || {};
    let array = [];
    let arrT = ['mine', 'daily', 'play', 'hunt']
    .forEach(t => {
      let timeout = {
        daily: 43200000,
        mine: 1800000
      }
      let info = {
        name: `**${t.replace('mine', 'minerar').replace('hunt', 'Caçar').replace('play', 'brincar').slice(0, 1).toUpperCase() + t.replace('mine', 'minerar').replace('hunt', 'Caçar').replace('play', 'brincar').slice(1)}**`,
        value: tempos[t] !== undefined ?client.msToTime(timeout[t] - (Date.now() - tempos[t])): 'Pronto para uso'
      }
      array.push(info)
    })
    message.respond(new client.embed().setTitle(`Cooldowns de ${user.username}`).addFields(array))
  }
}