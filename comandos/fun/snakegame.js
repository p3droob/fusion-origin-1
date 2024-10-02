const { Client, Message } = require('discord.js');
const { Snake } = require('weky');
module.exports = {
    name: 'snakegame',
    aliases: ["jogodacobra"],
    usage: "snakegame",
    description: "jogue um jogo da cobra",
    category: 'fun',
    run: async (client, message, args) => {

new Snake({
    message: message,
    embed: {
    title: 'Snake', 
    description: '<:online_Fusion:835127560417181726> = cobra\n<:idle_Fusion:835124327237681183> = comida',
    color: "#gt4668", //embed color
    gameOverTitle: "Game Over", //game over embed title
    },
    emojis: {
      empty: '⬛', //zone emoji
      snakeBody: '<:online_Fusion:835127560417181726>', //snake
      food: '<:idle_Fusion:835124327237681183>', //food emoji
      //control
      up: '⬆️', 
      right: '⬅️',
      down: '⬇️',
      left: '➡️',
      },
    }).start()
    }
}