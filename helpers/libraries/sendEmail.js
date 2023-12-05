const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;