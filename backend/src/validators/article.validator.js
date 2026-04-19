const { body } = require('express-validator');

const articleValidator = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('categoryId').notEmpty().withMessage('Category ID is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings')
];

module.exports = {
  articleValidator
};
