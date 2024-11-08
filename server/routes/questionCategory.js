const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  createQuestionCategory,
  getQuestionCategories,
} = require("../controllers/questionCategory.js");

router.post("/createQuestionCategory", authMiddleware, createQuestionCategory);
router.get("/getQuestionCategories", authMiddleware, getQuestionCategories);

module.exports = router;
