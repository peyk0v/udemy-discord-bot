require('dotenv').config()
const { Client, Intents } = require('discord.js')
const openDatabaseConnection = require('./db')
const coursesChecker = require('./courses')
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



//TODO: lo de abajo habria que borrarlo, pura mierda 

async function saveCourses() {
  const coursesToPublish = await coursesChecker.checkForNewCourses()

  //IMPORTANTE CHEQUEAR ESTO
  if(coursesToPublish.length == 0) {
    console.log('there is no new courses')
    return
  }

  console.log({coursesToPublish})
  for(let course of coursesToPublish) {
    const newCourse = new Course(course)
    await newCourse.save()
  }
}

async function resetDB() {
  await Course.deleteMany({})
}

async function createTestServer() {
  const server = {
    server_id: '915045284562731108',
    channel_id: '957721127910793296'
  }

  const newServer = new Subscriber(server)
  await newServer.save()
}


