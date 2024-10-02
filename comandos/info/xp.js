const Discord = require('discord.js')
const db = require('quick.db');
const canvacord = require("canvacord");
module.exports = {
    name: "xp",
    aliases: ["xpinfo", "level"],
    usage: 'level <usuário>',
    description: 'mostra o level de alguém',
  category: 'info',
    run: async (client, message, args) => {

let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
if (user.bot) return message.respond(`Bots não possuem level`)
if (user.id === client.id) return message.respond(`Eu não possuo level!`)
//localevelfetch
let message1 = await client.db.ref(`Guilds/${message.guild.id}/users/${user.id}/xp`).once('value').then(d => d.val()) || '0';
let level1 = await client.db.ref(`Guilds/${message.guild.id}/users/${user.id}/level`).once('value').then(d => d.val()) || '0';
    let proxlvl1 = level1 + 1
    let xpproxlvl1 = proxlvl1 * 100
    let falta1 = xpproxlvl1 - message1
//global
let message2 = await client.db.ref(`Users/${user.id}/xp`).once('value').then(d => d.val()) || '0';
let level2 = await client.db.ref(`Users/${user.id}/level`).once('value').then(d => d.val()) || '0';
    let proxlvl2 = level2 + 1
    let xpproxlvl2 = proxlvl2 * 1000
    let falta2 = xpproxlvl2 - message2
await client.db.ref(`Users/${user.id}`).update({
  leftXP: falta2
})
function progressBarEnhanced(current, total, barSize) {
  const progress = Math.round((barSize*current)/total)
//🟦
  return '<:progress:875469767727804496>'.repeat(progress > 0 ? progress-1 : progress) + '' + '<:progress_left:875471052204019802>'.repeat(barSize-progress)
}
const embed = new Discord.MessageEmbed()
.setColor('#00ff0c')
.setTitle(`Informações de level`)
.setAuthor(`Level de ${user.username}`)
.setDescription(`**🗺️ |Informações Locais**\n\n${progressBarEnhanced(Number(100 - falta1), 100, 10)}\nLevel: ${level1}\nXp: ${message1}\nXp necessário para o próximo level: ${falta1}\n\n**<:b_mundo:835235915319869451> | Informações Globais**\n\nLevel: ${level2}\nXp: ${message2}\nXp necessário para o próximo level: ${falta2}`)
.setFooter(`Continue interagindo para subir de level!`)
message.respond(embed)
    }
}