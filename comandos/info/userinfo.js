const Discord = require('discord.js')
const moment = require('moment')
moment.locale("pt-br")
const error = require("../../utils/errors.js")

module.exports = {
  name: "userinfo",
  aliases: ['useri', 'uinfo', 'ui'],
  category: 'info',
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

    let user = await message.mentions.users.first() || await client.users.cache.get(args[0]) || message.author;
    const search = await message.guild.member(user.id)

    if (search !== null) {
    if (user.presence.status === "dnd") user.presence.status = "Não pertube";
    if (user.presence.status === "idle") user.presence.status = "Ausente";
    if (user.presence.status === "offline") user.presence.status = "Offline";
    if (user.presence.status === "online") user.presence.status = "Online";

    function game() {
      let game;
      if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
      else if (user.presence.activities.length < 1) game = "Nenhum";
      return game;
    }

    let x = Date.now() - user.createdAt;
    let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
    let created = Math.floor(x / 86400000);
    let joined = Math.floor(y / 86400000);




    const member = message.guild.member(user);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "Nenhum";
    const userflags = user.flags.toArray()
    const converted = {
HOUSE_BRAVERY: '<:hypesquad_bravery:842548351497273394>',
HOUSE_BRILLIANCE: '<:hypesquad_briliance:842548074165436476>',
HOUSE_BALANCE: '<:hypesquad_balance:842548416873889802>',
EARLY_VERIFIED_BOT_DEVELOPER: '<:developer_Fusion:824604428140019743>',
VERIFIED_DEVELOPER: '<:developer_Fusion:824604428140019743>',
EARLY_SUPPORTER: '<:suporte_Fusion:824603708783460422>'
};

    const roles = member.roles.cache.get(role => role.toString().join(", "))

    const maproles = message.member.roles.cache.map(b => b).join('\n')


    let createdate = moment.utc(user.createdAt).format("DD/MM/YYYY");
    let joindate = moment.utc(member.joinedAt).format("DD/MM/YYYY");
    let status = user.presence.status;
    let avatar = user.avatarURL({ size: 2048 });
    let verify = user.verified

    const embed = new Discord.MessageEmbed()
      .setTitle(`${userflags.map(b => converted[b]).join(' ')} ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#ff0000")
      .addField("Nick:", `**${user.tag}**`, true)
      .addField("ID:", `**${user.id}**`, true)
      .addField("Status:", `**${status}**`, true)
      .addField("Conta Criada em:", `**${createdate} (${moment(user.createdAt, "YYYYMMDD").fromNow()})**`, true)
      
      .addField("Entrou em:", `**${joindate} (${moment(member.joinedAt, "YYYYMMDD").fromNow()})**`, true)
      .setFooter(` | Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

        let embed2 = new Discord.MessageEmbed()
  .setTitle(`Informações adicionais de ${user.username}`)
  .addField(`↘️`, [
    `**Cargo mais alto:** ${member.roles.hoist ? member.roles.hoist.name : `Nenhum`}`,
    `**Cargos:** ${maproles}`

  ])

    const msg = await message.respond(embed)
    await msg.react("↙️")
    await msg.react('↘️')
    

    const filter = (reaction, user) => user.id === message.author.id;
    var collector = msg.createReactionCollector(filter, { time: 900000, max: 4 });
  collector.on("collect", (reaction, user) => {
  switch (reaction.emoji.name) {
  case "↘️":

  msg.edit(embed2)
  break;
  case "↙️":
  msg.edit(embed)
  break;
}
})
    } else if (search === null) {
      if (user.presence.status === "dnd") user.presence.status = "Não pertube";
    if (user.presence.status === "idle") user.presence.status = "Ausente";
    if (user.presence.status === "offline") user.presence.status = "Offline";
    if (user.presence.status === "online") user.presence.status = "Online";

    function game() {
      let game;
      if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
      else if (user.presence.activities.length < 1) game = "Nenhum";
      return game;
    }

    let x = Date.now() - user.createdAt;
    let created = Math.floor(x / 86400000);




    const userflags = user.flags.toArray()
    const converted = {
HOUSE_BRAVERY: '<:hypesquad_bravery:842548351497273394>',
HOUSE_BRILLIANCE: '<:hypesquad_briliance:842548074165436476>',
HOUSE_BALANCE: '<:hypesquad_balance:842548416873889802>',
EARLY_VERIFIED_BOT_DEVELOPER: '<:developer_Fusion:824604428140019743>',
VERIFIED_DEVELOPER: '<:developer_Fusion:824604428140019743>'
};
let createdate = moment.utc(user.createdAt).format("DD/MM/YYYY");
    let status = user.presence.status;
    let avatar = user.avatarURL({ size: 2048 });

    const embed = new Discord.MessageEmbed()
      .setTitle(`${userflags.map(b => converted[b]).join(' ')} ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#ff0000")
      .addField("Nick:", `**${user.tag}**`, true)
      .addField("ID:", `**${user.id}**`, true)
      .addField("Status:", `**${status}**`, true)
      .addField("Conta Criada em:", `**${createdate} (${moment(user.createdAt, "YYYYMMDD").fromNow()})**`, true)
      .setFooter(` | Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
      message.respond(embed)
    }
  }
}