const Joi = require('joi');
const CustomError = require('../errors');

const carTypeEnum = ['SEDAN', 'SUV', 'SEMI_LUXURY', 'LUXURY'];

const joiLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new CustomError.UnauthenticatedError(error);
  }
  return next();
};

const joiRegister = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
    passwordConfirm: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
      }),
    carType: Joi.string()
      .valid(...carTypeEnum)
      .required(),
    zipCode: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new CustomError.UnauthenticatedError(error);
  }
  return next();
};

const joiUpdate = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().trim(),
    password: Joi.string().min(6),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).messages({
      'any.only': 'Passwords do not match',
    }),
    carType: Joi.string().valid(...carTypeEnum),
    zipCode: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new CustomError.UnauthenticatedError(error);
  }
  return next();
};

module.exports = {
  joiRegister,
  joiLogin,
  joiUpdate,
};
