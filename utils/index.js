const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')
const createTokenUser = require('./createTokenUser')
const sendVerificationEmail = require('./sendVerification')
const sendResetPassword = require('./sendResetPassword')
const createHash = require('./createHash')

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    sendVerificationEmail,
    sendResetPassword,
    createHash,
}
