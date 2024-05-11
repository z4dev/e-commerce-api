//eslint-disable-next-line
const multer = require("multer");
const path = require("path");

const ApiError = require("../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const filename = `${"categories"}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
    req.body.image = filename;
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only images are allowed", 400));
  }
};

const uploadSingleImage = (fieldName) =>
  multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
  }).single(fieldName);

module.exports = {
  uploadSingleImage,
};
