const bookingResponse = require("../mail/bookingResponse");
const Booking = require("../models/booking.model");

const submitBooking = async (req, res) => {
    const { email, room, date, ...data } = req.body;
    try {
        if (!email && !data) {
            return res.status(400).json({ message: "Provide all the neccessary details" })
        }
        const madeBooking = await Booking.create({ email, room, ...data, date })
        if (!madeBooking) {
            return res.status(400).json({ message: "Error creating booking" })
        }
        await bookingResponse({ email, room, date })
        return res.status(200).json({ message: "Booking made successfully", info: { email, room } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { submitBooking }