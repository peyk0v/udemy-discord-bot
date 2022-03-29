const Subscriber = require('../schemas/subscriber')

async function handleKick(guild) {
  const server_id = guild.id
  await Subscriber.deleteOne({ server_id })
}

module.exports = handleKick

