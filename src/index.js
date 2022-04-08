require('dotenv').config()
const setChannel = require('./handlers/setChannel')
const sendStartText = require('./handlers/start')
const handleKick = require('./handlers/handleKick')
const { Client, Intents } = require('discord.js')
const openDatabaseConnection = require('./db')
const { REGEXS } = require('./utils')
const coursesProvider = require('./courses') 

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

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
  } else if(msg.content.match(REGEXS.START)) {
    sendStartText(msg)
  }
})

client.on('guildDelete', (guild) => {
  console.log(`i was kicked from ${guild.name} id: ${guild.id}`)
  handleKick(guild)
})

const time = 1000 * 60 * 60 * 5 //ms sc mn hrs

const scheduler = (client) => {
  setInterval(() => {
    coursesProvider.checkForNewCourses(client)
  }, time)
}

