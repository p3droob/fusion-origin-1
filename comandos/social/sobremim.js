const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
  name: 'sobremim',
  aliases: ['aboutme'],
  usage: 'sobremim <texto>',
  category: 'social',
  run: async (client, message, args, prefix) => {
    const aboutme1 = args.join(' ');
    const aboutmeEmbed = new MessageEmbed()
    .setColor('RED')
    .setTitle('ℹ | `f!aboutme`')
    .setDescription('não altere essa mensagem')
    .addField("Alterar o Sobre Mim", "`f!aboutme Olá !`")
    .addField("ℹ Aliases:", "`sobremim`")
    .setFooter(`• Autor: ${message.author.tag} - Social`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
    if (!aboutme1) return message.respond(`siga o exemplo a seguir:\n${prefix}sobremim Olá eu sou o Fusion!`);

    const user = message.author;
    client.db.ref(`Users/${message.author.id}`).update({
      aboutme: aboutme1
    })


    message.respond(`sua mensagem de perfil foi alterada com sucesso para \`${aboutme1}\`, use ${prefix}perfil para visualizar sua nova mensagem!`);
  },
};