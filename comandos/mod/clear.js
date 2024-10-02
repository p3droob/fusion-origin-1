const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const db = require("quick.db")

module.exports = {
  name: "clear",
  aliases: ["limpar", "purge"],
  description: "Deleta uma quantia de mensagens setadas",
  usage: "clear (quantia)",
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.respond(`${emoji.errado} **Você precisa da permissão de \`Gerenciar Mensagens\` para executar este comando**`).then(m => m.delete({ timeout: 60000 }))
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.respond(`${emoji.errado} **Eu preciso da permissão de \`Gerenciar Mensagens\` para executar este comando**`).then(m => m.delete({ timeout: 60000 }))
    if (message.content.includes(" -")) return error.negativeNumber(message)
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 0 || deleteCount > 99)
      return error.clearLength(message)

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1
    });
    message.channel.bulkDelete(fetched);

    message.channel.bulkDelete(fetched);
    const embed = new MessageEmbed()
      .setAuthor(`Sistema de Delete - ${client.user.username} - Clear`, client.user.displayAvatarURL())
      .setDescription(`**${emoji.certo
        } Foram apagadas \`${args[0]}\` mensagens deste canal com sucesso**`)
      .setColor("#ff0000")
      .setFooter(`Channel Clear ${message.guild.name}`, message.guild.iconURL())
    message.channel.send(embed)

    let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
    if(!channel) {
      return
    } else {
      const modL = new MessageEmbed()
      .setAuthor(`Sistema de Delete - ${client.user.username} - Mod Log - Clear`, client.user.displayAvatarURL())
      .addField("Author", `\`${message.author.tag}\``)
      .addField("Canal", `\`${message.channel.name}\``)
      .addField("Quantia", `\`${args[0]}\``)
      .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
      .setColor("#ff0000")
       .setFooter(`Channel bulk Delete ${message.guild.name}`, message.guild.iconURL())
       channel.send(modL)
    }

  }
}