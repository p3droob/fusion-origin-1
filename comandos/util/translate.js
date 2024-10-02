const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
  name: 'traduzir',
  aliases: ["translate", "traduczir"],
  usage: `traduzir <língua(pt, en, fr etc.)> <texto que será traduzido para o primeiro argumento>`,
  category: 'util',
  run: async (client, message, args) => {
    let lang = args[0];
    let texto = args.slice(1).join(" ");
    translate(texto, {to: lang}).then(res => {

    message.channel.send('Tradução: ' + res.text);
    
})

    }
}