const subCateModel = require("../models/subcate.modle");
const handlerFactory = require("./handlerFactory.service");

exports.getAllSubCategories = handlerFactory.getAll(subCateModel);
exports.getSpecificSubCategory = handlerFactory.getOne(subCateModel);
exports.setParamsToBody = (req, res, next) => {
  if(!req.body.categoryId) req.body.categoryId = req.params.categoryId;
  next();
};
exports.createSubCategory = handlerFactory.createOne(subCateModel);
exports.updateSubCategory = handlerFactory.updateOne(subCateModel);
exports.deleteSubCategory = handlerFactory.deleteOne(subCateModel);
