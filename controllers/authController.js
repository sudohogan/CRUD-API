const User = require('../model/user');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const { blacklistedTokens } = require('../middleware/verifyToken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError({
      statusCode: 'Validation error',
      errors: [
        {
          resource: 'Email',
          message: 'Invalid email',
        },
      ],
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthorizedError({
      statusCode: 404,
      message: 'user not found',
      error: 'Not Found',
    });
  }
  const isPass = await user.comparePassword(password);
  if (!isPass) {
    throw new CustomError.UnauthenticatedError('Email or password is invalid');
  }
  const token = await generateToken(user);

  res
    .status(200)
    .set('Authorization', `Bearer ${token.token}`)
    .json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
};

const generateToken = async (user) => {
  const { _id, email } = user;
  const jwtSecret = process.env.JWT_SECRET;
  return await jwt.sign({ _id, email }, jwtSecret, { expiresIn: '1h' });
};

const logout = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['token'];
  if (!token) {
    throw new CustomError.UnauthorizedError({
      statusCode: 401,
      message: 'Not Authenticated',
      error: 'Unauthorized',
    });
  }
  await blacklistedTokens.push(token);
  res.status(204).json({ message: 'Logout successful.' });
};

module.exports = { login, logout, generateToken };
