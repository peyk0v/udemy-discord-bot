const mongoose = require('mongoose')

const subscriber_schema = new mongoose.Schema({
  server_name: { type: String },
  server_id: { type: String, unique: true, required: true },
  channel_id: { type: String, required: true },
  channel_name: { type: String }
})

module.exports = mongoose.model('Subscriber', subscriber_schema)

