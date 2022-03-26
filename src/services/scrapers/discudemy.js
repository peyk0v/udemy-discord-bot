const puppeteer = require('puppeteer')
const createPageIn = require('./utils') 

const languageRegex = /\/(english|spanish)\//gi

const langLinks = {
  english: 'https://www.discudemy.com/language/english',
  spanish: 'https://www.discudemy.com/language/spanish'
}

async function getCourses() {
  const englishCourses = await getUdemyLinksFromPage(langLinks.english)    
  console.log({englishCourses})
  //const spanishCourses = await getUdemyLinksFromPage(langLinks.spanish)
  //return {englishCourses, spanishCourses}
}

async function getUdemyLinksFromPage(link) {
  const coursesWithRawLinks = await getPageCourses(link)
  let coursesWithLinks = []
  let udemyLink = ''

  //can't use promise all cuz of memory leak
  for(let course of coursesWithRawLinks) {
    udemyLink = await getUdemyLink(course.link)
    coursesWithLinks.push({
      discudemyLink: course.link, 
      udemyLink: udemyLink,
      category: course.category
    })
  }

  return coursesWithLinks
}

async function getPageCourses(link) {
  const { page, browser } = await createPageIn(link)

  const courseLinks = await page.evaluate(() => {
    const elements = document.querySelectorAll('.card')
    let currentLink = ''
    let currentCategory = ''
    let courses = []

    for(let element of elements) {
      if(element.querySelector('.content') == null) { continue } //for the AD card
      currentLink = element.querySelector('.content .header .card-header').href
      currentCategory = element.querySelector('.content.extra .catSpan').innerText
      courses.push({ link: currentLink, category: currentCategory })
    }

    return courses 
  })

  await browser.close()
  //list of objects that contains 'Category' and 'discudemy link' fields
  return courseLinks
}

async function getUdemyLink(link) {
  link = link.replace(languageRegex, '/go/')
  const { page, browser }= await createPageIn(link)
  await page.screenshot({ fullPage: true, path: 'screenshot1.png'})
  await page.waitForSelector('#couponLink')
  const udemyLink = await page.evaluate(() => {
    return document.querySelector('#couponLink').text
  })
  await browser.close()
  return udemyLink
}

module.exports = { getCourses }
