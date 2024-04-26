const slugify = require("slugify");
const brandModel = require("../models/brand.model");

const ApiError = require("../utils/apiError");

exports.getBrands = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  try {
    const documents = await brandModel.find({}).skip(skip).limit(limit);
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

exports.getSpecificBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await brandModel.findById(id);
    res.status(200).json(document);
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};

//@access Private
//@
exports.createBrand = async (req, res, next) => {
  const { name } = req.body;
  const slugName = slugify(name);

  try {
    const document = await brandModel.create({
      name: name,
      slug: slugName,
    });
    res.send(document);
  } catch (err) {
    res.send(`the error oucurred is ${err}`);
  }
};

exports.updateBrand = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const slugUpdated = slugify(name);

  try {
    const existingCategory = await brandModel.findOne({ name });
    if (existingCategory && existingCategory._id !== id) {
      return res.status(400).json({ error: "Category name already exists." });
    }

    const updateDocument = await brandModel.findOneAndUpdate(
      { _id: id },
      { name: name, slug: slugUpdated },
      { new: true },
    );
    res.send({ data: updateDocument });
  } 
  catch (err) {
     res.status(err.status).json({ error: err.message });
  }
};


exports.deleteBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteDocument = await brandModel.findOneAndDelete({ _id: id });
    res.send({ data: deleteDocument });
  } catch (err) {
    console.log(err)
  }
};
