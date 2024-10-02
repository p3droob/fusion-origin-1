const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require('moment-timezone');
module.exports = {
  name: 'rinhadepet',
  category: 'economy',
  run: async (client, message, args, prefix) => {
    let atmAuthor = await client.db.ref(`Users/${message.author.id}/flocos`).once('value').then(r => r.val());
    let petAuthorFrame = await client.db.ref(`Users/${message.author.id}/pet/frame`).once('value').then(r => r.val());
    let frameEmoji;
    if (petAuthorFrame === 'https://twemoji.maxcdn.com/2/72x72/1f431.png') frameEmoji = '🐱';
    if (petAuthorFrame === 'https://twemoji.maxcdn.com/2/72x72/1f436.png') frameEmoji = '🐶';
    if (petAuthorFrame === 'https://twemoji.maxcdn.com/2/72x72/1f99c.png') frameEmoji = '🦜';
    if (petAuthorFrame === 'https://twemoji.maxcdn.com/2/72x72/1f422.png') frameEmoji = '🐢';
    let petAuthor = await client.db.ref(`Users/${message.author.id}/pet`).once('value').then(r => r.val());
    if (!args[0]) return message.respond('Insira um valor para apostar na rinha de pets!');
    let quantia = args[0].replace('k', '000').replace('m', '000000').replace('kk', '000000')
    
    if(petAuthor === null) return message.respond('Você não possui um pet!')
    if (isNaN(quantia)) return message.respond('Insira um valor válido para apostar na rinha de pets!')
    if (quantia <= 0) return message.respond('Você não pode apostar 0 flocos!')
    if (quantia.includes('.')) return message.respond('Você não pode apostar flocos negativos!')
    if (atmAuthor < quantia) return message.respond('Você não possui todo esses flocos!')
    let time = 60;
    const start = new client.embed(message.author)
    .setTitle(client.controllers.emojis.aviso + ' | Rinha de pets')
    .setDescription(`**<:blue_cofre:842845221619761152> | Prêmio:** \`${quantia}\`\n\n**Como participar:** Reaja com 🐔, mas lembre-se você deve possui um pet! A partida começará em ${time} segundos ou quando houver 20 jogadores. Caso não tenha um, adote usando ${prefix}configpet.`)
    .addFields([
      {
        name: '**Jogadores(1):**',
        value: `${frameEmoji}: ${message.author}`
      }
    ])
    const msg = await message.respond(start)
    await msg.react('🐔')
    let filter = (reaction, user) => user.id !== client.user.id;
    var arrayUsers = [];
    const coletor = msg.createReactionCollector(filter, { time: 60000, max: 20 })
    .on('collect', async (reaction, user) => {
      switch (reaction.emoji.name) {
        case '🐔':
        if (user.bot) return;
        let verifyPet = await client.db.ref(`Users/${user.id}/pet`).once('value').then(r => r.val());
        let verifyAtm = await client.db.ref(`Users/${user.id}/flocos`).once('value').then(r => r.val());
        if (verifyAtm < quantia) return;
        if (verifyPet === null) return;
        
        if (user.id === message.author.id) return;
        if (arrayUsers.includes(user.id)) return;
        arrayUsers.push(user.id);
        const usersmap = await Promise.all(arrayUsers.map(async (e) => {
          let arrayUserFrame = await client.db.ref('Users/' + e + '/pet/frame').once('value').then(r => r.val());
          if (arrayUserFrame === 'https://twemoji.maxcdn.com/2/72x72/1f431.png') arrayUserFrameEmoji = '🐱';
    if (arrayUserFrame === 'https://twemoji.maxcdn.com/2/72x72/1f436.png') arrayUserFrameEmoji = '🐶';
    if (arrayUserFrame === 'https://twemoji.maxcdn.com/2/72x72/1f99c.png') arrayUserFrameEmoji = '🦜';
    if (arrayUserFrame === 'https://twemoji.maxcdn.com/2/72x72/1f422.png') arrayUserFrameEmoji = '🐢';
          return arrayUserFrameEmoji + `: <@${e}>\n`}))
        const embed2 = new client.embed(message.author)
        .setTitle(client.controllers.emojis.aviso + ' **| Rinha de pets**')
    .setDescription(`**<:blue_cofre:842845221619761152> | Prêmio:** \`${quantia}\`\n\n> **Para participar:** Reaja com 🐔, mas lembre-se você deve possui um pet! A partida começará em ${time} segundos ou quando houver 20 jogadores. Caso não tenha um, adote usando ${prefix}configpet.`)
    .addFields([
      {
        name: `**Jogadores (${arrayUsers.length + 1}) :**`,
        value: `${frameEmoji}: ${message.author}\n${usersmap}`
      }
    ])
        msg.edit(embed2)
        break;
      }
    })
    setTimeout(async () => {
      coletor.on('end', () => {
        
      })
      arrayUsers.push(message.author.id);
      if (arrayUsers.length <= 1) return message.channel.send(`**${message.author} a sua rinha foi cancelada pois ninguém reagiu, chame mais amigos e tente de novo😉**`);
      let winner = arrayUsers[Math.floor(Math.random() * arrayUsers.length)]
      const winnerPetFrame = await client.db.ref(`Users/${winner}/pet/frame`).once('value').then(r => r.val());
      let winnerPetFrame2;
      if (winnerPetFrame === 'https://twemoji.maxcdn.com/2/72x72/1f431.png') winnerPetFrame2 = '🐱';
    if (winnerPetFrame === 'https://twemoji.maxcdn.com/2/72x72/1f436.png') winnerPetFrame2 = '🐶';
    if (winnerPetFrame === 'https://twemoji.maxcdn.com/2/72x72/1f99c.png') winnerPetFrame2 = '🦜';
    if (winnerPetFrame === 'https://twemoji.maxcdn.com/2/72x72/1f422.png') winnerPetFrame2 = '🐢';
    let calcAdd1 = Number(arrayUsers.length) * Number(quantia);
    let calcAdd = Number(calcAdd1) - Number(quantia)
    let tranW = await client.db.ref(`Users/${winner}/transactions`).once('value').then(r => r.val());

    let msgW = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ ganhou ${calcAdd} flocos em uma rinha de pets`

    let winnerAtm = await client.db.ref(`Users/${winner}/flocos`).once('value').then(r => r.val());

    client.db.ref(`Users/${winner}`).update({
      flocos: Number(winnerAtm) + Number(calcAdd),
      transactions: [msgW, ...tranW]
    })
    
      message.channel.send(`**O ${winnerPetFrame2} de <@${winner}> saiu como vencedor da rinha de ${message.author}, para ser recompensado o vencedor ganhou ${calcAdd} flocos, e os ${arrayUsers.length - 1} perdedores tiveram que pagar ${quantia} flocos 😆😆😆**`)

      //remover
      let searchW = arrayUsers.indexOf(winner);
        arrayUsers.splice(searchW, 1);
      arrayUsers.forEach(async (u) => {
        let tranL = await client.db.ref(`Users/${winner}/transactions`).once('value').then(r => r.val());

        let losers = await client.db.ref(`Users/${u}/flocos`).once('value').then(r => r.val());

        let msgL = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ perdeu ${quantia} flocos em uma rinha de pets`

        client.db.ref(`Users/${u}`).update({
          flocos: Number(losers) - Number(quantia),
          transactions: [msgL, ...tranL]
        })
      })
    }, 60000)
  }
}