const Discord = require('discord.js')
const moment = require('moment-timezone')
module.exports = {
    name: "emojiinfo",
    aliases: ["infoemoji"],
    usage: "emojiinfo <emoji>",
    description: "mostra as informações de um emoji",
  category: 'info',
    run: async (client, message, args) => {
      try {
        let emojiName = args[0];
        let emoji = message.emojis.first() || client.emojis.cache.get(emojiName) || client.emojis.cache.find(emoji => emoji.name === emojiName);
        if (!args[0]) return message.channel.send("Insira emoji")
        if (!emoji) return message.channel.send("**Emoji inválido**")
        let mencao;
        if (emoji.animated) mencao = `<a:${emoji.name}:${emoji.id}>`;
        if (!emoji.animated) mencao = `<:${emoji.name}:${emoji.id}>`;
        let xd;
        if(emoji.animated) xd = "Animado";
        if(!emoji.animated) xd = 'Estático';
        let embed = new Discord.MessageEmbed()
            .addField("Nome", `${emoji.name}`, true)
            .addField("id do emoji", `${emoji.id}`, true)
            .addField("Emoji", `${emoji}`, true)
            .addField("Criado em", `${moment(emoji.createdTimestamp).tz('America/Sao_Paulo').format('LT')} ${moment(emoji.createdTimestamp).tz('America/Sao_Paulo').format('LL')} ${moment(emoji.createdTimestamp).tz('America/Sao_Paulo').fromNow()}`, true)
            .addField("Servidor", emoji.guild.name, true)
            .addField("Tipo de emoji:", xd, true)
            .setThumbnail(emoji.url)
            .setColor("#36393F")
            .addField("Menção", `\`${mencao}\``, true)
            .addField("<:b_link:835234866878087179> Link", `${emoji.url}`, true)

        message.respond(embed)
      } catch (e) {
        message.respond('Emoji não encontrado')
      }
    }
}