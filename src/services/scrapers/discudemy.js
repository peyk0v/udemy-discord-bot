const puppeteer = require('puppeteer')

const urlExample = 'https://www.discudemy.com/English/b2b-copywriting'

async function test() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await getFreeCourseLink(page, urlExample)

  //at the end
  browser.close()
}
async function getPageCourses() {
  const url = 'https://www.discudemy.com/language/english'
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)

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

    console.log(courses)

    return courses 
  })

}

async function getFreeCourseLink(url) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)
  await page.click('.ui.big.inverted.green.button.discBtn')
  const [el] = await page.$x('//*[@id="couponLink"]')
  const link = await el.getProperty('text')
  const linkTxt = await link.jsonValue()
  return linkTxt
}

//getFreeCourseLink(urlExample)
getPageCourses()
