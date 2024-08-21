const bookingResponse = require("../mail/bookingResponse");
const endBookingResponse = require("../mail/endBookingResponse");
const zuriBookingResponse = require("../mail/zuriBookingResponse");
const Booking = require("../models/booking.model");
const cron = require('node-cron');

const scheduleEmail = async (email) => {
    try {
        const user = await Booking.findOne({ email });

        if (!user) {
            return { message: "Failed to find user" };
        }

        const name = user.name;
        const checkout = user.checkout;

        if (!checkout) {
            return { message: "Failed to find checkout date" };
        }

        // Extract day and month from checkout date
        const checkoutDay = checkout.getDate();
        const checkoutMonth = checkout.getMonth(); // Month is 0-indexed

        console.log("Checkout:", checkout);

        cron.schedule(`30 13 ${checkoutDay} ${checkoutMonth + 1} *`, async () => {
            await endBookingResponse(email, name);
        }, {
            scheduled: true,
            timezone: "Africa/Nairobi"
        });

    } catch (error) {
        return { message: error.message };
    }
};


const submitBooking = async (req, res) => {
    const { email, room, checkout, name, checkin,phone, ...data } = req.body;
    try {
        if (!email && !data) {
            return res.status(400).json({ message: "Provide all the neccessary details" })
        }
        const madeBooking = await Booking.create({ email, name, checkout, room,phone,checkin, ...data })
        if (!madeBooking) {
            return res.status(400).json({ message: "Error creating booking" })
        }
        scheduleEmail(email)
        const userEmail = email;
        await bookingResponse({ email, room, name, checkin, checkout })
        await zuriBookingResponse({
            email: 'bookings@app.zuriplacehotel.com',
            room, checkin, checkout, name, phone, userEmail
        });
        return res.status(200).json({ message: "Booking made successfully", info: { email, room, checkout } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const checkoutRoom = async (req, res) => {

}

module.exports = { submitBooking, checkoutRoom }