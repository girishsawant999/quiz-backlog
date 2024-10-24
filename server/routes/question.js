const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  createQuestion,
  updateQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
} = require("../controllers/question");

router.post("/createQuestion", authMiddleware, createQuestion);
router.post("/updateQuestion", authMiddleware, updateQuestion);
router.get("/getQuestion", authMiddleware, getQuestion);
router.get("/getQuestions", authMiddleware, getQuestions);
router.post("/deleteQuestion", authMiddleware, deleteQuestion);

module.exports = router;
