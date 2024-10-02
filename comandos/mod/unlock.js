const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")

module.exports = {
    name: "unlock",
    aliases: ["desbloquear"],
    description: "Comando usado para negar permissão de usuarios enviarem mensagem no chat",
  category: 'mod',
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.respond("** Você precisa ter permissão de `Gerenciar Canais` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.respond("** Eu preciso da permissão de `Gerenciar Canais` para executar este comando**").then(m => m.delete({ timeout: 60000 }))

        message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: null
        })

        let prefix = db.get(`${message.guild.id}.prefix`)
        const embed = new MessageEmbed()
            .setAuthor(`Sistem de Modificações - ${client.user.username} - Unlock`, client.user.displayAvatarURL())
            .setDescription(`**${emoji.certo
                } Canal Desbloqueado com sucesso, utilize ${prefix}lock para bloquear o canal**`)
            .setColor("#ff0000")
            .setFooter(`Server Unlock ${message.guild.name}`, message.guild.iconURL())
        message.respond(embed)

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if (!channel) {
            return
        } else {
            const modL = new MessageEmbed()
                .setAuthor(`Sistem de Modificações - ${client.user.username} - Mod Log - Unlock`, client.user.displayAvatarURL())
                .addField("Author", `\`${message.author.tag}\``)
                .addField("Canal", `\`${message.channel.name}\``)
                .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
                .setColor("#ff0000")
                .setFooter(`Server Unlock ${message.guild.name}`, message.guild.iconURL())
            channel.send(modL)
        }



    }
}