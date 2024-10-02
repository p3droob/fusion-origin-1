const Discord = require("discord.js");
const os = require('os')
 
module.exports = {
  name: 'botinfo',
  aliases: ["binfo", "bi"],
  usage: 'botinfo',
  description: 'mostra informações sobre mim',
  category: 'info',
  run: async (client, message, args) => {
    let modelo = os.cpus().map((i) => `${i.model}`)[0]
    let mydev = client.users.cache.get('753252894974804068')
        const { readdirSync } = require('fs');

const categories = readdirSync('comandos');

let commands = 0;
categories.forEach(c => commands += readdirSync(`comandos/${c}`).length);
let totaldev2 = readdirSync('comandos/dev').length
let total2cmd = commands - totaldev2
const utilCmd = await client.db.ref(`comandos`).once('value').then(r => r.val());
    const embed = new client.embed(message.author)
    .setTitle(`Minhas Informações`)
    .setTimestamp()
    .addFields([
      {
        name: '<:developer_Fusion:824604428140019743> Desenvolvedor',
        value: `${mydev.tag}`
      },
      {
        name: `${client.controllers.emojis.dbl} Top.gg`,
        value: `https://fusion-support.glitch.me/upvote`
      },
      {
        name: 'Servidor de suporte',
        value: 'https://discord.gg/AxcQf5Pf58'
      },
      {
        name: `${client.controllers.emojis.servidor} Site`,
        value: 'https://fusion-support.glitch.me/'
      },
      {
        name: `<:logo_github:875840748547866645> Github`,
        value: `https://github.com/FrozenFireBR/Fusion`
      },
      {
        name: `${client.controllers.emojis.list} Servidores`,
        value: client.guilds.cache.size
      },
      {
        name: `<:membros_Fusion:831537357953302559> Usuários`,
        value: client.users.cache.size
      },
      {
        name: '<:canal_Fusion:831537857554284604> Canais',
        value: client.channels.cache.size
      },
      {
        name: 'Comandos',
        value: total2cmd
      },
      {
        name: 'Comandos utilizados',
        value: utilCmd
      },
      {
        name: `<:configurar_Fusion:824604269029752832> Estatísticas`,
        value: `<:node_js:831119656537555024> Node: \`${process.version}\`\nCPU: \`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}/100%\`\nMemória RAM: \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\`\nProcessador: \`${modelo}\``
      }
    ])

    message.respond(embed);
}
}