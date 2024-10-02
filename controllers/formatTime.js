module.exports = async (client) => {
  function formatTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
 minutes = Math.floor((duration / (1000 * 60)) % 60),
 hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
 days = Math.floor((duration / (1000 * 60 * 60)) % 24)
 return 
  }
  return client.formatTime = formatTime;
}