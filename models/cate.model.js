const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [50, "Category name must be at most 50 characters long"],
    },
    // A and b => shoping.com/a-and-b
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    image: String,
  },
  { timestamps: true },
); // timestamps: true adds createdAt and updatedAt fields

setImageUrl = (doc) => {
  if (doc.image) doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
};

categorySchema.post("init", (doc) => setImageUrl(doc));
categorySchema.post("save", (doc) => setImageUrl(doc));

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
