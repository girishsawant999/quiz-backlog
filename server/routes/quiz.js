const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  createQuiz,
  updateQuiz,
  getQuiz,
  getQuizzes,
  deleteQuiz,
} = require("../controllers/quiz");

router.post("/createQuiz", authMiddleware, createQuiz);
router.post("/updateQuiz", authMiddleware, updateQuiz);
router.get("/getQuiz", authMiddleware, getQuiz);
router.post("/getQuizzes", authMiddleware, getQuizzes);
router.post("/deleteQuiz", authMiddleware, deleteQuiz);

module.exports = router;
