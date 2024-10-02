const Discord = require('discord.js')
const db = require('quick.db');
const ms = require('ms')
const cooldowns = {}
const error = require('../../utils/errors.js')
let emoji = require('../../utils/emojis.js')
module.exports = async (client, message) => {
if (message.channel.type === 'dm') return;
  if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return;
    if (!message.channel.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return;
  function checkSimilarity(str1, str2) {
  if (str1 === str2) return 1.0

  const len1 = str1.length
  const len2 = str2.length

  const maxDist = ~~(Math.max(len1, len2)/2)-1
  let matches = 0

  const hash1 = []
  const hash2 = []

  for(var i=0; i<len1; i++)
    for(var j=Math.max(0, i-maxDist); j<Math.min(len2, i+maxDist+1); j++)
      if (str1.charAt(i) === str2.charAt(j) && !hash2[j]) {
        hash1[i]=1
        hash2[j]=1
        matches++
        break
      }

  if (!matches) return 0.0

  let t = 0
  let point = 0

  for(var k=0; k<len1; k++)
    if (hash1[k]) {
      while(!hash2[point])
        point++

      if (str1.charAt(k) !== str2.charAt(point++))
        t++
    }

  t/=2

  return ( (matches/len1) + (matches/len2) + ((matches-t)/matches) )/3.0
}


  function didYouMean(str, array, threshold=60) {
  return array
    .map(e => { return {e, v: checkSimilarity(str, e)} }) // checkSimilarity function can be found in this repository
    .filter(({v}) => v >= threshold/100)
    .reduce((_, curr, i, arr) => arr[i].v > curr ? arr[i].v : curr.e, null)
}
  const prefix = await client.db.ref(`Guilds/${message.guild.id}/prefix`).once('value').then(r => r.val()) || '..';
  const blChannel = await client.db.ref(`Guilds/${message.guild.id}/blacklist/channels`).once('value').then(r => r.val()) || [];
  const blMember = await client.db.ref(`Guilds/${message.guild.id}/blacklist/members`).once('value').then(r => r.val()) || [];
  const viper = await client.db.ref(`Users/${message.author.id}/vip`).once('value').then(r => r.val());
   try {
     
     
     if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
     
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(blMember.some(a => message.member.id === a)) return message.channel.send(`**Você está na Black List deste servidor!**`).then(m => m.delete({timeout: 30000})).catch(a => {})
    if(blChannel.some(a => message.channel.id === a)) return message.channel.send(`**Este canal está na Black List deste servidor!**`).then(m => m.delete({timeout: 30000})).catch(a => {})
    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;
    if (cmd.includes('.')) return;
    let command = client.commands.get(cmd)
    let timeout1 = 1;
    if(!command) command = client.commands.get(client.aliases.get(cmd))
        let motivo = client.db.ref(`Users/${message.author.id}/BLmotivo`).once('value').then(r => r.val());
  let blacklist = client.db.ref(`Users/${message.author.id}/blacklist`).once('value').then(r => r.val());
if(blacklist === true) {
  return message.channel.send(`${message.author} você está em minha blacklist, por isso não pode usar meus comandos!
  Motivo: ${motivo}`)
  }
  if (viper !== true) {
    if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {
        lastCmd: null
      }
let ultimoCmd = cooldowns[message.author.id].lastCmd 
     let timeout = timeout1 * 1000
    if (ultimoCmd !== null && timeout- (Date.now() - ultimoCmd) > 0) {
let time = ms(timeout - (Date.now() - ultimoCmd)); 
let resta = [time.seconds, 'segundos']
 
if(resta[0] == 0) resta = ['alguns', 'millisegundos']
if(resta[0] == 1) resta = [time.seconds, 'segundo']
    message.channel.send(`${emoji.aviso} **|** Calma aí! ${message.author} você precisa esperar **${time}** para executar outro comando! 🙅`).then(msg=> {
    msg.delete({ timeout: 10000 });
        })
       return;
    } else {
                 cooldowns[message.author.id].lastCmd = Date.now() 
    }
    }
    // ============== FUNCTIONS START ==============
    function getChannels(argg = false) {

        const args = argg ? argg.split(" ") : this.args;

        const roles = args
            .filter(arg => message.guild.channels.cache.get(arg.replace(/[^0-9]/gi, '')) || message.guild.channels.cache.find(r => r.name === arg))
            .map(arg => message.guild.channels.cache.get(arg.replace(/[^0-9]/gi, '')) || message.guild.channels.cache.find(r => r.name === arg))

        return roles;
    }
    function getEmojis(argg = false) {

        const unicode = require("emoji-unicode-map");

        const args = argg ? argg.split(" ") : this.args;

        const emojis = args
            .filter(arg => client.emojis.cache.get(arg.replace(/[^0-9]/gi, '')) || unicode.get(arg))
            .map(e => e.replace(/[^0-9]/gi, '').length ? e.replace(/[^0-9]/gi, '') : e);

        return emojis;
    }
    function getRoles(argg = false) {

        const args = argg ? argg.split(" ") : this.args;

        const roles = args
            .filter(arg => message.guild.roles.cache.get(arg.replace(/[^0-9]/gi, '')) || message.guild.roles.cache.find(r => r.name === arg))
            .map(arg => message.guild.roles.cache.get(arg.replace(/[^0-9]/gi, '')) || message.guild.roles.cache.find(r => r.name === arg))

        return roles;
    }
    function getMembers(arg = false) {

        const args = arg ? arg.split(" ") : this.args;

        const users = args
            .filter(arg => message.guild.members.cache.get(arg.replace(/[^0-9]/gi, '')) || message.guild.members.cache.find(c => c.user.username === arg) || message.guild.members.cache.find(c => c.nickname === arg))
            .map(arg => message.guild.members.cache.get(arg.replace(/[^0-9]/gi, '')) || message.guild.members.cache.find(c => c.user.username === arg) || message.guild.members.cache.find(c => c.nickname === arg))

        return users;
    }
    function getUsers(arg = false) {

        const args = arg ? arg.split(" ") : this.args;

        const users = args
            .filter(arg => client.users.cache.get(arg.replace(/[^0-9]/gi, '')) || client.users.cache.find(c => c.user.username === arg) || client.users.cache.find(c => c.nickname === arg))
            .map(arg => client.users.cache.get(arg.replace(/[^0-9]/gi, '')) || client.users.cache.find(c => c.user.username === arg) || client.users.cache.find(c => c.nickname === arg))

        return users;
    }
    client.functions = {
      get: {
        channels: getChannels,
        emojis: getEmojis,
        roles: getRoles,
        members: getMembers,
        users: getUsers
      }
    }
    // ============== FUNCTIONS END ==============
    if(command) console.log(`${message.author.tag} usou: ${command.name || "'n sei'"} `)
    if (command) command.run(client, message, args, prefix);
    let totalCmds = await client.db.ref(`comandos`).once('value').then(r => r.val());
    let calcCMD = Number(totalCmds) + Number(1);
    if (command) client.db.ref(`comandos`).set(calcCMD)
    
if(!message.member)
message.member = message.guild.fetchMember(message)


    if (!command) {
      let args2 = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd2 = args2.shift().toLowerCase();
      let cmds = client.commands.map(c => c.name);
      let cmds2 = [client.aliases, ...cmds];
      if (didYouMean(cmd2, cmds2) === null) return message.respond(`${message.author}, parece que esse comando não foi encontrado`)
  message.channel.send(`Desculpe ${message.author}, mas o comando ${cmd2} não foi encontrado, Talvez você queira dizer \`${didYouMean(cmd2, cmds2)}\``)
    }
   } catch (e) { 
     console.error(e)
   }


}