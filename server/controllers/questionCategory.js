const QuestionCategory = require("../models/questionCategory");

exports.createQuestionCategory = async (req, res) => {
  try {
    const { category, description } = req.body;
    const questionCategory = new QuestionCategory({ category, description });
    await questionCategory.save();
    return res.status(201).json({
      message: "Question category created successfully",
      data: { questionCategory },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.getQuestionCategories = async (req, res) => {
  try {
    const questionCategories = await QuestionCategory.find({
      isDeleted: false,
    });
    return res.status(200).json({ data: { questionCategories } });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};
