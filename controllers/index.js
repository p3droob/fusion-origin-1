module.exports.canGetDaily = async (client) => {
  const interval = 24 * 60 * 60 * 1000
  async function canGetDaily(user) {
    const db2 = await client.db.ref(`Users/${user}/cooldown/daily`).once('value')
    const boolean = Date.now() < (interval + db2.val())

    if (!db2.val()) return { can: true }


    const remain = client.msToTime(Date.now() - (interval + db2.val()))
    if (boolean) return { can: false, remain }
    else return { can: true }
  }
  return client.canGetDaily = canGetDaily
}

module.exports.get = async (client) => {
  async function getFlocos(user) {
    const db = await client.db.ref(`Users/${user}/flocos`).once('value').then(r => r.val()) || 0;

    return db
  }
  return client.get = getFlocos
}

module.exports.convertAbbreviatedNumber = async (client) => {

  return client.controllers.convertAbbreviatedNumber = require('./convertAbbreviatedNumber.js')
}

module.exports.numberToFraction = async (client) => {
  return client.numberToFraction = require('./numberToFraction.js')
}

module.exports.calculateLevel = (client) => {
  return client.calculateLevel = require('./calculateLevel.js')
}

module.exports.abbreviateNumber = (client) => {
  return client.abbreviateNumber = require('./controllers/abbreviateNumber.js')
}