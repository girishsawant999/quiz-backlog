const mongoose = require('mongoose');
const { questionDifficulty, questionCategory } = require('../utils/enums')


const categories = Object.values(questionCategory);
const optionsSchema = new mongose.Schema({
  optionId: { type: String, required: true },
  optionValue: { type: String, required: true }
})


const questionSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Question title is required'] },
  description: { type: String, default: "" },
  options: [optionsSchema],
  correctOption: { type: String, required: true },
  difficulty: { type: String, enum: [questionDifficulty.EASY, questionDifficulty.MEDIUM, questionDifficulty.HARD], default: userRoles.EASY },
  category: { type: String, enum: categories },
  isVerified: { type: Boolean, default: null },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: { type: Boolean, default: false },
  createdAtOn: { type: Date, require: true },
  lastUsedOn: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false }
}, {
  versionKey: false,
  timestamps: true
});

questionSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "questionId"
})

module.exports = mongoose.model('Question', questionSchema);
