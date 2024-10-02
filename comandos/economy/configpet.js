const Discord = require('discord.js');
const moment = require('moment-timezone');
const ms = require('parse-ms')
module.exports = {
name: 'configpet',
aliases: ['petconfig'],
category: 'economy',
run: async (client, message, args, prefix) => {
  const pet = await client.db.ref(`Users/${message.author.id}/pet`).once('value').then(r => r.val());
  const noPet = new Discord.MessageEmbed()
  .setTitle('Configurações do seu pet')
  .setColor(client.colors.embedFields)
  .addField(`Alerta`, `Você não possui um pet, reaja com ${client.controllers.emojis.download} para adquirir um, é de graça!`)
  if (pet === null) {
    const timeout = 43200000;//
    const daily = await client.db.ref(`Users/${message.author.id}/cooldown/petCreate`).once('value').then(r => r.val());
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily));

      message.respond(`Você já criou um pet hoje! Tente de novo em **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
    } else {
    let arrayPet = [
      'gato',
      'cachorro',
      'papagaio',
      'tartaruga'
    ]
    let arrayName = [
      'Duke',
      'floquinho',
      'spike',
      'jade',
      'safira',
      'lua'
    ]
    await message.respond(noPet).then(msg => {
      msg.react(client.controllers.emojis.download)
      let filtro = (reaction, user) => user.id === message.author.id;
      let coletor = msg.createReactionCollector(filtro, {time: 90000, max: 1})
      .on('collect', async (reaction, user) => {
        switch (reaction.emoji.name) {
          case 'download_Fusion':
          let arrayName2 = arrayName[Math.floor(Math.random() * arrayName.length)];
          let arrayPet2 = arrayPet[Math.floor(Math.random() * arrayPet.length)];
          let arrayFrame;
          if (arrayPet2 === 'gato') arrayFrame = 'https://twemoji.maxcdn.com/2/72x72/1f431.png';
          if (arrayPet2 === 'cachorro') arrayFrame = 'https://twemoji.maxcdn.com/2/72x72/1f436.png';
          if (arrayPet2 === 'papagaio') arrayFrame = 'https://twemoji.maxcdn.com/2/72x72/1f99c.png';
          if (arrayPet2 === 'tartaruga') arrayFrame = 'https://twemoji.maxcdn.com/2/72x72/1f422.png'
          message.channel.send(`Parabéns ${message.author}, você adquiriu um pet:\n> Informações:\nTipo: ${arrayPet2}\nNome: ${arrayName2}`)
          client.db.ref(`Users/${message.author.id}/pet`).update({
            type: arrayPet2,
            name: arrayName2,
            createdAt: Date.now(),
            frame: arrayFrame,
            hearts: 1
          })
          break;
        }
      })
    })
  }
  } else {
    const frame = await client.db.ref(`Users/${message.author.id}/pet/frame`).once('value').then(r => r.val());
    const name = await client.db.ref(`Users/${message.author.id}/pet/name`).once('value').then(r => r.val())
    const start = new Discord.MessageEmbed()
    .setTitle(`Configurações de ${name}`)
    .setThumbnail(String(frame))
    .addFields([
      {
        name: 'Mudar nome',
        value: client.controllers.emojis.status.online
      },
      {
        name: 'Excluir pet',
        value: client.controllers.emojis.delet
      }
    ])
    message.respond(start).then(msg => {
      msg.react(client.controllers.emojis.status.online)
      msg.react(client.controllers.emojis.delet)
      let filtro = (reaction, user) => user.id === message.author.id;
      let coletor = msg.createReactionCollector(filtro, { time: 90000 })
      .on('collect', async (reaction, user) => {
        switch (reaction.emoji.name) {
          case 'online_Fusion':
          message.channel.send('Qual será o novo nome do seu pet?').then(msg2 => {
            let collector = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 })
      .on('collect', async message => {
        let newName = message.content;
        client.db.ref(`Users/${message.author.id}/pet`).update({
          name: newName
        })
        message.channel.send(`Novo nome definido para ${newName}`)
      })
          })
          break;
          case 'delete_Fusion':
          let arrayDel = [
            'k0fja3',
            'hs61ba',
            '0ls33c',
            'aj3d9a'
          ]
          let arrayDel2 = arrayDel[Math.floor(Math.random() * arrayDel.length)]
          message.channel.send(`Fale ${arrayDel2} para deletar seu pet`);
          let coletor = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, { max: 1 });
          coletor.on('collect', async message => {
          if (message.content !== arrayDel2) return message.respond('Código inválido!');
          client.db.ref(`Users/${message.author.id}/cooldown`).update({
            petCreate: Date.now()
          })
          client.db.ref(`Users/${message.author.id}/pet`).remove()
          message.reply('Pet deletado com sucesso!')
          })
          break;
        }
      })
    })
  }
}
}