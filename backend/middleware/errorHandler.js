const ApiError = require('../utils/apiError');

const notFoundHandler = (req, res, next) => {
  next(new ApiError('Not Found', 404));
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log full errors for development
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({
    status: 'error',
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
