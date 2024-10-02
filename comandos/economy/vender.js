const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  name: 'vender',
  aliases: ['sell'],
  usage: 'vender <carne>',
  category: 'economy',
run: async (client, message, args) => {
  

    let quantia = await client.db.ref(`Users/${message.author.id}/peixes`).once('value').then(r => r.val()) || 0;
    let quant = await client.db.ref(`Users/${message.author.id}/flocos`).once('value').then(k => k.val()) || 0;


    let argumentos = args.join(' ');

    if(!argumentos){
      const mandar = new Discord.MessageEmbed()
    .setTitle(`Vender oque?`)
    .addFields([
    {
      name: 'Carne:',
      value: `800 flocos cada`
    }
    ])
    message.respond(mandar)
    }

    if(argumentos === 'carne'){
    
      message.respond(`Quantos quilos de carne você irá vender?`).then(msg => {
    message.channel.createMessageCollector(a => a.author.id === message.author.id, { max: 1 })
    .on('collect', async (a) => {

    let argumentos1 = a.content
    if(isNaN(argumentos1)) return message.respond('Insira uma quantia válida!')
    let quantia3 = await client.db.ref(`Users/${message.author.id}/carne`).once('value').then(r => r.val()) || 0;
    if (Number(argumentos1) > Number(quantia3)) return message.respond(`Você não possui quilos de carne suficientes!`)
    let quant3 = await client.db.ref(`Users/${message.author.id}/flocos`).once('value').then(k => k.val()) || 0;
    let vendido = 800 * argumentos1;

    
    client.db.ref(`Users/${message.author.id}`).update({
      carne: Number(quantia3) - Number(argumentos1),
      flocos: Number(quant3) + Number(vendido)
    })
    const vendidoooo = new Discord.MessageEmbed()
    .setTitle(`Venda`)
    .setDescription(`Você vendeu **${argumentos1}** quilos de carne por **${vendido} flocos**!`)
    message.respond(vendidoooo)
    
    
    })
      })
    }

}
}