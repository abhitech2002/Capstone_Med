const { body } = require('express-validator');

const validateReport = [
  body('title')
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters.'),

  body('description')
    .notEmpty()
    .withMessage('Description is required.')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters.'),
];

module.exports = validateReport;