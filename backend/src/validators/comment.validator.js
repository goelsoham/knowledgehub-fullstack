const { body } = require('express-validator');

const commentValidator = [
  body('articleId').notEmpty().withMessage('Article ID is required'),
  body('content').notEmpty().withMessage('Content is required').trim()
];

module.exports = {
  commentValidator
};
