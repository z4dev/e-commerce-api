const productModel = require("../models/product.model");
const handlerFactory = require("./handlerFactory.service");

exports.getProducts =  handlerFactory.getAll(productModel);
exports.getProduct =  handlerFactory.getOne(productModel);
exports.createProduct =  handlerFactory.createOne(productModel);
exports.updateProduct =  handlerFactory.updateOne(productModel);
exports.deleteProduct =  handlerFactory.deleteOne(productModel);
