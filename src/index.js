require('dotenv').config()
const setChannel = require('./handlers/setChannel')
const { Client, Intents } = require('discord.js')
const sendHelpText = require('./handlers/help')
const openDatabaseConnection = require('./db')
const { REGEXS } = require('./utils')
const coursesProvider = require('./courses') 

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] })

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
  scheduler(client)
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

const time = 1000 * 60 * 60 * 5 //ms sc mn hrs

const scheduler = (client) => {
  setInterval(() => {
    coursesProvider.checkForNewCourses(client)
  }, 1000 * 60 * 20)
}

