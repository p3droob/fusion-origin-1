const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const ms = require('parse-ms')

module.exports = {
    name: "marry",
    aliases: ['casar', 'marry', 'casamento'],
  category: 'social',
    run: async (client, message, args, prefix) => {

        const marryEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(':heart: | `Casar`')
            .addFields(
                { name: `${prefix}casar <usuário>`}
                )

                .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

        const authordata = await client.db.ref(`Users/${message.author.id}/marry`).once('value').then(r => r.val());

        const mentioned = message.mentions.users.first();

        if (!mentioned) return message.respond(`siga o exemplo a seguir: \`${prefix}casar <usuário>\``)
        if (mentioned === client.user) return message.respond(`Eu não quero casar com você, só tenho olhos para a televisão! `)
        if (mentioned.id === message.author.id) return message.respond(` você quer casar com você mesmo? Procure alguém para ser feliz com você! `)

        if (authordata && authordata !== 'null') return message.respond(` **|** Você já está casado! Nem pense em trair!`)

        const user2 = await client.db.ref(`Users/${mentioned.id}/marry`).once('value').then(r => r.val())

        if (user2 && user2 !== 'null') return message.respond(` **|** Opa! Calma ai, já ouviu essa frase "Talarico morre cedo"? Toma cuidado! ( **${mentioned.username}** já está casado)`);
        message.respond(` **|** ${mentioned} Você recebeu um pedido de casamento de ${message.author} você tem 1 minuto para aceitar!`).then((msg) => {

            setTimeout(() => msg.react('❌'),
                1000);
            msg.react('💍');
            const filterYes = (reaction, usuario) => reaction.emoji.name === '💍' && usuario.id === mentioned.id;
            const filterNo = (reaction, usuario) => reaction.emoji.name === '❌' && usuario.id === mentioned.id;

            const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000 });
            const noCollector = msg.createReactionCollector(filterNo, { max: 1, time: 60000 })

            noCollector.on('collect', () => {
                return message.respond(`**|** Me desculpe ${message.author}, mas seu pedido de casamento foi rejeitado `)
            })

            yesCollector.on('collect', () => {
              client.db.ref(`Users/${message.author.id}`).update({
                marry: mentioned.id,
                marrytime: Date.now()
              })
              client.db.ref(`Users/${mentioned.id}`).update({
                marry: message.author.id,
                marrytime: Date.now()
              })
                message.respond(`❤️ **|** ${message.author} e ${mentioned}, Vocês agora estão casados, felicidades para vocês dois! ❤️`)

                
            })
        })
    }
}