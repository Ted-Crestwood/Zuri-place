const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const otpGenerator = require('otp-generator');


const zuriBookingResponse = async ({email,room,checkIn,checkOut,name,phone,userEmail,package,guests,message}) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email address");
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
        sendMail(email, "Room booking", "zuri", {room,checkIn,checkOut,name,userEmail,phone,package,guests,message})
        // console.log("message:",message)
        // await transporter.sendMail(mailOptions);
        return { status: 'success' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: "Error sending otp" };
    }
}
module.exports = zuriBookingResponse;
