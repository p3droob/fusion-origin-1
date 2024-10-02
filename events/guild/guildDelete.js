const Discord = require("discord.js")
module.exports = async (client, guild, db) => {

var channel = client.channels.cache.get("837031142947291176");
await client.db.ref('Guilds/' + guild.id).remove();
  const msg = new Discord.MessageEmbed()
    .setColor('#00BFFF')
    .setTitle(`${client.user.username} foi retirado de um servidor.`)
    .setDescription(`**Nome: \`${guild.name}\`\nID: \`${guild.id}\`\nMembros: \`${guild.memberCount}\`\nTotal de servidores: \`${client.guilds.cache.size}\`**`)
    .setTimestamp()
  channel.send(msg);

}