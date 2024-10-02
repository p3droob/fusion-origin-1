const Discord = require("discord.js");
const path = require('path');
const fs = require('fs');
module.exports = {
    name: "teste",
  category: 'dev',
  run: async (client, message, args, prefix) => {
    const { Canvas, resolveImage } = require('canvas-constructor/skia');
let img1 = await resolveImage('https://cdn.discordapp.com/emojis/875469767727804496.png');
  let img = new Canvas(1000, 550)
	.setColor('#000000')
	.printRectangle(0, 0, 1000, 550)
  .setColor('#ffffff')
  .printRectangle(100, 0, 20, 200)
  .printRectangle(120, 110, 200 ,20)
  .printRectangle(300, 200, 300, 150)
  .printRectangle(0, 300, 200, 20)
  .printRectangle(700, 300, 200, 20)
  .printCircle(800, 350, 15)
  .setColor('#000000')
  .printRectangle(320, 220, 260, 110)
  .printRectangle(400, 320, 100, 40)
  await message.channel.send(new Discord.MessageAttachment(await img.toBuffer()))
  }
}