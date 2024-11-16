const mongoose = require("mongoose");
const { QUIZ_TYPE, QUESTION_DIFFICULTY } = require("../utils/enums");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    type: {
      type: String,
      enum: [QUIZ_TYPE.PRACTICE, QUIZ_TYPE.LIVE],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: [
        QUESTION_DIFFICULTY.EASY,
        QUESTION_DIFFICULTY.MEDIUM,
        QUESTION_DIFFICULTY.HARD,
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numberOfQuestion: {
      type: Number,
      required: true,
      min: 5,
      max: 20,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activatedAt: {
      type: Date,
    },
    banner: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

quizSchema.virtual("quizzes", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "quizId",
});

module.exports = mongoose.model("Quiz", quizSchema);
