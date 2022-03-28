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

module.exports = channelsFromServer

