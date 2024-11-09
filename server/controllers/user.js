const User = require("../models/user");
const generateHash = require("../utils/generateHash");

exports.createUser = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      mobile,
      isActive = true,
      role,
      password,
    } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      const passwordHash = generateHash(password);
      user = new User({
        email,
        firstName,
        lastName,
        mobile,
        isActive,
        role,
        password: passwordHash,
        createdOn: new Date(),
      });
    } else {
      return res.status(500).json({ message: "User already exists" });
    }
    console.log(req.body);
    await user.save();
    return res
      .status(200)
      .json({ message: "User added successfully", data: { user: user } });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      _id: userId,
      email,
      firstName,
      lastName,
      mobile,
      isActive,
      role,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (mobile) user.mobile = mobile;
    user.isActive = isActive; // check if got some issue while API integration with FE
    if (role) user.role = role;
    await user.save();
    return res
      .status(200)
      .json({ message: "User updated successfully", data: { user: user } });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { _id: userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isDeleted = true;
    await user.save();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { _id: userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
