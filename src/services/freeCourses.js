const udemyScraper = require('./scrapers/udemy.js')
const discudemyScraper = require('./scrapers/discudemy.js')

async function getCourses() {
  const discudemyCourses = await discudemyScraper.getCourses() 
  const coursesData = await getUdemyData(discudemyCourses)
  return coursesData 
}

async function getUdemyData(dCourses) {
  let coursesData = []

	//TODO: borrar el console log
	console.log({dCourses})
  for(let dCourse of dCourses) {
		console.log(`get info for page ${dCourse.udemyLink}`)
    const courseDataFromUdemy = await udemyScraper.getPageData(dCourse.udemyLink)
    if(courseDataFromUdemy == undefined) { continue }
    const freeCourseData = wrapData(dCourse, courseDataFromUdemy)
    coursesData.push(freeCourseData)
  }

  return coursesData
}

function wrapData(dCourse, courseDataFromUdemy) {
    return {
      discudemyLink: dCourse.discudemyLink,
      category: dCourse.category,
      udemyLink: dCourse.udemyLink,
      image: courseDataFromUdemy.imageUrl,
      title: courseDataFromUdemy.title,
      rating: courseDataFromUdemy.rating,
      description: courseDataFromUdemy.description,
      published: new Date()
    }
}

module.exports = { getCourses }

