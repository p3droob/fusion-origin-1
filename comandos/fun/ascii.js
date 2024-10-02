const figlet = require('figlet');
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'ascii',
  aliases: ['sayascii'],
  usage: 'ascii <mensagem>',
  description: 'Manda uma mensagem e ascii',
  category: 'fun',
  run: async (client, message, args) => {
    if (!args[0]) return message.respond('Por favor Digite algo');
    if (args[0].length > 32) return message.respond('Você não pode digitar mais de 32 caracteres');
    let msg = args.join(' ');

    figlet.text(msg, (err, data) => {
      if (err) {
        message.respond('Algo deu errado ao executar este comando');
        message.respond(err);
      }
      if (data.length > 2000) return message.respond('Por favor digite algo com menos de 2000 caractéres!');

      message.respond(`\`\`\`${data}\`\`\``);
    });
  },

};