//eslint-disable-next-line
const multer = require("multer");
const path = require("path");

const ApiError = require("../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.originalUrl.split("/")[3];
    cb(null, `uploads/${type}`);
  },
  filename: function (req, file, cb) {
    const type = req.originalUrl.split("/")[3];
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    const filename = `${type}-${uniqueSuffix}`;
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

module.exports = uploadSingleImage;
