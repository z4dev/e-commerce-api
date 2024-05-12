const ApiError = require("../utils/apiError");
//eslint-disable-next-line
const slugify = require("slugify");

exports.deleteOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await Model.findOneAndDelete({ _id: id });
    if (!document) {
      return next(
        new ApiError(`there is no document matches this id${id}`, 404),
      );
    }
    res.send({ data: document });
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  const { id } = req.params;

  const slugTxT = req.body.name ? req.body.name : req.body.title;
  const slugUpdated = slugify(slugTxT);

  try {

    const oldDocument = await Model.findById(id);
    if (!oldDocument) {
      return res.status(404).json({ error: "Category not found" });
    }
    const updateDocument = await Model.findOneAndUpdate(
      { _id: id },
      { ...req.body, slug: slugUpdated },
      { new: true },
    );
    if (!updateDocument) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.send({ data: updateDocument });
  } catch (err) {
    res.status(err.status).json({ error: err.message });
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  const slugName = slugify(req.body.name);

  try {
    //eslint-disable-next-line
    const document = await Model.create({...req.body, slug: slugName });
    res.status(201).json(document);
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  try {
    //soring, filtering, field limiting, pagination
    //eslint-disable-next-line
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((el) => delete queryObj[el]);
    //

    const queryStr = JSON.stringify(queryObj);
    const queryStrWithDollar = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    //
    const MongoDBQuery = Model.find(JSON.parse(queryStrWithDollar))
      .skip(skip)
      .limit(limit);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      MongoDBQuery.sort(sortBy);
    } else {
      MongoDBQuery.sort("-createdAt"); // - means descending , + means ascending
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      MongoDBQuery.select(fields);
    } else {
      MongoDBQuery.select("-__v"); // exclude __v field , return all fields except __v
    }
    if (req.query.keyword) {
      MongoDBQuery.find({
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      });
    }

    const documents = await MongoDBQuery;
    res.status(200).json({ data: documents, page, limit });
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await Model.findById(id);
    if (!document) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(document);
  } catch (err) {
    return next(new ApiError(`can't find this route ${req.originalUrl}`, 500));
  }
};
