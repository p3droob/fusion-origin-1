const moment = require('moment-timezone');
module.exports = {
  name: 'hospital',
  description: 'Trabalhe no combate a covid-19 e outras doenças',
  category: 'economy',
  run: async (client, message, args, prefix) => {
    const getUser = await client.db.ref(`Users/${message.author.id}`).once('value').then(r => r.val()) || {};
    let filter = (reaction, user) => user.id === message.author.id;
    if (!getUser.doctor) return message.respond(new client.embed().setThumbnail('https://cdn.discordapp.com/attachments/734166656728694824/889656632311689216/unknown.png').setTitle('Você não é um médico!').setDescription('Reaja com 🧑‍⚕️ para se tornar um')).then(msg => {
      msg.react('🧑‍⚕️')
      msg.createReactionCollector(filter, { max: 1 }).on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '🧑‍⚕️') {
          client.db.ref(`Users/${message.author.id}/doctor`).set({
            startAt: Date.now()
          })
          msg.respond(`Parabéns ${message.author}, você acaba de ser contratado! Que tal começar cuidando de alguns pacientes? use \`${prefix}hospital pacientes\``)
        }
      })
      })
      if (!args[0]) return message.respond(new client.embed().setThumbnail('https://cdn.discordapp.com/attachments/734166656728694824/889656632311689216/unknown.png').setTitle('Oque você deseja fazer?').setDescription(`Ver a lista de pacientes: \`${prefix}hospital pacientes\`\nConsultar o guia: \`${prefix}hospital guia\`\nTratar paciente: \`${prefix}hospital tratar\``))

      if (args[0].toLowerCase() === 'guia') {
        const guide = new client.embed()
        .setTitle('Guia de um doutor')
        .setDescription(`Câncer: \`quimioterapia\`\nGripe: \`suco de laranja\`\nCovid-19: \`ivermectina\` (apesar de não comprovado é apenas um jogo)\nDengue: \`dipirona monoidratada\``)
        .setFooter('Não use estes medicamentos na vida real sem consentimento do seu médico!')
        message.respond(guide)
      }

      if (args[0].toLowerCase() === 'tratar') {
        const pacientes = await client.db.ref(`Pacientes`).once('value').then(p => p.val()) || [];
        if (pacientes.length === 0) return message.respond('Não há pacientes para você cuidar!');
        message.channel.send(new client.embed().setDescription('Agora fale o nome do paciente para tratar e qual será seu médicamento\n\n> Exemplo: `Pedro ivermectina`\nPara saber qual medicamento/tratamento é adequado para cada doença use `'+ prefix + 'hospital guia`\nEscreva cancelar para cancelar o tratamento.').setThumbnail('https://cdn.discordapp.com/attachments/734166656728694824/889867098174681138/unknown.png')).then(msg => {
          filter = (m) => m.author.id === message.author.id;
          let coletor = message.channel.createMessageCollector(filter, { time: 90000 })
          .on('collect', async (m) => {
            if (m.content.toLowerCase().includes('cancelar')) {
              coletor.stop()
              return m.respond('Tratamento cancelado');
            }
            let argumentos = m.content.split(/ +/g);
            if (!(pacientes.map(p => p.name)).includes(argumentos[0])) return m.respond('Esse paciente não está na fila de espera!');
            let paciente = pacientes[pacientes.map(p => p.name).indexOf(argumentos[0])];
            if (paciente.toHealth !== argumentos.slice(1).join(' ')) return m.respond(`Este medicamento não é adequado para o tratamento de \`${paciente.disease}\``);

            pacientes.splice(pacientes.indexOf(paciente), 1);
            client.db.ref(`Pacientes`).set(pacientes)
            m.respond(`Parabéns ${message.author}, você acaba de salvar uma vida! Como recompensa você recebeu 7 mil flocos.`);
            
            new client.transactions(client, 7000, true, message.author).hospital(paciente)
            client.db.ref(`Users/${message.author.id}`).update({
              flocos: Number(getUser.flocos || 0) + Number(7000),
              treatments: Number(getUser.flocos || 0) + Number(1)
            });
            coletor.stop()
          })
        })
      }
      if (args[0].toLowerCase() === 'pacientes') {

        const pacientes = await client.db.ref(`Pacientes`).once('value').then(p => p.val()) || [];
        if (pacientes.length === 0) return message.respond('Não há pacientes aguardando atendimento!');

        const maxPerPage = 5;
        const pages = Math.ceil(pacientes.length / maxPerPage);
        let page = 0;
        console.log(pages)
        let embed = new client.embed()
        .setThumbnail('https://cdn.discordapp.com/attachments/734166656728694824/889861879076372530/hospital-bed.png')
        .setTitle('Lista de pacientes aguardando atendimento [ ' + pacientes.length + ' ]')
        .setDescription(`**| idade | nome | doença |**\n` + pacientes.map(p => `**[ ${p.years} ] - ${p.name} 🧪 ${p.disease}**`).slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).join('\n'))
        .setFooter(`Página ${page+1}/${pages}`)
        message.respond(embed).then(msg => {
          msg.react('◀️');
          msg.react('▶️');
          
          msg.createReactionCollector(filter, { time: 90000 }).on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '◀️') {
              if (page <= 0) page = pages
                page--
                embed.setDescription(`**| idade | nome | doença |**\n` + pacientes.slice((page * maxPerPage, (page * maxPerPage) + maxPerPage)).map(p => `**[ ${p.years} ] - ${p.name} 🧪 ${p.disease}**`).join('\n'))
        .setFooter(`Página ${page+1}/${pages}`)
        msg.edit(embed)
            }
            if (reaction.emoji.name === '▶️') {
              if (page === (Number(pages) - 1)) page = -1;
                page++
                embed.setDescription(`**| idade | nome | doença |**\n` + pacientes.slice((page * maxPerPage, (page * maxPerPage) + maxPerPage)).map(p => `**[ ${p.years} ] - ${p.name} 🧪 ${p.disease}**`).join('\n'))
        .setFooter(`Página ${page+1}/${pages}`)
        msg.edit(embed)
            }
          })
        })
      }
  }
}