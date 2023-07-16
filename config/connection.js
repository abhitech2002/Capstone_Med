const mongoose = require("mongoose")

// Connecting to the Database
const connectDB = async() => {
    try{    
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected ${mongoose.connection.host}`)

    } catch(error) {
        console.log(`Mongoose Server Issue ${error}`)
    }
}

module.exports = connectDB