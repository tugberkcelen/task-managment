const Joi = require("joi");

const createBoardValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
});

const updateBoardValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
});

module.exports = {
  createBoardValidation,
  updateBoardValidation,
};
