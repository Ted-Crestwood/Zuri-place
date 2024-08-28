const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const otpGenerator = require('otp-generator');

const bookingResponse = async ({email, room, name, checkIn, checkOut}) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email address");
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "app.zuriplacehotel.com",
            port: 465,
            secure: true,
            auth: {
                user: "bookings@app.zuriplacehotel.com",
                pass: "1b}E##2G^tN?"
            }
        });

        const hbsOptions = {
            viewEngine: {
                partialsDir: 'views',
                layoutsDir: 'views',
                defaultLayout: ''
            },
            viewPath: 'views'
        };

        transporter.use('compile', hbs(hbsOptions));

        const mailOptions = {
            from: {
                name: "Zuri Place",
                address: "bookings@app.zuriplacehotel.com",
            },
            to: email,
            subject: "Your Reservation at Zuri Place Hotel is confirmed",
            template: "booking",
            context: { room, name, checkIn, checkOut }
        };

        // Use async/await instead of a callback
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);

        return { status: 'success' };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { status: 'error', message: "Error sending booking response" };
    }
};

module.exports = bookingResponse;
