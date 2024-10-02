const moment = require('moment-timezone');
    const ms = require('parse-ms');
module.exports = {
  name: 'daily',
  aliases: ['daily', 'diario', 'diário'],
  usage: 'daily',
  category: 'economy',
  description: 'pegue seu prêmio diário',
  run: async (client, message, args) => {
    
    const user = message.author;

    const amount = Math.floor(Math.random() * 18500);
    
    let premiumGuild = await client.db.ref(`Guilds/${message.guild.id}/premium`).once('value').then(ref => ref.val());

    let vip = await client.db.ref(`Users/${message.author.id}/vip`).once('value').then(ref => ref.val());

    let atm = await client.db.ref('Users/' + message.author.id + '/flocos').once('value').then(d => d.val());
    let key = await client.db.ref(`Guilds/${message.guild.id}/key`).once('value').then(ref => ref.val());
    let tran = await client.db.ref(`Users/${message.author.id}/transactions`).once('value').then(r => r.val()) || [];
    //cooldown
    const timeout = 43200000;//
    const daily = await client.db.ref(`Users/${message.author.id}/cooldown/daily`).once('value').then(r => r.val())
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily));

      message.respond(`Você já coletou seu daily hoje! Tente de novo em **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
    } else {
      client.db.ref(`Users/${message.author.id}/cooldown/daily`).set(Date.now())
      //fora do cooldown
      if (premiumGuild) {
        if (vip) {
          let amount1 = Number(amount) * Number(3);
          message.respond(`Você iria receber ${amount} flocos mas graças à **${client.users.cache.get(key).username}**, que colocou uma key nesse servidor, e à você que comprou o premium, você ganhou ${amount1}, 3 vezes mais do que ganharia normalmente.`);
          new client.transactions(client, amount1, true, message.author).daily();
          client.db.ref(`Users/${message.author.id}`).update({
  flocos: Number(atm) + Number(amount1)
})
        } else {
          let amount2 = Number(amount) * Number(2);
          message.respond(`Você iria receber ${amount} flocos mas graças à **${client.users.cache.get(key).username}**, que colocou uma key nesse servidor, você ganhou ${amount2}, 2 vezes mais do que ganharia normalmente.`);
          new client.transactions(client, amount2, true, message.author).daily();

          client.db.ref(`Users/${message.author.id}`).update({
  flocos: Number(atm) + Number(amount2)
})
        }
        
      } else {
        if (vip) {
          let amount3 = Number(amount) * Number(2);
          message.respond(`Você iria receber ${amount} flocos mas, como você é um usuário premium, você ganhou ${amount3}, 2 vezes mais do que ganharia normalmente.`)
          new client.transactions(client, amount3, true, message.author).daily();
          let tranM = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Recebeu ${amount3} ao coletar o daily`

          client.db.ref(`Users/${message.author.id}`).update({
  flocos: Number(atm) + Number(amount3)
})
        } else {
          message.respond(`Você recebeu ${amount} flocos em seu daily!`);
          new client.transactions(client, amount, true, message.author).daily();

          client.db.ref(`Users/${message.author.id}`).update({
           flocos: Number(atm) + Number(amount)
         })
        }
      }
      


      

    }
  }
}