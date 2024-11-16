const mongoose = require("mongoose");
const { userRoles } = require("../utils/enums");

const { QUESTION_DIFFICULTY } = require("../utils/enums");

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
        QUESTION_DIFFICULTY.EASY,
        QUESTION_DIFFICULTY.MEDIUM,
        QUESTION_DIFFICULTY.HARD,
      ],
      default: QUESTION_DIFFICULTY.EASY,
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
