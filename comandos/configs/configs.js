const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
  name: 'configs',
  aliases: ["configs", "configurações", "configuracoes"],
  usage: `configs`,
  description: `Mostra as configurações do servidor`,
  category: 'configs',
  run: async (client, message, args, prefix) => {

//entrada
let entrada = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/welcome`).once('value').then(r => r.val());
if (entrada == null) entrada = 'idefinido';
//saida
let saida = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/leave`).once('value').then(r => r.val());
if (saida == null) saida = 'idefinido';
//sugestão
let canalsuggest = db.fetch(`suggestchan_${message.guild.id}`);
if (canalsuggest == null) canalsuggest = 'idefinido';
//levelup
let clup = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/levelup`).once('value').then(r => r.val());
if (clup == null) clup = 'idefinido';
//Logs
let canallogs = await db.get(`cMod_${message.guild.id}`) || "idefinido";
const emojis = client.controllers.emojis;
//autorole
let autorole = await client.db.ref(`Guilds/${message.guild.id}/configs/autorole`).once('value').then(r => r.val())
if (autorole == null) autorole = 'idefinido';
//embed
    const configsS = new Discord.MessageEmbed()
    .setTitle(`Configurações de ${message.guild.name}`)
    .setColor(client.colors.embedDesc)
    .setThumbnail(message.guild.iconURL({format: 'gif'}))
    .setDescription(
    `**Configurações**\nReaja ao emoji que identifica cada configuração:\n${emojis.list} --> canais\n${emojis.download} --> Autorole\n ${emojis.servidor} --> canais da blacklist\n<:membros_Fusion:831537357953302559> --> membros da blacklist`)

    const configs = new Discord.MessageEmbed()
    .setTitle(`Configurações de ${message.guild.name}`)
    .setColor(client.colors.embedDesc)
    .setThumbnail(message.guild.iconURL({format: 'gif'}))
    .setDescription(
    `**Configurações**\nReaja ao emoji que identifica cada configuração:\n${emojis.list} --> canais\n${emojis.download} --> Autorole\n ${emojis.servidor} --> canais da blacklist\n<:membros_Fusion:831537357953302559> --> membros da blacklist`)
    message.respond(configs).then(msg => {
      msg.react(emojis.list);
      msg.react(emojis.download);
      msg.react(emojis.servidor);
      msg.react('<:membros_Fusion:831537357953302559>');
      const filter = (reaction, user) => user.id === message.author.id;
      let coletor = msg.createReactionCollector(filter, { time: 90000})
      .on('collect', async (reaction, user) => {
        reaction.users.remove(user)
        switch (reaction.emoji.name) {
          case 'membros_Fusion':
          msg.reactions.removeAll()
          let db1 = await client.db.ref(`Guilds/${message.guild.id}/blacklist/members`).once('value').then(r => r.val()) || ['Nenhum'];
          const maxPerPage1 = 10;
         let queue1 = Array.from(db1);
         const pages1 = Math.ceil(queue1.length / maxPerPage1);
         
        let page1 = 0;
        const embed1 = new Discord.MessageEmbed()
        .setTitle('TOP')
        .setDescription(queue1.slice(page1 * maxPerPage1, (page1 * maxPerPage1) + maxPerPage1).map((e, i) => `${(i + 1 ) + page1 * maxPerPage1}. - <@${e}>`).join('\n'))
          msg.edit(embed1)
          await msg.react("⬅️")
          await msg.react("➡️")
          await msg.react(emojis.voltar)
          let coletor3 = msg.createReactionCollector(filter, { time: 90000, cooldown: 500 });
          coletor3.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "⬅️") {
   page1--
embed1.setDescription(queue1.slice(page1 * maxPerPage1, (page1 * maxPerPage1) + maxPerPage1).map((e, i) => `${(i + 1) + page1 * maxPerPage1}. - <@${e}>`))
   msg.edit(embed1)
   reaction.users.remove(user)
}
if (reaction.emoji.name === "➡️") {
    page1++
embed1.setDescription(queue1.slice1(page1 * maxPerPage1, (page1 * maxPerPage1) + maxPerPage1).map((e, i) => `${(i + 1) + page1 * maxPerPage1}. - <@${e}>`))
    msg.edit(embed1)
    reaction.users.remove(user);
}
          })
          break;
          case 'list':
          configs.setDescription(`>>> Entrada: <#${entrada}>\nSaída: <#${saida}>\nSugestões: <#${canalsuggest}>\nLevel Up: <#${clup}>\nLogs: <#${canallogs}>`)
          msg.edit(configs)
          break;
          case 'download_Fusion':
          configs.setDescription(`> Cargo de autorole: <@&${autorole}>`)
          msg.edit(configs)
          break;
          case 'host_Fusion':
          msg.reactions.removeAll()
          let db = await client.db.ref(`Guilds/${message.guild.id}/blacklist/channels`).once('value').then(r => r.val()) || ['Nenhum'];
const xy = Array.from(db)
const maxPerPage = 10;
let queue = Array.from(xy);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new Discord.MessageEmbed()
.setTitle('TOP')
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1 ) + page * maxPerPage}. - <#${e}>`).join('\n'))
msg.edit(embed)
 await msg.react("⬅️")
 await msg.react("➡️")
 await msg.react(emojis.voltar)
let filtro = (reaction, user) => user.id === message.author.id;

let coletor2 = msg.createReactionCollector(filtro, {
  time: 90000, cooldown: 500
})

coletor2.on("collect", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case 'voltar_Fusion':
    msg.edit(configsS)
    msg.reactions.removeAll()
    msg.react(emojis.list);
    msg.react(emojis.download);
    msg.react(emojis.servidor);
    msg.react('<:membros_Fusion:831537357953302559>');
    break;
    case "⬅️":
   page--
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. - <#${e}>`))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    page++
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. - <#${e}>`))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
          break;
        }
      })
    })
  }
}