const Discord = require("discord.js")
module.exports = {
  name: 'ping',
  description: 'Ping!',
  aliases: ['pong'],
  category: 'info',
  run: async (client, message, args) => {
let pingStart = process.hrtime()
await client.db.ref(`Users/${message.author.id}/flocos`).once('value').then(r => r.val());
let pingStop = process.hrtime(pingStart)

let pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6)
const embed = new Discord.MessageEmbed()
.setTitle('Ping!')
.setColor(client.colors.embedDesc)
.setDescription(`<a:ping_Fusion:824604322981085184> **| Porta de entrada:** **${Date.now() - message.createdTimestamp}ms**\n<:user_bot:861065839637168180> **| Latência da API :** **${Math.round(
      client.ws.ping,
      )}ms**\n<:firebase:861064379608858625> **| Latência da Firebase: ${pingDb} ms**`)
    message.respond(embed);
  },

};