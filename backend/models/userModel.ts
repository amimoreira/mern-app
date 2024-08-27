// backend\models\userModel.ts

const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add a userName"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
