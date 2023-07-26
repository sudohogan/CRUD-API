module.exports = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bernhard.gulgowski@ethereal.email',
        pass: process.env.NODE_MAILER,
    },
}
