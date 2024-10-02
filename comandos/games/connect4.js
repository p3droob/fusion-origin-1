const Discord = require('discord.js');
module.exports = {
  name: 'connect4',
  category: 'games',
  usage: 'connect4 <user>',
  run: async (client, message, args, prefix) => {

const user1 = message.mentions.users.first()
let name = 'connect4'
        const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))
        const noargs = new Discord.MessageEmbed()
        .setTitle(`💸 | \`${prefix}connect4\``)
        
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#0cfffb')
        .setDescription("🤔 |Como usar?\n\n 📕 | **Exemplos**")
      .addField(`🔹 Jogar com alguém por menção`, `\`${prefix}connect4 <@usuário>\``)
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Games`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
if (!user1) return message.respond(noargs)
const request = await message.channel.send(`${user1} você deseja aceitar ou recusar esse jogo? Você tem 30 segundos!`)
request.react(client.controllers.emojis.certo)
request.react(client.controllers.emojis.errado)
let filtro2 = (reaction3, user3) => user3.id === user1.id;
let coletor2 = request.createReactionCollector(filtro2, { time: 30000, max: 1 })
coletor2.on('collect', async (reaction3, user3) => {
  if (reaction3.emoji.name === 'erro_Fusion') return message.channel.send(`${message.author}, o ${user1.tag} recusou seu jogo `)

  if (reaction3.emoji.name === 'sim_Fusion') {
    const conv = {
0: '🔴',
1: '🟡',
null: '⚪'
}
const convN = {
  0: ':zero:',
  1: ':one:',
  2: ':two:',
  3: ':three:',
  4: ':four:',
  5: ':five:',
  6: ':six:'
}
let help = {
  0: `0️⃣`,
 1: `1️⃣`,
 2: `2️⃣`,
 3: `3️⃣`,
 4: `4️⃣`,
 5: `5️⃣`,
 6: `6️⃣`
}
const {Game} = require("connect4")
const game = new Game(message.author.id, user1.id);

function handleBoard(array) {
  let str = '';
  
  let pages = Math.ceil(array.length / 7);

  for(let i = 0; i < pages; i++) str += array.slice((i * 7), (i + 1) * 7).join("") + "\n" 
return str
}
let arrayN = [0, 1, 2, 3, 4, 5, 6];
message.channel.send(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g]))).then(msg => {
  msg.react('0️⃣')
  msg.react('1️⃣')
  msg.react(`2️⃣`)
  msg.react(`3️⃣`)
  msg.react(`4️⃣`)
  msg.react(`5️⃣`)
  msg.react(`6️⃣`)
  let filtro = (reaction, user) => user.id !== client.user.id;
  let coletor = msg.createReactionCollector(filtro, { time: 300000 })
  .on('collect', async (reaction, user) => {
    if (user.id !== game.currentPlayer.name) return;
    
      reaction.users.remove(user)
    if (reaction.emoji.name === '0️⃣') {

      let verify0 = game.insert(0)
      if (!verify0) return;
      msg.edit(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))

    } else if (reaction.emoji.name === '1️⃣') {
      let verify1 = game.insert(1)
      if (!verify1) return;

      msg.edit(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))
      if (game.winner) {
        coletor.stop()
        msg.edit(`<@${game.winner.name}> Venceu\n\n${handleBoard(game.board.map(g => conv[g]))}`);
      }
    } else if (reaction.emoji.name === `2️⃣`) {
      let verify2 = game.insert(2)
      if (!verify2) return;

      msg.edit(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))
      if (game.winner) {
        coletor.stop()
        msg.edit(`<@${game.winner.name}> Venceu\n\n${handleBoard(game.board.map(g => conv[g]))}`);
      }

    } else if (reaction.emoji.name === `3️⃣`) {
      let verify3 = game.insert(3)
      if (!verify3) return;

      msg.edit(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))
      if (game.winner) {
        coletor.stop()
        msg.edit(`<@${game.winner.name}> Venceu\n\n${handleBoard(game.board.map(g => conv[g]))}`);
      }
    } else if (reaction.emoji.name === `4️⃣`) {
      let verify4 = game.insert(4)
      if (!verify4) return;

      msg.edit(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))
      if (game.winner) {
        coletor.stop()
        msg.edit(`<@${game.winner.name}> Venceu\n\n${handleBoard(game.board.map(g => conv[g]))}`);
      }
    } else if (reaction.emoji.name === `5️⃣`) {
      let verify5 = game.insert(5)
      if (!verify5) return;

      msg.edit(`<@${game.currentPlayer.name}>\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))
      if (game.winner) {
        coletor.stop()
        msg.edit(`<@${game.winner.name}> Venceu\n\n${handleBoard(game.board.map(g => conv[g]))}`);
      }
    } else if (reaction.emoji.name === `6️⃣`) {
      let verify6 = game.insert(6)
      if (!verify6) return;

      msg.edit(`<@${game.currentPlayer.name}> ${game.currentPlayer.id === '0' ? '🔴' : '🟡'}\n\n${arrayN.map(b => convN[b]).join('')}\n\n` + handleBoard(game.board.map(g => conv[g])))
      if (game.winner) {
        coletor.stop()
        msg.edit(`<@${game.winner.name}> Venceu\n\n${handleBoard(game.board.map(g => conv[g]))}`);
      }
    }
    

  })
})
  }
})
    
  }
}