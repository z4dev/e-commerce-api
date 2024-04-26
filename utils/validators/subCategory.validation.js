// eslint-disable-next-line
const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validator.middleware");

// check-> check the param,query,body

exports.getSubCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid subCategory ID "),
  validatorMiddleware,
];

exports.createSubCategoryValidation = [
  check("name")
    .notEmpty()
    .withMessage("category is required")
    .isLength({ min: 3 })
    .withMessage("short subcategory name")
    .isLength({ max: 30 })
    .withMessage("too tall subcategory name"),
  check("categoryId").isMongoId().withMessage("Invalid Category ID format"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid subcategory ID "),
  validatorMiddleware,
];

exports.UpdateSubCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid subcategory ID "),
  validatorMiddleware,
];
