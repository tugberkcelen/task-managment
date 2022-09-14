const Joi = require("joi");

const createListValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  idBoard: Joi.required(),
});

const updateListValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  idBoard: Joi.required(),
});

module.exports = {
  createListValidation,
  updateListValidation,
};
