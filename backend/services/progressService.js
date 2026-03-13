const progressRepo = require('../repositories/progressRepo');

const createProgress = async (progressData) => {
  const existing = await progressRepo.findProgressByUserAndLesson(
    progressData.user,
    progressData.lesson
  );

  if (existing) {
    const err = new Error('Progress already exists for this user and lesson');
    err.status = 400;
    throw err;
  }

  return progressRepo.createProgress(progressData);
};

const getProgressById = async (id) => {
  const progress = await progressRepo.findProgressById(id);
  if (!progress) {
    const err = new Error('Progress not found');
    err.status = 404;
    throw err;
  }
  return progress;
};

const updateProgress = async (id, updateData) => {
  const progress = await progressRepo.findProgressById(id);
  if (!progress) {
    const err = new Error('Progress not found');
    err.status = 404;
    throw err;
  }
  return progressRepo.updateProgress(id, updateData);
};

const deleteProgress = async (id) => {
  const progress = await progressRepo.findProgressById(id);
  if (!progress) {
    const err = new Error('Progress not found');
    err.status = 404;
    throw err;
  }
  return progressRepo.deleteProgress(id);
};

const listProgress = (filter, options) => progressRepo.listProgress(filter, options);

module.exports = {
  createProgress,
  getProgressById,
  updateProgress,
  deleteProgress,
  listProgress,
};
