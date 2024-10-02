const fs = require('fs');
module.exports = class FusionIA {
  constructor(client, message, args) {
    this.id = '812272055457546271';
    this.message = message;
    this.args = args;
  }
  async start() {
    if (this.message.content.startsWith(`<@${this.id}>`) || this.message.content.startsWith(`<@!${this.id}>`)) {
      let mensagem = this.args.slice(1).join(' ');
        let lido = fs.readFileSync(__filename, 'utf8');

      switch (mensagem.toLowerCase()) {
        case 'oi':
          console.log(lido.length)
        this.message.respond('Oi para você também!')
        break;
        case 'bom dia':
        this.message.respond('Bom dia, como vai você?')
        break;
        case 'vou bem':
        this.message.respond('Ah que bom!')
        break;
        case /aprenda[\w\W]{2,32}/:
        if (this.message.author.id !== '753252894974804068') return this.message.respond('rapaz, eu n posso aprender com você.');
        let txt = `
      }
    }
  }
}`
        let m = mensagem.slice('aprenda'.length).split('/')
console.log(m)
        fs.writeFileSync(__filename, lido.slice(0, lido.length - txt.length) + `case '${m[0]}':
this.message.respond(${m[1]})
break;` 
                         + txt);
        this.message.respond('Aprendi')
        break;
      }
    }
  }
}