const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const db = require("quick.db")

module.exports = {
    name: "slowmode",
    aliases: ["modolento", "cooldown"],
    description: "Muda o cooldown do chat",
    usage: "slowmode (tempo)",
  category: 'mod',
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.respond("** Você precisa ter permissão de `Gerenciar Canais` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.respond("**<:errado:824911072384647178> Eu preciso da permissão de `Gerenciar Canais` para executar este comando**").then(m => m.delete({ timeout: 60000 }))

        let tempo = args[0]


        if (!tempo) return error.isNaN(message)
        if (isNaN(tempo)) return error.isNaN(message)
        if (tempo.length > 2048) return error.lengthNumber(message)
        if (message.content.includes(" -")) return error.negativeNumber(message)

        message.channel.setRateLimitPerUser(tempo)
        const embed = new MessageEmbed()
            .setAuthor(`Sistema de Modificações - ${client.user.username} - SlowMode`, client.user.displayAvatarURL())
            .setDescription(`**${emoji.certo
                } Cooldown deste canal atualizado, Atualizado para ${tempo} Segundos**`)
            .setColor("#ff0000")
            .setFooter(`Server Cooldwon ${message.guild.name}`, message.guild.iconURL())
        message.respond(embed)

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
if(!channel) {
  return
} else {
  const modL = new MessageEmbed()
  .setAuthor(`Sistem de Modificações - ${client.user.username} - Mod Log - SlowMode`, client.user.displayAvatarURL())
  .addField("Author", `\`${message.author.tag}\``)
  .addField("Canal", `\`${message.channel.name}\``)
  .addField("Cooldown", `\`${tempo}\``)
  .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
  .setColor("#ff0000")
   .setFooter(`Server Cooldwon ${message.guild.name}`, message.guild.iconURL())
   channel.send(modL)
}

    }
}