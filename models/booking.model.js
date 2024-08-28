const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    phone: { type: String, required: true }, // Changed to String for better handling
    subject: { type: String, required: true },
    room: { type: String, required: true },
    package:{type:String},
    guests:{type:String},
    date: { type: String }, // Changed to Date type
    checkIn: { type: String, required: true }, // Changed to Date type
    checkOut: { type: String, required: true }, // Changed to Date type
    message: { type: String, required: true },
    timeStamp: { type: String, default: Date.now() }
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
