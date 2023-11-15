const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { blacklistedTokens } = require('../middleware/verifyToken');
const {throwValidationError, throwUnauthorizedError, 
  throwNotFoundError, ValidationError } = require('../errors/newError')

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new throwValidationError(
      'Invalid credentials.'
    )
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new throwNotFoundError(
      'User not found.'
    )
  }
  if (user.isActive == false) {
    throw new throwValidationError(
        "User's email has not been authenticated"
    );
  }
  const isPass = await user.comparePassword(password);
  console.log(isPass);
  if (isPass == true) {
    throw new ValidationError('Password is incorrect.');
  }
  const token = await generateToken(user);

  res
    .status(200)
    .set('Authorization', `Bearer ${token.token}`)
    .json({
      token,
        _id: user._id,
        fullName: user.fullName,
    });
};

const generateToken = async (user) => {
  const { _id, email } = user;
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ _id, email }, jwtSecret, { expiresIn: '1h' });
};

const logout = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['token'];
  if (!token) {
    throw new throwUnauthorizedError(
     'User is not authorized for this route'
    );
  }
  blacklistedTokens.push(token);
  res.status(204).json({ message: 'Logout successful.' });
};

module.exports = { login, logout, generateToken };
