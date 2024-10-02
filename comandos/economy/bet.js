const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const ms = require("ms")
const emoji = require('../../utils/emojis.js')
const moment = require('moment-timezone');

module.exports = {
    name: "bet",
    aliases: ['apostar'],
    usage: "bet @usuário <cara/coroa> <valor a ser apostado>",
    description: 'aposte flocos com alguém',
  category: 'economy',
    run: async (client, message, args, prefix) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
                
        let name = 'bet'
        const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))
        const noargs = new MessageEmbed()
        .setTitle(`💸 | \`${prefix}bet\``)
        
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#0cfffb')
        .setDescription("🤔 |Como usar?\n\n 📕 | **Exemplos**")
      .addFields(
      { name: `🔹 Apostar com alguém por menção`, value: `\`${prefix}bet @${client.users.cache.get('753252894974804068').tag} 500\``},
      { name: `🔹 Apostar com alguém por ID`, value: `\`${prefix}bet 753252894974804068 1000\``},
      { name: "Aliases:", value: `\`${comando.aliases.join(", ")}\``}
      )
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
      
        if(!user) return message.respond(noargs);
        if (!args[0]) return message.respond(noargs);
        if (!args[1]) return message.respond(noargs);
        if (args[1].includes('.', '-')) return message.respond('Você não pode inserir números negativos ou décimais!')
        let all1 = await client.db.ref(`Users/${message.author}/flocos`).once('value').then(ref => ref.val());
        
        let args2 = args[1].replace('k', '000').replace('kk', '000000')
        let reply = `${user}, você quer apostar ${args2} flocos com ${message.author}?`

        const authorT = await client.db.ref(`Users/${message.author.id}/transactions`).once('value').then(k => k.val()) || [];
        const userT = await client.db.ref(`Users/${user.id}/transactions`).once('value').then(k => k.val()) || [];
        const authorbal = await client.db.ref(`Users/${message.author.id}/flocos`).once('value').then(k => k.val());
        const userbal = await client.db.ref(`Users/${user.id}/flocos`).once('value').then(k => k.val());
    
        if(userbal < args2) return message.respond(`:snowflake: **|** ${user} não tem flocos suficientes para apostar!`)

        if(authorbal < args2) return message.respond(`Você não tem flocos o suficiente para apostar!`)
        

        if(!args2) return message.respond(`você não está fazendo corretamente, faça dessa forma: ${prefix}bet <usuário> <valor>`)

        if(isNaN(args2)) return message.respond('Digite números válidos!');
        message.respond(reply).then((msg) => {

            setTimeout(() => msg.react('<:sim_Fusion:824604719145287722>'),
            1000);
            
            const filterYes = (reaction, usuario) => reaction.emoji.name === 'sim_Fusion' && usuario.id === user.id;
            const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000 });
            yesCollector.on('collect', () => {

                const array1 = ['cara', 'coroa'];

                const rand = Math.floor(Math.random() * array1.length);
        
                if ('cara' === array1[rand]) {
        
                    message.respond(`💸 **|** Deu **${array1[rand]}**, ${message.author} você ganhou dessa vez ${args2} flocos! Patrocinado por ${user}.`);

                    let msgT = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Ganhou ${args2} flocos em apostas com \`${user.tag} (${user.id})\``
                    let msgT2 = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Perdeu ${args2} flocos em apostas com \`${message.author.tag} (${message.author.id})\``
                    client.db.ref(`Users/${message.author.id}`).update({
                      flocos: Number(authorbal) + Number(args2),
                      transactions: [msgT, ...authorT]
                    })
                    client.db.ref(`Users/${user.id}`).update({
                      flocos: Number(userbal) - Number(args2),
                      transactions: [msgT2, ...userT]
                      })
                  } else if ('cara' != array1[rand]) {
                    message.respond(`💸 **|** Deu **coroa**! ${user} Você ganhou ${args2} flocos, patrocinado por ${message.author} `);
                    let msgT = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Ganhou ${args2} flocos em apostas com \`${message.author.tag} (${message.author.id})\``

                    let msgT2 = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Perdeu ${args2} flocos em apostas com \`${client.users.cache.get(user.id) ? client.users.cache.get(user.id).tag : 'usuário desconhecido'} (${user.id})\``

                    client.db.ref(`Users/${message.author.id}`).update({
                      flocos: Number(authorbal) - Number(args2),
                      transactions: [msgT2, ...authorT]
                    })
                    client.db.ref(`Users/${user.id}`).update({
                      flocos: Number(userbal) + Number(args2),
                      transactions: [msgT, ...userT]
                      })
                  }
                
        
        
            })
        })
       
        
    }
}