const Discord = require('discord.js');
module.exports = {
name: 'delete',
  category: 'dev',
run: async (client, message, args, prefix) => {
  if (message.author.id !== '753252894974804068') return;
  const user = message.mentions.users.first() || client.users.cache.get(args[1]);
  switch (args[0]) {
    case 'pescaria':
    let verificar = await client.db.ref(`Users/${user.id}/games/pesca/singleplayer`).once('value').then(r => r.val());
    if (!verificar) return message.respond(`Esse usuário não está na pescaria!`)
    client.db.ref(`Users/${user.id}/games/pesca/singleplayer`).remove()
    message.respond(`**Sucesso! ${user.tag} removido da pescaria**`)
  }
  }
}