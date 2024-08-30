const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:false},
    phone:{type:Number},
    subject:{type:String},
    message:{type:String},
    createdAt:{type:Date,default: Date.now}
})

const Contact = mongoose.model("Contact",ContactSchema)
module.exports = Contact;