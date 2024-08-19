const contactResponse = require("../mail/contactResponse");
const zuriContactResponse = require("../mail/zuriContactResponse");
const Contact = require("../models/contact.model");

const contactSubmition =async(req,res)=>{
    const {email,message, ...data}= req.body;
    try {
        if(!email && !data){
            return res.status({message: "Provide all the neccessary details"})
        }
        const userEmail = email;
        await Contact.create({email, ...data})
        await contactResponse({email})
        await zuriContactResponse({
            email: 'bookings@app.zuriplacehotel.com',
            userEmail,
            message: message
        });
        return res.status(200).json({message: "Message submitted successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = contactSubmition