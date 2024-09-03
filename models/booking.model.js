const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: false },
    phone: { type: String }, // Changed to String for better handling
    subject: { type: String },
    room: { type: String },
    package: { type: String },
    guests: { type: String },
    date: { type: String }, 
    checkIn: { type: String }, 
    checkOut: { type: String }, 
    message: { type: String, default: 'No message provided', required: false },
    timeStamp: { type: Date, default: Date.now() }
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
