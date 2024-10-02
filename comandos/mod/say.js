const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "say",
    aliases: ["falar"],
    description: "O client fala por você",
    usage: "say (mensage)",
  category: 'mod',
    run: async (client, message, args) => {
       if(!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
       if (!message.member.hasPermission(['MENTION_EVERYONE'])) return message.respond('Você não possui a permissão de `Mencionar everyone`!')
       let say = args.join(" ")
       let author = message.author;
       if(!say) return error.noContent(message)
      if (say.length > 1000) return error.lengthText(message)
      
      
      message.respond(`${say}\n\nAutor: ${author}`)

    }
}