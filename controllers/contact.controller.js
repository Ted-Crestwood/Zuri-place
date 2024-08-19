const contactResponse = require("../mail/contactResponse");
const Contact = require("../models/contact.model");

const contactSubmition =async(req,res)=>{
    const {email, ...data}= req.body;
    try {
        if(!email && !data){
            return res.status({message: "Provide all the neccessary details"})
        }
        await Contact.create({email, ...data})
        // await contactResponse({email})
        return res.status(200).json({message: "Message submitted successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = contactSubmition