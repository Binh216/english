const User = require('../models/User');

const createUser = (userData) => User.create(userData);

const findUserById = (id) => User.findById(id);

const findUserByEmail = (email) => User.findOne({ email: email.toLowerCase().trim() });

const updateUser = (id, updateData) =>
  User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

const deleteUser = (id) => User.findByIdAndDelete(id);

const listUsers = (filter = {}, options = {}) => User.find(filter, null, options);

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser,
  listUsers,
};
