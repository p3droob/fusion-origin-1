const Discord = require('discord.js')

module.exports = {
  name: 'addemoji',
  aliases: ['adicionaremoji'],
  description: 'adiciona um emoji',
  usage: 'addemoji <link> <nome>',
  category: 'util',
  run: async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.respond("** Você precisa ter permissão de `Gerenciar Emojis` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.respond("** Eu preciso da permissão de `Gerenciar Emojis` para executar este comando**").then(m => m.delete({ timeout: 60000 }));
        let maxEmojis = {
  0: 50,
  1: 100,
  2: 150,
  3: 250
}

if (message.guild.emojis.cache.size === maxEmojis[message.guild.premiumTier]) return message.respond(`Esse servidor atingiu o máximo de emojis (${maxEmojis[message.guild.premiumTier]})`);
    let url = args[0];
    if (!url) {
      return message.respond(`Forneça uma url!`)
    }
    if (!url.includes('http')) url = message.emojis.first().url;
    let emoji = args[1] || message.emojis.first().name;
    if (!emoji) {
      return message.respond(`Qual nome o emoji terá?`)
    }
    message.guild.emojis.create(`${url}`, `${emoji}`)
    message.respond(`O emoji foi criado com sucesso!`)
  }
}