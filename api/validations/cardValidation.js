const Joi = require("joi");

const createCardValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string(),
  importance: Joi.string(),
  status: Joi.boolean(),
  idListTrello: Joi.string().required(),
  idBoard: Joi.string().required(),
  idList: Joi.string().required(),
  idCardTrello: Joi.string(),
  image: Joi.string(),
});

module.exports = {
  createCardValidation,
};
