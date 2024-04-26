const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      unique: [true, "SubCategory name must be unique"],
      minlength: [2, "SubCategory name must be at least 3 characters long"],
      maxlength: [50, "SubCategory name must be at most 50 characters long"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
