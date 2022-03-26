const puppeteer = require('puppeteer')
const createPageIn = require('./utils') 

async function getUdemyData(link) {
  const { page, browser } = await createPageIn(link)
  
  const data = await page.evaluate(() => {
    const imageUrl = document.querySelector("meta[property='og:image']").getAttribute("content");
    const title = document.querySelector('.course-landing-page__main-content div h1').textContent
    const rating = document.querySelector('.clp-lead__element-item--row .star-rating--rating-number--2o8YM').textContent
    return { imageUrl, title, rating } 
  })
  console.log({data})
  browser.close()
}

const freeCourse = 'https://www.udemy.com/course/10-claves-para-una-comunicacion-exitosa/'
const couponCourse = 'https://www.udemy.com/course/el-arte-de-programar-en-r-anade-valor-a-tu-cv/?couponCode=72F3EC3C7524557A6CBD'

getUdemyData(couponCourse)
