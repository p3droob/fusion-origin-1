const {readdirSync} = require('fs');
const Discord = require('discord.js')
module.exports = {
  name:"reload",
  category:"dev",
  aliases: ['rld'],
  run: async (client, message, args) => {
    try {
    if (message.author.id !== '753252894974804068') return message.channel.send('apenas meu dev')
        
              delete require.cache[require.resolve(`../../comandos/${args[0]}/${args[1]}.js`)]
      const pull = require(`../../comandos/${args[0]}/${args[1]}.js`)
      client.commands.set(args[1], pull)
      message.channel.send('comando ok')
    } catch (e) {
      message.channel.send(e.stack)
    }
  }
}
