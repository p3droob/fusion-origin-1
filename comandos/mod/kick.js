const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js")
const db = require("quick.db")

module.exports = {
    name: "kick",
    aliases: ["expulsar"],
    description: "Server para expulsar os usuarios qu estão badernando",
    usage: "kick (@user) <motivo>",
  category: 'mod',
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.respond("** Você precisa ter permissão de `Expulsar Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.respond("** Eu preciso da permissão de `Expulsar Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))


        let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        let author = message.author;
        let motivo = args.slice(1).join(" ")

        if (!member) return error.noUser(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return error.clientPosition(message)
        if (member.id === author.id) return error.autoPunish(message)
        if (motivo.length > 1000) return error.lengthText(message)


        message.guild.member(member.id).kick(motivo || "Não Especificado")
        const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - Kick`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido ID", `\`${member.id}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Author ID", `\`${author.id}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        message.respond(embed)

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if(!channel) {
          return;
        } else {
          const modL = new MessageEmbed()
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Kick`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        channel.send(modL)
        }
    }
}