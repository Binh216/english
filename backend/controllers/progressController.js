const progressService = require('../services/progressService');

const createProgress = async (req, res, next) => {
  try {
    const progress = await progressService.createProgress(req.body);
    res.status(201).json(progress);
  } catch (err) {
    next(err);
  }
};

const getProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressById(req.params.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const progress = await progressService.updateProgress(req.params.id, req.body);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

const deleteProgress = async (req, res, next) => {
  try {
    await progressService.deleteProgress(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const listProgress = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const sort = req.query.sort || '-updatedAt';

    const filter = {};
    if (req.query.user) {
      filter.user = req.query.user;
    }
    if (req.query.lesson) {
      filter.lesson = req.query.lesson;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const options = {
      skip: (page - 1) * limit,
      limit,
      sort,
    };

    const progressItems = await progressService.listProgress(filter, options);
    res.json({ page, limit, data: progressItems });
  } catch (err) {
    next(err);
  }
};

const listProgressByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const progressItems = await progressService.listProgress({ user: userId });
    res.json(progressItems);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProgress,
  getProgress,
  updateProgress,
  deleteProgress,
  listProgress,
  listProgressByUser,
};
