const User = require('../model/user');
const Admin = require('../model/admin')
const {throwValidationError, throwUnauthorizedError, 
  throwNotFoundError, throwBadRequestError} = require('../errors/newError')
const {sendVerificationEmail} = require('../utils/emailVerification')

const register = async (req, res) => {
  const adminId = await Admin.findOne({id: req._id});
  const {
    email,
    fullName,
    password,
    package
  } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new throwBadRequestError(
      'Email already exists');
  }
  await sendVerificationEmail(req.body.email)
  const user = await User.create({ email, password, fullName, package, adminId });
  res
    .status(201)
    .json({
        _id: user._id,
        fullName,
        email,
    });
};

const updateUser = async (req, res) => {
  const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route');
  }
  token = auths.substring(7, auths.length);
  const {
    fullName,
    email,
    password,
    package
  } = req.body;
  if (!req.body) {
    throw new throwValidationError('Please provide credentials');
  }
  const user = await User.findOne(auths._id);
  if (fullName) {
    user.fullName = fullName
  }
  if (email) {
    user.email = email
  }
  if (password) {
    user.password = password
  }
  if (package) {
    user.package = package
  }
  await user.save();
  res.status(200).json({ user });
};

const getUser = async (req, res) => {
  const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route',
    );
  }
  token = auths.substring(7, auths.length);
  const user = await User.findOne(auths._id);
  if (!user) {
    throw new throwNotFoundError(
      'User not found',
    );
  }
  res
    .status(200)
    .json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        package: user.package
      },
    });
};

const deleteUser = async (req, res) => {
  const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route',
    );
  }
  token = auths.substring(7, auths.length);
  const user = await User.findOne({ user: req.user });
  if (!user) {
    throw new throwNotFoundError(
      'User not found',
    );
  }
  await user.delete();
  res.status(204).json({ msg: 'account deleted' });
};

module.exports = { register, updateUser, getUser, deleteUser };
