const User = require('../model/user')
const CustomError = require('../errors')
const {generateToken} = require('./authController')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, firstName, password, passwordConfirm, lastName, 
        carType, zipCode, city, country } = req.body
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new CustomError.BadRequestError('email already exists')
    }
    const user = await User.create({ ...req.body})
    const token = await generateToken(user)
    res.status(201).json({user: {_id: user._id, firstName, 
        lastName, email, carType, zipCode, city, country}})
}

const updateUser = async (req, res) => {
    const auths = req.header('Authorization')
    if (!auths) {
       throw new CustomError.UnauthorizedError('THereis no auth')
    }
    token = auths.substring(7, auths.length)
    const { firstName} = req.body
    if (!firstName) {
        throw new CustomError.BadRequestError('Please provide credentials')
    }
    const user = await User.findOne(auths._id)
    res.status(200).json({user})
}

const getUser = async (req, res) =>  {
    const auths = req.header('Authorization')
    if (!auths) {
       throw new CustomError.UnauthorizedError('THereis no auth')
    }
    token = auths.substring(7, auths.length)
    const user = await User.findOne(auths._id)
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${req.user._id}`)
    }
    res.status(200).json({user: {_id: user._id, firstName: user.firstName, 
        lastName: user.lastName, email: user.email, carType: user.carType,
        zipCode: user.zipCode, city: user.city, country: user.country}})
}

const deleteUser = async (req, res) =>  {

    const user = await User.findByIdAndDelete({user: req.user});
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${req.user._id}`)
    }
    res.status(200).json({msg: 'account deleted'})
}

module.exports = { register, updateUser, getUser, deleteUser }
