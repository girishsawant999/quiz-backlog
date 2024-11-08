const mongoose = require("mongoose");
const { userRoles } = require("../utils/enums");

const { questionDifficulty, questionCategory } = require("../utils/enums");

const categories = Object.values(questionCategory);
const optionsSchema = new mongoose.Schema({
  optionId: { type: String, required: true },
  optionValue: { type: String, required: true },
});

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Question title is required"] },
    description: { type: String, default: "" },
    options: [optionsSchema],
    correctOption: { type: String, required: true },
    difficulty: {
      type: String,
      enum: [
        questionDifficulty.EASY,
        questionDifficulty.MEDIUM,
        questionDifficulty.HARD,
      ],
      default: userRoles.EASY,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionCategory",
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isPractice: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

questionSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "questionId",
});

module.exports = mongoose.model("Question", questionSchema);
