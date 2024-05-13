const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      String,
      required: [true, "name is required"],
    },
    slug: {
      type: String,
      unique: true,
    },
    email: {
      String,
      require: [true, "email must be with value"],
      unique: true,
    },
    password: {
      String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum : ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxvzhnyg0/image/upload/v1626011550/avatars/avatar-1626011549.png",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
