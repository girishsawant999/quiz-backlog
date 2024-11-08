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

module.exports = router;
