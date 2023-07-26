const express = require('express')
const router = express.Router()
const {joiRegister, joiLogin} = require('../middleware/joiSchema')
const {register,} = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const {authenticate} = require('../middleware/authenticate')

router.route('/').post(joiRegister, register)
//router.route('/:id').delete(register)
router.post('/login', joiLogin, login)
router.delete('/logout', authenticate, logout)
module.exports = router
