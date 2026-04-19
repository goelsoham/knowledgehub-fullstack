const { body } = require('express-validator');

const categoryValidator = [
  body('name').notEmpty().withMessage('Category name is required').trim(),
  body('description').optional().trim()
];

module.exports = {
  categoryValidator
};
