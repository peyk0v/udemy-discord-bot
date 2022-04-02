const puppeteer = require('puppeteer')

async function createPageIn(link) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.setViewport({width:960,height:768});
  await page.goto(link)
  return { page, browser }
}

module.exports = createPageIn
