const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const otpGenerator = require('otp-generator');


const bookingResponse = async ({email,room,name,checkIn,checkOut}) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email address");
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
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
        }
        transporter.use('compile', hbs(hbsOptions))
        function sendMail(to, subject, template, context) {
            const mailOptions = {
                from: {
                    name: "Zuri Place",
                    address: "bookings@app.zuriplacehotel.com",
                },
                to,
                subject,
                template,
                context
            }
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return { status: 'Error sending booking response' };
                } else {
                    return { status: 'Booking response sent successfully' };
                }
            })
        }
        // console.log("email:",email)
        sendMail(email, "Your Reservation at Zuri Place Hotel is confirmed", "booking", {room,name,checkIn,checkOut})
        // await transporter.sendMail(mailOptions);
        return { status: 'success' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: "Error sending otp" };
    }
}

module.exports = bookingResponse;
