const Discord = require("discord.js"); 
const moment = require("moment")
moment.locale('pt-br') 
module.exports = {
  name: 'serverinfo',
  aliases: ["sinfo", "si", "serveri"],
  usage: 'serverinfo',
  description: 'mostra as informações do servidor',
  category: 'info',
  run: async (client, message, args) => {
 let guild = client.guilds.cache.get(args[0]) || message.guild;
 let boost = guild.premiumSubscriptionCount === 0 ? "Não há boost(s)." : `${guild.premiumSubscriptionCount} Boost(s)`;
 let bannerfield = 'https://cdn.discordapp.com/splashes/' + guild.id + guild.banner + '.png?size=2048';
 let boostier = guild.premiumTier || '0'; // criando variavel, para ver a quantia de boosts..
    let serverembed = new Discord.MessageEmbed() 
    .setColor("#ff0000")
    .addFields(
      {
        name: `**<:rei_Fusion:831121925820121118> | Dono do servidor**`,
        value: `\`\`${guild.owner.user.tag} (${guild.owner.id})\`\``
      },
      {
        name: `**<a:download:826103385623101470> Criado em**`,
        value: `${moment.utc(guild.createdAt).format("LLL")} (${moment.utc(guild.createdAt, "YYYYMMDD").fromNow()})`
      },
      {
        name: `**<:host_Fusion:831121757732601898> ID do servidor**`,
        value: `\`\`${guild.id}\`\``
      },
      {
        name: `**📥 Você entrou em (servidor atual)**`,
        value: `${moment.utc(message.member.joinedAt).format("LLL")} (${moment.utc(message.member.joinedAt, "YYYYMMDD").fromNow()})`
      },
      {
        name: `**<:membros:831537357953302559> Membros**`,
        value: `🤖 ${guild.members.cache.filter(member => member.user.bot).size} Bots\n👨 ${(guild.memberCount) - (guild.members.cache.filter(member => member.user.bot).size)} Humanos\n🏠 ${guild.memberCount} Total`
      },
      {
        name: `**Entrei em**`,
        value: `${moment.utc(guild.me.joinedAt).format("LLL")} (${moment.utc(guild.me.joinedAt, "YYYYMMDD").fromNow()})`
      },
      {
        name: `Canais`,
        value: `<:c_voz:831536890833666098> ${guild.channels.cache.filter(chan => chan.type === 'voice').size} Canais de Voz \n <:canal:831537857554284604>${guild.channels.cache.filter(chan => chan.type === 'text').size} Canais de Texto \n <:pasta:831539225160843274>${guild.channels.cache.filter(chan => chan.type === 'category').size} Categorias`
      },
      {
        name: `Boosts`,
        value: `${boost}\nNível ${boostier}`
      },
      {
        name: `Total de cargos`,
        value: `${guild.roles.cache.size}`
      }
    )
    .setAuthor(`Serverinfo de ${guild.name}`)
    .setThumbnail(`${guild.iconURL({ dynamic: true, format: 'png', size: 1024 })}`)
   .setFooter(` | Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
 
    message.respond(serverembed);
 
 }
 }