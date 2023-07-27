const express = require('express')
const router = express.Router()
const {joiRegister, joiLogin, joiUpdate} = require('../middleware/joiSchema')
const {register, deleteUser,updateUser, getUser } = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const {verifyToken} = require('../middleware/verifyToken')

router.route('/').post(joiRegister, register)
            .patch(verifyToken, joiUpdate, updateUser)
            .get(verifyToken, getUser).delete(verifyToken, deleteUser)
router.post('/login', joiLogin, login)
router.delete('/logout', verifyToken, logout)
module.exports = router
