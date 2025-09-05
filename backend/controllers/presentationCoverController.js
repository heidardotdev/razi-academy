const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PresentationCover = require("../models/presentationCoverModel");

const uploadPath = path.join(__dirname, "../uploads/presentation/img");

// اگر پوشه وجود نداشت بسازیم
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// تنظیمات multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// آپلود کاور
const uploadPresentationCover = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "فایلی انتخاب نشده" });

    const newCover = await PresentationCover.create({
      path: `/uploads/presentation/img/${req.file.filename}`,
    });

    res.status(201).json({ message: "کاور با موفقیت آپلود شد", cover: newCover });
  } catch (err) {
    res.status(500).json({ message: "خطا در آپلود کاور", error: err.message });
  }
};

// گرفتن همه کاورها
const getAllPresentationCovers = async (req, res) => {
  try {
    const covers = await PresentationCover.find();
    res.status(200).json(covers);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت کاورها", error: err.message });
  }
};

// آپدیت کاور
const updatePresentationCover = async (req, res) => {
  try {
    const { id } = req.params;
    const cover = await PresentationCover.findById(id);
    if (!cover) return res.status(404).json({ message: "کاور پیدا نشد" });

    // حذف فایل قدیمی
    const oldPath = path.join(__dirname, `..${cover.path}`);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    // آپلود فایل جدید
    cover.path = `/uploads/presentation/img/${req.file.filename}`;
    await cover.save();

    res.status(200).json({ message: "کاور با موفقیت آپدیت شد", cover });
  } catch (err) {
    res.status(500).json({ message: "خطا در آپدیت کاور", error: err.message });
  }
};

// حذف کاور
const deletePresentationCover = async (req, res) => {
  try {
    const { id } = req.params;
    const cover = await PresentationCover.findById(id);
    if (!cover) return res.status(404).json({ message: "کاور پیدا نشد" });

    // حذف فایل از پوشه
    const filePath = path.join(__dirname, `..${cover.path}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await cover.deleteOne();

    res.status(200).json({ message: "کاور با موفقیت حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف کاور", error: err.message });
  }
};

module.exports = {
  upload,
  uploadPresentationCover,
  getAllPresentationCovers,
  updatePresentationCover,
  deletePresentationCover,
};
