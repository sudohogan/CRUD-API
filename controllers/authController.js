const User = require('../model/user');

const register = async (req, res) => {
    const { email, name, password } = req.body
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
    //throw new CustomError.BadRequestError('Email already exists');
    }
    const user = await User.create({ name, email, password});
    res.status(200).json({msg: 'we good', user})
}

module.exports = {register}