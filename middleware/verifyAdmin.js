const {throwUnauthorizedError} = require('../errors/newError')
const Admin = require('../model/admin')

const verifyAdmin = async (req, res, next) => {
    const currentAdmin = await Admin.findOne({id: req._id});
    if (!currentAdmin.isAdmin) {
      throwUnauthorizedError('Only Admins can access this route')
    }
  return next();
};

module.exports = { verifyAdmin };
