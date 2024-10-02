const Discord = require('discord.js');

module.exports = {
  name: 'shop',
  aliases: ['loja'],
  category: 'economy',
  run: async (client, message, args) => {
    const { guild } = message
  const icon = guild.iconURL()
  const comandos = new Discord.MessageEmbed()
  .setColor('#000001')
  .setThumbnail(icon)
  .setTitle('Minha loja')
  .setDescription(`Olá ${message.author}, **Bem vindo a minha lojinha** \n\n <:y_cat_blz:852689369596559410> <a:setaFusion:816816386843738162> **Usuários Premium\n\n <a:nitro_log:852689676740984872> <a:setaFusion:816816386843738162> Key\n 🏹 <a:setaFusion:816816386843738162> Arco de caça**`)
  .setTimestamp()
  .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({Size: 32}))

  const msg1 = await message.respond(comandos)
await msg1.react('<:y_cat_blz:852689369596559410>')
await msg1.react('<a:nitro_log:852689676740984872>')
await msg1.react('🏹')
    let filtro = (reaction, user) => message.author.id === user.id;
    const coletor = msg1.createReactionCollector(filtro, {time: 90000});

coletor.on('collect', async (rection, user) => {
  switch (rection.emoji.name) {
    case 'y_cat_blz':
    let embed = new Discord.MessageEmbed()
      .setColor('#000001')
  .setThumbnail(icon)
  .setTitle('Premium')
  .addFields(
    [
      {
        name: 'Premium 3 meses | código de compra: premium 3',
        value: '> Benefícios:\nUsuários premium ganham 2x mais daily (3x se for em um servidor premium)\nRecebem 3 keys que podem ser adicionadas à servidores (Os benefícios estão no emoji <a:nitro_log:852689676740984872>)\n> Valor:\n1  milhão de flocos'
      },
      {
        name: 'Premium 6 meses | código de compra: premium 6',
        value: 'Mesmos benefícios, mas vem com 4 keys.\n> Valor:\n 1 milhão e quinhentos mil de flocos'
      }
    ]
  )
  .setTimestamp()
  .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({Size: 32}))
    msg1.edit(embed)
    break;
    case 'nitro_log':
    let embed1 = new Discord.MessageEmbed()
      .setColor('#000001')
  .setThumbnail(icon)
  .setTitle('Premium')
  .addFields(
    [
      {
        name: 'Key | código de compra: key',
        value: '> Benefícios:\nAo coletar o daily num servidor com key (servidor premium), você ganhará 2x mais flocos!\nEsses servidores possuem sistemas adicionais,:\n> Warn, que assim que o usuário alcançar determinado warn no servidor, ele receberá uma punição.\n> Tópico, que a cada entrada de membro, atualiza o tópico dos canais definidos para a quantidade de membros no servidor\nValor: 60000 flocos'
      }
    ]
  )
  .setTimestamp()
  .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({Size: 32}))
  msg1.edit(embed1)
    break;
    case '🏹':
    let embedBow = new Discord.MessageEmbed()
    .setColor('#000001')
  .setThumbnail(icon)
  .setTitle('Premium')
  .addFields(
    [
      {
        name: 'Arco de caça | código de compra: arco',
        value: '> Benefícios:\nApós a compra será possível caçar!\nValor: 20000 flocos '
      }
    ]
  )
  .setTimestamp()
  .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({Size: 32}))
  msg1.edit(embedBow)
    break;
  }
})
}
}