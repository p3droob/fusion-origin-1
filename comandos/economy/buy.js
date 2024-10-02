const db = require('quick.db');
const Discord = require('discord.js');
const moment = require('moment-timezone');
module.exports = {
  name: 'buy',
  aliases: ['comprar'],
  category: 'economy',
  run: async (client, message, args) => {
let authorid1 = message.author.id;
let prefix = await client.db.ref(`Guild/${message.guild.id}/prefix`).once('value').then(ref => ref.val()) || 'f!';
        let purchase = args[0].toLowerCase();
        if(!purchase) return message.respond('Oque você deseja comprar?\nleia o código de compra no ' + prefix + 'shop')
        let amount = await client.db.ref(`Users/${message.author.id}/flocos`).once('value').then(ref => ref.val());

        let vip = await client.db.ref(`Users/${message.author.id}/vip`).once('value').then(ref => ref.val());

        let matchBow = await client.db.ref(`Users/${message.author.id}/itens/arco`).once('value').then(ref => ref.val());

        let keys = await client.db.ref(`Users/${message.author.id}/keys`).once('value').then(ref => ref.val());

        let tran = await client.db.ref(`Users/${message.author.id}/transactions`).once('value').then(ref => ref.val()) || [];
        if (purchase === 'arco') {
          if (matchBow) return message.respond('Você já possui um arco!')
          if (amount < 20000) {
             message.respond('Você não possui 20 mil flocos!')
          } else {
            message.respond('Você acaba de comprar um arco de caça!')
            client.db.ref(`Users/${message.author.id}/itens`).update({
              arco: true
            })
            let msgT = `\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Gastou 20000 flocos na compra de um arco de caça.`
            client.db.ref(`Users/${message.author.id}`).update({
              flocos: Number(amount) - Number(20000),
              transactions: [msgT, ...tran]
            })
          }
        }
        if (purchase === 'premium') {
        if(args[1] === '3') {
            if(amount < 1000000) return message.respond('você não possui flocos suficientes para realizar essa compra!');
            if (vip === true) {
              
//update
              message.respond(`Você já possui um vip ativo!`)
            } else {
            await client.db.ref(`Users/${message.author.id}`).update({
              flocos: Number(amount) - Number(1000000),
              vip: true,
              vipEnd: Date.now() + 7776000000,
              vipType: 3,
              keys: 3
            })//removendo os 
            message.respond('Você comprou um **Premium de 3 meses** com sucesso!')
            }
        }
            if(args[1] === '6'){
            if(amount < 1500000) return message.respond('você não possui flocos suficientes para realizar essa compra!');
            await client.db.ref(`Users/${message.author.id}`).update({
              flocos: Number(amount) - Number(1500000),
              vip: true,
              vipEnd: Date.now() + 15552000000,
              vipType: 6,
              keys: 4
            })
            message.respond('Você comprou um **Premium de 6 meses** com sucesso!')
        }
        }
        if(purchase === 'key'){
            if(amount < 60000) return message.respond('você não possui flocos suficientes para realizar essa compra!');await client.db.ref(`Users/${message.author.id}`).update({
              flocos: Number(amount) - Number(60000)
            })
            message.respond('Você comprou uma **key premium** com sucesso!')
        }
}
}