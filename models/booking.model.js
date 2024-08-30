const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, unique: false },
    phone: { type: String}, // Changed to String for better handling
    subject: { type: String},
    room: { type: String},
    package:{type:String},
    guests:{type:String},
    date: { type: String }, // Changed to Date type
    checkIn: { type: String}, // Changed to Date type
    checkOut: { type: String}, // Changed to Date type
    message: { type: String},
    timeStamp: { type: String, default: Date.now() }
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
