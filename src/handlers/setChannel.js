const { channelsFromServer, sendEmbedMessage, MSG_TYPE } = require('./utils')
const Subscriber = require('../schemas/subscriber')

async function setChannel(msg) { 
  try {
    const channel = getChannelToSet(msg)
    await saveChannel(channel, msg.guild.id)
    const text = createTextToSend(channel)
    sendEmbedMessage(msg, text, MSG_TYPE.SUCCESS)
  } catch (e) {
    sendEmbedMessage(msg, e.message, MSG_TYPE.FAILURE)
  }
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

async function saveChannel({ id, name }, serverID) {
  const query = { server_id: serverID }
  const update = { server_id: serverID, channel_id: id, channel_name: name }
  const options = { upsert: true, new: true }
  return await Subscriber.findOneAndUpdate(query, update, options);
}

function createTextToSend(channel) {
  return `***${channel.name}*** has been set as receiver of courses`
}

module.exports = setChannel

