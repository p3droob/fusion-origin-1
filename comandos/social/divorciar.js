const db = require('quick.db');

module.exports = {
    name: "divorciar",
    aliases: ['divorce','divorciar'],
  category: 'social',
    run: async (client, message, args) => {       
        
    const user2 = await client.db.ref(`Users/${message.author.id}/marry`).once('value').then(r => r.val())
    if (user2 == null) return message.respond(` você precisa estar casado para se divorciar!`);
    const user = await client.users.fetch(user2)
    if(user2 !== user.id) return message.respond(`${user.id} Não está casado com ${user.username}`)
    message.respond(`Você tem certeza que quer se divorciar de **${user.username}**?`).then((msg) => {
        
  msg.react('💔');
    const filterYes = (reaction, usuario) => reaction.emoji.name === '💔' && usuario.id === message.author.id;

    const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000});

    yesCollector.on('collect', () => {
        msg.reactions.removeAll().catch();
     message.respond(` você se divorciou de ${user}, procure outro companheiro para ser feliz :heart:`)
     client.db.ref(`Users/${message.author.id}/marry`).remove();
     client.db.ref(`Users/${user.id}/marry`).remove()
     client.db.ref(`Users/${message.author.id}/marrytime`).remove()
     client.db.ref(`Users/${user.id}/marrytime`).remove()

})
    }
    )}
}