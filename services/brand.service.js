const brandModel = require("../models/brand.model");
const handlerFactory = require("./handlerFactory.service");

exports.getBrands =  handlerFactory.getAll(brandModel);
exports.getSpecificBrand = handlerFactory.getOne(brandModel);
exports.createBrand =  handlerFactory.createOne(brandModel);
exports.updateBrand =  handlerFactory.updateOne(brandModel);
exports.deleteBrand =  handlerFactory.deleteOne(brandModel);
