require('dotenv').config()
const openDatabaseConnection = require('./db')
const coursesChecker = require('./courses')
const Course = require('./schemas/course')

openDatabaseConnection()

async function saveCourses() {
  const coursesToPublish = await coursesChecker.checkForNewCourses()
  console.log({coursesToPublish})

  for(let course of coursesToPublish) {
    const newCourse = new Course(course)
    await newCourse.save()
  }
}

async function resetDB() {
  await Course.deleteMany({})
}

saveCourses()
//resetDB()
