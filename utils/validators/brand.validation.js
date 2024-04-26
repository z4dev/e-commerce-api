// eslint-disable-next-line
const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validator.middleware");

exports.getBrandValidation = [
  check("id").isMongoId().withMessage("Invalid Brand ID "),
  validatorMiddleware,
];

exports.createBrandValidation = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("shore Brand name")
    .isLength({ max: 30 })
    .withMessage("too tall Brand name"),
  validatorMiddleware,
];

exports.deleteBrandValidation = [
  check("id").isMongoId().withMessage("Invalid Brand ID "),
  validatorMiddleware,
];

exports.UpdateBrandValidation = [
  check("id").isMongoId().withMessage("Invalid Brand ID "),
  check("name")
    .isLength({ min: 3 })
    .withMessage("shore Brand name")
    .isLength({ max: 30 })
    .withMessage("too tall Brand name"),
  validatorMiddleware,
];
