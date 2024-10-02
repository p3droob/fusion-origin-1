const Discord = require("discord.js")
module.exports = async (client, message) => {
let db = await client.db.ref('Users').once('value').then(r => r.val());

Object.keys(db).forEach(v => {
  if (!db[v].vip) return;
  let getBadges = db.badges || [];
  getBadges.push('<:vip_badge:883459592640667678>')
  client.db.ref(`Users/${v}/badges`).set(getBadges)
})


let array = Array.from(Object.keys(db))
let arr = [];
array.forEach(e => {
let verify1 = db[e].games;
if (!verify1) return;
let verify2 = verify1.pesca;
if (!verify2) return;
let verify3 = verify2.singleplayer;
if (!verify3) return;
client.db.ref(`Users/${e}/games/pesca/singleplayer`).remove()
})

setInterval(async () => {
  array.forEach(async e => {
let pegar1 = db[e].vip;
if (pegar1 !== true) return;
let pegar2 = await client.db.ref(`Users/${e}/flocos`).once('value').then(r => r.val());
client.db.ref(`Users/${e}`).update({
  flocos: Number(pegar2) + 5
})
})
}, 60000)

const dbG = await client.db.ref(`Guilds`).once('value').then(r => r.val());
setInterval(async () => {
  Object.keys(db).forEach(e => {
  let ver1 = db[e].vip;
  if (!ver1) return;
  let ver2 = db[e].vipEnd;
  if (!ver2) {
    client.db.ref(`Users/${e}`).update({
      vip: null,
      vipEnd: null,
      keys: null
    })
    Object.keys(dbG).forEach(g => {
      if (!dbG[g].key) return;
      client.db.ref(`Guilds/${g}`).update({
        premium: null,
        key: null
      })
    })
    return;
  }
  if (Date.now >= ver2) {
    client.db.ref(`Users/${e}`).update({
      vip: null,
      vipEnd: null,
      keys: null
    })
    Object.keys(dbG).forEach(g => {
      if (!dbG[g].key) return;
      client.db.ref(`Guilds/${g}`).update({
        premium: null,
        key: null
      })
    })
  }
})
}, 60000)

let activities = [
      `Utilize ..help para obter ajuda`,
      `Estou em ${client.guilds.cache.size} servidores!`,
      `Meu prefixo é ".."`,
      `Cuido de ${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
      }), 1000 * 60); 
  client.user
      .setStatus("online")
     .catch(console.error);
console.log(`${client.user.username} Está pronto!`)
      let channel = client.channels.cache.get("824611809403207721")
      const acordei = new Discord.MessageEmbed()
      .setTitle(`Acabei de Reinciar`)
      .addField("Meus Status", `Ping: ${Math.round(client.ws.ping)}\nServidores: ${client.guilds.cache.size}\nUsuarios: ${client.users.cache.size}`)
      .setFooter(`${client.user.username} aqui novamente`)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      channel.send(acordei);

      let verifyTime = await client.db.ref(`LastPaciente`).once('value').then(p => p.val()) || 0;
      if ((Number(verifyTime) + Number(10800000)) >= Date.now()) console.log(`Nenhum paciente foi adicionado à fila, próximo em: ${client.msToTime(verifyTime + 10800000 - Date.now())}`)
      if ((Number(verifyTime) + Number(10800000)) >= Date.now()) return setTimeout(async () => {
        let random = {
        years: Math.round(Math.random() * 52) + 3
      };
      let arrays = {
        name: ['Lucas', 'Maria', 'João', 'Pedro', 'Davi', 'Paulo', 'Daniel', 'Luana', 'Francisco', 'Thiago', 'Felipe', 'Isabela', 'Milena', 'Gabriela', 'Gabriel', 'Yasmin', 'Letícia', 'Miguel','Alice', 'Arthur', 'Laura', 'Lorena', 'Júlia', 'Gustavo', 'Henrique'],
        disease: ['covid-19', 'gripe', 'dengue', 'câncer'],
        toHealth: ['ivermectina', 'suco de laranja', 'dipirona monoidratada', 'quimioterapia']
      }
      random.name = arrays['name'][Math.floor(Math.random() * arrays.name.length)];

      random.disease = arrays['disease'][Math.floor(Math.random() * arrays.disease.length)];

      random.toHealth = arrays['toHealth'][arrays.disease.indexOf(random.disease)];

      const pacientes = await client.db.ref(`Pacientes`).once('value').then(l => l.val()) || [];
      if ((pacientes.map(p => p.name)).includes(random.name)) return console.log('O paciente ' + random.name + ' não foi adicionado à fila pois já existe algum com esse nome');
      pacientes.push(random)
      client.db.ref(`Pacientes`).set(pacientes)
      client.db.ref(`LastPaciente`).set(Date.now())

      client.channels.cache.get('889662316579270677').send(new client.embed().setTitle('Novo paciente').setDescription(`Informações:\n\nNome: ${random.name}\nIdade: ${random.years}\nDoença: ${random.disease}`))
      setInterval(async () => {
                let random = {
        years: Math.round(Math.random() * 52) + 3
      };
      let arrays = {
        name: ['Lucas', 'Maria', 'João', 'Pedro', 'Davi', 'Paulo', 'Daniel', 'Luana', 'Francisco', 'Thiago', 'Felipe', 'Isabela', 'Milena', 'Gabriela', 'Gabriel', 'Yasmin', 'Letícia', 'Miguel','Alice', 'Arthur', 'Laura', 'Lorena', 'Júlia', 'Gustavo', 'Henrique'],
        disease: ['covid-19', 'gripe', 'dengue', 'câncer'],
        toHealth: ['ivermectina', 'suco de laranja', 'dipirona monoidratada', 'quimioterapia']
      }
      random.name = arrays['name'][Math.floor(Math.random() * arrays.name.length)];

      random.disease = arrays['disease'][Math.floor(Math.random() * arrays.disease.length)];

      random.toHealth = arrays['toHealth'][arrays.disease.indexOf(random.disease)];

      const pacientes = await client.db.ref(`Pacientes`).once('value').then(l => l.val()) || [];
      if ((pacientes.map(p => p.name)).includes(random.name)) return console.log('O paciente ' + random.name + ' não foi adicionado à fila pois já existe algum com esse nome');
      pacientes.push(random)
      client.db.ref(`Pacientes`).set(pacientes)
      client.db.ref(`LastPaciente`).set(Date.now())

      client.channels.cache.get('889662316579270677').send(new client.embed().setTitle('Novo paciente').setDescription(`Informações:\n\nNome: ${random.name}\nIdade: ${random.years}\nDoença: ${random.disease}`))
      }, 10800000)
      }, verifyTime + 10800000 - Date.now())
      let random = {
        years: Math.round(Math.random() * 52) + 3
      };
      let arrays = {
        name: ['Lucas', 'Maria', 'João', 'Pedro', 'Davi', 'Paulo', 'Daniel', 'Luana', 'Francisco', 'Thiago', 'Felipe', 'Isabela', 'Milena', 'Gabriela', 'Gabriel', 'Yasmin', 'Letícia', 'Miguel','Alice', 'Arthur', 'Laura', 'Lorena', 'Júlia', 'Gustavo', 'Henrique', 'Caio'],
        disease: ['covid-19', 'gripe', 'dengue', 'câncer'],
        toHealth: ['ivermectina', 'suco de laranja', 'dipirona monoidratada', 'quimioterapia']
      }
      random.name = arrays['name'][Math.floor(Math.random() * arrays.name.length)];

      random.disease = arrays['disease'][Math.floor(Math.random() * arrays.disease.length)];

      random.toHealth = arrays['toHealth'][arrays.disease.indexOf(random.disease)];

      const pacientes = await client.db.ref(`Pacientes`).once('value').then(l => l.val()) || [];
      if ((pacientes.map(p => p.name)).includes(random.name)) return console.log('O paciente ' + random.name + ' não foi adicionado à fila pois já existe algum com esse nome');
      pacientes.push(random)

      client.db.ref(`Pacientes`).set(pacientes)
      client.db.ref(`LastPaciente`).set(Date.now())

      client.channels.cache.get('889662316579270677').send(new client.embed().setTitle('Novo paciente').setDescription(`Informações:\n\nNome: ${random.name}\nIdade: ${random.years}\nDoença: ${random.disease}`))
};
