const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const uploadPath = path.join(__dirname, "../uploads/course/img");

// ساخت پوشه اگر وجود نداشت
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// تنظیمات multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// مدل ساده برای ذخیره مسیرها
let courseCovers = [];

// آپلود کاور
const uploadCourseCover = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "فایلی ارسال نشده" });
    }

    const newCover = {
      id: uuidv4(),
      path: `/uploads/course/img/${req.file.filename}`,
    };

    courseCovers.push(newCover);

    res.status(200).json({
      message: "کاور با موفقیت آپلود شد",
      cover: newCover,
    });
  } catch (err) {
    res.status(500).json({ message: "خطا در آپلود کاور", error: err.message });
  }
};

// گرفتن همه کاورها
const getAllCourseCovers = (req, res) => {
  res.status(200).json(courseCovers);
};

// آپدیت کاور
const updateCourseCover = (req, res) => {
  try {
    const { id } = req.params;
    const coverIndex = courseCovers.findIndex((c) => c.id === id);

    if (coverIndex === -1) {
      return res.status(404).json({ message: "کاور پیدا نشد" });
    }

    // حذف فایل قبلی
    const oldPath = path.join(__dirname, `..${courseCovers[coverIndex].path}`);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    // ذخیره فایل جدید
    const newCoverPath = `/uploads/course/img/${req.file.filename}`;
    courseCovers[coverIndex].path = newCoverPath;

    res.status(200).json({
      message: "کاور با موفقیت آپدیت شد",
      cover: courseCovers[coverIndex],
    });
  } catch (err) {
    res.status(500).json({ message: "خطا در آپدیت کاور", error: err.message });
  }
};

// حذف کاور
const deleteCourseCover = (req, res) => {
  try {
    const { id } = req.params;
    const coverIndex = courseCovers.findIndex((c) => c.id === id);

    if (coverIndex === -1) {
      return res.status(404).json({ message: "کاور پیدا نشد" });
    }

    const filePath = path.join(__dirname, `..${courseCovers[coverIndex].path}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    courseCovers.splice(coverIndex, 1);

    res.status(200).json({ message: "کاور با موفقیت حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف کاور", error: err.message });
  }
};

module.exports = {
  upload,
  uploadCourseCover,
  getAllCourseCovers,
  updateCourseCover,
  deleteCourseCover,
};
