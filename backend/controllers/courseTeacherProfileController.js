const fs = require("fs");
const path = require("path");
const CourseTeacherProfile = require("../models/courseTeacherProfileModel");

// 📌 مسیر پوشه ذخیره‌سازی
const uploadDir = path.join(__dirname, "../uploads/courseTeacherProfile/");

exports.createProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "هیچ فایلی ارسال نشده" });
    }

    const newProfile = new CourseTeacherProfile({
      imageUrl: req.file.path,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: "خطا در آپلود پروفایل مدرس", error: err.message });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await CourseTeacherProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت پروفایل‌ها", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await CourseTeacherProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "پروفایل پیدا نشد" });
    }

    if (req.file) {
      if (fs.existsSync(profile.imageUrl)) {
        fs.unlinkSync(profile.imageUrl);
      }
      profile.imageUrl = req.file.path;
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "خطا در آپدیت پروفایل", error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await CourseTeacherProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "پروفایل پیدا نشد" });
    }

    if (fs.existsSync(profile.imageUrl)) {
      fs.unlinkSync(profile.imageUrl);
    }

    await CourseTeacherProfile.findByIdAndDelete(req.params.id);
    res.json({ message: "پروفایل حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف پروفایل", error: err.message });
  }
};
