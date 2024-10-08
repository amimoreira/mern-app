// backend\models\aboutModel.ts
import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
