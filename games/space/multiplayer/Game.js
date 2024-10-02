module.exports = class Space {
  constructor(client, message, id) {
    this.client = client;
    this.message = message;
    this.id = id;
    this.status = 'IN';
  }
  async run() {
    const message = this.message;
    const getGroups = await this.client.db.ref(`Guilds/${message.guild.id}/space/groups`).once('value').then(r => r.val()) || [];
    const getGroup = getGroups.find(g => g.id === this.id);
    const start = new this.client.embed()
    .setTitle('Jogo começando')
    .setDescription('Para que o jogo seja iniciado, é necessário que todos os jogadores que entraram reajam com ✅  e abram seu privado.')
    message.respond(start).then(async msg => {
      const playersList = await msg.respond(`Lista de prontos:`)
      msg.react('✅');
      let filter = (reaction, user) => user.id !== this.client.user.id;
      let prontos = [];
      let coletorReady = msg.createReactionCollector(filter, { time: 180000 })
      .on('collect', async (reaction, user) => {
        if (!getGroup.players?.includes(user.id)) return;
        if (prontos.includes(user.id)) return;
        prontos.push(user.id);
        playersList.edit(`Lista de prontos:\n${prontos.map((u, i) => `**[ ${i+1} ] - ${this.client.users.cache.get(u)?.username}**`).join('\n')}`)
        if (prontos.length === getGroup.players?.length) {
           coletorReady.stop();
           playersList.edit('Todos os jogadores já entraram, jogo começando em 20 segundos')
           setTimeout(() => {
             message.channel.send(`O jogo começou, há um impostor entre vocês. Seus papéis foram enviados no privado 😉`).then(async started => {
               let players = await this.client.db.ref(`Guilds/${message.guild.id}/space/groups`).once('value').then(r => r.val()) || [];
               players = players.find(g => g.id === this.id).players;
               const impostor = players[Math.floor(Math.random() * players?.length)];
               players?.splice(players.indexOf(impostor), 1);
               const detetive = players[Math.floor(Math.random() * players?.length)];
               players?.splice(players?.indexOf(detetive), 1);
               const inocentes = players;
               players = getGroup.players?.map(u => {
                 let info = {
                   id: u
                 };
                 if (u === impostor) info.role = 'Impostor';
                 if (u === detetive) info.role = 'Detetive';
                 if (u !== detetive && u !== impostor) {
                   info.role = 'Inocente';
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
                   info.tasks = embaralhar(['Acabar com os Asteroides', 'Ajustar a Potência do Motor', 'Arrumar Fiação', 'Calibrar o Distribuidor', 'Esvaziar Escotilha', 'Esvaziar o Lixo', 'Estabilizar a Direção ', 'Enviar Scan']).slice(0, 3)
               }
                 return info;
               })
               players.forEach(u => {
                 this.client.users.cache.get(u.id)?.send(`Obrigado por participar do jogo, seu cargo é **${u.role}**. Aguarde`).catch(e => {
                   this.status = 'END';
                   return message.channel.send(`Não foi possível enviar o papel de ${this.client.users.cache.get(u.id)}, portanto ele estragou o jogo 😡`)
                 })
               })
               if (this.status === 'END') return;
               this.status = 'IN';
               let rotation = players;
               const actions = {
                 Detetive: {
                   message: `🔫 - Atirar em alguém\n❌ - Passar`,
                   reactions: [ '🔫', '❌' ]
                 },
                 Impostor: {
                   message: `🔪 - Matar alguém\n❌- Passar`,
                   reactions: [ '🔪', '❌' ]
                 },
                 Inocente: {
                   message: function (tasks) {
                     let rand = Math.floor(Math.random() * tasks.length)
                     let nowTasks = tasks[rand];
                     tasks.splice(rand, 1);
                     return `🖥️ - Fazer tarefa ${nowTasks}`;
                     },
                   reactions: ['🖥️']
                 }
               }
               for (let now of rotation) {
                 if (this.status === 'END') break;
                 message.channel.send(new this.client.embed().setTitle(`Está na vez de ${this.client.users.cache.get(now.id)?.username}`).setDescription(`${this.client.users.cache.get(now.id)} olhe seu privado`));
                 if (now.role === 'Inocente') {
                 this.client.users.cache.get(now.id).send(new this.client.embed().setTitle('Escolha uma ação! (90 segundos)').setDescription(actions[now.role].message(now.tasks)))
                 }
               }
             })
           }, 20000)
           }
      })
    })
  }
}
