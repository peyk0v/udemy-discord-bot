const udemyScraper = require('./scrapers/udemy.js')
const discudemyScraper = require('./scrapers/discudemy.js')

async function getCourses() {
  const discudemyCourses = await discudemyScraper.getCourses() 
  const urls = getUdemyUrls(discudemyCourses) //TODO
  const udemyCoursesData = await udemyScraper.getUdemyData(urls)
  return wrapData(discudemyCourses, udemyCoursesData) //TODO
}

