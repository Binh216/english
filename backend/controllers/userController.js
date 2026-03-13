const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const requester = req.user;
    if (requester.role !== 'admin' && requester._id.toString() !== req.params.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res) => {
  res.json(req.user);
};

const updateUser = async (req, res, next) => {
  try {
    const requester = req.user;

    if (requester.role !== 'admin' && requester._id.toString() !== req.params.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.user._id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const requester = req.user;

    if (requester.role !== 'admin' && requester._id.toString() !== req.params.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    await userService.deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const deleteCurrentUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user._id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const sort = req.query.sort || '-createdAt';

    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.email) {
      filter.email = req.query.email.toLowerCase();
    }

    const options = {
      skip: (page - 1) * limit,
      limit,
      sort,
    };

    const users = await userService.listUsers(filter, options);
    res.json({ page, limit, data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUser,
  getCurrentUser,
  updateUser,
  updateCurrentUser,
  deleteUser,
  deleteCurrentUser,
  listUsers,
};
