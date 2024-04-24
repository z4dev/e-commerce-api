const express = require('express');
const router = express.Router();
const categoryController = require('../services/category.service');


router.route("/").post(categoryController.createCategory).get(categoryController.getAllCategories);
router.route("/:id").get(categoryController.getSpecificCategory).put(categoryController.updateCategory).delete(categoryController.deleteCategory)
module.exports = router;