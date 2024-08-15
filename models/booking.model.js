const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    phone:{type:Number,require:true},
    subject:{type:String,require:true},
    room:{type:String,require:true},
    date:{type:String,require:true},
    message:{type:String,require:true},
    createdAt:{type:Date,default: Date.now}
})

const Booking = mongoose.model("Booking",BookingSchema)
module.exports = Booking;