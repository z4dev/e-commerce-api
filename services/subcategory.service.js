const slugify = require("slugify");
const subCateModel = require("../models/subcate.modle");
const ApiError = require("../utils/apiError");

exports.getAllSubCategories = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const { categoryId } = req.params;
  console.log(categoryId);
  try {
    const documents = await subCateModel
      .find({ category: categoryId })
      .skip(skip)
      .limit(limit);
    if (page > 1) {
      res.send({
        result:
          documents.length === 0
            ? "this page will not show any data"
            : documents.length,
        data: documents,
        page,
        prevPage: page - 1,
        nextPage: page + 1,
      });
    } else {
      res.send({
        result: documents.length,
        data: documents,
        page,
        nextPage: page + 1,
      });
    }
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};

exports.getSpecificSubCategory = async (req, res) => {
  const { categoryID } = req.params;
  try {
    const subCategories = await subCateModel.find({ category: categoryID });
    res.send(subCategories);
  } catch (err) {
    res.send(err);
  }
};

// get
exports.setParamsToBody = (req, res, next) => {
  if(!req.body.categoryId) req.body.categoryId = req.params.categoryId;
  next();
};

exports.createSubCategory = async (req, res, next) => {
  const { name, categoryId } = req.body;
  const slugName = slugify(name);
  try {
    const document = await subCateModel.create({
      name: name,
      slug: slugName,
      category: categoryId,
    });
    res.send(document);
  } catch (err) {
    res.send(err.message);
  }
};

//@update

exports.updateSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCate = await subCateModel.findById(id);
  if (!subCate) {
    return next(new ApiError(`this subcategory is not found`, 404));
  }
  try {
    const subCategory = await subCateModel.findByIdAndUpdate(
      id,
      { name: name, slug: slugify(name), category: category }, //  there can be optional like if i want to update only the name i can do it like this {name:name} or {name} and it keeps the old data like how it was
      { new: true },
    ); // new :true if i remove it it will update the data but it will not return the updated data
    res.send({ data: subCategory });
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subCategory = await subCateModel.findByIdAndDelete(id);
    res.send({ data: subCategory });
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};
