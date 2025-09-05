const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ArticleCover = require('../models/articleCoverModel');

// مسیر ذخیره‌سازی فایل‌ها
const uploadPath = path.join(__dirname, '..', 'uploads', 'article', 'img');

// تنظیم Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// آپلود کاور مقاله
const uploadArticleCover = [
  upload.single('cover'),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'هیچ فایلی ارسال نشده' });

      const newCover = new ArticleCover({
        path: `/uploads/article/img/${req.file.filename}`
      });

      await newCover.save();
      res.status(201).json(newCover);
    } catch (err) {
      res.status(500).json({ message: 'خطا در آپلود کاور مقاله', error: err.message });
    }
  }
];

// دریافت همه کاورها
const getAllArticleCovers = async (req, res) => {
  try {
    const covers = await ArticleCover.find();
    res.json(covers);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت کاورها', error: err.message });
  }
};

// آپدیت کاور
const updateArticleCover = [
  upload.single('cover'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const cover = await ArticleCover.findById(id);
      if (!cover) return res.status(404).json({ message: 'کاور پیدا نشد' });

      // حذف فایل قدیمی
      fs.unlink(path.join(__dirname, '..', cover.path), (err) => {
        if (err) console.log('خطا در حذف فایل قدیمی:', err.message);
      });

      // ذخیره فایل جدید
      cover.path = `/uploads/article/img/${req.file.filename}`;
      await cover.save();

      res.json(cover);
    } catch (err) {
      res.status(500).json({ message: 'خطا در آپدیت کاور مقاله', error: err.message });
    }
  }
];

// حذف کاور
const deleteArticleCover = async (req, res) => {
  try {
    const { id } = req.params;
    const cover = await ArticleCover.findById(id);
    if (!cover) return res.status(404).json({ message: 'کاور پیدا نشد' });

    // حذف فایل از پوشه
    fs.unlink(path.join(__dirname, '..', cover.path), (err) => {
      if (err) console.log('خطا در حذف فایل:', err.message);
    });

    await cover.deleteOne();
    res.json({ message: 'کاور با موفقیت حذف شد' });
  } catch (err) {
    res.status(500).json({ message: 'خطا در حذف کاور مقاله', error: err.message });
  }
};

module.exports = {
  uploadArticleCover,
  getAllArticleCovers,
  updateArticleCover,
  deleteArticleCover
};
