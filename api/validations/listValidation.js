const Joi = require("joi");

const createListValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  idBoard: Joi.string().required(),
});

const updateListValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  idBoard: Joi.required(),
  _id: Joi.required(),
  idListTrello: Joi.required(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});

module.exports = {
  createListValidation,
  updateListValidation,
};
