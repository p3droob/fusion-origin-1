const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")

module.exports = {
  name: "desativar",
  aliases: ["configoff"],
  description: "Feito para desativar as configurações do servidor!",
  usage: "desativar",
  category: 'configs',
  run: async (client, message, args) => {
if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("ADMINISTRATOR")) return message.respond(`**${emoji.errado} |Você precisa da permissão de \`Administrador\` para realizar este comando**`)


const embed = new MessageEmbed()
.setTitle(`<:configurar_Fusion:824604269029752832> Config off ${message.guild.name}`)
.setDescription("Para desativar cada opção basta reagir ao emoji indicado:\n\n**<a:download_Fusion:826103385623101470> <a:setaFusion:816816386843738162> `Entrada`**\n**<:b_delete:835233267640434750> <a:setaFusion:816816386843738162> `Saída`**\n**<:b_link:835234866878087179> <a:setaFusion:816816386843738162> `Level Up`**\n**<:c:835236250558005269> <a:setaFusion:816816386843738162> `Mod Log`**\n** <:rei_Fusion:831121925820121118> <a:setaFusion:816816386843738162> `Prefixo`**\n**<:host_Fusion:831121757732601898> <a:setaFusion:816816386843738162> `AutoRole`**\n\n**<:info_Fusion:832571072711753768> <a:setaFusion:816816386843738162> `Blacklist (canais)`**")
.setColor("BLACK")
.setThumbnail(message.guild.iconURL())
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
var msg = await message.respond(embed)
await msg.react("<a:download_Fusion:826103385623101470>")
await msg.react("<:b_delete:835233267640434750>")
await msg.react("<:b_link:835234866878087179>")
await msg.react("<:b_wifi:835236250558005269>")
await msg.react("<:rei_Fusion:831121925820121118>")
await msg.react("<:host_Fusion:831121757732601898>")
await msg.react('<:info_Fusion:832571072711753768>')

const filtro = (reacao, usuario) => usuario.id === message.author.id
const coletor = msg.createReactionCollector(filtro, {
  time: 90000
})

coletor.on("collect", async (reacao, usuario) => {
  switch (reacao.emoji.name) {
    case 'info_Fusion':
    client.db.ref(`Guilds/${message.guild.id}/blacklist/channels`).remove()
    message.channel.send('Sistema de Blacklist de canais desativado com sucesso!')
    break;
case "download_Fusion":
db.delete(`welcome_${message.guild.id}`)
db.delete(`welmsg_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Entrada desativado com sucesso!**`)
break;
case "b_delete":
db.delete(`bye_${message.guild.id}`)
db.delete(`byemsg_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Saída desativado com sucesso!**`)
break;
case "b_link":
client.db.ref(`Guilds/${message.guild.id}/sistems`).update({
level: false
})
message.channel.send(`${emoji.certo} **Sistema de Level Up desativado com sucesso!**`)
break;
case "b_wifi":
db.delete(`cMod_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Logs desativado com sucesso!**`)
break;
case "rei_Fusion":
client.db.ref(`Guilds/${message.guild.id}/prefix`).remove()
message.channel.send(`${emoji.certo} **Prefixo resetado com sucesso!**`)
break;
case "host_Fusion":
client.db.ref(`Guilds/${message.guild.id}/configs/autorole`).remove()
message.channel.send(`${emoji.certo} **Sistema de Autorole desativado com sucesso!**`)
break;

  }
})

coletor.on("end", () => {
      msg.delete({timeout: 90000}).catch(console.error)
    })

  }
}