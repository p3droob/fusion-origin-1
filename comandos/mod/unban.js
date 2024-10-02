const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js")
const db = require("quick.db")

module.exports = {
    name: "unban",
    aliases: ["desbanir"],
    description: "Desbane um usuario",
    usage: "unban (@user id)",
  category: 'mod',
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.respond("** Você precisa ter permissão de `Banir Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.respond("** Eu preciso da permissão de `Banir Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))

        let author = message.author;

        message.guild.fetchBans().then(bans => {
            var Found = bans.find(m => m.user.id === args[0]);

            if (!args[0]) return error.noUser(message)
            if (!Found) return error.noBans(message)

            message.guild.members.unban(args[0])
            const embed = new MessageEmbed()
                .setAuthor(`Sistema De Punições - ${client.user.username} - Unban`, client.user.displayAvatarURL())
                .setColor("#FF0000")
                .addField("Punido", `<@${args[0]}>`)
                .addField("Punido ID", `${args[0]}`)
                .addField("Punido Por", `${author}`)
                .addField("Author ID", `${author.id}`)
                .addField("Data", `${message.createdAt.toLocaleString()}`)
                .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
                .setThumbnail(author.displayAvatarURL())
            message.respond(embed)
        })

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if(!channel) {
          return;
        } else {
          const modL = new MessageEmbed()
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Unban`, client.user.displayAvatarURL())
            .setColor("#FF0000")
                .addField("Punido", `<@${args[0]}>`)
                .addField("Punido Por", `${author}`)
            .addField("Data", `${message.createdAt.toLocaleString()}`)
            .setThumbnail(author.displayAvatarURL())
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
        channel.send(modL)
        }
    }
}