const Joi = require("joi");

const boardSchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
});

module.exports = {
  boardSchema,
};
