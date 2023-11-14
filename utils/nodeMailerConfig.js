const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  //host: 'smtp.ethereal.email',
  service: 'gmail',
  port: 587,
  auth: {
    user: 'hoganizy85@gmail.com',
    pass: process.env.NODE_MAILER_PASS,
  },
});

module.exports = transporter;
