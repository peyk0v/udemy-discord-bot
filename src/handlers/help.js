const channelsFromServer = require('./utils')

function sendHelpText(msg) {
  const channels = channelsFromServer(msg.guild)
  const channelsAsString = parseChannels(channels)
  const textToSend = createHelpText(channelsAsString)
  sendEmbedMessage(msg, textToSend)
}


function parseChannels(channels) {
  let text = ''
  for(let channel of channels) {
    text = text + `**${channel.index}**  -  *${channel.name}*` + '\n'
  }
  return text
}

function createHelpText(channelsAsString) {
  const header = 'well this will be the header' 
    + '\n'
    + 'before starting, make sure to set a channel to recieve the courses'
    + '\n'
    + 'it can be done by `!fc_setChannel number`'
    + '\n'
    + 'where __number__ is one of listed channels below'
    + '\n'
    + '\n'
  return header + channelsAsString
}

function sendEmbedMessage(msg, textToSend) {
  msg.channel.send({ embeds: [{ color: 0x548f6f, description: textToSend }] })
}

module.exports = sendHelpText

