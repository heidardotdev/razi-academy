const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ثبت‌نام کاربر
const registerUser = async (req, res) => {
  const { userFullName, userName, password } = req.body;

  if (!userFullName || !userName || !password) {
    return res.status(400).json({ message: "تمام فیلدها الزامی هستند." });
  }

  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.status(400).json({ message: "این نام کاربری قبلاً ثبت شده است." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userFullName,
    userName,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    token,
    userName: user.userName,
    userFullName: user.userFullName,
    createdAt: user.createdAt,
    userRole: user.userRole,
  });
};

// ورود کاربر
const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(401).json({ message: "کاربری با این نام یافت نشد." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "رمز عبور اشتباه است." });
  }

  const token = generateToken(user._id);

  res.json({
    token,
    userName: user.userName,
    userFullName: user.userFullName,
    createdAt: user.createdAt,
    userRole: user.userRole,
  });
};

// دریافت اطلاعات کاربر
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: "کاربر پیدا نشد." });
  }

  res.json({
    token: generateToken(user._id),
    userName: user.userName,
    userFullName: user.userFullName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    userRole: user.userRole,
  });
};

module.exports = { registerUser, loginUser, getUserProfile };
