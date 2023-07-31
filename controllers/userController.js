const User = require('../model/user')
const CustomError = require('../errors')

const register = async (req, res) => {
    const { email, firstName, password, passwordConfirm, lastName, 
        carType, zipCode, city, country } = req.body
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new CustomError.BadRequestError({"statusCode": "Validation error",
        "errors": [
          {
            "resource": "Email",
            "message": "Invalid email"
          }
        ]})
    }
    const user = await User.create({ ...req.body})
    res.status(201).json({user: {_id: user._id, firstName, 
        lastName, email, carType, zipCode, city, country}})
}

const updateUser = async (req, res) => {
    const auths = req.header('Authorization')
    if (!auths) {
       throw new CustomError.UnauthorizedError({"statusCode": 401,
       "message": "Not Authenticated",
       "error": "Unauthorized"})
    }
    token = auths.substring(7, auths.length)
    const { firstName, lastName, email, password, passwordConfirm, 
            carType, zipCode, city, country} = req.body
    if (!firstName) {
        throw new CustomError.BadRequestError('Please provide credentials')
    }
    const user = await User.findOne(auths._id)
    user.firstName = firstName, user.lastName = lastName, user.email =  email, user.password = password,
        user.passwordConfirm = passwordConfirm, user.carType = carType, 
        user.zipCode = zipCode, user.city = city, user. country = country;  
    await user.save();
    res.status(200).json({user})
}

const getUser = async (req, res) =>  {
    const auths = req.header('Authorization')
    if (!auths) {
       throw new CustomError.UnauthorizedError({  "statusCode": 401,
       "message": "Not Authenticated",
       "error": "Unauthorized"})
    }
    token = auths.substring(7, auths.length)
    const user = await User.findOne(auths._id)
    if (!user) {
        throw new CustomError.NotFoundError({  "statusCode": 404,
        "message": "user not found",
        "error": "Not Found"})
    }
    res.status(200).json({user: {_id: user._id, firstName: user.firstName, 
        lastName: user.lastName, email: user.email, carType: user.carType,
        zipCode: user.zipCode, city: user.city, country: user.country}})
}

const deleteUser = async (req, res) =>  {
    const auths = req.header('Authorization')
    if (!auths) {
       throw new CustomError.UnauthorizedError({    
       "statusCode": 401,
       "message": "Not Authenticated",
       "error": "Unauthorized"})
    }
    token = auths.substring(7, auths.length)
    const user = await User.findOne({user: req.user});
    if (!user) {
        throw new CustomError.NotFoundError({  "statusCode": 404,
        "message": "user not found",
        "error": "Not Found"})
    }
    await user.delete()
    res.status(204).json({msg: 'account deleted'})
}

module.exports = { register, updateUser, getUser, deleteUser }
