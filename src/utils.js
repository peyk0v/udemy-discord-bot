const { MessageEmbed } = require('discord.js');
const Subscriber = require('./schemas/subscriber') 

const provider = process.env.COURSES_PROVIDER

const CATEGORY_ICONS = {
  'android': provider + 'img/31.png',
  'angularjs': provider + 'img/35.png',
  'bootstrap': provider + 'img/38.png',
  'c': provider + 'img/40.png',
  'cpp': provider + 'img/41.png',
  'csharp': provider + 'img/42.png',
  'css': provider + 'img/33.png',
  'data-structure': provider + 'img/160.png',
  'debug-test': provider + 'img/133.png',
  'development-tools': provider + 'img/156.png',
  'django': provider + 'img/60.png',
  'drupal': provider + 'img/59.png',
  'e-commerce': provider + 'img/83.png',
  'ethical-hacking': provider + 'img/143.png',
  'game-development': provider + 'img/144.png',
  'git': provider + 'img/121.png',
  'hardware': provider + 'img/158.png',
  'html': provider + 'img/32.png',
  'ios': provider + 'img/53.png',
  'java': provider + 'img/52.png',
  'javascript': provider + 'img/50.png',
  'jquery': provider + 'img/44.png',
  'json': provider + 'img/37.png',
  'machine-learning': provider + 'img/93.png',
  'matlab': provider + 'img/92.png',
  'mobile-development-other': provider + 'img/152.png',
  'mysql': provider + 'img/65.png',
  'nodejs': provider + 'img/36.png',
  'nosql': provider + 'img/55.png',
  'php': provider + 'img/51.png',
  'programming-other': provider + 'img/154.png',
  'python': provider + 'img/45.png',
  'r-programming': provider + 'img/61.png',
  'react-redux': provider + 'img/91.png',
  'robotics': provider + 'img/151.png',
  'ruby': provider + 'img/58.png',
  'seo': provider + 'img/148.png',
  'software': provider + 'img/157.png',
  'sql': provider + 'img/64.png',
  'system-programming': provider + 'img/10.png',
  'ux': provider + 'img/71.png',
  'web-development-other': provider + 'img/153.png',
  'wordpress': provider + 'img/34.png',
  'vue': provider + 'img/90.png',
  '3d-model': provider + 'img/135.png',
  'after-effects': provider + 'img/84.png',
  'animation': provider + 'img/72.png',
  'graphic-design': provider + 'img/15.png',
  'photography': provider + 'img/150.png',
  'photoshop': provider + 'img/43.png',
  'premiere-pro': provider + 'img/63.png',
  'video-design': provider + 'img/16.png',
  'aws': provider + 'img/68.png',
  'hosting': provider + 'img/149.png',
  'linux': provider + 'img/124.png',
  'mac': provider + 'img/125.png',
  'network-sechrefty': provider + 'img/147.png',
  'windows': provider + 'img/126.png',
  'windows-server': provider + 'img/70.png',
  'academic': provider + 'img/138.png',
  'blockchain': provider + 'img/80.png',
  'business': provider + 'img/140.png',
  'certification': provider + 'img/159.png',
  'health-fitness': provider + 'img/146.png',
  'language': provider + 'img/12.png',
  'lifestyle': provider + 'img/155.png',
  'marketing': provider + 'img/142.png',
  'music': provider + 'img/128.png',
  'office-productivity': provider + 'img/119.png',
  'personal-development': provider + 'img/141.png',
  'social-media': provider + 'img/134.png'
}

const defaultCategoryImage = 'https://flyclipart.com/thumb2/dibujo-del-signo-de-305919.png'

const REGEXS = {
  SET_CHANNEL: /^!fc_setchannel\ +[0-9]+$/im,
  START: /^!fc_start\ *$/im
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

async function sendCoursesToSuscribedServers(client, coursesToPublish) {
  const subscribers = await Subscriber.find({ })
  if(!subscribers || subscribers.length == 0) { return }
  for(let subscriber of subscribers) {
    sendCoursesToChannel(client, subscriber.channel_id, coursesToPublish)
  }
}

async function sendCoursesToChannel(client, channelID, coursesToPublish) {
  const channel = await client.channels.cache.get(channelID)
  if(!channel) { 
    console.log(`error sending courses to channel ${channelID}`)
    return
  }
  for(let course of coursesToPublish) {
    await sendEmbedCourse(channel, course)
  }
}

async function sendEmbedCourse(channel, course) {
  const categoryURL = CATEGORY_ICONS[course.category] ? CATEGORY_ICONS[course.category] : defaultCategoryImage

  const embed = new MessageEmbed()
	  .setColor('#9b59b6')
	  .setTitle(course.title)
    .setURL(course.udemyLink)
	  .setAuthor({ name: course.category, iconURL: categoryURL, url: categoryURL })
    .setDescription(course.description)
	  .addFields({ name: 'Rating', value: course.rating })
	  .setImage(course.image)
    .setTimestamp()

	return await channel.send({embeds: [embed]})
}

module.exports = { REGEXS, reportError, sendCoursesToSuscribedServers, sendEmbedCourse }

