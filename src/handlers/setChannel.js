const channelsFromServer = require('./utils')
const Subscriber = require('../schemas/subscriber')

function setChannel(msg) { //TODO: try catch
  const channel = getChannelToSet(msg)
  setChannel(channel, msg.guild.id)
}

function getChannelToSet({ content, guild }) {
  const channelNumber = numberLineFromText(content)
  const channels = channelsFromServer(guild)
  verifyChannelNumber(channelNumber, channels)
  return channels.find(channel => channel.index == channelNumber)
}

function numberLineFromText(text) {
  const textWithoutExtraSpaces = text.replace(/[\ ]+/, ' ')
  return textWithoutExtraSpaces.split(/\ /)[1]
}

function verifyChannelNumber(channelNumber, channels) {
  const number = parseInt(channelNumber)
  if(number > channels.length || number <= 0) {
    throw new Error('invalid channel number')
  }
}

function setChannel(channel, serverID) {
  //TODO
  //aca habria dos opciones
  //  que el usuario ya configuro un canal pero lo quiere cambiar
  //  que es la primera vez que setea un canal
}

module.exports = setChannel

