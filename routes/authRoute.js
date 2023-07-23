const express = require('express');
const router = express.Router();
const { register, login, logout, verifyEmail, forgotPassword, resetPassword } = require('../controllers/authController');

//router.post('/register', register);
router.route('/register').post(register)
// router.post('/login', login);
// router.delete('/logout', 
//     //authenticateUser, 
//     logout);
// router.post('/verify-email', verifyEmail);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword)

module.exports = router;