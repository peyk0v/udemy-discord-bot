const mongoose = require('mongoose')

const course_schema = new mongoose.Schema({
  discudemyLink: String,
  category: String,
  udemyLink: String,
  image: String,
  title: String,
  rating: String,
  published: Date
})

module.exports = mongoose.model('Course', course_schema)

