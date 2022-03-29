const { channelsFromServer, sendEmbedMessage, MSG_TYPE, hasPermissions } = require('./utils')

function sendHelpText(msg) {
  try {
    if(!hasPermissions(msg)) { return }
    const channels = channelsFromServer(msg.guild)
    const channelsAsString = parseChannels(channels)
    const textToSend = createHelpText(channelsAsString)
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

function createHelpText(channelsAsString) {
  const header = 'I see you are lost.. LOL' 
    + '\n\n'
    + 'There is not much to it to set up the bot.'
    + '\n\n'
    + 'You only have to set which channel will be the target for the bot to publish the found courses.'
    + '\n\n'
    + 'So before starting, make sure to ***set a channel***.'
    + '\n\n'
    + 'It can be done by `!fc_setChannel number`'
    + '\n'
    + 'where __number__ is the desired channel listed below.'
    + '\n'
    + '\n'

  const footer = '\n Once done, ***just wait*** till new courses are available'
  return header + channelsAsString + footer
}

module.exports = sendHelpText

