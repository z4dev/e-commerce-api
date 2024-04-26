const slugify = require("slugify");
const productModel = require("../models/product.model");

const ApiError = require("../utils/apiError");

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  try {
    const products = await productModel.find({}).skip(skip).limit(limit);
    if (page > 1) {
      res.send({
        result:
          products.length === 0
            ? "this page will not show any data"
            : products.length,
        data: products,
        page,
        prevPage: page - 1,
        nextPage: page + 1,
      });
    } else {
      res.send({
        result: products.length,
        data: products,
        page,
        nextPage: page + 1,
      });
    }
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    res.status(200).json(product);
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};

exports.createProduct = async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  try {
    const newProduct = await productModel.create(req.body);
    res.send(newProduct);
  } catch (err) {
    res.send(`the error ocurred is ${err}`);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  try {
    const existingCategory = await productModel.findOne({ _id: id });
    if (existingCategory && existingCategory._id !== id) {
      return res.status(400).json({ error: "Category name already exists." });
    }
    const updateDocument = await productModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
    );
    res.send({ data: updateDocument });
  } catch (err) {
    res.status(err.status).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productModel.findOneAndDelete({ _id: id });
    res.send({ data: deletedProduct });
  } catch (err) {
    console.log(err);
  }
};
