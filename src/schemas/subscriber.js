const mongoose = require('mongoose')

const subscriber_schema = new mongoose.Schema({
  server_id: { type: String, unique: true, required: true },
  channel_id: { type: String, required: true }
})

module.exports = mongoose.model('Subscriber', subscriber_schema)

