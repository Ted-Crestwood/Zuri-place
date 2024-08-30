const contactResponse = require("../mail/contactResponse");
const zuriContactResponse = require("../mail/zuriContactResponse");
const Contact = require("../models/contact.model");

const contactSubmition =async(req,res)=>{
    const {email,message,name,phone,subject, ...data}= req.body;
    try {
        if(!email && !data){
            return res.status({message: "Provide all the neccessary details"})
        }
        const userEmail = email;
        await Contact.create({email,message,name,phone,subject, ...data})
        await contactResponse({email,name})
        await zuriContactResponse({
            email: 'reservations@zuriplacehotel.com',
           name,subject,message,phone,userEmail
        });
        await zuriContactResponse({
            email: 'reservationszuriplacehotel@gmail.com',
           name,subject,message,phone,userEmail
        });
        await zuriContactResponse({
            email: 'bookings@app.zuriplacehotel.com',
           name,subject,message,phone,userEmail
        });
        return res.status(200).json({message: "Message submitted successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = contactSubmition