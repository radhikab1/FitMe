require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require("cors");

// express app
const app = express()

// middleware
const corsOptions = {
    origin: "https://fitme-frontend.onrender.com"
}
app.use(express.json())
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

