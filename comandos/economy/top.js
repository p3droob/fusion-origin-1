const Discord = require('discord.js')
const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "top",
    description: "mostra o ranking",
  category: 'economy',
  run: async (client, message, args) => {


    const embed = new client.embed(message.author)
    .setDescription(`**TOP 10 RANKS GLOBAL\n- pesca\n- flocos**`)
   .setThumbnail('https://network.grupoabril.com.br/wp-content/uploads/sites/4/2019/06/seis-universidades-brasileiras-caem-de-posic3a7c3a3o-no-ranking-de-melhores-do-mundo-facebook.png')

  if(!args[0]) return message.respond(embed)
  if (args[0] == 'pesca') {
    const emojis = client.controllers.emojis;
    const pessoas1 = [];
    const pessoas2 = [];
    const pessoas3 = [];
    const db = await client.db.ref(`Users`).once('value').then(r => r.val());
    const array = Object.keys(db);
    array.forEach(e => {
      let db1 = db[e].records;
      if (!db1) return;
      let db2 = db1.games;
      if (!db2) return;
      let db3 = db2.pesca;
      if (!db3) return;
      let db4 = db3.singleplayer;
      if (!db4) return;
      let db5 = db4.easy;
      if (db5) {
        let info1 = {
          id: e, level: db5
        }
        pessoas1.push(info1)
      }
      let db6 = db4.medium
      if (db6) {
        let info2 = {
          id: e, level: db6
        }
        pessoas2.push(info2)
      }
      let db7 = db4.insane;
      if (db7) {
        let info3 = {
          id: e, level: db7
        }
        pessoas3.push(info3)
      }
    })
    let galera1 = pessoas1.sort(function (a, b) {
         if (a.level < b.level) {
           return 1;
         }
         if (a.level > b.level) {
           return -1;
         }
         return 0;
     });
     let galera2 = pessoas2.sort(function (a, b) {
         if (a.level < b.level) {
           return 1;
         }
         if (a.level > b.level) {
           return -1;
         }
         return 0;
     });
     let galera3 = pessoas3.sort(function (a, b) {
         if (a.level < b.level) {
           return 1;
         }
         if (a.level > b.level) {
           return -1;
         }
         return 0;
     });
     const engine = new client.embed()
     .setTitle(`Qual dos rankings você quer ver?`)
     .addFields([
       {
         name: `**Fácil**`,
         value: emojis.status.online
       },
       {
         name: `**Médio**`,
         value: emojis.status.idle
       },
       {
         name: `**Insane**`,
         value: emojis.status.dnd
       }
     ])
    await message.respond(engine).then(async msg => {
      msg.react(emojis.status.online)
      msg.react(emojis.status.idle)
      msg.react(emojis.status.dnd)
      const filtro = (reaction, user) => user.id === message.author.id;
      const coletor = msg.createReactionCollector(filtro, { time: 180000 })
      .on('collect', async (reaction, user) => {
        if (reaction.emoji.name == 'online_Fusion') {

          const maxPerPage = 10;
          let queue = Array.from(galera1);
          const pages = Math.ceil(queue.length / maxPerPage);
          let page = 0;
          const embed = new client.embed()
          .setTitle(`**Records do nível fácil**`)
          .setFooter(`Página ${page+1}/${pages}`)
          .setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`.replace('[1]', '🥇').replace('[2]', '🥈').replace('[3]', '🥉')).join('\n'))
          message.channel.send(embed).then(async msg1 => {
            await msg1.react("⬅️")
            await msg1.react("➡️")
            let filtro2 = (reaction2, user2) => user2.id === message.author.id;
            let coletor2 = msg1.createReactionCollector(filtro2, { time: 90000 })
            .on('collect', async (reaction2, user2) => {
              switch (reaction2.emoji.name) {
                case "⬅️":
                if (page <= 0) page = pages
                page--
                embed.setFooter(`Página ${page+1}/${pages}`);
                embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`.replace('[1]', '🥇').replace('[2]', '🥈').replace('[3]', '🥉')).join('\n'))
                msg1.edit(embed)
                reaction2.users.remove(user2)
                break;
                case "➡️":
                if (page === Number(pages - 1)) page = -1;
                page++
                embed.setFooter(`Página ${page+1}/${pages}`);
                embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`.replace('[1]', '🥇').replace('[2]', '🥈').replace('[3]', '🥉')).join('\n'))
                msg1.edit(embed)
                reaction2.users.remove(user2)
                break;
              }
            })
          })
        }
        if (reaction.emoji.name == 'idle_Fusion') {
          const maxPerPage = 10;
          let queue = Array.from(galera2);
          const pages = Math.ceil(queue.length / maxPerPage);
          
          let page = 0;
          const embed = new client.embed()
          .setTitle(`**Records do nível médio**`)
          .setFooter(`Página ${page+1}/${pages}`)
          .setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
          message.channel.send(embed).then(async msg1 => {
            await msg1.react("⬅️")
            await msg1.react("➡️")
            let filtro2 = (reaction2, user2) => user.id === message.author.id;
            let coletor2 = msg1.createReactionCollector(filtro2, { time: 90000 })
            .on('collect', async (reaction2, user2) => {
              switch (reaction2.emoji.name) {
                case "⬅️":
                if (page <= 0) page = pages
                page--
                embed.setFooter(`Página ${page+1}/${pages}`);
                embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
                msg1.edit(embed)
                reaction2.users.remove(user)
                break;
                case "➡️":
                if (page === Number(pages - 1)) page = -1;
                page++
                embed.setFooter(`Página ${page+1}/${pages}`);
                embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
                msg1.edit(embed)
                reaction2.users.remove(user)
                break;
              }
            })
          })
        }
        if (reaction.emoji.name == 'offline_Fusion') {
          const maxPerPage = 10;
          let queue = Array.from(galera3);
          const pages = Math.ceil(queue.length / maxPerPage);
          
          let page = 0;
          const embed = new client.embed()
          .setTitle(`**Records do nível Insano**`)
          .setFooter(`Página ${page+1}/${pages}`)
          .setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
          message.channel.send(embed).then(async msg1 => {
            await msg1.react("⬅️")
            await msg1.react("➡️")
            let filtro2 = (reaction2, user2) => user.id === message.author.id;
            let coletor2 = msg1.createReactionCollector(filtro2, { time: 90000 })
            .on('collect', async (reaction2, user2) => {
              switch (reaction2.emoji.name) {
                case "⬅️":
                if (page <= 0) page = pages
                page--
                embed.setFooter(`Página ${page+1}/${pages}`);
                embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
                msg1.edit(embed)
                reaction2.users.remove(user)
                break;
                case "➡️":
                if (page === Number(pages - 1)) page = -1;
                page++
                embed.setFooter(`Página ${page+1}/${pages}`);
                embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${client.users.cache.get(d.id) ? client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
                msg1.edit(embed)
                reaction2.users.remove(user)
                break;
              }
            })
          })
        }
      })
    })
  }
    if (args[0] == 'flocos') {
             const array = [];
const db = await client.db.ref(`Users`).once('value').then(r => r.val())
Object.keys(db).forEach(p => {
  if (!db[p].flocos) return;
  let info = {
    id: p, flocos: db[p].flocos
  }
  array.push(info)
})
     const pessoas = array.sort(function (a, b) {
         if (a.flocos < b.flocos) {
           return 1;
         }
         if (a.flocos > b.flocos) {
           return -1;
         }
         return 0;
     });
     let suaPosicao;
     pessoas.forEach(async function (membro, indice){
         if (membro.id == message.author.id) {
             suaPosicao = `${indice+1}`
         }
     })
     const embed = new client.embed()
     .setTitle('10 pessoas com mais flocos')
     .setDescription(pessoas.map((e, i) => `**[ ${i+1} ]** - ${client.users.cache.get(e.id) ? client.users.cache.get(e.id).tag : 'usuário desconhecido'} -> ${e.flocos}`).slice(0, 10))
     .setFooter(`Você está em #${suaPosicao}`)
     message.channel.send(embed)
  }
  if (args[0] == 'reps') {
    
             const meuSet = [];
const db = await client.db.ref(`Users`).once('value');
    const array = Object.keys(db.val());
    
    array.forEach((e) => { 
        let infoMembro = {
            id: `${e}`, flocos: db.val()[e].reps || 0
        };
        meuSet.push(infoMembro)
    });

     let xy = meuSet.sort(function (a, b) {
         if (a.flocos < b.flocos) {
           return 1;
         }
         if (a.flocos > b.flocos) {
           return -1;
         }
         return 0;
     });
     let suaPosicao;
     xy.forEach(async function (membro, indice){
         if (membro.id == message.author.id) {
             suaPosicao = `${indice+1}`
         }
     })
     let x = [];
 

     
     const maxPerPage = 10;
let queue = Array.from(xy);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new MessageEmbed()
.setTitle('TOP')
.setColor(client.colors.embedDesc)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1 ) + page * maxPerPage}. ${client.users.cache.get(e.id).tag} - ${e.flocos}`).join('\n'))
.setFooter(`Você está em #${suaPosicao} lugar no ranking! Página ${page+1}/${pages}`)
var msg = await message.respond(embed)
await msg.react("⬅️")
await msg.react("➡️")

let filtro = (reaction, user) => user.id === message.author.id;

let coletor = msg.createReactionCollector(filtro, {
  time: 90000, cooldown: 500
})

coletor.on("collect", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case "⬅️":
    if (page === 0) page = pages;
   page--
   embed.setFooter(`Você está em #${suaPosicao} lugar no ranking! Página ${page+1}/${pages}`)
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${client.users.cache.get(e.id)?client.users.cache.get(e.id).tag : "usuário desconhecido"} - ${e.flocos}`))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Você está em #${suaPosicao} lugar no ranking! Página ${page+1}/${pages}`)
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${client.users.cache.get(e.id)?client.users.cache.get(e.id).tag : "usuário desconhecido"} - ${e.flocos}`))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})

  }

}}