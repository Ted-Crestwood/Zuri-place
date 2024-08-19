// const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars')
// const otpGenerator = require('otp-generator');


// const endBookingResponse = async ({email,name}) => {
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         return res.status(400).send("Invalid email address");
//     }
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.SMTP_PASSWORD
//             }
//         });
//         const hbsOptions = {
//             viewEngine: {
//                 partialsDir: 'views',
//                 layoutsDir: 'views',
//                 defaultLayout: ''
//             },
//             viewPath: 'views'
//         }
//         transporter.use('compile', hbs(hbsOptions))
//         function sendMail(to, subject, template, context) {
//             const mailOptions = {
//                 from: {
//                     name: "Zuri Place",
//                     address: process.env.EMAIL,
//                 },
//                 to,
//                 subject,
//                 template,
//                 context
//             }
//             // console.log("email:",email)

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     return { status: 'Error sending booking response' };
//                 } else {
//                     return { status: 'Booking response sent successfully' };
//                 }
//             })
//         }
//         sendMail(email, "Room booking", "endBooking", {name})
//         // await transporter.sendMail(mailOptions);
//         return { status: 'success' };
//     } catch (error) {
//         console.error(error);
//         return { status: 'error', message: "Error sending otp" };
//     }
// }

// module.exports = endBookingResponse;

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const otpGenerator = require('otp-generator');

const contactResponse = async ({ email }) => {
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { status: 'error', message: "Invalid email address" };
    }

    try {
        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // Configure Handlebars options
        const hbsOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: 'views',
                layoutsDir: 'views',
                defaultLayout: ''
            },
            viewPath: 'views',
            extName: '.hbs',
        };
        transporter.use('compile', hbs(hbsOptions));

        // Define mail options
        const mailOptions = {
            from: {
                name: "Zuri Place",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "Contact Form",
            template: "contact"
            // context: { name },
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return { status: 'success', message: 'Contact form response sent successfully' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Error sending contact form response' };
    }
};

module.exports = contactResponse;
