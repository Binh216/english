const express = require('express');
const { body, param } = require('express-validator');
const progressController = require('../controllers/progressController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', authenticate, progressController.listProgress);
router.get('/user/:userId', authenticate, progressController.listProgressByUser);

router.post(
  '/',
  authenticate,
  validate([
    body('user').isMongoId().withMessage('Valid user id is required'),
    body('lesson').isMongoId().withMessage('Valid lesson id is required'),
    body('status')
      .optional()
      .isIn(['not-started', 'in-progress', 'completed'])
      .withMessage('Invalid status'),
    body('score').optional().isNumeric().withMessage('Score must be a number'),
  ]),
  progressController.createProgress
);

router.get('/:id', authenticate, progressController.getProgress);
router.put(
  '/:id',
  authenticate,
  validate([
    param('id').isMongoId().withMessage('Valid progress id is required'),
    body('status')
      .optional()
      .isIn(['not-started', 'in-progress', 'completed'])
      .withMessage('Invalid status'),
    body('score').optional().isNumeric().withMessage('Score must be a number'),
  ]),
  progressController.updateProgress
);
router.delete('/:id', authenticate, progressController.deleteProgress);

module.exports = router;
