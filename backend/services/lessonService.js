const lessonRepo = require('../repositories/lessonRepo');

const createLesson = (lessonData) => lessonRepo.createLesson(lessonData);

const getLessonById = async (id) => {
  const lesson = await lessonRepo.findLessonById(id);
  if (!lesson) {
    const err = new Error('Lesson not found');
    err.status = 404;
    throw err;
  }
  return lesson;
};

const updateLesson = async (id, updateData) => {
  const lesson = await lessonRepo.findLessonById(id);
  if (!lesson) {
    const err = new Error('Lesson not found');
    err.status = 404;
    throw err;
  }
  return lessonRepo.updateLesson(id, updateData);
};

const deleteLesson = async (id) => {
  const lesson = await lessonRepo.findLessonById(id);
  if (!lesson) {
    const err = new Error('Lesson not found');
    err.status = 404;
    throw err;
  }
  return lessonRepo.deleteLesson(id);
};

const listLessons = (filter, options) => lessonRepo.listLessons(filter, options);

module.exports = {
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
  listLessons,
};
