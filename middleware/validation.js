const validation = require("express-validator");

const validationCheck = (req, res, next) => {
  const error = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Error",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validationCheck;
