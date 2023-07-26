const nodemailer = require('nodemailer')
const configs = require('./nodeMailerConfig')

const sendEmail = async ({ to, subject, html }) => {
    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport(configs)

    let info = await transporter.sendMail({
        from: '"OmoYoruba" <omo@gmail.com>',
        to,
        subject,
        html,
    })
}

module.exports = sendEmail
