const Discord = require('discord.js');
module.exports = {
  name: 'pescaria',
  aliases: ['pesca', 'pescar'],
  description: 'Um simples jogo de pesca',
  usage: 'pescaria [status | online]',
  category: 'games',
  run: async (client, message, args, prefix) => {
    const verifyG = await client.db.ref(`Users/${message.author.id}/games/pesca/singleplayer`).once('value').then(ref => ref.val());
    const emojis = client.controllers.emojis;
    const db = await client.db.ref(`Users`).once('value').then(ref => ref.val());
    let array1 = Array.from(Object.keys(db))
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    array1.forEach(e => {
      let getG = db[e].games;
      if (!getG) return;
      let getS = getG.pesca;
      if (!getS) return;
      let getP = getS.singleplayer
      if (!getP) return;
      let getE = getP.easy;
      if (!getE) return;
      arr1.push(e)
    })
    array1.forEach(e => {
      let getG = db[e].games;
      if (!getG) return;
      let getS = getG.pesca;
      if (!getS) return;
      let getP = getS.singleplayer
      if (!getP) return;
      let getE = getP.medium;
      if (!getE) return;
      arr1.push(e)
    })
    array1.forEach(e => {
      let getG = db[e].games;
      if (!getG) return;
      let getS = getG.pesca;
      if (!getS) return;
      let getP = getS.singleplayer
      if (!getP) return;
      let getE = getP.insane;
      if (!getE) return;
      arr1.push(e)
    })
    const onlines = {
      easy: arr1,
      medium: arr2,
      insane: arr3
    }

    if (!args[0]) {
       if (verifyG) return message.respond('Você já está em um jogo atualmente!')
    const engine = new client.embed(message.author)
    .setTitle('Qual modo você deseja jogar?')
    .addFields([
      {
        name: `Fácil [${onlines.easy.length} jogando agora]`,
        value: emojis.status.online
      },
      {
        name: `Medio [${onlines.medium.length} jogando agora]`,
        value: emojis.status.idle
      },
      {
        name: `Insano [${onlines.insane.length} jogando agora]`,
        value: emojis.status.dnd
      }
    ])
    message.respond(engine).then(msg => {
      msg.react(emojis.status.online)
      msg.react(emojis.status.idle)
      msg.react(emojis.status.dnd)
      msg.react('❔')
      let filtro = (reactio, user) => user.id === message.author.id;
      const collector = msg.createReactionCollector(filtro, { max: 1});
      collector.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '❔') {
          let infoEmbed = new client.embed()
          .setFooter(`Quem deu essa ideia foi: ${client.users.cache.get('734769142174973952').tag}`, client.users.cache.get('734769142174973952').displayAvatarURL())
          .setTitle('Pescaria')
          .addFields([
            {
              name: '**Informações:**',
              value: `> **Fácil:** O peixe se move a cada 4 segundos\n**Médio:** O peixe se move a cada 3 segundos\n**Insano:** O peixe se move a cada 2 segundos\n\n**❔Como jogar:** reaja com ${client.controllers.emojis.bug} para capturar o peixe, mas lembre-se ele só pode ser capturado quando estiver abaixo do seu personagem! para visualizar o ranking das pessoas que possuem maiores records use ${prefix}top pesca`
            }
          ])
          msg.edit(infoEmbed)
          msg.reactions.removeAll()
          msg.react(client.controllers.emojis.voltar)
            const collector2 = msg.createReactionCollector(filtro)
            .on('collect', async (reaction, user) => {
              if (reaction.emoji.name === 'voltar_Fusion') {
                msg.reactions.removeAll()
                msg.edit(engine)
                msg.react(emojis.status.online)
                msg.react(emojis.status.idle)
                msg.react(emojis.status.dnd)
                msg.react('❔')
              }
            })
        }
        if (reaction.emoji.name === 'online_Fusion') {
          const game = new client.games.pesca.singleplayer(message, client, 1);
          await game.run()
          client.db.ref(`Users/${message.author.id}/games/pesca/singleplayer`).update({
            easy: true
          })
        }
        if (reaction.emoji.name === 'idle_Fusion') {
          const game = new client.games.pesca.singleplayer(message, client, 2);
          await game.run()
          client.db.ref(`Users/${message.author.id}/games/pesca/singleplayer`).update({
            medium: true
          })
        }
        if (reaction.emoji.name === 'offline_Fusion') {
          const game = new client.games.pesca.singleplayer(message, client, 3);
          await game.run()
          client.db.ref(`Users/${message.author.id}/games/pesca/singleplayer`).update({
            insane: true
          })
        }
      })
    })
    } else if (args[0] === 'stats' || args[0] === 'status') {
      let user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;
      const getUser = await client.db.ref(`Users/${user.id}/records/games/pesca/singleplayer`).once('value').then(r => r.val());
      const status = new client.embed(message.author)
      .setTitle(`** Status da pescaria de ${user.username}**`)
      .addFields([
        {
          name: '> Record',
          value: `**Fácil:** \`${getUser ? getUser.easy : 0}\`\n**Médio:** \`${getUser ? getUser.medium : 0}\`\n**Insano:** \`${getUser ? getUser.insane : 0}\``
        }
      ])
      message.respond(status)
    }
    if (args[0] === 'online') {
      const nowPlaying = new client.embed(message.author)
      .setTitle(`${emojis.status.online} | Jogando agora`)
      .addFields([
        {
          name: `> Qual você deseja ver?`,
          value: '<:spacer:861311016168456222>'
        },
        {
          name: `Fácil [${onlines.easy.length}]`,
          value: emojis.status.online
        },
        {
          name: `Médio [${onlines.medium.length}]`,
          value: emojis.status.idle
        },
        {
          name: `Insano [${onlines.insane.length}]`,
          value: emojis.status.dnd
        }
      ])
      message.respond(nowPlaying).then(msg1 => {
        msg1.react(emojis.status.online)
                msg1.react(emojis.status.idle)
                msg1.react(emojis.status.dnd)
        let filtro3 = (reaction, user) => user.id === message.author.id;
        let coletor3 = msg1.createReactionCollector(filtro3)
        .on('collect', async (reaction, user) => {
          if (reaction.emoji.name === 'online_Fusion') {
            if (onlines.easy.length === 0) return message.channel.send(`${message.author} parece que não há ninguém jogando no modo Fácil agora 😔`)
                let emojis1 = onlines.easy
    const maxPerPage = 10;
let queue = Array.from(emojis1);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new client.embed()
.setTitle(`**Jogadores no nível fácil [${onlines.easy.length}]**`)
.setThumbnail(message.author.displayAvatarURL())
.setFooter(`Página ${page+1}/${pages}`)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
var msg = await message.respond(embed)
await msg.react("⬅️")
await msg.react("➡️")

let filtro4 = (reaction4, user4) => user4.id === message.author.id;

let coletor4 = msg1.createReactionCollector(filtro4, {
  time: 180000, cooldown: 500
})

coletor4.on("collect", async (reaction4, user4) => {
  switch (reaction4.emoji.name) {
    case "⬅️":
    if (page <= 0) page = pages
   page--
   embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
          }
          if (reaction.emoji.name === 'idle_Fusion') {
            if (onlines.medium.length === 0) return message.channel.send(`${message.author} parece que não há ninguém jogando no modo Médio agora 😔`)
            let emojis2 = onlines.medium
    const maxPerPage = 10;
let queue = Array.from(emojis2);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new client.embed()
.setTitle(`**Jogadores no nível médio [${onlines.medium.length}]**`)
.setThumbnail(message.author.displayAvatarURL())
.setFooter(`Página ${page+1}/${pages}`)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
var msg = await message.respond(embed)
await msg.react("⬅️")
await msg.react("➡️")

let filtro4 = (reaction4, user4) => user4.id === message.author.id;

let coletor4 = msg1.createReactionCollector(filtro4, {
  time: 180000, cooldown: 500
})

coletor4.on("collect", async (reaction4, user4) => {
  switch (reaction4.emoji.name) {
    case "⬅️":
    if (page <= 0) page = pages
   page--
   embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
          }
          if (reaction.emoji.name === 'offline_Fusion') {
            if (onlines.insane.length === 0) return message.channel.send(`${message.author} parece que não há ninguém jogando no modo Insano agora 😔`)
            let emojis3 = onlines.insane
    const maxPerPage = 10;
let queue = Array.from(emojis3);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new client.embed()
.setTitle(`**Jogadores no nível insano [${onlines.insane.length}]**`)
.setThumbnail(message.author.displayAvatarURL())
.setFooter(`Página ${page+1}/${pages}`)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
var msg = await message.respond(embed)
await msg.react("⬅️")
await msg.react("➡️")

let filtro4 = (reaction4, user4) => user4.id === message.author.id;

let coletor4 = msg1.createReactionCollector(filtro4, {
  time: 180000, cooldown: 500
})

coletor4.on("collect", async (reaction4, user4) => {
  switch (reaction4.emoji.name) {
    case "⬅️":
    if (page <= 0) page = pages
   page--
   embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d) ? client.users.cache.get(d).tag : 'usuário desconhecido'}`).join('\n'))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
          }
        })
      })
    }
  }
}