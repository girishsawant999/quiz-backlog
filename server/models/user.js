const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { USER_ROLES } = require("../utils/enums");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, default: "" },
    mobile: {
      type: String,
      unique: true,
      required: [true, "Mobile number is required"],
    },
    token: { type: String, default: "" },
    verificationToken: { type: String, default: "" },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpCreatedAt: { type: Date, default: null },
    isOtpVerified: { type: Boolean, default: null },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: [USER_ROLES.ADMIN, USER_ROLES.APPROVER, USER_ROLES.OPERATOR],
      default: USER_ROLES.OPERATOR,
    },
    isActive: { type: Boolean, default: false },
    lastLoggedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "userId",
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRE,
    }
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
