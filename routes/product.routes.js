const express = require("express");

const router = express.Router();

const productService = require("../services/product.service");

router
  .route("/")
  .get(productService.getProducts)
  .post(productService.createProduct);

router
  .route("/:id")
  .get(productService.getProduct)
  .put(productService.updateProduct)
  .delete(productService.deleteProduct);

module.exports = router;
