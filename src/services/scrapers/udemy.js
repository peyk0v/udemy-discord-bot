const createPageIn = require('./utils.js')

async function getPageData(url) {
  const { page, browser } = await createPageIn(url)
  
  const data = await page.evaluate(() => {
    const titleComponent = document.querySelector('.course-landing-page__main-content div h1')
    if(titleComponent == null) { return undefined } //it's not rendered
    const imageUrl = document.querySelector("meta[property='og:image']").getAttribute("content");
    const title = titleComponent.textContent
    const rating = document.querySelector('.clp-lead__element-item--row .ud-heading-sm').textContent
    const description = document.querySelector('.course-landing-page__main-content .ud-text-sm .ud-text-md').textContent
    return { imageUrl, title, rating, description } 
  })

  browser.close()
  return data
}

module.exports = { getPageData }
