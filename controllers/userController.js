const User = require('../model/user')
const CustomError = require('../errors')
const {generateToken} = require('./authController')
const user = require('../model/user')

const register = async (req, res, next) => {
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

const updateUser = async (req, res) =>  {
    const { email, firstName, password, passwordConfirm, lastName, 
        carType, zipCode, city, country } = req.body
    if (!req.body) {
            throw new CustomError.BadRequestError('Please provide credentials')
    }
    const user = await User.findOne({id: req.header._id}, 
        {...req.body})
    user.save()
    res.status(200).json({user: {id, firstName, 
        lastName, email, carType, zipCode, city, country}})
}

const getUser = async (req, res) =>  {
    const user = await User.findOne({_id:req.user._id})
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${req.user._id}`)
    }
    res.status(200).json({user: {_id: user._id, firstName: user.firstName, 
        lastName: user.lastName, email: user.email, carType: user.carType,
        zipCode: user.zipCode, city: user.city, country: user.country}})
}

const deleteUser = async (req, res) =>  {

}

module.exports = { register, updateUser, getUser, deleteUser }
