const Discord = require("discord.js")
const db = require('quick.db')

module.exports = {
  name: "info",
  aliases: ["infocmd"],
  description: "Mostra as informações de todos os comandos",
  usage: "info (comando)",
  category: 'info',
  run: async (client, message, args, prefix) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)


    const name = args[0];
    if (!name) return message.channel.send("Você deve enviar um comando")

    const comando = client.commands.get(name) || client.commands.get(client.aliases.get(name))

    if (!comando) return message.channel.send("**Não encontrei este comando!**")

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Informações do comando ${name}`, client.user.displayAvatarURL())
      .addFields(
        {
          name: `Nome do comando`,
          value: `\`${name}\``,
        }
      )
      .addFields(
        {
          name: "Aliases",
          value: `\`${comando.aliases.join(", ") || "Nenhum"}\``,
        }
      )
      .addFields(
        {
          name: "Descrição",
          value: `\`${comando.description || "Nenhum"}\``,
        }
      )
      .addFields(
        {
          name: "Modo de uso",
          value: `\`${prefix}${comando.usage || "Nenhum"}\``,
        }
      )
      .addFields(
        {
          name: "Cooldown",
          value: `\`${comando.cooldown || "3"}\``,
        }
      )

      .setColor("#ff0000")
      .setThumbnail(message.guild.iconURL())
    message.respond(embed)

  }
}