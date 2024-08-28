const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const booking = require('./routes/booking.route');
const contact = require('./routes/contact.route');
const serverless = require('serverless-http')
dotenv.config();

const app = express();

// CORS configuration
// app.use(cors({
//     origin: 'https://zuriplacehotel.com', // Replace with your frontend domain
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true
// }));
app.use(cors({
    origin: ['https://zuriplacehotel.com', 'https://api.zuriplacehotel.com','http://localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3002;
const uri = "mongodb+srv://ted:7668Tamera@zuri.3plje.mongodb.net/?retryWrites=true&w=majority&appName=zuri";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // serverSelectionTimeoutMS: 5000, // Adjust this value to your preference
    // socketTimeoutMS: 45000, // Adjust this value to your preference
})
    .then(() => {
        console.log("Connected to Zuri place@Crestwood database successfully");
    })
    .catch((error) => {
        console.log("Database connection error:", error.message);
    });

app.use('/booking', booking);
app.use('/contact', contact);

app.use('/', (req, res) => {
    return res.send("Welcome to Zuri place@Crestwood apis");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
 module.exports.handler = serverless(app);