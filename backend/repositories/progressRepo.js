const Progress = require('../models/Progress');

const createProgress = (progressData) => Progress.create(progressData);

const findProgressById = (id) => Progress.findById(id).populate('user lesson');

const findProgressByUserAndLesson = (userId, lessonId) =>
  Progress.findOne({ user: userId, lesson: lessonId });

const updateProgress = (id, updateData) =>
  Progress.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

const deleteProgress = (id) => Progress.findByIdAndDelete(id);

const listProgress = (filter = {}, options = {}) =>
  Progress.find(filter, null, options).populate('user lesson');

module.exports = {
  createProgress,
  findProgressById,
  findProgressByUserAndLesson,
  updateProgress,
  deleteProgress,
  listProgress,
};
