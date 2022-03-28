const coursesProvider = require('./services/freeCourses')
const Course = require('./schemas/course')

async function checkForNewCourses() {
  try {
    const coursesFromPage = await coursesProvider.stubData() //TODO: cambiar a la implementacion posta
    const recentCourses = await getRecentCoursesFromDB() 
    return getNonRecentlyPublishedCourses(coursesFromPage, recentCourses)
  } catch(e) {
    //TODO: este error pasaria si no se pudo scrapear bien una page
    //la idea seria, cuando un error ocurra, avisarme por mi server de discord
    //asi puedo enterarme..
  }
}

async function getRecentCoursesFromDB(cutoffDays = 5) { 
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - cutoffDays);
  return await Course.find({ published: { $gte: cutoff, $lte: new Date() }})
}

function getNonRecentlyPublishedCourses(coursesFromPage, recentCourses) {
  const linksOfRecentCourses = recentCourses.map(rc => rc.udemyLink)
  return coursesFromPage.filter(course => !linksOfRecentCourses.includes(course.udemyLink))
}

module.exports = { checkForNewCourses }

