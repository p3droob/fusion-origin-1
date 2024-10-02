const Discord = require('discord.js');
const Caxinha = require('caxinha')
module.exports = {
  name: 'trash',
  category: 'fun',
  run: async (client, message, args) => {
    
    let member = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

    let image = await Caxinha.canvas.trash(member.displayAvatarURL({ dynamic: false, format: 'png' }));

    let attachment = new Discord.MessageAttachment(image, "trash.png");

    message.respond(attachment);
  }
}