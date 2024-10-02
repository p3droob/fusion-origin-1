const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const ms = require("ms")
const emoji = require('../../utils/emojis.js')
const moment = require('moment-timezone');
module.exports = {
  name: 'pay',
  aliases: ['pagar'],
  usage: 'pay <usuário> <valor>',
  description: 'paga uma quantia a um usuário',
  category: 'economy',
  run: async (client, message, args) => {
    const name = 'pay';


    
    const prefix = db.get(`${message.guild.id}.prefix`) || 'f!'
    const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))
    const adg = new MessageEmbed()
      .setColor("#0cfffb")
      .setTitle(`💸 | \`${prefix}pay\``)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("🤔 |Como usar?\n\n 📕 | **Exemplos**")
      .addFields(
      { name: `🔹 Pagar pessoa por menção`, value: `\`${prefix}pay Mr. Frozen Fire#8208 500\``},
      { name: `🔹 Pagar pessoa por ID`, value: `\`${prefix}pay 753252894974804068 1000\``},
      { name: "Aliases:", value: `\`${comando.aliases.join(", ")}\``}
      ) 
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));

    const user = message.mentions.members.first() || client.users.cache.get(args[0]);

    if (!user) {
      return message.respond(adg);
    }
    if (!args[1]) {
      return message.respond(adg);
    }
    const args1 = args[1].replace(`k`, '000').replace(`m`, '000000').replace(`kk`, '000000')

    if (user == message.author.id) return message.respond('Você não pode transferir flocos para si mesmo');

    

    if (isNaN(args1.replace(`k`, '000'))) return message.respond('Digite números **válidos**!');
    
if (args1.includes('.')) return message.respond('Você não pode transferir números decimais!')
    if (!args1) {
      return message.respond('Especifique uma quantidade para ser transferida');
    }

    if (args1 < 1) return message.channel.send('Você não pode transaferir valores abaixo de 1');
    
    if (message.content.includes('-')) {
      return message.respond('Você não pode transferir flocos negativos');
    }

    const fetchValue = await client.db.ref('Users/' + message.author.id + '/flocos').once('value').then(ref => ref.val());

    if (args1 > fetchValue) return message.respond('Você não tem flocos suficiente');
    let atmUser = await client.db.ref(`Users/${user.id}/flocos`).once('value');
    atmUser = atmUser.val();
    message.respond(`:snowflake:Você deseja mesmo transferir ${args1.replace('k', '000')} flocos para ${user.user}?`).then((sentMessage) => {
      sentMessage.react('✅');
      const filter = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === message.author.id;
      const Collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000 });

      sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })

      Collector.on('collect', async () => {
        
        
        message.respond(`Você pagou ${args1.replace('k', '000')} flocos para ${user.user}`);
        client.db.ref(`Users/${user.id}`).update({
          flocos: Number(atmUser) + Number(args1.replace(`k`, '000'))
          
        });//ris
        let tran1 = await client.db.ref(`Users/${message.author.id}/transactions`).once('value').then(k => k.val()) || [];

        let tran2 = await client.db.ref(`Users/${user.id}/transactions`).once('value').then(k => k.val()) || [];

        let calcToA = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Pagou ${args1} flocos para \`${client.users.cache.get(user.id).tag} (${user.id})\``

        let calcToB = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Recebeu ${args1} flocos de \`${message.author.tag} (${message.author.id})\``;

        new client.transactions(client, args1, true, message.author, user).pay()
        let calcTo2 = Number(fetchValue) - args1;
        client.db.ref(`Users/${message.author.id}`).update({flocos: calcTo2});
      })

    });
  },
};