
module.exports.roleServer = (message) => {
    message.respond("** Esse cargo não está neste servidor!**").then(m => m.delete({timeout: 60000}))
}
module.exports.noUser = (message) => {
    message.respond("** Não foi possivel achar o usuario**").then(m => m.delete({timeout: 60000}))
}
module.exports.noContent = (message) => {
    message.respond("**Não especificou um Motivo/Mensagem**").then(m => m.delete({timeout: 60000}))
}//permissionFor
module.exports.noChannel = (message) => {
    message.respond("**Não especificou um canal**").then(m => m.delete({timeout: 60000}))
}
module.exports.noRole = (message) => {
    message.respond("** Não especificou um cargo**").then(m => m.delete({timeout: 60000}))
}
module.exports.clientPosition = (message) => {
    message.respond("** Não consigo executar este comando pois meu cargo é baixo ou igual ao cargo mencionado**").then(m => m.delete({timeout: 60000}))
}
module.exports.userPosition = (message) => {
    message.respond("** Seu cargo é muito baixo ou igual para este comando**").then(m => m.delete({timeout: 60000}))
}
module.exports.noTemp = (message) => {
    message.respond("** Você não especificou um tempo**").then(m => m.delete({timeout: 60000}))
}
module.exports.isNaN = (message) => {
    message.respond("** Você deve me dar uma quantia numerica para este este comando**").then(m => m.delete({timeout: 60000}))
}
module.exports.notNaN = (message) => {
    message.respond("** Você não pode utilizar uma numeração exata para este comando**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryChannel = (message) => {
    message.respond("** Você ja setou este canal**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryRole = (message) => {
    message.respond("** Você ja setou este cargo**").then(m => m.delete({timeout: 60000}))
}
module.exports.userRole = (message) => {
    message.respond("** O usuário já tem o cargo mencionado ou de mute**").then(m => m.delete({timeout: 60000}))
}
module.exports.autoPunish = (message) => {
    message.respond("** Você não pode se punir**").then(m => m.delete({timeout: 60000}))
}
module.exports.muteRole = (message) => {
    message.respond("** Não foi possivel encontrar o meu cargo de `Silenciado`, por isso criei para você execute o comando novamente**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryMute = (message) => {
    message.respond("** Este usuario não está mutado**").then(m => m.delete({timeout: 60000}))
}
module.exports.noBans = (message) => {
    message.respond("** Não achei o id na lista de bans**").then(m => m.delete({timeout: 60000}))
}
module.exports.lengthNumber = (message) => {
    message.respond("** Você deve dar um valor menor**").then(m => m.delete({timeout: 60000}))
}
module.exports.lengthText = (message) => {
    message.respond("** Você deve me dar um texto menor**").then(m => m.delete({timeout: 60000}))
}
module.exports.negativeNumber = (message) => {
    message.respond("** Você não pode dar um valor negativo**").then(m => m.delete({timeout: 60000}))
}
module.exports.clearLength = (message) => {
    message.respond("** Você só pode excluir de 0 a 99 mensagens**").then(m => m.delete({timeout: 60000}))
}
module.exports.noInvite = (message) => {
    message.respond("** Não pode conter invites ou links!**").then(m => m.delete({timeout: 60000}))
}
module.exports.permissionFor = (message) => {
    message.author.send("** Eu não possuo a permissão de `Enviar Mensagens` neste canal**")
}
module.exports.noAnime = (message) => {
    message.respond("** Por Favor me dê o nome de um anime para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noManga = (message) => {
    message.respond("** Por Favor me dê o nome de um manga para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noClima = (message) => {
    message.respond("** Por Favor me dê o nome de um estado ou cidade para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noCovid = (message) => {
    message.respond("** Por Favor me dê o nome de um pais para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noVcm = (message) => {
    message.respond("** Não estou em um canal de voz para buscar informações, faça-me entrar através do comando `<prefixo>summon`**").then(m => m.delete({timeout: 60000}))
}
module.exports.noMention = (message) => {
    message.respond("** Você não pode mencionar here ou everyone!**").then(m => m.delete({timeout: 60000}))
}
module.exports.noRole = (message) => {
    message.respond("** O usuário não possui o cargo mencionado!**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryLock = (message) => {
    message.respond("** Este canal ja está trancado**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryunlock = (message) => {
    message.respond("** Este canal não está trancado**").then(m => m.delete({timeout: 60000}))
}