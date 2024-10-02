const Discord = require('discord.js');
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'morse',
  aliases: ['códigomorse', 'codigomorse'],
  usage: 'morse <frase ou código a ser codificado/decodificado>',
  description: 'codifica uma frase para o código morse',
  category: 'fun',
  run: async (client, message, args) => {
    const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const morse = '/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----'.split(',');
    let text = args.join(' ').toUpperCase();
	               if (!text) return message.respond('Insira um texto ou um código para ser decodificado ou codificado');

    while (text.includes('Ä') || text.includes('Ö') || text.includes('Ü')) {
      text = text.replace('Ä', 'AE').replace('Ö', 'OE').replace('Ü', 'UE');
    }
    if (text.startsWith('.') || text.startsWith('-')) {
      text = text.split(' ');
      const { length } = text;
      for (i = 0; i < length; i++) {
        text[i] = alpha[morse.indexOf(text[i])];
      }
      text = text.join('');
    } else {
      text = text.split('');
      const { length } = text;
      for (i = 0; i < length; i++) {
        text[i] = morse[alpha.indexOf(text[i])];
      }
      text = text.join(' ');
    }
    const morsereader = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Tradutor de Código Morse')
      .setDescription(`:point_right::radio: Resultado foi: \n \`\`\`${text}\`\`\``);
    await message.respond(morsereader);
  },

};