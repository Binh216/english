const express = require('express');
const { body } = require('express-validator');
const lessonController = require('../controllers/lessonController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', authenticate, lessonController.listLessons);
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate([
    body('title').isString().trim().notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
    body('content').optional().isString(),
    body('difficulty')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Invalid difficulty'),
  ]),
  lessonController.createLesson
);
router.get('/:id', authenticate, lessonController.getLesson);
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate([
    body('title').optional().isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('content').optional().isString(),
    body('difficulty')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Invalid difficulty'),
  ]),
  lessonController.updateLesson
);
router.delete('/:id', authenticate, authorize('admin'), lessonController.deleteLesson);

module.exports = router;
