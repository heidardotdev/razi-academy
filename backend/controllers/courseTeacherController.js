const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CourseTeacher = require("../models/CourseTeacher"); // مسیرت همین‌طوره؟ مطمئن شو.

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ---------------- REGISTER ----------------
exports.registerTeacher = async (req, res) => {
  try {
    const { userName, password, userFullName, bio, profileImg } = req.body;

    if (!userName || !password || !userFullName) {
      return res
        .status(400)
        .json({ error: "userName, password و userFullName الزامی هستند" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "حداقل طول پسورد ۶ کاراکتر است" });
    }

    const existing = await CourseTeacher.findOne({ userName });
    if (existing) {
      return res.status(409).json({ error: "این نام کاربری قبلاً استفاده شده است" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await CourseTeacher.create({
      userName,
      password: hashed, // ذخیره هش‌شده
      userFullName,
      bio: bio || "",
      profileImg: profileImg || ""
    });

    return res.status(201).json({
      token: signToken(teacher._id),
      courseTeacherID: {
        _id: teacher._id,
        userFullName: teacher.userFullName,
        bio: teacher.bio,
        profileImg: teacher.profileImg,
        userName: teacher.userName
      }
    });
  } catch (err) {
    console.error("registerTeacher error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------- LOGIN ----------------
exports.loginTeacher = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ error: "userName و password الزامی هستند" });
    }

    // نکته‌ی مهم: پسورد را صراحتاً انتخاب کن
    const teacher = await CourseTeacher.findOne({ userName }).select("+password");
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.json({
      token: signToken(teacher._id),
      courseTeacherID: {
        _id: teacher._id,
        userFullName: teacher.userFullName,
        bio: teacher.bio,
        profileImg: teacher.profileImg,
        userName: teacher.userName
      }
    });
  } catch (err) {
    console.error("loginTeacher error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------- PROFILE (با توکن) ----------------
exports.getTeacherProfile = async (req, res) => {
  try {
    // req.user در میدلور ست می‌شود
    const teacher = await CourseTeacher.findById(req.user._id || req.user.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    return res.json({
      courseTeacherID: {
        _id: teacher._id,
        userFullName: teacher.userFullName,
        bio: teacher.bio,
        profileImg: teacher.profileImg,
        userName: teacher.userName
      }
    });
  } catch (err) {
    console.error("getTeacherProfile error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------- GET ALL TEACHERS ----------------
exports.getAllTeachers = async (req, res) => {
  try {
    const list = await CourseTeacher.find({}, "userFullName bio profileImg userName");
    return res.json(list);
  } catch (err) {
    console.error("getAllTeachers error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------- GET BY ID ----------------
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const teacher = await CourseTeacher.findById(id, "userFullName bio profileImg userName");
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    return res.json(teacher);
  } catch (err) {
    console.error("getTeacherById error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------- DELETE ----------------
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deleted = await CourseTeacher.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    return res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error("deleteTeacher error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
