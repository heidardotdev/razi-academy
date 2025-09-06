const EducationFieldCover = require('../models/EducationFieldCover');
const fs = require('fs');
const path = require('path');

exports.uploadEducationFieldCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'لطفاً یک تصویر آپلود کنید' });
    }

    const newCover = new EducationFieldCover({
      imageUrl: `/uploads/educationFieldCover/${req.file.filename}`,
    });

    await newCover.save();
    res.status(201).json({ message: 'کاور رشته تحصیلی با موفقیت آپلود شد', cover: newCover });
  } catch (error) {
    res.status(500).json({ message: 'خطا در آپلود کاور رشته تحصیلی', error: error.message });
  }
};

exports.getEducationFieldCovers = async (req, res) => {
  try {
    const covers = await EducationFieldCover.find();
    res.status(200).json(covers);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت کاورها', error: error.message });
  }
};

exports.updateEducationFieldCover = async (req, res) => {
  try {
    const cover = await EducationFieldCover.findById(req.params.id);
    if (!cover) return res.status(404).json({ message: 'کاور رشته تحصیلی پیدا نشد' });

    if (req.file) {
      const oldPath = path.join(__dirname, '..', cover.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      cover.imageUrl = `/uploads/educationFieldCover/${req.file.filename}`;
    }

    await cover.save();
    res.status(200).json({ message: 'کاور رشته تحصیلی با موفقیت بروزرسانی شد', cover });
  } catch (error) {
    res.status(500).json({ message: 'خطا در بروزرسانی کاور', error: error.message });
  }
};

exports.deleteEducationFieldCover = async (req, res) => {
  try {
    const cover = await EducationFieldCover.findById(req.params.id);
    if (!cover) return res.status(404).json({ message: 'کاور رشته تحصیلی پیدا نشد' });

    const filePath = path.join(__dirname, '..', cover.imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await EducationFieldCover.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'کاور رشته تحصیلی با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف کاور رشته تحصیلی', error: error.message });
  }
};
