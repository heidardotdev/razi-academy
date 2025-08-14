const express = require('express');
const {
  createCourse, getCourses, getCourseById, getCourseDetails,
  updateCourse, deleteCourse, getPopularCourses, getCourseStudents
} = require('../controllers/courseController');

const router = express.Router();

// لیست + ساخت
router.route('/')
  .get(getCourses)
  .post(createCourse);

// محبوب‌ها
router.get('/popular', getPopularCourses);

// جزئیات کامل
router.get('/:id/details', getCourseDetails);

// دانشجوهای دوره
router.get('/:id/students', getCourseStudents);

// تک‌دوره
router.route('/:id')
  .get(getCourseById)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
