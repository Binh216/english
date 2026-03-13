const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const userService = require('../services/userService');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError('Authentication required', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserById(payload.sub);
    if (!user) {
      return next(new ApiError('Invalid token', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError('Invalid authentication token', 401));
  }
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError('Authentication required', 401));
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return next(new ApiError('Forbidden', 403));
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
