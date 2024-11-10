const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  createQuestion,
  updateQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
  verifyQuestion,
} = require("../controllers/question");

router.post("/createQuestion", authMiddleware, createQuestion);
router.post("/updateQuestion", authMiddleware, updateQuestion);
router.get("/getQuestion", authMiddleware, getQuestion);
router.post("/getQuestions", authMiddleware, getQuestions);
router.post("/deleteQuestion", authMiddleware, deleteQuestion);
router.post("/verifyQuestion", authMiddleware, verifyQuestion);

module.exports = router;
