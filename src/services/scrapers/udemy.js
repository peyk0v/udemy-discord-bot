//import createPageIn from './utils' 
const createPageIn = require('./utils.js')

async function getPageData(url) {
  const { page, browser } = await createPageIn(url)
	console.log(url)
  
  const data = await page.evaluate(() => {
    const titleComponent = document.querySelector('.course-landing-page__main-content div h1')
		//it's not rendered
    if(titleComponent == null) { 
			return undefined 
		} 
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
