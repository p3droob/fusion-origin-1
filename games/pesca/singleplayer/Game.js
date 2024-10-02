module.exports = class Game {
  constructor(message, client, difficulty) {
    if (!message) throw new Error('Any message');
    if (!difficulty) throw new Error('Any difficulty')
    this.message = message;
    this.client = client;
    this.catches = 0;
    this.tries = 0;
    this.level = 1;
    this.swims = 0;
    this.chances = 4;
    this.difficulty = difficulty;
    this.status = 'IN';
    this.number = 0;
    if (difficulty == 1) this.number = 5;
    if (difficulty == 2) this.number = 7;
    if (difficulty == 3) this.number = 9;
    this.pier = new Array(this.number).fill('🪑');
    this.pier[Math.floor(this.pier.length / 2)] = '🙎‍♂️';
    this.pier[this.pier.indexOf('🙎‍♂️') - 1] =  '🪣';
    this.ocean = new Array(this.number).fill('🌊');
  }

  restart() {
    this.ocean = new Array(this.number).fill('🌊');
    return true
  }
  
  async run() {

    let dificuldade;
    let tempo;
    if (this.difficulty === 1) dificuldade = 'Fácil';
    if (this.difficulty === 2) dificuldade = 'Médio';
    if (this.difficulty === 3) dificuldade = 'Insano';
    if (this.difficulty === 1) tempo = 4000;
    if (this.difficulty === 2) tempo = 3600;
    if (this.difficulty === 3) tempo = 2500;
    const Discord = require('discord.js');
let perfil = 'https://cdn.discordapp.com/attachments/734166656728694824/875492859845951518/Sem_titulo_2.jpg';

let number2;
if (this.number === 5) number2 = '165';
if (this.number === 9) number2 = '90';
if (this.number === 14) number2 = '57';


    const embed = new this.client.embed(this.message.author)
    .setTitle('A pescaria começou! Você tem 5 minutos | ' + dificuldade)
    .setDescription(`**Progresso:**\n> Joagadas: ${this.tries}\n> Erros restantes: ${this.chances}/4\n> Peixes Capturados: ${this.catches}\n> Level: ${this.level}\n\n> Jogo:\n\n${this.pier.join('')}\n${this.ocean.join('')}`)
    await this.message.channel.send(embed).then(async msg => {
      
      let intervalo = setInterval(async () => {
        if (this.status === 'LOSE') {
          //
          let pegarD;
          if (this.difficulty === 1) pegarD = 'easy';
          if (this.difficulty === 2) pegarD = 'medium';
          if (this.difficulty === 3) pegarD = 'insane';
          let pegarR = await this.client.db.ref(`Users/${this.message.author.id}/records/games/pesca/singleplayer/${pegarD}`).once('value').then(r => r.val()) || 0;
          //
          if (this.catches > pegarR) this.client.db.ref(`Users/${this.message.author.id}/records/games/pesca/singleplayer/${pegarD}`).set(this.catches);//leaderboard
          clearInterval(intervalo)
          embed.setTitle(`Você perdeu! | ${dificuldade}`).setDescription(`**Progresso:**\n> Joagadas: ${this.tries}\n> Erros restantes: ${this.chances}/4\n> Peixes Capturados: ${this.catches}\n> Level: ${this.level}\n\n> Jogo:\n\n${this.pier.join('')}\n${this.ocean.join('')}`)
          this.client.db.ref(`Users/${this.message.author.id}/games/pesca/singleplayer`).remove()
          return msg.edit(embed)
        }
      this.swim()
      embed.setDescription(`**Progresso:**\n> Joagadas: ${this.tries}\n> Erros restantes: ${this.chances}/4\n> Peixes Capturados: ${this.catches}\n> Level: ${this.level}\n\n> Jogo:\n\n${this.pier.join('')}\n${this.ocean.join('')}`)
      msg.edit(embed)
    }, tempo)
      msg.react(this.client.controllers.emojis.bug)
      msg.react(this.client.controllers.emojis.delet)
      let filter = (reaction, user) => user.id === this.message.author.id;
      let coletor = msg.createReactionCollector(filter, { time: 300000 })//delete
      setTimeout(async () => {
        clearInterval(intervalo);
        let tryDel = await this.client.db.ref(`Users/${this.message.author.id}/games/pesca/singleplayer`).once('value').then(r => r.val())
        if (!tryDel) return;
        let pegarD;
         if (this.difficulty === 1) pegarD = 'easy';
        if (this.difficulty === 2) pegarD = 'medium';
        if (this.difficulty === 3) pegarD = 'insane';
        let pegarR = await this.client.db.ref(`Users/${this.message.author.id}/records/games/pesca/singleplayer/${pegarD}`).once('value').then(r => r.val()) || 0;
        if (this.catches > pegarR) this.client.db.ref(`Users/${this.message.author.id}/records/games/pesca/singleplayer/${pegarD}`).set(this.catches);
        this.client.db.ref(`Users/${this.message.author.id}/games/pesca/singleplayer`).remove()
        this.message.channel.send(`${this.message.author}, O jogo foi fechado pois já se passaram 5 minutos`)
        coletor.stop()
      }, 300000)
      coletor.on('collect', async (reaction, user) => {
          if (reaction.emoji.name ==='badge_hunter') {
            if (this.chances === 0 ) {
              embed.setTitle(`Você perdeu! | ${dificuldade}`).setDescription(`**Progresso:**\n> Joagadas: ${this.tries}\n> Erros restantes: ${this.chances}/4\n> Peixes Capturados: ${this.catches}\n> Level: ${this.level}\n\n> Jogo:\n\n${this.pier.join('')}\n${this.ocean.join('')}`)
              msg.edit(embed)
              this.client.db.ref(`Users/${this.message.author.id}/games/pesca/singleplayer`).remove()
         return coletor.stop()
            }
          let tryToCapture = this.capture();
          if (!tryToCapture) {
            this.message.channel.send(`${this.message.author}, Hmm, parece que você errou, agora você tem ${this.chances} tentativas.`);
            
          }
          embed.setDescription(`**Progresso:**\n> Joagadas: ${this.tries}\n> Erros restantes: ${this.chances}/4\n> Peixes Capturados: ${this.catches}\n> Level: ${this.level}\n\n> Jogo:\n\n${this.pier.join('')}\n${this.ocean.join('')}`)
          msg.edit(embed)
        }
          if (reaction.emoji.name ==='delete_Fusion') {
            clearInterval(intervalo)
            let pegarD;
            if (this.difficulty === 1) pegarD = 'easy';
            if (this.difficulty === 2) pegarD = 'medium';
            if (this.difficulty === 3) pegarD = 'insane';
            let pegarR = await this.client.db.ref(`Users/${this.message.author.id}/records/games/pesca/singleplayer/${pegarD}`).once('value').then(r => r.val()) || 0;
            if (this.catches > pegarR) this.client.db.ref(`Users/${this.message.author.id}/records/games/pesca/singleplayer/${pegarD}`).set(this.catches);
            embed.setTitle(`Você terminou! | ${dificuldade}`).setDescription(`**Progresso:**\n> Joagadas: ${this.tries}\n> Erros restantes: ${this.chances}/4\n> Peixes Capturados: ${this.catches}\n> Level: ${this.level}\n\n> Jogo:\n\n${this.pier.join('')}\n${this.ocean.join('')}`)
            msg.edit(embed)
          this.message.channel.send(`🎉 ${this.message.author}, Parabéns, o jogo terminou e você ficou com:
          >>> ${this.tries} jogadas\nLevel ${this.level}\n${this.catches} peixes capturados`)
          coletor.stop()//status
          this.client.db.ref(`Users/${this.message.author.id}/games/pesca/singleplayer`).remove()
          }
      })
    })
  }

  capture() {
    let manIndex = this.pier.indexOf('🙎‍♂️');
    let peixeIndex = this.ocean.indexOf('🐟');
    if (peixeIndex < 0) return this.message.channel.send('O peixe ainda não apareceu aguarde...');


    if (manIndex !== peixeIndex) {
      this.tries++;
      this.chances--;
      if (this.chances === 0) this.status = 'LOSE';
      return false;
      }
    if (manIndex === peixeIndex) {
      this.restart();
      this.tries++;
      this.catches++;
      let level1 = Number(this.level) * Number(5)
      let level2 = Number(level1) + Number(5);
      if (this.catches >= level2) this.level++;
      return true;
      }
  }

  async editRanking() {
    const searchG = await this.client.channels.cache.get('876966812301008926').messages.fetch('876967388711628830');
const pessoas1 = [];
    const db = await this.client.db.ref(`Users`).once('value').then(r => r.val());
    const array = Object.keys(db);
    array.forEach(e => {
      let db1 = db[e].records;
      if (!db1) return;
      let db2 = db1.games;
      if (!db2) return;
      let db3 = db2.pesca;
      if (!db3) return;
      let db4 = db3.singleplayer;
      if (!db4) return;
      let db5 = db4.insane;
      if (db5) {
        let info1 = {
          id: e, level: db5
        }
        pessoas1.push(info1)
      }
    })
    let galera1 = pessoas1.sort(function (a, b) {
         if (a.level < b.level) {
           return 1;
         }
         if (a.level > b.level) {
           return -1;
         }
         return 0;
     });
const maxPerPage = 10;
          let queue = Array.from(galera1);
          const pages = Math.ceil(queue.length / maxPerPage);
          let page = 0;
          const embed = new this.client.embed()
.setTitle(`**Records do nível Insano**`)
          .setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((d, i) => `**[${i+1}]** ${this.client.users.cache.get(d.id) ? this.client.users.cache.get(d.id).tag : 'usuário desconhecido'} - ${d.level}`).join('\n'))
searchG.edit(embed)
  }

  swim() {
let peixeIndex = this.ocean.indexOf('🐟');
if (peixeIndex === 0) this.restart();
this.ocean[peixeIndex < 0 ? this.ocean.length - 1 : peixeIndex - 1] = '🐟';

peixeIndex > 0 ? this.ocean[peixeIndex] = '🌊' : true
this.swims += 1;

return true

  }
}
