const express = require('express');
const router = express.Router();
const CourseTeacher = require('../models/CourseTeacher');

// ساخت مدرس جدید
router.post('/', async (req, res) => {
  try {
    const teacher = await CourseTeacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// گرفتن لیست مدرس‌ها
router.get('/', async (req, res) => {
  try {
    const teachers = await CourseTeacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
