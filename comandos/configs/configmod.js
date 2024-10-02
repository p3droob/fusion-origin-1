const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "configmod",
  aliases: ["servermod", "configmods", "modsconfig"],
  description: "Configura os canais com reações",
  usage: "desativar",
  category: 'configs',
  run: async (client, message, args, prefix) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("MANAGE_GUILD")) return message.respond("**Você precisa ter a permissão de `Gerenciar Servidor` para executar este comando**");


const embed = new Discord.MessageEmbed()
.setTitle(`Configurações de ${message.guild.name}`) 
.setThumbnail(message.guild.iconURL())
.setColor("#ff00c1")
.setFooter(`Para saber os placeholders use ${prefix}placeholders`)
.setDescription("> Para configurar cada opção basta reagir ao emoji da categoria indicada\n\n> **Canais**\n **<:suporte_Fusion:824603708783460422> <a:setaFusion:816816386843738162> `Mod Logs`**\n**<:b_wifi:835236250558005269> <a:setaFusion:816816386843738162> `Level Up`**\n\n**Desativar**\n<:b_delete:835233267640434750> **<a:setaFusion:816816386843738162> `Level Up`**\n**<:delete_Fusion:824604387099934782> <a:setaFusion:816816386843738162> `Mod Log`**")
var msgs = await message.respond(embed)
await msgs.react("<:suporte_Fusion:824603708783460422>")
await msgs.react("<:b_wifi:835236250558005269>");
await msgs.react("<:b_delete:835233267640434750>");
await msgs.react("<:delete_Fusion:824604387099934782>");

const filter = (reaction, user) => user.id === message.author.id;
    var collector = msgs.createReactionCollector(filter, {
      time: 900000
    });
    collector.on("collect", async (reaction, user) => {
      const member = message.guild.member(user);
      switch (reaction.emoji.name) {
        case "b_delete":
        client.db.ref(`Guilds/${message.guild.id}/sistems`).update({
          level: false
          })
        message.channel.send("**Sistema de Level Up Desativado**")
        break;
        case "delete_Fusion":
    db.delete(`cMod_${message.guild.id}`)
    message.channel.send("**Sistema de Mod Log desativado**")
        break;
        case "suporte_Fusion":
    message.channel.send("**<a:carregando_Fusion:824602024314273792> Mencione um canal para ser o canal de Punições**").then(msg => {
     let collector = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 })
  .on("collect", message => {
    msg.delete()
      let channel =
      message.mentions.channels.first() 

    if (!channel)
      return message.channel.send( "**Mencione um canal**")

       if(!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        return message.channel.send("**Eu não possuo permissão de `Enviar Mensagens` neste canal**");
       } 

    try {
      let a = db.get(`cMod_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send("**Este canal já foi setado**"); 
     
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Mod Logs setado neste Canal!**");
        db.set(`cMod_${message.guild.id}`, channel.id);

        message.channel.send(
          `**Canal de Mod Logs setado em ${channel}**`
        );
      }
      
 
    } catch (e) {
      return message.channel.send(`Error`);
    }
  })
    })
        break;
  case "b_wifi":
 message.channel.send("**<a:carregando_Fusion:824602024314273792> Mencione um canal para ser o canal de level up**").then(msg => {
   let collector = message.channel.createMessageCollector(m => 
   m.author.id === message.author.id, {max: 1})
   .on("collect", async message => {
     msg.delete()
           let channel =
      message.mentions.channels.first() 

    if (!channel)
      return message.channel.send( "**Mencione um canal**")

       if(!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        return message.channel.send("**Eu não possuo permissão de `Enviar Mensagens` neste canal**");
       } 

      let a = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/levelup`).once('value').then(r => r.val())

      if (channel.id === a) {
        return message.channel.send("**Este canal já foi setado**"); 
     
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Canal de Level Up setado neste Canal!**");
        client.db.ref(`Guilds/${message.guild.id}/configs/channels`).update({
          levelup: channel.id
        })

        message.channel.send(`**Canal de level up setado em ${channel}**`);
      }
      
 
    
   })
 })
  break;
    
      }
    })
collector.on("end", () => {
      msgs.delete({timeout: 90000}).catch(console.error)
    })
  }
}