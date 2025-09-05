const UserProfile = require("../models/userProfileModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// مسیر ذخیره‌سازی
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/userProfile/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 📌 آپلود پروفایل
exports.uploadUserProfile = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لطفا یک تصویر ارسال کنید" });
      }

      const newProfile = new UserProfile({
        imageUrl: req.file.path,
      });

      await newProfile.save();
      res.status(201).json({ message: "پروفایل با موفقیت آپلود شد", data: newProfile });
    } catch (err) {
      res.status(500).json({ message: "خطا در آپلود پروفایل", error: err.message });
    }
  },
];

// 📌 دریافت همه پروفایل‌ها
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت پروفایل‌ها", error: err.message });
  }
};

// 📌 آپدیت پروفایل
exports.updateProfile = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await UserProfile.findById(id);
      if (!profile) {
        return res.status(404).json({ message: "پروفایل پیدا نشد" });
      }

      // حذف تصویر قبلی
      if (profile.imageUrl && fs.existsSync(profile.imageUrl)) {
        fs.unlinkSync(profile.imageUrl);
      }

      profile.imageUrl = req.file.path;
      await profile.save();

      res.status(200).json({ message: "پروفایل با موفقیت آپدیت شد", data: profile });
    } catch (err) {
      res.status(500).json({ message: "خطا در آپدیت پروفایل", error: err.message });
    }
  },
];

// 📌 حذف پروفایل
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await UserProfile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "پروفایل پیدا نشد" });
    }

    // حذف تصویر از پوشه
    if (profile.imageUrl && fs.existsSync(profile.imageUrl)) {
      fs.unlinkSync(profile.imageUrl);
    }

    await UserProfile.findByIdAndDelete(id);
    res.status(200).json({ message: "پروفایل با موفقیت حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف پروفایل", error: err.message });
  }
};
