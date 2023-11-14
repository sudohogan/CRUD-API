const Joi = require('joi');
const {throwUnauthorizedError} = require('../errors/newError')
const subType = ['monthly', 'quaterly', 'biannually'];

const joiLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new throwUnauthorizedError(error);
  }
  return next();
};

const joiRegister = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
    package: Joi.string().valid(...subType).required()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new throwUnauthorizedError(error);
  }
  return next();
};

const joiUpdate = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email().trim(),
    password: Joi.string().min(6),
    package: Joi.string().valid(...subType)
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new throwUnauthorizedError(error);
  }
  return next();
};

module.exports = {
  joiRegister,
  joiLogin,
  joiUpdate,
};
