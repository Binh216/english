const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepo');
const ApiError = require('../utils/apiError');

const SALT_ROUNDS = 10;

const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new ApiError('JWT_SECRET is not defined in environment', 500);
  }

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    secret,
    { expiresIn: '7d' }
  );
};

const createUser = async (userData) => {
  const existing = await userRepo.findUserByEmail(userData.email);
  if (existing) {
    throw new ApiError('Email already in use', 400);
  }

  const hashedPassword = await hashPassword(userData.password);
  const user = await userRepo.createUser({ ...userData, password: hashedPassword });
  return user;
};

const registerUser = createUser;

const loginUser = async ({ email, password }) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new ApiError('Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid email or password', 401);
  }

  const token = generateToken(user);
  return { user, token };
};

const getUserById = (id) => userRepo.findUserById(id);

const updateUser = async (id, updateData) => {
  const user = await userRepo.findUserById(id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  // Prevent changing email to one already in use
  if (updateData.email) {
    const existing = await userRepo.findUserByEmail(updateData.email);
    if (existing && existing._id.toString() !== id) {
      throw new ApiError('Email already in use', 400);
    }
  }

  const updatedData = { ...updateData };
  if (updateData.password) {
    updatedData.password = await hashPassword(updateData.password);
  }

  return userRepo.updateUser(id, updatedData);
};

const deleteUser = async (id) => {
  const user = await userRepo.findUserById(id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  return userRepo.deleteUser(id);
};

const listUsers = (filter, options) => userRepo.listUsers(filter, options);

module.exports = {
  createUser,
  registerUser,
  loginUser,
  generateToken,
  getUserById,
  updateUser,
  deleteUser,
  listUsers,
};
