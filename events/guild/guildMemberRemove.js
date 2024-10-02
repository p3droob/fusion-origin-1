const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (client, member) => {
let prefix = await client.db.ref(`Guilds/${member.guild.id}/prefix`).once('value').then(r => r.val()) || '..';

const getGuild = await client.db.ref(`Guilds/${member.guild.id}`).once('value').then(r => r.val()) || {};
if (getGuild.premium) {
  if (getGuild.badge) {
    let getB = await client.db.ref(`Users/${member.user.id}/badges`).once('value').then(r => r.val()) || [];
    let getIndex = getB.indexOf(getGuild.badge);
    getB.splice(getIndex, 1)
    client.db.ref(`Users/${member.user.id}/badges`).set(getB)
  }
}
let canalToSend = await client.db.ref(`Guilds/${member.guild.id}/configs/channels/leave`).once('value').then(r => r.val());
if (canalToSend === null) return;
let canalGet = await member.guild.channels.cache.get(canalToSend);
if (!canalGet.permissionsFor(client.user.id).has('SEND_MESSAGES')) return;
if (!canalGet.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return;
 let canal = await member.guild.channels.cache.get(canalToSend)
  if(canal) {
  let msg = await client.db.ref(`Guilds/${member.guild.id}/configs/msg/leave`).once('value').then(r => r.val()) || `${member.user.username} saiu do servidor `
  
   canal.send(msg.replace("{member:username}", `${member.user.username}`).replace("{member:id}", `${member.id}`).replace("{member:count}", `${member.guild.memberCount}`).replace("{member:mention}", `${member}`).replace("{guild:name}", `${member.guild.name}`))
  } else {
    return;
  }
}