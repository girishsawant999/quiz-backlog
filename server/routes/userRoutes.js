const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/user");

router.post("/createUser", authMiddleware, createUser);
router.post("/updateUser", authMiddleware, updateUser);
router.get("/getUser", authMiddleware, getUser);
router.get("/getUsers", authMiddleware, getUsers);
router.post("/deleteUser", authMiddleware, deleteUser);

module.exports = router;
