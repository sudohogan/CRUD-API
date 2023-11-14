const Admin = require('../model/admin');
const { StatusCodes } = require('http-status-codes');
const User = require('../model/user');
const {throwValidationError, throwUnauthorizedError, 
  throwNotFoundError, throwBadRequestError, throwInternalServerError} = require('../errors/newError')

const registerAdmin = async (req, res) => {
  const {
    email,
    fullName,
    password,
  } = req.body;
  const emailExists = await Admin.findOne({ email });
  if (emailExists) {
    throw new throwBadRequestError(
      'Email already exists.');
  }
  const admin = await Admin.create({ ...req.body });
  res
    .status(201)
    .json({
      admin: {
        _id: admin._id,
        fullName,
        email,
      },
    });
};

const updateAdmin = async (req, res) => {
  const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route.'
    )
  }
  token = auths.substring(7, auths.length);
  const {
    fullName,
    email,
    password,
  } = req.body;
  if (!req.body) {
    throw new throwValidationError('Please provide credentials');
  }
  const admin = await Admin.findOne(auths._id);
  if (fullName) {
    admin.fullName = fullName
  }
  if (email) {
    admin.email = email
  }
  if (password) {
    admin.password = password
  }
  await admin.save();
  res.status(200).json({ admin });
};

const getAdmin = async (req, res) => {
  const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route.'
    )
  }
  token = auths.substring(7, auths.length);
  const admin = await Admin.findOne(auths._id);
  if (!admin) {
    throw new throwNotFoundError(
      'Admin not found.'
    )
  }
  res
    .status(200)
    .json({
      admin: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });
};

const deleteAdmin = async (req, res) => {
  const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route.'
    )
  }
  token = auths.substring(7, auths.length);
  const admin = await Admin.findOne({ admin: req.admin });
  if (!admin) {
    throw new throwNotFoundError(
      'Admin not found.'
    )
  }
  await admin.delete();
  res.status(204).json({ msg: 'account deleted' });
};

const getAdminUsers = async (req, res) => {
    const auths = req.header('Authorization');
  if (!auths) {
    throw new throwUnauthorizedError(
      'User is not authorized for this route.'
    )
  }
  token = auths.substring(7, auths.length);
  const admin = await Admin.findOne(auths._id);
  if (!admin) {
    throw new throwNotFoundError(
      'Admin not found.'
    )
  }
  const adminId = await Admin.findOne({id: req._id});
  const adminUsers = await User.find({adminId: adminId})
  res
    .status(200)
    .json({
      adminUsers
    });
}

const deleteAdminUsers = async (req, res) => {
        const adminId = await Admin.findOne({id: req._id});
        if (!adminId) {
          throw new throwNotFoundError(
            'Admin users not found.'
          )
        }
        await User.deleteMany({adminId: adminId})
        res.statusCode(204).json('Users deleted')
          
}

const getSingleUser = async (req, res) => {
    try {
        const { id: userId } = req.params
        if (!req.params) {
            throw new throwValidationError('No Id supplied.')
        }
        const user = await User.findById(userId)
        if (!user) {
            throw new throwNotFoundError(`No user with id: ${userId}.`)
        }
        const adminId = await Admin.findOne({id: req._id});
        if (!adminId) {
          throw new throwNotFoundError(
            'Admin users not found.'
          )
        }
        if (!user.adminId == adminId) {
          throw new throwUnauthorizedError('Admin is not authorized for this user')
        } 
        res.status(StatusCodes.OK).json(user.fullName, user.email, 
          user.package, user.isActive, user._id)
    } catch (error) {
        if (error instanceof throwNotFoundError) {
           throw new throwNotFoundError(error)
        } else if (error instanceof throwBadRequestError) {
            throw new throwBadRequestError('id is invalid.')
        } else {
          console.log(error);
            throw new throwInternalServerError(error)
        }
    }
}

const deleteSingleUser = async (req, res) => {
  try {
    const { id: userId } = req.params
    if (!req.params) {
        throw new throwValidationError('Invalid Id supplied')
    }
    const user = await User.findById(userId)
    console.log(user);
    if (!user) {
        throw new throwNotFoundError(`No user with ${userId} found`)
    }
    const adminId = await Admin.findOne({id: req._id});
    if (!user.adminId == adminId) {
      throw new throwUnauthorizedError('Admin is not authorized for this user')
    } res.status(StatusCodes.NO_CONTENT).json({ msg: 'user deleted' })
    await User.deleteOne(user)
} catch (error) {
    if (error instanceof throwNotFoundError) {
        throw new throwNotFoundError(error)
    } else if (error instanceof throwBadRequestError) {
        throw new throwBadRequestError(error)
    } else {
        throw new throwInternalServerError(error)
    }
  }
}

module.exports = { registerAdmin, updateAdmin, getAdmin, getAdminUsers, deleteAdmin, deleteAdminUsers, getSingleUser, deleteSingleUser };
