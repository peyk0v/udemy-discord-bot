const coursesProvider = require('./services/freeCourses')
const { reportError, sendCoursesToSuscribedServers } = require('./utils')
const Course = require('./schemas/course')

async function checkForNewCourses(client) {
  try {
    const currentDate = new Date().toUTCString()
    console.log(`Running at: ${currentDate}`)
    const coursesToPublish = await getCoursesToPublish()
    if(coursesToPublish.length == 0) {
      return console.log(`${currentDate} NOT COURSES TO PUBLISH`)
    } else {
      sendCoursesToSuscribedServers(client, coursesToPublish)
      await saveCoursesInDB(coursesToPublish)
      await clearOldCoursesFromDB()
      return console.log(`${currentDate} FOUND ${coursesToPublish.length} NEW COURSES`)
    }
  } catch(e) {
    reportError(client, e)
  }
}

async function getCoursesToPublish() {
  const coursesFromPage = await coursesProvider.getCourses() 
  const recentCourses = await getRecentCoursesFromDB() 
  return getNonRecentlyPublishedCourses(coursesFromPage, recentCourses)
}

async function getRecentCoursesFromDB(cutoffDays = 5) { 
  const cutoff = getDateFromDaysBefore(cutoffDays)
  return await Course.find({ published: { $gte: cutoff, $lte: new Date() }})
}

function getNonRecentlyPublishedCourses(coursesFromPage, recentCourses) {
  const linksOfRecentCourses = recentCourses.map(rc => rc.udemyLink)
  return coursesFromPage.filter(course => !linksOfRecentCourses.includes(course.udemyLink))
}

async function saveCoursesInDB(coursesToPublish) {
  for(let course of coursesToPublish) {
    const newCourse = new Course(course)
    await newCourse.save()
  }
}

//space in db isn't unlimited :P
async function clearOldCoursesFromDB() {
  const cutoff = getDateFromDaysBefore(20) //i think 20 days is enough
  return await Course.deleteMany({ published: { $lte: cutoff }})
}

function getDateFromDaysBefore(days) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days);
  return cutoff
}

module.exports = { checkForNewCourses, saveCoursesInDB, clearOldCoursesFromDB }

