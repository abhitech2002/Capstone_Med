const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectToDatabase = require('./config/db')
const authRoute = require('./routes/auth')
const patientRouter = require('./routes/patient')
const physicianRouter = require('./routes/physician')
const reportRouter = require('./routes/report')
const isAuthenticated = require('./middleware/authenticate')

dotenv.config()

// Initialization
const app = express()

// connect to database
connectToDatabase()

// Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/greet', (req, res) => {
    res.send("Greeting Medical App users..")
})

// Routes
app.use('/users',  authRoute)
app.use('/patient', isAuthenticated, patientRouter)
app.use('/physician', isAuthenticated, physicianRouter)
app.use('/report', reportRouter)

app.listen(3000, () => {
    console.log('Server is running at port number 3000')
})