const udemyScraper = require('./scrapers/udemy.js')
const discudemyScraper = require('./scrapers/discudemy.js')

async function getCourses() {
  const discudemyCourses = await discudemyScraper.getCourses() 
  const coursesData = await getUdemyData(discudemyCourses)
  return coursesData 
}

async function getUdemyData(dCourses) {
  let coursesData = []

  for(let dCourse of dCourses) {
    const courseDataFromUdemy = await udemyScraper.getPageData(dCourse.udemyLink)
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
      published: new Date()
    }
}

async function stubData() {
  return [
    {
      discudemyLink: 'yoo im a link',
      category: 'vue',
      udemyLink: 'im a simple link',
      image: 'https://img-c.udemycdn.com/course/480x270/3624814_4744_3.jpg',
      title: 'how not to test by me',
      rating: '4,6',
      published: new Date() //SHOULD NOW PASS
    },
    {
      discudemyLink: 'asd',
      category: 'vue',
      udemyLink: 'https://www.udemy.com/course/vue-3-js-iniciate-en-este-framework/',
      image: 'https://img-c.udemycdn.com/course/480x270/3624814_4744_3.jpg',
      title: 'im in lol',
      rating: '4,6',
      published: new Date(2022, 2, 23) //SHOULD PASS 
    },
    {
      discudemyLink: 'https://www.discudemy.com/Spanish/aws-rds-con-mysql',
      category: 'aws',
      udemyLink: 'https://www.udemy.com/course/aws-rds-con-mysql/',
      image: 'https://img-c.udemycdn.com/course/480x270/3699980_a3b1.jpg',
      title: 'AWS RDS con MySQL desde 0',
      rating: '4,7',
      published: new Date() //SHOULD PASS
    },
    {
      discudemyLink: 'https://www.discudemy.com/Spanish/inventario-capacidad-y-demanda-en-facil',
      category: 'business',
      udemyLink: 'https://www.udemy.com/course/inventario-capacidad-y-demanda-en-facil/',
      image: 'https://img-c.udemycdn.com/course/480x270/3552857_7601_3.jpg',
      title: 'Inventario, Capacidad y Demanda en Fácil',
      rating: '4,8',
      published: new Date() //SHOULD NOW PASS
    },
  ]
}

module.exports = { getCourses, stubData }

