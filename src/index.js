require('dotenv').config()
const setChannel = require('./handlers/setChannel')
const { Client, Intents } = require('discord.js')
const sendHelpText = require('./handlers/help')
const openDatabaseConnection = require('./db')
const { REGEXS, reportError } = require('./utils')
//const coursesProvider = require('./courses') 

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] })

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
  //TODO: aca tengo que poner la funcion principal
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

const coursesFounder = () => {
  setInterval(() => {
    const currentDate = new Date().toUTCString()
    console.log(`Running at: ${currentDate}`)
    //coursesProvider.checkForNewCourses()
  }, 20000)
}
