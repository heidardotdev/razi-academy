const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const teacherProfileController = require('../controllers/teacherProfileController');

// تنظیم Multer برای ذخیره‌سازی
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/teacherProfile/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// مسیرهای API
router.post('/', upload.single('image'), teacherProfileController.uploadTeacherProfile);
router.get('/', teacherProfileController.getAllTeacherProfiles);
router.put('/:id', upload.single('image'), teacherProfileController.updateTeacherProfile);
router.delete('/:id', teacherProfileController.deleteTeacherProfile);

module.exports = router;
