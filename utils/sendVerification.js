const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({
    name,
    email,
    verificationToken,
    origin,
}) => {
    const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`

    const message = `<p>Welcome onboard : <a href="${verifyEmail}">Verify email</a></p>`
    return sendEmail({
        to: email,
        subject: 'Confirn Email',
        html: `<h4>Hello, ${name} </h4> ${message}`,
    })
}

module.exports = sendVerificationEmail
