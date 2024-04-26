const express = require("express");

const router = express.Router();
const categoryService = require("../services/category.service");

// the validation for the category
const categoryValidation = require("../utils/validators/category.validator");

router
  .route("/")
  .get(categoryService.getAllCategories)
  .post(
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

  // expaining the code above
  // router.use("/:categoryId/subcategory
  // .use() milddleware function that handle every request that has the path /:categoryId/subcategory

module.exports = router;
