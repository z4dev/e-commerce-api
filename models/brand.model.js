const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: [true, "brand name must be unique"],
      minlength: [3, "brand name must be at least 3 characters long"],
      maxlength: [50, "brand name must be at most 50 characters long"],
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
  if (doc.image) doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
};

brandSchema.post("init", (doc) => setImageUrl(doc));
brandSchema.post("save", (doc) => setImageUrl(doc));

module.exports = mongoose.model("brand", brandSchema);
