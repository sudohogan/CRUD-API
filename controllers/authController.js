const User = require('../model/user')
const CustomError = require('../errors')
const createTokenUser = require('../utils/createTokenUser')
const jwt = require('jsonwebtoken')
const {attachSingleCookiesToResponse} = require('../utils/jwt')

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})

    if (!user) {
        throw new CustomError.UnauthenticatedError('Email or password is invalid')
    }
    const isPass = await user.comparePassword(password)
    if (!isPass) {
        throw new CustomError.UnauthenticatedError('Email or password is invalid')
    }
    const tokenUser = createTokenUser(user)

    attachSingleCookiesToResponse({ res, user: tokenUser })
    res.status(200).json({user: {firstName: user.firstName, 
        lastName: user.lastName, userId: user._id} ,tokenUser,})
} 

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      });
    
    res.status(200).json({ msg: 'user logged out!' });
}

module.exports = { login, logout }