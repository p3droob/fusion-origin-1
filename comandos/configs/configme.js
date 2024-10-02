const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
module.exports = {
  name: 'configme',
  aliases: ["configautor"],
  description: 'configura você',
  usage: 'configme',
  category: 'configs',
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
.setTitle(`Configurações de ${message.author.username}`)
.setColor()
.setDescription(`Olá ${message.author} seja bem vindo às suas **configurações!**`)
.addFields([
{
name: 'Reaja com o emoji correspondente a cada configuração:',
value: '<:roxy_seta:845683865598689310> > Voltar ao menu'
},
{
  name: '> Premium',
  value: '<:rei_Fusion:831121925820121118> > Informações\n<:badges_Fusion:824605065066577976> > Escolher fundo de perfil\n<:parceiro_Fusion:826103188566179900> > Adicionar Servidor Premium\n<:not_parceiro:854313564759523369> > Remover Servidor Premium'
},
{
  name: '> Normal',
  value: '<:info_Fusion:832571072711753768> > Escolha seu gênero'
}
])
let matchvip = await client.db.ref(`Users/${message.author.id}/vip`).once('value').then(ref => ref.val());
let msg1 = await message.respond(embed1)
await msg1.react('<:roxy_seta:845683865598689310>');
await msg1.react('<:rei_Fusion:831121925820121118>');
await msg1.react('<:badges_Fusion:824605065066577976>');
await msg1.react('<:parceiro_Fusion:826103188566179900>');
await msg1.react('<:not_parceiro:854313564759523369>');
await msg1.react('<:info_Fusion:832571072711753768>');
let filtro = (reaction, user) => message.author.id === user.id;
let coletor = msg1.createReactionCollector(filtro, {
  time: 90000
})

coletor.on("collect", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case 'roxy_seta':
    msg1.edit(embed1)
    break;
    case 'rei_Fusion':
    let infovip = new Discord.MessageEmbed()
    .setTitle('Informações Premiuns')
    .addFields([
      {
        name: 'Servidores Premium',
        value: `Nesses servidores você pode adicionar uma key que vem com diversos benefícios:
        > Ao coletar o daily no servidor, você ganhará 2x mais flocos!\n
        > Esses servidores possuem um sistema adicional, de warn, que assim que o usuário alcançar determinado warn no servidor, ele receberá uma punição.`
      },
      {
        name: 'Usuários Premium',
        value: `> Usuários premium ganham 2x mais daily (3x se for em um servidor premium)\n
        > Recebem 3 keys que podem ser adicionadas à servidores`
      },
      {
        name: 'Como virar premium?',
        value: `Existem várias formas de virar premium:
        Tempo: 
        3 meses:
        Flocos: 1 milhão.
        6 meses:
        Flocos: 1.5 milhão.`
      }
    ])
    msg1.edit(infovip)
    break;
    case 'badges_Fusion':
    if (matchvip !== true) {
      message.channel.send('Você não é um usuário premium')
    } else {
      
      message.reply('Mande um link de uma imagem para ser do fundo do seu perfil').then(img1 => {
        let collector = message.channel.createMessageCollector(m => 
  m.author.id === message.author.id, {max: 1})
  .on("collect", async message => {
      let image = message.attachments.first();
      if (!image) {
        message.channel.send('insira uma imagem válida!')
  } else {
    if (!image.includes('https://')) return message.channel.send('insira um link válido!')
      message.channel.send(`Seu fundo de perfil foi alterado com sucesso!`)
      client.db.ref(`Users/${message.author.id}`).update({
        profile: image.url
      })
  }
  })
      })
    }
    break;
    case 'parceiro_Fusion':
    if (matchvip !== true) {
      message.channel.send('Você não é um usuário premium!') 
    } else {
      let keysT = await client.db.ref(`Users/${message.author.id}/keys`).once('value').then(ref => ref.val());
      if (keysT === null) return message.channel.send('Você não possui keys!')
      if (keysT === 0) return message.channel.send('Você não possui keys!')
    let already = await client.db.ref('Guilds/' + message.guild.id + '/premium').once('value').then(ref => ref.val());
    if (already === true) {
      message.channel.send('Esse servidor já possui uma key!')
    } else {
    await client.db.ref('Guilds/' + message.guild.id).update({
      premium: true
    })
    await client.db.ref('Users/' + message.author.id).update({
      keys: Number(keysT) - Number(1)
    })
    let keyLeft = await client.db.ref('Users/' + message.author.id + '/keys').once('value').then(ref => ref.val());
    await client.db.ref(`Guilds/${message.guild.id}`).update({
      key: message.author.id
    })
    message.channel.send(`Você adicionou esse servidor aos servidores premium!\n> Keys restantes: ${keyLeft}`)
    moment.locale('pt-br')
    let gDcalc = Number(Date.now()) + Number(26280000000)
    let gD = client.guilds.cache.get('812266828196741121').channels.cache.get('859555943644397639').send(`${message.author} (${message.author.id}) adicionou uma key à ${message.guild.name} (${message.guild.id}) às ${Number(Date.now())}, acaba em ${gDcalc}\n${moment(Number(Date.now())).format('L')} `)
    }
    }
    break;
    case 'not_parceiro':

      if (message.guild.owner.user.id !== message.author.id) {
      message.reply('Você não é o dono deste servidor!')
    } else {
      let already = await client.db.ref('Guilds/' + message.guild.id + '/premium').once('value').then(ref => ref.val());
      if (already === (0 || null)) {
        message.reply('Esse servidor não possui keys!')
      } else {
        let qm = await client.db.ref(`Guilds/${message.guild.id}/key`).once('value').then(y => y.val());
        let totalk = await client.db.ref(`Users/${qm}/keys`).once('value').then(ref => ref.val());
        await client.db.ref(`Users/${qm}`).update({
          keys: Number(totalk) + Number(1)
        })
        await client.db.ref('Guilds/' + message.guild.id + '/premium').remove()
        await client.db.ref('Guilds/' + message.guild.id + '/key').remove()
        message.channel.send(`Você removeu a key deste servidor, agora ele não é mais um servidor premium\nQuem adicionou a key foi ${qm}, ele já foi reembolsado!`)
    let gDcalc = Number(Date.now()) + Number(26280000000)
    let gD = client.guilds.cache.get('812266828196741121').channels.cache.get('859555943644397639').send(`${message.author} (${message.author.id}) removeu a key de ${message.guild.name} (${message.guild.id}) às ${Number(Date.now())}, acaba e ${gDcalc}\n${moment(Number(Date.now())).format('L')} `)
    }
    }
    break;//♀️🌈♂️
    case 'info_Fusion':
    message.channel.send('Fale de acordo com o seu gênero:\n1 > Feminino\n2 ️> Masculino\n3 > Não-binário').then(msg5 => {
            let collector = message.channel.createMessageCollector(m => 
  m.author.id === message.author.id, {max: 1})
  .on("collect", async message => {
      let tempo = message.content;
      if (isNaN(tempo)) return message.channel.send('Insira um número (1 ou 2 ou 3)!')
      if (tempo.length > 1) return message.channel.send('Insira apenas 1 número')
      if (Number(tempo) > 3) return message.channel.send('Insira um número não maior que 3')
      let gender1;
      if (tempo == '1') gender1 = 'feminino';
      if (tempo == '2') gender1 = 'masculino'
      if (tempo == '3') gender1 = 'não-binário'
      message.channel.send('Seu gênero foi alterado com sucesso para ' + gender1)
      await client.db.ref(`Users/${message.author.id}`).update({
        gender: gender1.replace(/'/gi, '').replace(/"/gi, '')
      })
  })
    })
    break;
  }
})
}
}