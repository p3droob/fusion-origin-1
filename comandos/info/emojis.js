const Discord  = require('discord.js');
module.exports = {
  name: 'emojis',
  description: 'mostra todos os meus emojis',
  category: 'info',
  run: async (client, message, args, prefix) => {
    const noargs = new Discord.MessageEmbed()
    .setTitle("Sem argumentos")
    .setDescription(`\`${prefix}emojis local\` = mostra os emojis deste servidor\n\`${prefix}emojis fusion\` = mostra os emojis que eu uso\n\`${prefix}emojis all/todos = mostra todos os emois que eu tenho acesso\``)
    if (!args[0]) return message.respond(noargs);
    if (args[0] === 'local') {
      let emojis = []; 

message.guild.emojis.cache.forEach(d => { 
  if(d.animated) {
     emojis.push(`<a:${d.name}:${d.id}>`);
  } else {
     emojis.push(`<:${d.name}:${d.id}>`);
  }
});
    const maxPerPage = 42;
let queue = Array.from(emojis);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new Discord.MessageEmbed()
.setTitle('Emojis deste servidor')
.setThumbnail(message.author.displayAvatarURL())
.setFooter(`Página ${page+1}/${pages}`)
.setColor(client.colors.embedDesc)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
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
    if (page <= 0) page = pages;
   page--
   embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
  } else if (args[0] === 'fusion') {
    let emojis = []; 
    let searchG = client.guilds.cache.get('812266828196741121')
searchG.emojis.cache.forEach(d => { 
  if(d.animated) {
     emojis.push(`<a:${d.name}:${d.id}>`);
  } else {
     emojis.push(`<:${d.name}:${d.id}>`);
  }
});
    const maxPerPage = 42;
let queue = Array.from(emojis);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new Discord.MessageEmbed()
.setTitle('Todos os Emojis')
.setThumbnail(message.author.displayAvatarURL())
.setFooter(`Página ${page+1}/${pages}`)
.setColor(client.colors.embedDesc)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
var msg = await message.respond(embed)
await msg.react("⬅️")
await msg.react("➡️")

let filtro = (reaction, user) => user.id === message.author.id;

let coletor = msg.createReactionCollector(filtro, {
  time: 180000, cooldown: 500
})

coletor.on("collect", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case "⬅️":
    if (page <= 0) page = pages
   page--
   embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
  } else if (args[0] === 'all' || args[0] === 'todos') {
    let emojis = [];
client.emojis.cache.forEach(d => { 
  if(d.animated) {
     emojis.push(`<a:${d.name}:${d.id}>`);
  } else {
     emojis.push(`<:${d.name}:${d.id}>`);
  }
});
    const maxPerPage = 42;
let queue = Array.from(emojis);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new Discord.MessageEmbed()
.setTitle('Todos os Emojis')
.setThumbnail(message.author.displayAvatarURL())
.setFooter(`Página ${page+1}/${pages}`)
.setColor(client.colors.embedDesc)
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
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
    if (page <= 0) page = pages;
   page--
   embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
   msg.edit(embed)
   page = Number(pages - 1)
   reaction.users.remove(user)
    break;
    case "➡️":
    if (page === Number(pages - 1)) page = -1;
    page++
    embed.setFooter(`Página ${page+1}/${pages}`);
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map(d => d).join(' '))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
  }

}
}