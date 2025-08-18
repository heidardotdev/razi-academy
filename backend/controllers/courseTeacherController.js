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
      return res.status(400).json({ error: "userName, password و userFullName الزامی هستند" });
    }

    const existingTeacher = await CourseTeacher.findOne({ userName });
    if (existingTeacher) {
      return res.status(409).json({ error: "این نام کاربری قبلاً استفاده شده است" });
    }

    const teacher = new CourseTeacher({
      userName,
      password, // ❌ دیگه خودت هش نکن، مدل خودش هش میکنه
      userFullName,
      bio,
      profileImg
    });

    await teacher.save();

    const token = signToken(teacher._id);

    res.status(201).json({
      token,
      _id: teacher._id,
      userFullName: teacher.userFullName,
      bio: teacher.bio,
      profileImg: teacher.profileImg,
      userName: teacher.userName
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- LOGIN ----------------
exports.loginTeacher = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const teacher = await CourseTeacher.findOne({ userName });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const isMatch = await teacher.matchPassword(password); // ✅ از متد مدل استفاده کن
    if (!isMatch) {
      return res.status(401).json({ message: "رمز عبور اشتباه است." });
    }

    const token = signToken(teacher._id);

    res.json({
      token,
      _id: teacher._id,
      userFullName: teacher.userFullName,
      bio: teacher.bio,
      profileImg: teacher.profileImg,
      userName: teacher.userName
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// ---------------- UPDATE TEACHER ----------------
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, password, userFullName, bio, profileImg } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const teacher = await CourseTeacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // بررسی اینکه آیا یوزرنیم تکراریه یا نه
    if (userName && userName !== teacher.userName) {
      const existingTeacher = await CourseTeacher.findOne({ userName });
      if (existingTeacher) {
        return res.status(409).json({ error: "This username is already taken" });
      }
      teacher.userName = userName;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      teacher.password = hashedPassword;
    }

    if (userFullName) teacher.userFullName = userFullName;
    if (bio) teacher.bio = bio;
    if (profileImg) teacher.profileImg = profileImg;

    await teacher.save();

    res.json({
      message: "Teacher updated successfully",
      teacher: {
        id: teacher._id,
        userName: teacher.userName,
        userFullName: teacher.userFullName,
        bio: teacher.bio,
        profileImg: teacher.profileImg
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
      _id: teacher._id,
      userFullName: teacher.userFullName,
      bio: teacher.bio,
      profileImg: teacher.profileImg,
      userName: teacher.userName
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
