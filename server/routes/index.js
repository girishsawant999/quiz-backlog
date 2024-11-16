const express = require("express");
const router = express.Router();

// User Routes
const user = require("./userRoutes");
router.use("/user", user);

// Auth Routes
const auth = require("./authentication");
router.use("/auth", auth);

// Question Routes
const question = require("./question");
router.use("/question", question);

// Question Category Routes
const questionCategory = require("./questionCategory");
router.use("/questionCategory", questionCategory);

// Quiz Routes
const quiz = require("./quiz");
router.use("/quiz", quiz);

module.exports = router;
