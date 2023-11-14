const express = require('express');
const router = express.Router();
const User = require('../model/user')
const {throwNotFoundError, throwInternalServerError} = require('../errors/newError')

router.get('/:emailToken', async (req, res) => {
  const { emailToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken: emailToken });
    if (!user) {
      throw new throwNotFoundError('User not found');
    }
    user.isActive = true;
    user.verificationToken = null;
    await user.save();
    return res.send(`Email verification successful is ${user.isActive}!`);
  } catch (error) {
    throw new throwInternalServerError('Error in authenticating User');
  }
});

module.exports = router;
