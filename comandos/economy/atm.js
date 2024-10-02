const Discord = require("discord.js");
const ms = require("ms")
const emoji = require('../../utils/emojis.js')
const db = require('quick.db');
module.exports = {
  name: 'atm',
  aliases: ["saldo", "bal", "flocos", "snowflakes"],
  usage: 'atm <usuário ou id>',
  description: 'mostra o saldo de alguém',
  category: 'economy',
  run: async (client, message, args) => {

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);

if (!user) {
let dbtotal1 = await client.db.ref('Users/' + message.author.id + '/flocos').once('value').then(ref => ref.val()) || '0';
    let carne = await client.db.ref('Users/' + message.author.id + '/carne').once('value').then(ref => ref.val()) || '0';
    const dbU = await client.db.ref(`Users`).once('value').then(r =>r.val());
    let arrayUsers = [];
    Object.keys(dbU).forEach(u => {
      arrayUsers.push({id: u, flocos: dbU[u].flocos || 0})
    });
    arrayUsers = arrayUsers.sort((a, b) => {
      if (a.flocos < b.flocos) return 1;
      if (a.flocos > b.flocos) return -1;
      return 0;
    })
    let position;
    arrayUsers.forEach(async function (membro, indice){
         if (membro.id == message.author.id) {
             position = indice+1
         }
     })
    
let embed = new Discord.MessageEmbed()
.setTitle(`Sua ATM:`)
.setColor(client.colors.embedFields)
.addFields([
  {
    name: 'Flocos:',
    value: `\`\`\`${dbtotal1} ❄️\`\`\``
  },
  {
    name: 'Carne:',
    value: `\`\`\`${carne} quilos\`\`\``
  }
])
.setFooter(`Você está em #${position} no rank!`)
message.respond(embed)
} else {
    let dbtotal1 = await client.db.ref('Users/' + user.id + '/flocos').once('value').then(ref => ref.val()) || '0';
    let carne = await client.db.ref('Users/' + user.id + '/carne').once('value').then(ref => ref.val()) || '0';
    
    const dbU = await client.db.ref(`Users`).once('value').then(r =>r.val());
    let arrayUsers = [];
    Object.keys(dbU).forEach(u => {
      arrayUsers.push({id: u, flocos: dbU[u].flocos || 0})
    });
    arrayUsers = arrayUsers.sort((a, b) => {
      if (a.flocos < b.flocos) return 1;
      if (a.flocos > b.flocos) return -1;
      return 0;
    })
    let position;
    arrayUsers.forEach(async function (membro, indice){
         if (membro.id == user.id) {
             position = indice+1
         }
     })
     
    let embed = new Discord.MessageEmbed()
.setTitle(`ATM de ${user.username}`)
.setColor(client.colors.embedFields)
.addFields([
  {
    name: 'Flocos:',
    value: `\`\`\`${dbtotal1} ❄️\`\`\``
  },
  {
    name: 'Carne:',
    value: `\`\`\`${carne} quilos\`\`\``
  }
])
.setFooter(`Ele está em #${position} no rank`)
message.respond(embed)
  }
}
}