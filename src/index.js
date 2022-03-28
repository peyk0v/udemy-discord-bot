require('dotenv').config()
const { Client, Intents } = require('discord.js')
const openDatabaseConnection = require('./db')
const { REGEXS } = require('./utils')
const sendHelpText = require('./handlers/help')
const setChannel = require('./handlers/setChannel')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
  openDatabaseConnection()
  console.log("bot is ready")
})

client.on("messageCreate", (msg) => {
  if(msg.member.user.bot) return;

  if(msg.content.match(REGEXS.SET_CHANNEL)) {
    setChannel(msg)
  } else if(msg.content.match(REGEXS.HELP)) {
    sendHelpText(msg)
  }
})

