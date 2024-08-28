const bookingResponse = require("../mail/bookingResponse");
// const endBookingResponse = require("../mail/endBookingResponse");
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
            // await endBookingResponse(email, name);
        }, {
            scheduled: true,
            timezone: "Africa/Nairobi"
        });

    } catch (error) {
        return { message: error.message };
    }
};


const submitBooking = async (req, res) => {
    const { email, room, checkOut, name, checkIn,phone, ...data } = req.body;
    try {
        if (!email && !data) {
            return res.status(400).json({ message: "Provide all the neccessary details" })
        }
        const madeBooking = await Booking.create({ email, name, checkOut, room,phone,checkIn, ...data })
        if (!madeBooking) {
            return res.status(400).json({ message: "Error creating booking" })
        }
        scheduleEmail(email)
        const userEmail = email;
        await bookingResponse({ email, room, name, checkIn, checkOut })
        await zuriBookingResponse({
            email: 'reservations@zuriplacehotel.com',
            room, checkIn, checkOut, name, phone, userEmail
        });
        return res.status(200).json({ message: "Booking made successfully", info: { email, room, checkOut } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const checkoutRoom = async (req, res) => {

}

module.exports = { submitBooking, checkoutRoom }