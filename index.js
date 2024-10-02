const express = require('express');
const app = express();
app.listen(3000);
app.get("/", (request, response) => {
  let https = require('https');

function createRequest (options) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, req => {
      req.setEncoding('utf-8')

      let data = ''

      req.on('data', chunk => {
        data += chunk
      })
      req.on('end', () => {
        try {
        resolve(JSON.parse(data))
        } catch (e) {
          resolve({})
        }
      })
      req.on('error', reject)
    })//

    if (options.body) {
      const body = JSON.stringify(options.body)

      request.setHeader('Content-Length', body.length)
      request.write(body)
    }

    request.end()
  })
};

  setTimeout(() => {
    createRequest({
      host: 'fusion-origin-1.mrfrozenfire.repl.co',
      path: '/',
      method: 'GET'
    })
  }, 30000);
const ping = new Date()
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.get("/dreams", (request, response) => {
let uptiming = {
  uptime: Date.now()
}
  response.json(uptiming);
});//quote
//emoji
const { Message, Collection, Util } = require('discord.js')
Message.prototype.react = async function (emoji) {//message.react q aceita array
      if (Array.isArray(emoji)) {

        return emoji.forEach(async e => {
          e = this.client.emojis.resolveIdentifier(e);
          await this.client.api
      .channels(this.channel.id)
      .messages(this.id)
      .reactions(e, '@me')
      .put()
      return this.client.actions.MessageReactionAdd.handle({
        user: this.client.user,
        channel: this.channel,
        message: this,
        emoji: Util.parseEmoji(e),
      }).reaction;
        })

      } else {
     emoji = this.client.emojis.resolveIdentifier(emoji);
      await this.client.api
      .channels(this.channel.id)
      .messages(this.id)
      .reactions(emoji, '@me')
      .put()
      return this.client.actions.MessageReactionAdd.handle({
        user: this.client.user,
        channel: this.channel,
        message: this,
        emoji: Util.parseEmoji(emoji),
      }).reaction;
     }
    }
const unicode = require("emoji-unicode-map");

const emojiUnicode = require("emoji-unicode");

Object.defineProperties(Message.prototype, {
    'emojis': {
        get: function getEmojis() {
            this._emojis = new Collection()
            for (let match of this.content.matchAll(/<(a)?:([\w\d]{2,32})+:(\d{17,19})>/g)) {
                const [ ,animated,name,id ] = match
                const emoji = this.client.emojis.cache.get(id) || { 
                    animated: Boolean(animated), id, name, 
                    url: this.client.rest.cdn.Emoji(id, Boolean(animated) ? 'gif' : 'png')
                }
                this._emojis.set(emoji.id, emoji)
            }
            if (this._emojis.size < 1) {
              const emojis = this.content.split(" ")
            .filter(a => unicode.get(a));
            console.log(emojis)
            if (emojis.length > 0) {
              emojis.forEach(unEmoji => {
                this._emojis.set(unEmoji, {
                  unicode: emojiUnicode(unEmoji)
                })
              })
}

            }
            return this._emojis
        }
    }
})
const Discord = require('discord.js');
const client = new Discord.Client({
  ws: { intents: 32767 }
});

//const Nebula = require('nebula-center');
//const NebulaClient = new Nebula.Client('812272055457546271');

/*NebulaClient.on('ready', () => {
  console.log('Nebula ready')
});

NebulaClient.on('vote', vote => {

  console.log(vote)/*{ user,
  votes: 'number of votes'
  }
  
});*/

require("discord-buttons")(client)

const db = require('quick.db');
const fs = require('fs');
const os = require('os-utils');
const xp = require("./utils/xp.js");
const ms = require('ms');
const moment = require("moment-timezone");
const mySecret = process.env['TOKEN']
const tggtoken = process.env['TOPGG']
const { AutoPoster } = require('topgg-autoposter');
const Topgg = require(`@top-gg/sdk`);
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: process.env.dbKey,
  authDomain: process.env.dbDomain,
  databaseURL: process.env.dbURL,
  projectId: process.env.dbID,
  storageBucket: process.env.dbBucket,
  messagingSenderId: "603235264486",
  appId: process.env.dbAppID
};
firebase.initializeApp(firebaseConfig);
client.db = require('firebase').database();

const webhook = new Topgg.Webhook('fusionthebest3012') // add your Top.gg webhook authorization (not bot token)
app.post('/aa', (req, res) => {
  console.log(res.body)
})
app.post('/dblwebhook', webhook.listener(async vote => {
  console.log('kakakak')
  if (!vote.user) return console.log('n tem user')
const user = client.users.cache.get(vote.user);
console.log('algm votou em mim!')
let getVotesUser = await client.db.ref(`Users/${user.id}/votos`).once('value').then(r => r.val()) || 0;

let getFlocosUser = await client.db.ref(`Users/${user.id}/flocos`).once('value').then(r => r.val()) || 0;
    
client.db.ref(`Users/${user.id}`).update({
  votos: Number(getVotesUser) + Number(1),
  flocos: Number(getFlocosUser) + Number(3000)
})
    getVotesUser = await client.db.ref(`Users/${user.id}/votos`).once('value').then(r => r.val()) || 0;
    if (getVotesUser = 40) client.db.ref(`Users/${user.id}`).update({
      vip: true,
      keys: 4
    })

    const api = new Topgg.Api(tggtoken)

    const apibot = await api.getBot('812272055457546271')

  let canalToSend = client.guilds.cache.get('812266828196741121').channels.cache.get('839811983808659466');
  let pickTran = await client.db.ref(`Users/${user.id}/transactions`).once('value').then(r => r.val()) || [];
  client.db.ref(`Users/${user.id}`).update({
    transactions: [`\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Ganhou 3000 flocos ao votar em mim no Discord Bot List`, ...pickTran]
  })
  const embedVote = new Discord.MessageEmbed()
  .setTitle('Recebi um voto')
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  .addField(`${user.tag} acabou de votar em mim`, `E agora eu possuo ${apibot.monthlyPoints} votos!`)
  .setFooter('Vote você também!')
  canalToSend.send(embedVote)

}))

//handler
client.cooldown = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./comandos/`);

['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));

os.cpuUsage((v) => {
    console.log(`CPU Usage (%): ${v}%`);
});



const { APIMessage } = require('discord.js');

Message.prototype.respond = async function(content, options) {
     const message_reference = {
         message_id: (
            !!content && !options
                ? typeof content === 'object' && content.messageID
                 : options && options.messageID
         ) || this.id,
        message_channel: this.channel.id
     }

     const { data: parsed, files } = await APIMessage
         .create(this, content, options)
         .resolveData()
         .resolveFiles()

     return this.client.api.channels[this.channel.id].messages.post({
         data: { ...parsed, message_reference },
         files
     })
         .then(d => this.client.actions.MessageCreate.handle(d).message)
 }

//============== CLIENT DEFINITIONS START ==============

//============== 0 START ==============
function progressBarEnhanced(current, total, barSize) {
  const progress = Math.round((barSize*current)/total)
//🟦
  return '<:progress:875469767727804496>'.repeat(progress > 0 ? progress-1 : progress) + '' + '<:progress_left:875471052204019802>'.repeat(barSize-progress)
}

function createThread(name, channel, msg) {
client.api.channels(channel).messages(msg).threads.post({
      data: {
        name: name,
        auto_archive_duration: 1440,
        type: 'GUILD_TEXT'
      }
    })
    return true
}

client.progressBar = progressBarEnhanced

client.createThread = createThread;

client.getDay = require('./services/day.js')

require('./controllers/colors.js')(client);

client.snow = require('snowbase')

client.embed = require('./services/Embed.js')

require('./controllers/msToTime.js')(client)

client.transactions = require('./services/transactions');

//============== 0 END ==============

//============== CONTROLLERS START ==============

  async function getFlocos(user) {
    const db = await client.db.ref(`Users/${user}/flocos`).once('value').then(r => r.val()) || 0;

    return db
  }
const interval = 24 * 60 * 60 * 1000
  async function canGetDaily(user) {
    const db2 = await  client.db.ref(`Users/${user}/cooldown/daily`).once('value')
    const boolean = Date.now() < (interval + db2.val())

    if (!db2.val()) return { can: true }


    const remain = client.msToTime(Date.now() - (interval + db2.val()))
    if (boolean) return { can: false, remain }
    else return { can: true }
  }
client.controllers = {
  backup: require('./controllers/backup.js'),
  convertAbbreviatedNumber: require('./controllers/convertAbbreviatedNumber.js'),
  numberToFraction: require('./controllers/numberToFraction.js'),
  calculateLevel: require('./controllers/calculateLevel.js'),
  abbreviateNumber: require('./controllers/abbreviateNumber.js'),
  get: getFlocos,
  canGetDaily: canGetDaily,
  emojis: {
    status: {
    online: "<:online_Fusion:835127560417181726>",
    offline: "<:invisible_Fusion:835124251820032010>",
    idle: "<:idle_Fusion:835124327237681183>",
    dnd: "<:offline_Fusion:835124155246313472>"
    },
    bug: '<:badge_hunter:875473173435535390>',
    voltar: "<:voltar_Fusion:832577187483353098>",
    list: "<:list:863147533529513996>",
    dbl: '<:dbl:872816307945496657>',
    true: "<:true:869311050728755242>",
    false: "<:false:869311123290206239>",
    download: "<a:download_Fusion:826103385623101470>",
    errado: "<:erro_Fusion:824604753388503121>",
    certo: "<:sim_Fusion:824604719145287722>",
    servidor: "<:host_Fusion:831121757732601898>",
    delet: "<:delete_Fusion:824604387099934782>",
    documento: "<:pasta_Fusion:831539225160843274>",
    aviso: "<:notifica_Fusion:833679538192908368>",
    configs: "<:configurar_Fusion:824604269029752832>",
    carregando: "<a:carregando_Fusion:824602024314273792>"
  }
}
//============== CONTROLLERS END ==============

//============== GAMES START ==============

client.games = {
    pesca: {
      singleplayer: require('./games/pesca/singleplayer/Game.js')
    },
    space: {
      multiplayer: require('./games/space/multiplayer/Game')
    }
  }
//============== GAMES END ==============
//============== CLIENT DEFINITIONS END ==============

//prefix
client.on("message", async message => {
if (message.channel.type === 'dm') return;
if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return;
    if (!message.channel.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return;
if(message.author.bot) return;
if(message.content == `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
const db = require('quick.db');
const prefix = await client.db.ref(`Guilds/${message.guild.id}/prefix`).once('value').then(r => r.val()) || '..';
const embed = new Discord.MessageEmbed()
.setDescription(`**Meu prefixo nesse servidor é \`${prefix}\` digite \`${prefix}help\` para ver minha lista de comandos!**`)
.setColor("#36393F")
return message.respond(embed)
}
});


  const { Collector } = require('discord.js');

Object.defineProperties(Collector.prototype, {
    'handleCollect': {
        value: async function handleCollect(...args) {
            const collect = this.collect(...args);

            if(collect && (await this.filter(...args, this.collected))) {
                if(this.cooldown) return;
                
                this.cooldown = true;
                
                setTimeout(() => {
                    this.cooldown = false
                }, this.options.cooldown || 1500);
                
                this.collected.set(collect, args[0]);
                
                this.emit('collect', ...args);
                
                if(this._idletimeout) {
                    this.client.clearTimeout(this._idletimeout);
                    this._idletimeout = this.client.setTimeout(() => this.stop('idle'), this.options.idle);
                }
            }
            
            this.checkEnd();
        }
    }
})

client.events = new Discord.Collection();
const IA = require('./artificialInteligence.js');
client.ia = IA;
client.on('message', async message => {
  let args = message.content.trim().split(/ +/g);
  new IA(client, message, args).start()
})


client.login(process.env.TOKEN)
//afk author
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  let matchAFK = await client.db.ref(`Users/${message.author.id}/afk/motivo`).once('value').then(r => r.val());
  const mention = message.mentions.members.first();
  if (mention) {
    let userafk = await client.db.ref(`Users/${mention.id}/afk/motivo`).once('value').then(r => r.val());
    if (userafk !== null) {
      message.channel.send(`O Usúario **${mention.user.tag}** está AFK no momento pelo motivo: **${userafk}**`)
    } else {
      return;
    }
  }
  if (matchAFK !== null) {
  message.channel.send(`${message.author}, que bom que você voltou, seu AFK foi removido.`)
  client.db.ref(`Users/${message.author.id}/afk`).remove()
  } else {
    return;
  }
})

client.on('message', async message => {
  if (message.author.id !== '877140093998104627') return;
  const args = message.content.slice(''.length).trim().split(/ +/g);
  const user = message.content.split('atmde ')[1]
  if (!message.content.startsWith('atmde')) return;
  let atm = await client.db.ref(`Users/${user}/flocos`).once('value').then(r => r.val()) || '0';
  message.channel.send(`atm: ${atm}`).then(msg => msg.delete({ timeout: 400 }))
})


//msg edit
client.on('messageUpdate', async (oldMessage, newMessage) => {
  let db = require('quick.db')
       
    const embed = new Discord.MessageEmbed()
    .setTitle('Mensagem editada')
    .setDescription(`o usuário: ${oldMessage.author} editou uma mensagem no canal ${oldMessage.channel}
Mensagem antiga: \`\`\` ${oldMessage.content || 'Anexo'} \`\`\`
Mensagem nova: \`\`\` ${newMessage.content || 'Anexo'} \`\`\``)    
     .setColor('RANDOM')
    let channel = oldMessage.guild.channels.cache.get(db.get(`cMod_${oldMessage.guild.id}`))
    if (!channel) return;
    channel.send(embed)
})

client.on('messageReactionAdd', async (reaction, user) => {
  if(user.bot) return;
  const message = reaction.message;
  let matchChannels = await client.db.ref(`Guilds/${message.guild.id}/configs/ticket/messages`).once('value').then(r => r.val());
  if (matchChannels === null) {
    return;
  } else {
    if (!matchChannels.includes(message.id)) return;
    switch (reaction.emoji.name) {
      case '🎟️':
      reaction.users.remove(user)
      let matchNumber = await client.db.ref(`Guilds/${message.guild.id}/cofigs/ticket/total`).once('value').then(r => r.val()) || 1;
      let name = `ticket-${matchNumber}`;
      message.guild.channels.create(name).then(async (chan)=>{
chan.updateOverwrite(message.guild.roles.everyone, {
    SEND_MESSAGES: false,
    VIEW_CHANNEL: false
})
chan.updateOverwrite(user,{
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true
})
let matchNumber2 = await client.db.ref(`Guilds/${message.guild.id}/cofigs/ticket/total`).once('value').then(r => r.val()) || 1;
await client.db.ref(`Guilds/${message.guild.id}/cofigs/ticket`).update({
total: Number(matchNumber2) + Number(1)
})
chan.send("Reaja com ❌ para fechar o ticket").then((m)=>{ 
  m.pin(); 
  m.react('❌')

  let filtro = (reaction, user2) => reaction.emoji.name === '❌' && user2.id === user.id;

  let coletor = m.createReactionCollector(filtro);
  coletor.on('collect', (reacton, user2) => {
    chan.send('Este ticket será fechado em 10 segundos');

    setTimeout(async () => {
      chan.delete()
    }, 10000)
  })
  })
    })
  }
  }
})


client.on('message', async message => {
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;
  if(['599563864509513739'].includes(message.author.id)) return;
  let matchXP1 = await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/xp`).once('value').then(d => d.val());
  
await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}`).update({
  xp: Number(matchXP1) + Number(1)
})
let matchXP = await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/xp`).once('value').then(d => d.val());
let matchLVL = await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/level`).once('value').then(d => d.val());
let level2 = Number(matchLVL) * Number(100) + Number(100);
if (Number(matchXP) > Number(level2)) {
await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}`).update({
  level: Number(matchLVL) + Number(1)
})
let sistem = await client.db.ref(`Guilds/${message.guild.id}/sistems/level`).once('value').then(r => r.val());
if (sistem !== false) {
  let canal = await client.db.ref(`Guilds/${message.guild.id}/configs/channels/levelup`).once('value').then(r => r.val());
  canal = client.channels.cache.get(canal) || message.channel;
  let lvlatual = await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/level`).once('value').then(t => t.val());
  let msg1 = new Discord.MessageEmbed()
  .setTitle('Level Up')
  .setColor(client.colors.embedFields)
  .addFields(
    [
      {
        name: message.author.username,
        value: `Parabéns ${message.author.username}, você acabar de subir para o level ${lvlatual}`
      }
    ]
  )
  canal.send(msg1)
} else {
  return;
}
}
})

client.on('message', async message => {
  if (message.author.bot) return;
  if(['599563864509513739'].includes(message.author.id)) return;
  let matchXP1 = await client.db.ref(`Users/${message.author.id}/xp`).once('value').then(d => d.val());
  
await client.db.ref(`Users/${message.author.id}`).update({
  xp: Number(matchXP1) + Number(1)
})
let matchXP = await client.db.ref(`Users/${message.author.id}/xp`).once('value').then(d => d.val());
let matchLVL = await client.db.ref(`Users/${message.author.id}/level`).once('value').then(d => d.val());
let level2 = Number(matchLVL) * Number(1000) + Number(1000);
if (Number(matchXP) > Number(level2)) {
await client.db.ref(`Users/${message.author.id}`).update({
  level: Number(matchLVL) + Number(1)
})
}
})

process.on("unhandledRejection", (r, p) => {
  if (r.message === 'Missing Access') return;
  if (r.path === '/channels/844258336014729226/messages') return;
console.log(r)
});