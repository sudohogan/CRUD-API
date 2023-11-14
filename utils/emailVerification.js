const crypto = require('crypto');
const transporter = require('../utils/nodeMailerConfig');
const {throwBadRequestError} = require('../errors/newError')
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

function sendVerificationEmail(userEmail) {
  const emailToken = generateToken();

  const mailOptions = {
    from: 'kerry@kerry.com',
    to: userEmail,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://localhost:3000/api/v1/verify/${emailToken}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new throwBadRequestError('Email Verification Error')
    }
  });
}

module.exports = {sendVerificationEmail};
