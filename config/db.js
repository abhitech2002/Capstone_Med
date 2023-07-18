const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then((client) => {
            const {db} = client.connection
            console.log('Database Connection established and connected to db:', db.databaseName)
        })
        .catch((error) => {
            console.log("Database connection failed due to error:", error)
        })
}