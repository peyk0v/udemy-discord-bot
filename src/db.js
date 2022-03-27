const mongoose = require('mongoose')

const URI_DB = process.env.NODE_ENV == 'development' ? process.env.DB_ACCESS_TEST : process.env.DB_ACCESS

const openDatabaseConnection = () => {
  mongoose
    .connect(URI_DB)
    .then(() => console.log("bot connected to database"))
    .catch((e) => console.log("bot could not connect to db: ", e.message))
}

module.exports = openDatabaseConnection

