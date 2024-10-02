const moment = require("moment-timezone");
module.exports = class Transactions {
  constructor(client, value, setar, ...users) {
    this.client = client;
    this.value = value;
    this.set = setar || false;
    this.users = users || [];
    this.usage = 'client, value, Boolean(setar), ...users'
  }

  async hospital(paciente) {
    let string = `\`[ ${moment(Date.now()).tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:MM').replace('AM', '').replace('PM', '')}]\` Recebeu **${this.value} flocos** ao tratar o paciente **${paciente.name}**`;
    if(this.set === false) return string;
    let transacoes = await this.client.db.ref(`Users/${this.users[0].id}/transactions`).once('value').then(r => r.val()) || [];
    transacoes.unshift(string);
    this.client.db.ref(`Users/${this.users[0].id}/transactions`).set(transacoes);
  }
  async mine(mine)  {
    let string = `\`[ ${moment(Date.now()).tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:MM').replace('AM', '').replace('PM', '')}]\` Recebeu **${this.value} flocos** na mina **${mine}**`;
    if(this.set === false) return string;
    let transacoes = await this.client.db.ref(`Users/${this.users[0].id}/transactions`).once('value').then(r => r.val()) || [];
    transacoes.unshift(string)
    this.client.db.ref(`Users/${this.users[0].id}/transactions`).set(transacoes);
  }
  async pay() {
    let string1 = `\`[ ${moment(Date.now()).tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:MM').replace('AM', '').replace('PM', '')}]\` Enviou **${this.value} flocos** para **${this.users[1].username ?this.users[1].username : this.client.users.cache.get(this.users[1].id).username}** \`(${this.users[1].id})\``;
    let string2 = `\`[ ${moment(Date.now()).tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:MM').replace('AM', '').replace('PM', '')}]\` Recebeu **${this.value} flocos** de **${this.users[0].username}** \`(${this.users[0].id})\``;
    if(this.set === false) return [string1, string2];
    let transacoes1 = await this.client.db.ref(`Users/${this.users[0].id}/transactions`).once('value').then(r => r.val()) || [];
    transacoes1.unshift(string1)
    this.client.db.ref(`Users/${this.users[0].id}/transactions`).set(transacoes1);
    let transacoes2 = await this.client.db.ref(`Users/${this.users[1].id}/transactions`).once('value').then(r => r.val()) || [];
    transacoes2.unshift(string2)
    this.client.db.ref(`Users/${this.users[1].id}/transactions`).set(transacoes2);
  }

  async daily() {
    let string = `\`[ ${moment(Date.now()).tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:MM').replace('AM', '').replace('PM', '')}]\` Recebeu ${this.value} no daily`
    let transacoes = await this.client.db.ref(`Users/${this.users[0].id}/transactions`).once('value').then(r => r.val()) || [];
    transacoes.unshift(string)
    this.client.db.ref(`Users/${this.users[0].id}/transactions`).set(transacoes);
  }
}