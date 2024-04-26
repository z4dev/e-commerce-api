// eslint-disable-next-line
const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validator.middleware");

exports.getCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid category ID "),
  validatorMiddleware,
];

exports.createCategoryValidation = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("shore category name")
    .isLength({ max: 30 })
    .withMessage("too tall category name"),
  validatorMiddleware,
];

exports.deleteCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid category ID "),
  validatorMiddleware,
];

exports.UpdateCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid category ID "),
  check("name")
    .isLength({ min: 3 })
    .withMessage("shore category name")
    .isLength({ max: 30 })
    .withMessage("too tall category name"),
  validatorMiddleware,
];
