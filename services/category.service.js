const CategoryModel = require('../models/cate.models');

exports.getCategories = (req, res) => {
  const name = req.body.name;
  console.log(req.body);

  const newCategory = new CategoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};