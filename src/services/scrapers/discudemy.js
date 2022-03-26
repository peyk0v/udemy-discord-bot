const puppeteer = require('puppeteer')

const languageRegex = /\/(english|spanish)\//gi

const langLinks = {
  english: 'https://www.discudemy.com/language/english',
  spanish: 'https://www.discudemy.com/language/spanish'
}

async function getCourses() {
  const englishCourses = await getUdemyLinksFromPage(langLinks.english)    

  console.log(englishCourses)
}

async function getUdemyLinksFromPage(link) {
  const coursesWithRawLinks = await getPageCourses(link)
  const coursesWithLinks = []
  let udemyLink = ''

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
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(link)

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

async function getUdemyLink(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.setViewport({width:960,height:768});

  console.log({url})
  url = url.replace(languageRegex, '/go/')
  console.log({url})
  await page.goto(url)
 // await page.waitForSelector('.ui.big.inverted.green.button.discBtn')
 // await page.click('.ui.big.inverted.green.button.discBtn')
  await page.screenshot({ fullPage: true, path: 'screenshot1.png'})
  await page.waitForSelector('#couponLink')
  const link = await page.evaluate(() => {
    return document.querySelector('#couponLink').text
  })
  await browser.close()
  console.log({link})
  return link
}

async function testUdemyLink() {
  const link = 'https://www.discudemy.com/English/b2b-copywriting'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");
  await getUdemyLink(link)
}

getCourses()
