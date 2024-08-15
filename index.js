const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
const booking = require('./routes/booking.route');
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = 3002;
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to Zuri place@Crestwood database successfully")
    })
    .catch((error) => {
        console.log(error.message)
    })

app.use('/booking', booking)
app.use('/', (req, res) => {
    return res.send("Welcome to Zuri place@Crestwood apis")
})
app.listen(port, () => {
    console.log(`Connected on port ${port}`)
})