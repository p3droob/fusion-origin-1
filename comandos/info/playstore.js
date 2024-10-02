const Discord = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = ``;



module.exports = {
  name: "playstore",
  description: "Mostre as informações de um aplicativo da Play Store",
  usage: "playstore <aplicatio>",
  category: "info",
  run: async (client, message, args) => {
    if (!args[0])
      return message.respond(
        `Por favor, dê algo para pesquisar - ${message.author}   `
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.respond(
          `Nenhum aplicativo encontrado  ${message.author.username}!`
        );
      }

      let Embed = new Discord.MessageEmbed()
        .setColor('#fdfdfd')
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Preço`, App.priceText, true)
        .addField(`Desenvolvedor(a)`, App.developer, true)
        .addField(`Ponto`, App.scoreText, true)
        .setFooter(`Comando Usador Por ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
  }
};