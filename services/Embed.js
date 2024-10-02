const { MessageEmbed } = require('discord.js')

module.exports = class FusionEmbed extends MessageEmbed {
  constructor (user, data={}) {
    super(data)
    this.setColor('#2f3136')

    if (user && user.displayAvatarURL()) {
      this.setFooter(`| Requisitado por: ${user.tag}`, user.displayAvatarURL());
    }
  }
}