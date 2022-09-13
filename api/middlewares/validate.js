const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      ?.map((error) => error.message)
      .join(", ");
    res.status(httpStatus.BAD_REQUEST).send({ error: errorMessage });
    return;
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
