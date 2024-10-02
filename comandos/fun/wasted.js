const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "wasted",
  aliases: ["wast"], 
  category: 'fun',
  run: async (client, message, args) => {
    
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Data = await Random.Wasted({ Image: user.user.displayAvatarURL({ format: "png" }), Color: 'RANDOM' });

    return message.respond(Data);
  }
}