const { channelsFromServer, sendEmbedMessage, MSG_TYPE, hasPermissions } = require('./utils')

function sendStartText(msg) {
  try {
    if(!hasPermissions(msg)) { return }
    const channels = channelsFromServer(msg.guild)
    const channelsAsString = parseChannels(channels)
    const textToSend = createStartText(channelsAsString)
    sendEmbedMessage(msg, textToSend, MSG_TYPE.SUCCESS)
  } catch(e) {
    sendEmbedMessage(msg, e.message, MSG_TYPE.FAILURE)
  }
}

function parseChannels(channels) {
  let text = ''
  for(let channel of channels) {
    text = text + `**${channel.index}**  -  *${channel.name}*` + '\n'
  }
  return text
}

function createStartText(channelsAsString) {
  const header = '**:wave: hi, welcome! **' 
    + '\n\n'
    + 'Here is a guide to set up the bot'
    + '\n\n'
    + 'There is not much to it, you only have to set which channel will be the target for the bot to publish the found courses'
    + '\n\n'
    + 'So before starting, make sure to ***set a channel***, otherwise you wont receive the courses'
    + '\n\n'
    + 'It can be done by `!fc_setChannel number`'
    + '\n'
    + 'where __number__ is the desired channel listed below.'
    + '\n'
    + '\n'

  const footer = '\n Once done, ***just wait*** till new courses are available'
  return header + channelsAsString + footer
}

module.exports = sendStartText

