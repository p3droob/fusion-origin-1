const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js");
const db = require("quick.db")

module.exports = {
    name: "ban",
    aliases: ["banir", "hackban", "forceban"],
    description: "Serve para punir os usuarios que quebraram as regras do seu servidor, eles saem e nunca mais podem voltar, a não ser que você dê unban",
    usage: "<prefix>ban (@user) <motivo>",
  category: 'mod',
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.respond("** Você precisa ter permissão de `Banir Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.respond("** Eu preciso da permissão de `Banir Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))

        let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        let author = message.author;
        let motivo = args.slice(1).join(" ")

        if (!member) return error.noUser(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return error.clientPosition(message)
        if (member.id === author.id) return error.autoPunish(message)
        if (motivo.length > 1000) return error.lengthText(message)

        message.guild.members.ban(member.id)
        const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - Ban`, client.user.displayAvatarURL())
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
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Ban`, client.user.displayAvatarURL())
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