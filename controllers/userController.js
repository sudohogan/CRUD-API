const User = require('../model/user')
const CustomError = require('../errors')

const register = async (req, res, next) => {
    const { email, firstName, password, passwordConfirm, lastName, 
        carType, zipCode, city, country } = req.body
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new CustomError.BadRequestError('email already exists')
    }
    const user = await User.create({ email, firstName, password, passwordConfirm,
         lastName, carType, zipCode, city, country})
    res.status(201).json({user})
}


module.exports = { register,  }
