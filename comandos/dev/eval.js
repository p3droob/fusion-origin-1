const Discord = require('discord.js');
module.exports = {
  name: "eval",
  aliases: ["e"],
  category: 'dev',
  run: async (client, message, args) => {

    let dev = `753252894974804068`;
    let dev2 = '599563864509513739';

    if (![`${dev}`, dev2, '762794711944527913', '880230459521532036'].some(a => message.author.id === a)) return;
    var code = args.join(' ')
    code = code.replace(/^`{3}(js)?|`{3}$/g, '');
    if (!code)
      return message.reply(
        `Insira um valor para executar o eval.`
      );
    await message.reply('.').then(async m => {
      m.delete({ timeout: 50 })
      try {
        let beforeRunning = Date.now()
        let result = eval(code)

        if (result instanceof Promise) {
          m.edit('Uma promise encontrada, estou esperando ela ser resolvida!')
          await result
        }
        if (typeof result !== 'string') result = require('util').inspect(result)
        let end = (Date.now() - beforeRunning)
        result = await result.replace(/_user\((\d{16,18})\)/g, '<@$1>');
        let fileC = new Discord.MessageEmbed()
        .setTitle('Correto')
        .setDescription('```js\n ' + result.substring(0, 4000) + '\n```')
        .setFooter(end + ' ms')
        message.respond(fileC).then(msg => {
      msg.react('❌');

      const collector = msg.createReactionCollector((r, u) => r.emoji.name === '❌' && u.id === message.author.id)

        .on('collect', async (r, u) => {
          msg.edit('Eval fechada.');

        })
    })

      } catch (e) {
        let beforeRunning2 = Date.now()
        let end2 = (Date.now() - beforeRunning2)
        let fileC = new Discord.MessageEmbed()
        .setTitle('Errado')
        .setDescription('```js\n ' + e.stack.substring(0, 4096) + '\n```')
        .setFooter(end2 + ' ms')
        message.respond(fileC)


      }
    })

  }
}