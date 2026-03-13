const lessonService = require('../services/lessonService');

const createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
};

const getLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    res.json(lesson);
  } catch (err) {
    next(err);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);
    res.json(lesson);
  } catch (err) {
    next(err);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const listLessons = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const sort = req.query.sort || '-createdAt';

    const filter = {};
    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, 'i');
    }

    const options = {
      skip: (page - 1) * limit,
      limit,
      sort,
    };

    const lessons = await lessonService.listLessons(filter, options);
    res.json({ page, limit, data: lessons });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
  listLessons,
};
