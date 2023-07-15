// Importing Expresss
const express =  require('express')
const connectDB = require('./config/connection')
const moragan = require("morgan")
const dotenv = require("dotenv")

// dotenv Config
dotenv.config()

// MongoDB Connection 
connectDB()

// Initialization express
const app = express()

// Middleware
app.use(express.json())
app.use(moragan('dev'))

// port using env 
const port = process.env.PORT || 8080



app.get('/',(req, res)=>{
     res.send("Hello Med App User...")
})

app.listen(port, () => {
    console.log(`server Running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`)
})