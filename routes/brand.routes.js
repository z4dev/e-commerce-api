const express = require("express");

const router = express.Router();
const brandService = require("../services/brand.service");

// the validation for the category
const  brandValidation = require("../utils/validators/brand.validation");

router
  .route("/")
  .get(brandService.getBrands)
  .post(
    brandValidation.createBrandValidation,
    brandService.createBrand,
  )

router
  .route("/:id")
  .get(
    brandValidation.getBrandValidation,
    brandService.getSpecificBrand,
  )
  .put(
    brandValidation.UpdateBrandValidation,
    brandService.updateBrand,
  )

  .delete(
    brandValidation.deleteBrandValidation,
    brandService.deleteBrand,
  );

  router.use("/:categoryId/subcategories", require("./subcategory.routes"));

  // expaining the code above
  // router.use("/:categoryId/subcategory
  // .use() milddleware function that handle every request that has the path /:categoryId/subcategory

module.exports = router;
