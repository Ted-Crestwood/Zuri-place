const bookingResponse = require("../mail/bookingResponse");
const endBookingResponse = require("../mail/endBookingResponse");
const Booking = require("../models/booking.model");
const cron = require('node-cron');

const scheduleEmail = async (email) => {
    const user = await Booking.findOne({ email })
    const name = user.name;
    const checkout = user.checkout;

    try {
        if (!checkout) {
            return res.status(400).json({ message: "Failed to find checkout date" })
        }
        const date = checkout;
        date.setMonth(date.getMonth() + 1);
        const dayOfMonth = date.getDate();
        cron.schedule(`40 12 ${dayOfMonth} * *`, async () => {
            await endBookingResponse(email, name);
        }, {
            scheduled: true,
            timezone: "Africa/Nairobi"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

};

const submitBooking = async (req, res) => {
    const { email, room, checkout, date, ...data } = req.body;
    try {
        if (!email && !data) {
            return res.status(400).json({ message: "Provide all the neccessary details" })
        }
        const madeBooking = await Booking.create({ email, checkout, room, ...data, date })
        if (!madeBooking) {
            return res.status(400).json({ message: "Error creating booking" })
        }
        await bookingResponse({ email, room, date })
        await scheduleEmail(email)
        return res.status(200).json({ message: "Booking made successfully", info: { email, room, checkout } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const checkoutRoom = async (req, res) => {

}

module.exports = { submitBooking, checkoutRoom }