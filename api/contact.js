const nodemailer = require('nodemailer');
require('dotenv').config();
// const mailOptions = {
//     from: "info@glaubes.eu",
//     to: "info@glaubes.eu",
//     subject: `New contact form submission from name`,
//     text: `You have a new contact form submission:\n\n
//            Name:"name"\n
//            Email: "email"\n
//            Message: "message"`,
// };
// const transporter = nodemailer.createTransport({
//     host: "smtpout.secureserver.net",  
//     secure: true,
//     secureConnection: false, // TLS requires secureConnection to be false
//     tls: {
//         ciphers:'SSLv3'
//     },
//     requireTLS:true,
//     port: 465,
//     debug: true,
//     auth: {
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS,
//     },
// });
// transporter.sendMail(mailOptions).then(() => {
//     console.log('Email sent successfully');
// }).catch((err) => {
//     console.log('Failed to send email');
//     console.error(err);
// });


module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    if (req.method === 'POST') {
        const { name, email, message,phone,subject } = req.body;
        // Basic validation
        if (!name || !email || !message || !phone || !subject ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Set up Nodemailer transport
        const transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",  
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers:'SSLv3'
            },
            requireTLS:true,
            port: 465,
            debug: true,
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
        });
        


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New contact form submission from ${name}`,
            text: `You have a new contact form submission:\n\n
                   Name: ${name}\n
                   Email: ${email}\n
                   Phone: ${phone}\n
                   Subject: ${subject}\n
                   Message: ${message}\n`,
        };


        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Your message has been sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(505).json({ error: error});
            // res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};