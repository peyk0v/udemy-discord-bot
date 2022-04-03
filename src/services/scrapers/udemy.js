const createPageIn = require('./utils') 

async function getPageData(url) {
  const { page, browser } = await createPageIn(url)
  
  const data = await page.evaluate(() => {
    const titleComponent = document.querySelector('.course-landing-page__main-content div h1')
    if(titleComponent == null) { return undefined } //it's not rendered
    const imageUrl = document.querySelector("meta[property='og:image']").getAttribute("content");
    const title = titleComponent.textContent
    const rating = document.querySelector('.clp-lead__element-item--row .star-rating--rating-number--2o8YM').textContent
    const description = document.querySelector('.course-landing-page__main-content .udlite-text-md').textContent
    return { imageUrl, title, rating, description } 
  })

  browser.close()
  return data
}

module.exports = { getPageData }

