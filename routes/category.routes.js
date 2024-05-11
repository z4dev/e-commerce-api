const express = require("express");

const router = express.Router();
const categoryService = require("../services/category.service");
const uploadSingleImage = require("../middleware/uploadSingleImage");

// the validation for the category
const categoryValidation = require("../utils/validators/category.validator");

router
  .route("/")
  .get(categoryService.getAllCategories)
  .post(
    uploadSingleImage("image"),
    categoryValidation.createCategoryValidation,
    categoryService.createCategory,
  )

router
  .route("/:id")
  .get(
    categoryValidation.getCategoryValidation,
    categoryService.getSpecificCategory,
  )
  .put(
    categoryValidation.UpdateCategoryValidation,
    categoryService.updateCategory,
  )

  .delete(
    categoryValidation.deleteCategoryValidation,
    categoryService.deleteCategory,
  );

  router.use("/:categoryId/subcategories", require("./subcategory.routes"));


module.exports = router;
