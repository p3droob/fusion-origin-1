const Discord = require("discord.js");

module.exports = {
  name: 'membros',
  aliases: ["members"],
  category: 'info',
  description: 'mostra a quantidade de membros no servidor',
  run: async (client, message, args) => {
    const embed = new client.embed(message.author)
    .addFields(
        {
            name: 'Membros',
             value: `**${message.guild.memberCount} total**\n**${message.guild.members.cache.filter(m => m.user.bot).size} Bots**\n**${message.guild.members.cache.filter(m => !m.user.bot).size} Humanos**`,
            inline: true
        }
    );
    message.respond(embed);
}
}