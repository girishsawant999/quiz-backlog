const Question = require("../models/question");

exports.createQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      options,
      correctOption,
      difficulty,
      category,
      isPractice,
    } = req.body;
    const question = new Question({
      title,
      description,
      options,
      correctOption,
      difficulty,
      category,
      isPractice,
      createdAtOn: new Date(),
    });
    await question.save();
    return res
      .status(200)
      .json({ message: "Question added successfully", data: { question } });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const {
      _id: questionId,
      title,
      description,
      options,
      correctOption,
      difficulty,
      category,
      isVerified,
      verifiedBy,
      isPractice,
      isActive,
      lastUsedOn,
    } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    if (title) question.title = title;
    if (description) question.description = description;
    if (options) question.options = options;
    if (correctOption) question.correctOption = correctOption;
    if (difficulty) question.difficulty = difficulty;
    if (category) question.category = category;
    if (isVerified) question.isVerified = isVerified;
    if (verifiedBy) question.verifiedBy = verifiedBy;
    if (isPractice) question.isPractice = isPractice;
    if (isActive) question.isActive = isActive;
    if (lastUsedOn) question.lastUsedOn = lastUsedOn;
    await question.save();
    return res
      .status(200)
      .json({ message: "Question updated successfully", data: { question } });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { _id: questionId } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.isDeleted = true;
    await question.save();
    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const { _id: questionId } = req.body;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({
      question,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isDeleted: false });
    res.status(200).json({
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
