const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
module.exports = {
  name: 'caçar',
  aliases: ['hunt', 'cacar'],
  category: 'economy',
  run: async (client, message, args) => {



  let argumento = args[0];
  let vara = await client.db.ref(`Users/${message.author.id}/itens/arco`).once('value').then(s => s.val());
if (vara !== true) {
  message.respond(`Você não possui um arco de caça!`)
} else {


  let peixes = Math.floor(Math.random() * 7) + 1;


    let user = message.author;
    let timeout = 1800000;
    let author = await db.fetch(`cooldownHunt_${user.id}`);
  if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.respond(`**Você já caçou nos ultimos 30 minutos! Tente novamente em ${time.minutes} minutos e ${time.seconds} segundos!**`)
  } else { 
    

  const embed = new Discord.MessageEmbed()
  .setTitle(`\🏹 Caça!`)
  .setColor('BROWN')
  .setDescription(`\🏹 Você caçou **${peixes}** quilos de carne!`)
  .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
  message.respond(embed)
  
  let antes = await client.db.ref(`Users/${message.author.id}/carne`).once('value').then(w => w.val()) || 0;
  client.db.ref(`Users/${message.author.id}`).update({
    carne: Number(antes) + Number(peixes)
  })
  db.set(`cooldownHunt_${user.id}`, Date.now())

  }

}
}
}