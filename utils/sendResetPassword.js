const sendEmail = require('./sendEmail')

const sendResetPassword = async ({ name, email, token, origin }) => {
    const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`
    const message = `<p>Click the link to reset password:<a href="${resetURL}">
         Reset Password</a></p>`
    return sendEmail({
        to: email,
        subject: 'Reset Password',
        html: `<h4>Hello, ${name}</h4>${message}`,
    })
}

module.exports = sendResetPassword
