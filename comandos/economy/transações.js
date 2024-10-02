const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
name: 'transações',
aliases: ['transactions', 'transacoes'],
  category: 'economy',
run: async (client, message, args) => {
moment.locale('pt-br')
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
let money = await client.db.ref(`Users/${user.id}/transactions`).once('value').then(k => k.val()) || ['Nada'];
const maxPerPage = 10;
let queue = Array.from(money);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new Discord.MessageEmbed()
.setTitle(`Transações de ${user.username}`)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${e}`).join('\n'))
message.respond(embed).then(async msg => {
  await msg.react('⬅️')
  await msg.react('➡️')
  let filtro = (reaction, user) => user.id === message.author.id;
const coletor = msg.createReactionCollector(filtro, {time: 90000})
.on('collect', async (reaction, user) => {
  switch (reaction.emoji.name) {
    case '➡️':
    reaction.users.remove(user)
    page++
    embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${e}`).join('\n'))
    msg.edit(embed)
    break;
    case '⬅️':
    reaction.users.remove(user)
    page--
    embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${e}`).join('\n'))
    msg.edit(embed)
    break;
  }
})
})
}
}