const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticate = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication is invalid')
    } 
    try {
        const  {name, userId} = isTokenValid({token})
        req.user = {name, userId}
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication is very invalid')
    }
    
}

module.exports = {authenticate}