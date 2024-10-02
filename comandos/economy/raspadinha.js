const moment = require('moment-timezone');
module.exports = {
  name: 'raspadinha',
  aliases: ['scratchy'],
  category: 'economy',
  run: async (client, message, args, prefix) => {
    const getUser = await client.db.ref(`Users/${message.author.id}`).once('value').then(r => r.val());
    function handleBoard(array) {
  let str = '';
  
  let pages = Math.ceil(array.length / 3);

  for(let i = 0; i < pages; i++) str += array.slice((i * 3), (i + 1) * 3).join("") + "\n" 
return str
};

    if (args[0] !== 'buy') {
      const noBuy = new client.embed()
      .setTitle('Raspadinha')
      .setDescription(`Se está querendo comprar uma raspadinha use \`${prefix}raspadinha buy\` e compre uma por apenas 500 flocos. Se você não conseguir nenhuma combinação, você perde 1500\n\nVocê ganha um prêmio quando consegue uma combinação na horizontal ou vertical, abaixo os valores:\n\n> 🔥 -> 20000 flocos\n🔷 -> 10000 flocos\n🐶 -> 2000 flocos\nBoa sorte!`);
      message.respond(noBuy)
    }
    if (args[0] == 'buy') {
      if ((getUser.flocos || 0) < 1500) return message.respond('Você não possui 1500 flocos para comprar esta raspadinha!');
      client.db.ref(`Users/${message.author.id}/flocos`).set(Number(getUser.flocos || 0) - Number(1500))
      const porcentagem = {
            '🐶': {
                porcentagem: 40,
                nome: '🐶',
                id: '🐶',
                valor: 2000
            },
            '🔷': {
                porcentagem: 25,
                nome: '🔷',
                id: '🔷',
                valor: 10000
            },
            '🔥': {
                porcentagem: 10,
                nome: '🔥',
                id: '🔥',
                valor: 20000
            }
        };

        const emojis = ['🐶', '🔷', '🔥'];

        const array2 = [];

        for (let i = 0; i < emojis.length; i++) {
            for (let y = 0; y < porcentagem[emojis[i]].porcentagem; y++) {
                array2.push(porcentagem[emojis[i]])
            }
        }

        function embaralhar(a) {
            let indice_atual = a.length, valor_temporario, indice_aleatorio;

            while (0 !== indice_atual) {
                indice_aleatorio = Math.floor(Math.random() * indice_atual);
                indice_atual -= 1;

                valor_temporario = a[indice_atual];
                a[indice_atual] = a[indice_aleatorio];
                a[indice_aleatorio] = valor_temporario;
            }

            return a;
        }
      const raspadinha = embaralhar(array2).slice(0, 9)
      function splitArray(array, size) {
    const result = []
    for(let i = 0;i < array.length;i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
}
this.board = raspadinha;

function checkVertical() {
        const array = splitArray(raspadinha.map(a => a.nome), 3)
        const result = [];
        for(let i = 0;i < array.length;i++) {
            let index = 0 + (i * 1)
            const line = array.map(e => e[i])
            const previus = [null, null]
            for(let i = 0;i < line.length;i++) {
                index+=7
                const part = line[i]
                if(part === null) {
                    previus.pop()
                    previus.unshift(part)
                    continue
                }
                if(previus.every(p => p === part)) {
                    result.push(part)
                }
                previus.pop()
                previus.unshift(part)
            }
        }
        return result.length !== 0 ? result : null;
    }
      function checkHorizontal() {
        const array = splitArray(raspadinha.map(a => a.nome), 3)
        const result = [];
        let index = 0
        for(let l = 1; l < array.length;l++) {
            const line = array[l]
            const previus = [null, null]
            for(let i = 0;i < line.length;i++) {
                index++
                const part = line[i]
                if(part === null) {
                    previus.pop()
                    previus.unshift(part)
                    continue
                }
                if(previus.every(p => p === part)) {
                  result.push(part)
                }
                previus.pop()
                previus.unshift(part)
            }
        }
        return result.length !== 0 ? result : null
    }
      const buy = new client.embed()
      .setTitle('Raspadinha comprada!')
      .setDescription(`Reaja com 🎉 se você conseguiu alguma combinação, se reagir e não houver sequências corretas você perderá 1500 flocos\n Tome cuidado!\n\n${handleBoard(raspadinha.map(r => r.nome))}`)
      message.respond(buy).then(msg => {
        msg.react('🎉');
        let filter = (reaction, user) => reaction.emoji.name === '🎉' && user.id === message.author.id;
        msg.createReactionCollector(filter, { time: 90000, max: 1 }).on('collect', async ( reaction, user) => {
          let total = 0;
          if (checkHorizontal() !== null) {
            checkHorizontal().forEach(i => {
              total += porcentagem[i].valor;
            })
            }
            if (checkVertical() !== null) {
              checkVertical().forEach(i => {
              total += porcentagem[i].valor;
            })
            }
            if (total === 0) {
              let tran = getUser.transactions || [];
              tran.unshift(`\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Perdeu 1500 flocos na compra de uma raspadinha`)
              client.db.ref(`Users/${message.author.id}`).update({
                transactions: tran,
                flocos: Number(getUser.flocos || 0) - Number(1500)
              })
            return msg.respond(`Humm ${message.author}, que pena mas parece que você não ganhou nada na raspadinha, você perdeu 1500 flocos!`);
            }
            let tran = getUser.transactions || [];
              tran.unshift(`\`${moment(Number(Date.now())).tz('America/Sao_Paulo').format('L')} ${moment(Number(Date.now())).tz('America/Sao_Paulo').format('LT')}\` ❄️ Recebeu ${total} flocos em uma raspadinha`)
              client.db.ref(`Users/${message.author.id}`).update({
                transactions: tran,
                flocos: Number(getUser.flocos || 0) + Number(total)
              })
              msg.respond(`Parabéns ${message.author}, você ganhou ${total} flocos nessa raspadinha`)
        })
      })
    }
  }
}