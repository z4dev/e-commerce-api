const express = require("express");

const router = express.Router({ mergeParams: true }); // mergeParams: true is used to merge the params from the parent router
const subCategoryService = require("../services/subcategory.service");
const subCategoryValidation = require("../utils/validators/subCategory.validation");

router
  .route("/")
  .post(
    subCategoryService.setParamsToBody,
    subCategoryValidation.createSubCategoryValidation,
    subCategoryService.createSubCategory,
  )
  .get(subCategoryService.getAllSubCategories);

router
  .route("/:id")
  .get(
    subCategoryValidation.getSubCategoryValidation,
    subCategoryService.getSpecificSubCategory,
  )
  .delete(
    subCategoryValidation.deleteSubCategoryValidation,
    subCategoryService.deleteSubCategory,
  )
  .put(
    subCategoryValidation.UpdateSubCategoryValidation,
    subCategoryService.updateSubCategory,
  );

module.exports = router;
