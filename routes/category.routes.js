const express = require('express');
const router = express.Router();
const categoryController = require('../services/category.service');


router.get('/', categoryController.getCategories);



module.exports = router;