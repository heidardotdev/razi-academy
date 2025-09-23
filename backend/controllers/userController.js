const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


// Sign Up
const signUp = async (req, res, next) => {
  try {
    const { username, password, fullname, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePath = req.file ? `/uploads/profileImages/${req.file.filename}` : null;

    const newUser = new User({ username, password: hashedPassword, fullname, role, profile: profilePath });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, 'secretkey');
    res.status(201).json({ token, fullname: newUser.fullname });
  } catch (err) {
    next(err);
  }
};

// Sign In
const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.json({ token, fullname: user.fullname, role: user.role });
  } catch (err) {
    next(err);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Create user (Admin)
const createUser = async (req, res, next) => {
  try {
    const { username, password, fullname, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePath = req.file ? `/uploads/profileImages/${req.file.filename}` : null;

    const user = new User({ username, password: hashedPassword, fullname, role, profile: profilePath });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    const { fullname, role } = req.body;
    const updateData = { fullname, role };

    if (req.file) {
      // پیدا کردن کاربر فعلی برای حذف عکس قدیمی
      const user = await User.findById(req.params.id);
      if (user && user.profile) {
        const oldPath = path.join(__dirname, '..', user.profile);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath); // حذف عکس قدیمی
        }
      }
      // ذخیره مسیر عکس جدید
      updateData.profile = `/uploads/profileImages/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Ban user
const banUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Unban user
const unbanUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: false }, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
};


// Get banned users
const getBannedUsers = async (req, res, next) => {
  try {
    const bannedUsers = await User.find({ isBanned: true });
    res.json(bannedUsers);
  } catch (err) {
    next(err);
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // پسورد رو برنمی‌گردونیم
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  banUser,
  getBannedUsers,
  unbanUser,
  getUserByToken,
};
