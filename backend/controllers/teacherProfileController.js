const TeacherProfile = require('../models/TeacherProfile');
const fs = require('fs');
const path = require('path');

exports.uploadTeacherProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "هیچ فایلی ارسال نشده" });
    }

    const newProfile = new TeacherProfile({
      imageUrl: req.file.path
    });

    await newProfile.save();
    res.status(201).json({ message: "پروفایل با موفقیت آپلود شد", data: newProfile });
  } catch (err) {
    res.status(500).json({ message: "خطا در آپلود پروفایل", error: err.message });
  }
};

exports.getAllTeacherProfiles = async (req, res) => {
  try {
    const profiles = await TeacherProfile.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت پروفایل‌ها", error: err.message });
  }
};

exports.updateTeacherProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await TeacherProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "پروفایل پیدا نشد" });
    }

    // حذف تصویر قبلی
    if (fs.existsSync(profile.imageUrl)) {
      fs.unlinkSync(profile.imageUrl);
    }

    profile.imageUrl = req.file.path;
    await profile.save();

    res.status(200).json({ message: "پروفایل با موفقیت آپدیت شد", data: profile });
  } catch (err) {
    res.status(500).json({ message: "خطا در آپدیت پروفایل", error: err.message });
  }
};

exports.deleteTeacherProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await TeacherProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "پروفایل پیدا نشد" });
    }

    if (fs.existsSync(profile.imageUrl)) {
      fs.unlinkSync(profile.imageUrl);
    }

    await TeacherProfile.findByIdAndDelete(id);
    res.status(200).json({ message: "پروفایل با موفقیت حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف پروفایل", error: err.message });
  }
};
