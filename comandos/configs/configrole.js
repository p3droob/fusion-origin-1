const Discord = require('discord.js');
const db = require('quick.db');
const error = require('../../utils/errors.js');
module.exports = {
  name: 'configrole',
  aliases: ['configurarrole'],
  description: 'configure um cargo',
  usage: 'configrole <cargo>',
  category: 'configs',
  run: async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.respond("** Você precisa ter permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.respond("** Eu preciso da permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!args[0]) return message.respond(`Especifique um cargo para ser configurado`);
        if (!role) return message.respond(`Especifique um cargo válido!`);
        if (role.position >= message.member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= role.position) return error.clientPosition(message)//quote

    let emoji1 = '<a:carregando_Fusion:824602024314273792>'
    const configurar = new Discord.MessageEmbed()
    .setTitle('Configurar ' + role.name)
    .setDescription(`> Clique no emoji referente a cada configuração:\n\n<:suporte_Fusion:824603708783460422> > Nome\n<:pasta_Fusion:831539225160843274> > Cor\n\n**> Mencionável:**\n<:sim_Fusion:824604719145287722> > Sim\n<:erro_Fusion:824604753388503121> > Não\n\n> <:b_wifi:835236250558005269> > Posição\n> Exibir este cargo separadamento dos outros?\n✅ > Sim\n❌ > Não\n<:membros_Fusion:831537357953302559> > Permissões`);
    if (role) {
      let msg1 = await message.respond(configurar)
      await msg1.react('<:suporte_Fusion:824603708783460422>')
      await msg1.react('<:pasta_Fusion:831539225160843274>')
      await msg1.react('<:sim_Fusion:824604719145287722>')
      await msg1.react('<:erro_Fusion:824604753388503121>')
      await msg1.react('<:b_wifi:835236250558005269>')
      await msg1.react('✅')
      await msg1.react('❌')

      const filter = (reaction, user) => user.id === message.author.id;
    let collector = msg1.createReactionCollector(filter, {
      time: 900000
    });
    collector.on("collect", (reaction, user) => {
      const member = message.guild.member(user);
      switch (reaction.emoji.name) {
        case 'suporte_Fusion':
        message.channel.send(`${emoji1} Diga um nome para ser do \`${role.name}\``).then(msg => {
     let collector = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 })
  .on("collect", message => {
    msg.delete()
    let a = message.content
    role.edit({name: `${a}`})
    message.channel.send(`O nome do cargo foi definido para \`${a}\``)
  })
        })
        break;

        case 'pasta_Fusion':
                message.channel.send(`${emoji1} Diga uma cor em hex para ser do \`${role.name}\`\n> Lembre-se a cor deve conter um # antes, exemplo: #ff0000`).then(msg => {
     let collector = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 })
  .on("collect", message => {
    msg.delete()
    let a = message.content
    if (!message.content.includes('#')) {
      return message.respond('Inclua "#" à sua mensagem!')
    }
    role.setColor(`${a}`)
    message.channel.send(`A cor do cargo foi definida com sucesso para \`${a}\``)

  })
                })
              break;
              case 'sim_Fusion':
              role.setMentionable(true)
              message.channel.send('O cargo agora é mencionável para todos!')
              break;
              case 'erro_Fusion':
              role.setMentionable(false)
              message.channel.send(`O cargo agora não é mais mencionavel para todos!`)
              break;
              case 'b_wifi':
              message.channel.send(`${emoji1} Diga um número de acordo com a ordem de todos os cargos.`).then(msg => {
     let collector = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 })
  .on("collect", message => {
    msg.delete()
    let a = message.content
    let b = message.guild.roles.cache.size - a
    role.setPosition(`${b}`)
    message.channel.send(`Agora o cargo está na posição \`${a}\``)

  })
                })
              break;
              case '✅':
              role.setHoist(true)
              message.channel.send(`O cargo agora é exibido separadamente dos outros!`)
              break;
              case '❌':
              role.setHoist(false)
              message.channel.send(`O cargo agora não é mais exibido separadamente dos outros!`)
              break;
        }
      })
    }
  }
}