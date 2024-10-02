module.exports = {
  name: 'space',
  aliases: ['espaço', 'espacial'],
  category: 'economy',
  run: async (client, message, args, prefix) => {
    const getMember = await client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/games/space`).once('value').then(r => r.val());
    function randomString() {
      let array = 'abcdefghijklmnopqrstuvwxyz1234567890';
      array = array.split('');
      let str = ''
      for (let next of array)  {
      str += array[Math.floor(Math.random() * array.length)]
      }
      return str.split('').slice(0, 6).join('').toUpperCase()
    }
    const getGroups = await client.db.ref(`Guilds/${message.guild.id}/space/groups`).once('value').then(r => r.val()) || [];
    //console.log(getGroups.map(g => g.players))
    const verify = new client.embed()
    .setTitle(`Space`)
    .setDescription(`Para poder jogar, você deve possuir um grupo de 3 a 6 pessoas.\n\n>>> \`${prefix}space criar\` para criar um grupo\n\`${prefix}space entrar <id do grupo>\` para entrar em um\n\`${prefix}space grupos\` para ver os grupos disponíveis\n\`${prefix}space start <id>\` para começar um jogo`)
    .setFooter('Lembrando que cada grupo é apenas para o servidor onde foi criado');
    if (!['criar', 'entrar', 'grupos', 'start'].includes(args[0])) return message.respond(verify)

    if(args[0] === 'start') {
      if (!args[1]) return message.respond('Informe um id de grupo para inciar!');
      if (!getGroups.find(g => g.id === args[1])) return message.respond('Grupo inexistente!');
      if (getGroups.find(g => g.id === args[1]).owner !== message.author.id) return message.respond('Você não é o dono desse grupo!');
      if (getGroups.find(g => g.id === args[1]).players?.length !== Number(getGroups.find(g => g.id === args[1]).max)) return message.respond('Esse jogo não está cheio!')
      message.channel.send('O jogo começará em breve...');
      new client.games.space.multiplayer(client, message, args[1]).run()
    }

    if (args[0] === 'grupos') {
      if (getGroups.length === 0) return message.respond(new client.embed().setTitle('Não há grupos disponíveis!').setFooter(`Crie um usando ${prefix}space criar`));
      const groups = new client.embed()
      .setTitle(`Grupos online agora`)
      .setDescription(`**⠀⠀⠀Nome |⠀⠀ID⠀ | Players | Criador**\n` + getGroups.map(g => `**[ ${client.controllers.emojis.status[g.status]} ]** ${g.name} - ${g.id} - ${g.players?.length ?? 1}/${g.max} - ${client.users.cache.get(g.owner).username.slice(0, 10)}`).join('\n'));
      message.respond(groups)
    }
    if (['criar', 'create'].includes(args[0])) {
      let filter = m => m.author.id === message.author.id;
      let embedToCreate = new client.embed()
      .setTitle('Prontinho, agora complete os passos a seguir:')
      .setDescription(`Fale qual será o nome do grupo`)
      message.channel.send(embedToCreate).then(msg => {
        let colectorName = message.channel.createMessageCollector(filter, { time: 90000 })
        .on('collect', async m => {
          let name = m.content;
          if (getGroups.map(g => g.name).includes(name)) return m.respond('Já existe um grupo com esse nome!');
          if (name.length > 8) return m.respond('O máximo de caracteres que o nome poderá ter é 8')
          embedToCreate.setDescription(`Qual será o máximo de usuários que esse grupo poderá ter?(entre 3 e 8)`)
          msg.edit(embedToCreate)
          colectorName.stop()
          let coletorMaxUsers = message.channel.createMessageCollector(filter, { time: 90000 })
          .on('collect', async m2 => {
            let max = m2.content;
            if (isNaN(max)) return m2.respond('Deve ser um número!');
            if (max > 8 || max < 2) return m2.respond('Deve ser **entre 3 e 8**');
            coletorMaxUsers.stop()
            let code = randomString();
            for (let i = 0; i< 10; i++) {
              if (getGroups.map(g => g.id).includes(code)) code = randomString()
            }
            getGroups.unshift({name: name, max: Number(max), id: code, owner: message.author.id, players: [message.author.id], status: 'idle'})
            client.db.ref(`Guilds/${message.guild.id}/space/groups`).set(getGroups)
            client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/games/space`).set(code)
            msg.edit(`Grupo criado com sucesso, agora chame amigos para entrar!`)
          })
        })
      })
    }
    if (args[0] === 'entrar') {
      if (getMember !== null) return message.respond(`Hmm, parece que você não pode entrar em um novo jogo, já que você já está participando de um. Código do jogo: ${getMember}`)
      let map = getGroups.map(g => g.id);
      if (getGroups.length < 1) return message.respond('Não há grupos disponíveis!');

      if (!args[1]) return message.respond('`'+prefix+'space entrar <id>`');

      if (!map.includes(args[1])) return message.respond(`${message.author}, esse grupo não foi encontrado, tente procurar por um válido!`);
      console.log(getGroups.find(g => g.id === args[1]).players.length, getGroups.find(g => g.id === args[1]).max)
      if (getGroups.find(g => g.id === args[1]).players?.length >= getGroups.find(g => g.id === args[1]).max)return message.respond(`Esse grupo está cheio, procure outro ou crie o seu próprio.`);
      if (getGroups.find(g => g.id === args[1]).status !== 'idle') return message.respond('Esse jogo já começou!');
      let index = getGroups.indexOf(getGroups.find(g => g.id === args[1]));

      let getGrupo = getGroups.find(g => g.id === args[1]);
      getGrupo.players.push(message.author.id);
      getGroups[index] = getGrupo;
      client.db.ref(`Guilds/${message.guild.id}/space/groups`).set(getGroups);
      client.db.ref(`Guilds/${message.guild.id}/users/${message.author.id}/games/space`).set(getGrupo.id)
      message.respond('Sucesso, agora aguarde o jogo começar.')
    }
  }
}