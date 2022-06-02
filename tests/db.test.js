require('dotenv').config()
const mongoose = require('mongoose')
const Course = require('../src/schemas/course')
const URI_DB = process.env.DB_ACCESS_TEST
const { saveCoursesInDB, clearOldCoursesFromDB } = require('../src/courses')

describe('delete old courses', () => {

  beforeAll(async () => {
    await mongoose
      .connect(URI_DB)
      .then(() => console.log("bot connected to database"))
      .catch((e) => console.log("bot could not connect to db: ", e.message))
  });

  beforeEach(async () => {
    await saveCoursesInDB(coursesToSave)
  })

  afterEach(async () => {
    await Course.deleteMany({})
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should save 4 collections to db', async () => {
    const courses = await Course.find({})
    expect(courses.length).toBe(4)
  });

  it('should delete 2 courses out of 4', async () => {
    await clearOldCoursesFromDB()
    const courses = await Course.find({})
    expect(courses.length).toBe(2)
  });

  it('should delete the first and second one', async () => {
    await clearOldCoursesFromDB()
    const courses = await Course.find({})
    expect(courses[0].description).toBe("3")
    expect(courses[1].description).toBe("4")
  });
});

const coursesToSave = [
  {
    discudemyLink: 'https://www.discudemy.com/Spanish/aws-rds-con-mysql',
    category: 'aws',
    udemyLink: 'https://www.udemy.com/course/aws-rds-con-mysql/',
    image: 'https://img-c.udemycdn.com/course/480x270/3699980_a3b1.jpg',
    title: 'AWS RDS con MySQL desde 0',
    rating: '4,7',
    description: "this should be deleted",
    published: getDateFromDaysBefore(21)
  },
  {
    discudemyLink: 'https://www.discudemy.com/Spanish/inventario-capacidad-y-demanda-en-facil',
    category: 'business',
    udemyLink: 'https://www.udemy.com/course/inventario-capacidad-y-demanda-en-facil/',
    image: 'https://img-c.udemycdn.com/course/480x270/3552857_7601_3.jpg',
    title: 'Inventario, Capacidad y Demanda en Fácil',
    rating: '4,8',
    description: "lets see",
    published: getDateFromDaysBefore(20)
  },
  {
    discudemyLink: 'https://www.discudemy.com/Spanish/10-claves-para-una-comunicacion-exitosa',
    category: 'personal-development',
    udemyLink: 'https://www.udemy.com/course/10-claves-para-una-comunicacion-exitosa/',
    image: 'https://img-c.udemycdn.com/course/480x270/3639434_3aea.jpg',
    title: '10 Claves Para Una Comunicación Exitosa',
    rating: '4,5',
    description: "3",
    published: getDateFromDaysBefore(5)
  },
  {
    discudemyLink: 'https://www.discudemy.com/Spanish/vue-3-js-iniciate-en-este-framework',
    category: 'vue',
    udemyLink: 'https://www.udemy.com/course/vue-3-js-iniciate-en-este-framework/',
    image: 'https://img-c.udemycdn.com/course/480x270/3624814_4744_3.jpg',
    title: 'Vue 3 JS: Iníciate en este Framework',
    rating: '4,6',
    description: "4",
    published: getDateFromDaysBefore(3)
  }
]

function getDateFromDaysBefore(days) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days);
  return cutoff
}
