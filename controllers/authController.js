const User = require('../model/user')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')

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
    const token = await generateToken(user)

    res.status(200).json({token, user: { _id: user._id, firstName: user.firstName, 
        lastName: user.lastName}
    })
}

const generateToken = async (user) => {
    const {_id, email} = user
    const jwtSecret = process.env.JWT_SECRET
    return jwt.sign({_id, email}, jwtSecret, {expiresIn: '1h'})
}


const logout = async (req, res) => {
    // res.cookie('token', 'logout', {
    //     httpOnly: true,
    //     expires: new Date(Date.now()),
    //   });
    
    res.status(200).json({ msg: 'user logged out!' });
}

module.exports = { login, logout, generateToken}