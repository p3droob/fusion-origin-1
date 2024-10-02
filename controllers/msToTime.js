module.exports = async (client) => {
const interval = 24 * 60 * 60 * 1000
const daySchedule = require('../services/day.js')

function msToTime(duration) {
 var seconds = Math.floor((duration / 1000) % 60),
 minutes = Math.floor((duration / (1000 * 60)) % 60),
 hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

 return hours.toString().replace('0-', '') + ' hora(s) ' + minutes.toString().replace('0-', '') + ' minuto(s) ' + seconds.toString().replace('0-', '') + ' segundos';
}
return client.msToTime = msToTime
}