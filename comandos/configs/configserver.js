const Discord = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")

module.exports = {
  name: "configserver",
  aliases: ["configservidor", "confugurarservidor"],
  description: "Configura a entrada/saída do servidor", 
  usage: "configserver",
  category: 'configs',
  run: async (client, message, args, settings) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("MANAGE_GUILD")) return message.respond("**Você precisa ter a permissão de `Gerenciar Servidor` para executar este comando**")

const embed = new Discord.MessageEmbed()
.setTitle(`${emoji.configs}Configurações de ${message.guild.name}`)
.setDescription("> Para configurar cada opção reaja ao emoji indicado\n\n> **Welcome**\n**<a:download_Fusion:826103385623101470> | `Canal`**\n**<:b_delete:835233267640434750> | `Mensagem`**\n**<:b_link:835234866878087179> | `Autorole`**\n\n> **Saída**\n**<:b_wifi:835236250558005269> | `Canal`**\n**<:b_mundo:835235915319869451> | `Mensagem`**\n\n> **Blacklist**\n <:rei_Fusion:831121925820121118> **| `Membros`**\n** <:host_Fusion:831121757732601898> | `Canais`**\n**<:suporte_Fusion:824603708783460422> | `Prefixo`**")
.setColor("#ff0000")
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
.setThumbnail(message.guild.iconURL())
var msg = await message.respond(embed)
await msg.react("<a:download_Fusion:826103385623101470>")
await msg.react("<:b_delete:835233267640434750>")//Wm
await msg.react("<:b_link:835234866878087179>")//auto
await msg.react("<:b_wifi:835236250558005269>")//Bc
await msg.react("<:b_mundo:835235915319869451>")//Bm
await msg.react("<:rei_Fusion:831121925820121118>")//
await msg.react(["<:host_Fusion:831121757732601898>", "<:suporte_Fusion:824603708783460422>"])//

const filter = (reaction, user) => user.id === message.author.id;
    var collector = msg.createReactionCollector(filter, {
      time: 900000
    });
    collector.on("collect", async (reaction, user) => {
      switch (reaction.emoji.name) {
        case 'suporte_Fusion':
        message.channel.send("** Mencione um prefixo a ser setado**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id)
        .on("collect", async message => {
          msg.delete()
          let prefix = message.content;

    try {
      let a = await client.db.ref(`Guilds/${message.guild.id}/prefix`).once('value').then(r => r.val());

      if (prefix === a) {
        return message.channel.send(`**${emoji.errado} Este prefixo já foi escolhido nesse servidor!**`); 
     
      } else {
      client.db.ref(`Guilds/${message.guild.id}`).update({
        prefix: prefix
      });
      collector.stop()
        message.channel.send(
          `**${emoji.configs} | Prefixo escolhido para ${prefix} com sucesso!**`
        );
      }
      
    } catch (e) {
      return message.channel.send(
        `**Error - ${e.message}`);
    }
        })
    })
        break;
      case "download_Fusion":
    message.channel.send("** Mencione um canal a ser setado**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", async message => {
          msg.delete()
          let channel = message.mentions.channels.first()
//mine
 if(!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        return message.channel.send("**Eu não possuo permissão de `Enviar Mensagens` neste canal**");
       } 

    try {
      let a = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/welcome`).once('value').then(r => r.val());

      if (channel.id === a) {
        return message.channel.send(`**${emoji.errado} Este canal ja foi setado**`); 
     
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Canal de entrada setado neste Canal!**");
      client.db.ref(`Guilds/${message.guild.id}/configs/channels`).update({
        welcome: channel.id
      })
        message.channel.send(
          `**${emoji.configs} | Canal de entrada setado em ${channel} com sucesso!**`
        );
      }
      
    } catch (e) {
      return message.channel.send(
        `**Error - ${e.message}`);
    }
        })
    })
      break;
      case "b_wifi":
     message.channel.send("**<a:carregando_Fusion:824602024314273792> Mencione um canal a ser setado**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", async message => {
          msg.delete()
    let channel =
      message.mentions.channels.first()

      if(!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        return message.channel.send(`**${emoji.errado} não possuo a permissão de \`enviar mensagens\` neste canal**`);
       } 

    try {
      let a = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/leave`).once('value').then(r => r.val());

      if (channel.id === a) {
        return message.channel.send(`**${emoji.errado} Este canal ja foi setado**`); 
     
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Canal de saída setado neste canal!**");
        client.db.ref(`Guilds/${message.guild.id}/configs/channels`).update({
          leave: channel.id
        })

        message.channel.send(
          `**Canal de saída setado em ${channel}**`
        );
      }
      
 
    } catch (e) {
      return message.channel.send(`${e.message}`);
    }
        })
     })
      break;
    case "b_delete":
message.channel.send("**<a:carregando_Fusion:824602024314273792> | Diga uma mensagem de Entrada**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", async message => {
          msg.delete()

      let msg2 = message.content;

    try {
      let a = await client.db.ref(`Guilds/${message.guild.id}/configs/msg/welcome`).once('value').then(r => r.val());
       if(msg2 === a) {
       return message.channel.send(`**${emoji.errado} esta mensagem já foi setada**`);
       
      } else {
        
        client.db.ref(`Guilds/${message.guild.id}/configs/msg`).update({
          welcome: msg2
        })
        const wel = new Discord.MessageEmbed()
        .addField("Nova mensagem setada", `\`${msg2}\``)
        .setAuthor("Mensagem de entrada", message.guild.iconURL())
.setColor("GREEN")
.setFooter(`Setado por ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(wel);
      }
      
 
    } catch (e) {
      return message.channel.send(`Error - ${e.message}`)
    }

        })
})
    break;
  case "b_mundo":
message.channel.send("**<a:carregando_Fusion:824602024314273792> Mê de uma mensagem de Saída**").then(msg1 => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", async message => {
          msg1.delete()
    let msg = message.content;

    try {
      let a = await client.db.ref(`Guilds/${message.guild.id}/configs/msg/leave`).once('value').then(r => r.val());

      if (msg === a) {
        return message.channel.send(`**${emoji.errado} esta mensagem já foi setada**`); 
     
      } else {
       
        client.db.ref(`Guilds/${message.guild.id}/configs/msg`).update({
          leave: msg
        })

    const embed1 = new Discord.MessageEmbed()
    .setAuthor("Mensagem de Saída", message.guild.iconURL())
    .addField("Nova mensagem de saída setada", `\`${msg}\``)
    .setColor("GREEN")
        message.channel.send(embed1);
      }
      
 
    } catch (e) {
      return message.channel.send(`Error- ${e.message}`
      );
    }

        })
})
  break;
  case "rei_Fusion":
  message.channel.send("**<a:carregando_Fusion:824602024314273792> Mencione o(s) membro(s) que deseja adicionar à blacklist...**\n> Se for mais de um membro dê um espaço entre as menções").then(msg1 => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", async message => {
          let membros = client.functions.get.members(message.content)
  let BLchannels = await client.db.ref(`Guilds/${message.guild.id}/blacklist/members`).once('value').then(r => r.val()) || [];
  if (!message.content.includes('<@')) return message.channel.send('Mencione um usuário válido!')
  if(BLchannels.length > 30) return message.channel.send(`Este servidor já atingiu o máximo de membros na blacklist (30), remova alguns e tente novamente.`)

if(BLchannels.some(a => membros.id === a)) return message.channel.send(`Este usuário já foi adicionado`)
membros = membros.map(c => c.id)
BLchannels.push(membros)
client.db.ref(`Guilds/${message.guild.id}/blacklist`).update({
  members: BLchannels
})
message.channel.send('Membros adicionados à blacklist com sucesso!')
        })
})
  break;
  case "host_Fusion":
  message.channel.send("**<a:carregando_Fusion:824602024314273792> Mencione o(s) canal(is) que deseja adicionar à blacklist...**\n> Se for mais de um canal dê um espaço entre as menções").then(msg1 => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", async message => {
          let channel = client.functions.get.channels(message.content)
  let BLchannels = await client.db.ref(`Guilds/${message.guild.id}/blacklist/channels`).once('value').then(r => r.val());
  if (!BLchannels) BLchannels = [];
  if (!message.content.includes('<#')) return message.channel.send('Mencione um canal válido!')
  if(BLchannels.length > 30) return message.channel.send(`Este servidor já atingiu o máximo de canais na blacklist (30), remova alguns canais e tente novamente.`)

if(BLchannels.some(a => channel.id === a)) return message.channel.send(`Este canal já foi setado`)
channel = channel.map(c => c.id)
BLchannels.push(channel)
client.db.ref(`Guilds/${message.guild.id}/blacklist`).update({
  channels: BLchannels
})
message.channel.send('Canais adicionados à blacklist com sucesso!')
        })
})
  break;
  case 'b_link':
  if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("**Eu preciso da permissão de `Gerenciar Cargos` para realizar este comando**")
    message.channel.send("** Me envie um cargo para setar como Autorole**").then(msg => {
      let collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
      .on("collect", async message => {
        msg.delete()
        let role =
      message.mentions.roles.first() 

    if (!role)
      return message.channel.send("**Mencione um Cargo**")

    if(message.guild.me.roles.highest.position <= role.position) return message.channel.send("** Eu não consigo adicionar este cargo a novos membros pois ele está acima do meu cargo mais importante!**")
    try {
      let a = await client.db.ref(`Guilds/${message.guild.id}/configs/autorole`).once('value').then(r => r.val());

      if (role.id === a) {
        return message.channel.send("** Esta cargo já foi setada**"); 
     

      } else {
        
        client.db.ref(`Guilds/${message.guild.id}/configs`).update({
          autorole: role.id
        })
       const autrole = new Discord.MessageEmbed()
       .setAuthor("Autorole", message.guild.iconURL())
       .setDescription(`** Autorole setado, cargo do autorole: ${role}**`)
       .setColor("GREEN")
       .setFooter(`Autorole Setado por`, message.author.displayAvatarURL())
        message.channel.send(autrole);
      }
      
 
    } catch (e) {
      return message.channel.send(`Error- ${e.message}`);
    }

      })
    })
    break;
      }
    });
  collector.on("end", () => {
      msg.delete({timeout: 90000}).catch(console.error)
    })

  }
}