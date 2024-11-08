const mongoose = require("mongoose");

const questionCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("QuestionCategory", questionCategorySchema);
