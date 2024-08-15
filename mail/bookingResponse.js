const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const otpGenerator = require('otp-generator');


const bookingResponse = async ({email,room,date}) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email address");
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
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
                    address: process.env.EMAIL,
                },
                to,
                subject,
                template,
                context
            }
            // console.log("email:",email)

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return { status: 'Error sending booking response' };
                } else {
                    console.log('Booking sent successfully' )
                    return { status: 'Booking response sent successfully' };
                }
            })
        }
        sendMail(email, "Room booking", "booking", {room,date})
        // await transporter.sendMail(mailOptions);
        return { status: 'success' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: "Error sending otp" };
    }
}

module.exports = bookingResponse;
