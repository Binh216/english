const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => `${err.param}: ${err.msg}`)
        .join(', ');
      return next(new ApiError(message, 400));
    }
    next();
  };
};

module.exports = validate;
