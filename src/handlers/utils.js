const { Permissions } = require('discord.js')

const MSG_TYPE = {
  SUCCESS: Symbol('SUCCESS'),
  FAILURE: Symbol('FAILURE')
}

function channelsFromServer(server) {
  let channels = []
  let channelIndex = 1

  server.channels.cache.each(channel => {
    if(channel.type == 'GUILD_TEXT') {
      channels.push({ name: channel.name, id: channel.id, index: channelIndex })
      channelIndex++
    }
  })

  return channels 
}

function sendEmbedMessage(msg, text, type) {
  const type_color = type == MSG_TYPE.SUCCESS ? 0x548f6f : 0xDE1F21
  const textToSend = type == MSG_TYPE.SUCCESS ? text : 'error setting channel :cry: \n reason: ' + text
  msg.channel.send({ embeds: [{ color: type_color, description: textToSend }] })
}

function hasPermissions(msg) {
  const isAdmin = msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  const itsMe = msg.member.id == process.env.MY_DS_ID //dont worry, its just for setting up the bot for some friends :)
  return isAdmin || itsMe
}


module.exports = { channelsFromServer, sendEmbedMessage, MSG_TYPE, hasPermissions }

