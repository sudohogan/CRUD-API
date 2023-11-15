const Admin = require('../model/admin');
const {throwValidationError, throwUnauthorizedError, 
  throwNotFoundError, throwBadRequestError, } = require('../errors/newError')
const jwt = require('jsonwebtoken');
const { blacklistedTokens } = require('../middleware/verifyToken');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new throwValidationError(
      'Invalid credentials.'
    )
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new throwNotFoundError(
      'Admin not found.'
    )
  }
  const isPasswordTrue = await admin.comparePassword(password);
  if (isPasswordTrue == true) {
    throw new throwBadRequestError('Password is incorrect');
  }
  const token = await generateToken(admin);

  res
    .status(200)
    .set('Authorization', `Bearer ${token.token}`)
    .json({
      token,
        _id: admin._id,
        fullName: admin.fullName,
    });
};

const generateToken = async (admin) => {
  const { _id, email } = admin;
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ _id, email }, jwtSecret, { expiresIn: '1h' });
};

const adminLogout = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['token'];
  if (!token) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route.'
    )
  }
  blacklistedTokens.push(token);
  res.status(204).json({ message: 'Logout successful.' });
};

module.exports = { adminLogin, adminLogout, generateToken };
