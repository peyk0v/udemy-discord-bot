const REGEXS = {
  SET_CHANNEL: /^!fc_setchannel\ +[0-9]+$/im,
  HELP: /^!fc_help\ *$/im
}

async function reportError(client, error) {
  const myChannel = await client.channels.cache.get(process.env.MY_DS_CHANNEL)

  if(!myChannel) {
    return console.log('got an error, tried to report it but got undefined')
  }
  
  await myChannel.send(
    'Got an error: ' +
    error.toString()
  )
}

module.exports = { REGEXS, reportError }

