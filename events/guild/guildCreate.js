const Discord = require("discord.js");
module.exports = async (client, guild) => {

const channel = client.channels.cache.get("837031058393268244");
let owner = guild.owner;

  const msg = new Discord.MessageEmbed()
    .setColor('#00BFFF')
    .setTitle(`${client.user.username} está em um novo servidor.`)
     .setDescription(`**Nome: \`${guild.name}\`\nID: \`${guild.id}\`\nMembros: \`${guild.memberCount}\`\nTotal de servidores: \`${client.guilds.cache.size}\`\nDono \`${owner.user.tag}\`**`)
    .setTimestamp()
  channel.send(msg);
}