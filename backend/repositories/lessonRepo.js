const Lesson = require('../models/Lesson');

const createLesson = (lessonData) => Lesson.create(lessonData);

const findLessonById = (id) => Lesson.findById(id);

const updateLesson = (id, updateData) =>
  Lesson.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

const deleteLesson = (id) => Lesson.findByIdAndDelete(id);

const listLessons = (filter = {}, options = {}) => Lesson.find(filter, null, options);

module.exports = {
  createLesson,
  findLessonById,
  updateLesson,
  deleteLesson,
  listLessons,
};
