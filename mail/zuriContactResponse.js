const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const otpGenerator = require('otp-generator');


const zuriContactResponse = async ({email,name,subject,message,phone,userEmail}) => {
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
                    return { status: 'Error sending contact response' };
                } else {
                    return { status: 'Contact response sent successfully' };
                }
            })
        }
        // console.log("email:",email)
        sendMail(email, "Contact Form", "zuriContact", {name,subject,message,phone,userEmail})
        // console.log("Zuri Contact:",{name,subject,message,phone,userEmail})
        // await transporter.sendMail(mailOptions);
        return { status: 'success' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: "Error sending otp" };
    }
}
module.exports = zuriContactResponse;
