const ms = require("ms");
const Discord = require("discord.js");

    module.exports = {
    name: 'giveaway',
    aliases: ["sorteio"],
  category: 'util',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.respond(`**Você precisa da permissão de \`Gerenciar Mensagens\` para executar este comando**`).then(m => m.delete({ timeout: 60000 }))
        message.channel.send('Qual será o tempo do sorteio?\n> Dica:\nm = minuto\nd = dia\ns = segundo.').then(msg => {
            let collector = message.channel.createMessageCollector(m => 
  m.author.id === message.author.id)
  .on("collect", message => {
      message.delete()
      let tempo = message.content;
      collector.stop()
      msg.edit('Qual será o prêmio do sorteio?').then(msg2 => {
          let collector1 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id)
      .on("collect", message => {
          message.delete()
          let prize = message.content;
          collector1.stop()
          msg2.edit('Em qual canal será realizado o sorteio?').then(msg3 => {
              let collector2 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id)
      .on("collect", message => {
          let canal = message.mentions.channels.first();
          if (!canal) return message.channel.send('Canal inválido!')
          if (!canal.permissionsFor(client.user.id).has('SEND_MESSAGES')) return message.channel.send('Não possuo permissão de enviar mensagens nesse canal')
          collector2.stop()
msg3.edit('Qual emoji será usado no sorteio?').then(msg10 => {
              let collector3 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id)
      .on("collect", message => {
let emojo = client.functions.get.emojis(message.content)
if (!emojo) return message.channel.send('Insira um emoji válido!')
emojo = emojo[0];
let emojo1;
if (isNaN(emojo)) emojo1 = emojo;
if (!isNaN(emojo)) {
  emojo = client.emojis.cache.get(emojo);
  if (!emojo) return message.reply('emoji não encontrado');
if (emojo.animated) emojo1 = `<a:${emojo.name}:${emojo.id}>`
if (!emojo.animated) emojo1 = `<:${emojo.name}:${emojo.id}>`
}
collector3.stop()
        message.channel.send('Qual será a descrição do sorteio?').then(msgDesc => {
          let collector4 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 })
      .on('collect', message => {
        let infoDesc = message.content;
        message.delete();
        msgDesc.delete();
        message.channel.send('Quantos ganhadores esse sorteio terá? ( de 1 a 20)').then(msgW => {
          let collector5 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id)
      .on('collect', message => {
        let totalW = message.content;
        if (isNaN(totalW)) return message.channel.send('Insira um **número** de 1 a 20!');
        if (totalW > 20) return message.channel.send('Insira um número de 1 a **20**.');
        if (totalW < 1) return message.channel.send('Insira um número maior que 1!');
        collector5.stop()


        var canal2 = message.guild.channels.cache.get(canal.id)
          let embed = new Discord.MessageEmbed()
          .setTitle('Novo sorteio!')
          .addFields(
              [
                  {
                      name: 'Prêmio', 
                      value: prize
                  },
                  {
                      name: 'Tempo: ',
                      value: tempo
                  },
                  {
                      name: 'Reaja com ' + emojo1 +' para parcicipar!',
                      value: `\n${infoDesc}\n\n${totalW} ganhadores!`
                  }
                  ]
                  )
          let sorteado = canal2.send(embed).then(msg5 => {
            var array = new Array();
            msg5.react(`${emojo1}`)
            let filter = (reaction, user) => user.id !== client.user.id;
            let coletor = msg5.createReactionCollector(filter)
            coletor.on("collect", (reaction, user) => {
              if (array.includes(user.id)) return;
              array.push(user.id)
            })
          setTimeout(() => {
              if (array.length <= 0) {
        return message.channel.send(
          `Ninguém reagiu, o sorteio foi cancelado.`
        );
      }
      let winner = [];
      for (var i = 0; i < totalW; i++) {
      let random = array[Math.floor(Math.random() * array.length)];
      if (winner.includes(random)) break;
      winner.push(random)
      }
              canal2.send(`Os ganhadores do sorteio foram\n${winner.map((w, i) => `${i+1} - <@${w}>`)}`)
          }, ms(tempo))
          })
      })
        })
      })
        }) 
      })
          })
      })
      })
  })
        })
})
})
}
}