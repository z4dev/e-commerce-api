const CategoryModel = require("../models/cate.model");

const handlerFactory = require("./handlerFactory.service");

exports.getAllCategories = handlerFactory.getAll(CategoryModel);
exports.getSpecificCategory = handlerFactory.getOne(CategoryModel);
exports.createCategory = handlerFactory.createOne(CategoryModel);
exports.updateCategory = handlerFactory.updateOne(CategoryModel);
exports.deleteCategory = handlerFactory.deleteOne(CategoryModel);
